import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const benchRoot = path.resolve(__dirname, "../../..");

function getCommonSiteConfig() {
	const configPath = path.join(benchRoot, "sites", "common_site_config.json");
	if (!fs.existsSync(configPath)) {
		return null;
	}
	return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

// base must be the Frappe asset path: /assets/<app_name>/<subfolder>/
// In dev mode we bypass proxying for this app's own assets so Vite serves them.
function getProxyOptions(base) {
	const config = getCommonSiteConfig();
	const devMode = config?.developer_mode || 0;
	const webserverPort = devMode === 1 ? 8989 : config?.webserver_port || 8989;

	// Derive the app-name prefix from base (e.g. "/assets/ezze_menu/menu_admin/" → "ezze_menu")
	const ownAssetPrefix = base?.startsWith("/assets/") ? `/assets/${base.split("/")[2]}/` : null;

	return {
		"^/(app|login|api|assets|files|private)": {
			target: `http://127.0.0.1:${webserverPort}`,
			changeOrigin: true,
			ws: true,
			router(request) {
				const siteName = request.headers.host?.split(":")[0] || "localhost";
				return `http://${siteName}:${webserverPort}`;
			},
			bypass(req) {
				// Let Vite serve this app's own assets instead of proxying to Frappe
				if (ownAssetPrefix && req.url?.startsWith(ownAssetPrefix)) {
					return req.url;
				}
			},
		},
	};
}

export function createSharedViteConfig({ appDir, base, devBase, outDir, port }) {
	return defineConfig(({ command }) => ({
		plugins: [vue()],
		base: command === "serve" ? (devBase || base) : base,
		resolve: {
			alias: [
				{ find: "@", replacement: path.resolve(appDir, "src") },
				{ find: "@shared", replacement: path.resolve(__dirname, "src") },
				{ find: "@vendor/frappe-sdk", replacement: path.resolve(appDir, "src/vendor/frappe-sdk.js") },
				{ find: "frappe-js-sdk", replacement: path.resolve(appDir, "node_modules/frappe-js-sdk") },
				{ find: "@vendor/primevue/config", replacement: path.resolve(appDir, "src/vendor/primevue/config.js") },
				{ find: "@vendor/primevue/dialog", replacement: path.resolve(appDir, "src/vendor/primevue/dialog.js") },
				{ find: "@vendor/primevue/toast", replacement: path.resolve(appDir, "src/vendor/primevue/toast.js") },
				{ find: "@vendor/primevue/toastservice", replacement: path.resolve(appDir, "src/vendor/primevue/toastservice.js") },
				{ find: "@vendor/primevue/tooltip", replacement: path.resolve(appDir, "src/vendor/primevue/tooltip.js") },
				{ find: "@vendor/vue-router", replacement: path.resolve(appDir, "src/vendor/vue-router.js") },
				// Resolve bare third-party imports used by shared components against the app's node_modules
				{ find: /^primevue\/(.*)/, replacement: path.resolve(appDir, "node_modules/primevue/$1") },
				{ find: "mustache", replacement: path.resolve(appDir, "node_modules/mustache/mustache.mjs") },
			],
		},
		server: {
			host: true,
			port,
			proxy: getProxyOptions(base),
		},
		build: {
			manifest: true,
			outDir,
			emptyOutDir: true,
			rollupOptions: {
				input: {
					main: path.resolve(appDir, "index.html"),
				},
			},
		},
	}));
}
