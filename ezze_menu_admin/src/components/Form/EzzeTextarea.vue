<template>
	<label class="flex flex-col gap-2">
		<span v-if="label" class="text-sm font-semibold text-heading">{{ label }}</span>
		<textarea
			:value="modelValue"
			:rows="rows"
			:placeholder="placeholder"
			:class="textareaClass"
			@input="$emit('update:modelValue', $event.target.value)"
		/>
	</label>
</template>

<script setup>
defineProps({
	modelValue: {
		type: String,
		default: "",
	},
	label: {
		type: String,
		default: "",
	},
	placeholder: {
		type: String,
		default: "",
	},
	rows: {
		type: Number,
		default: 4,
	},
});

defineEmits(["update:modelValue"]);

const textareaClass =
	"w-full rounded-2xl border border-border bg-surface px-md py-sm text-sm text-heading outline-none transition focus:border-secondary focus:ring-4 focus:ring-secondary/10";
</script>
