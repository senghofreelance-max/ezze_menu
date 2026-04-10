import { defineStore } from "pinia";

const sampleItems = [
	{
		id: 1,
		name: "Crispy Lemongrass Chicken",
		description: "Golden fried chicken with turmeric glaze and green mango slaw.",
		price: 6.5,
		tag: "Popular",
	},
	{
		id: 2,
		name: "Mekong Beef Bowl",
		description: "Charred beef, jasmine rice, herbs, pickles, and sesame dressing.",
		price: 8.2,
		tag: "Chef Pick",
	},
	{
		id: 3,
		name: "Sunrise Fruit Soda",
		description: "House soda with passionfruit, citrus, and basil seed.",
		price: 2.8,
		tag: "Fresh",
	},
];

export const useMenuStore = defineStore("menu", {
	state: () => ({
		items: sampleItems,
		cart: [],
	}),
	getters: {
		cartCount: (state) => state.cart.reduce((sum, item) => sum + item.quantity, 0),
		cartTotal: (state) =>
			state.cart.reduce((sum, item) => sum + item.quantity * item.price, 0),
	},
	actions: {
		addToCart(item) {
			const existing = this.cart.find((entry) => entry.id === item.id);
			if (existing) {
				existing.quantity += 1;
				return;
			}
			this.cart.push({ ...item, quantity: 1 });
		},
		updateQuantity(id, quantity) {
			const entry = this.cart.find((item) => item.id === id);
			if (!entry) return;
			entry.quantity = Math.max(1, quantity);
		},
		removeFromCart(id) {
			this.cart = this.cart.filter((item) => item.id !== id);
		},
	},
});
