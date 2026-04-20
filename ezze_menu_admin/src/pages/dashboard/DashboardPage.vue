<template>
    <section class="space-y-lg">
        <div class="grid gap-md md:grid-cols-2 xl:grid-cols-4">
            <article v-for="stat in adminStore.stats" :key="stat.label" class="app-panel p-lg">
                <p class="text-sm font-semibold text-muted">{{ stat.label }}</p>
                <div class="mt-md flex items-center justify-between gap-3">
                    <p class="text-4xl font-extrabold text-heading">{{ stat.value }}</p>
                    <span :class="['rounded-full px-sm py-xs text-xs font-bold', stat.tone]">
                        Live
                    </span>
                </div>
            </article>
        </div>

        <div class="grid gap-lg xl:grid-cols-[1.15fr_0.85fr]">
            <div class="app-panel p-lg">
                <div class="flex items-center justify-between gap-3">
                    <div>
                        <h2 class="app-section-title">Recent Orders</h2>
                        <p class="app-section-copy">Replace the sample dataset with Frappe API results through the
                            shared SDK client.</p>
                    </div>
                    <EzzeButton variant="secondary" @click="dialogVisible = true">New Action</EzzeButton>
                </div>

                <div class="mt-lg overflow-hidden rounded-2xl border border-border">
                    <div v-for="order in adminStore.recentOrders" :key="order.id"
                        class="grid gap-sm border-b border-border px-md py-md last:border-b-0 md:grid-cols-[1fr_1fr_auto_auto]">
                        <div>
                            <p class="font-semibold text-heading">{{ order.id }}</p>
                            <p class="text-sm text-muted">{{ order.customer }}</p>
                        </div>
                        <p class="text-sm text-body">{{ order.status }}</p>
                        <p class="text-sm font-semibold text-heading">{{ order.amount }}</p>
                        <button class="text-sm font-semibold text-secondary">Inspect</button>
                    </div>
                </div>
            </div>

            <div class="app-panel p-lg">
                <h2 class="app-section-title">Operational Notes</h2>
                <p class="mt-sm text-sm leading-7 text-muted">
                    The admin shell reuses a shared `MainLayout`, `Form`, `Dialog`, and `Toast` foundation so menu,
                    order, and reporting modules can stay consistent as the dashboard grows.
                </p>
                <ul class="mt-lg space-y-sm text-sm text-body">
                    <li class="rounded-2xl border border-border px-md py-sm">Light and dark theme support is enabled
                        globally.</li>
                    <li class="rounded-2xl border border-border px-md py-sm">Protected routes use a session guard
                        similar to 1122.</li>
                    <li class="rounded-2xl border border-border px-md py-sm">Frappe API requests can use the Vite proxy
                        in development.</li>
                </ul>
            </div>
        </div>

        <AppDialog v-model:visible="dialogVisible" title="Reusable Dialog"
            description="This is wired through the shared PrimeVue unstyled setup.">
            <div class="space-y-md">
                <p class="text-sm text-body">Use this shared dialog wrapper for confirmations and CRUD flows.</p>
                <div class="flex justify-end">
                    <AppButton variant="primary" @click="dialogVisible = false">Close</AppButton>
                </div>
            </div>
        </AppDialog>
    </section>
</template>

<script setup>
import { ref } from "vue";
import { useAdminStore } from "../../stores/admin";
import { EzzeButton } from "@/components/Form";
import AppDialog from "@shared/components/ui/Dialog/AppDialog.vue";

const adminStore = useAdminStore();
const dialogVisible = ref(false);
</script>
