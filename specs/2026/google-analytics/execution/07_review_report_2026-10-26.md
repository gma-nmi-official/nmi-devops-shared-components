# Independent review report: Google Analytics

## Review context

- Repository: `D:\gno-node-projects\gno-shared-components-v2`
- Branch/base: `feature/google-analytics` / recorded base `master` (`e8132b6f227a8453dc07abf0d06710b876d805`)
- Reviewed revision: HEAD `43dd02552014506b81600783cb0dcff3ab9d8791` plus the current dirty Google Analytics diff
- Inputs: approved GA-A10/GA-A11 requirements and implementation plan, verification report 06, local source/tests/docs
- Review mode: read-only Argus review; no source or test changes made

## Required findings

### GA-REV01 — Major: configured per-instance video value is not implemented

- Requirement: GA-R06 / GA-AC07; approved design video policy.
- Location: `packages/ui/src/analytics/google-analytics/types.ts:24-29,31-43`; `google-analytics.ts:52-53`.
- Evidence: `AnalyticsConfig` has no video configuration, and both helpers hard-code `event_value: 0` before applying only call parameters.
- Impact: Consumers cannot configure the approved per-instance default (including the legacy numeric `1` path); the public contract is incomplete.
- Required correction: Add the approved video value configuration and merge it before call-specific numeric overrides. Validate that video `event_value` overrides are numeric and finite.
- Validation: Add unit tests for configured default, call override, default `0`, and invalid string/non-finite values; rerun focused and regression suites.

### GA-REV02 — Major: transport failures still return `sent`

- Requirement: GA-R08 / GA-AC11; transport failure result/error contract.
- Location: `packages/ui/src/analytics/google-analytics/google-analytics.ts:23-27`; `transports.ts:5-29`.
- Evidence: `sendTransport` catches direct/GTM throws and calls `onError`, but returns `void`; `emit` unconditionally returns `{ status: "sent" }` after the call.
- Impact: Consumers cannot distinguish an actually delivered event from a synchronous transport failure; result status violates the approved failure behavior.
- Required correction: Return a transport outcome or throw an internal sentinel so synchronous adapter failures produce `{ status: "failed" }` while still invoking `onError` once. Preserve callback ambiguity/no automatic retry.
- Validation: Add direct and GTM throwing-adapter tests asserting failed result, one error-hook call, and no retry.

### GA-REV03 — Major: GTM callbacks are not bounded or at-most-once

- Requirement: GA-R08 / GA-AC11; approved adapter-neutral callback/timeout mapping.
- Location: `packages/ui/src/analytics/google-analytics/transports.ts:24-28`.
- Evidence: GTM receives the raw callback and timeout fields. Unlike direct mode, no completion guard or timeout wrapper is created, so a callback can fire repeatedly or never fire.
- Impact: GTM consumers do not receive the promised callback semantics and can leak callback state indefinitely.
- Required correction: Wrap GTM callbacks with the same at-most-once completion/timeout logic as direct mode, mapping the wrapped callback to `eventCallback` and timeout to `eventTimeout`.
- Validation: Add GTM callback, duplicate callback, timeout, and callback-throw tests.

### GA-REV04 — Major: catalog analytics preview is never initialized

- Requirement: GA-R12/GA-R13 and browser acceptance coverage.
- Location: `app/catalog/google-analytics-preview.tsx:8-19`.
- Evidence: The preview constructs an instance but never calls `analytics.initialize()`. `ready()` therefore remains false; grant/track actions return `failed/not_ready` instead of flushing or sending.
- Impact: The catalog preview and its added Playwright expectation for `GTM queued page_view` cannot demonstrate the approved behavior.
- Required correction: Initialize the instance once and keep the instance stable across consent changes (for example, use a ref/memoized instance independent of consent state).
- Validation: Run the catalog browser test at desktop and mobile sizes; assert queued, grant-flush, and no-network behavior.

### GA-REV05 — Major: Storybook analytics stories have no component/render binding

- Requirement: GA-R13 / GA-AC19 and implementation-plan DU-4.
- Location: `packages/ui/src/analytics/google-analytics/google-analytics.stories.tsx:41-52`.
- Evidence: `meta` omits `component: AnalyticsHarness`; the first two stories contain only empty story objects and only `UnknownConsent` supplies a render function.
- Impact: DirectGtag and GoogleTagManager stories may render blank or lack controls; the required transport/readiness/payload/failure harness is not actually exposed.
- Required correction: Bind `component: AnalyticsHarness` or provide explicit render functions, and expose the approved transport, readiness, payload log, and failure controls.
- Validation: Build/open Storybook and exercise each story/control with no console errors.

### GA-REV06 — Major: required pre-review checks remain blocked

- Requirement: AGENTS core rule 6 and release exit criteria.
- Evidence: Verification report 06 records `npm run test:consumers` and `npm run pack:check` as BLOCKED by Windows EPERM/cache permissions; manual QA GA-MT01–GA-MT10 is unexecuted.
- Impact: The candidate cannot be recommended ready for commit or release review, regardless of passing unit checks.
- Required correction: Rerun the blocked checks in a permitted environment and execute required manual QA; preserve exact revision evidence.
- Validation: Update report 06/manual testing with actual results and rerun affected regressions.

## Optional suggestions

- `specs/2026/google-analytics/consumer_setup.md:20` still says the export “is not implemented or released yet”; update this prospective wording before release documentation review.
- `DeliveryState.takeReady()` silently removes expired entries without an observable expired result; consider reporting expiry counts if the approved consumer contract requires per-entry observability.

## Decision

**BLOCKED — required corrections and verification remain outstanding.** Reports 08/adjustment approval and Forge implementation are required before a confirming Argus review. Commit, push, PR, and release gates remain unapproved.
