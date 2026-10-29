# v1.1.0 second review-adjustment plan

## Objective

Resolve F-REL-111 and F-REL-112 without changing Portal Header source, public
API, package behavior, or the validated `1.1.0` version.

## Decision for F-REL-111

Unauthenticated external verification currently returns HTTP 404. The user
confirmed that the repository is intentionally private, so restore required
repository access and authenticated GitHub Release download guidance in active
consumer docs and both presentation formats.

Remove stale presentation text saying the wording decision is pending and use
“authenticated artifact download access” terminology.

## F-REL-112 correction

Replace the new zero-full-audit claims in `CHANGELOG.md`, `manual_testing.md`,
`state.md`, and report 21 with the reproducible result: zero shipped-runtime
findings and five high development-only findings in the existing A-006 ESLint
globbing chain. Preserve earlier dated audit evidence as history.

## Validation

1. Verify the selected repository/download contract externally.
2. Scan active guidance for contradictory private/public access claims and
   verify Markdown/HTML presentation parity.
3. Rerun both audits and scan current release evidence for contradictory audit
   claims.
4. Rerun `npm run check`, `npm run test:e2e`, `npm run pack:check`, four-way
   version alignment, and `git diff --check`.
5. Request another Argus closure review.

## Approval boundary

Implementation of these review corrections requires explicit user approval.
Commit, push, PR, merge, tag, GitHub Release publication, and deployment remain
separately gated.

## Closure status

A-028 approved the private-contract and audit-evidence corrections. Argus
validated the final candidate and returned PROCEED; see report 24. No Git action
is authorized by this closure.
