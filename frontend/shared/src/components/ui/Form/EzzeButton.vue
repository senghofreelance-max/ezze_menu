<template>
    <Button v-bind="$attrs" :class="[
        'app-button group',
        baseClasses,
        variantClasses,
        sizeClasses,
        customClass,
        { 'pointer-events-none opacity-70': loading }
    ]" :loading="loading" :disabled="disabled || loading" :unstyled="true">
        <!-- Loading Spinner -->
        <i v-if="loading" class="pi pi-spin pi-spinner text-sm animate-spin" :class="{ 'mr-2': label }"></i>

        <!-- Icon Content (shown only if not loading) -->
        <template v-else>
            <slot name="icon">
                <i v-if="icon && iconPos === 'left'" :class="[
                    'pi', icon, iconClass,
                    { 'mr-2': label }
                ]"></i>
            </slot>
        </template>

        <!-- Label -->
        <span v-if="label" class="app-button-label">{{ label }}</span>

        <!-- Default Slot for multi-element content -->
        <slot v-if="!label" />

        <!-- Right Icon (only if not loading) -->
        <i v-if="!loading && icon && iconPos === 'right'" :class="[
            'pi', icon, iconClass,
            { 'ml-2': label }
        ]"></i>

        <template #loadingicon>
            <!-- Still provide the slot just in case, but we handled it above -->
            <span></span>
        </template>
    </Button>
</template>

<script setup>
import { computed, useSlots } from 'vue';
import Button from 'primevue/button';

const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: ''
    },
    iconPos: {
        type: String,
        default: 'left' // 'left', 'right'
    },
    variant: {
        type: String,
        default: 'background', // 'text', 'outlined', 'background', 'icon'
        validator: (value) => ['text', 'outlined', 'background', 'icon'].includes(value)
    },
    severity: {
        type: String,
        default: 'primary', // 'primary', 'secondary', 'success', 'info', 'warn', 'danger', 'contrast'
    },
    size: {
        type: String,
        default: 'md', // 'xs', 'sm', 'md', 'lg'
    },
    loading: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    customClass: {
        type: String,
        default: ''
    }
});

const slots = useSlots();

const baseClasses = 'inline-flex items-center justify-center transition-all duration-300 active:scale-[0.98] select-none rounded-xl focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer';

const sizeClasses = computed(() => {
    if (props.variant === 'icon') {
        switch (props.size) {
            case 'xs': return 'w-8 h-8';
            case 'sm': return 'w-9 h-9';
            case 'lg': return 'w-12 h-12';
            default: return 'w-10 h-10';
        }
    }
    switch (props.size) {
        case 'xs': return 'px-3 py-1.5 text-xs';
        case 'sm': return 'px-4 py-2 text-sm';
        case 'lg': return 'px-8 py-4 text-base';
        default: return 'px-6 py-3 text-sm';
    }
});

const iconClass = computed(() => {
    switch (props.size) {
        case 'xs': return 'text-[10px]';
        case 'lg': return 'text-lg';
        default: return 'text-sm';
    }
});

const variantClasses = computed(() => {
    const sev = props.severity;

    if (props.variant === 'text') {
        const textColors = {
            primary: 'text-primary hover:bg-primary/10',
            secondary: 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800',
            success: 'text-green-600 hover:bg-green-50',
            danger: 'text-red-600 hover:bg-red-50',
            contrast: 'text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800'
        };
        return `bg-transparent ${textColors[sev] || textColors.primary}`;
    }

    if (props.variant === 'outlined') {
        const borderColors = {
            primary: 'border-primary text-primary hover:bg-primary/5',
            secondary: 'border-slate-200 text-txt-secondary hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800',
            success: 'border-green-500 text-green-500 hover:bg-green-50',
            info: 'border-blue-500 text-blue-500 hover:bg-blue-50',
            warn: 'border-amber-500 text-amber-500 hover:bg-amber-50',
            danger: 'border-red-500 text-red-500 hover:bg-red-50',
            contrast: 'border-slate-900 text-slate-900 hover:bg-slate-50 dark:border-white dark:text-white dark:hover:bg-slate-800'
        };
        return `border-1 ${borderColors[sev] || borderColors.primary}`;
    }

    if (props.variant === 'icon') {
        return 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 hover:shadow-md hover:-translate-y-0.5';
    }

    // Default: background (contained)
    const bgColors = {
        primary: 'bg-primary-700 text-white hover:bg-primary-600 shadow-lg shadow-primary/20',
        secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 shadow-sm hover:-translate-y-0.5',
        success: 'bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-500/20 hover:shadow-green-500/30 hover:-translate-y-0.5',
        info: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5',
        warn: 'bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:-translate-y-0.5',
        danger: 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/20 hover:shadow-red-500/30 hover:-translate-y-0.5',
        contrast: 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 shadow-lg shadow-slate-900/10 dark:shadow-none hover:-translate-y-0.5'
    };
    return bgColors[sev] || bgColors.primary;
});
</script>

<style scoped>
.app-button {
    outline: none !important;
}
</style>
