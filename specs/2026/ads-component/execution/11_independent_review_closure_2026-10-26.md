# Execution report 11: Ads component independent review closure

## Decision

**BLOCKED by one new Major required finding.** Independent Argus closed ADS-REV01–ADS-REV05 against their approved correction criteria and found no other new required issue, but ADS-REV06 prevents commit readiness.

## Closure results

| Finding | Result | Independent evidence |
| --- | --- | --- |
| ADS-REV01 | CLOSED | Persistent lifecycle serialization plus delayed creation/destruction, config/provider replacement, pending unmount, late real GPT queue, and peak-one tests satisfy the approved correction. |
| ADS-REV02 | CLOSED | Latest callback storage is outside lifecycle dependencies; callback-identity rerender test proves no slot recreation. |
| ADS-REV03 | CLOSED | Stable story configs/providers and create/destroy counters support corrected ADS-MT08 evidence. |
| ADS-REV04 | CLOSED | GPT adapter keeps cleanup retryable, handles `destroySlots(false)`, and has listener/destroy retry tests. |
| ADS-REV05 | CLOSED | Acceptance, changelog, manual QA, state, and report 10 were synchronized for the corrected candidate. |

## New required finding

### ADS-REV06 — Major: AdSlot loses ownership after cleanup rejection and proceeds with replacement

- Requirements: ADS-R04, ADS-R07; ADS-AC03, ADS-AC05, ADS-AC06; ADS-NFR02, ADS-NFR04.
- Locations: `packages/ui/src/components/ad-slot/ad-slot.tsx:64-67`, `98-102`, `146-150`; retryable adapter handle at `gpt-provider.ts:83-120`.
- Evidence: responsive replacement and effect cleanup clear `ownedSlot` before awaiting `destroySlot`. If destruction rejects, the component no longer retains the handle. Queue recovery allows the next generation to run and create a replacement while the old GPT slot may remain live.
- Impact: leaked listeners or GPT slots, duplicate inventory/impressions, and violation of the peak-one invariant after cleanup failure.
- Required correction: retain ownership until destruction succeeds, block replacement creation after failed destruction, expose cleanup failure deterministically, and retry using the same handle rather than losing it.
- Validation: use a fake GPT provider whose first destruction returns false or throws during config/provider replacement; assert no replacement is defined while the old slot remains, retry succeeds with the same handle, replacement begins only afterward, peak live slots remains one, and failure is observable. Cover unmount cleanup rejection without an unhandled rejection or lost first-retry opportunity.

## Gate result

A new adjustment plan and explicit review-adjustment approval are required before implementation. Commit, push, and pull request remain blocked and unapproved.
