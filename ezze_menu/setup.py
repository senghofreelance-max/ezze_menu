import frappe


def add_company_field(doc, method=None):
	module_app = frappe.local.module_app.get(frappe.scrub(doc.module))
	if module_app != "ezze_menu":
		return

	if any(f.fieldname == "company" for f in doc.fields):
		return

	doc.append(
		"fields",
		{
			"fieldname": "company",
			"label": "Company",
			"fieldtype": "Link",
			"options": "Company",
			"reqd": 1,
			"in_list_view": 1,
			"insert_after": "",
		},
	)
