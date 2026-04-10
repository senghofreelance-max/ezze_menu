import { ref } from "vue";

const NAV_MENU_STORAGE_KEY = "ezze-menu-nav-menu";
const FILTER_CONDITIONS_STORAGE_KEY = "ezze-menu-filter-conditions";

function readJson(key, fallback) {
	const raw = localStorage.getItem(key);
	if (!raw) {
		return fallback;
	}

	try {
		return JSON.parse(raw);
	} catch {
		localStorage.removeItem(key);
		return fallback;
	}
}

const navMenu = ref(readJson(NAV_MENU_STORAGE_KEY, []));
const filterConditions = ref(readJson(FILTER_CONDITIONS_STORAGE_KEY, null));

export function useNavMenu() {
	return navMenu;
}

export function useFilterConditions() {
	return filterConditions;
}

export function setNavigationData(payload = {}) {
	navMenu.value = payload.navbar_tree || [];
	filterConditions.value = payload.filter_conditions || null;

	localStorage.setItem(NAV_MENU_STORAGE_KEY, JSON.stringify(navMenu.value));

	if (filterConditions.value) {
		localStorage.setItem(
			FILTER_CONDITIONS_STORAGE_KEY,
			JSON.stringify(filterConditions.value),
		);
	}
}

export function clearNavigationData() {
	navMenu.value = [];
	filterConditions.value = null;
	localStorage.removeItem(NAV_MENU_STORAGE_KEY);
	localStorage.removeItem(FILTER_CONDITIONS_STORAGE_KEY);
}
