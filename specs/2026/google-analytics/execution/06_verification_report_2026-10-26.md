# Verification report: Google Analytics

## Context

- Project: Google Analytics
- Repository: `D:\gno-node-projects\gno-shared-components-v2`
- Branch: `feature/google-analytics`
- Tested revision: HEAD `43dd02552014506b81600783cb0dcff3ab9d8791` plus the current dirty Google Analytics implementation diff
- Environment: Windows, Node `v26.10.0`, npm `11.19.1`, TypeScript 5, React `19.2.8`, Next `16.4.2`, Vitest `4.1.12`, Storybook `10.6.3`
- Approval scope: GA-A10 requirements and GA-A11 development plan; no Git delivery actions

## Automated evidence

| Command | Result | Evidence |
| --- | --- | --- |
| `npm run typecheck` | PASS | Package build and root/workspace TypeScript checks exit 0 |
| `npm run lint` | PASS | ESLint exits 0 |
| `npm test -- --run` | PASS | 9 files, 69 tests pass; existing jsdom canvas warning is non-failing |
| `npm run size:analytics` | PASS | 15,416 bytes across 7 compiled JS files; 16,384-byte limit |
| `npm run docs:check` | PASS | Public component and analytics Storybook coverage present |
| `npm run build-storybook` | PASS with explicit Windows esbuild environment | Static Storybook output generated at `public/storybook/index.html`; Vite reports only existing sourcemap/directive warnings |
| `npm run test:consumers` | PASS (permitted local run) | Built 6 JavaScript/TypeScript fixtures and verified SSR-safe package import with the Windows esbuild binary configured |
| `npm run pack:check` | PASS (permitted local run) | Dry-run produced `nmi-devops-shared-components-1.4.0.tgz` using a repository-local npm cache |
| `git diff --check` | PASS | No whitespace errors |
| `npm run test:e2e` | PASS (elevated permitted run) | 32/32 Chromium desktop/mobile tests passed under Node `v22.23.4`; includes the Google Analytics catalog no-network test |
| `npm run build` | PASS (permitted local run) | Package, Storybook, and Next.js production build completed; `/docs` is prerendered |

The generated Storybook output is ignored runtime build output and is not a
tracked release artifact. No production analytics or GTM endpoint was called.

## Manual QA handoff

The standalone QA reference is [`../manual_testing.md`](../manual_testing.md).
It contains ten requirement-linked cases covering SSR, both transports, consent,
readiness, queue boundaries, context, event helpers, failures, isolation, and
browser/network behavior. All cases are **BLOCKED (not executed)** pending a QA
owner and actual browser/manual execution; preparation is not a pass.

## Findings and recommendation

- PASS: automated unit, type, lint, size, docs coverage, and static Storybook generation.
- BLOCKED: consumer fixture build and package dry-run due local Windows process/cache permissions.
- BLOCKED: all manual QA cases and independent review.

Recommendation: return the candidate to the repository owner/QA for rerunning
the two environment-blocked commands and executing GA-MT01–GA-MT10. Do not mark
the release candidate ready for commit until required manual and independent
review evidence is complete.
