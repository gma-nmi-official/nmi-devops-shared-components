# Work breakdown structure: Google Analytics

## Scope

Create a configurable standalone Google Analytics service with required page, click, search, video-loaded, video-played, and generic event functions. Provide typed package exports and generic consumer setup. The `news` analytics file is algorithm reference material only.

## WBS summary

| Phase | Work area | Requirements | Main result | Status |
| --- | --- | --- | --- | --- |
| GA-01 | Confirm analytics contracts | GA-R02-GA-R11 | Confirmed configuration, events, consent, and compatibility decisions | Planned |
| GA-02 | Build the analytics core | GA-R01, GA-R02, GA-R04, GA-R07-GA-R09 | Configurable immutable service | Planned |
| GA-03 | Build required event functions | GA-R03-GA-R07 | Page, generic, click, search, scroll, and video helpers | Planned |
| GA-04 | Build consumer integration surfaces | GA-R10, GA-R11 | Generic package fixtures and reference mapping | Planned |
| GA-05 | Add stories, documentation, and tests | GA-R12, GA-R13 | Documented and tested package | Planned |
| GA-06 | Verify and prepare delivery | All approved requirements | Reviewed release candidate and handoff | Planned |

## GA-01 — Confirm analytics contracts

| ID | Task | Expected result | Owner |
| --- | --- | --- | --- |
| GA-01.1 | Finalize the optimized public API: `setCurrentParams`, `getCurrentParams`, `updateCurrentParams`, one page-view function, one named-event function, and thin search/scroll/video/click helpers. | Approved optimized API | Analytics/product and architecture owners |
| GA-01.2 | Verify direct consumers supply a runtime measurement ID, GTM consumers own destination configuration, `portal_section` is a default dimension, and explicit page-view ownership disables both tag-default and history-change automatic page views. | Destination and duplicate-prevention contract evidence | Analytics owner |
| GA-01.3 | Define event fields and parameter limits; select the canonical video value policy; confirm the reference default dimensions, empty-string behavior, consumer dimension-registration hook, and configurable scroll contract. | Approved event/configuration schema | Analytics/data owner |
| GA-01.4 | Specify and verify consumer-owned direct-gtag and GTM container/dataLayer boundaries, callback/timeout mapping, reserved fields, and the readiness/consent state table. Approve bounded queue capacity/lifetime/overflow/expiry/retry behavior. | Consent, readiness, and both transport contract evidence | Privacy, analytics, and architecture owners |
| GA-01.5 | Confirm the supported browser matrix, Next.js 16.4.2 fixture, CI owner, Enhanced Measurement history-change configuration, and exclusion of non-GA trackers. | Compatibility and ownership checklist | Consumer and repository owners |

**Phase complete when:** questions in `requirements.md` are resolved and privacy, requirements, and development approvals are recorded.

## GA-02 — Build the analytics core

| ID | Task | Expected result | Owner |
| --- | --- | --- | --- |
| GA-02.1 | Create public configuration, context, event, consent, result, error, and direct-gtag/GTM transport types. | Exported TypeScript types | Forge |
| GA-02.2 | Implement the analytics factory and isolated per-instance state. | Independent configured instances | Forge |
| GA-02.3 | Implement clone-safe `setCurrentParams`, `getCurrentParams`, partial `updateCurrentParams`, clear, and payload merge behavior for built-in and consumer-registered dimensions; preserve empty-string defaults. | Pure context and merge helpers | Forge and Vera |
| GA-02.4 | Implement readiness, consent gating, bounded queue/drop behavior, flush, result codes, and error/debug hooks. | Deterministic delivery state machine | Forge and Vera |
| GA-02.5 | Configure package exports and prove SSR-safe JavaScript/TypeScript imports with no embedded ID or browser-global access. | Buildable standalone core | Forge and Vera |

**Phase complete when:** types/build/pack/SSR checks pass and core state, merge, consent, readiness, and failure tests pass.

## GA-03 — Build required event functions

| ID | Task | Expected result | Owner |
| --- | --- | --- | --- |
| GA-03.1 | Implement `trackPageView` with approved path, title, location, portal section, context, and duplicate policy. | Exact `page_view` payload | Forge and Vera |
| GA-03.2 | Implement generic named-event tracking with validation and configured extra fields. | Exact generic event payload | Forge and Vera |
| GA-03.3 | Implement click tracking with approved name/category/label/value/action/location/callback behavior. | Exact click payload | Forge and Vera |
| GA-03.4 | Implement search tracking with the approved `search` event schema. | Exact search payload | Forge and Vera |
| GA-03.5 | Implement `trackVideoLoaded` using exact `loaded_a_video` naming and the approved category/value/context schema. | Exact video-loaded payload | Forge and Vera |
| GA-03.6 | Implement `trackVideoPlayed` using exact `played_a_video` naming and the approved category/value/context schema. | Exact video-played payload | Forge and Vera |
| GA-03.7 | Implement the configurable scroll helper for event name, triggers/milestones, repeat/deduplication, fields, and partial dimension updates. | Configured scroll payload | Forge and Vera |

**Phase complete when:** transport-spy tests prove exact payloads, one send per call, no input mutation, and approved consent/readiness behavior for every helper.

## GA-04 — Build consumer integration surfaces

| ID | Task | Expected result | Owner |
| --- | --- | --- | --- |
| GA-04.1 | Freeze approved reference examples for page-view, context/default, action, search, scroll, and video payload algorithms. | Approved reference behavior matrix | Athena and analytics owner |
| GA-04.2 | Add generic JavaScript and TypeScript package-consumer fixtures using runtime configuration and spy transports for both transport modes. | Importable package fixtures | Forge and Vera |
| GA-04.3 | Add Next.js using the installed repository version, SSR, and approved browser fixtures without application-specific globals or compatibility aliases. | Framework and browser fixtures | Forge and Vera |
| GA-04.4 | Verify two instances can use different direct measurement IDs or GTM dataLayers, defaults, contexts, consent states, and transports without leakage. | Configuration isolation evidence | Forge and Vera |
| GA-04.5 | Document initialization, environment configuration, consumer wiring, version rollout, and rollback. | Consumer setup guide | Athena, Forge, Vera, and Orion |

**Phase complete when:** all generic fixtures pass without `news` globals, jQuery, or non-GA side effects; reference behavior is preserved; and no redundant legacy method is public.

## GA-05 — Add stories, documentation, and tests

| ID | Task | Expected result | Owner |
| --- | --- | --- | --- |
| GA-05.1 | Add unit and contract tests for configuration, context, payloads, normalization, consent, readiness, queue/drop, duplicates, and failures. | Complete core test suite | Forge and Vera |
| GA-05.2 | Add a Storybook harness for direct-gtag/GTM configuration, context, consent/readiness states, event controls, payload logs, and failure simulation. | Dedicated analytics story | Forge |
| GA-05.3 | Add catalog guidance for setup, event functions, consent boundary, consumer-owned gtag/GTM loading, SSR, errors, and compatibility. | Catalog entry | Forge and analytics/privacy owners |
| GA-05.4 | Add package API documentation and JavaScript, TypeScript, Next.js, SSR, and browser examples for direct gtag and GTM using non-production IDs and spy transports. | Consumer documentation and fixtures | Forge and Vera |
| GA-05.5 | Add the reference-algorithm mapping, excluded-side-effect list, changelog impact, SemVer, validation references, and manual QA plan. | Release and QA documentation | Athena, Forge, Vera, and Orion |

**Phase complete when:** tests pass, Storybook/catalog are current, all examples build, and analytics/privacy owners approve the documented schemas and boundaries.

## GA-06 — Verify and prepare delivery

| ID | Task | Expected result | Owner |
| --- | --- | --- | --- |
| GA-06.1 | Run typecheck, lint, unit/contract/privacy-negative tests, package build, package inspection, Storybook build, and Next.js/SSR fixtures. | Automated verification report | Vera |
| GA-06.2 | Run Playwright for initial and Next.js navigation page views, generic, click, search, loaded-video, played-video, consent/readiness, callback/timeout, duplicate, error, and compatibility scenarios. | Browser verification evidence | Vera |
| GA-06.3 | Execute manual harness and generic consumer checks using a spy transport and no production GA requests. | Completed `manual_testing.md` | Assigned QA and analytics owner |
| GA-06.4 | Run the approved Bitbucket pipeline at the exact candidate revision. | CI evidence | Repository owner and Vera |
| GA-06.5 | Independently review the complete change set against approved requirements, privacy boundaries, and reference compatibility. | Independent review decision | Argus |
| GA-06.6 | Apply only approved review corrections and prepare commit, push, pull-request, release, and consumer handoff under separate approvals. | Closed review and operations handoff | Atlas, Forge, Vera, Argus, and Orion |

**Phase complete when:** every applicable acceptance criterion passes at one revision, manual QA and schema acceptance are complete, independent review has no open required finding, and the requested Git action has separate approval.

## Delivery order

GA-01 → GA-02 → GA-03 → GA-04 → GA-05 → GA-06

Documentation and reference-algorithm mapping may begin earlier, but implementation cannot begin before privacy, requirements, and development approval. The `news` repository is outside this delivery scope.
