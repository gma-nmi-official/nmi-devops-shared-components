# AdSlot PR #21 code-review adjustments

## Scope

This follow-up addresses the PR #21 re-review comment at
`https://github.com/gma-nmi-official/nmi-devops-shared-components/pull/21#issuecomment-6509342113`.
The reviewed implementation is based on commit `eec3e93` on
`feature/ads-review-adjustments-v2`.

- CR-002 (Medium): disabled responsive ranges now hide the slot from the
  server-rendered markup regardless of the consent `enabled` value, while
  active ranges still preserve reserved space when `enabled={false}`.
- CR-008 (Medium): malformed responsive ranges are excluded before CSS is
  interpolated into `dangerouslySetInnerHTML`; an SSR regression proves that
  malformed values cannot emit markup.

CR-005 and CR-009 are Low findings. Per the approved policy, they are deferred
without code adjustment; their disposition is recorded here so no review
comment or stale evidence is left unclassified.

## Validation

- Focused AdSlot suite: 27/27 passed.
- Full Vitest suite: 90/90 passed across 9 test files.
- Typecheck/package build: passed.
- Consumer fixtures: 6/6 passed.
- Storybook coverage/build, targeted ESLint, and `git diff --check`: passed.
- AdSlot size gate: 21,427 raw bytes / 5,663 gzip bytes; 8,192-byte gzip
  limit passed.
- Targeted AdSlot Playwright: 2/2 passed across Chromium desktop/mobile.
- Independent Argus review: **PROCEED**. CR-002 and CR-008 are resolved;
  CR-005 and CR-009 are explicitly deferred Low findings under ADS-A12.

## Delivery

This is a follow-up to the open PR #21. No required findings remain. Commit,
push, merge, release, and deployment remain separately gated. The user-owned
`.playwright-mcp/` files remain excluded.
