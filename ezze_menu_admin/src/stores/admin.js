import { defineStore } from "pinia";

export const useAdminStore = defineStore("ezze-menu-admin", {
	state: () => ({
		stats: [
			{ label: "Orders Today", value: "128", tone: "bg-primary text-primary-contrast" },
			{ label: "Preparing", value: "24", tone: "bg-info/10 text-info" },
			{ label: "Completed", value: "91", tone: "bg-success/10 text-success" },
			{ label: "Alerts", value: "03", tone: "bg-warning/10 text-warning" },
		],
		recentOrders: [
			{ id: "ORD-0001", customer: "Malis", amount: "$18.20", status: "Preparing" },
			{ id: "ORD-0002", customer: "Dara", amount: "$9.40", status: "Paid" },
			{ id: "ORD-0003", customer: "Sokha", amount: "$13.80", status: "Queued" },
		],
	}),
});
