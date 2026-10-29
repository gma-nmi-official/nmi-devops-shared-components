# Independent Argus review

## Context

- Review mode: independent, read-only Argus review; no files were modified by
  the reviewer.
- Base: `e2ccde05efbe998b2a33d7eb97b28cccfec1eb83`.
- Inputs: RCF-R01–RCF-R05, RCF-A01, the full dirty candidate, verification
  report 01, manual-testing record, and the coding-format review skill.

## Required findings

### RCF-REV01 — Minor — catalog behavior neutrality

- Requirement: RCF-R04.
- Location: `app/catalog/page.tsx:13`, `:22`, and paired Portal Header entries
  near lines 315–330 in the reviewed candidate.
- Evidence: `CatalogParameter` wraps the complete `name` node in one `<code>`.
  The paired entries previously rendered two separate `<code>` elements with a
  plain-text `and`; the candidate renders the separator inside the code element.
- Impact: the separator receives code styling and the public semantic DOM changes
  despite the behavior-neutral requirement.
- Required correction: preserve two code elements with plain separator text,
  through a helper that supports multiple names or readable expanded JSX.
- Validation: focused DOM assertion for the paired rows, typecheck, lint, static
  build, and relevant catalog Playwright checks.

### RCF-REV02 — Minor — Google Analytics readability

- Requirement: RCF-R03.
- Locations: `packages/ui/src/analytics/google-analytics/validation.ts` around
  reviewed lines 58–59, 78, 90–93, and 122; `google-analytics.ts` around lines
  143–147.
- Evidence: behavior-bearing loops, assignments, ternaries, multi-condition
  validation, and state updates remain compressed into single lines.
- Impact: default/custom-dimension construction and validation/error paths remain
  materially difficult to review under the newly approved rule.
- Required correction: expand loop bodies and Boolean conditions and separate
  conditional state updates. Use a small named helper if needed to preserve the
  unchanged 16 KiB compiled-size gate.
- Validation: analytics tests, typecheck, lint, `size:analytics`, full check, and
  independent confirmation.

## Confirmed evidence

- RCF-R01 and RCF-R02 workflow guidance is present and role-consistent.
- CSS AST comparison found spacing-only selector/value changes with declarations
  and ordering preserved.
- Ad Slot size: 18,410 / 20,480 bytes.
- Google Analytics size: 16,380 / 16,384 bytes.
- Recorded 73 unit tests, six consumer fixtures, Storybook, Next.js/static export,
  and 32 Playwright cases are applicable evidence.
- `git diff --check` passes.
- `.playwright-mcp/` remains unrelated and untouched.

## Decision

**BLOCKED.** RCF-REV01 and RCF-REV02 require review-adjustment approval,
implementation, affected validation, and independent Argus confirmation before
commit readiness. No commit, push, PR, release, or deployment approval is
granted.
