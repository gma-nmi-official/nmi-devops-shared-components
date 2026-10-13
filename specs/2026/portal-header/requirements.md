# Requirements: Portal Header

| ID | Requirement | Source | Acceptance link | Status |
| --- | --- | --- | --- | --- |
| PH-R01 | Export `PortalHeader`, public types, and compiled component CSS for JavaScript/TypeScript consumers. | User/foundation | PH-AC01 | Draft |
| PH-R02 | Configure branding, section label, primary/network navigation, link targets, and social links through data; approved logos, icons, fonts, and related visual assets are stored and versioned in this repository. | User/reference | PH-AC02, PH-AC03 | Draft |
| PH-R03 | Provide responsive desktop/mobile layouts with an accessible menu/drawer and no page overflow. | Reference/accessibility | PH-AC04, PH-AC05 | Draft |
| PH-R04 | Provide optional configurable search that rejects blank input and does not hard-code endpoints. | Reference | PH-AC06 | Draft |
| PH-R06 | Contain no Google Analytics or generic analytics integration, event contract, import, global lookup, or consent-mode behavior; GA is a separate future component. | User clarification, 2026-10-12 | PH-AC08 | Draft |
| PH-R07 | Default to anchors and support a router link adapter without importing Next.js. | Foundation | PH-AC09 | Draft |
| PH-R08 | Meet semantic, keyboard, focus, announcement, contrast, zoom, and reduced-motion requirements. | Accessibility | PH-AC04, PH-AC10 | Draft |
| PH-R09 | Preserve deterministic SSR/hydration with a narrow client boundary. | Next.js/React | PH-AC11 | Draft |
| PH-R10 | Load no legacy JS/CSS, jQuery, globals, remote fonts/icons, or analytics dependency at runtime. | Migration goal | PH-AC12 | Draft |
| PH-R11 | Include component tests, accessibility checks, Storybook states, catalog guidance, Playwright coverage, and JS/TS consumer examples. | GNO policy | PH-AC13-PH-AC16 | Draft |
| PH-R12 | Document legacy configuration mapping, unsupported behavior, changelog impact, and Bitbucket CI evidence before release. | Operations | PH-AC17-PH-AC19 | Draft |

## Decisions required

1. First-release modes/navigation datasets and current-link behavior.
2. Search endpoints/contract and whether native form or callback modes are required.
3. Approved logo/icons/fonts and redistribution rights.
4. Confirm the separate future GA component boundary and owning project; no GA API is designed here.
5. Supported browsers/Next.js consumers and Bitbucket pipeline owner.

Recommended default: one config-driven header API for navigation links, social links, and search, with consumer fixtures, CSS responsiveness, and no embedded production routes/assets or analytics behavior.

## Approval

Draft; requirements approval pending.
