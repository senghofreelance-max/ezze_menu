<template>
	<div class="app-shell">
		<div class="mx-auto flex min-h-screen max-w-6xl flex-col px-md py-lg sm:px-xl">
			<header class="mb-xl flex items-center justify-between gap-4">
				<div>
					<p class="text-xs font-bold uppercase tracking-[0.24em] text-muted">Telegram Ordering</p>
					<h1 class="text-3xl font-extrabold text-heading">Ezze Menu</h1>
				</div>
				<RouterLink
					to="/menu-order/cart"
					class="inline-flex items-center gap-2 rounded-2xl bg-heading px-md py-sm text-sm font-semibold text-white"
				>
					<i class="pi pi-shopping-bag" />
					<span>{{ menuStore.cartCount }}</span>
				</RouterLink>
			</header>

			<main class="flex-1">
				<RouterView />
			</main>
		</div>
	</div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useMenuStore } from "../stores/menu";

const menuStore = useMenuStore();
</script>
