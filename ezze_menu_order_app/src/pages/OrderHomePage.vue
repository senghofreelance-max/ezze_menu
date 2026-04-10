<template>
	<section class="grid gap-xl lg:grid-cols-[1.2fr_0.8fr]">
		<div class="space-y-lg">
			<div class="app-panel overflow-hidden p-xl">
				<p class="text-xs font-bold uppercase tracking-[0.24em] text-secondary">Fast Ordering</p>
				<h2 class="mt-sm text-4xl font-extrabold tracking-tight text-heading">
					Build a cart in seconds and send the order straight into Frappe.
				</h2>
				<p class="mt-md max-w-2xl text-base leading-7 text-muted">
					This customer app is set up with Vue Router, Pinia, Tailwind, PrimeVue unstyled mode, and
					the Frappe JS SDK so product, cart, and checkout flows can scale cleanly.
				</p>
			</div>

			<div class="grid gap-md md:grid-cols-2 xl:grid-cols-3">
				<article
					v-for="item in menuStore.items"
					:key="item.id"
					class="app-panel flex flex-col gap-md p-lg"
				>
					<div class="flex items-start justify-between gap-3">
						<div>
							<p class="text-xs font-bold uppercase tracking-[0.18em] text-secondary">{{ item.tag }}</p>
							<h3 class="mt-2 text-lg font-bold text-heading">{{ item.name }}</h3>
						</div>
						<span class="rounded-full bg-primary px-sm py-xs text-xs font-bold text-primary-contrast">
							${{ item.price.toFixed(2) }}
						</span>
					</div>
					<p class="flex-1 text-sm leading-6 text-muted">{{ item.description }}</p>
					<AppButton @click="addItem(item)">Add To Cart</AppButton>
				</article>
			</div>
		</div>

		<aside class="app-panel p-lg">
			<p class="text-xs font-bold uppercase tracking-[0.2em] text-muted">Current Cart</p>
			<div class="mt-md space-y-md">
				<div
					v-for="entry in menuStore.cart"
					:key="entry.id"
					class="flex items-center justify-between gap-4 rounded-2xl border border-border px-md py-sm"
				>
					<div>
						<h4 class="font-semibold text-heading">{{ entry.name }}</h4>
						<p class="text-sm text-muted">{{ entry.quantity }} x ${{ entry.price.toFixed(2) }}</p>
					</div>
					<button class="text-sm font-semibold text-error" @click="menuStore.removeFromCart(entry.id)">
						Remove
					</button>
				</div>
				<p v-if="!menuStore.cart.length" class="rounded-2xl border border-dashed border-border p-lg text-sm text-muted">
					Your cart is empty.
				</p>
			</div>

			<div class="mt-lg rounded-2xl bg-slate-100 p-md dark:bg-slate-800">
				<div class="flex items-center justify-between text-sm">
					<span class="text-muted">Total</span>
					<span class="font-bold text-heading">${{ menuStore.cartTotal.toFixed(2) }}</span>
				</div>
				<RouterLink
					to="/menu-order/checkout"
					class="mt-md inline-flex w-full items-center justify-center rounded-2xl bg-secondary px-md py-sm text-sm font-semibold text-secondary-contrast"
				>
					Proceed To Checkout
				</RouterLink>
			</div>
		</aside>
	</section>
</template>

<script setup>
import { useMenuStore } from "../stores/menu";
import { AppButton } from "@shared/components/ui/Form";

const menuStore = useMenuStore();

function addItem(item) {
	menuStore.addToCart(item);
}
</script>
