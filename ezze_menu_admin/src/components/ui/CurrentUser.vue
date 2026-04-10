<template>
    <div class="flex items-center">
        <Button type="button" @click="toggleMenu" :pt="triggerStyle" aria-label="Open current user menu">
            <div class="flex items-center gap-md">
                <Avatar v-if="avatarImage" :image="avatarImage" shape="circle"
                    class="h-9 w-9 rounded-full overflow-hidden ring-2 ring-slate-100 shadow-sm dark:ring-slate-700" />
                <Avatar v-else :label="initials" shape="circle"
                    class="h-9 w-9 rounded-full bg-primary text-xs font-bold text-primary-contrast ring-2 ring-slate-100 shadow-sm dark:ring-slate-700" />

                <div class="hidden min-w-0 text-left sm:block">
                    <p class="truncate text-sm font-bold leading-none text-heading">
                        {{ displayName }}
                    </p>
                    <p class="mt-[2px] truncate text-[11px] font-medium leading-none text-muted">
                        {{ roleLabel }}
                    </p>
                </div>

                <i class="pi pi-chevron-down hidden text-[10px] text-muted sm:block" />
            </div>
        </Button>

        <Menu ref="userMenu" :model="menuItems" :popup="true" :pt="menuStyle">
            <template #start>
                <div class="border-b border-slate-100 px-lg py-lg dark:border-slate-700/70">
                    <div class="flex items-start gap-md">
                        <Avatar v-if="avatarImage" :image="avatarImage" shape="circle"
                            class="h-12 w-12 overflow-hidden ring-2 ring-slate-100 shadow-sm dark:ring-slate-700" />
                        <Avatar v-else :label="initials" shape="circle"
                            class="h-11 w-11  bg-primary text-sm font-bold text-primary-contrast ring-2 ring-slate-100 shadow-sm dark:ring-slate-700" />

                        <div class="min-w-0 flex-1">
                            <p class="truncate text-sm font-bold text-heading">{{ displayName }}</p>
                            <p class="mt-xs truncate text-xs font-medium text-muted">{{ usernameLabel }}</p>
                            <div class="mt-sm flex flex-wrap gap-xs">
                                <Tag :value="roleLabel" unstyled :pt="roleTagStyle" />
                                <Tag v-if="primaryRole" :value="primaryRole" unstyled :pt="secondaryTagStyle" />
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <template #item="{ item, props }">
                <div v-bind="props.action" class="group flex items-center gap-md px-lg py-md transition-colors" :class="item.danger
                    ? 'cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/20'
                    : 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50'" @click="item.command?.()">
                    <div class="flex h-9 w-9 items-center justify-center rounded-xl border transition-colors" :class="item.danger
                        ? 'border-red-200 text-red-500 dark:border-red-900/70 dark:text-red-400'
                        : 'border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-400'">
                        <i :class="item.icon" class="text-sm" />
                    </div>

                    <div class="min-w-0 flex-1">
                        <p class="text-sm font-semibold transition-colors" :class="item.danger
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-heading group-hover:text-heading'">
                            {{ item.label }}
                        </p>
                        <p v-if="item.description" class="mt-0.5 truncate text-xs text-muted">
                            {{ item.description }}
                        </p>
                    </div>

                    <i v-if="item.trailingIcon" :class="item.trailingIcon" class="text-xs text-muted" />
                </div>
            </template>
        </Menu>
    </div>
</template>

<script setup>
import { computed, inject, ref } from "vue";
import { useRouter } from "vue-router";
import Avatar from "primevue/avatar";
import Button from "primevue/button";
import Menu from "primevue/menu";
import Tag from "primevue/tag";

const session = inject("$session");
const router = useRouter();
const userMenu = ref();

const currentUser = computed(() => session?.currentUser || null);

const displayName = computed(
    () => currentUser.value?.full_name || currentUser.value?.username || currentUser.value?.user || "Admin User",
);

const usernameLabel = computed(
    () => currentUser.value?.username || currentUser.value?.user || "No username",
);

const roleLabel = computed(
    () => currentUser.value?.role_profile || "No role profile",
);

const primaryRole = computed(() => currentUser.value?.roles?.[0] || "");

const avatarImage = computed(() => {
    const photo = currentUser.value?.photo;
    if (!photo) {
        return null;
    }
    if (photo.startsWith("http")) {
        return photo;
    }
    return photo;
});

const initials = computed(() => {
    const source = displayName.value;
    return source
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("") || "EU";
});

const menuItems = computed(() => [
    {
        label: "Account Settings",
        description: "Review admin preferences and profile options.",
        icon: "pi pi-cog",
        trailingIcon: "pi pi-angle-right",
        command: () => router.push("/menu-admin/settings"),
    },
    {
        label: "Sign Out",
        description: "End the current session securely.",
        icon: "pi pi-sign-out",
        danger: true,
        command: () => session?.logout(),
    },
]);

function toggleMenu(event) {
    userMenu.value.toggle(event);
}

const triggerStyle = {
    root: {
        class:
            "inline-flex items-center rounded-full border border-slate-200 bg-white p-[5px] shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600 dark:hover:bg-slate-800",
    },
};

const menuStyle = {
    root: {
        class:
            "mt-sm w-[320px] overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800",
    },
    menu: {
        class: "list-none m-0 p-sm",
    },
    separator: {
        class: "my-xs border-t border-slate-100 dark:border-slate-700/70",
    },
};

const roleTagStyle = {
    root: {
        class:
            "inline-flex items-center rounded-full bg-primary px-sm py-xs text-[11px] font-bold uppercase tracking-[0.12em] text-primary-contrast",
    },
};

const secondaryTagStyle = {
    root: {
        class:
            "inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-sm py-xs text-[11px] font-semibold text-slate-600 dark:border-slate-600 dark:bg-slate-700/70 dark:text-slate-200",
    },
};
</script>
