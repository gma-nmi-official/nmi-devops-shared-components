# Requirements: Cookie Agreement

| ID | Requirement | Source | Acceptance link | Status |
| --- | --- | --- | --- | --- |
| CA-R01 | Export standalone `CookieAgreement`, public consent types, and compiled CSS for JavaScript/TypeScript consumers without requiring Portal Header. | User/foundation | CA-AC01 | Draft |
| CA-R02 | Show the surface only when the supplied policy/state requires a decision; valid decisions suppress it. | User/reference | CA-AC02 | Draft |
| CA-R03 | Support the privacy-owner-approved explicit actions and never infer consent from scrolling, browsing, time, or unrelated interaction. | Privacy risk | CA-AC03 | Draft |
| CA-R04 | Model a versioned record with approved status/categories, decision time, expiry, and policy version. | Privacy/reliability | CA-AC04 | Draft |
| CA-R05 | Keep persistence behind a typed read/write/clear adapter and handle missing, malformed, expired, or failed storage safely. | Reliability | CA-AC05 | Draft |
| CA-R06 | Configure approved title/body/actions/privacy link and optional trust/seal content without unsafe HTML; every logo, icon, font, seal, and artwork file used by the component is stored and versioned in this repository. | User/reference/ownership | CA-AC06 | Draft |
| CA-R07 | Contain no Google Analytics or generic analytics integration, event contract, import, global lookup, tag management, or consent-mode behavior; GA is a separate future component. | User clarification, 2026-10-12 | CA-AC07 | Draft |
| CA-R08 | Meet semantic dialog/region, keyboard, focus, announcement, contrast, zoom, reduced-motion, and responsive requirements. | Accessibility | CA-AC08, CA-AC09 | Draft |
| CA-R09 | Preserve deterministic SSR/hydration and isolate browser storage to a narrow client boundary. | Next.js/React | CA-AC10 | Draft |
| CA-R10 | Load no legacy JS/CSS, jQuery, global analytics, remote font/icon/seal, or Portal Header dependency at runtime; neither component controls or renders the other. | User/migration goal | CA-AC11 | Draft |
| CA-R11 | Document every approved state in Storybook/catalog and provide unit, a11y, browser, privacy-negative, package, and JS/TS consumer tests. | GNO policy | CA-AC12-CA-AC15 | Draft |
| CA-R12 | Document legacy `_ckn` migration/compatibility, revocation, changelog impact, and Bitbucket CI evidence before release. | Operations | CA-AC16-CA-AC18 | Draft |

## Decisions required

1. Acknowledgment-only, accept/reject, or category-preference model?
2. Approved copy/actions/privacy URL and whether a preference center is required?
3. Policy version, retention/expiry, cookie name/domain/path, SameSite/Secure, and revocation route?
4. Essential/analytics/personalization category definitions and which services are gated?
5. Approved seal/artwork and redistribution rights?
6. Browser matrix, consumer repositories, Bitbucket CI owner, and boundary by which a separate future GA component reads the approved consent record?

Recommended default: API supports accepted/rejected/customized records, UI renders only approved actions, storage is injected, unknown/invalid storage requires a decision, and Cookie Agreement contains no analytics code. A separate GA component may consume approved consent state outside this package module.

## Approval

Draft; privacy/legal and requirements approval pending.
