import path from "path";
import { fileURLToPath } from "url";
import { createSharedViteConfig } from "../frontend/shared/vite.base";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default createSharedViteConfig({
	appDir: __dirname,
	base: "/assets/ezze_menu/menu_admin/",
	devBase: "/menu-admin/",
	outDir: path.resolve(__dirname, "../ezze_menu/public/menu_admin"),
	port: 8087,
});
