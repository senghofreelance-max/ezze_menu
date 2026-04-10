import PrimeVue from "@vendor/primevue/config";
import Dialog from "@vendor/primevue/dialog";
import Toast from "@vendor/primevue/toast";
import ToastService from "@vendor/primevue/toastservice";
import Tooltip from "@vendor/primevue/tooltip";

export function setupPrimeVue(app) {
	app.directive("tooltip", Tooltip);
	app.use(PrimeVue, {
		unstyled: true,
		ripple: false,
		pt: {
			dialog: {
				mask: { class: "bg-slate-900/60 backdrop-blur-sm" },
				root: {
					class:
						"w-[92vw] max-w-xl rounded-panel border border-border bg-surface text-body shadow-panel",
				},
				header: { class: "flex items-center justify-between border-b border-border px-lg py-md" },
				title: { class: "text-lg font-bold text-heading" },
				headerActions: { class: "hidden" },
				content: { class: "px-lg py-md text-body" },
			},
			toast: {
				root: { class: "z-[1200]" },
				message: {
					class:
						"mb-sm rounded-2xl border border-border bg-surface px-md py-sm shadow-panel",
				},
				summary: { class: "font-semibold text-heading" },
				detail: { class: "mt-1 text-sm text-body" },
			},
			tooltip: {
				root: { class: "absolute z-[1000] shadow-lg" },
				text: {
					class: "rounded-xl bg-slate-950 px-sm py-xs text-xs font-semibold text-white",
				},
				arrow: { class: "hidden" },
			},
		},
	});

	app.use(ToastService);
	app.component("Dialog", Dialog);
	app.component("Toast", Toast);

	const toast = app.config.globalProperties.$toast;

	Object.assign(toast, {
		success(detail, summary = "Success", options = {}) {
			toast.add({ severity: "success", summary, detail, life: 3000, ...options });
		},
		info(detail, summary = "Info", options = {}) {
			toast.add({ severity: "info", summary, detail, life: 3000, ...options });
		},
		warn(detail, summary = "Warning", options = {}) {
			toast.add({ severity: "warn", summary, detail, life: 4000, ...options });
		},
		error(detail, summary = "Error", options = {}) {
			toast.add({ severity: "error", summary, detail, life: 5000, ...options });
		},
	});

	app.provide("$notify", toast);
	app.config.globalProperties.$notify = toast;
}
