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
		photo: DF.AttachImage | None
		price: DF.Currency
		product_category: DF.Link | None
		product_code: DF.Data | None
		product_name: DF.Data | None
	# end: auto-generated types

	pass
