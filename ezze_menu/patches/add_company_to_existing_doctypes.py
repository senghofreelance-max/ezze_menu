import frappe


def execute():
	app_modules = [m.strip() for m in frappe.get_file_items(
		frappe.get_app_path("ezze_menu", "modules.txt")
	)]

	doctypes = frappe.get_all(
		"DocType",
		filters={"module": ["in", app_modules]},
		pluck="name",
	)

	for dt in doctypes:
		if not frappe.db.table_exists(dt):
			continue
		if frappe.db.exists("Custom Field", {"dt": dt, "fieldname": "company"}):
			continue
		if frappe.get_meta(dt).has_field("company"):
			continue

		frappe.get_doc({
			"doctype": "Custom Field",
			"dt": dt,
			"fieldname": "company",
			"label": "Company",
			"fieldtype": "Link",
			"options": "Company",
			"reqd": 1,
			"in_list_view": 1,
		}).insert(ignore_permissions=True)

	frappe.db.commit()
