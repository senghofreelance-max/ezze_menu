<template>
    <div class="relative">
        <EzzeButton
            @click="showFilterPopover = !showFilterPopover"
            variant="outlined"
            severity="secondary"
            icon="pi-filter"
            size="sm"
            class="font-medium!"
        >
            Filter
            <span v-if="modelValue.length > 0"
                class="ml-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full px-1.5 py-0.5 text-[10px]">{{
                    modelValue.length }}</span>
        </EzzeButton>

        <!-- Filter Popover -->

        <div v-if="showFilterPopover"
            class="absolute top-10 right-0 w-[480px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 flex flex-col">
            <div class="p-4 flex flex-col gap-3 max-h-[300px] overflow-y-auto">

                <div v-for="(filter, index) in modelValue" :key="index" class="flex items-center gap-2">
                    <!-- Field Dropdown -->
                    <select v-model="filter.field" @change="onFilterFieldChange(filter)"
                        class="flex-1 text-sm border border-slate-300 dark:border-slate-600 rounded px-2 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:focus:border-primary-500">
                        <option v-for="col in (advancedFilterColumns.length ? advancedFilterColumns : resolvedColumns)"
                            :key="col.fieldname || col.field" :value="col.fieldname || col.field">
                            {{ col.label || col.header }}
                        </option>
                    </select>

                    <!-- Operator Dropdown -->
                    <select v-model="filter.operator"
                        class="w-32 text-sm border border-slate-300 dark:border-slate-600 rounded px-2 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:focus:border-primary-500">
                        <option v-for="cond in availableAdvancedOperators(filter.field)" :key="cond[0]"
                            :value="cond[0]">
                            {{ cond[1] }}
                        </option>
                    </select>

                    <!-- Value Input (Link vs Default) -->
                    <div class="flex-1">
                        <AppAutocomplete v-if="getFieldtype(filter.field) === 'Link'" v-model="filter.value"
                            :suggestions="autocompleteSuggestions(filter.field)"
                            @search="onAutocompleteSearch($event, filter.field)" placeholder="Search..." size="sm" />
                        <input v-else type="text" v-model="filter.value"
                            class="w-full text-sm border border-slate-300 dark:border-slate-600 rounded px-2 py-1.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Value..." />
                    </div>

                    <!-- Remove button -->
                    <EzzeButton
                        @click="removeFilter(index)"
                        variant="text"
                        icon="pi-times"
                        size="xs"
                        class="text-slate-400! dark:text-slate-500! hover:text-red-500! dark:hover:text-red-400! transition-colors"
                    />
                </div>

                <div v-if="modelValue.length === 0" class="text-xs text-slate-500 dark:text-slate-400 p-2 text-center">
                    No filters applied. Click "+ Add a Filter" to start.
                </div>
            </div>

            <div
                class="px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between rounded-b-xl">
                <EzzeButton
                    @click="addFilter"
                    variant="text"
                    icon="pi-plus"
                    size="sm"
                    label="Add a Filter"
                    class="text-primary-600! dark:text-primary-400! hover:text-primary-800! dark:hover:text-primary-300! font-medium!"
                />
                <div class="flex items-center gap-2">
                    <EzzeButton
                        @click="clearFilters"
                        variant="outlined"
                        severity="secondary"
                        size="sm"
                        label="Clear Filters"
                    />
                    <EzzeButton
                        @click="applyFilters"
                        variant="background"
                        severity="primary"
                        size="sm"
                        label="Apply Filters"
                    />
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import AppAutocomplete from '../Form/AppAutocomplete.vue';
import EzzeButton from '../Form/EzzeButton.vue';

const props = defineProps({
    modelValue: {
        type: Array,
        required: true
    },
    advancedFilterColumns: {
        type: Array,
        default: () => []
    },
    resolvedColumns: {
        type: Array,
        default: () => []
    },
    globalFilterConditions: {
        type: Object,
        default: () => ({})
    },
    showRefreshButton: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(['update:modelValue', 'apply', 'clear']);

const showFilterPopover = ref(false);

const getFieldtype = (fieldName) => {
    let col = props.advancedFilterColumns.find(c => c.fieldname === fieldName);
    if (!col) {
        col = props.resolvedColumns.find(c => c.field === fieldName);
    }
    return col ? (col.fieldtype || 'Data') : 'Data';
};

const availableAdvancedOperators = (fieldName) => {
    const fieldtype = getFieldtype(fieldName);
    let allConds = props.globalFilterConditions.conditions || [["=", "Equals"], ["!=", "Not Equals"], ["like", "Like"]];
    const invalidMap = props.globalFilterConditions.invalid_condition_map || {};
    const specialLabels = props.globalFilterConditions.special_condition_labels || {};

    let validConds = allConds;
    if (invalidMap[fieldtype]) {
        validConds = allConds.filter(c => !invalidMap[fieldtype].includes(c[0]));
    }

    if (specialLabels[fieldtype]) {
        return validConds.map(c => {
            if (specialLabels[fieldtype][c[0]]) {
                return [c[0], specialLabels[fieldtype][c[0]]];
            }
            return c;
        });
    }

    return validConds;
};

const onFilterFieldChange = (filter) => {
    const validOperators = availableAdvancedOperators(filter.field);
    if (!validOperators.find(c => c[0] === filter.operator)) {
        filter.operator = validOperators.length > 0 ? validOperators[0][0] : "=";
    }
    filter.value = "";
};

const addFilter = () => {
    const sourceCols = props.advancedFilterColumns.length ? props.advancedFilterColumns : props.resolvedColumns;
    if (sourceCols.length > 0) {
        const field = sourceCols[0].fieldname || sourceCols[0].field;
        const op = availableAdvancedOperators(field)[0]?.[0] || "=";
        const newFilters = [...props.modelValue, { field: field, operator: op, value: "" }];
        emit('update:modelValue', newFilters);
    }
};

const removeFilter = (index) => {
    const newFilters = [...props.modelValue];
    newFilters.splice(index, 1);
    emit('update:modelValue', newFilters);
};

const applyFilters = () => {
    showFilterPopover.value = false;
    emit('apply');
};

const clearFilters = () => {
    emit('update:modelValue', []);
    showFilterPopover.value = false;
    emit('clear');
};

// Autocomplete API integration
import { searchLink } from '../../../services/utils';

const linkSuggestions = ref({});
const autocompleteSuggestions = (fieldName) => linkSuggestions.value[fieldName] || [];
const onAutocompleteSearch = async (query, fieldName) => {
    let col = props.advancedFilterColumns.find(c => c.fieldname === fieldName) || props.resolvedColumns.find(c => c.field === fieldName);
    if (col && col.options) {
        try {
            let results = await searchLink(col.options, query);
            linkSuggestions.value[fieldName] = results.map(r => ({ label: r, value: r }));
        } catch (e) {
            linkSuggestions.value[fieldName] = [];
        }
    } else {
        linkSuggestions.value[fieldName] = [];
    }
};
</script>
