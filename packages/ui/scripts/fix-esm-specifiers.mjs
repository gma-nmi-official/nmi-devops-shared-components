import { existsSync } from "node:fs";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";

const root = resolve("dist");
const files = [];

async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await collect(path);
    else if (extname(entry.name) === ".js" || entry.name.endsWith(".d.ts")) files.push(path);
  }
}

function resolveSpecifier(file, specifier) {
  if (!specifier.startsWith(".")) return specifier;
  const base = resolve(dirname(file), specifier);
  if (extname(base) === ".js") return specifier;
  if (existsSync(`${base}.js`)) return `${specifier}.js`;
  if (existsSync(join(base, "index.js"))) return `${specifier}/index.js`;
  if (existsSync(`${base}.d.ts`)) return `${specifier}.js`;
  if (existsSync(join(base, "index.d.ts"))) return `${specifier}/index.js`;
  return specifier;
}

await collect(root);
for (const file of files) {
  const source = await readFile(file, "utf8");
  const updated = source.replace(/(from\s+["']|import\(\s*["'])(\.[^"']+)(["'])/g, (_match, prefix, specifier, suffix) => {
    return `${prefix}${resolveSpecifier(file, specifier)}${suffix}`;
  });
  if (updated !== source) await writeFile(file, updated);
}
