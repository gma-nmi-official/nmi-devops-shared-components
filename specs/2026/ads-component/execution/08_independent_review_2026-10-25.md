# Execution report 08: Ads component independent review

## Decision

**BLOCKED.** Independent Argus review found two Major and three Minor required findings. No source or documentation changes were made during review. Commit, push, and pull-request readiness are blocked pending approved corrections, revalidation, and review closure.

## Review context

- Repository/branch: `D:\gno-node-projects\gno-shared-components-v2`, `feature/ads-component`.
- Revision reference: baseline `a546c6858312b4d3a168009efad37da276afe9b1` plus the current ads-component working-tree diff.
- Requirements: ADS-R01–ADS-R12, ADS-AC01–ADS-AC18, approved design and NFRs.
- Input evidence: automated verification PASS and manual QA ADS-MT01–ADS-MT10 PASS.
- Reviewer: independent Argus agent, read-only review on 2026-10-25 Asia/Shanghai.

## Required findings

### ADS-REV01 — Major: lifecycle work is not serialized across effect replacement or Strict Mode replay

- Requirements: ADS-R04, ADS-R07; ADS-AC03, ADS-AC06; ADS-NFR02, ADS-NFR04.
- Location: `packages/ui/src/components/ad-slot/ad-slot.tsx:50-56`, `69-113`, `129-138`.
- Evidence: slot ownership and the `operation` promise are scoped to one effect invocation. Cleanup starts `destroySlot` without awaiting completion, while a replacement effect can immediately call `createSlot`. Pending creation, asynchronous destruction, or a late GPT command queue can therefore overlap generations, including Strict Mode replay.
- Impact: transient duplicate live slots, duplicate impressions, or GPT `defineSlot` failure during config/provider replacement and Strict Mode.
- Required correction: serialize create/destroy work across effect generations with persistent lifecycle state, or make queued creation cancellable so the previous create/destroy lifecycle completes before replacement creation.
- Validation: delayed-create and delayed-destroy tests for active-to-active config replacement, provider replacement, unmount during pending creation, and Strict Mode with a late GPT queue; assert destroy-before-create ordering and a peak of one owned slot.

### ADS-REV02 — Major: callback identity changes recreate the ad slot

- Requirements: ADS-R04, ADS-R07; ADS-AC03, ADS-AC06; ADS-NFR04.
- Location: `packages/ui/src/components/ad-slot/ad-slot.tsx:59-63`, `138`.
- Evidence: `onStateChange` is a lifecycle-effect dependency. A parent rerender with a new inline callback tears down and recreates an otherwise unchanged provider slot.
- Impact: unnecessary ad requests/impressions and avoidable destroy/create churn on unrelated parent renders.
- Required correction: retain the latest callback in a ref or equivalent stable event mechanism and remove callback identity from lifecycle dependencies.
- Validation: rerender with unchanged config/provider/enabled values and a new callback; assert no create/destroy call, then verify later state reaches the latest callback.

### ADS-REV03 — Minor: the MultipleSlots story did not validly prove isolation

- Requirements: ADS-R11, ADS-R12; ADS-AC07.
- Location: `packages/ui/src/components/ad-slot/ad-slot.stories.tsx:21-31`; evidence claims in `manual_testing.md:229` and `execution/07_verification_report_2026-10-25.md:39`.
- Evidence: each render calls `fakeProvider()` for both slots. Toggling the first slot rerenders the harness and changes the remaining slot's provider identity, triggering lifecycle replacement. A stable DOM ID does not prove its provider handle was preserved.
- Impact: ADS-MT08 is recorded PASS without demonstrating the required instance-isolation behavior.
- Required correction: use stable providers/configs, instrument create/destroy ownership, and rerun ADS-MT08.
- Validation: after unmounting the first slot, the second provider handle is neither destroyed nor recreated and continues receiving state.

### ADS-REV04 — Minor: GPT cleanup failure makes a handle permanently non-retryable

- Requirements: ADS-R04, ADS-R07; ADS-AC05, ADS-AC06.
- Location: `packages/ui/src/components/ad-slot/gpt-provider.ts:81-95`.
- Evidence: `internal.destroyed` is set before queued cleanup runs. If listener removal or `destroySlots` throws, the promise rejects but later cleanup returns early. The boolean result from `destroySlots` is also ignored.
- Impact: listener or slot leakage can become silently unrecoverable after cleanup failure.
- Required correction: commit destroyed state only after successful cleanup or restore retryable state on failure; explicitly define and handle `destroySlots(false)`.
- Validation: thrown-cleanup and `destroySlots(false)` tests demonstrate observable failure and successful retry, or another documented deterministic terminal policy.

### ADS-REV05 — Minor: release evidence is internally stale

- Requirement: repository policy rules 15–16 and linked acceptance evidence.
- Locations: `acceptance_criteria.md:14`, `acceptance_criteria.md:20`, and the `1.3.0` validation section in `CHANGELOG.md`.
- Evidence: acceptance criteria still say no-fill/manual visual QA is pending, and the changelog says required manual QA is pending, while report 07 records all ten cases PASS.
- Impact: contradictory readiness evidence for the candidate.
- Required correction: after correction and revalidation, synchronize acceptance criteria, changelog evidence, verification/review reports, and current state.
- Validation: all linked artifacts describe the same candidate, results, open findings, and readiness state.

## Additional test-adequacy finding

The approved plan called for late GPT queue, stale asynchronous completion, config/provider replacement, event filtering, mutation-negative, and explicit SSR lifecycle coverage. Current tests do not cover several of these cases. ADS-REV01 through ADS-REV04 show the missing asynchronous and replacement coverage is material, so ADS-AC06 and ADS-AC18 cannot remain fully accepted until corrections and focused regressions pass.

## Recommendation

Prepare the correction and validation plan in report 09 and obtain explicit review-adjustment approval. Forge must not change source, stories, tests, or release evidence before that approval. After implementation, Vera revalidates affected behavior and regressions, then Argus independently closes each finding.
