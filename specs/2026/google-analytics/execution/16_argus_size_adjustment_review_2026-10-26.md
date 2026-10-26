# Argus review: analytics size-check adjustment

## Scope and basis

- Review role: Argus, read-only independent review.
- Candidate: `feature/google-analytics`, current dirty diff against the recorded
  `master` base; no source or test files were changed during this review.
- Scoped files: `scripts/check-google-analytics-size.mjs`, `package.json`, and
  `package-lock.json`.
- Approved requirement: the implementation plan records a 16 KiB **uncompressed
  compiled analytics-module** budget, excluding declarations, maps, React,
  Next.js, and test/story code (`execution/02_implementation_plan_2026-10-26.md`,
  lines 153-155).

## Independent evidence

- `npm run size:analytics` completed successfully under Node `v22.23.4`.
- The command rebuilt the package and measured 7 emitted JavaScript files.
- It reported `9,183` minified bytes and `17,189` raw bytes against a `16,384`
  byte limit.
- `esbuild@0.28.2` is declared as a root development dependency and is present
  in the lockfile. The script uses its direct `transform` API with ESM output
  and minification enabled.

## Findings

### Required correction

**Major — GA-SIZE01: the gate no longer enforces the approved budget metric.**

- Requirement: the approved plan requires an uncompressed compiled analytics
  module budget of 16 KiB.
- Evidence: `scripts/check-google-analytics-size.mjs:9-14` transforms each
  emitted module with `minify: true` and sums the minified output; the same run
  reports raw output of `17,189` bytes, which exceeds the `16,384` byte limit.
- Impact: the check passes a candidate that fails the approved size acceptance
  criterion. The adjustment changes the acceptance metric rather than merely
  making the existing check reproducible, and no approval record authorizes
  replacing uncompressed measurement with minified measurement.
- Correction: either restore enforcement of the approved uncompressed metric,
  or obtain and record a requirements approval that explicitly changes the
  budget to minified output and updates the linked plan/acceptance documents.
- Validation: rerun `npm run size:analytics`, confirm the reported metric matches
  the approved requirement, and refresh the verification, state, and release
  readiness records. If the uncompressed metric remains authoritative, the
  current candidate must fail until the emitted analytics output is reduced.

## Focused coding-format pass

The direct esbuild dependency and import are clear. The script remains compact
and uses the repository's existing script conventions; no separate readability
finding is required for this adjustment. The minification behavior is a
requirement/contract issue, not a format issue.

## Scope note

The lockfile also removes many platform `libc` metadata fields while adding the
root `esbuild` entry. This appears to be npm-version normalization rather than
functional behavior. It should be minimized or explained before commit, but it
is not the blocking finding above.

## Decision

**BLOCKED for this adjustment.** The command is operational and the dependency
is correctly wired, but the current check does not enforce the approved size
requirement. Overall release readiness also remains blocked by the unexecuted
manual QA cases GA-MT01–GA-MT10.
