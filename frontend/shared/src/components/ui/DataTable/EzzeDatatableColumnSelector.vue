<template>
    <div class="relative">
        <!-- Columns Toggle Button -->
        <EzzeButton
            @click="toggleColumnSelector"
            variant="outlined"
            severity="secondary"
            icon="pi-table"
            size="sm"
            class="w-8! h-8! p-0!"
            title="Select Columns"
        />

        <!-- Dropdown column selector mode -->
        <template v-if="showColumnsDropdown">
            <div @click="closeColumnsDropdownAndSave" class="fixed inset-0 z-40"></div>
            <div class="absolute right-0 top-12 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl z-50 flex flex-col max-h-[400px]">
                <div class="p-3 border-b border-slate-100 dark:border-slate-700 font-semibold text-sm text-slate-700 dark:text-slate-200 flex justify-between items-center">
                    <span>Select Columns</span>
                    <i class="pi pi-check text-primary-600 dark:text-primary-400 text-xs"></i>
                </div>
                <div class="p-2 overflow-y-auto flex flex-col gap-1">
                    <label v-for="col in advancedFilterColumns" :key="col.fieldname"
                        class="flex items-center gap-2 px-2 py-1.5 rounded transition-colors"
                        :class="isLocked(col.fieldname) ? 'cursor-not-allowed opacity-70' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer'"
                    >
                        <input
                            type="checkbox"
                            :value="col.fieldname"
                            :checked="isLocked(col.fieldname) ? true : internalActiveColumns.includes(col.fieldname)"
                            :disabled="isLocked(col.fieldname)"
                            @change="!isLocked(col.fieldname) && toggleColumn(col.fieldname)"
                            class="mt-0.5 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 checked:bg-primary-600 dark:checked:bg-primary-500 text-primary-600 dark:text-primary-500 focus:ring-primary-500 dark:focus:ring-offset-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
                        />
                        <span class="text-sm text-slate-700 dark:text-slate-300 font-medium leading-tight flex-1">{{ col.label || col.fieldname }}</span>
                        <span v-if="isLocked(col.fieldname)" class="flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700/50 rounded px-1.5 py-0.5 font-semibold shrink-0">
                            <i class="pi pi-lock text-[9px]"></i> Always
                        </span>
                    </label>
                </div>
            </div>
        </template>

        <!-- Dialog column selector mode using AppDialog -->
        <AppDialog v-model="showColumnsDialog" title="Select Columns" maxWidth="2xl">
            <div class="relative mb-5">
                <i class="pi pi-search absolute left-3 top-2.5 text-slate-400 dark:text-slate-500 text-sm"></i>
                <input type="text" v-model="columnSearchQuery" placeholder="Search fields..." class="w-full text-sm border border-slate-300 dark:border-slate-600 rounded-lg pl-9 pr-3 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-500/30 focus:border-primary-500 dark:focus:border-primary-400 outline-none shadow-sm transition-all" />
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <label
                    v-for="col in filteredAdvancedColumns"
                    :key="col.fieldname"
                    class="flex flex-col gap-2 p-3 rounded-lg border transition-all"
                    :class="isLocked(col.fieldname)
                        ? 'cursor-not-allowed bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 opacity-80'
                        : 'cursor-pointer bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-500 hover:shadow-sm'"
                >
                    <div class="flex items-start gap-2">
                        <input
                            type="checkbox"
                            :value="col.fieldname"
                            :checked="isLocked(col.fieldname) ? true : internalActiveColumns.includes(col.fieldname)"
                            :disabled="isLocked(col.fieldname)"
                            @change="!isLocked(col.fieldname) && toggleColumn(col.fieldname)"
                            class="mt-0.5 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 checked:bg-primary-600 dark:checked:bg-primary-500 text-primary-600 dark:text-primary-500 focus:ring-primary-500 dark:focus:ring-offset-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
                        />
                        <span class="text-sm text-slate-700 dark:text-slate-300 font-medium leading-tight select-none wrap-break-word flex-1" :title="col.label">{{ col.label || col.fieldname }}</span>
                    </div>
                    <span v-if="isLocked(col.fieldname)" class="flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700/50 rounded px-1.5 py-0.5 font-semibold self-start">
                        <i class="pi pi-lock text-[9px]"></i> Always visible
                    </span>
                </label>
            </div>
            <div v-if="filteredAdvancedColumns.length===0" class="text-sm text-slate-400 dark:text-slate-500 text-center py-8">
                No fields matched your search.
            </div>

            <template #footer>
                <EzzeButton
                    @click="closeColumnsDialog"
                    variant="outlined"
                    severity="secondary"
                    label="Cancel"
                    class="px-5! py-2!"
                />
                <EzzeButton
                    @click="saveColumnsAndCloseDialog"
                    variant="background"
                    severity="primary"
                    icon="pi-save"
                    label="Save Preferences"
                    class="px-5! py-2!"
                />
            </template>
        </AppDialog>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import AppDialog from '../Dialog/AppDialog.vue';
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
    mode: {
        type: String,
        default: 'auto' // 'auto', 'dropdown', 'dialog'
    }
});

const emit = defineEmits(['update:modelValue', 'change']);

// Columns that are always shown and cannot be deselected
const LOCKED_COLUMNS = ['name'];
const isLocked = (fieldname) => LOCKED_COLUMNS.includes(fieldname);

const internalActiveColumns = ref([...props.modelValue]);

watch(() => props.modelValue, (newVal) => {
    internalActiveColumns.value = [...newVal];
}, { deep: true });

// Toggle a non-locked column on/off manually (since we replaced v-model)
const toggleColumn = (fieldname) => {
    const idx = internalActiveColumns.value.indexOf(fieldname);
    if (idx === -1) {
        internalActiveColumns.value = [...internalActiveColumns.value, fieldname];
    } else {
        internalActiveColumns.value = internalActiveColumns.value.filter(f => f !== fieldname);
    }
};

// Always ensure locked columns are present in the emitted value
const withLocked = (cols) => {
    const result = [...cols];
    LOCKED_COLUMNS.forEach(lc => {
        if (!result.includes(lc)) result.unshift(lc);
    });
    return result;
};

const showColumnsDropdown = ref(false);
const showColumnsDialog = ref(false);
const columnSearchQuery = ref("");

const isDialogMode = computed(() => {
    if (props.mode === 'dialog') return true;
    if (props.mode === 'dropdown') return false;
    // auto mode: if fields > 15, use dialog
    return props.advancedFilterColumns.length > 15;
});

const toggleColumnSelector = () => {
    if (isDialogMode.value) {
        showColumnsDialog.value = true;
        columnSearchQuery.value = "";
        internalActiveColumns.value = [...props.modelValue];
    } else {
        showColumnsDropdown.value = !showColumnsDropdown.value;
    }
};

const filteredAdvancedColumns = computed(() => {
    if(!columnSearchQuery.value) return props.advancedFilterColumns;
    const q = columnSearchQuery.value.toLowerCase();
    return props.advancedFilterColumns.filter(c => c.label && c.label.toLowerCase().includes(q));
});

const closeColumnsDropdownAndSave = () => {
    showColumnsDropdown.value = false;
    emit('update:modelValue', withLocked(internalActiveColumns.value));
    emit('change');
};

const closeColumnsDialog = () => {
    showColumnsDialog.value = false;
    internalActiveColumns.value = [...props.modelValue];
};

const saveColumnsAndCloseDialog = () => {
    showColumnsDialog.value = false;
    emit('update:modelValue', withLocked(internalActiveColumns.value));
    emit('change');
};
</script>
