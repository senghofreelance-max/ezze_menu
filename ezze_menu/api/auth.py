from __future__ import annotations

from collections import defaultdict
from typing import Any

import frappe
from frappe import _
from frappe.permissions import get_valid_perms


PERM_TYPES = [
	"read",
	"write",
	"create",
	"delete",
	"submit",
	"cancel",
	"amend",
	"print",
	"email",
	"report",
	"share",
	"export",
]


def _get_role_profile(user_doc: Any) -> str:
	if not getattr(user_doc, "role_profiles", None):
		return ""

	first_role_profile = user_doc.role_profiles[0]
	return frappe.db.get_value("User Role Profile", first_role_profile.name, "role_profile") or ""


def get_doc_perm(user: str) -> dict[str, list[Any]]:
	aggregated_permissions: dict[tuple[str, int], dict[str, int]] = defaultdict(
		lambda: {perm_type: 0 for perm_type in PERM_TYPES}
	)

	for perm in get_valid_perms(user=user):
		if perm.get("permlevel") != 0:
			continue

		doctype = perm["parent"]
		if_owner = perm.get("if_owner", 0)

		for perm_type in PERM_TYPES:
			if perm_type in perm:
				aggregated_permissions[(doctype, if_owner)][perm_type] = (
					aggregated_permissions[(doctype, if_owner)][perm_type] or perm[perm_type]
				)

	columns = ["doctype", "if_owner", *PERM_TYPES]
	rows: list[list[Any]] = []

	for doctype, if_owner in sorted(aggregated_permissions.keys(), key=lambda item: _(item[0])):
		permission_values = aggregated_permissions[(doctype, if_owner)]
		rows.append([doctype, if_owner, *[permission_values[perm_type] for perm_type in PERM_TYPES]])

	return {
		"columns": columns,
		"data": rows,
	}


@frappe.whitelist()
def get_current_user() -> dict[str, Any]:
	current_user = frappe.get_doc("User", frappe.session.user)
	roles = [role.get("role") for role in current_user.roles]

	return {
		"user": current_user.name,
		"full_name": current_user.full_name,
		"username": current_user.username,
		"photo": current_user.user_image,
		"role_profile": _get_role_profile(current_user),
		"roles": roles,
		"perm": get_doc_perm(current_user.name),
	}
