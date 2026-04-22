<template>
    <div class="flex items-center gap-1.5 min-w-0">
        <i v-if="showIcon" class="pi pi-link text-[10px] text-slate-400 dark:text-slate-500 shrink-0"></i>
        <a v-if="!disabledLink" :href="url" @click.stop
            class="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 hover:underline transition-all truncate decoration-primary-300/50 dark:decoration-primary-500/50 underline-offset-4"
            :title="`View ${doctype} details for ${value}`">
            {{ value }}
        </a>
        <span v-else class="text-slate-500 dark:text-slate-400">{{ value }}</span>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    value: {
        type: String,
        required: true
    },
    doctype: {
        type: String,
        required: true
    },
    showIcon: {
        type: Boolean,
        default: false
    },
    disabledLink: {
        type: Boolean,
        default: false
    },

});

const url = computed(() => {
    if (!props.doctype || !props.value) return '#';
    const slug = props.doctype.toLowerCase().replace(/ /g, '-');
    return `/frontend/${slug}/${props.value}`;
});
</script>
