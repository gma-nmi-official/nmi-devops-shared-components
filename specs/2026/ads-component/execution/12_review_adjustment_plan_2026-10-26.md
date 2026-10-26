# Execution report 12: ADS-REV06 adjustment plan

## Approval requested

Approve ADS-ADJ05 to correct ADS-REV06. Approval would authorize implementation, focused/full validation, and independent closure review only. It would not authorize commit, push, pull request, merge, tag, release, or deployment.

## ADS-ADJ05 — Preserve and retry failed cleanup ownership

- Files: `packages/ui/src/components/ad-slot/ad-slot.tsx`, focused component/integration tests, and affected ads evidence.
- Ownership model: move the owned handle and its creating provider into persistent per-instance lifecycle state shared across effect generations. Never clear ownership before successful destruction.
- Ordering: every activation first destroys any previously owned handle through its original provider. Replacement creation remains blocked until that operation succeeds.
- Retry policy: each lifecycle cleanup transition may retry one transient failure immediately with the same handle. If cleanup still fails while mounted, retain the handle, expose `error` through the latest callback/state, create no replacement, and allow the next lifecycle trigger to retry the same handle. During unmount, perform the same bounded retry, report the failure through the latest callback without updating React state, and contain terminal rejection so no unhandled promise occurs.
- Success: clear persistent ownership only after `destroySlot` resolves. A later replacement can then create exactly one new slot.
- Compatibility: no public prop/type change; callback error reporting uses the existing `onStateChange(state, error)` contract.

## Validation plan

1. Real fake-GPT replacement where `destroySlots(false)` occurs once, then succeeds: failure observable, same handle retried, no replacement before success, peak live slots one.
2. Listener-removal throw during provider/config replacement, then success: same ordering and ownership assertions.
3. Terminal mounted cleanup failure: state/callback reports error, no new slot is created, and a later resize/config trigger retries the retained handle.
4. Unmount first-attempt cleanup failure followed by successful bounded retry: no unhandled rejection and no lost handle before retry.
5. Existing delayed create/destroy, Strict Mode late queue, callback identity, GPT adapter retry, multi-instance, mutation-negative, SSR, accessibility, responsive, and eligibility regressions.
6. `npm run check`, `npm run pack:check`, `npm run test:e2e`, size budget, and live-network negative.

ADS-MT08 and ADS-MT09 remain valid unless the correction affects story/provider identities or presentation; otherwise rerun the affected case. Any FAIL or PARTIAL result blocks Argus closure.

## Gate status

- Requirements ADS-A04 and development ADS-A05 remain valid.
- First adjustment approval ADS-A06 and closures ADS-REV01–ADS-REV05 remain valid.
- ADS-ADJ05 approval: **APPROVED as ADS-A07 on 2026-10-26 Asia/Shanghai**.
- Git/release actions: unapproved.

## Implementation and validation status

- ADS-ADJ05 implemented with persistent `{ provider, slot }` ownership, success-only ownership clearing, same-handle bounded retry, blocked replacement after terminal failure, and cleanup-error callback reporting.
- Vera validation PASS on 2026-10-26 Asia/Shanghai; see `13_ads_rev06_validation_2026-10-26.md`.
- Independent Argus closure remains required.
