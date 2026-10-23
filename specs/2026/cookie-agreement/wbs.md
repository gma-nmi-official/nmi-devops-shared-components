# Work breakdown structure: Cookie Agreement

## Scope

Create a standalone Cookie Agreement component that can be imported and rendered without Portal Header. It will show approved cookie information, record only explicit user decisions, store the approved consent record, and provide accessible responsive behavior.

Google Analytics, tag management, analytics events, and consent-mode integration are separate components and are not part of this WBS.

## WBS summary

| Phase | Work area | Requirements | Main result | Status |
| --- | --- | --- | --- | --- |
| CA-01 | Confirm requirements | CA-R02-CA-R07, CA-R12 | Approved content, actions, and storage rules | Planned |
| CA-02 | Define the component API | CA-R01, CA-R04, CA-R05, CA-R09, CA-R10 | Public props, types, and package exports | Planned |
| CA-03 | Build the user interface | CA-R02, CA-R03, CA-R06, CA-R08 | Accessible and responsive agreement surface | Planned |
| CA-04 | Build consent storage | CA-R04, CA-R05, CA-R09 | Safe read, write, expiry, and reset behavior | Planned |
| CA-05 | Add stories, documentation, and tests | CA-R11, CA-R12 | Documented and tested component | Planned |
| CA-06 | Verify and prepare delivery | All approved requirements | Approved release candidate and handoff | Planned |

## CA-01 — Confirm requirements

| ID | Task | Expected result | Owner |
| --- | --- | --- | --- |
| CA-01.1 | Record current-phase acceptance-only persistence, default `I AGREE`/`FIND OUT MORE` presentation, opt-in session-only Reject dismissal, and exclusion of category-preference/customized consent. | Approved consent model and default action visibility | Product owner; privacy/legal validates policy semantics |
| CA-01.2 | Use the approved no-title default, accessible name, body, `I AGREE`/`FIND OUT MORE` labels, optional `REJECT` label, and independent configurable destinations; decide whether a separate reset/revocation link is required. | Approved content list and revocation decision | Privacy/legal and content owners |
| CA-01.3 | Define the current persistent consent record: accepted status, policy version, decision date, and expiry date. Defer persistent rejected status; inventory the consumer cookies/services and define what Accept authorizes. | Approved record format and consumer policy inventory | Privacy and architecture owners |
| CA-01.4 | Define where consent is stored and approve the record name, duration, domain, path, SameSite, Secure, and reset behavior. | Approved storage rules | Privacy, security, and architecture owners |
| CA-01.5 | Decide how the old _ckn cookie is handled; inventory every logo, icon, font, seal, and artwork file; record its repository path, source, and redistribution rights; and confirm supported environments and owners. | Migration, repository asset, and readiness checklist | Privacy, brand, consumer, and repository owners |

**Phase complete when:** privacy/legal approves the consent model and content, requirements are approved, and development is authorized.

## CA-02 — Define the component API

| ID | Task | Expected result | Owner |
| --- | --- | --- | --- |
| CA-02.1 | Define CookieAgreement props for content, default `I AGREE`/`FIND OUT MORE` labels, opt-in Reject visibility/label, consent state, policy version, independent absolute-HTTPS overrides for `FIND OUT MORE` and NPC seal destinations with their approved defaults, optional artwork, and callbacks. | Public component interface | Forge |
| CA-02.2 | Define public types for the current accepted consent record, deferred rejected status, policy, storage errors, and component configuration. | Exported TypeScript types | Forge |
| CA-02.3 | Define the storage interface for reading, writing, and clearing consent without accessing browser storage during server rendering. | ConsentStore contract | Forge |
| CA-02.4 | Configure standalone component, type, and CSS exports and create JavaScript and TypeScript import examples that do not require Portal Header. | Buildable package API and fixtures | Forge and Vera |

**Phase complete when:** public types compile, the packed component imports independently, and server rendering does not access browser storage.

## CA-03 — Build the user interface

| ID | Task | Expected result | Owner |
| --- | --- | --- | --- |
| CA-03.1 | Build the agreement region or dialog with the approved title, message, independently configurable `FIND OUT MORE` link, actions, and repository-local NPC seal linked to its own configurable destination. | Base CookieAgreement component | Forge |
| CA-03.2 | For a decision-required state, keep the agreement fixed at the viewport bottom, hidden until the configurable scroll threshold, and animate it upward after the threshold. Suppress it after valid acceptance. | Correct position and visibility behavior | Forge and Vera |
| CA-03.3 | Implement `I AGREE` and `FIND OUT MORE` by default, render Reject only when configured, and expose no category-preference controls. `I AGREE` persists acceptance; Reject only dismisses for the current session and returns after refresh. | Working explicit decision controls and temporary dismissal | Forge |
| CA-03.4 | Ensure scrolling, waiting, navigation, and unrelated clicks never record consent. | Privacy-negative behavior and tests | Forge and Vera |
| CA-03.5 | Add keyboard support, focus handling, accessible names, announcements, contrast, reduced motion, responsive layout, long-copy support, and 200% zoom support. | Accessible responsive styles and tests | Forge and Vera |

**Phase complete when:** approved actions work with keyboard and pointer input, no implicit action records consent, and essential content and controls remain usable at approved screen sizes and zoom levels.

## CA-04 — Build consent storage

| ID | Task | Expected result | Owner |
| --- | --- | --- | --- |
| CA-04.1 | Implement the approved read, write, and clear storage adapter. | Working persistence adapter | Forge |
| CA-04.2 | Validate stored records and safely handle missing, malformed, expired, and old-policy records. | Safe record-loading behavior | Forge and Vera |
| CA-04.3 | Store consent only after explicit `I AGREE`, using `accepted`, policy version, decision date, and expiry date. Reject performs no write in the current phase. | Correct acceptance record and session-only Reject behavior | Forge and Vera |
| CA-04.4 | Implement the approved reset or revocation flow and require a new decision when applicable. | Working reset behavior | Forge and Vera |
| CA-04.5 | Handle storage and callback failures without crashing or creating false consent. | Tested failure behavior | Forge and Vera |

**Phase complete when:** read, write, expiry, policy-change, reset, and failure tests pass without false consent.

## CA-05 — Add stories, documentation, and tests

| ID | Task | Expected result | Owner |
| --- | --- | --- | --- |
| CA-05.1 | Add unit tests for visibility, decisions, record validation, storage, expiry, reset, and failures. | Passing component and storage tests | Forge and Vera |
| CA-05.2 | Add accessibility and browser tests for keyboard use, screen readers, responsive layout, long content, zoom, links, and error states. | Passing accessibility and Playwright tests | Vera |
| CA-05.3 | Add Storybook stories and controls for the scroll-threshold fixed-bottom surface and slide-up animation, default/Reject-enabled configurations, session-only Reject dismissal and refresh restoration, accepted and decision-required states, mobile layout, long content, storage failure, repository-local NPC seal, no-seal fallback, responsive seal layouts, both default destinations, independent custom HTTPS destinations, and accessible linked-seal behavior. Ensure no story performs remote runtime asset loading. | Complete Cookie Agreement interaction, state, and artwork coverage | Forge |
| CA-05.4 | Add catalog guidance covering configuration, consent states, storage, privacy links, accessibility, imports, and the Storybook link. | Complete catalog entry | Forge and privacy owner |
| CA-05.5 | Add package documentation, JavaScript/TypeScript/Next.js examples, migration guidance, changelog impact, and a standalone manual-testing document. | Complete consumer and QA documentation | Athena, Forge, Vera, and Orion |

**Phase complete when:** automated checks pass, Storybook and catalog are current, examples build, manual cases are ready, and privacy owners approve the documentation.

## CA-06 — Verify and prepare delivery

| ID | Task | Expected result | Owner |
| --- | --- | --- | --- |
| CA-06.1 | Run typecheck, lint, unit tests, accessibility tests, package build, Storybook build, Next.js build, Playwright, and package inspection. | Complete automated verification report | Vera |
| CA-06.2 | Run manual keyboard, screen-reader, zoom, responsive-layout, privacy-link, consent-decision, and reset cases. | Completed manual_testing.md | Assigned QA and privacy owner |
| CA-06.3 | Confirm the package has no Portal Header dependency, contains no analytics/tag-manager/consent-mode implementation, and loads no visual asset from a remote runtime source. | Component and asset independence evidence | Vera and Argus |
| CA-06.4 | Obtain privacy/legal acceptance of the final content, actions, record behavior, storage, reset behavior, and migration plan. | Privacy/legal acceptance record | Privacy/legal owner |
| CA-06.5 | Verify the unchanged GitHub Actions quality workflow, the separately recorded local Playwright result, and independent review of the complete change set against the approved requirements all refer to the same revision. | Passing CI, local E2E, and review decision | Repository owner, Vera, and Argus |
| CA-06.6 | Prepare approved review corrections and the commit, push, pull-request, release, and consumer handoff under their separate approval gates. | Closed review and operations handoff | Atlas, Forge, Vera, Argus, and Orion |

**Phase complete when:** all acceptance criteria pass for the same revision, privacy/legal acceptance and manual QA are complete, independent review has no open required finding, and the requested Git action has separate approval.

## Delivery order

CA-01 → CA-02 → CA-03 → CA-04 → CA-05 → CA-06

Documentation and stories may start during interface and storage development, but they cannot finish until the public API and behavior are validated. Implementation cannot begin before privacy/legal, requirements, and development approval.
