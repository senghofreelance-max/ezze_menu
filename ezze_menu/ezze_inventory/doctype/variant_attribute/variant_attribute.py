# Copyright (c) 2026, Sengho and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class VariantAttribute(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from ezze_menu.ezze_inventory.doctype.product_attribute_value.product_attribute_value import ProductAttributeValue
		from frappe.types import DF

		attribute_category: DF.Literal["Universal", "Clothing & Apparel", "Shoes & Footwear", "Food & Drink", "Books & Media", "Events & Tickets", "Digital & Subscription", "Glasses & Eyewear"]
		attribute_name: DF.Data | None
		disabled: DF.Check
		input_type: DF.Literal["Select", "Range", "Free Input"]
		standard: DF.Check
		variant_value: DF.Table[ProductAttributeValue]
	# end: auto-generated types

	pass
