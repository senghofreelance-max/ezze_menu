<template>
    <div class="flex flex-col font-mono text-[13px] leading-tight">
        <span v-if="showDate" class="text-slate-700 dark:text-slate-200 font-medium whitespace-nowrap flex items-center gap-1.5">
            <i class="pi pi-calendar opacity-50 text-[11px]"></i>
            {{ datePart }}
        </span>
        <span v-if="showTime" class="text-[11px] text-slate-500 dark:text-slate-400 whitespace-nowrap flex items-center gap-1.5"
            :class="{ 'mt-0.5': showDate }">
            <i class="pi pi-clock opacity-50 text-[10px]"></i>
            {{ timePart }}
        </span>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { formatDate, formatTime } from '../../../services/utils';

const props = defineProps({
    value: {
        type: String,
        default: ""
    },
    fieldtype: {
        type: String,
        default: "Date"
    },
    // Allows explicit override: 'both', 'date', 'time'
    displayMode: {
        type: String,
        default: 'auto'
    }
});

const showDate = computed(() => {
    if (props.displayMode === 'time') return false;
    if (props.displayMode === 'date' || props.displayMode === 'both') return true;
    return ['Date', 'Datetime'].includes(props.fieldtype);
});

const showTime = computed(() => {
    if (props.displayMode === 'date') return false;
    if (props.displayMode === 'time' || props.displayMode === 'both') return true;
    return props.fieldtype === 'Datetime';
});

const datePart = computed(() => formatDate(props.value, false));
const timePart = computed(() => formatTime(props.value));
</script>
