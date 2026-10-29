# Google Analytics PR #10 review-adjustment plan

## Baseline

- Repository: `D:\gno-node-projects\gno-shared-components-v2`
- Base: `master` at `ccce578` (PR #15 merged)
- Follow-up branch: `feature/google-analytics-review-adjustments`
- Source review: PR #10 comment `6485110160`, reviewed revision `c7bfab1`
- PR #10 is already merged; this plan targets a follow-up PR only.

## Required correction scope

- **CR-001:** resolve callbacks for queued, denied, disabled, expired, and
  failed outcomes without retaining callbacks in the consent queue.
- **CR-002:** snapshot the current analytics context when an event is queued.
- **CR-003:** validate merged context plus event parameters against the total
  parameter count and value-length limits.
- **CR-004:** convert malformed runtime configuration/context input into the
  documented analytics error contract rather than raw `TypeError` exceptions.
- **CR-005:** report expired queue entries as observable `queue_expired`
  outcomes.
- **CR-007:** keep the Storybook client instance stable across consent changes
  and make the unknown-consent story actually start unknown.
- **CR-008:** add regression coverage for queue callbacks, context snapshots,
  denied/disabled paths, scroll milestones, and the consent state table.

## Deferred or separately approved scope

- CR-006 size/source-map policy, CR-009 lockfile regeneration, CR-010 changelog
  evidence, CR-011 reserved prefixes, CR-012 ESM type-resolution strategy,
  and CR-013 catalog styling remain review recommendations. They require a
  separate scope decision unless explicitly included in the adjustment
  approval.

## Validation plan

- Focused Google Analytics unit/accessibility tests and new regression cases.
- Full Vitest suite, typecheck, lint, consumer fixtures, size gate, Storybook,
  Next build, and relevant Playwright coverage.
- Manual QA record linked from the verification report.
- Independent Argus review after implementation; no commit or Git delivery
  action is authorized by this plan.

## Approval status

User approval on 2026-10-29 authorizes implementation of the complete
CR-001–CR-013 scope, including the size/source-map policy, lockfile and
changelog corrections, ESM type-resolution follow-up, and catalog styling.
Commit, push, PR, merge, release, and deployment remain separately gated.
