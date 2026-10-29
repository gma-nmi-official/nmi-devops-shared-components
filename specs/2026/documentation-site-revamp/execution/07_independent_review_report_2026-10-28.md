# Independent review report: documentation site revamp

## Review context

- Reviewer: independent Argus sub-agent; read-only review.
- Repository / branch: `D:\gno-node-projects\gno-shared-components-v2`,
  `feature/documentation-site-revamp`.
- Recorded base: `54e9a06d9ee86874b5c4cf40f7e0d3ce1a67e6ed`.
- Candidate: base plus the complete intended dirty diff; pre-existing
  `.playwright-mcp/` excluded.
- Inputs: approved requirements/design through APR-004, owner acceptance
  APR-005, verification report, manual testing, actual diff, and passing checks.
- Scope: correctness, compatibility, regressions, accessibility/security, test
  adequacy, permissions/error paths, and coding format/readability.

## Decision

**BLOCKED pending required corrections.** Report 08 adjustment planning is
required. Reports 08–10 are not N/A. Review does not authorize implementation,
commit, push, or pull request actions.

## Required findings

### F-001 — Major: Ad Slot and Google Analytics examples are not valid minimal integrations

- Requirement: R-004; AC-005 and AC-006.
- Evidence: `app/catalog/component-guides.ts:138-157` imports
  `createGptAdProvider` without calling it, then renders with undeclared
  `provider` and `hasAdConsent`. Lines 194-205 pass an undeclared `gtag` binding
  and use browser globals without identifying the required client/runtime
  boundary. `app/catalog/[slug]/page.tsx:146-153` describes the snippets as the
  “smallest valid integration.”
- Impact: copied core examples contain unresolved identifiers and cannot compile
  or reach a first render.
- Required correction: replace both snippets with concise, complete examples
  aligned with consumer source of truth. Explicitly create or receive the GPT
  provider and consent value; explicitly source the gtag transport and show the
  client boundary where required.
- Validation: compile examples in a consumer fixture or equivalent snippet
  check; assert corrected content on both guide routes; rerun typecheck,
  consumer fixtures, relevant browser tests, and static build.

### F-002 — Minor: `/docs` and Storybook query-forwarding regression coverage is absent

- Requirement: R-005, R-011; AC-007 and AC-014.
- Evidence: `tests/e2e/showcase.spec.ts:46-83` navigates home, catalog, and the
  Portal Header guide only. Lines 121-144 cover metadata/branding but not
  `/docs`. No test opens a guide Storybook link or verifies that the iframe
  receives its `path` query. Verification currently claims browser evidence.
- Impact: guide-to-Storybook deep links and query forwarding can regress while
  their acceptance criterion remains marked PASS.
- Required correction: add a focused browser regression that opens a guide
  Storybook link and verifies `/docs` plus the expected query forwarded into the
  Storybook iframe. Retain base-path output inspection.
- Validation: run the focused test and complete Playwright suite.

### F-003 — Minor: approval and verification records contradict each other

- Requirement: GNO execution-record policy and review prerequisites.
- Evidence: `execution/06_verification_report_2026-10-28.md:23` says MT-004 is
  pending and line 44 marks R-001 BLOCKED while APR-005 and the later report
  text say it passed. `design.md:82-86,108-109` retains pending decisions/gates.
  `nonfunctional_requirements.md:5-12` retains pending approvals and omits
  R-013/AC-016 from traceability.
- Impact: current gate status is ambiguous and commit readiness cannot be
  established reliably from linked evidence.
- Required correction: align current verification, design, and NFR records with
  APR-003 through APR-005 while retaining genuinely historical statements.
- Validation: reread state, approvals, manual testing, design, NFR, and
  verification records and confirm no stale current-stage BLOCKED/pending claim.

## Coding-format pass

No required readability defect was found.

Optional suggestion: expand long one-line configuration objects in
`app/catalog/component-guides.ts:53-59,102-107,159-164,207-212` to make guide
content easier to review and maintain. This is not a required correction.

## Independently confirmed

- Logo and favicon sizes/hashes match recorded evidence.
- The SVG has no script, event handler, foreign object, or remote-reference
  pattern.
- Exported brand URLs honor the configured base path and do not reference
  `www.gmanmi.com` at runtime.
- Registry Storybook IDs exist.
- No package source, version, lockfile, changelog, or deployment workflow change
  is present.
- `git diff --check` reports no content error.

## Handoff

Atlas must obtain review-adjustment approval for the concrete plan in report 08.
Forge may apply only approved corrections; Vera then validates affected and
relevant regression behavior; Argus must independently confirm closure.
