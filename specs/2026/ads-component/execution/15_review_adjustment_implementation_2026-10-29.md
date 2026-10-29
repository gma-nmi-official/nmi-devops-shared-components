# AdSlot PR #9 review adjustments

## Scope

Implemented the approved follow-up corrections for the merged AdSlot PR #9
on `feature/ads-review-adjustments`:

- CR-001: GPT command queues now reject after a configurable readiness timeout,
  and disable/unmount cancellation bypasses a stalled create operation so
  lifecycle cleanup is not serialized behind an unavailable GPT queue.
- CR-002: disabled responsive rules render no reserved advertisement box and
  remain provider-free.
- CR-003: AdSlot transitions are disabled when `prefers-reduced-motion: reduce`
  is active.

## Validation

- AdSlot focused Vitest suite: 23/23 passed.
- Full Vitest suite: 81/81 passed across 9 test files.
- Typecheck and package build: passed.
- Consumer fixtures: passed for all 6 fixtures, including AdSlot.
- Storybook coverage check: passed.
- Targeted ESLint: passed.
- `git diff --check`: passed.
- Playwright browser validation was started, but the repository's existing
  local server occupied port 3100 before the targeted rerun could begin; no
  Playwright result is claimed for this revision.

The package and consumer builds emit the repository's existing `"use client"`
and sourcemap warnings; commands completed successfully.

## Review status

Argus independently re-reviewed the correction and closed CR-001, CR-002, and
CR-003. Review decision: **PROCEED**, with the documented Playwright limitation.
An unmount-while-create-pending regression is an optional follow-up; the same
cancellation path is covered by the disable regression and no required defect
remains.

Commit, push, pull request, merge, release, and deployment remain separately
gated.

## Delivery

The Storybook states and regression coverage were updated with the component
changes. The untracked `.playwright-mcp/` and existing release-batch records
remain user-owned and were not modified.
