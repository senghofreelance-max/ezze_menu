<template>
    <div
        class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm relative">
        <!-- Toolbar placed above DataTable -->
        <div v-if="showRefreshButton == true || showToolbar == true"
            class="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex justify-between items-center relative flex-wrap gap-4">

            <!-- Standard Filters Inline -->
            <div class="flex items-center gap-3 flex-wrap flex-1">
                <template v-if="standardFilterColumns.length > 0">
                    <div v-for="col in standardFilterColumns" :key="'filter-' + col.field"
                        class="flex items-center gap-2">
                        <select v-model="filterModel[col.field].operator"
                            class="text-sm border border-slate-300 dark:border-slate-600 rounded px-2 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:focus:border-primary-500 w-28">
                            <option v-for="cond in availableOperators(col)" :key="cond[0]" :value="cond[0]">
                                {{ cond[1] }}
                            </option>
                        </select>
                        <AppAutocomplete v-if="col.fieldtype === 'Link'" v-model="filterModel[col.field].value"
                            :suggestions="standardLinkSuggestions[col.field] || []"
                            @search="onStandardAutocompleteSearch($event, col)" placeholder="Search..." class="w-32"
                            size="sm" />
                        <input v-else type="text" v-model="filterModel[col.field].value"
                            @keyup.enter="applyStandardFilters"
                            class="text-sm border border-slate-300 dark:border-slate-600 rounded px-2 py-1.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:focus:border-primary-500 w-32 placeholder-slate-400 dark:placeholder-slate-500"
                            :placeholder="col.header" />
                    </div>
                    <div class="flex items-center gap-1.5 ml-2">
                        <EzzeButton @click="applyStandardFilters" variant="background" severity="primary" size="sm"
                            label="Apply" class="px-3! py-1.5!" />
                        <EzzeButton @click="clearStandardFilters" variant="outlined" severity="secondary" size="sm"
                            label="Clear" class="px-3! py-1.5!" />
                    </div>
                </template>
            </div>

            <div class="relative flex items-center gap-2">
                <EzzeDatatableFilter v-if="showToolbar" v-model="advancedFilters"
                    :advanced-filter-columns="advancedFilterColumns" :resolved-columns="resolvedColumns"
                    :global-filter-conditions="globalFilterConditions" @apply="applyFilters" @clear="clearFilters" />

                <EzzeDatatableColumnSelector v-if="showToolbar" v-model="activeColumns"
                    :advanced-filter-columns="advancedFilterColumns" @change="saveActiveColumns"
                    :mode="columnSelectorMode" />

                <EzzeDatatableColumnReorder v-if="showToolbar" :active-columns="activeColumns"
                    :advanced-filter-columns="advancedFilterColumns" @save="onColumnReorder" />

                <AppRefreshButton v-if="props.showRefreshButton" @refresh="loadData(true)" :loading="resolvedLoading"
                    size="xs" />
            </div>
        </div>

        <DataTable :value="resolvedValue" :loading="resolvedLoading" :paginator="paginator" :rows="internalRows"
            :total-records="resolvedTotalRecords" :lazy="true" :rows-per-page-options="[5, 10, 20, 50, 100]"
            :first="internalFirst" :sort-field="sortField" :sort-order="sortOrder" responsive-layout="scroll"
            paginator-template="RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
            @page="onPage" @sort="onSort" @filter="$emit('filter', $event)" :class="[
                'w-full text-sm',
                { 'opacity-60 pointer-events-none': resolvedLoading }
            ]" :pt="{
                table: { class: 'w-full border-collapse' },
                thead: { class: 'bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700' },
                headerRow: { class: '' },

                column: {
                    headerCell: ({ context }) => ({
                        class: [
                            'px-4 py-3 text-desc font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider transition-colors bg-slate-50 dark:bg-slate-800/80',
                            context.sortable ? 'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/50' : ''
                        ]
                    }),
                    bodyCell: { class: 'px-4 py-3.5 text-slate-700 dark:text-slate-300 align-middle border-b border-slate-100 dark:border-slate-700/50 bg-white dark:bg-slate-800' },
                    headerContent: { class: 'flex items-center gap-2' },
                    sortIcon: { class: 'text-[10px] text-slate-400 dark:text-slate-500' },
                    filterMenuButton: { class: 'text-slate-400 dark:text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 ml-auto' },
                },
                tbody: { class: 'divide-y divide-slate-100 dark:divide-slate-700/50 bg-white dark:bg-slate-800' },
                row: { class: 'hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors bg-white dark:bg-slate-800' },
                pcPaginator: {
                    root: { class: 'flex items-center justify-between px-6 py-3 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 text-desc text-slate-500 dark:text-slate-400 gap-4' },
                    pages: { class: 'flex items-center gap-2' },
                    content: { class: 'flex items-center gap-2 flex-1 justify-center' },
                    page: ({ context }) => ({
                        class: [
                            'w-7 h-7 rounded flex items-center justify-center transition-colors font-medium',
                            context.active
                                ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                                : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'
                        ]
                    }),
                    first: { class: 'w-7 h-7 rounded flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-500' },
                    prev: { class: 'w-7 h-7 rounded flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-500' },
                    next: { class: 'w-7 h-7 rounded flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-500' },
                    last: { class: 'w-7 h-7 rounded flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-500' },
                    current: { class: 'text-slate-400 dark:text-slate-500 ml-auto' },
                    pcRowPerPageDropdown: {
                        root: { class: 'border rounded px-2 py-1 w-16 flex justify-between focus:outline-none rounded-md cursor-pointer' },
                        listcontainer: {
                            class: 'bg-white dark:bg-slate-800 dark:text-slate-500  drop-shadow-sm/50 rounded',

                        },
                        list: { class: '' },
                        option: { class: 'py-1 px-4 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-slate-500 cursor-pointer' },
                    },
                },
                loadingOverlay: { class: 'absolute inset-0 z-20 bg-white/60 dark:bg-slate-800/60 flex items-center justify-center backdrop-blur-[1px]' },
                loadingIcon: { class: 'pi pi-spin pi-spinner text-primary-500 dark:text-primary-400 text-2xl' }
            }">
            <!-- Empty state -->
            <template #empty>
                <div class="py-12 text-center text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800">
                    <i class="pi pi-database text-3xl mb-2 block opacity-20"></i>
                    No records found.
                </div>
            </template>

            <!-- Loading state -->
            <template #loading>
                <div class="block p-2 text-center">
                    <div class="text-sm text-slate-500 dark:text-slate-300"> Loading Emergency Logs. Please wait...
                    </div>
                    <div class="pt-2"><i class="pi pi-spin pi-spinner text-primary text-2xl"></i></div>
                </div>



            </template>

            <!-- Row Numbers -->
            <Column v-if="showRowNumber" header="#" :style="{ width: '3rem' }" :pt="{
                headerCell: { class: 'w-12 text-center' },
                bodyCell: { class: 'text-center text-slate-500 dark:text-slate-300 font-medium' }
            }">
                <template #body="slotProps">
                    {{ internalFirst + slotProps.index + 1 }}
                </template>
            </Column>

            <!-- Dynamic Columns -->
            <Column v-for="col in resolvedColumns" :key="col.field" :field="col.field" :header="col.header"
                :class="col.cssClass" class="" :sortable="col.sortable" :style="col.style" :pt="{
                    headerContent: { class: ['flex items-center gap-2', col.align === 'Center' ? 'justify-center' : col.align === 'Right' ? 'justify-end' : 'justify-start'] },
                    bodyCell: { class: ['px-4 py-3.5 text-slate-700 dark:text-slate-300 align-middle border-b border-slate-100 dark:border-slate-700/50', col.align === 'Center' ? 'text-center' : col.align === 'Right' ? 'text-right' : `text-left`] },
                    columnHeaderContent: { class: ['flex items-center gap-2', col.align === 'Center' ? 'justify-center' : col.align === 'Right' ? 'justify-end' : 'justify-start'] }
                }">
                <template v-if="col.body" #body="slotProps">
                    <component :is="col.body" :data="slotProps.data" :field="col.field" />
                </template>
                <template v-else-if="col.field === 'name' && doctype" #body="slotProps">
                    <EzzeLink :value="slotProps.data[col.field]" :doctype="doctype" />
                </template>
                <template v-else-if="col.fieldtype === 'Link'" #body="slotProps">
                    <EzzeLink :value="slotProps.data[col.field]" :doctype="col.options" :showIcon="true"
                        :disabledLink="true" />
                </template>
                <template v-else-if="$slots[col.field]" #body="slotProps">
                    <slot :name="col.field" :data="slotProps.data" :index="slotProps.index"></slot>
                </template>
                <template v-else-if="col.template" #body="slotProps">
                    <div v-html="renderTemplate(col.template, slotProps.data)"></div>
                </template>
                <template v-else-if="['Date', 'Datetime'].includes(col.fieldtype)" #body="slotProps">
                    <EzzeDateTime :value="slotProps.data[col.field]" :fieldtype="col.fieldtype" />
                </template>
            </Column>

            <!-- Actions Column (Optional) -->
            <slot name="actions"></slot>
        </DataTable>


    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import AppAutocomplete from '../Form/AppAutocomplete.vue';
import EzzeDatatableFilter from './EzzeDatatableFilter.vue';
import EzzeDatatableColumnSelector from './EzzeDatatableColumnSelector.vue';
import EzzeDatatableColumnReorder from './EzzeDatatableColumnReorder.vue';
import EzzeDateTime from './EzzeDateTime.vue';
import EzzeLink from './EzzeLink.vue';
import AppRefreshButton from '../AppRefreshButton.vue';
import EzzeButton from '../Form/EzzeButton.vue';
import Mustache from 'mustache';
import { formatDate, formatTime } from '../../../services/utils';
import { getDatatableData, getFrontendPageUtilize, getFilterConditions, searchLink } from '../../../services/utils';

const props = defineProps({
    value: {
        type: Array,
        required: false,
        default: () => [],
    },
    columns: {
        type: Array,
        required: false,
        default: () => [],
    },
    loading: { type: Boolean, default: false },
    paginator: { type: Boolean, default: false },
    rows: { type: Number, default: 10 },
    totalRecords: { type: Number, default: 0 },
    lazy: { type: Boolean, default: false },
    showRefreshButton: { type: Boolean, default: true },
    doctype: { type: String, default: null },
    columnSelectorMode: { type: String, default: 'auto' },
    showRowNumber: { type: Boolean, default: false },
    showToolbar: { type: Boolean, default: true },
});

const emit = defineEmits(['page', 'sort', 'filter']);

const internalData = ref([]);
const internalColumns = ref([]);
const internalTotalRecords = ref(0);
const internalTotalPages = ref(0);
const internalLoading = ref(false);

const sortField = ref(null);
const sortOrder = ref(null);
const internalFirst = ref(0);
const internalRows = ref(props.rows);

const stateKey = computed(() => props.doctype ? `ezze_dt_state_${props.doctype}` : null);

const saveState = () => {
    if (!stateKey.value) return;
    const state = {
        sortField: sortField.value,
        sortOrder: sortOrder.value,
        first: internalFirst.value,
        rows: internalRows.value
    };
    localStorage.setItem(stateKey.value, JSON.stringify(state));
};

const loadState = () => {
    if (!stateKey.value) return;
    const stored = localStorage.getItem(stateKey.value);
    if (stored) {
        try {
            const state = JSON.parse(stored);
            sortField.value = state.sortField;
            sortOrder.value = state.sortOrder;
            internalFirst.value = state.first || 0;
            // Only use stored rows if it's one of the options
            if (state.rows) {
                internalRows.value = state.rows;
            }
        } catch (e) { }
    }
};

const resolvedValue = computed(() => props.doctype ? internalData.value : props.value);
const resolvedColumns = computed(() => (props.doctype && (!props.columns || props.columns.length === 0)) ? internalColumns.value : props.columns);
const resolvedTotalRecords = computed(() => props.doctype ? internalTotalRecords.value : props.totalRecords);
const resolvedLoading = computed(() => props.doctype ? internalLoading.value : props.loading);

const standardFilterColumns = computed(() => {
    return resolvedColumns.value.filter(c => c.in_standard_filter === 1 || c.in_standard_filter === true);
});

const filterModel = ref({});
const globalFilterConditions = ref({});

watch(standardFilterColumns, (newCols) => {
    newCols.forEach(col => {
        if (!filterModel.value[col.field]) {
            filterModel.value[col.field] = { operator: "=", value: "" };
        }
    });
}, { immediate: true });

const availableOperators = (col) => {
    let allConds = globalFilterConditions.value.conditions || [["=", "Equals"], ["!=", "Not Equals"], ["like", "Like"]];
    // We could filter invalid_condition_map based on col type if available, but for now return all
    return allConds;
};

const applyStandardFilters = () => {
    loadData();
};

const clearStandardFilters = () => {
    Object.keys(filterModel.value).forEach(k => {
        filterModel.value[k].value = "";
        filterModel.value[k].operator = "=";
    });
};

const standardLinkSuggestions = ref({});
const onStandardAutocompleteSearch = async (query, col) => {
    if (col && col.options) {
        try {
            let results = await searchLink(col.options, query);
            standardLinkSuggestions.value[col.field] = results.map(r => ({ label: r, value: r }));
        } catch (e) {
            standardLinkSuggestions.value[col.field] = [];
        }
    } else {
        standardLinkSuggestions.value[col.field] = [];
    }
};

const advancedFilters = ref([]);
const advancedFilterColumns = ref([]);

const fetchAdvancedColumns = async (force = false) => {
    if (!props.doctype) return;
    let key = 'fields_' + props.doctype;
    let stored = localStorage.getItem(key);
    if (stored && !force) {
        try {
            advancedFilterColumns.value = JSON.parse(stored);
        } catch (e) { }
    } else {
        try {
            let res = await getFrontendPageUtilize(props.doctype);
            if (res && res.valid_fields) {
                advancedFilterColumns.value = res.valid_fields;
                localStorage.setItem(key, JSON.stringify(res.valid_fields));
            }
        } catch (e) { }
    }
    syncActiveColumnsFromStorage();
};

const activeColumns = ref([]);

const saveActiveColumns = () => {
    if (props.doctype) {
        let key = 'selected_cols_' + props.doctype;
        localStorage.setItem(key, JSON.stringify(activeColumns.value));
        loadData();
    }
};

const onColumnReorder = (newOrder) => {
    activeColumns.value = newOrder;
    if (props.doctype) {
        let key = 'selected_cols_' + props.doctype;
        localStorage.setItem(key, JSON.stringify(newOrder));
    }
    loadData();
};

const syncActiveColumnsFromStorage = () => {
    if (!props.doctype) return;
    let key = 'selected_cols_' + props.doctype;
    let storedCols = localStorage.getItem(key);
    if (storedCols) {
        try {
            activeColumns.value = JSON.parse(storedCols);
        } catch (e) { }
    } else {
        // Init active columns logically if no settings found (using prior list view mapping or slice)
        activeColumns.value = advancedFilterColumns.value.filter(c => c.in_list_view).map(c => c.fieldname);
        if (activeColumns.value.length === 0) {
            activeColumns.value = resolvedColumns.value.map(c => c.field);
        }
        localStorage.setItem(key, JSON.stringify(activeColumns.value));
    }
};

const applyFilters = () => {
    loadData();
};

const clearFilters = () => {
    loadData();
};

const loadData = async (forceRefreshLayout = false) => {
    if (!props.doctype) return;

    if (forceRefreshLayout) {
        await fetchAdvancedColumns(true);
    }

    internalLoading.value = true;
    try {
        let limit_start = internalFirst.value;
        let limit_page_length = internalRows.value;
        let filters = [];
        let myFields = null;

        if (activeColumns.value && activeColumns.value.length > 0) {
            let fetchCols = [...activeColumns.value];

            // Auto-detect fields needed by active templates
            const templateFields = new Set();
            advancedFilterColumns.value.forEach(f => {
                const template = f.template;
                if (template && fetchCols.includes(f.fieldname)) {
                    // Match {{field}} and {{#field}} patterns
                    const matches = template.matchAll(/\{\{#?([a-zA-Z0-9_]+)\}\}/g);
                    for (const match of matches) {
                        templateFields.add(match[1]);
                    }
                }
            });

            // Merge template fields into our fetch list
            templateFields.forEach(tf => {
                if (!fetchCols.includes(tf)) {
                    fetchCols.push(tf);
                }
            });

            myFields = JSON.stringify(fetchCols);
        }

        // Apply standard filters
        for (const [field, fData] of Object.entries(filterModel.value)) {
            if (fData.value !== undefined && fData.value !== null && fData.value !== "") {
                filters.push([props.doctype, field, fData.operator || "=", fData.value]);
            }
        }

        // Apply advanced filters
        advancedFilters.value.forEach(fData => {
            if (fData.value !== undefined && fData.value !== null && fData.value !== "") {
                let v = fData.value;
                if (typeof v === 'object' && v.value) v = v.value; // handle autocomplete object value
                filters.push([props.doctype, fData.field, fData.operator || "=", v]);
            }
        });

        let order_by = null;
        if (sortField.value) {
            order_by = `${sortField.value} ${sortOrder.value === 1 ? 'asc' : 'desc'}`;
        }

        const res = await getDatatableData(props.doctype, myFields, JSON.stringify(filters), limit_start, limit_page_length, order_by);
        if (res) {
            internalData.value = res.data || [];
            internalTotalRecords.value = res.total || 0;

            if (res.columns && res.columns.length) {
                // Merge templates from advancedFilterColumns (which come from get_page_utilize)
                let fieldsWithTemplates = {};
                advancedFilterColumns.value.forEach(f => {
                    if (f.template) fieldsWithTemplates[f.fieldname] = f.template;
                });

                // Only show columns that are explicitly active
                internalColumns.value = res.columns
                    .filter(col => activeColumns.value.includes(col.field))
                    .map(col => {
                        if (fieldsWithTemplates[col.field]) {
                            return { ...col, template: fieldsWithTemplates[col.field] };
                        }
                        return col;
                    });
            }
            internalTotalPages.value = res.total_pages || 0;
        }
    } catch (e) {
        console.error("Failed to load datatable data", e);
    } finally {
        internalLoading.value = false;
    }
};

const renderTemplate = (template, row) => {
    if (!template) return "";
    try {
        // Pre-format any date fields in the data for easy template use
        Object.keys(row).forEach(key => {
            const val = row[key];
            if (val && typeof val === 'string' && /^\d{4}-\d{2}-\d{2}/.test(val)) {
                const dateVal = formatDate(val, false);
                const timeVal = formatTime(val);
                const dtVal = formatDate(val, true);

                row[key + '_date'] = dateVal;
                row[key + '_time'] = timeVal;
                row[key + '_datetime'] = dtVal;

                // Provide a pre-built HTML layout that matches the EzzeDateTime component
                row[key + '_datetime_html'] = `
                    <div class="flex flex-col font-mono text-[13px] leading-tight">
                        <span class="text-slate-700 dark:text-slate-200 font-medium whitespace-nowrap flex items-center gap-1.5">
                            <i class="pi pi-calendar opacity-50 text-[11px]"></i>
                            ${dateVal}
                        </span>
                        <span class="text-[11px] text-slate-500 dark:text-slate-400 whitespace-nowrap flex items-center gap-1.5 mt-0.5">
                            <i class="pi pi-clock opacity-50 text-[10px]"></i>
                            ${timeVal}
                        </span>
                    </div>`.replace(/\n/g, '').replace(/\s+/g, ' ');
            }
        });

        return Mustache.render(template, row);
    } catch (e) {
        console.error("Mustache render failed", e);
        return "";
    }
};
const onPage = (event) => {
    internalFirst.value = event.first;
    internalRows.value = event.rows;
    saveState();
    if (props.doctype) {
        loadData();
    }
    emit('page', event);
};

const onSort = (event) => {
    sortField.value = event.sortField;
    sortOrder.value = event.sortOrder;
    saveState();
    if (props.doctype) {
        loadData();
    }
    emit('sort', event);
};

onMounted(async () => {
    if (props.doctype) {
        loadState();

        let storedFilters = localStorage.getItem("filterConditions");
        if (storedFilters) {
            try {
                globalFilterConditions.value = JSON.parse(storedFilters);
            } catch (e) { }
        }

        if (!globalFilterConditions.value || !globalFilterConditions.value.conditions) {
            try {
                let remoteCondition = await getFilterConditions();
                if (remoteCondition && remoteCondition.conditions) {
                    globalFilterConditions.value = remoteCondition;
                    localStorage.setItem("filterConditions", JSON.stringify(remoteCondition));
                }
            } catch (e) { }
        }

        await fetchAdvancedColumns();
        loadData();
    }
});
</script>
