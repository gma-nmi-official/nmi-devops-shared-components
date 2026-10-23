# Initial setup: Cookie Agreement

## Identity

- Repository/branch/base: `D:\gno-node-projects\gno-shared-components-v2`, `feature/cookie-agreement`, HEAD `c30306bcb6936768c8aabf6257d7d3ca087c8a69`, base `master` `eeba893daff3f8076d7444963b673e2515762f6c`.
- Dirty state: Cookie Agreement planning documents modified for approved decisions; unrelated untracked `.playwright-mcp/` artifacts remain protected; no component source changed.
- Stack: Windows, Node 26.10.0, npm 11.19.1, React 19.2.8, Next.js 16.3.8, Storybook 10, Playwright 1.63.0 Chromium.
- Safe data: synthetic policy versions/consent records/storage failures; localhost only; no production cookies, credentials, user data, or analytics.

## Readiness

| Step | Command/action | Evidence | Status |
| --- | --- | --- | --- |
| Identity | `git branch --show-current`; `git rev-parse HEAD`; `git merge-base master HEAD` | Refreshed 2026-10-23: branch/HEAD/base above | PASS |
| Install | `npm ci` | Defer until clean/isolation decision | BLOCKED for implementation |
| Baseline | `npm run check`; `npm run test:e2e` | Prior foundation evidence does not cover current `c30306bc` plus planning diff | STALE; rerun before development/review |
| References | Fetch/hash supplied JS/CSS | Revalidated 2026-10-23 in `reference_analysis.md` | PASS for planning |

Ready for privacy/requirements review only. Implementation needs privacy/legal decisions, requirements/development approval, a repository asset inventory with recorded sources and rights, persistence ownership, and compatibility. GitHub Actions remains unchanged; required Playwright E2E evidence will be produced locally for the reviewed revision. GA ownership is outside this project.
