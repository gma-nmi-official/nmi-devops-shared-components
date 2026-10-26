# Adjustment validation report: Google Analytics

## Context

- Adjustment approval: GA-A12, 2026-10-26 Asia/Shanghai
- Findings addressed: GA-REV01 through GA-REV05
- Revision: HEAD `43dd02552014506b81600783cb0dcff3ab9d8791` plus the approved dirty correction diff
- Remaining GA-REV06 evidence: manual QA remains unexecuted; consumer fixtures, package dry-run, production build, and the 32-case Playwright suite now pass in a permitted local environment.

## Corrections and validation

| Finding | Correction | Result |
| --- | --- | --- |
| GA-REV01 | Added `video.eventValue`, finite validation, configured default, and call-specific numeric override. | PASS: unit coverage and typecheck |
| GA-REV02 | Transport adapters now return success/failure; synchronous throws return `failed/transport_error` and call `onError` once. | PASS: direct/GTM failure unit coverage |
| GA-REV03 | GTM callbacks now use shared at-most-once completion and timeout wrapping. | PASS: callback duplicate/timeout unit coverage |
| GA-REV04 | Catalog preview initializes once and keeps its analytics instance stable across consent changes. | PASS: typecheck; Storybook build; browser execution remains pending |
| GA-REV05 | Storybook analytics meta binds `AnalyticsHarness` and exposes transport, consent, readiness, payload-log, and failure controls. | PASS locally: Storybook static build and coverage check; independent confirmation pending |

## Checks

- `npm run typecheck` — PASS
- `npm run lint` — PASS
- `npm test -- --run` — PASS, 73 tests
- `npm run size:analytics` — PASS, 16,265 / 16,384 bytes
- `npm run docs:check` — PASS
- `npm run build-storybook` — PASS with explicit Windows esbuild binary environment; existing sourcemap/directive warnings only
- `git diff --check` — PASS
- `npm run test:consumers` — PASS with explicit Windows esbuild binary; 6 fixtures and SSR import verified
- `npm run pack:check` — PASS with repository-local npm cache; `1.4.0` dry-run produced successfully

After the first confirming review noted missing harness controls, the approved
GA-A12 correction was extended within the same scope: `ready`, `failTransport`,
readiness output, payload-count output, and transport-failure simulation are now
exposed by the Storybook harness. `npm run build-storybook` passes with the
explicit Windows esbuild binary environment.

## Decision

PARTIAL. The five code findings are corrected and locally validated, and the
consumer/package checks now pass. GA-REV06 remains open until GA-MT01–GA-MT10
manual QA executes. Confirming Argus review is still pending because
the reviewer agent reached its usage limit; this session does not claim
independent confirmation.
