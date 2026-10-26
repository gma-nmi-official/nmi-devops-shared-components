# Requirements: Ads component

| ID | Requirement | Source | Acceptance link | Status |
| --- | --- | --- | --- | --- |
| ADS-R01 | Export a standalone, configurable `AdSlot` component and public immutable types for placement rules, provider lifecycle, sizing, targeting, state, eligibility, and placeholder contracts. | User/package foundation | ADS-AC01 | Approved ADS-A04 |
| ADS-R02 | Support semantic `mrec`, `leaderboard`, and consumer-defined `custom` standard display formats through non-overlapping responsive rules. Every active rule requires consumer-provided unit path and non-empty size list; the package supplies no operational size defaults, production paths, network IDs, or zone IDs. | User/reference/ADS-A03 | ADS-AC02, ADS-AC03 | Approved ADS-A04 |
| ADS-R03 | Use an injected GPT/GAM provider adapter; script loading, consent/privacy mode, single-request mode, service-level lazy loading, and global service initialization remain consumer-owned and occur once per application. | Reference/design/ADS-A04 | ADS-AC04, ADS-AC05 | Approved ADS-A04 |
| ADS-R04 | Register and display one unique slot per mounted instance, queue provider commands until ready, and destroy only the owned slot on unmount/configuration replacement. | Reliability/design | ADS-AC06, ADS-AC07 | Approved ADS-A04 |
| ADS-R05 | Accept consumer-owned responsive rules containing full ad-unit paths and sizes, approved targeting/keywords, reservation policy, and optional diagnostic slot identifier; validate them without mutating caller input. | Reference/design | ADS-AC08 | Approved ADS-A04 |
| ADS-R06 | Render an accessible, configurable “Advertisement” label; reserve space by default or collapse an empty slot when explicitly configured. | Reference/accessibility/ADS-A04 | ADS-AC09, ADS-AC10 | Approved ADS-A04 |
| ADS-R07 | Handle idle/ineligible, provider-ready, loading, filled, no-fill, error, responsive replacement, and React Strict Mode outcomes without breaking layout, leaking, or duplicating a slot. | Reliability | ADS-AC06, ADS-AC10, ADS-AC11 | Approved ADS-A04 |
| ADS-R08 | Remain SSR-safe and avoid browser globals until client mount; no production network request occurs in package, Storybook, unit, or browser fixtures. | GNO policy/privacy | ADS-AC12, ADS-AC13 | Approved ADS-A04 |
| ADS-R09 | Require privacy/eligibility state from the consumer; false makes no provider call. Do not read consent storage, collect user information, infer user eligibility, or define targeting policy. | Privacy/component boundary/ADS-A04 | ADS-AC14 | Approved ADS-A04 |
| ADS-R10 | Keep Portal Header, Cookie Agreement, Google Analytics, GTM, and consumer ad scripts independent; do not depend on their UI or analytics APIs. | Component boundaries | ADS-AC15 | Approved ADS-A04 |
| ADS-R11 | Provide dedicated Storybook stories for all supported formats and states plus catalog/consumer guidance. | GNO policy | ADS-AC16, ADS-AC17 | Approved ADS-A04 |
| ADS-R12 | Validate all supported semantic formats, required consumer sizing, lifecycle, resize, no-fill, privacy gating, SSR, package output, and documentation with an injected fake provider. | GNO policy | ADS-AC11-ADS-AC18 | Approved ADS-A04 |

## Requirements decisions

1. **Approved by ADS-A04:** GPT/GAM only for the first release; AllAccess remains out of scope.
2. **Resolved by ADS-A03:** consumers must configure every active ad unit's complete size list at every responsive rule. Reference MREC/leaderboard sizes are documentation examples only; the package has no operational size presets/defaults.
3. **Approved by ADS-A04:** the consumer loads/configures GPT once; the package owns only each slot lifecycle and queued adapter calls.
4. **Approved by ADS-A04:** reserve space by default, expose opt-in collapse, and require explicit consumer eligibility before any provider request.
5. **Approved by ADS-A04:** include `custom` standard rectangular display; exclude AllAccess, out-of-page, native, video, pushdown, skinning, refresh, and article insertion behavior.

## Approval

Approved by ADS-A04. Development approval remains pending.
