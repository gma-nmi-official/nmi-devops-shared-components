# Requirements: Ads component

| ID | Requirement | Source | Acceptance link | Status |
| --- | --- | --- | --- | --- |
| ADS-R01 | Export a standalone, configurable `AdSlot` component and public types for its format, provider, sizing, targeting, lifecycle, and placeholder contracts. | User/package foundation | ADS-AC01 | Draft |
| ADS-R02 | Support `mrec` and `leaderboard` formats through explicit responsive size mappings; do not embed production ad-unit paths or zone IDs. | User/reference | ADS-AC02, ADS-AC03 | Draft |
| ADS-R03 | Use an injected provider adapter. The proposed first adapter is GPT/GAM; loading and global initialization remain consumer-owned and occur once per application. | Reference/design recommendation | ADS-AC04, ADS-AC05 | Draft |
| ADS-R04 | Register and display one unique slot per mounted instance, queue provider commands until ready, and destroy only the owned slot on unmount/configuration replacement. | Reliability/design | ADS-AC06, ADS-AC07 | Draft |
| ADS-R05 | Accept consumer-owned ad-unit path, approved targeting, optional keywords, breakpoint mappings, lazy-load policy, and slot identifier; validate them without mutating caller input. | Reference/design | ADS-AC08 | Draft |
| ADS-R06 | Render an accessible, configurable “Advertisement” label and reserve space or collapse an empty slot according to explicit configuration. | Reference/accessibility | ADS-AC09, ADS-AC10 | Draft |
| ADS-R07 | Handle provider-ready, loading, filled, no-fill, and error outcomes without breaking surrounding layout or duplicating a slot. | Reliability | ADS-AC06, ADS-AC10, ADS-AC11 | Draft |
| ADS-R08 | Remain SSR-safe and avoid browser globals until client mount; no production network request occurs in package, Storybook, unit, or browser fixtures. | GNO policy/privacy | ADS-AC12, ADS-AC13 | Draft |
| ADS-R09 | Accept privacy/eligibility state from the consumer; do not read consent storage, collect user information, infer user eligibility, or define targeting policy. | Privacy/component boundary | ADS-AC14 | Draft |
| ADS-R10 | Keep Portal Header, Cookie Agreement, Google Analytics, GTM, and consumer ad scripts independent; do not depend on their UI or analytics APIs. | Component boundaries | ADS-AC15 | Draft |
| ADS-R11 | Provide a dedicated Storybook story with supported format, responsive sizes, loading/no-fill/error controls and catalog/consumer guidance. | GNO policy | ADS-AC16, ADS-AC17 | Draft |
| ADS-R12 | Validate both presets, lifecycle, resize, no-fill, privacy gating, SSR, package output, and documentation with an injected fake provider. | GNO policy | ADS-AC11-ADS-AC18 | Draft |

## Open requirements decisions

1. Confirm whether the initial shared provider is GPT/GAM only or must also support the legacy AllAccess MREC zone script. Recommendation: GPT/GAM first; keep AllAccess outside the initial package until required.
2. Confirm MREC size policy. Reference differs: GPT preset `[300x250, 250x250]`, plus `[336x280]` at 1200 px and above; AllAccess view wrapper is 320x270. Recommendation: use the GPT preset and make it overridable.
3. Confirm whether the shared package owns GPT script loading. Recommendation: consumer loads and initializes GPT once; the component owns only its slot lifecycle.
4. Confirm no-fill behavior and privacy owner. Recommendation: reserve configured space by default to reduce layout shift, expose opt-in collapse, and require consumer-approved targeting/eligibility.

## Approval

Draft. Formal requirements and development approval are pending.
