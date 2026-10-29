import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "vite";

const entries = [
  "tests/consumers/portal-header-javascript/main.jsx",
  "tests/consumers/portal-header-typescript/main.tsx",
  "tests/consumers/ad-slot-javascript/main.jsx",
  "tests/consumers/ad-slot-typescript/main.tsx",
  "tests/consumers/google-analytics-javascript/main.js",
  "tests/consumers/google-analytics-typescript/main.ts",
];

for (const entry of entries) {
  await build({
    configFile: false,
    logLevel: "warn",
    build: {
      write: false,
      lib: { entry: resolve(entry), formats: ["es"] },
      rollupOptions: { external: ["react", "react/jsx-runtime", "react-dom"] },
    },
  });
}

await import(pathToFileURL(resolve("packages/ui/dist/index.js")).href);

console.log(`Built ${entries.length} JavaScript and TypeScript consumer fixtures and verified SSR-safe package import.`);
