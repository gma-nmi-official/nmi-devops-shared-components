# Solution design: Portal Header

## Interface and behavior

Proposed `packages/ui/src/components/portal-header/` owns the component, types, tests, story, and styles. Public groups are `brand`, `primaryNavigation`, `networkNavigation`, `socialLinks`, `search`, `renderLink`, and `theme`.

The component uses an explicit `closed/open` menu state. PH-A12 replaces the off-canvas drawer with a full-width dropdown anchored directly below a compact sticky bar. CSS handles responsive layout where possible. The interactive module owns focus entry/return, Escape/outside behavior, and approved scroll handling. Desktop search is a compact panel aligned to the right; mobile search and social links live inside the expanded menu. Approved logos, icons, fonts, and related visual files are stored in version-controlled repository paths and included through the package build rather than loaded from remote runtime sources.

The first release has one production-compatible configurable visual/behavioral variant. Branding accepts an optional section label, optically positions its center `5px` below the antenna-inclusive logo box center to match the visible GMA wordmark, and falls back to visible `GMA Network` text if the logo is unavailable. `navigationPreset="gma"` is the default and contains the 4 primary plus 12 network destinations verified from the live header in exact DOM order. Primary/network arrays patch their group by stable ID, may hide defaults, and append new IDs; `navigationPreset="none"` starts empty. Current, disabled, internal, external, and new-tab states render only in the dropdown rather than as persistent rows. Desktop layout uses one primary column plus three top-to-bottom network columns; mobile uses two columns inside the scrollable panel. Default styling matches the measured live News header while exposing public CSS variables for background, accent, dimensions, colors, and font stack.

Standard anchors are the default; a link render adapter supports Next.js without importing it. Portal Header exposes no account/authentication surface, analytics events, or GA integration; separate components own those concerns.

Search is optional and renders a native GET form with consumer-supplied action and query-parameter name. Input is trimmed, blank submission is rejected, and opening search closes the mobile menu (and vice versa). No production search endpoint or callback contract is embedded.

The approved GMA logo is copied from the recorded source into a versioned package asset during implementation; the component never hotlinks the production URL. Search, close, and social icons use individually imported Font Awesome Free SVG definitions. The menu trigger uses a small local inline SVG matching the live 3-by-3 solid-square `glyph-icon icon-menu-grid`; the verified production glyph is Fontello rather than Bootstrap Glyphicon, but no legacy font is loaded. No hosted Kit, CDN script, remote font, or Pro credential is required. Package license/attribution files remain present in the distributed artifact as required.

Social configuration supports the approved `facebook`, `twitter`/`x`, `instagram`, `youtube`, `viber`, and `rss` identifiers. `socialPreset` selects `entertainment` (default), `news`, or `none`; `socialLinks` applies serializable patches. A patch with an existing stable ID overrides that entry in place, `hidden: true` removes it, and a new ID appends in supplied order. New links require a label and use either a supported icon-name string or the generic link icon. Only HTTPS URLs render. Rendering is a pure link concern; the legacy `social_ribbon_click()` function and all analytics side effects are intentionally omitted.

## Decisions

| ID | Requirement | Proposed decision | Alternative | Rationale | Approval |
| --- | --- | --- | --- | --- | --- |
| PH-D01 | PH-R01 | One named `PortalHeader` export plus public types | Legacy mode-specific exports | Stable consumer API | Requirements approved by PH-A10 |
| PH-D02 | PH-R02, PH-R04, PH-R06, PH-R07 | Versioned GMA navigation preset with deterministic patches, consumer search data, approved social presets, and consumer router adapter | Consumer-only navigation or hard-coded mutable globals | Preserves verified destinations/order while allowing consumer control without legacy runtime coupling | Revised/approved by PH-A14/PH-A15 |
| PH-D03 | PH-R03, PH-R09 | CSS responsiveness, full-width dropdown, and narrow client module | Off-canvas drawer or width branching/package-wide client | Production parity and SSR predictability | Revised/approved by PH-A12 |
| PH-D04 | PH-R10 | Local component implementation only | Load/reference legacy runtime | Security and maintainability | Requirements approved by PH-A10 |
| PH-D05 | PH-R11 | Complete vertical unit: source/export/CSS/tests/story/catalog/docs | Documentation later | Required repository policy | Approved by PH-A11 |
| PH-D06 | PH-R02, PH-R10 | Repository-local GMA SVG plus individual Font Awesome Free SVG imports | Hotlinked logo, hosted Kit/CDN, webfont, or custom icon set | Preserves approved branding without runtime network coupling and limits bundle size | Approved by PH-A07 |
| PH-D07 | PH-R02, PH-R06 | Configurable semantic social anchors for the six observed types, with no tracking hook | Inline `onclick`, `CUSTOM_ANALYTICS`, mutable inline URLs, or opaque CSS-only controls | Preserves social navigation while enforcing the approved analytics boundary and accessibility requirements | Approved by PH-A08 |
| PH-D08 | PH-R02 | Immutable Entertainment/News preset data plus deterministic stable-ID patching | Force consumers to repeat all defaults or mutate shared arrays | Preserves current URLs while enabling safe override, removal, and extension without order ambiguity | Approved by PH-A09 |
| PH-D09 | PH-R02, PH-R03 | Recreate the live header with clean scoped CSS and existing React state: compact dark sticky bar, configurable accent, 1195px inner width, desktop actions, and responsive full-width dropdown | Copy the legacy stylesheet/markup or retain the neutral two-row design | Matches the requested production appearance without importing Fontello, remote fonts, jQuery, SSO/account, or analytics coupling | Approved by PH-A12/PH-A13 |
| PH-D10 | PH-R02, PH-R03 | Store 16 immutable GMA navigation defaults in reference order; resolve stable-ID overrides/hides/appends; lay out desktop as 1+3 top-to-bottom columns and keep the mobile panel scrollable | Keep five synthetic preview links or reorder by row | Makes every approved link visible and preserves the production sequence | Approved by PH-A14/PH-A15 |
| PH-D11 | PH-R02, PH-R03, PH-R10 | Replace `faGrip` with a local nine-solid-square SVG matching the verified live menu-grid glyph | Load Fontello/Bootstrap font or retain rounded Font Awesome dots | Matches the requested visual while preserving local, dependency-minimal, accessible rendering | Approved by PH-A16/PH-A17; corrected by PH-A18 |
| PH-D12 | PH-R03, PH-R08 | Calculate dropdown focus boundaries from currently visible focusable elements and handle outside closure after the click default action before restoring the trigger | Include responsive-hidden controls in the boundary or close on pointer-down | Prevents desktop focus escape and prevents the completed pointer sequence from overriding restored trigger focus | PH-VF03 pre-review correction within PH-A11 focus-lifecycle scope |

## Migration/recovery

Map legacy modes to fixture/config objects; do not preserve DOM classes or globals as public API. Existing production header remains until a separately approved consumer migration. Rollback removes the consumer integration or reverts the package release.

## Approval

Requirements, assets, adapters, compatibility, and tests were finalized by PH-A10/PH-A11. PH-A12/PH-A13 approve production visual alignment; PH-A14/PH-A15 approve complete ordered navigation defaults; PH-A16/PH-A17 approve the local menu-grid replacement, PH-A18 corrects its cells to solid squares, and PH-A19 corrects the logo-label optical alignment. Git delivery, release, merge, and deployment remain separately gated.
