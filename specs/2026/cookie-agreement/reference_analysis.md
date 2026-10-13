# Reference analysis: Cookie Agreement

## Sources

| Asset | Recorded response on 2026-10-12 | SHA-256 |
| --- | --- | --- |
| [header.js](https://aphrodite.gmanetwork.com/assets/revamp/js/build/widgets/header.js) | HTTP 200; 71,940 characters; Last-Modified `Mon, 05 Oct 2026 04:00:11 GMT` | `08b31fd1fce2e14574b0803230277c0593c575a6781ea7f218c86e5a18900c9a` |
| [header_style.css](https://aphrodite.gmanetwork.com/assets/revamp/css/build/widgets/header_style.css) | HTTP 200; 27,862 characters; Last-Modified `Tue, 09 Dec 2025 05:40:09 GMT` | `420adf761b87df74d786bb03a6220b2e855204925b7cf0c3965f06a9dc7237e5` |

These mutable assets are behavior/visual references only.

## Observed legacy behavior

- Fixed bottom notice with dark translucent surface, red accent/actions, privacy link, optional NPC seal artwork, and mobile/desktop layouts around 768 px.
- Appears when `_ckn=1` is absent, after initial click/key/touch or a scroll exceeding roughly 10% of viewport height.
- `I AGREE` writes `_ckn=1` for 365 days, hides/removes the notice, emits analytics, and triggers `CookieNotification:agreed`.
- Privacy/seal actions navigate to `https://www.gmanetwork.com/privacypolicy` and emit analytics.
- No reject, preferences, categories, policy version, documented revocation, or storage failure contract is visible.

## New-design implications

- Legacy timing/copy/cookie are observations, not approved privacy requirements.
- Scrolling, browsing, time, or unrelated clicks must never record a decision.
- Consent semantics, actions, categories, retention, domain/path, SameSite/Secure, policy version, and revocation require privacy/legal approval.
- Use a controlled component and typed persistence adapter; do not carry the observed analytics behavior into Cookie Agreement. GA belongs to a separate future component.
- Store every approved logo, icon, font, seal, and artwork file used by the component in this repository. Record each asset source and redistribution right before release.
