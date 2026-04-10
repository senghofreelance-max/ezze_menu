const colors = {
	primary: "var(--color-primary)",
	"primary-contrast": "var(--color-primary-contrast)",
	secondary: "var(--color-secondary)",
	"secondary-contrast": "var(--color-secondary-contrast)",
	success: "var(--color-success)",
	warning: "var(--color-warning)",
	error: "var(--color-error)",
	info: "var(--color-info)",
	heading: "var(--color-heading)",
	body: "var(--color-body)",
	muted: "var(--color-muted)",
	surface: "var(--color-surface)",
	"surface-alt": "var(--color-surface-alt)",
	border: "var(--color-border)",
};

module.exports = {
	theme: {
		extend: {
			colors,
			spacing: {
				"2xs": "var(--space-2xs)",
				xs: "var(--space-xs)",
				sm: "var(--space-sm)",
				md: "var(--space-md)",
				lg: "var(--space-lg)",
				xl: "var(--space-xl)",
				"2xl": "var(--space-2xl)",
			},
			boxShadow: {
				panel: "0 18px 50px rgba(15, 23, 42, 0.10)",
			},
			borderRadius: {
				panel: "1.5rem",
			},
			fontFamily: {
				sans: ["Manrope", "system-ui", "sans-serif"],
			},
		},
	},
};
