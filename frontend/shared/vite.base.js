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

function getProxyOptions() {
	const config = getCommonSiteConfig();
	const devMode = config?.developer_mode || 0;
	const webserverPort = devMode === 1 ? 8989 : config?.webserver_port || 8989;

	return {
		"^/(app|login|api|assets|files|private)": {
			target: `http://127.0.0.1:${webserverPort}`,
			changeOrigin: true,
			ws: true,
			router(request) {
				const siteName = request.headers.host?.split(":")[0] || "localhost";
				return `http://${siteName}:${webserverPort}`;
			},
		},
	};
}

export function createSharedViteConfig({ appDir, base, outDir, port }) {
	return defineConfig({
		plugins: [vue()],
		base,
		resolve: {
			alias: {
				"@": path.resolve(appDir, "src"),
				"@shared": path.resolve(__dirname, "src"),
				"@vendor/frappe-sdk": path.resolve(appDir, "src/vendor/frappe-sdk.js"),
				"@vendor/primevue/config": path.resolve(appDir, "src/vendor/primevue/config.js"),
				"@vendor/primevue/dialog": path.resolve(appDir, "src/vendor/primevue/dialog.js"),
				"@vendor/primevue/toast": path.resolve(appDir, "src/vendor/primevue/toast.js"),
				"@vendor/primevue/toastservice": path.resolve(
					appDir,
					"src/vendor/primevue/toastservice.js",
				),
				"@vendor/primevue/tooltip": path.resolve(appDir, "src/vendor/primevue/tooltip.js"),
				"@vendor/vue-router": path.resolve(appDir, "src/vendor/vue-router.js"),
			},
		},
		server: {
			host: true,
			port,
			proxy: getProxyOptions(),
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
	});
}
