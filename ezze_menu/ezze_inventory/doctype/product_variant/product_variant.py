# Copyright (c) 2026, Sengho and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class ProductVariant(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		attribute_name: DF.Link
		attribute_value: DF.Data
		price_adjustment: DF.Currency
		product: DF.Link
		product_name: DF.Data | None
		sku: DF.Data
	# end: auto-generated types

	pass
