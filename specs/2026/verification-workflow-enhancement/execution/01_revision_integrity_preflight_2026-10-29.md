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
- `.agents/skills/implementation/SKILL.md`
- `.agents/skills/code-review/SKILL.md`
- `.codex/agents/atlas.toml`
- `.codex/agents/forge.toml`
- `.codex/agents/argus.toml`
- `.codex/workflows/lifecycle.md`
- `.github/agents/atlas.agent.md`
- `.github/agents/forge.agent.md`
- `.github/agents/argus.agent.md`
- `specs/templates/code_review_adjustment_reply.md`
- `CHANGELOG.md`
- `specs/2026/verification-workflow-enhancement/approvals.md`
- `specs/2026/portal-header/execution/15_cr002_review_adjustment_2026-10-29.md`

## Validation

- Tested revision: `7470f44` on `feature/verification-workflow-enhancement`,
  with the documented workflow/configuration changes present as an uncommitted
  working-tree diff.
- `npm test -- --run`: 86/86 passed.
- `npm run docs:check`: passed.
- Playwright browser verification: N/A because this workflow-only change has
  no browser behavior; no browser result is claimed for this revision.
- `git diff --check`: passed.
- Skill text and report references inspected for consistency.
- Standard PR review-reply fields and PR-numbered adjustment filename convention
  documented.

## Decision

Workflow enhancement implemented. This does not change runtime component
behavior; it improves evidence integrity for future verification and review.
