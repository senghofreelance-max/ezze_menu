import { AbilityBuilder, createMongoAbility } from "@casl/ability";

const actionMap = {
	read: "read",
	write: "update",
	create: "create",
	delete: "delete",
	print: "print",
	email: "email",
	report: "report",
	share: "share",
	export: "export",
};

export function defineAbilitiesFor(permissions = [], user = null) {
	const { can, build } = new AbilityBuilder(createMongoAbility);

	permissions.forEach((permission) => {
		const subject = permission.doctype;

		Object.entries(actionMap).forEach(([key, action]) => {
			if (!permission[key]) {
				return;
			}

			if (permission.if_owner && user) {
				can(action, subject, { owner: user });
				return;
			}

			can(action, subject);
		});
	});

	return build();
}

export const ability = defineAbilitiesFor();

export function applyAbilityForUser(currentUser) {
	const nextAbility = defineAbilitiesFor(currentUser?.permissions || [], currentUser?.user);
	ability.update(nextAbility.rules);
	return ability;
}

export function resetAbility() {
	ability.update([]);
	return ability;
}
