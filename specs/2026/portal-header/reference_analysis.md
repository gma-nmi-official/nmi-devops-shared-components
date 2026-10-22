# Reference analysis: Portal Header

## Sources

| Asset | Recorded response on 2026-10-12 | SHA-256 |
| --- | --- | --- |
| [header.js](https://aphrodite.gmanetwork.com/assets/revamp/js/build/widgets/header.js) | HTTP 200; 71,940 characters; Last-Modified `Mon, 05 Oct 2026 04:00:11 GMT` | `08b31fd1fce2e14574b0803230277c0593c575a6781ea7f218c86e5a18900c9a` |
| [header_style.css](https://aphrodite.gmanetwork.com/assets/revamp/css/build/widgets/header_style.css) | HTTP 200; 27,862 characters; Last-Modified `Tue, 09 Dec 2025 05:40:09 GMT` | `420adf761b87df74d786bb03a6220b2e855204925b7cf0c3965f06a9dc7237e5` |
| [gma-header-logo.svg](https://aphrodite.gmanetwork.com/gma-header-logo.svg) | User-selected asset; verified 2026-10-20 as HTTP 200, `image/svg+xml`, 1,659 UTF-8 bytes; Last-Modified `Sun, 08 Jun 2025 07:04:54 GMT` | `4265686660c12d10f6954d8dec60884933d680f10dd79a4ff7a76c016d62f39a` |
| [header.min.js?v=2.2.4](https://images.gmanetwork.com/res/dist/js/header.min.js?v=2.2.4) | Verified 2026-10-20 as HTTP 200, `application/javascript`, 2,352 bytes; Last-Modified `Tue, 09 Aug 2022 05:43:44 GMT` | `f52d80c8408e1a090992f244fb3a773dc504dbe0db6c2389becc92e69f69d995` |

These mutable assets are behavior/visual references only.

PH-A07 promotes the verified logo to an approved implementation input. The implementation must copy and re-verify it rather than loading the mutable URL at runtime. A static safety scan found no script, event-handler attribute, external HTTP reference, or `foreignObject`; implementation review must still inspect the committed copy.

## Observed behavior

- Fixed responsive header with GMA branding, section labels, primary/network navigation, social links, search, account/SSO hooks, modes, and themes.
- Mobile menu overlay, body-scroll changes, resize handling, outside-click close, and two/four-column link presentation.
- Mode-specific search endpoints and analytics for logo, menu, navigation, social, and search interactions.
- Legacy coupling to jQuery, globals, injected markup, hard-coded routes/assets, EntSSO, analytics globals, and a dynamic `eval` path.

### Social reference behavior

- `header.min.js?v=2.2.4` defines `social_ribbon_click(label)` only as a call to `CUSTOM_ANALYTICS.ga_click_event`; it does not render icons, define destinations, or control navigation.
- The associated production markup contains ordinary `_blank` anchors for Facebook, Twitter, Instagram, YouTube, Viber, and RSS. Their destinations and order are hard-coded; icons are empty `div` elements styled through legacy CSS classes.
- The legacy links have no accessible labels and no explicit safe `rel` value. PH-A08 preserves only navigation/link behavior and explicitly excludes the analytics helper, inline `onclick`, mutable inline URL construction, and inaccessible icon-only markup. PH-A09 separately approves reviewed immutable URL presets.
- `header.js` defines separate Entertainment and News social arrays. PH-A09 adopts their destinations as immutable package presets, normalizes protocol-relative URLs to HTTPS, and adds deterministic override/hide/append behavior instead of exposing mutable legacy arrays.

## New-design implications

- Use serializable navigation/branding/search configuration and explicit React state.
- Use semantic header/nav/buttons, deterministic IDs, focus return, Escape handling, and `aria-expanded`/`aria-controls`.
- Inject routing through a typed adapter. Do not carry the observed account/SSO or analytics behavior into Portal Header; separate components own those concerns.
- Do not reproduce jQuery, globals, dynamic evaluation, remote runtime dependencies, or consumer-specific routes.
- Store approved brand artwork, icons, fonts, and related visual assets in this repository. Record their source and redistribution rights before package release.

## Live visual audit: 2026-10-21

The user selected the live `https://www.gmanetwork.com/news/` header plus `header_style.css` as the visual and interaction baseline. Browser-computed measurements were taken at the live page rather than inferred only from the minified stylesheet because other production styles may override it.

| Element | 1440px viewport | 375px viewport |
| --- | --- | --- |
| Top bar | approximately `51px`; `#2e2e2e`; `2.4px #cc0001` bottom border | approximately `42px`; same background/accent |
| Inner content | centered `1195px` | `96%` width |
| Brand | `66x40` logo and white `15px` News label; label visual center is `5px` below the antenna-inclusive logo box center | same logo/label scale and `5px` optical offset |
| Actions | six social icons, search, grid toggle | grid toggle only |
| Open menu | full-width, approximately `180px`, four navigation columns | full-width scrollable panel, two columns, search and social icons inside |

The implemented pre-PH-A12 candidate instead measured approximately `126px` on desktop, used a white two-row layout, displayed navigation persistently, and opened a right-side drawer. PH-A12 therefore represents a material visual/interaction revision. Implementation must reproduce the measured structure with scoped React/CSS while excluding the reference's Fontello/remote-font, old-browser, jQuery, account/SSO, analytics, and consumer-global coupling.

The live desktop menu trigger was rechecked on 2026-10-21. Its DOM is `<span class="glyph-icon icon-menu-grid">`, computed from Fontello code point `U+E836` at `21px`. The user's larger local/actual comparison under PH-A18 corrected the initial small-raster interpretation: the glyph is nine solid white square cells separated by dark gaps, not outlined cells and not Bootstrap `glyphicon-th`. The Fontello exclusion remains; only this visual is recreated as a local inline SVG, superseding `faGrip`.

The brand alignment was rechecked after PH-A19 at both desktop and `375px` widths. Production positions the label center approximately `5px` below the `66x40` logo image-box center. This aligns the text with the visible blue GMA wordmark while accounting for the antenna artwork above it; exact flex-box center alignment is therefore visually incorrect.
