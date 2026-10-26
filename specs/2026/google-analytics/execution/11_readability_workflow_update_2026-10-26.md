# Readability and Forge guidance update

## Context and approval

- Scope: Google Analytics source readability plus Forge implementation guidance
- Approval: GA-A13, user request on 2026-10-26 Asia/Shanghai
- Constraint: behavior-neutral formatting only; no requirement or lifecycle-gate changes

## Changes

- Expanded compressed control flow and behavior-bearing calls in the analytics
  factory, context, delivery state, transports, package exports, and catalog
  preview.
- Added the same readable-formatting convention to the implementation skill and
  Forge agent instructions: one operation/decision per line, multiline calls and
  objects, named helpers for non-trivial branches, and no dense one-line flow.

## Validation

- `npm run typecheck` — PASS
- `npm run lint` — PASS after removing generated Playwright reports
- `npm test -- --run` — PASS, 73 tests
- `git diff --check` — PASS

## Review status and next action

The change is behavior-neutral and remains subject to the existing independent
review and manual-QA gates. No commit, push, PR, merge, or release action is
authorized by this update.
