# Initial setup: documentation site revamp

## Identity and prerequisites

- Repository: `D:\gno-node-projects\gno-shared-components-v2`.
- Branch/revision: `feature/ads-storybook-realistic-data` at
  `e8b09639b2ddf46b084f74ed4ff700c00c4ca3ca`; merge base with `master` is
  `4712ed183cca795b6d588d98bdb6e1bb559f411c`; branch is two commits ahead.
- Dirty state before this spec set: untracked `.playwright-mcp/`, preserved and
  excluded from this work. This specification set is an additional intended diff.
- Instructions: root `AGENTS.md`, query routing, lifecycle, repository-design
  skill, and Next.js 16.4.2 local guides for metadata/icons, linking,
  `generateStaticParams`, and static exports were read.
- Existing project: Next.js 16.4.2, React 19.2.8, TypeScript 5, Storybook 10.6.3,
  Playwright 1.50.0; facts verified from `package.json` and source.
- Local tools: Windows/PowerShell, Node.js 22.23.4, npm 10.9.9. Repository engines
  require Node.js >=20.9.0 and npm >=10.
- Dependencies: `package.json`, `packages/ui/package.json`, lockfile version 3;
  clean install command is `npm ci`.
- Configuration: `.env.local` exists with key `VITE_STORYBOOK_GA4_ID`; value was
  not read or recorded. `NEXT_PUBLIC_BASE_PATH` and `GITHUB_PAGES` are build-time
  configuration sources in repository code/workflows.
- Services/accounts: no database, API, or test account. Local app defaults to
  `http://localhost:3000`; Storybook is built locally under `public/storybook`.

## Repeatable setup and readiness

| Step | Working directory | Exact command / action | Expected result | Actual result / evidence | Status |
| --- | --- | --- | --- | --- | --- |
| Verify tools | Repository root | `node --version` and `npm --version` | Versions satisfy engines. | `v22.23.4` and `10.9.9`. | PASS |
| Install dependencies | Repository root | `npm ci` | Lockfile-exact install. | Not rerun; `node_modules` present and complete quality gate resolved dependencies. | N/A — existing verified install |
| Configure local environment | Repository root | Keep `.env.local`; use non-production placeholder value only. | Storybook build can resolve configuration without exposing a secret. | Key presence verified; value not inspected. | PASS |
| Start required services | Repository root | N/A | No external service is required. | Static local documentation and fake previews only. | N/A |
| Initialize safe test data | Repository root | N/A | No mutable test data required. | Existing preview fakes/placeholders are sufficient. | N/A |
| Start application / smoke check | Repository root | `npm run dev` | Next.js site starts at localhost after package/Storybook prebuild. | Not started during inception; production build in quality gate rendered all current static routes. | PASS — build smoke evidence |
| Run baseline tests | Repository root | `npm run check` | Typecheck, size gates, lint, 73 unit tests, consumer fixtures, Storybook, and Next build pass. | Sandbox run reached tests then failed with `spawn EPERM`; approved unrestricted rerun exited 0 on 2026-10-27. Static routes `/`, `/catalog`, and `/docs` generated. | PASS |
| Verify APR-004 logo source | Repository root | HTTP HEAD to supplied `www.gmanmi.com` SVG URL | HTTP 200 SVG asset. | HTTP 200; `image/svg+xml`; 7,102 bytes; last-modified 2025-10-16. | PASS |
| Verify APR-004 favicon source | Repository root | HTTP HEAD to supplied `www.gmanmi.com` favicon URL | HTTP 200 ICO asset. | HTTP 200; `image/vnd.microsoft.icon`; 1,150 bytes; last-modified 2025-10-30. | PASS |

## Readiness and unresolved decisions

- Development blocker: requirements and development approvals are pending.
- Branch blocker: select/create a dedicated branch from the owner-approved
  `master` revision after the current ads branch is resolved; do not mix feature
  implementation into the current branch.
- Evidence timestamp: 2026-10-27 Asia/Shanghai at revision
  `e8b09639b2ddf46b084f74ed4ff700c00c4ca3ca`.
- Ready for: requirements review and conditional design review. Not ready for
  implementation, commit, push, PR, merge, or deployment.
