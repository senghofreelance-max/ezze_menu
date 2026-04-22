<template>
    <section class="space-y-lg">

        <!-- Page Header -->
        <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
                <div class="flex items-center gap-2 mb-1">
                    <span class="text-xs font-bold uppercase tracking-widest text-muted">Catalog</span>
                    <i class="pi pi-chevron-right text-[10px] text-muted"></i>
                    <span class="text-xs font-bold uppercase tracking-widest text-primary">Products</span>
                </div>
                <h1 class="app-section-title">Product List</h1>
                <p class="app-section-copy mt-1">
                    Manage menu items, pricing, stock, and availability.
                </p>
            </div>
            <div class="flex items-center gap-2 shrink-0">
                <EzzeButton variant="ghost" icon="pi-download" action="Export" subject="Product">
                    Export
                </EzzeButton>
                <EzzeButton variant="primary" icon="pi-plus" @click="openCreateDialog" action="Create"
                    subject="Product">
                    New Product
                </EzzeButton>
            </div>
        </div>

        <!-- Product Table -->
        <div class="app-panel overflow-hidden">
            <EzzeDatatable doctype="Product" :loading="loading" :paginator="true" :rows="pageSize"
                :total-records="totalRecords" :show-row-number="true" :show-toolbar="true" @page="onPage"
                @sort="onSort">
                <!-- Product name + image cell -->
                <template #item_image="{ data }">
                    <div class="flex items-center gap-3">
                        <div
                            class="h-10 w-10 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700 shrink-0 flex items-center justify-center border border-border">
                            <img v-if="data.item_image" :src="data.item_image" :alt="data.item_name"
                                class="h-full w-full object-cover" />
                            <i v-else class="pi pi-image text-slate-300 dark:text-slate-600 text-sm"></i>
                        </div>
                        <div class="min-w-0">
                            <p class="text-sm font-semibold text-heading truncate">{{ data.item_name }}</p>
                            <p class="text-xs text-muted font-mono truncate">{{ data.item_code }}</p>
                        </div>
                    </div>
                </template>

                <!-- Category badge -->
                <template #item_group="{ data }">
                    <span
                        class="inline-flex items-center rounded-lg bg-slate-100 dark:bg-slate-700/70 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                        {{ data.item_group || '—' }}
                    </span>
                </template>

                <!-- Price cell -->
                <template #standard_rate="{ data }">
                    <span class="font-semibold text-heading tabular-nums">
                        {{ formatCurrency(data.standard_rate) }}
                    </span>
                </template>

                <!-- Stock cell -->
                <template #stock_qty="{ data }">
                    <div class="flex items-center justify-center gap-1.5">
                        <span :class="[
                            'text-sm font-bold tabular-nums',
                            data.stock_qty <= 0
                                ? 'text-error'
                                : data.stock_qty < 10
                                    ? 'text-warning'
                                    : 'text-success'
                        ]">{{ data.stock_qty ?? 0 }}</span>
                        <span v-if="data.stock_qty <= 0"
                            class="text-[9px] font-bold uppercase tracking-wide text-error bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 px-1.5 py-0.5 rounded">Out</span>
                        <span v-else-if="data.stock_qty < 10"
                            class="text-[9px] font-bold uppercase tracking-wide text-warning bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 px-1.5 py-0.5 rounded">Low</span>
                    </div>
                </template>

                <!-- Status badge -->
                <template #disabled="{ data }">
                    <span :class="[
                        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
                        data.disabled
                            ? 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                            : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                    ]">
                        <span :class="[
                            'h-1.5 w-1.5 rounded-full',
                            data.disabled ? 'bg-slate-400' : 'bg-emerald-500 animate-pulse'
                        ]"></span>
                        {{ data.disabled ? 'Inactive' : 'Active' }}
                    </span>
                </template>

                <!-- Row actions -->
                <template #actions>
                    <Column header="" style="width: 80px"
                        :pt="{ headerCell: { class: 'bg-slate-50 dark:bg-slate-800/80' }, bodyCell: { class: 'px-3 py-3 border-b border-slate-100 dark:border-slate-700/50' } }">
                        <template #body="{ data }">
                            <div class="flex items-center justify-center gap-1">
                                <button @click="editProduct(data)"
                                    class="h-7 w-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                                    title="Edit product">
                                    <i class="pi pi-pencil text-xs"></i>
                                </button>
                                <button @click="confirmDelete(data)"
                                    class="h-7 w-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-error hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                    title="Delete product">
                                    <i class="pi pi-trash text-xs"></i>
                                </button>
                            </div>
                        </template>
                    </Column>
                </template>
            </EzzeDatatable>
        </div>


    </section>
</template>

<script setup>
import { ref } from "vue";
import Column from "primevue/column";
import EzzeDatatable from "@shared/components/ui/DataTable/EzzeDatatable.vue";
import { EzzeButton } from "@/components/Form";

// ── Stats ─────────────────────────────────────────────────────────────────────


const loading = ref(false);
const pageSize = ref(10);
const totalRecords = ref(10);


// ── Pagination & Sorting ──────────────────────────────────────────────────────

const onPage = (event) => {
    // TODO: replace with Frappe API call using event.first and event.rows
    console.log("page", event);
};

const onSort = (event) => {
    // TODO: replace with Frappe API call using event.sortField and event.sortOrder
    console.log("sort", event);
};

// ── Formatters ────────────────────────────────────────────────────────────────

const formatCurrency = (value) =>
    value != null ? `MYR ${Number(value).toFixed(2)}` : "—";

// ── Create / Edit ─────────────────────────────────────────────────────────────

const showFormDialog = ref(false);
const editingProduct = ref(null);
const saving = ref(false);

const emptyForm = () => ({
    item_name: "",
    item_code: "",
    item_group: "",
    standard_rate: null,
    stock_qty: null,
    description: "",
    is_active: true,
});

const form = ref(emptyForm());

const openCreateDialog = () => {
    editingProduct.value = null;
    form.value = emptyForm();
    showFormDialog.value = true;
};

const editProduct = (product) => {
    editingProduct.value = product;
    form.value = { ...product, is_active: !product.disabled };
    showFormDialog.value = true;
};

const saveProduct = async () => {
    saving.value = true;
    try {
        // TODO: call frappe.call({ method: '...', args: { ...form.value } })
        await new Promise((r) => setTimeout(r, 600));
        showFormDialog.value = false;
    } finally {
        saving.value = false;
    }
};

// ── Delete ────────────────────────────────────────────────────────────────────

const showDeleteDialog = ref(false);
const deletingProduct = ref(null);
const deleting = ref(false);

const confirmDelete = (product) => {
    deletingProduct.value = product;
    showDeleteDialog.value = true;
};

const deleteProduct = async () => {
    deleting.value = true;
    try {
        // TODO: call frappe.call({ method: '...', args: { item_code: deletingProduct.value.item_code } })
        await new Promise((r) => setTimeout(r, 600));
        products.value = products.value.filter(
            (p) => p.item_code !== deletingProduct.value.item_code
        );
        showDeleteDialog.value = false;
    } finally {
        deleting.value = false;
    }
};

// ── Export ────────────────────────────────────────────────────────────────────

const exportProducts = () => {
    const headers = ["Item Code", "Product Name", "Category", "Price", "Stock", "Status"];
    const rows = products.value.map((p) => [
        p.item_code,
        p.item_name,
        p.item_group,
        formatCurrency(p.standard_rate),
        p.stock_qty,
        p.disabled ? "Inactive" : "Active",
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products.csv";
    a.click();
    URL.revokeObjectURL(url);
};
</script>
