<template>
    <div class="flex flex-col gap-1 w-full">
        <label v-if="label" :for="acId" class="text-sm font-medium text-slate-700 dark:text-slate-300">
            {{ label }}
            <span v-if="required" class="text-red-500 dark:text-red-400 ml-0.5">*</span>
        </label>
        <AutoComplete :id="acId" v-model="internalValue" :suggestions="suggestions" :optionLabel="optionLabel"
            :placeholder="placeholder" :disabled="disabled" :multiple="multiple" :dropdown="dropdown"
            :forceSelection="forceSelection" :delay="delay" :minLength="minLength" :pt="{
                root: { class: 'w-full' },
                pcInputText: {
                    root: {
                        class: [
                            'w-full border text-sm text-slate-800 dark:text-slate-100 transition-all outline-none',
                            size === 'sm' ? 'rounded px-2 py-1.5' : 'rounded-lg px-3 py-2.5',
                            size === 'sm' ? 'focus:ring-1 focus:ring-primary-500 focus:border-primary-500 dark:focus:border-primary-400' : 'focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-primary-400 dark:focus:ring-primary-500/30',
                            disabled ? 'bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-primary-400 dark:hover:border-primary-400',
                            error ? 'border-red-400 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500/20 dark:focus:ring-red-500/30' : '',
                        ].filter(Boolean).join(' ')
                    }
                },
                overlay: { class: 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg mt-1 overflow-hidden z-50' },
                list: { class: 'py-1 max-h-56 overflow-y-auto' },
                option: ({ context }) => ({
                    class: [
                        'px-3 py-2.5 text-sm cursor-pointer transition-colors',
                        context.selected ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-medium' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50',
                    ].join(' ')
                }),
                emptyMessage: { class: 'px-3 py-4 text-sm text-slate-400 dark:text-slate-500 text-center' },
                chip: { class: 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full px-2 py-0.5 text-xs font-medium flex items-center gap-1' },
                chipIcon: { class: 'text-primary-500 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 cursor-pointer text-[10px]' },
            }" @complete="onComplete" @change="onChange" @item-select="onSelect" @item-unselect="onUnselect"
            @blur="$emit('blur', $event)" />
        <span v-if="error" class="text-xs text-red-500 dark:text-red-400 flex items-center gap-1">
            <i class="pi pi-exclamation-circle text-[11px]"></i>{{ error }}
        </span>
        <span v-else-if="hint" class="text-xs text-slate-400 dark:text-slate-500">{{ hint }}</span>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import AutoComplete from 'primevue/autocomplete';

const props = defineProps({
    modelValue: { default: null },
    label: { type: String, default: '' },
    placeholder: { type: String, default: 'Type to search...' },
    suggestions: { type: Array, default: () => [] },
    optionLabel: { type: String, default: 'label' },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    dropdown: { type: Boolean, default: false },
    forceSelection: { type: Boolean, default: false },
    delay: { type: Number, default: 300 },
    minLength: { type: Number, default: 1 },
    error: { type: String, default: '' },
    hint: { type: String, default: '' },
    id: { type: String, default: '' },
    size: { type: String, default: 'default' },
});

const emit = defineEmits(['update:modelValue', 'search', 'select', 'unselect', 'change', 'blur']);

const acId = computed(() => props.id || `ac-${Math.random().toString(36).slice(2, 9)}`);
const internalValue = ref(props.modelValue);

watch(() => props.modelValue, (val) => {
    internalValue.value = val;
});

const onComplete = (e) => {
    emit('search', e.query);
};

const onChange = () => {
    emit('update:modelValue', internalValue.value);
    emit('change', internalValue.value);
};

const onSelect = (e) => {
    emit('update:modelValue', internalValue.value);
    emit('select', e.value);
};

const onUnselect = (e) => {
    emit('update:modelValue', internalValue.value);
    emit('unselect', e.value);
};
</script>
