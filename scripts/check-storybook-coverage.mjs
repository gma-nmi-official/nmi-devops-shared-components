import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const indexPath = resolve(root, "packages/ui/src/index.ts");
const index = readFileSync(indexPath, "utf8");
const exports = [...index.matchAll(/export \* from ["']\.\/components\/([^"']+)["']/g)].map((match) => match[1]);

const missing = exports.filter((entry) => {
  const componentDirectory = resolve(root, "packages/ui/src/components", entry);
  return !existsSync(`${componentDirectory}/${entry}.stories.tsx`) && !existsSync(`${componentDirectory}/${entry}.stories.ts`);
});

const analyticsStory = resolve(root, "packages/ui/src/analytics/google-analytics/google-analytics.stories.tsx");

if (missing.length > 0) {
  console.error(`Missing Storybook stories for public exports: ${missing.join(", ")}`);
  process.exit(1);
}

if (!existsSync(resolve(root, "packages/ui/src/docs/releases.stories.tsx"))) {
  console.error("Missing Storybook release documentation story.");
  process.exit(1);
}

if (!existsSync(analyticsStory)) {
  console.error("Missing Storybook story for the public Google Analytics integration.");
  process.exit(1);
}

console.log(`Storybook coverage verified for ${exports.length} public component export(s), Google Analytics, and the release documentation.`);
