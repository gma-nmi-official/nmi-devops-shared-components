# Reference analysis: Portal Header

## Sources

| Asset | Recorded response on 2026-10-12 | SHA-256 |
| --- | --- | --- |
| [header.js](https://aphrodite.gmanetwork.com/assets/revamp/js/build/widgets/header.js) | HTTP 200; 71,940 characters; Last-Modified `Mon, 05 Oct 2026 04:00:11 GMT` | `08b31fd1fce2e14574b0803230277c0593c575a6781ea7f218c86e5a18900c9a` |
| [header_style.css](https://aphrodite.gmanetwork.com/assets/revamp/css/build/widgets/header_style.css) | HTTP 200; 27,862 characters; Last-Modified `Tue, 09 Dec 2025 05:40:09 GMT` | `420adf761b87df74d786bb03a6220b2e855204925b7cf0c3965f06a9dc7237e5` |

These mutable assets are behavior/visual references only.

## Observed behavior

- Fixed responsive header with GMA branding, section labels, primary/network navigation, social links, search, account/SSO hooks, modes, and themes.
- Mobile menu overlay, body-scroll changes, resize handling, outside-click close, and two/four-column link presentation.
- Mode-specific search endpoints and analytics for logo, menu, navigation, social, and search interactions.
- Legacy coupling to jQuery, globals, injected markup, hard-coded routes/assets, EntSSO, analytics globals, and a dynamic `eval` path.

## New-design implications

- Use serializable navigation/branding/search configuration and explicit React state.
- Use semantic header/nav/buttons, deterministic IDs, focus return, Escape handling, and `aria-expanded`/`aria-controls`.
- Inject routing through a typed adapter. Do not carry the observed account/SSO or analytics behavior into Portal Header; separate components own those concerns.
- Do not reproduce jQuery, globals, dynamic evaluation, remote runtime dependencies, or consumer-specific routes.
- Store approved brand artwork, icons, fonts, and related visual assets in this repository. Record their source and redistribution rights before package release.
