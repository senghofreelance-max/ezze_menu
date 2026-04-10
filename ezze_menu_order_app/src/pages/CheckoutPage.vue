<template>
	<section class="grid gap-lg lg:grid-cols-[1fr_0.8fr]">
		<div class="app-panel p-lg">
			<h2 class="app-section-title">Checkout</h2>
			<p class="mt-sm text-sm text-muted">A simple starting point for address, note, and payment intent integration.</p>

			<form class="mt-lg space-y-md">
				<AppInput v-model="form.customerName" label="Customer Name" placeholder="Your name" />
				<AppInput v-model="form.phone" label="Phone" placeholder="+855 ..." />
				<AppTextarea v-model="form.note" label="Order Note" placeholder="Special instructions" />
				<AppButton>Submit Order</AppButton>
			</form>
		</div>

		<div class="app-panel p-lg">
			<h3 class="text-lg font-bold text-heading">Summary</h3>
			<div class="mt-md space-y-sm text-sm">
				<div
					v-for="entry in menuStore.cart"
					:key="entry.id"
					class="flex items-center justify-between gap-3"
				>
					<span class="text-body">{{ entry.name }} x{{ entry.quantity }}</span>
					<span class="font-semibold text-heading">${{ (entry.price * entry.quantity).toFixed(2) }}</span>
				</div>
				<div class="mt-md border-t border-border pt-md text-base font-bold text-heading">
					Total: ${{ menuStore.cartTotal.toFixed(2) }}
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { reactive } from "vue";
import { useMenuStore } from "../stores/menu";
import { AppButton, AppInput, AppTextarea } from "@shared/components/ui/Form";

const menuStore = useMenuStore();

const form = reactive({
	customerName: "",
	phone: "",
	note: "",
});
</script>
