# Google Analytics PR #10 review adjustments

## Scope

Implemented the approved CR-001–CR-013 follow-up scope on
`feature/google-analytics-review-adjustments` from `master` `ccce578`:

- Consent callbacks are completed for queued, dropped, failed, and disabled
  outcomes without retaining callbacks in the consent queue.
- Queued events snapshot their merged context at enqueue time.
- Merged payloads and configured dimension defaults are validated against GA4
  parameter and value-length limits.
- Runtime configuration/context errors use the analytics error contract.
- Expired queue entries are observable through `onError`.
- Storybook consent state uses one stable client and correctly demonstrates
  unknown consent.
- Regression coverage now includes consent callbacks, context snapshots,
  merged limits, runtime errors, denied/disabled paths, and scroll milestones.
- Analytics size validation reports raw and gzip output and enforces an 8 KiB
  gzip budget; source maps are restored.
- Package-manager metadata and lockfile platform fields were reconciled.
- Reserved GA4 prefixes, ESM declaration specifier rewriting, changelog
  evidence, and catalog status text were corrected.

## Validation

- Focused Google Analytics suite: 22/22 passed.
- Full Vitest suite: 86/86 passed across 9 test files.
- Typecheck/package build: passed.
- Analytics gzip size gate: passed (5,462 bytes / 8,192-byte limit).
- Consumer fixtures: passed for all 6 fixtures.
- Storybook coverage and documentation check: passed.
- Targeted ESLint: passed.
- `git diff --check`: passed.

Storybook and Next production builds passed. Browser verification remains
pending. Existing shared catalog CSS already styles the GA preview and controls;
the status text correction completes CR-013. Existing Vite `use client`,
sourcemap, public-directory, and chunk-size warnings are informational.

## Review status

Argus re-review closed CR-001–CR-012 and found no required findings. CR-013 is
complete for the scoped catalog correction because the existing shared preview
and controls styles apply; its status text is now accurate. Browser verification
remains the final evidence gap. Commit, push, pull request, merge, release,
and deployment remain separately gated.
