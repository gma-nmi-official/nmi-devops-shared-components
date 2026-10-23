# Initial setup: Public Storybook documentation

## Identity and prerequisites

- Repository: `D:\gno-node-projects\gno-shared-components-v2`; branch `feature/portal-header`; HEAD `0b2561575b68f1e89ea9cf16fdaaa7e039670296`.
- Dirty state: 25 tracked files changed and 11 untracked paths at the planning baseline. They belong to the active Portal Header delivery and user tooling; this project must not overwrite or reclassify them.
- Instructions: root `AGENTS.md`, `.codex/workflows/lifecycle.md`, `.codex/workflows/query-routing.md`, and `.agents/skills/repository-design/SKILL.md`.
- Existing repository; registered as a Next.js / React / TypeScript shared-components workspace.
- Local observed tools: Windows/PowerShell, Node.js `v26.10.0`, npm `11.19.1`; CI uses Node.js 20. Repository engines require Node.js >=20.9 and npm >=10.
- Installed documentation stack: Storybook, `@storybook/nextjs-vite`, `@storybook/addon-docs`, and `@storybook/addon-a11y`, all 10.6.1.
- Dependency source: root `package.json` and `package-lock.json`; clean installation command `npm ci`.
- Configuration: `.storybook/main.ts` and `.storybook/preview.ts`; no environment variables are required for local Storybook.
- Required services/test data: none for the static docs build. The existing Next.js production server is used for same-origin route verification.

## Repeatable setup and readiness

| Step | Working directory | Exact command / action | Expected result | Actual result / evidence | Status |
| --- | --- | --- | --- | --- | --- |
| Verify tools | Repository root | `node --version`; `npm --version`; `npm ls storybook @storybook/nextjs-vite @storybook/addon-docs @storybook/addon-a11y --depth=0` | Supported Node/npm and one aligned Storybook version | Node 26.10.0, npm 11.19.1, all Storybook packages 10.6.1 on 2026-10-22 | PASS |
| Install dependencies | Repository root | `npm ci` | Lockfile installation completes | Reused installed dependencies; latest full clean-install evidence is recorded by the active Portal Header project | N/A for planning refresh |
| Configure local environment | Repository root | No environment configuration | Storybook needs no secrets | Confirmed from scripts/config | PASS |
| Start required services | Repository root | `npm run dev`, then open `/docs` | Next.js serves the generated Storybook documentation through the application origin | Current application does not yet generate/serve Storybook at this route | BLOCKED pending implementation |
| Initialize safe test data | Repository root | N/A | Stories use repository-owned deterministic props | No external data dependency found | N/A |
| Build smoke check | Repository root | `npm run build-storybook` | Static output is created in `storybook-static/` | PASS on 2026-10-22 outside restricted sandbox; existing Vite warnings recorded in `test_plan.md` | PASS |
| Run baseline tests | Repository root | `npm run check` | Full repository quality gate passes | Not rerun because the existing Portal Header candidate has its own active verification record; must be refreshed after implementation | Pending |

## Readiness and unresolved decisions

- Local Storybook design work is technically ready after requirements and development approval.
- Deployment-platform verification remains pending because the target platform has not been placed in scope; local production-server verification is required during implementation.
- The active Portal Header dirty candidate must remain protected. Implementation should begin only after Atlas reconciles this project's base with the Portal Header delivery state.
- Evidence timestamp: 2026-10-22 Asia/Shanghai at revision `0b2561575b68f1e89ea9cf16fdaaa7e039670296` plus the recorded dirty candidate.
