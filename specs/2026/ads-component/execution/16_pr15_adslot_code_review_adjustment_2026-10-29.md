# PR #15 AdSlot code-review adjustments

## Scope

Implemented all approved post-merge findings from the PR #15 review comment:

- CR-002: disabled responsive ranges now emit server-rendered media rules so
  the reserved box is hidden before hydration, while the client effect remains
  the lifecycle/provider fallback.
- CR-004: `enabled={false}` remains provider-free but preserves reserved space
  for consent and eligibility gating.
- CR-005: restored descriptive cancellation names and moved the AdSlot size
  gate from raw bytes to an 8 KiB gzip budget, reporting both measurements.
- CR-006: documented `readinessTimeoutMs` and disabled responsive behavior in
  the package README and catalog guidance; the ReducedMotion story now reaches
  a visible collapsed state.
- CR-007: added component-level blocked-GPT error/collapse regression coverage.
  Existing unmount-after-stalled-create coverage remains in the suite.

## Implementation

- `AdSlot` emits a scoped media stylesheet from validated disabled rule ranges,
  gated by consumer eligibility so `enabled={false}` still reserves space.
- Responsive disabled state remains provider-free and the provider lifecycle
  still uses the client effect for creation, destruction, resize, and cleanup.
- Cancellation identifiers now distinguish effect cancellation from the
  provider create cancellation signal.
- The AdSlot quality gate reports raw and gzip output and enforces an 8 KiB gzip
  limit so readable lifecycle code is not compressed to satisfy a raw limit.
- README, catalog guidance, Storybook ReducedMotion, tests, and manual-testing
  evidence were updated in the same delivery unit.
- ADS-A10 supersedes the original raw-size planning target in the current
  nonfunctional requirements, test plan, and consumer setup records; historical
  execution reports retain their original evidence unchanged.

## Validation

- Focused AdSlot suite: 26/26 passed.
- Full Vitest suite: 89/89 passed across 9 test files.
- Typecheck/package build: passed.
- AdSlot size gate: 21,252 raw bytes; 5,615 gzip bytes / 8,192-byte limit.
- Consumer fixtures: passed for all 6 fixtures.
- Storybook coverage: passed.
- Storybook production build: passed with existing Vite `use client`, sourcemap,
  public-directory, and chunk-size warnings.
- Targeted Playwright AdSlot catalog check: 2/2 passed across chromium-mobile
  and chromium-desktop.
- Targeted ESLint: passed.
- `git diff --check`: passed.
- Full repository lint remains noisy/failing on pre-existing generated
  `playwright-report` artifacts; targeted lint for the changed source/scripts
  passes and those artifacts remain untouched.

## Review status

Implementation is complete on `feature/ads-review-adjustments-v2` from
`master` `72d2bcc`. Vera validation passed with the evidence above, and Argus
independent re-review returned **PROCEED** with no required findings or stale
active size-contract leftovers. The candidate is ready for separate commit
approval. Push, PR, merge, release, and deployment remain separately gated.

## Adjustment record

This record follows the required filename convention:
`16_pr15_adslot_code_review_adjustment_2026-10-29.md`.
