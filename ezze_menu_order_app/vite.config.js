import path from "path";
import { fileURLToPath } from "url";
import { createSharedViteConfig } from "../frontend/shared/vite.base";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default createSharedViteConfig({
	appDir: __dirname,
	base: "/menu-order/",
	outDir: path.resolve(__dirname, "../ezze_menu/public/order_app"),
	port: 8086,
});
