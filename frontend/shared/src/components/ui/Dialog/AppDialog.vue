<template>
	<Dialog
		:visible="visible"
		modal
		:dismissable-mask="dismissable"
		@update:visible="$emit('update:visible', $event)"
	>
		<template #header>
			<div class="flex items-center justify-between gap-4">
				<div>
					<h3 class="text-lg font-bold text-heading">{{ title }}</h3>
					<p v-if="description" class="mt-1 text-sm text-muted">{{ description }}</p>
				</div>
				<button
					class="rounded-full border border-border p-2 text-muted transition hover:bg-slate-100 dark:hover:bg-slate-800"
					@click="$emit('update:visible', false)"
				>
					<i class="pi pi-times" />
				</button>
			</div>
		</template>

		<slot />
	</Dialog>
</template>

<script setup>
defineProps({
	visible: Boolean,
	title: {
		type: String,
		default: "",
	},
	description: {
		type: String,
		default: "",
	},
	dismissable: {
		type: Boolean,
		default: true,
	},
});

defineEmits(["update:visible"]);
</script>
