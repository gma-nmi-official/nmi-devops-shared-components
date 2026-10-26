# Argus confirming review: Google Analytics

## Review context

- Repository: `D:\gno-node-projects\gno-shared-components-v2`
- Branch/base: `feature/google-analytics` / recorded `master` base
- Reviewed candidate: current dirty Google Analytics diff after GA-A12 corrections and GA-A14 coding-format skill update
- Inputs: approved requirements, reports 06, 07, 08, 10, 11, and 12; current source/tests/docs
- Review mode: read-only independent Argus review; no source or test changes made

## Behavior findings

| Finding | Status | Evidence |
| --- | --- | --- |
| GA-REV01 video default | RESOLVED | `VideoConfiguration.eventValue`, finite validation, merge precedence, and focused test are present. |
| GA-REV02 transport result | RESOLVED | `sendTransport` reports synchronous adapter failure and factory returns `failed/transport_error`. |
| GA-REV03 GTM callback | RESOLVED | Shared completion wrapper provides timeout and at-most-once callback behavior for GTM. |
| GA-REV04 catalog preview | RESOLVED | Preview memoizes and initializes its analytics instance before interaction. |
| GA-REV05 Storybook harness | RESOLVED | Component binding plus transport, readiness, payload-count, consent, and failure controls are present. |

## Coding-format review

**Minor required finding: GA-FMT01**

- Requirement: GA-A14 / `coding-format-review` guidance; readability acceptance for Forge output.
- Location: `packages/ui/src/analytics/google-analytics/google-analytics.stories.tsx:6,10,16-24,29-30,43-45`.
- Evidence: The Storybook harness still compresses its prop type, data-layer callback, config object, effect, label/select, button handler, and metadata into dense one-line expressions.
- Impact: The harness is the primary consumer-facing example for transport/readiness/failure behavior and is materially harder to review than the newly formatted factory and catalog preview.
- Required correction: Expand the harness props type, callbacks, config construction, effect, controls, and metadata into multiline named handlers/objects while preserving behavior.
- Validation: `npm run typecheck`, `npm run lint`, `npm test -- --run`, and Storybook build; confirm no behavior changes.

No additional behavior or compatibility findings were identified in the reviewed
scope.

## Verification status

- Typecheck, lint, 73 unit tests, consumer fixtures, package dry-run, production build, and 32/32 Playwright desktop/mobile tests have passing evidence.
- GA-MT01–GA-MT10 remain unexecuted human manual-QA cases and must not be marked PASS from automated evidence.

## Decision

**BLOCKED.** Behavior corrections are resolved. GA-FMT01 requires the focused
Storybook readability correction, and the required human manual-QA cases remain
pending. After Forge applies the approved format correction, Vera must rerun the
affected checks and Argus must confirm this finding.
