const sharedPreset = require("../frontend/shared/src/config/tailwind.preset.cjs");

module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js}", "../frontend/shared/src/**/*.{vue,js}"],
	darkMode: "class",
	presets: [sharedPreset],
};
