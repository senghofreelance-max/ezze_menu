<template>
	<nav class="space-y-xs">
		<div v-for="item in navItems" :key="item.value || item.label">
			<template v-if="item.items?.length">
				<button
					type="button"
					class="flex w-full items-center justify-between rounded-2xl px-md py-sm text-sm font-semibold text-body transition hover:bg-slate-100 dark:hover:bg-slate-800"
					:class="isChildActive(item.items) ? 'bg-primary text-primary-contrast' : ''"
					@click="toggleGroup(item.value || item.label)"
				>
					<span class="flex items-center gap-3">
						<i :class="['pi', item.icon || 'pi-folder']" />
						<span>{{ item.label }}</span>
					</span>
					<i
						class="pi pi-chevron-down text-xs transition-transform"
						:class="expandedGroups[item.value || item.label] || isChildActive(item.items) ? 'rotate-180' : ''"
					/>
				</button>

				<div
					v-show="expandedGroups[item.value || item.label] || isChildActive(item.items)"
					class="mt-xs space-y-xs border-l border-border pl-md"
				>
					<RouterLink
						v-for="child in item.items"
						:key="child.value || child.label"
						:to="child.url || '#'"
						class="flex items-center gap-3 rounded-xl px-md py-sm text-sm font-medium transition"
						:class="isActive(child.url)
							? 'bg-primary text-primary-contrast'
							: 'text-body hover:bg-slate-100 dark:hover:bg-slate-800'"
					>
						<i :class="['pi', child.icon || 'pi-circle-fill text-[10px]']" />
						<span>{{ child.label }}</span>
					</RouterLink>
				</div>
			</template>

			<RouterLink
				v-else
				:to="item.url || '#'"
				class="flex items-center gap-3 rounded-2xl px-md py-sm text-sm font-semibold transition"
				:class="isActive(item.url)
					? 'bg-primary text-primary-contrast'
					: 'text-body hover:bg-slate-100 dark:hover:bg-slate-800'"
			>
				<i :class="['pi', item.icon || 'pi-angle-right']" />
				<span>{{ item.label }}</span>
			</RouterLink>
		</div>

		<p
			v-if="!navItems.length"
			class="rounded-2xl border border-dashed border-border px-md py-md text-sm text-muted"
		>
			No sidebar routes found in `Frontend Route Setting` for this frontend project.
		</p>
	</nav>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useRoute } from "vue-router";
import { RouterLink } from "@vendor/vue-router";
import { useNavMenu } from "../../services/navigation";

const route = useRoute();
const navMenu = useNavMenu();
const expandedGroups = reactive({});

const navItems = computed(() => navMenu.value || []);

function toggleGroup(key) {
	expandedGroups[key] = !expandedGroups[key];
}

function isActive(url) {
	return !!url && route.path === url;
}

function isChildActive(items = []) {
	return items.some((child) => child.url && route.path === child.url);
}
</script>
