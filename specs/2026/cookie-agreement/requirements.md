# Requirements: Cookie Agreement

| ID | Requirement | Source | Acceptance link | Status |
| --- | --- | --- | --- | --- |
| CA-R01 | Export standalone `CookieAgreement`, public consent types, and compiled CSS for JavaScript/TypeScript consumers without requiring Portal Header. | User/foundation | CA-AC01 | Draft |
| CA-R02 | When the supplied policy/state requires a decision, keep the surface fixed at the viewport bottom but hidden until vertical scroll reaches configurable `scrollRevealThreshold` (default `0.1` of viewport height), then animate it upward. A valid accepted decision suppresses the surface. | User decision/privacy | CA-AC02 | Draft |
| CA-R03 | Default to visible `I AGREE` and `FIND OUT MORE` controls. Support a configurable Reject action that is hidden unless enabled. `I AGREE` records acceptance and suppresses the surface. An enabled Reject action only dismisses the surface for the current page session; it does not record consent, and the surface appears again after refresh. Privacy/seal navigation and unrelated interaction never record a decision. | User decision/privacy risk | CA-AC03 | Draft |
| CA-R04 | Model the approved persistent record as `accepted` status with decision time, expiry, and policy version; do not expose a customized/category-preference status. A persisted `rejected` status is deferred while Reject remains a session-only dismissal. Cookie Agreement does not itself load, block, or configure cookies, services, or analytics. | User decision/privacy/reliability | CA-AC04 | Draft |
| CA-R05 | Keep persistence behind a typed read/write/clear adapter and handle missing, malformed, expired, or failed storage safely. | Reliability | CA-AC05 | Draft |
| CA-R06 | Configure approved title/body/actions and separate absolute HTTPS destinations: `FIND OUT MORE` defaults to `https://www.gmanetwork.com/privacypolicy/`, while the repository-local NPC seal defaults to `https://www.gmanetwork.com/news/privacy-notice/`. Each destination is independently configurable. Support optional seal content without unsafe HTML; every logo, icon, font, seal, and artwork file used by the component is stored and versioned in this repository. | User/reference/ownership | CA-AC06 | Draft |
| CA-R07 | Contain no Google Analytics or generic analytics functionality, callback, event contract, mapping, import, global lookup, tag management, script loading, or consent-mode behavior; GA is a separate future component. | User clarification, 2026-10-12; reaffirmed 2026-10-23 | CA-AC07 | Draft |
| CA-R08 | Meet semantic dialog/region, keyboard, focus, announcement, contrast, zoom, reduced-motion, and responsive requirements. | Accessibility | CA-AC08, CA-AC09 | Draft |
| CA-R09 | Preserve deterministic SSR/hydration and isolate browser storage to a narrow client boundary. | Next.js/React | CA-AC10 | Draft |
| CA-R10 | Load no legacy JS/CSS, jQuery, global analytics, remote font/icon/seal, or Portal Header dependency at runtime; neither component controls or renders the other. | User/migration goal | CA-AC11 | Draft |
| CA-R11 | Document every approved state in Storybook/catalog and provide unit, a11y, browser, privacy-negative, package, and JS/TS consumer tests. | GNO policy | CA-AC12-CA-AC15 | Draft |
| CA-R12 | Document legacy `_ckn` migration/compatibility, revocation, changelog impact, passing status-quo GitHub Actions evidence, and passing local Playwright evidence for the reviewed revision before release. | Operations | CA-AC16-CA-AC18 | Draft |

## Approved default content

The user approved these defaults on 2026-10-23. Every text value is configurable
plain text; the API exposes no raw HTML input.

| Item | Proposed default | Status |
| --- | --- | --- |
| Visible title | None | User approved |
| Accessible surface name | `Cookie notice` | User approved |
| Body | `We use cookies to help provide the best browsing experience. Select I AGREE to accept our use of cookies. Select FIND OUT MORE to learn how we use cookies and protect your privacy.` | User approved |
| Accept label | `I AGREE` | User approved |
| Privacy label | `FIND OUT MORE` | User approved |
| Reject label when enabled | `REJECT` | User approved |

The body does not treat continued browsing, scrolling, time, or unrelated
interaction as consent. If policy owners require different wording when Reject
is enabled, the consumer supplies approved copy through the same plain-text API.

## Approved persistence defaults

The approved default is a configurable host-only cookie named
`gno_cookie_consent`, with path `/`,
`SameSite=Lax`, `Secure=true` when served over HTTPS, and a 365-day expiry.
`policyVersion` remains an explicit required value rather than an implicit
default. Revocation clears the record; legacy `_ckn` is not read or migrated by
default. Consumers may override the adapter name, retention, cookie attributes,
and revocation behavior through the typed persistence adapter.

## Decisions required

1. Resolved for the current phase: the persistent record is acceptance-only; default UI shows `I AGREE` and `FIND OUT MORE`; Reject is configurable and hidden by default; no category-preference/customized state. A persistent rejected record is deferred.
2. Default content resolved; decide whether a separate revocation link is required.
3. Resolved: approved persistence defaults are documented above, including explicit policy version handling and clear-on-revocation behavior.
4. Resolved for the current phase: Reject is a session-only dismissal and does not change cookie/service policy. Privacy/legal must inventory which consumer cookies/services Accept authorizes before any persistent rejection model is added.
5. NPC seal source and linked behavior resolved; confirm redistribution rights and final repository path.
6. Browser matrix, consumer repositories, and boundary by which a separate future GA component reads the approved consent record?
7. Superseded: the decision-required surface is fixed to the viewport bottom and reveals only after the configurable scroll threshold; it remains visible after reveal until `I AGREE` is clicked or an enabled Reject action dismisses it for the current session.

Approved direction: the current API persists only accepted records; default UI renders `I AGREE` and `FIND OUT MORE`; Reject is opt-in, hidden by default, and session-only; storage is injected; unknown/invalid storage requires a decision; the fixed-bottom surface reveals after the configurable scroll threshold (default 10% of viewport height) with a slide-up animation; and Cookie Agreement contains no analytics or service-enforcement code. Reject does not alter consumer cookie/service policy. A future persistent rejected status requires a new approval.

## Approval

Draft; privacy/legal and requirements approval pending.
