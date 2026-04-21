<template>
    <div class="flex items-center">
        <EzzeButton type="button" @click="toggleMenu" variant="ghost" :icon="currentIcon"
            class="h-11! w-11! rounded-full px-0! py-0! bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-200"
            aria-label="Toggle theme" />
        <Menu ref="menu" :model="items" :popup="true" :pt="menuStyle">
            <template #item="{ item, props }">
                <div :class="[theme === item.id ? 'bg-slate-50 dark:bg-slate-700' : '']"
                    class="flex items-center px-lg py-md gap-md cursor-pointer group transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
                    v-bind="props.action" @click="item.command">
                    <i :class="[item.icon, theme === item.id ? 'text-primary-500 dark:text-primary-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300']"
                        class="text-base transition-colors" />
                    <span
                        :class="[theme === item.id ? ' font-semibold text-primary-500 dark:text-primary-400' : 'text-slate-600 dark:text-slate-300 font-medium group-hover:text-slate-900 dark:group-hover:text-white']"
                        class="text-sm transition-colors flex-1">{{ item.label }}</span>
                </div>
            </template>
        </Menu>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Menu from 'primevue/menu';
import { useDarkMode } from '@shared/composables/useDarkMode';
import EzzeButton from "../Form/EzzeButton.vue";

const { theme, setTheme } = useDarkMode();
const menu = ref();

const items = ref([
    { id: 'light', label: 'Light', icon: 'pi pi-sun', command: () => setTheme('light') },
    { id: 'dark', label: 'Dark', icon: 'pi pi-moon', command: () => setTheme('dark') },
    { id: 'system', label: 'System', icon: 'pi pi-desktop', command: () => setTheme('system') }
]);

const toggleMenu = (event) => {
    menu.value.toggle(event);
};

const currentIcon = computed(() => {
    switch (theme.value) {
        case 'light': return 'pi pi-sun';
        case 'dark': return 'pi pi-moon';
        default: return 'pi pi-desktop';
    }
});

const menuStyle = {
    root: {
        class: 'mt-sm min-w-[140px] rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl overflow-hidden'
    },
    menu: { class: 'py-xs list-none m-0' }
};
</script>
