import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: "/",
		redirect: "/menu-admin",
	},
	{
		path: "/menu-admin/login",
		name: "menu-admin-login",
		meta: { title: "Login" },
		component: () => import("../pages/auth/LoginPage.vue"),
	},
	{
		path: "/menu-admin",
		name: "Admin",
		component: () => import("../layouts/AdminShell.vue"),
		meta: { requiresAuth: true },
		children: [
			{
				path: "",
				name: "menu-admin-dashboard",
				meta: { title: "Overview" },
				component: () => import("../pages/dashboard/DashboardPage.vue"),
			},
			{
				path: "orders",
				name: "menu-admin-orders",
				meta: { title: "Orders" },
				component: () => import("../pages/dashboard/OrdersPage.vue"),
			},
			{
				path: "catalog",
				name: "menu-admin-catalog",
				meta: { title: "Catalog" },
				component: () => import("../pages/dashboard/CatalogPage.vue"),
			},
			{
				path: "settings",
				name: "menu-admin-settings",
				meta: { title: "Settings" },
				component: () => import("../pages/dashboard/SettingsPage.vue"),
			},
		],
	},
	{
		path: "/:pathMatch(.*)*",
		redirect: "/menu-admin",
	},
];

export default createRouter({
	history: createWebHistory(),
	routes,
});
