# Reference analysis: Cookie Agreement

## Sources

| Asset | Revalidated response on 2026-10-23 | SHA-256 |
| --- | --- | --- |
| [header.js](https://aphrodite.gmanetwork.com/assets/revamp/js/build/widgets/header.js) | HTTP 200; 71,940 characters; Cookie Agreement extraction limited to the `CookieNotification` module | `08b31fd1fce2e14574b0803230277c0593c575a6781ea7f218c86e5a18900c9a` |
| [header_style.css](https://aphrodite.gmanetwork.com/assets/revamp/css/build/widgets/header_style.css) | HTTP 200; 27,862 characters; extraction limited to `.ckn-*` rules | `420adf761b87df74d786bb03a6220b2e855204925b7cf0c3965f06a9dc7237e5` |
| [GNO NPC seal](https://images.gmanetwork.com/res/img/gno-npc-seal.webp) | HTTP 200; `image/webp`; 17,024 bytes; 230×400 px; Last-Modified `Fri, 26 Sep 2025 02:44:13 GMT` | `e1a103d1b30eabc11bb52af59571920046e0277fac1a70c8c5ee4ccb7f7a2238` |

These mutable assets are behavior/visual references only. Header navigation,
search, account, SSO, social, advertising, analytics, and unrelated shared rules
are outside the Cookie Agreement reference scope.

The GNO NPC seal is the selected visual reference for optional seal artwork.
It is not an approved runtime dependency: redistribution rights and the final
repository path must be recorded before implementation/release, and consumers
must never load it from the reference URL at runtime.

The approved destinations are separate and configurable:

- NPC seal default:
  [`https://www.gmanetwork.com/news/privacy-notice/`](https://www.gmanetwork.com/news/privacy-notice/),
  verified HTTP 200 with title `Privacy Notice | GMA News Online` on 2026-10-23.
- `FIND OUT MORE` default:
  [`https://www.gmanetwork.com/privacypolicy/`](https://www.gmanetwork.com/privacypolicy/),
  verified HTTP 200 on 2026-10-23.

Consumers may configure another approved absolute HTTPS destination for either
link. Changing one destination does not implicitly change the other.

## Cookie Agreement style extraction

The relevant `.ckn-*` rules establish the following legacy visual reference:

- A full-width surface fixed to the viewport bottom, above page content, with a
  5 px red top edge, translucent dark background, white text, and at least 70 px
  height.
- A hidden-to-visible entrance using vertical translation and opacity over
  0.8 seconds.
- A centered wrapper with 10 px padding. At 768 px and below the reference uses
  a 650 px maximum wrapper, a 20% seal column, an 80% copy column, and a
  full-width action row. At 769 px and above it uses a 1360 px maximum wrapper
  split approximately 5% seal, 65% copy, and 30% actions.
- White-on-red action surfaces with rounded corners, minimum 100 px width, and
  separate mobile/desktop spacing.
- `Ubuntu` followed by system fallbacks and separate mobile/desktop type sizes.

These values describe the reference, not final approved tokens. The new component
may preserve the recognizable dark surface, red accent, bottom placement,
responsive grouping, and optional seal position while using namespaced classes,
package design tokens, visible focus treatment, safe-area spacing, content-driven
height, reduced motion, and repository-local assets. It must not import the
reference stylesheet or its remote font declarations.

## Cookie Agreement JavaScript extraction

- The isolated `CookieNotification` module targets `body`, can be disabled by the
  global `COOKIE_NOTIFICATION` flag, and checks `_ckn=1` through js-cookie or a
  raw `document.cookie` substring.
- When consent is absent, it waits for the first click, key, touch, or a scroll
  exceeding 10% of viewport height before injecting the notice.
- Injected content contains an NPC seal, explanatory copy, an `I AGREE` action,
  and a `FIND OUT MORE` link to
  `https://www.gmanetwork.com/privacypolicy`. The seal switches between remote
  mobile and desktop WebP files at 768 px.
- Agreement writes `_ckn=1` for 365 days, animates/removes the notice after
  500 ms, emits analytics, and triggers `CookieNotification:agreed`.
- Privacy and seal activation also emit analytics; the seal performs direct
  navigation to the privacy policy.
- The implementation depends on jQuery, js-cookie/global browser state, direct
  DOM insertion, global IDs/selectors, and analytics globals. It exposes no
  reject, preferences, categories, policy version, documented revocation, or
  storage-failure contract.

## New-design implications

- Use only the isolated Cookie Agreement presentation and behavior observations;
  do not copy or depend on the surrounding Portal Header module or stylesheet.
- Legacy timing, wording, cookie, and 768 px breakpoint are observations, not
  approved privacy or responsive requirements.
- The latest approved interaction supersedes the legacy scroll reveal: when a
  decision is required, keep the surface fixed at the viewport bottom and make
  it visible immediately. Only `I AGREE` persists acceptance; an enabled Reject
  action is a session-only dismissal and the surface returns after refresh.
- Persistent Reject policy is deferred. The consumer cookie/service inventory,
  Accept scope, and any future non-essential/essential enforcement model require
  privacy/legal approval.
- Use semantic buttons for consent decisions and a validated link for privacy
  navigation; do not reproduce action anchors with empty `href` values or
  global element IDs.
- Use a controlled component and typed persistence adapter; do not carry jQuery,
  globals, DOM injection, hard-coded `_ckn` persistence, custom document events,
  or the observed analytics behavior into Cookie Agreement. GA belongs to a
  separate future component.
- Store every approved logo, icon, font, seal, and artwork file used by the component in this repository. Record each asset source and redistribution right before release.
- If the NPC seal is included, preserve its intrinsic 230:400 aspect ratio and
  render it as an accessible link to the configured seal privacy destination. Its
  accessible name, keyboard behavior, and navigation must be tested.
