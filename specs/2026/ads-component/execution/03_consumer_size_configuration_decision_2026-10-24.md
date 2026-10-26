# Execution report 03: Consumer size configuration decision

## Executive summary

The user confirmed that consumers must configure all ad-unit sizes. Recorded ADS-A03: every active responsive rule requires a consumer-provided full unit path and complete non-empty size list. The shared package will not infer or supply operational MREC, leaderboard, or custom-display size defaults.

## Workflow context

- Project: Ads component.
- Stage: Requirements analysis.
- Primary role: Athena; Atlas records the decision and remaining gates.
- Repository baseline: `feature/ads-component` / `a546c6858312b4d3a168009efad37da276afe9b1`, with the planning worktree described in `state.md`.

## Previous stage summary

Report 02 refreshed the configurable ads plan and proposed reference-derived MREC/leaderboard examples. Size ownership was still awaiting confirmation.

## Current stage objective

Clarify whether format labels provide sizes or consumers must configure them.

## Documents referenced

- User decision dated 2026-10-24 Asia/Shanghai.
- `requirements.md`, `acceptance_criteria.md`, `design.md`, `specification.md`, `consumer_setup.md`, `test_plan.md`, `wbs.md`, `reference_analysis.md`, `approvals.md`, and `state.md`.

## Execution details

- Recorded ADS-A03 in the approval/decision log.
- Changed MREC and leaderboard from size presets to semantic format labels.
- Required every active responsive rule to contain a non-empty valid size list and unit path.
- Retained explicit disabled rules as the only rules that omit unit path and sizes.
- Kept sizes observed in `news` only as consumer documentation examples.
- Added negative-test expectations for missing or empty size lists.

## Findings

This decision removes the need for a shared-package MREC/leaderboard size policy and prevents reference inventory assumptions from becoming package behavior. Consumers and their monetization/design owners remain responsible for breakpoint-specific sizes.

## Risks

Consumers can provide inventory-incompatible sizes, so configuration validation can check shape and numeric validity but cannot certify monetization correctness. Consumer integration documentation and staging QA must verify provisioned sizes.

## Recommendation

Keep `format` for semantics, styling hooks, diagnostics, and documentation only. Never use it to inject sizes. Reject an active rule whose `sizes` list is missing, empty, malformed, or contains non-positive/non-integer dimensions.

## Approval status

ADS-A03 is an approved requirements decision for size ownership. It is not full requirements approval or development approval.

## Next stage

Resolve the remaining provider scope, custom-display scope, privacy/eligibility, no-fill, performance, browser, and branch-synchronization decisions before requesting formal requirements approval.
