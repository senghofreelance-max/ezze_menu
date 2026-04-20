<template>
    <div class="app-shell flex min-h-screen">
        <aside class="hidden w-72 shrink-0 border-r border-border bg-surface px-lg py-xl lg:block">
            <div class="mb-xl">
                <p class="text-xs font-bold uppercase tracking-[0.24em] text-muted">Ezze Menu</p>
                <h1 class="mt-xs text-2xl font-extrabold text-heading">Admin Console</h1>
            </div>

            <NavSidebar />
        </aside>

        <div class="flex min-h-screen flex-1 flex-col">
            <header class="sticky top-0 z-20 border-b border-border bg-surface/90 px-lg py-xs backdrop-blur">
                <div class="flex max-w-8xl items-center justify-between gap-3">
                    <div>
                        <!-- <p class="text-xs font-bold uppercase tracking-[0.2em] text-muted">{{ title }}</p> -->
                        <h2 class="text-lg font-bold leading-tight text-heading">{{ title }}</h2>
                    </div>
                    <div class="flex items-center gap-sm">
                        <ThemeSwitcher />

                        <CurrentUser />
                    </div>
                </div>
            </header>

            <main class="flex-1 px-lg py-xl">
                <div class="mx-8 max-w-9xl">
                    <slot />
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import ThemeSwitcher from "../components/ui/ThemeSwitcher.vue";
import CurrentUser from "../components/ui/CurrentUser.vue";
import NavSidebar from "../components/ui/NavSidebar.vue";

const props = defineProps({
    title: {
        type: String,
        default: "Overview",
    },
});
</script>
