import { computed, reactive } from "vue";
import { createFrappeClient } from "./frappe";

const { auth, call } = createFrappeClient();

function cookieValue(name) {
	return new URLSearchParams(document.cookie.split("; ").join("&")).get(name);
}

function getStoredCurrentUser() {
	const raw = localStorage.getItem("ezze-menu-user");
	if (!raw) {
		return null;
	}

	try {
		return JSON.parse(raw);
	} catch {
		localStorage.removeItem("ezze-menu-user");
		return null;
	}
}

function normalizePermissions(permissionPayload) {
	const columns = permissionPayload?.columns || [];
	const data = permissionPayload?.data || [];

	return data.map((row) => Object.fromEntries(row.map((value, index) => [columns[index], value])));
}

export function sessionUser() {
	const currentUser = cookieValue("user_id");
	return currentUser && currentUser !== "Guest" ? currentUser : null;
}

export function syncCSRFToken() {
	const csrfToken = cookieValue("frappe-csrf-token");
	if (csrfToken) {
		window.csrf_token = csrfToken;
	}
}

function handleLoginSuccess(response) {
	if (response?.message === "Logged In") {
		session.user = sessionUser();
	}
	return response;
}

function persistCurrentUser(response) {
	const currentUser = {
		...response.message,
		permissions: normalizePermissions(response.message?.perm),
	};

	session.user = currentUser.user || sessionUser();
	session.currentUser = currentUser;
	localStorage.setItem("ezze-menu-user", JSON.stringify(currentUser));

	return currentUser;
}

export const session = reactive({
	user: sessionUser(),
	currentUser: getStoredCurrentUser(),
	isLoggedIn: computed(() => !!session.user),
	login(username, password) {
		return auth
			.loginWithUsernamePassword({
				username,
				password,
				remember_me: 1,
			})
			.then(handleLoginSuccess)
			.then(() => session.fetchCurrentUser());
	},
	fetchCurrentUser(method = "ezze_menu.api.auth.get_current_user") {
		return call
			.get(method)
			.then((response) => {
				return persistCurrentUser(response);
			})
			.catch((error) => {
				session.user = null;
				session.currentUser = null;
				localStorage.removeItem("ezze-menu-nav-menu");
				localStorage.removeItem("ezze-menu-filter-conditions");
				localStorage.removeItem("ezze-menu-user");
				throw error;
			});
	},
	logout(redirectTo = "/menu-admin/login") {
		syncCSRFToken();
		return auth
			.logout()
			.catch(() => undefined)
			.finally(() => {
				localStorage.removeItem("ezze-menu-auth");
				localStorage.removeItem("ezze-menu-nav-menu");
				localStorage.removeItem("ezze-menu-filter-conditions");
				localStorage.removeItem("ezze-menu-user");
				session.user = null;
				session.currentUser = null;
				window.location.href = redirectTo;
			});
	},
	refreshUser() {
		session.user = sessionUser();
	},
});

syncCSRFToken();
