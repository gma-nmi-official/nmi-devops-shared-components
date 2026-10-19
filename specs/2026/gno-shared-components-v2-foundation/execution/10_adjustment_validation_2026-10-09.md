# Review-adjustment validation: Bitbucket handoff candidate

> Historical validation from 2026-10-09 for the then-approved Bitbucket target. The active package release process now uses GitHub Releases; this completed validation is retained as history.

## Context

- Date: 2026-10-09 Asia/Shanghai
- Validator: Vera
- Repository / branch / base: `D:\gno-node-projects\gno-shared-components-v2`, `master`, `c580e40819842932fe9430cefddca92bf6525867`
- Scope: A-006 corrections for F-003 and F-005 through F-007, plus the A-007 one-line `.catalog__empty { min-width: 0; }` amendment
- Environment: Windows; Node.js 26.10.0; npm 11.19.1; Playwright 1.63.0 Chromium; local production server only
- Test oracle: `08_review_adjustment_plan_2026-10-09.md`, A-006, A-007, foundation acceptance criteria, and `manual_testing.md`

## Command results

| Command / check | Actual result | Status |
| --- | --- | --- |
| `npm run check` | Exit 0. TypeScript, ESLint, Vitest command, package build, Storybook build, and Next.js 16.3.8 production build passed; `/` and `/catalog` prerendered. Vitest found zero unit files and Storybook found zero stories, consistent with the approved empty component inventory. | PASS |
| `npm run pack:check` | Exit 0. `gno-shared-components@0.1.0`; 7 files; 1.4 kB packed and 2.6 kB unpacked. | PASS |
| `npm audit --omit=dev --audit-level=high` | Exit 0; `found 0 vulnerabilities`. | PASS |
| `npm audit` | Exit 1; five high advisories remain only through `eslint-config-next -> @next/eslint-plugin-next -> fast-glob -> micromatch -> braces`. npm proposes a breaking forced downgrade. | PASS under the explicit temporary development-only exception in A-006; follow-up required when upstream fixes exist |
| `npm run test:e2e` | Exit 0; 6/6 Playwright cases passed across Chromium desktop 1440x900 and mobile 375x812. | PASS |
| Direct local Chromium acceptance probe | Exit 0. Empty catalog and illustrative guidance visible; `Showcase home` navigated to `/`; no console/page errors. Document widths were 1440/1440 desktop and 375/375 mobile; mobile code block remained internally scrollable at 277/912. | PASS |
| Visual screenshot inspection | Desktop and mobile catalog screenshots showed readable, non-overlapping content and no clipped controls; mobile code content remains inside its own scroll container. | PASS |
| `git check-ignore -v --no-index ...` | Exit 0. `/out/`, `/build/`, `.vercel/`, `*.pem`, `/playwright-report/`, `/test-results/`, and `/blob-report/` all matched their intended `.gitignore` lines. | PASS |
| `git diff --check` | Exit 0; only expected LF-to-CRLF working-copy warnings were emitted. | PASS |

## Requirement and finding disposition

| Finding / risk | Validation | Status |
| --- | --- | --- |
| F-003 generated and secret exclusions | Every restored and new browser-output pattern matched a representative safe path. | PASS |
| F-005 stale state | `state.md` now records base revision, current dirty candidate, A-006/A-007, Bitbucket target history, verification results, and next action. | PASS for Vera scope; Argus confirms closure |
| F-006 security disposition | Shipped dependency audit is clean. The full audit result is unchanged and explicitly accepted temporarily by A-006 as development-only. | PASS with approved exception |
| F-006 browser evidence | Six repeatable E2E cases plus direct navigation/measurement and visual screenshot inspection cover MT-001 through MT-003. | PASS |
| A-007 mobile overflow amendment | `/catalog` at 375 px now measures 375 px client and scroll width while the long code sample scrolls internally. | PASS |
| F-007 concrete push approval | No push was attempted. A final push approval remains required after a reviewed commit exists. | N/A for Vera validation; gate remains pending |

## Manual acceptance results

All three cases in [`../manual_testing.md`](../manual_testing.md) were executed
through Chromium automation and visual evidence at the approved candidate diff.
MT-001, MT-002, and MT-003 are PASS. No production credentials, services, or
data were used.

## Overall result and handoff

Adjustment validation status: **PASS**. A-006 and A-007 are satisfied within
Vera's scope, including the approved temporary development-tooling audit
exception. No application or tooling code was changed during validation.

The candidate is ready for Argus independent re-review. It is not yet ready for
commit or push: Argus must close the findings, the expanded test/tooling/runtime
file set requires an updated concrete commit summary and approval, and push must
receive separate approval for the resulting commit hash and exact command.
