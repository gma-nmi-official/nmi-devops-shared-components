# Work breakdown structure: Ads component

## Scope

Specify and later build a standalone `AdSlot` with semantic MREC/leaderboard formats and configurable custom standard display slots. Consumers supply all active-rule sizes; the `news` repository supplies example behavior only.

## WBS summary

| Phase | Work area | Requirements | Main result | Status |
| --- | --- | --- | --- | --- |
| ADS-01 | Resolve ad-provider and slot contracts | ADS-R02-R09 | Approved provider, sizes, targeting, consent and empty-slot behavior | Complete (ADS-A03, ADS-A04) |
| ADS-02 | Build provider boundary and slot lifecycle | ADS-R01, ADS-R03-R08 | SSR-safe component and provider adapter | Planned |
| ADS-03 | Add MREC, leaderboard, and custom standard display rules | ADS-R02, ADS-R05-R07 | Responsive configured formats | Planned |
| ADS-04 | Add package integration and examples | ADS-R01, ADS-R08-R10 | Next.js consumer fixtures | Planned |
| ADS-05 | Add stories, docs, and tests | ADS-R11-R12 | Verified component package | Planned |
| ADS-06 | Verify and prepare delivery | All approved requirements | Reviewed release candidate | Planned |

## ADS-01 — Resolve ad-provider and slot contracts

| ID | Task | Expected result | Owner |
| --- | --- | --- | --- |
| ADS-01.1 | Confirm GPT/GAM-only first release or need for AllAccess MREC adapter. | Provider scope decision | Monetization/product owner |
| ADS-01.2 | Confirm ADS-A03 consumer-owned sizing and decide whether `custom` standard display is included. | Format/extensibility contract | Monetization/design owner |
| ADS-01.3 | Confirm consumer-owned script, consent/privacy, single-request, service lazy-loading, and service initialization responsibilities. | Provider lifecycle contract | Architecture/ad-operations owner |
| ADS-01.4 | Define targeting, required eligibility input, label, no-fill, reserved-space/collapse, and optional placeholder rules. | Privacy-safe slot contract | Privacy, monetization, product owners |
| ADS-01.5 | Confirm browser matrix and QA/CI ownership. | Compatibility checklist | Repository owner |

**Phase complete:** requirements decisions and approval are recorded in ADS-A03/ADS-A04. Development approval remains the next gate before ADS-02.

## ADS-02 — Build provider boundary and slot lifecycle

| ID | Task | Expected result | Owner |
| --- | --- | --- | --- |
| ADS-02.1 | Define immutable public props, responsive-rule resolver, provider types, state callbacks, validation, and errors. | Typed component contract | Forge |
| ADS-02.2 | Implement SSR-safe wrapper, label, stable slot element, and reserved-size behavior. | Accessible stable slot | Forge |
| ADS-02.3 | Implement the approved GPT adapter through the consumer's readiness queue. | GPT-backed slot lifecycle | Forge |
| ADS-02.4 | Implement stable unique IDs, Strict Mode-safe async handling, resize/update replacement, no-fill, errors, and owned-slot cleanup. | Deterministic lifecycle | Forge and Vera |

## ADS-03 — Add MREC, leaderboard, and custom standard display rules

| ID | Task | Expected result | Owner |
| --- | --- | --- | --- |
| ADS-03.1 | Add semantic MREC handling with required consumer rule sizes and unit paths. | Configurable MREC format | Forge and Vera |
| ADS-03.2 | Add semantic leaderboard handling with required consumer responsive sizes and unit paths. | Configurable leaderboard format | Forge and Vera |
| ADS-03.3 | Add approved `custom` standard display configuration for placements such as footer leaderboard. | Extensible rectangular display lifecycle | Forge and Vera |
| ADS-03.4 | Add targeting and eligibility pass-through without package inventory defaults or per-slot service configuration. | Configurable provider request | Forge and Vera |

## ADS-04 — Add package integration and examples

| ID | Task | Expected result | Owner |
| --- | --- | --- | --- |
| ADS-04.1 | Export component/types/styles through package public entry. | Buildable public API | Forge |
| ADS-04.2 | Add Next.js client-component and SSR-safe fixture using a fake provider. | Consumer fixture | Forge and Vera |
| ADS-04.3 | Document provider initialization ownership, inventory configuration, privacy input, empty behavior, and migration from legacy markup. | Consumer guide | Athena and Forge |

## ADS-05 — Add stories, docs, and tests

| ID | Task | Expected result | Owner |
| --- | --- | --- | --- |
| ADS-05.1 | Add unit/component tests for rule validation, formats, breakpoints, provider readiness, Strict Mode, no-fill, errors, resize, stale async completion, and cleanup. | Automated test suite | Forge and Vera |
| ADS-05.2 | Add Storybook MREC, leaderboard, and custom display stories with size, label, eligibility, provider-state, and empty-state controls. | Dedicated stories | Forge |
| ADS-05.3 | Add catalog guidance and examples for provider ownership, targeting/privacy boundary, SSR, responsive sizing, and slot lifecycle. | Catalog documentation | Forge and privacy/monetization owner |
| ADS-05.4 | Add Playwright fixture/network checks and manual QA cases. | Browser and manual evidence | Vera |
| ADS-05.5 | Add changelog impact, SemVer classification, migration notes, and validation links before release review. | Release documentation | Athena and Orion |

## ADS-06 — Verify and prepare delivery

| ID | Task | Expected result | Owner |
| --- | --- | --- | --- |
| ADS-06.1 | Run typecheck, lint, unit/component, SSR, build/pack, Storybook, and Playwright fake-provider checks. | Verification report | Vera |
| ADS-06.2 | Independently review the full change set against approved requirements and the news reference. | Review decision | Argus |
| ADS-06.3 | Apply only approved review corrections and prepare Git/release actions under separate approvals. | Handoff | Atlas, Forge, Vera, Argus, Orion |

## Delivery order

ADS-01 → ADS-02 → ADS-03 → ADS-04 → ADS-05 → ADS-06

Requirements are approved. Implementation cannot begin before separate development approval of the final plan.
