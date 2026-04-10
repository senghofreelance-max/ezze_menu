import { createFrappeClient } from "../services/frappe";
import { session } from "../services/session";

export default {
	install(app) {
		const client = createFrappeClient();

		app.provide("frappe", client.frappe);
		app.provide("call", client.call);
		app.provide("db", client.db);
		app.provide("auth", client.auth);
		app.provide("$session", session);

		app.config.globalProperties.$frappe = client.frappe;
		app.config.globalProperties.$call = client.call;
		app.config.globalProperties.$db = client.db;
		app.config.globalProperties.$auth = client.auth;
		app.config.globalProperties.$session = session;
	},
};
