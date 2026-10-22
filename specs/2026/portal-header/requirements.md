# Requirements: Portal Header

| ID | Requirement | Source | Acceptance link | Status |
| --- | --- | --- | --- | --- |
| PH-R01 | Export `PortalHeader`, public types, and compiled component CSS for JavaScript/TypeScript consumers. | User/foundation | PH-AC01 | Approved |
| PH-R02 | Configure branding, section label, section accent, primary/network navigation, link targets, and social links through data; provide the complete ordered GMA navigation preset plus Entertainment and News social presets derived from the live reference/header script; allow consumers to override, hide, or append entries by stable ID; approved logos, icons, fonts, and related visual assets are stored and versioned in this repository. | User/reference | PH-AC02, PH-AC03, PH-AC07, PH-AC21 | Approved; revised by PH-A12/PH-A14 |
| PH-R03 | Match the live GMA News header's compact dark single-bar presentation and responsive full-width dropdown behavior while preserving accessible interaction and preventing page overflow. | User/live reference, 2026-10-21 | PH-AC04, PH-AC05, PH-AC20 | Approved by PH-A12 |
| PH-R04 | Provide optional configurable GET search that trims input, rejects blank submission, and does not hard-code an endpoint. | Reference | PH-AC06 | Approved |
| PH-R06 | Contain no Google Analytics or generic analytics integration, event contract, import, global lookup, or consent-mode behavior; GA is a separate future component. | User clarification, 2026-10-12 | PH-AC08 | Approved |
| PH-R07 | Default to anchors and support a consumer-supplied router link adapter without importing Next.js. | Foundation | PH-AC09 | Approved |
| PH-R08 | Meet semantic, keyboard, focus, announcement, contrast, zoom, and reduced-motion requirements. | Accessibility | PH-AC04, PH-AC10 | Approved |
| PH-R09 | Preserve deterministic SSR/hydration with a narrow client boundary. | Next.js/React | PH-AC11 | Approved |
| PH-R10 | Load no legacy JS/CSS, jQuery, globals, remote fonts/icons, or analytics dependency at runtime. | Migration goal | PH-AC12 | Approved |
| PH-R11 | Include component tests, accessibility checks, Storybook states, catalog guidance, Playwright coverage, and JS/TS consumer examples. | GNO policy | PH-AC13-PH-AC16 | Approved |
| PH-R12 | Document legacy configuration mapping, unsupported behavior, changelog impact, and GitHub Actions evidence for the exact release revision. | Operations | PH-AC17-PH-AC19 | Approved |

## Approved defaults

1. Ship one config-driven production-compatible header variant with an optional section label and configurable accent. Default visual tokens match the live News header: `#2e2e2e` bar, `#cc0001` accent, white controls/text, a centered `1195px` maximum inner width, compact approximately `51px` desktop / `42px` mobile bar heights, and the section-label center positioned `5px` below the antenna-inclusive logo box center.
2. Default to the complete `gma` primary/network navigation preset in the verified live-header order. Consumer arrays patch defaults by stable ID, may hide defaults, and append new IDs in supplied order; `navigationPreset="none"` starts empty. Current links use `aria-current="page"`; disabled entries are non-navigable; external/new-tab entries receive safe `rel` behavior.
3. Search is optional and uses a native GET form with consumer-supplied action and query-parameter name. Trim input, reject blanks, and keep search and the mobile menu mutually exclusive.
4. Standard anchors are the default. A consumer may supply a router-link adapter; the package does not import Next.js.
5. The logo falls back to visible `GMA Network` text. Unknown social types use the generic link icon. The CSS font stack starts with `Open Sans` but loads no remote font; consumers may supply it, otherwise the stack falls back locally. Public CSS variables control background, accent, dimensions, and colors.
6. Support React 19 and Next.js 16 consumers plus the latest two stable Chrome, Edge, Firefox, and Safari versions at verification time.
7. Documentation may use the approved production navigation/social presets and synthetic override/search fixtures. Only explicitly approved logo and navigation/social defaults embed production-owned values; analytics remains absent.

## PH-01 repository findings and focused owner decisions

Repository inspection on 2026-10-19 confirmed that no Portal Header source, navigation dataset, social-link dataset, approved logo/icon/font inventory, or reusable router adapter currently exists. The files under `public/` are starter Next.js assets and are not approved GNO brand assets. The package supports React 19, named ESM exports, compiled CSS, Storybook, Vitest, and Playwright; those facts do not determine consumer content or brand rights.

PH-A10, as revised by PH-A12 and PH-A14, resolves the owner questions as follows:

1. One production-compatible configurable variant; optional section label; configurable accent; live GMA News desktop/mobile presentation.
2. Complete ordered GMA navigation defaults with deterministic consumer patches; synthetic fixtures remain available through `navigationPreset="none"`; approved social presets and deterministic patching.
3. Optional native GET search; consumer action/name; trim and blank rejection; mutually exclusive menu/search state.
4. Visible text/logo and generic-icon fallbacks.
5. React 19/Next.js 16, configured Playwright Chromium plus installed Windows Chrome/Edge delivery compatibility under PH-A21, anchors by default, and a consumer-owned router adapter. Firefox, Safari, and second-version coverage are deferred residual risk for this delivery.

## Approved asset decisions

- PH-A07 selects the GMA header logo from `https://aphrodite.gmanetwork.com/gma-header-logo.svg`. The implementation will store a verified copy in the package and will not hotlink the mutable production URL.
- PH-A07 selects Font Awesome for search, close, and social icons. PH-A16/PH-A18 replace the visually different Font Awesome grip with a repository-local inline SVG matching the live nine-solid-square `glyph-icon icon-menu-grid` appearance. Do not load the legacy Fontello font, Bootstrap/Glyphicons, a hosted Kit, CDN script, remote webfont, Pro icon, or whole-style import.
- Retain the Font Awesome package license and attribution material. Brand icons may represent only their corresponding company, product, or service.
- No separate branded text font has been supplied. The proposed default remains an inherited/system font stack unless the owner later provides an approved font.

## Approved social functionality

- PH-A08 approves Facebook, Twitter/X, Instagram, YouTube, Viber, and RSS as supported social types based on the referenced production markup.
- PH-A09 approves repository-owned `entertainment` and `news` default presets derived from `header.js`. Legacy protocol-relative URLs are normalized to explicit HTTPS.
- `entertainment` is the default preset. Consumers can choose `news` or disable presets, override an existing entry by stable ID, hide a default, and append new IDs in supplied order.
- An override keeps the default position unless hidden. New IDs append after remaining defaults in consumer order. Consumers provide an accessible label for every new ID; unknown icon IDs use the generic link icon unless a supported icon name is supplied.
- Social URLs accept HTTPS only. Invalid or unsafe schemes are omitted without crashing core navigation.
- Social entries render as semantic anchors with repository-local Font Awesome Free icons. New-tab links use the approved safe `rel` behavior.
- The legacy `social_ribbon_click()` analytics call is not part of the component. The public API and implementation contain no GA or generic analytics callback, event mapping, import, global lookup, inline tracking handler, or consent behavior.

### Default social presets

| Stable ID | Entertainment HTTPS default | News HTTPS default |
| --- | --- | --- |
| `facebook` | `https://facebook.com/gmanetwork` | `https://www.facebook.com/gmanews` |
| `twitter` | `https://twitter.com/gmanetwork` | `https://twitter.com/gmanews` |
| `instagram` | `https://instagram.com/gmanetwork` | `https://www.instagram.com/gmanews` |
| `youtube` | `https://youtube.com/gmanetwork` | `https://www.youtube.com/gmanews` |
| `viber` | Not present | `https://chats.viber.com/gmanews` |
| `rss` | `https://www.gmanetwork.com/rss` | `https://www.gmanetwork.com/news/rss` |

## Approval

Approved by PH-A10 on 2026-10-20 Asia/Shanghai and materially revised by PH-A12, PH-A14, PH-A16, PH-A18, and PH-A19 on 2026-10-21. Revised development is approved by PH-A13, PH-A15, PH-A17, PH-A18, and PH-A19.
