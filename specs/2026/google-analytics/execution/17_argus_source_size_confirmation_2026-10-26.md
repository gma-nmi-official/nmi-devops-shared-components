# Argus confirmation: uncompressed analytics source-size correction

## Scope and basis

- Review role: Argus, read-only independent confirmation.
- Candidate: current dirty `feature/google-analytics` change set against the
  recorded `master` base.
- Reviewed correction: shorter validation diagnostics, `sourceMap: false` in
  `packages/ui/tsconfig.build.json`, and exclusion of `types.js` from the size
  script.
- Approved criterion: 16 KiB uncompressed compiled analytics-module budget,
  excluding declarations, source maps, React, Next.js, and test/story code.

## Independent validation

- `npm run size:analytics`: PASS at `16,382` bytes against `16,384`, across six
  counted JavaScript files.
- `npm run typecheck`: PASS.
- `npm run lint`: PASS.
- `npm test -- --run`: PASS, 9 files and 73 tests.
- The emitted `types.js` is `11` bytes and contains only `export {};`.
- The six counted emitted files are `context.js`, `delivery-state.js`,
  `google-analytics.js`, `index.js`, `transports.js`, and `validation.js`.

## Finding

### Required correction

**Major — GA-SIZE02: the size script excludes an emitted JavaScript file that
the approved criterion does not expressly exclude.**

- Evidence: `scripts/check-google-analytics-size.mjs:5` filters out `types.js`.
  The emitted file is JavaScript, not a declaration or source map, and is part
  of the package's compiled analytics directory. Including its 11 bytes makes
  the measured total `16,393` bytes, which exceeds the `16,384` limit.
- Impact: the command passes only because a generated `.js` file is omitted;
  this is not unambiguously compliant with the approved “compiled
  analytics-module” metric, even though the file has no runtime statements.
- Correction: either count all emitted `.js` files and reduce the runtime
  output below the limit, or obtain explicit requirements approval defining
  type-only empty JavaScript modules as excluded runtime output and update the
  plan/acceptance wording accordingly.
- Validation: rerun `npm run size:analytics` with the approved interpretation,
  then refresh size, state, verification, and release-readiness evidence.

## Focused coding-format pass

The size script is concise and readable for its existing repository convention;
the source-map and diagnostic reductions are localized. No separate format
finding is required. The blocking issue is metric scope, not code readability.

## Decision

**BLOCKED pending resolution of GA-SIZE02.** The reported six-file total passes,
and all supplied automated checks pass, but the approved uncompressed budget is
not conclusively enforced while an emitted JavaScript file is excluded. Human
manual QA GA-MT01–GA-MT10 also remains unexecuted.
