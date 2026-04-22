<template>
    <div class="relative">
        <!-- Reorder Columns Button -->
        <EzzeButton
            @click="openDialog"
            variant="outlined"
            severity="secondary"
            icon="pi-sort-alt"
            size="sm"
            class="w-8! h-8! p-0!"
            title="Reorder Columns"
        />

        <!-- Reorder Dialog -->
        <AppDialog v-model="showDialog" title="Reorder Columns" maxWidth="md">
            <!-- Instruction -->
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-1.5">
                <i class="pi pi-info-circle text-primary-400"></i>
                Drag and drop columns to change their display order.
            </p>

            <!-- Draggable Column List -->
            <div class="flex flex-col gap-2" ref="listRef">
                <div
                    v-for="(col, index) in orderedColumns"
                    :key="col.fieldname || col"
                    :data-index="index"
                    draggable="true"
                    @dragstart="onDragStart($event, index)"
                    @dragover.prevent="onDragOver($event, index)"
                    @dragleave="onDragLeave($event)"
                    @drop="onDrop($event, index)"
                    @dragend="onDragEnd"
                    class="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 border rounded-lg cursor-grab active:cursor-grabbing select-none transition-all duration-150"
                    :class="[
                        dragOverIndex === index
                            ? 'border-primary-400 dark:border-primary-500 shadow-md bg-primary-50/60 dark:bg-primary-900/20 scale-[1.01]'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm',
                        dragSourceIndex === index
                            ? 'opacity-40 scale-95'
                            : 'opacity-100'
                    ]"
                >
                    <!-- Drag Handle -->
                    <div class="flex flex-col gap-[3px] shrink-0">
                        <span class="flex gap-[3px]">
                            <span class="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500"></span>
                            <span class="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500"></span>
                        </span>
                        <span class="flex gap-[3px]">
                            <span class="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500"></span>
                            <span class="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500"></span>
                        </span>
                        <span class="flex gap-[3px]">
                            <span class="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500"></span>
                            <span class="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500"></span>
                        </span>
                    </div>

                    <!-- Position Badge -->
                    <span class="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs font-semibold flex items-center justify-center shrink-0">
                        {{ index + 1 }}
                    </span>

                    <!-- Column Label -->
                    <span class="text-sm font-medium text-slate-700 dark:text-slate-200 flex-1 truncate">
                        {{ getColumnLabel(col) }}
                    </span>

                    <!-- Drop indicator arrow -->
                    <i
                        v-if="dragOverIndex === index && dragSourceIndex !== index"
                        class="pi pi-arrow-left text-primary-500 dark:text-primary-400 text-xs"
                    ></i>
                </div>
            </div>

            <div v-if="orderedColumns.length === 0" class="text-sm text-slate-400 dark:text-slate-500 text-center py-10">
                <i class="pi pi-table text-2xl block mb-2 opacity-30"></i>
                No active columns to reorder.
            </div>

            <template #footer>
                <EzzeButton
                    @click="resetOrder"
                    variant="outlined"
                    severity="secondary"
                    icon="pi-refresh"
                    label="Reset"
                    size="sm"
                    class="px-4! py-2! mr-auto!"
                />
                <EzzeButton
                    @click="cancelDialog"
                    variant="outlined"
                    severity="secondary"
                    label="Cancel"
                    size="sm"
                    class="px-5! py-2!"
                />
                <EzzeButton
                    @click="saveOrder"
                    variant="background"
                    severity="primary"
                    icon="pi-save"
                    label="Save Order"
                    size="sm"
                    class="px-5! py-2!"
                />
            </template>
        </AppDialog>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import AppDialog from '../Dialog/AppDialog.vue';
import EzzeButton from '../Form/EzzeButton.vue';

const props = defineProps({
    // Array of fieldname strings (activeColumns)
    activeColumns: {
        type: Array,
        default: () => []
    },
    // Full column metadata from advancedFilterColumns (for labels)
    advancedFilterColumns: {
        type: Array,
        default: () => []
    }
});

const emit = defineEmits(['save']);

const showDialog = ref(false);
const orderedColumns = ref([]);

// Drag state
const dragSourceIndex = ref(null);
const dragOverIndex = ref(null);

// Build a label map from advancedFilterColumns
const getColumnLabel = (fieldname) => {
    const meta = props.advancedFilterColumns.find(f => (f.fieldname || f) === fieldname);
    return meta ? (meta.label || meta.fieldname || fieldname) : fieldname;
};

const openDialog = () => {
    // Clone current active columns order into dialog state
    orderedColumns.value = [...props.activeColumns];
    dragSourceIndex.value = null;
    dragOverIndex.value = null;
    showDialog.value = true;
};

const cancelDialog = () => {
    showDialog.value = false;
};

const resetOrder = () => {
    // Reset to the original activeColumns ordering (as passed from parent)
    orderedColumns.value = [...props.activeColumns];
};

// ── Drag & Drop ──────────────────────────────────────────────────────────────

const onDragStart = (evt, index) => {
    dragSourceIndex.value = index;
    // Use ghost image / effectAllowed
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('text/plain', String(index));
};

const onDragOver = (evt, index) => {
    dragOverIndex.value = index;
    evt.dataTransfer.dropEffect = 'move';
};

const onDragLeave = (evt) => {
    // Only clear if we're truly leaving the row (not moving into a child)
    if (!evt.currentTarget.contains(evt.relatedTarget)) {
        dragOverIndex.value = null;
    }
};

const onDrop = (evt, targetIndex) => {
    evt.preventDefault();
    const from = dragSourceIndex.value;
    if (from === null || from === targetIndex) {
        dragSourceIndex.value = null;
        dragOverIndex.value = null;
        return;
    }

    const cols = [...orderedColumns.value];
    const [removed] = cols.splice(from, 1);
    cols.splice(targetIndex, 0, removed);
    orderedColumns.value = cols;

    dragSourceIndex.value = null;
    dragOverIndex.value = null;
};

const onDragEnd = () => {
    dragSourceIndex.value = null;
    dragOverIndex.value = null;
};

// ── Save ─────────────────────────────────────────────────────────────────────

const saveOrder = () => {
    showDialog.value = false;
    emit('save', [...orderedColumns.value]);
};
</script>
