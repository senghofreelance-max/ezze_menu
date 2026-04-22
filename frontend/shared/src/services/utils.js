import { FrappeApp } from "frappe-js-sdk";
const frappe = new FrappeApp();
const call = frappe.call();
const db = frappe.db();

export function getFrontendPageUtilize(doctype, name) {
	return call.post("ezze_1122_help_bot.api.frontend_api.get_page_utilize", {
		doctype: doctype,
		name: name,
	}).then((res) => {
		return res.message;
	});
}

export function searchLink(reference_doctype, query) {
	return call.post("ezze_1122_help_bot.api.frontend_api.search_link", {
		reference_doctype: reference_doctype,
		query: query
	}).then((res) => {
		return res.message || [];
	});
}

export function getFilterConditions() {
	return call.get("ezze_1122_help_bot.api.frontend_api.get_filter_conditions").then((res) => {
		return res.message;
	});
}

export function getDatatableData(
	doctype,
	fields = ["*"],
	filters = null,
	limit_start = 0,
	limit_page_length = 20,
	order_by = null,
) {
	return call
		.get("ezze_1122_help_bot.api.frontend_api.get_datatable_data", {
			doctype: doctype,
			fields: fields,
			filters: filters,
			limit_start: limit_start,
			limit_page_length: limit_page_length,
			order_by: order_by,
		})
		.then((res) => {
			const payload = res.message;
			if (payload && payload.data && payload.columns) {
				payload.data = payload.data.map((rowVals) => {
					let obj = {};
					payload.columns.forEach((col, index) => (obj[col.field] = rowVals[index]));
					return obj;
				});
			}
			return payload;
		});
}

export function formatDate(dateStr, includeTime = false) {
	if (!dateStr) return "";
	const date = new Date(dateStr.replace(" ", "T")); // Handle Frappe space separator for ISO
	if (isNaN(date.getTime())) return dateStr;

	const options = {
		day: "2-digit",
		month: "short",
		year: "numeric",
	};

	if (includeTime) {
		options.hour = "2-digit";
		options.minute = "2-digit";
		options.second = "2-digit";
		options.hour12 = true;
	}

	return new Intl.DateTimeFormat("en-GB", options).format(date).replace(/ /g, "-").replace(",", "");
}

export function formatTime(dateStr) {
	if (!dateStr) return "";
	const date = new Date(dateStr.replace(" ", "T"));
	if (isNaN(date.getTime())) return dateStr;

	return new Intl.DateTimeFormat("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: true,
	}).format(date);
}
