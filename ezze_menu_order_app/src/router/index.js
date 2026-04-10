import { createRouter, createWebHistory } from "vue-router";
import OrderLayout from "../layouts/OrderLayout.vue";

const routes = [
	{
		path: "/",
		redirect: "/menu-order",
	},
	{
		path: "/menu-order",
		component: OrderLayout,
		children: [
			{
				path: "",
				name: "order-home",
				component: () => import("../pages/OrderHomePage.vue"),
			},
			{
				path: "cart",
				name: "order-cart",
				component: () => import("../pages/CartPage.vue"),
			},
			{
				path: "checkout",
				name: "order-checkout",
				component: () => import("../pages/CheckoutPage.vue"),
			},
		],
	},
];

export default createRouter({
	history: createWebHistory(),
	routes,
});
