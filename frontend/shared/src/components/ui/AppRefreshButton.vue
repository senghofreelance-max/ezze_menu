<template>
    <button @click="$emit('refresh')"
        class="flex items-center justify-center rounded-xl font-medium transition-all duration-200 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed group"
        :class="[
            label ? 'px-lg py-sm gap-md' : (size === 'xs' ? 'w-8 h-8 p-xs' : 'w-10 h-10 p-sm')
        ]"
        :disabled="loading" :title="title || 'Refresh Data'">
        <i :class="['pi', loading ? 'pi-spin pi-spinner' : 'pi-refresh', sizeClass, 'transition-transform group-hover:rotate-12']"></i>
        <span v-if="label" class="text-sm">{{ label }}</span>
    </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    size: {
        type: String,
        default: 'sm' // xs, sm, md, lg
    }
});

const sizeClass = computed(() => {
    switch (props.size) {
        case 'xs': return 'text-[10px]';
        case 'md': return 'text-base';
        case 'lg': return 'text-lg';
        default: return 'text-sm';
    }
});

defineEmits(['refresh']);
</script>
