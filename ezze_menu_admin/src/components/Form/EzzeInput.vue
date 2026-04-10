<template>
    <label class="flex flex-col gap-2">
        <span v-if="label" class="text-sm font-semibold text-heading">{{ label }}</span>
        <input :value="modelValue" :type="type" :placeholder="placeholder" :class="inputClass"
            @input="$emit('update:modelValue', $event.target.value)">
    </label>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: "",
    },
    label: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        default: "text",
    },
    placeholder: {
        type: String,
        default: "",
    },
});

defineEmits(["update:modelValue"]);

const inputClass =
    "w-full rounded-2xl border border-border bg-surface px-md py-sm text-sm text-heading outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/10";
</script>
