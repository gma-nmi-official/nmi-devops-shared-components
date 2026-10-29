# Adjustment validation report: documentation site revamp

## Context and decision

- Approved plan: A-001 through A-003 in report 08, approved by APR-006.
- Repository / branch: `D:\gno-node-projects\gno-shared-components-v2`,
  `feature/documentation-site-revamp`.
- Base: `54e9a06d9ee86874b5c4cf40f7e0d3ce1a67e6ed` plus the complete intended dirty diff.
- Validator: Vera role after Forge corrections.
- Decision: **PASS**. The updated candidate is ready for independent Argus
  closure of F-001 through F-003.

## Corrections and evidence

| Finding | Correction | Validation evidence | Result |
| --- | --- | --- | --- |
| F-001 | Ad Slot example is a client component that receives `GptCompatible` and consent, memoizes `createGptAdProvider`, and renders with declared inputs. Google Analytics receives typed `Gtag` and `ConsentState` inputs at a client boundary. Matching TypeScript consumer fixtures compile the same examples. | `npm run typecheck`; `npm run test:consumers`; focused Playwright assertions for both guide snippets/previews; `npm run check`. | PASS |
| F-002 | Added a guide-to-Storybook browser test that activates the Portal Header link, verifies the `/docs` URL, and confirms the encoded `path` reaches the iframe `src`. | Focused test 2/2; final complete `npm run test:e2e` 48/48. | PASS |
| F-003 | Reconciled design decision approvals, NFR approvals/brand scope/traceability, verification manual status and R-001 evidence, WBS MT-004 status, state, and APR-006. Historical report 07 remains unchanged as review evidence. | Cross-document stale-status search returned no matches outside historical report 07; `git diff --check` has no content error. | PASS |

## Commands and results

| Command | Result |
| --- | --- |
| `npm run typecheck` | PASS |
| `npm run test:consumers` | PASS; six JavaScript/TypeScript fixtures built and SSR-safe import verified |
| Focused ESLint for corrected source/tests | PASS |
| Focused Storybook query-forwarding Playwright test | PASS, 2/2 desktop/mobile |
| Focused corrected-guide content/preview Playwright tests | PASS, 4/4 desktop/mobile |
| `npm run test:e2e` after final assertions | PASS, 48/48 |
| `npm run check` | PASS; size gates, lint, 9 files / 73 unit tests, six fixtures, Storybook, and Next build |
| Configured-base-path static `next build` | PASS; all four guide routes emitted |
| `git diff --check` | PASS; line-ending notices only |

The initial sandboxed consumer-fixture invocation failed with Windows
`spawn EPERM`; the required unrestricted rerun passed. Existing non-fatal Vite
warnings about client directives, sourcemaps, Storybook output placement, and
chunk size remain unchanged.

## Manual testing and scope

The corrections change guide code text, automated coverage, and workflow
records; they do not change the already accepted layout or visual system.
Therefore MT-001 through MT-004 remain valid and no manual visual rerun is
required. Published package runtime, exports, versions, lockfile, component
stories, changelog, and deployment workflow remain unchanged.

## Handoff

Argus must independently confirm F-001 through F-003 against this updated
candidate and record report 10. Commit, push, PR, merge, release, and deployment
remain unauthorized.
