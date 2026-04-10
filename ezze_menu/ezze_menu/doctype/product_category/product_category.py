# Copyright (c) 2026, Sengho and contributors
# For license information, please see license.txt

# import frappe
from frappe.utils.nestedset import NestedSet


class ProductCategory(NestedSet):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		color: DF.Color | None
		is_group: DF.Check
		lft: DF.Int
		old_parent: DF.Link | None
		parent_product_category: DF.Link | None
		product_category: DF.Data | None
		product_code_prefix: DF.Data | None
		rgt: DF.Int
	# end: auto-generated types

	pass
