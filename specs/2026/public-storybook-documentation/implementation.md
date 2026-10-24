# Implementation report: Public Storybook documentation

- Delivery units: SB-01 through SB-04
- Repository revision: `0b2561575b68f1e89ea9cf16fdaaa7e039670296` plus protected dirty Portal Header work
- Scope: same-build Storybook output at `/docs`, package guide at `/catalog`, simple landing page at `/`, public component coverage check, and release documentation.

## Changes

- Storybook now includes curated Welcome, Getting started, Accessibility, Portal Header, and Changelog pages.
- `npm run build-storybook` writes ignored generated output to `public/docs/`.
- `next.config.ts` rewrites `/docs` to the generated Storybook entry point without changing the browser URL.
- `dev:storybook` and the port-6006 workflow were removed; `predev` and `build` generate the docs as part of the application lifecycle.
- `/catalog` remains a consumer-facing package guide and links to `/docs`; `/` is a simple documentation landing page.
- `docs:check` verifies every public export has a colocated Storybook story and that release documentation exists.

## Validation

Passed: `npm run docs:check`, `npm run typecheck`, `npm run lint`, `npm run test`, `npm run build-storybook`, `npm run build`, and served-route checks for `/docs` and `/catalog` (HTTP 200).

Storybook reports existing Vite warnings for the component's `use client` directive, large generated chunks, and nested public output. These do not prevent the production build.

## Protected work

The existing Portal Header candidate, user assets, repository rename documentation, and `.playwright-mcp/` working-tree content were preserved and not reset or deleted.
