# Requirements approval package: Google Analytics

## Executive Summary

The caught-up `feature/google-analytics` branch contains a complete draft specification set and no analytics implementation. The 2026-10-26 review corrected stale repository facts, package identity, Next.js page-view duplication guidance, readiness/consent ambiguity, callback mapping, and video-reference claims. This package presents the remaining material decisions as concrete recommendations for the separate requirements gate.

## Workflow Context

- Stage: Inception / requirements closure.
- Primary role: Atlas coordinating Athena artifacts.
- Shared repository: `D:\gno-node-projects\gno-shared-components-v2`.
- Branch/HEAD: `feature/google-analytics` / `43dd02552014506b81600783cb0dcff3ab9d8791`.
- Base: `master` / `e8132b6f227a8453dc07abf0d06710b876770805`.
- Dirty scope: Google Analytics specification corrections and this approval package; unrelated `.playwright-mcp/` remains untouched.
- Endpoint of this package: requirements approval only. It does not authorize implementation, commit, push, PR, release, or deployment.

## Project Summary

Create a framework-neutral analytics service in `nmi-devops-shared-components` with one consumer-selected direct-gtag or GTM transport, immutable current context, explicit page views, generic/click/search/scroll/video helpers, consent/readiness gating, Storybook/catalog guidance, and package/Next.js/SSR/browser fixtures. The `news` repository remains read-only algorithm evidence.

## Previous Stage Summary

GA-A01 through GA-A07 approved specification direction. GA-A08 approved factual and contract corrections after branch catch-up. The corrected documents pass whitespace, stale-claim, Markdown-fence, and identifier-continuity checks. No source code exists for this component and no development approval has been granted.

## Current Stage Objective

Close the remaining schema, transport, reliability, compatibility, privacy, and public-API decisions so requirements GA-R01 through GA-R13 and acceptance criteria GA-AC01 through GA-AC26 can be approved as one coherent scope.

## Documents Referenced

- `specification.md`, `user_stories.md`, `requirements.md`, `acceptance_criteria.md`
- `design.md`, `nonfunctional_requirements.md`, `test_plan.md`, `wbs.md`
- `consumer_setup.md`, `reference_analysis.md`, `initial_setup.md`
- `state.md`, `approvals.md`
- `C:\laragon\www\news\res\js\custom_analytics.js` and inspected video call sites
- Repository `playwright.config.ts`, `package.json`, and `packages/ui/package.json`

## Execution Details

### Recommended decisions for requirements approval

| ID | Topic | Recommended requirement decision | Rationale / tradeoff |
| --- | --- | --- | --- |
| GA-D01 | Video value | `trackVideoLoaded` and `trackVideoPlayed` default `event_value` to numeric `0`; a consumer may configure a different per-instance default or pass a call-specific numeric override. Categories remain `Video Load` / `Video Play`; names remain exact. | Most inspected modern video/livestream paths use `0`; configurable override preserves the legacy `video_player.js` value `1` without forcing inconsistent helpers. |
| GA-D02 | GTM envelope | Approve `{ event: "gno_analytics_event", event_name, event_params, eventCallback?, eventTimeout? }`; the consumer-owned container maps it to its GA4 destination. | Separates the GTM trigger name from the GA4 event name and avoids embedded destination IDs. |
| GA-D03 | Callback API | Approve public `callback` and `callbackTimeoutMs`; direct mode maps to `event_callback` / `event_timeout`, GTM maps to `eventCallback` / `eventTimeout`; invoke at most once. | Gives both adapters one public contract while retaining transport-native completion behavior. |
| GA-D04 | Consent/readiness | Approve the `design.md` state table: only unknown consent queues; denied drops and clears; granted-plus-not-ready returns `failed/not_ready`; granted-plus-ready sends. | Avoids a second readiness queue and makes every transition observable and deterministic. |
| GA-D05 | Queue policy | In-memory FIFO, default capacity `100`, default lifetime `5 minutes`; reject newest on overflow as `dropped/queue_full`; drop expired as `dropped/queue_expired`; no automatic retry after a transport error. Allow explicit configuration within documented positive bounds. | Bounded memory and time, stable order, visible loss, and no accidental duplicate after ambiguous transport failure. |
| GA-D06 | Browser matrix | Required automation is the repository's configured Chromium desktop `1440×900` and Chromium mobile `375×812`, plus Next.js 16.4.2 SSR/package fixtures. Firefox/WebKit are N/A unless separately approved and installed. | Matches current Playwright configuration and available evidence; does not claim unsupported engines. |
| GA-D07 | Page-view ownership | The component owns initial and client-navigation page views. Consumers disable the tag default and Enhanced Measurement history-change page views. | Prevents automatic duplicates in Next.js navigation while retaining an explicit, testable owner. |
| GA-D08 | Event/schema validation | Allow built-in fields plus consumer-configured additional dimension/event keys. Require flat scalar string/number/boolean values (callback fields excepted), valid GA-style names, at most 25 outgoing parameters, and documented value-length limits. Reject dangerous prototype keys, reserved envelope/transport keys and prefixes, nested arbitrary objects, and non-finite numbers. | Preserves consumer extensibility while bounding GA rejection, prototype pollution, and accidental complex/PII-bearing payloads. Consumer/privacy owners remain responsible for approving the actual field allowlist and ensuring no PII. |
| GA-D09 | Public API names | Approve the proposed `createGoogleAnalytics` factory and methods in `design.md`, including context, event, consent, initialize, and flush methods. | Removes the final naming blocker and keeps the optimized non-legacy API already requested. |

### Traceability and validation expectations

- GA-D01 maps to GA-R03/GA-R06 and GA-AC07.
- GA-D02/GA-D03 map to GA-R02/GA-R05/GA-R08 and GA-AC11/GA-AC24/GA-AC25.
- GA-D04/GA-D05 map to GA-R08 and GA-AC09-GA-AC11/GA-AC26.
- GA-D06/GA-D07 map to GA-R12 and GA-AC04/GA-AC16-GA-AC18/GA-AC25.
- GA-D08 maps to GA-R02/GA-R05/GA-R07/GA-R08 and GA-AC05/GA-AC08/GA-AC11/GA-AC23-GA-AC24.
- GA-D09 maps to GA-R01/GA-R03 and GA-AC01-GA-AC08.

## Findings

- The reference supports the required page, click, search, and video algorithms but contains inconsistent video values and legacy side effects that the shared service intentionally excludes.
- The package and Next.js baselines are current in the corrected specs.
- The proposed decisions close all known technical contract gaps. Privacy approval remains ownership of the allowed production field set, not a claim that the package can determine whether arbitrary values contain PII.

## Risks

- Changing any decision above after implementation begins can invalidate types, tests, Storybook controls, consumer documentation, and verification evidence.
- GTM consumers must correctly configure variables, triggers, tag destinations, consent initialization, and Enhanced Measurement; package tests can validate the envelope but not a production container.
- The 25-parameter GA collection limit requires consumers to prioritize dimensions and event fields when registering extensions.

## Recommendation

Approve GA-D01 through GA-D09 as the requirements decisions for GA-R01 through GA-R13 and GA-AC01 through GA-AC26. After approval, Athena may finalize the implementation plan and present the separate development approval package. Do not begin implementation from requirements approval alone.

## Approval Status

Approved by GA-A10 on 2026-10-26 Asia/Shanghai. The user replied "Please continue" directly to the explicit question approving GA-D01-GA-D09 and GA-R01-GA-R13 / GA-AC01-GA-AC26. This approval authorizes implementation-plan preparation but not source implementation.

## Next Stage

Finalize the requirements/design artifacts with GA-A10, then present the full implementation and test plan for separate development approval.
