# PR #16 Google Analytics code-review adjustments

## Scope

This follow-up addresses the post-merge review comment on PR #16 against
`origin/master` at `72d2bcc`. The approved scope includes CR-001, CR-005,
CR-006, CR-014 readability-only cleanup, and CR-015 formatting cleanup.

The review comment was posted after PR #16 merged. Argus re-assessed each item
against the current merged implementation before this plan was prepared.

## Findings and approved corrections

### CR-001 — required

Transport failures can complete an event callback twice: the transport timeout
and the `push()` failure path can each invoke completion. Make completion
single-shot and add a throwing-transport regression test.

### CR-005 — required

Expired queue entries can accumulate without a bound and survive consent denial.
Bound or report expiry deterministically, clear stale expired entries on denial,
and add a factory-level expiry regression test.

### CR-006 — required

Configuration validation still emits cryptic issue codes such as `gtm:p`,
`cb:f`, `dim x:default`, and `event:max25`. Replace them with actionable
readable messages and update affected assertions.

### CR-014 — optional, readability only

Restore descriptive AdSlot identifiers where the review identified compressed
names. The approved Ads requirement remains a 20 KiB **raw/uncompressed** gate;
this scope does not move the AdSlot gate to gzip or alter its budget.

### CR-015 — optional

Correct the `default:` indentation in `validation.ts` without changing behavior.

## Exclusions

- No gzip-only AdSlot size-gate change.
- No unrelated refactoring or runtime behavior outside the listed findings.
- No changes to `.playwright-mcp/`, which remains user-owned.

## Validation plan

- Focused Google Analytics unit/regression tests for CR-001, CR-005, and CR-006.
- AdSlot focused tests and raw size gate for CR-014.
- Typecheck, package build, documentation coverage, and lint.
- Full Vitest and consumer fixture checks.
- `git diff --check`.
- Record browser verification as PASS only if executed on this exact revision;
  otherwise record justified N/A/BLOCKED.

## Implementation

- CR-001: transport completion is invoked by the transport failure path and
  the caller no longer invokes a second completion; a throwing-transport
  callback regression was added.
- CR-005: expired entries are bounded by queue capacity and cleared on denied
  consent; a factory-level expiry/denial regression was added.
- CR-006: configuration and event validation now emits actionable messages
  instead of short issue codes, including the event-parameter limit; assertions
  were updated.
- CR-014: `stateChangeRef` restores a descriptive AdSlot callback reference
  while preserving the approved raw bundle gate.
- CR-015: corrected `default:` and related validation indentation.

## Validation

- Focused Google Analytics and AdSlot suites: 40/40 passed.
- Full Vitest suite: 88/88 passed across 9 test files.
- Typecheck and package build: passed.
- Targeted ESLint: passed.
- AdSlot raw size gate: passed (20,474 / 20,480 bytes).
- Google Analytics gzip size gate: passed (5,661 / 8,192 bytes).
- Documentation coverage: passed.
- `git diff --check`: passed.
- Consumer fixtures: passed for all 6 fixtures.
- Package dry-run: passed for `nmi-devops-shared-components@1.4.1`.
- Manual testing reference: `specs/2026/google-analytics/manual_testing.md`;
  browser execution is N/A for this non-visual follow-up, with rationale
  recorded in the follow-up addendum.

## Independent review

Argus final re-review: **PROCEED**. CR-001, CR-005, CR-006, CR-014
readability-only, and CR-015 are resolved. No additional required findings or
approved-scope leftovers remain.

## Status

**PROCEED — ready for commit approval** on
`feature/google-analytics-review-adjustments-v2` at merge commit `92ea9c8`,
based on `origin/master` at `72d2bcc`. Commit and Git delivery remain
separately gated.
