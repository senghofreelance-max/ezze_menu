import fs from "fs";
import path from "path";

const [source, target, fromPath, toPath] = process.argv.slice(2);

if (!source || !target) {
	console.error("Usage: node sync-html.mjs <source> <target> [from-path] [to-path]");
	process.exit(1);
}

fs.mkdirSync(path.dirname(target), { recursive: true });

if (fromPath && toPath) {
	const content = fs.readFileSync(source, "utf8").split(fromPath).join(toPath);
	fs.writeFileSync(target, content);
	console.log(`Synced and rewrote: ${fromPath} → ${toPath}`);
} else {
	fs.copyFileSync(source, target);
}
