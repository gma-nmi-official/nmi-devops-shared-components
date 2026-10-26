# Review adjustment plan: Google Analytics

## Context

- Review: `execution/07_review_report_2026-10-26.md`
- Reviewed candidate: branch `feature/google-analytics`, HEAD `43dd02552014506b81600783cb0dcff3ab9d8791` plus current dirty diff
- Review decision: BLOCKED by six Major findings; no source changes authorized by the review itself

## Proposed corrections

| Finding | Files / change | Validation |
| --- | --- | --- |
| GA-REV01 | Add per-instance video default configuration; merge it before call-specific `event_value`; reject non-finite/non-numeric overrides. | Unit tests for configured default, explicit override, default zero, invalid values; full unit/type checks. |
| GA-REV02 | Make transport adapters return success/failure outcome; return `failed` from `emit` on synchronous direct/GTM throw while invoking `onError` once and never retrying. | Direct and GTM throw tests with result/error/send-count assertions. |
| GA-REV03 | Wrap GTM callbacks with shared at-most-once completion and timeout behavior, mapping to `eventCallback`/`eventTimeout`. | GTM callback, duplicate callback, timeout, and callback-throw tests. |
| GA-REV04 | Initialize the catalog preview exactly once and keep the analytics instance stable across consent state changes. | Catalog browser test at desktop/mobile; queued-to-granted flush and no-network assertions. |
| GA-REV05 | Bind the Storybook harness through `component` or explicit render functions and expose transport/readiness/payload/failure controls required by DU-4. | Storybook build and interactive story/control smoke test. |
| GA-REV06 | Rerun consumer fixtures and package dry-run in a permitted environment; execute GA-MT01–GA-MT10 and update verification/manual records. | Exact command output and QA evidence at the corrected revision. |

Optional documentation correction: remove the stale “not implemented or released” wording in `specs/2026/google-analytics/consumer_setup.md` before release review.

## Scope and risk

Corrections remain within approved GA-A11 DU-1–DU-5 scope. They alter no
requirements, transport choice, package identity, version target, or external
system. The affected behavior is analytics delivery status, callback semantics,
catalog/story harness behavior, and verification evidence.

## Approval status

Pending explicit review-adjustment approval. Forge must not implement these
corrections until the user approves this plan. After implementation, Vera must
rerun affected regressions and Argus must confirm the findings are resolved.
