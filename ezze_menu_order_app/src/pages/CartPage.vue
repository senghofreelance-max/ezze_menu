<template>
	<section class="space-y-lg">
		<div>
			<h2 class="app-section-title">Cart</h2>
			<p class="app-section-copy">Pinia-backed cart state is already separated and ready for API syncing.</p>
		</div>

		<div class="app-panel p-lg">
			<div
				v-for="entry in menuStore.cart"
				:key="entry.id"
				class="flex flex-col gap-sm border-b border-border py-md last:border-b-0 md:flex-row md:items-center md:justify-between"
			>
				<div>
					<h3 class="font-semibold text-heading">{{ entry.name }}</h3>
					<p class="text-sm text-muted">${{ entry.price.toFixed(2) }}</p>
				</div>
				<div class="flex items-center gap-sm">
					<input
						:value="entry.quantity"
						type="number"
						min="1"
						class="w-20 rounded-xl border border-border bg-surface px-sm py-xs"
						@input="menuStore.updateQuantity(entry.id, Number($event.target.value))"
					>
					<button class="text-sm font-semibold text-error" @click="menuStore.removeFromCart(entry.id)">Remove</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { useMenuStore } from "../stores/menu";

const menuStore = useMenuStore();
</script>
