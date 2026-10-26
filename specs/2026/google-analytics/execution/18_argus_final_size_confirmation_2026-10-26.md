# Argus final confirmation: analytics source-size gate

## Scope and basis

- Review role: Argus, read-only independent confirmation after GA-SIZE02.
- Candidate: current dirty `feature/google-analytics` change set against the
  recorded `master` base.
- Approved criterion: 16 KiB uncompressed compiled analytics-module budget,
  excluding declarations, source maps, React, Next.js, and test/story code.

## Independent evidence

- `scripts/check-google-analytics-size.mjs:5` now counts every emitted `.js`
  file in the analytics output directory, including `types.js`.
- The package build sets `sourceMap: false`; declarations remain enabled, so
  declaration artifacts are not included by the `.js` filter.
- `npm run size:analytics` passed at `16,380` bytes across 7 JavaScript files
  against the `16,384` byte limit.
- The current emitted sizes are: `context.js` 980, `delivery-state.js` 1,855,
  `google-analytics.js` 5,667, `index.js` 146, `transports.js` 2,014,
  `types.js` 11, and `validation.js` 5,707 bytes; these sum to 16,380.
- The supplied regression evidence is passing: typecheck, lint, and 73 unit
  tests. The size correction does not alter the public runtime contract in the
  reviewed scope.

## Findings

No required behavior or coding-format findings remain for the size correction.
The approved uncompressed metric is now enforced without excluding emitted
JavaScript files. The lockfile's broad platform-metadata normalization remains
a scope/hygiene item to explain or minimize before commit, but it does not block
the size correction's behavior.

## Decision

**PROCEED for the size correction.** GA-SIZE02 is resolved. This is not commit
approval and does not clear the separate human manual-QA gate: GA-MT01–GA-MT10
remain unexecuted and overall release readiness remains blocked until QA
evidence is recorded.
