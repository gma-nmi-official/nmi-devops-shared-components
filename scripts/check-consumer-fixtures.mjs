import { resolve } from "node:path";
import { build } from "vite";

const entries = [
  "tests/consumers/portal-header-javascript/main.jsx",
  "tests/consumers/portal-header-typescript/main.tsx",
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

console.log(`Built ${entries.length} Portal Header consumer fixtures.`);
