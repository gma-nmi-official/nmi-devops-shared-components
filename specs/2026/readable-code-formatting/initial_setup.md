# Initial setup

- Repository: `D:\gno-node-projects\gno-shared-components-v2`
- Branch: `master`
- Base revision: `e2ccde05efbe998b2a33d7eb97b28cccfec1eb83`
- Package manager: npm with committed `package-lock.json`
- Runtime contract: Node.js `>=20.9.0`, npm `>=10`
- Framework: Next.js `16.4.2`, React `19.2.8`, Storybook `10.6.3`
- Relevant configuration: `package.json`, `eslint.config.mjs`,
  `tsconfig.json`, `packages/ui/tsconfig*.json`, `next.config.ts`,
  `.storybook/*`, `.github/workflows/pages.yml`
- Next.js guidance read: layouts/pages, server/client components, and CSS under
  `node_modules/next/dist/docs/01-app/01-getting-started/`
- Readiness: dependencies were already installed; lint, typecheck, package
  builds, and the pre-change GitHub Pages build were available.
- Protected unrelated content: pre-existing untracked `.playwright-mcp/`.
