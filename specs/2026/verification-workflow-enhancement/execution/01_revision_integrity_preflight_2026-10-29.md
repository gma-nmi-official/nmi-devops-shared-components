# Verification workflow enhancement

## Context

Portal Header review follow-up exposed stale `.next` output and browser
evidence carried from a different branch revision. The code correction was
valid, but the verification record initially overstated typecheck and E2E
results.

## Approved change

The verification skill now requires a revision-integrity preflight before
framework typecheck, build, or browser checks. Generated output must be
identified and regenerated when it references another revision, and PASS
evidence is explicitly scoped to the tested commit, branch, and output state.

## Files

- `.agents/skills/verification/SKILL.md`
- `CHANGELOG.md`
- `specs/2026/portal-header/execution/15_cr002_review_adjustment_2026-10-29.md`

## Validation

- `npm test -- --run`: 76/76 passed after synchronizing with `master`.
- `npm run docs:check`: passed.
- Full Playwright suite: 48/48 passed.
- `git diff --check`: passed.
- Skill text and report references inspected for consistency.

## Decision

Workflow enhancement implemented. This does not change runtime component
behavior; it improves evidence integrity for future verification and review.
