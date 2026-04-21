# Copyright (c) 2026, Sengho and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class Product(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		auto_generate_code: DF.Check
		company: DF.Link
		description: DF.TextEditor | None
		has_inventory: DF.Check
		has_variant: DF.Check
		photo: DF.AttachImage | None
		price: DF.Currency
		product_category: DF.Link | None
		product_code: DF.Data | None
		product_name: DF.Data
		product_type: DF.Literal["Physical", "Food & Drink", "Digital", "Ticket", "Service"]
		short_description: DF.SmallText | None
		status: DF.Literal["Active", "Out Of Stock", "Disabled"]
		title: DF.Data | None
		uom: DF.Link | None
	# end: auto-generated types

	pass
