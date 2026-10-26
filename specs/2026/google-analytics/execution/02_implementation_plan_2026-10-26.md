# Implementation plan: Google Analytics

## Executive Summary

Requirements GA-R01-GA-R13, acceptance targets GA-AC01-GA-AC26, and decisions GA-D01-GA-D09 are approved by GA-A10. This plan proposes one release-complete feature delivery for an SSR-safe, framework-neutral Google Analytics service with direct-gtag and GTM adapters, immutable context, explicit page views, named-event helpers, bounded consent gating, Storybook/catalog guidance, consumer fixtures, and release evidence. Implementation is approved by GA-A11; commit, push, PR, merge, tag, release, and deployment remain separately gated.

## Workflow Context

- Project: Google Analytics.
- Stage: Development planning.
- Primary role: Athena; Atlas coordinates the development-approval gate.
- Approved requirements: GA-A10, GA-D01-GA-D09, GA-R01-GA-R13, GA-AC01-GA-AC26, and GA-NFR01-GA-NFR09 as validation targets.
- Intended endpoint: validated and independently reviewed release-complete change set ready for separately approved commit/push/PR handoff. Merge, tag, release, and deployment are not included.
- Planning depth: full feature path because this adds a public package API, privacy-sensitive analytics transport behavior, browser/SSR integration, Storybook/catalog documentation, and a minor package release.

## Previous Stage Summary

The branch was caught up with `master`; the legacy `news` implementation and video call sites were refreshed as read-only evidence. The specification review corrected stale package/framework facts, package identity, page-view duplication guidance, readiness/consent behavior, callback mapping, and inconsistent video-value claims. GA-A10 approved the concrete requirements package.

## Current Stage Objective

Define exact delivery units, files, API behavior, tests, manual QA, release impact, sequencing, owners, risks, and exit evidence for development approval.

## Planning Discussion and Initial Readiness

| Item | Evidence / decision | Status |
| --- | --- | --- |
| Working repository | `D:\gno-node-projects\gno-shared-components-v2`, `feature/google-analytics`, HEAD `43dd02552014506b81600783cb0dcff3ab9d8791` plus the recorded Google Analytics specification diff | Ready for approval |
| Target/base | `master` / merge base `e8132b6f227a8453dc07abf0d06710b876770805`; branch HEAD matches `origin/feature/google-analytics` and is `0` behind / `2` ahead of `origin/master` | Ready |
| Existing unrelated worktree | Untracked `.playwright-mcp/` | Preserve and exclude |
| Runtime/tooling | Node 26.10.0, npm 11.19.1, TypeScript 5, React 19.2.8, Next.js 16.4.2, Vitest 4.1.12, Storybook 10.6.3, Playwright 1.63.0 | Ready |
| Browser matrix | Configured Chromium desktop `1440×900` and mobile `375×812`; Firefox/WebKit N/A under GA-D06 | Approved |
| Language/framework guidance | Repository JavaScript-framework skill. Before app/Next.js edits, Forge reads installed `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`, `03-api-reference/01-directives/use-client.md`, and the App Router Playwright/Vitest guides | Selected |
| Package architecture | ESM package, root named exports, TypeScript `ES2022` build, no analytics/runtime dependency selected | Ready |
| New dependencies | None planned | Ready |
| Database/backend/API migration | N/A: injected browser transports and in-memory state only | N/A with reason |
| Release impact | Backward-compatible new public capability; approved minor release candidate `1.4.0` | Approved GA-A11 |

## Approved Implementation Contract

### Public configuration and API

- Export `createGoogleAnalytics` and public configuration, context, event, transport, consent, result, and error types from `packages/ui/src/analytics/google-analytics/` and the package root.
- Implement approved methods: `initialize`, `setCurrentParams`, `getCurrentParams`, `updateCurrentParams`, `clearCurrentParams`, `trackPageView`, `trackEvent`, `trackClick`, `trackSearch`, `trackScroll`, `trackVideoLoaded`, `trackVideoPlayed`, `setConsent`, and `flush`.
- Select exactly one discriminated transport: direct `{ type: "gtag", gtag }` with runtime `measurementId`, or GTM `{ type: "gtm", dataLayer }` with consumer-owned destination configuration.
- Keep the core framework-neutral and free of React, Next.js, DOM, storage, cookies, loaders, production identifiers, and consumer globals.

### Context, payload, and validation

- Built-in dimensions are `content_type`, `author`, `subsection`, `audience_interest`, `source`, `publish_date`, `keywords`, `content_id`, `section`, `show_name`, and `portal_section`; missing values remain `""` in outgoing payloads.
- Merge order is package defaults, registered dimension defaults, current instance context, then call-specific fields.
- Set/get/update operations clone and validate; callers cannot mutate stored context or emitted payloads.
- Permit built-ins plus consumer-configured additional dimension/event keys. Enforce flat string/number/boolean values, finite numbers, GA-compatible names/value limits, and at most 25 outgoing parameters.
- Reject `__proto__`, `prototype`, `constructor`, reserved GA prefixes, and approved envelope/transport keys. Callback functions are accepted only through `callback`.

### Delivery and transport behavior

- Only unknown consent queues in an in-memory FIFO. Defaults are capacity 100 and lifetime five minutes; configuration accepts documented positive bounds.
- Disabled drops; denied drops and clears; granted plus not-ready returns `failed/not_ready`; granted plus ready sends. Overflow rejects newest, expiry drops, and ambiguous transport failures are not automatically retried.
- Direct mode emits the normalized event through injected `gtag`, targets the configured measurement ID, and maps callback/timeout to `event_callback` / `event_timeout`.
- GTM pushes `{ event: "gno_analytics_event", event_name, event_params, eventCallback?, eventTimeout? }` to the injected data layer.
- Each callback fires at most once at its adapter completion/timeout point and does not claim confirmed GA receipt.
- Page views are explicit. Consumer docs require disabling both tag-default and Enhanced Measurement history-change page views.
- Video helpers use exact names, categories `Video Load` / `Video Play`, and numeric default value `0`, with configured or call-specific numeric override.

## Delivery Units and Affected Files

All units form one feature delivery and are not independently release-ready.

### DU-1 — Public types, schema validation, and immutable context

Requirements: GA-R01, GA-R02, GA-R04, GA-R05, GA-R07, GA-R09-GA-R11.

Files:

- new `packages/ui/src/analytics/google-analytics/types.ts`
- new `packages/ui/src/analytics/google-analytics/validation.ts`
- new `packages/ui/src/analytics/google-analytics/context.ts`
- new matching `*.test.ts` unit files
- modify `vitest.config.ts` to discover both `*.test.ts` and `*.test.tsx`

Work:

- define readonly public contracts and discriminated direct/GTM configuration;
- validate measurement/destination rules, dimension registration, queue bounds, scroll configuration, event names, scalar values, length/count limits, dangerous/reserved keys, and normalizers;
- implement clone-safe defaults, set/get/update/clear, pure normalization, merge precedence, and immutable payload construction;
- cover boundary, invalid, prototype-pollution, empty-string, registered-extension, cloning, and mutation-negative cases.

Exit: pure TypeScript tests pass without browser globals and invalid configuration cannot reach a transport.

### DU-2 — Consent/readiness state machine and transport adapters

Requirements: GA-R02, GA-R05, GA-R08, GA-R09, GA-R11.

Files:

- new `packages/ui/src/analytics/google-analytics/delivery-state.ts`
- new `packages/ui/src/analytics/google-analytics/transports.ts`
- new matching `*.test.ts` unit files

Work:

- implement approved sent/queued/dropped/failed results, FIFO capacity/lifetime, expiry, reject-newest overflow, clear-on-denial, grant/readiness flush, and no automatic transport retry;
- implement direct-gtag and GTM mapping with one transport per instance and no loader/global access;
- implement adapter-neutral callbacks/timeouts with at-most-once guards and transport error reporting;
- use fake timers and spies for every state-table row, order, expiry, overflow, callback/timeout, throw/reject, and multi-instance isolation case.

Exit: deterministic state/adapter tests prove no unauthorized send, dual-send, retry duplicate, or instance leakage.

### DU-3 — Analytics factory and event helpers

Requirements: GA-R01, GA-R03-GA-R08.

Files:

- new `packages/ui/src/analytics/google-analytics/google-analytics.ts`
- new `packages/ui/src/analytics/google-analytics/index.ts`
- new `packages/ui/src/analytics/google-analytics/google-analytics.test.ts`
- modify `packages/ui/src/index.ts`

Work:

- compose validation, context, state, and transport modules in `createGoogleAnalytics`;
- implement page, generic, click, search, scroll, video-loaded, and video-played paths over one normalized event pipeline;
- implement initialization, ready/consent changes, manual flush, configured scroll milestones/deduplication, current-context updates, explicit page-view behavior, and observable debug/error hooks;
- test exact event names/payloads/send counts, call-specific precedence, empty dimensions, scroll repeat rules, video override, duplicate prevention, SSR-safe import, and two-instance isolation.

Exit: the public factory/types build from the package root and focused contract tests cover GA-AC03-GA-AC11 and GA-AC22-GA-AC26.

### DU-4 — Storybook, catalog, consumer, SSR, browser, and size integration

Requirements: GA-R12, GA-R13 and GA-NFR02-GA-NFR08.

Files:

- new `packages/ui/src/analytics/google-analytics/google-analytics.stories.tsx`
- modify `scripts/check-storybook-coverage.mjs` to enforce stories for public analytics exports
- new `app/catalog/google-analytics-preview.tsx`
- modify `app/catalog/page.tsx`
- new `tests/consumers/google-analytics-javascript/main.js`
- new `tests/consumers/google-analytics-typescript/main.ts`
- modify `scripts/check-consumer-fixtures.mjs` for JS/TS plus Node/SSR-safe import coverage
- modify `tests/e2e/showcase.spec.ts`
- new `scripts/check-google-analytics-size.mjs`
- modify root `package.json` to add `size:analytics` and include it in `check`

Work:

- add a fake-only Storybook harness for transport selection, context, consent/readiness, queue/flush, page/click/search/scroll/video/generic controls, payload logs, and failure simulation;
- add catalog setup/ownership/schema guidance and a client preview with spy transports only;
- add JavaScript/TypeScript import/build fixtures and Node/SSR import execution with no browser globals;
- add Chromium desktop/mobile assertions for each helper, navigation page views, queue transitions, callbacks, duplicates, console errors, and zero Google Analytics/GTM production requests;
- record and enforce a proposed 16 KiB uncompressed compiled analytics-module budget, excluding declarations, source maps, React, Next.js, and test/story code.

Exit: docs coverage, consumer/SSR fixtures, browser coverage, and the approved development-plan size budget pass without production network traffic.

### DU-5 — Release-complete documentation and `1.4.0` candidate

Requirements: GA-R10-GA-R13 and repository release policy.

Files:

- modify `packages/ui/README.md`
- modify `docs/consumer-setup.md`
- modify root `README.md`, `app/page.tsx`, and `packages/ui/src/docs/releases.stories.tsx` only where current package/component/release guidance requires it
- modify `CHANGELOG.md`
- modify root `package.json`, `packages/ui/package.json`, and `package-lock.json` to proposed version `1.4.0`
- finalize `specs/2026/google-analytics/consumer_setup.md`, state, and execution evidence
- create `specs/2026/google-analytics/manual_testing.md` during verification

Work:

- document direct/GTM setup, page-view ownership, consent boundary, event schemas, callbacks, SSR, errors, limits, privacy ownership, rollout, rollback, and legacy mapping;
- record minor SemVer impact and no migration requirement for existing consumers; analytics adoption is opt-in;
- align root/package/lockfile versions and changelog before final verification and independent review;
- populate repeatable manual QA cases without claiming execution.

Exit: one release-complete `1.4.0` candidate contains source, tests, story, catalog, fixtures, consumer docs, migration/adoption notes, versions, lockfile, changelog, and QA reference before Vera/Argus.

## Manual QA Plan

Destination: `specs/2026/google-analytics/manual_testing.md` using the repository template. Recipient: repository owner plus analytics/privacy QA; named individual pending assignment. Handoff remains **Prepared**, not Sent or Executed, until authorized and actually performed.

Required cases:

1. Package and Next.js SSR import with no browser globals or event send.
2. Direct-gtag setup sends one initial and one client-navigation page view with no automatic duplicate.
3. GTM setup pushes the exact approved envelope and no direct `gtag` call.
4. Unknown consent queues; grant/readiness flushes valid entries once in FIFO order.
5. Denial, expiry, overflow, disabled, and not-ready cases return exact outcomes and send nothing unauthorized.
6. Set/get/update/clear preserve clones, empty-string dimensions, and registered extensions.
7. Click, search, scroll, video-loaded, video-played, and generic events send exact names/fields once.
8. Callback/timeout and injected transport failures remain isolated and invoke callbacks/error hooks at most once.
9. Two instances with different destinations, contexts, consent, and transports do not leak state.
10. Browser network log contains no production Google Analytics or GTM request in Storybook/catalog/test fixtures.

Manual checks supplement automated tests. Required unrun cases remain BLOCKED and prevent release readiness.

## Verification Plan

Forge runs focused checks during construction; Vera later records exact revision/environment/results for the release-complete diff.

Planned commands from the repository root:

```text
npm run typecheck
npm run lint
npm run test
npm run test:consumers
npm run size:analytics
npm run docs:check
npm run build-storybook
npm run build
npm run pack:check
npm run test:e2e
npm run check
```

Additional evidence:

- static scan proving no production measurement/container ID, loader URL, `window`, `document`, storage, jQuery, non-GA tracker, or consumer-component dependency in the analytics core;
- package tarball inspection for intended JS/types and absence of tests, stories, specs, and production configuration;
- transport/network traces proving spy-only Storybook/catalog/e2e behavior;
- exact 25-parameter/name/value boundary tests and prototype-pollution negatives;
- manual QA results at the tested revision.

## Stage Selection

- Adoption refresh, approved requirements/design, implementation, unit/contract tests, verification, manual QA, independent review, correction loop if needed, and release preparation are selected.
- Database/backend migration, production GTM configuration, consumer rollout, deployment, and rollback execution are N/A because this delivery is a client package API with injected transports and no external-system mutation.
- Manual QA is required, not N/A.
- Commit, push, PR, merge, and tag actions remain separate approval gates. The user/repository owner performs the final merge.
- Independent review must be performed by Argus or a human who did not implement the change; the implementing session cannot claim independence.

## Risks and Mitigations

| Risk | Mitigation / evidence |
| --- | --- |
| Consent/readiness race duplicates or loses events | Single state machine, FIFO ownership, fake timers, transition matrix, exact send-count tests |
| Transport callback fires twice or never resolves | at-most-once guard, configured timeout mapping, callback/throw/timeout tests |
| Caller mutation or prototype pollution changes payloads | clone-safe builders, allowlisted keys, dangerous-key rejection, immutability tests |
| Next.js navigation duplicates page views | explicit ownership docs, Enhanced Measurement warning, spy browser navigation counts |
| GTM container differs from package fixture | exact envelope docs/tests; production container review remains consumer-owned |
| Queue consumes unbounded memory | approved capacity/lifetime, reject-newest overflow, expiry tests |
| Package accidentally accesses browser globals during SSR | injected transports, Node import execution, source/output scans |
| Extension fields exceed GA limits or include PII | 25-parameter/name/value validation and consumer/privacy-owned allowlist |
| Release files added after review | complete version/changelog/docs/catalog before Vera/Argus; reverify/review any later release-impacting correction |
| Unrelated worktree content is disturbed | preserve and exclude `.playwright-mcp/` and all non-GA changes |

## Definition of Done

- GA-AC01-GA-AC26 and GA-NFR01-GA-NFR09 have passing or explicitly approved evidence at one release-complete revision.
- Analytics source/types/exports/tests, Storybook, catalog, consumer/SSR fixtures, browser evidence, manual QA record, version `1.4.0`, lockfile, docs, and changelog are aligned.
- No production analytics traffic, embedded destination, loader, consumer global, PII fixture, or unrelated tracker exists in package/test/documentation runtime.
- The 16 KiB analytics size budget and configured Chromium matrix pass.
- Required manual QA passes.
- Independent review has no open required findings; any correction loop was separately approved and revalidated.
- Commit/push/PR are only prepared after their separate approvals. Merge/release are not claimed.

## Approval Status

Approved by GA-A11 on 2026-10-26 Asia/Shanghai. Implementation may begin within DU-1-DU-5. Commit, push, PR, merge, tag, release, deployment, and independent review remain separately gated.

## Next Stage

Route to Forge with the implementation and JavaScript-framework skills for DU-1 through DU-5. Handoff Vera the completed candidate for verification; do not claim independent review or Git delivery from implementation completion.
