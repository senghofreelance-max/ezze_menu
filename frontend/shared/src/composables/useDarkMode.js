import { computed, ref, watch } from "vue";

const theme = ref(localStorage.getItem("ezze-menu-theme") || "system");
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
const systemDark = ref(mediaQuery.matches);

mediaQuery.addEventListener("change", (event) => {
	systemDark.value = event.matches;
});

const isDark = computed(() => {
	if (theme.value === "system") {
		return systemDark.value;
	}
	return theme.value === "dark";
});

function syncDomTheme(value) {
	document.documentElement.classList.toggle("dark", value);
}

syncDomTheme(isDark.value);

watch(isDark, syncDomTheme);
watch(theme, (value) => {
	localStorage.setItem("ezze-menu-theme", value);
});

export function useDarkMode() {
	function setTheme(value) {
		theme.value = value;
	}

	function cycleTheme() {
		if (theme.value === "system") {
			theme.value = "light";
			return;
		}
		if (theme.value === "light") {
			theme.value = "dark";
			return;
		}
		theme.value = "system";
	}

	return {
		theme,
		isDark,
		setTheme,
		cycleTheme,
	};
}
