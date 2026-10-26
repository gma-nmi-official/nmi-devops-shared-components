# Execution report 09: Ads component review-adjustment plan

## Approval requested

Approve the corrections below for ADS-REV01 through ADS-REV05. This approval would authorize Forge implementation and Vera validation only. It would not authorize commit, push, pull request, merge, tag, release, or deployment.

## Scope and rationale

Independent review blocked the candidate on lifecycle concurrency, callback-driven recreation, invalid manual-isolation evidence, non-retryable GPT cleanup, and stale release records. The correction stays within approved ADS-R01–ADS-R12 behavior and does not add a new public capability.

## Correction units

### ADS-ADJ01 — Serialize slot lifecycle generations

- Findings: ADS-REV01 and the lifecycle portion of ADS-REV02.
- Files: `packages/ui/src/components/ad-slot/ad-slot.tsx` and focused component tests.
- Change: maintain lifecycle coordination across effect generations; prevent replacement creation until prior pending creation/owned destruction is settled; preserve cancellation/stale-callback guards; ensure Strict Mode replay cannot produce overlapping owned slots.
- Callback handling: keep the latest `onStateChange` callback in a stable ref/equivalent so callback identity alone does not recreate a slot.
- Compatibility: no planned public prop/type change.

### ADS-ADJ02 — Make GPT cleanup deterministic and retryable

- Finding: ADS-REV04.
- Files: `packages/ui/src/components/ad-slot/gpt-provider.ts` and provider contract tests.
- Change: mark the internal handle destroyed only after successful listener/slot cleanup, restore retryable state after failure, and treat `destroySlots(false)` as an observable cleanup failure.
- Compatibility: provider API remains unchanged; failure behavior becomes deterministic.

### ADS-ADJ03 — Correct Storybook isolation evidence

- Finding: ADS-REV03.
- Files: `packages/ui/src/components/ad-slot/ad-slot.stories.tsx`, relevant story documentation, and `manual_testing.md` result evidence.
- Change: provide stable configs/providers for the two-slot story and expose enough instrumentation to verify per-handle create/destroy counts. Rerun ADS-MT08 and replace its prior invalid evidence rather than silently retaining it.

### ADS-ADJ04 — Synchronize release evidence

- Finding: ADS-REV05.
- Files: `acceptance_criteria.md`, `CHANGELOG.md`, verification/current-state reports, and review closure records.
- Change: record corrected test/manual results and review status consistently. During correction, affected acceptance criteria remain blocked or under revalidation; they return to PASS only on evidence.

## Validation plan

Vera will run and record:

1. Focused component tests for delayed create, delayed destroy, active config replacement, provider replacement, pending-create unmount, Strict Mode late queue, callback identity stability, stale completion, and peak-one-slot ownership.
2. GPT adapter tests for listener cleanup failure, thrown `destroySlots`, `destroySlots(false)`, retry behavior, event filtering, and owned-slot cleanup.
3. Existing mutation-negative, eligibility, accessibility, responsive, multi-instance, and SSR/import boundaries, adding explicit cases where the approved plan lacks evidence.
4. `npm run check`, `npm run pack:check`, and `npm run test:e2e` on the corrected working tree.
5. ADS-MT08 against stable instrumented providers; retain the repository owner's valid ADS-MT09 zoom result unless an affected presentation change occurs.
6. Package-size and live-network negative checks.

Any FAIL or PARTIAL result blocks review closure. After Vera passes the corrections and relevant regressions, independent Argus review will verify ADS-REV01 through ADS-REV05 against the updated diff.

## Impact and risk

- Expected consumer impact: bug-fix behavior only; no migration planned.
- Primary implementation risk: incorrectly serialized asynchronous work could suppress a valid replacement or leak a stale handle. The focused ordering and failure-retry tests are required controls.
- Documentation risk: earlier PASS claims must remain traceable; corrected evidence will explicitly supersede invalid ADS-MT08 and stale readiness text.

## Gate status

- Requirements approval ADS-A04: remains valid; scope is unchanged.
- Development approval ADS-A05: original implementation remains authorized, but review findings require this separate adjustment approval before corrections.
- Review-adjustment approval: **APPROVED as ADS-A06 on 2026-10-25 Asia/Shanghai**.
- Git/release approvals: not requested and remain unapproved.

## Forge implementation status

- ADS-ADJ01: implemented with a persistent per-instance lifecycle queue across effect generations and a latest-callback ref that does not participate in lifecycle dependencies.
- ADS-ADJ02: implemented with retryable cleanup state, listener-removal tracking, and explicit `destroySlots(false)` failure.
- ADS-ADJ03: implemented with stable story configs/providers and visible per-slot create/destroy counters; ADS-MT08 remains blocked until Vera reruns it.
- ADS-ADJ04: stale PASS claims were changed to pending revalidation while preserving original evidence history.
- Focused Forge checks: AdSlot Vitest files 26/26 PASS, `npm run typecheck` PASS, `npm run lint` PASS, Storybook build PASS, and `npm run size:ads` PASS at 16,729/20,480 bytes. These are implementation checks, not independent Vera validation.

## Vera validation status

PASS on 2026-10-26 Asia/Shanghai. See `10_review_adjustment_validation_2026-10-26.md`. Independent Argus closure remains required.
