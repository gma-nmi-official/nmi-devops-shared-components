import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const indexPath = resolve(import.meta.dirname, "../public/storybook/index.html");
const html = readFileSync(indexPath, "utf8");
const basePath = process.env.DOCS_BASE_PATH ?? "/storybook/";
const baseTag = `<base href="${basePath}">`;
const withBase = html.replace(/<base href="[^"]*">/, baseTag);

if (withBase !== html) {
  writeFileSync(indexPath, withBase);
} else if (!html.includes(baseTag)) {
  writeFileSync(indexPath, html.replace("<head>", `<head>\n    ${baseTag}`));
}
