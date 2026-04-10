<template>
    <button :type="type" :disabled="disabled || loading" :class="buttonClass">
        <span v-if="loading" class="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
        <i v-else-if="icon" :class="['pi', icon]" />
        <span v-if="$slots.default">
            <slot />
        </span>
    </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    type: {
        type: String,
        default: "button",
    },
    variant: {
        type: String,
        default: "primary",
    },
    loading: Boolean,
    disabled: Boolean,
    icon: {
        type: String,
        default: "",
    },
});

const buttonClass = computed(() => {
    const base =
        "inline-flex items-center justify-center gap-2 rounded-2xl px-md py-sm text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60";

    const variants = {
        primary: "bg-primary text-primary-contrast hover:brightness-95",
        secondary: "bg-secondary text-secondary-contrast hover:brightness-110",
        ghost: "border border-border bg-transparent text-heading hover:bg-slate-100 dark:hover:bg-slate-800",
    };

    return `${base} ${variants[props.variant] || variants.primary}`;
});
</script>
