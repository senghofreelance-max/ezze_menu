import frappe


def get_context(context):
	context.no_cache = 1
	context.show_sidebar = False
	context.title = "Ezze Menu Admin"
	context.boot = frappe._dict()
