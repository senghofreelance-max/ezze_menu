import { createApp } from "vue";
import { createPinia } from "pinia";
import "primeicons/primeicons.css";
import "@shared/styles/app.css";
import frappePlugin from "@shared/plugins/frappe";
import { setupPrimeVue } from "@shared/plugins/primevue";
import { createFrappeClient } from "@shared/services/frappe";
import { abilitiesPlugin } from "@casl/vue";
import { session } from "@shared/services/session";
import { ability, applyAbilityForUser, resetAbility } from "./services/ability";
import {
	ADMIN_DYNAMIC_ROUTES_METHOD,
	ADMIN_FRONTEND_PROJECT,
	ADMIN_INITIAL_DATA_METHOD,
} from "./config/frontend";
import { clearNavigationData, setNavigationData } from "./services/navigation";
import App from "./App.vue";
import router from "./router";

const { call } = createFrappeClient();
const pageModules = import.meta.glob("./pages/**/*.vue");
const app = createApp(App);

app.use(createPinia());
app.use(frappePlugin);
setupPrimeVue(app);
app.use(abilitiesPlugin, ability);

function parseFrontendMeta(frontendMeta) {
	if (!frontendMeta) {
		return {};
	}

	if (typeof frontendMeta === "object") {
		return frontendMeta;
	}

	try {
		return JSON.parse(frontendMeta);
	} catch (error) {
		console.error("Failed to parse frontend_meta:", error);
		return {};
	}
}

async function loadInitialData() {
	const response = await call.post(ADMIN_INITIAL_DATA_METHOD, {
		root: ADMIN_FRONTEND_PROJECT,
	});

	setNavigationData(response.message || {});
	return response.message;
}

async function loadDynamicRoutes() {
	const response = await call.post(ADMIN_DYNAMIC_ROUTES_METHOD);
	const dynamicRoutes = response.message || [];

	dynamicRoutes.forEach((item) => {
		if (!item.url || item.is_group) {
			return;
		}

		const routeName = item.label || item.name;
		if (router.hasRoute(routeName)) {
			return;
		}

		let matchedModule = pageModules[item.component_path];
		if (!matchedModule) {
			const possibleKeys = Object.keys(pageModules).filter(
				(key) =>
					key.toLowerCase().endsWith(`${item.url.toLowerCase()}.vue`) ||
					key
						.toLowerCase()
						.endsWith(
							`${item.url.toLowerCase()}/${item.url.split("/").pop().toLowerCase()}.vue`,
						),
			);

			if (possibleKeys.length > 0) {
				matchedModule = pageModules[possibleKeys[0]];
			}
		}

		if (!matchedModule) {
			console.warn(`[Dynamic Routes] No Vue component mapping found for URL: ${item.url}`);
			return;
		}

		let beforeEnterGuard;
		if (item.before_enter) {
			try {
				beforeEnterGuard = new Function("to", "from", "next", item.before_enter);
			} catch (error) {
				console.error(`Failed to parse before_enter for ${item.url}:`, error);
			}
		}

		router.addRoute("Admin", {
			path: item.url,
			name: routeName,
			component: matchedModule,
			meta: parseFrontendMeta(item.frontend_meta),
			beforeEnter: beforeEnterGuard,
		});
	});
}

router.beforeEach((to) => {
	const publicPages = ["menu-admin-login"];

	if (!session.isLoggedIn && !publicPages.includes(to.name)) {
		return { name: "menu-admin-login" };
	}

	if (to.name === "menu-admin-login" && session.isLoggedIn) {
		return { name: "menu-admin-dashboard" };
	}

	const { action, subject } = to.meta;

	if (action && subject && !ability.can(action, subject)) {
		return { name: "menu-admin-dashboard" };
	}

	return true;
});

async function bootstrap() {
	if (session.isLoggedIn) {
		try {
			const currentUser = await session.fetchCurrentUser();
			applyAbilityForUser(currentUser);
			await loadInitialData();
			await loadDynamicRoutes();
		} catch (error) {
			console.error("Failed to initialize admin frontend:", error);
			resetAbility();
			clearNavigationData();
		}
	} else {
		resetAbility();
		clearNavigationData();
	}

	app.use(router);
	await router.isReady();
	app.mount("#app");
}

bootstrap();
