import { FrappeApp } from "@vendor/frappe-sdk";

function getFrappeOptions() {
	const options = { url: window.location.origin };

	if (window.Telegram?.WebApp?.platform === "web") {
		options.useToken = true;
		options.token = () => localStorage.getItem("ezze-menu-auth") || "";
		options.tokenType = "Token";
	}

	return options;
}

export function createFrappeClient() {
	const frappe = new FrappeApp(getFrappeOptions().url, getFrappeOptions());

	return {
		frappe,
		call: frappe.call(),
		db: frappe.db(),
		auth: frappe.auth(),
	};
}
