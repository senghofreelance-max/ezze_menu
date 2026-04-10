import fs from "fs";
import path from "path";

const [source, target] = process.argv.slice(2);

if (!source || !target) {
	console.error("Usage: node sync-html.mjs <source> <target>");
	process.exit(1);
}

fs.mkdirSync(path.dirname(target), { recursive: true });
fs.copyFileSync(source, target);
