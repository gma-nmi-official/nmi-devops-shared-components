# NMI DevOps Shared Components

Reusable React 19 components for GNO portal applications. Import the required
stylesheet once at the application root.

## Google Analytics

`createGoogleAnalytics` is a consent-aware GA4 integration supporting direct
`gtag.js` and GTM `dataLayer` transports. It queues events only while consent
is unknown, never loads provider scripts, and does not retry failed sends.

```tsx
import { createGoogleAnalytics } from "nmi-devops-shared-components";

const analytics = createGoogleAnalytics({
  transport: { type: "gtag", gtag }, measurementId: "G-EXAMPLE",
  consent: "unknown", portalSection: "News",
});
analytics.setConsent("granted");
analytics.trackPageView({ page_title: document.title });
analytics.trackClick({ content_id: "story-card" });
```

The consumer owns provider loading, consent policy, route page views, and data
classification. See `docs/consumer-setup.md` for GTM, SSR, and dimension guidance.

```tsx
import { PortalHeader } from "nmi-devops-shared-components";
import "nmi-devops-shared-components/styles.css";
```

## Ad Slot

`AdSlot` provides a small provider-agnostic lifecycle for rectangular display
ads (`mrec`, `leaderboard`, or `custom`). Consumers own consent, eligibility,
GPT initialization, service-wide lazy loading, targeting, full ad unit paths,
and every permitted size. A format label never supplies inventory defaults.

Consumers must load GPT themselves before creating the provider:

```html
<script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
<script>
  window.googletag = window.googletag || { cmd: [] };
</script>
```

The package does not inject this third-party script or select production
inventory. Create `createGptAdProvider({ googletag })` from a client component
after the host has initialized `window.googletag`.

```tsx
import { AdSlot, createGptAdProvider, type AdPlacementConfig } from "nmi-devops-shared-components";

const config: AdPlacementConfig = {
  key: "sidebar-mrec",
  format: "mrec",
  reservedSize: [300, 250],
  rules: [{ minWidth: 0, adUnitPath: "/123/news/sidebar", sizes: [[300, 250]] }],
};

<AdSlot config={config} enabled={hasAdConsent} provider={provider} />;
```

Create `provider` once with `createGptAdProvider({ googletag })` after the host
has initialized GPT. Set `readinessTimeoutMs` when the host needs a timeout
other than the default 5,000 ms; a timeout is reported as a provider error.
`enabled={false}` prevents provider calls while preserving the configured
reserved space. Rules with `enabled: false` are provider-free and are hidden
for their declared viewport range from the initial server-rendered markup as
well as after hydration. Active rules must cover their declared viewport range
without gaps or overlaps and must contain a full `adUnitPath` plus non-empty
`sizes`. Space is reserved by default; opt into `emptyBehavior: "collapse"`
when empty or error results may collapse. The package quality gate reports raw
and gzip output and enforces an 8 KiB gzip budget for the AdSlot JavaScript.
Never put sensitive or directly identifying data in `targeting`.

## Portal Header

`PortalHeader` is an interactive client entry point that can be rendered from a
Next.js Server Component when all props are serializable. Use a small consumer
Client Component when supplying the optional `renderLink` function.

```tsx
<PortalHeader
  brand={{ sectionLabel: "Entertainment" }}
  primaryNavigation={[{ id: "entertainment", current: true }]}
  socialPreset="entertainment"
  search={{ action: "/search", queryParam: "q", placeholder: "Search" }}
/>;
```

Public configuration groups:

- `brand`: home URL, accessible label, optional logo override, and section label.
- `navigationPreset`: `gma` (default) renders all 16 verified production links
  in reference order; `none` starts with empty navigation.
- `primaryNavigation` / `networkNavigation`: stable-ID patches. Existing IDs
  override in place, `hidden: true` removes a default, and new IDs append in
  supplied order. Current, disabled, internal, external, and new-tab states are
  supported.
- `socialPreset`: `entertainment` (default), `news`, or `none`.
- `socialLinks`: stable-ID patches. Existing IDs override in place,
  `hidden: true` removes a default, and new IDs append in supplied order. Only
  HTTPS social destinations render.
- `search`: optional native GET form with consumer-owned `action` and
  `queryParam`. Input is trimmed and blank submission is rejected.
- `renderLink`: optional router adapter. Standard anchors are the safe default.
- `theme`: optional `accentColor`, `light`/`dark` mode hook, class name, and
  consumer CSS properties. The default accent is the News red `#cc0001`.

The component exports its prop and data types, immutable navigation/social preset
data, `resolvePortalHeaderNavigation`, and `resolvePortalHeaderSocialLinks`. It
contains no account, SSO, GA, generic analytics, or consent integration.

### Next.js router adapter

Functions cannot cross the Next.js Server/Client boundary. Keep the adapter in a
narrow Client Component; the package itself never imports Next.js.

```tsx
"use client";

import Link from "next/link";
import {
  PortalHeader,
  type PortalHeaderLinkRenderProps,
} from "nmi-devops-shared-components";

const renderLink = ({ children, href, ...props }: PortalHeaderLinkRenderProps) => (
  <Link href={href} {...props}>{children}</Link>
);

export function SiteHeader() {
  return <PortalHeader renderLink={renderLink} />;
}
```

### JavaScript consumer

```jsx
import { PortalHeader } from "nmi-devops-shared-components";
import "nmi-devops-shared-components/styles.css";

export function SiteHeader() {
  return <PortalHeader primaryNavigation={[{ id: "home", current: true }]} />;
}
```

Use `navigationPreset="none"` when a consumer needs a completely custom menu:

```tsx
<PortalHeader
  navigationPreset="none"
  primaryNavigation={[{ id: "home", label: "Home", href: "/" }]}
/>
```

### Styling and accessibility

The default is the production-compatible compact dark GMA header with all 16
production links in a full-width responsive dropdown. Desktop uses one primary
plus three network columns in top-to-bottom reference order; mobile uses two
columns in a scrollable panel. Override `--gno-portal-header-background`,
`--gno-portal-header-panel`, `--gno-portal-header-text`,
`--gno-portal-header-accent`, `--gno-portal-header-border`,
`--gno-portal-header-inner-width`, and the desktop/mobile height variables on the
`.gno-portal-header` component root after importing the package stylesheet. These
defaults are declared on the component root, so an ancestor-only custom property
does not override them. The text token controls the section label, navigation
links, action buttons, and social links. The font stack uses
`Arial, Helvetica, sans-serif`, and the package does not load fonts remotely.
Consumers may provide a different font through their own styles. Preserve
meaningful link labels and the visible focus styles. Manual
verification at supported viewports, 200% zoom, and with a screen reader remains
part of consumer acceptance.

Font Awesome and logo notices are in `THIRD_PARTY_NOTICES.md`. The menu-grid
control is a repository-local inline SVG matching the live solid-square glyph and
does not load Fontello or Bootstrap. The versioned logo asset is also exported as
`nmi-devops-shared-components/assets/gma-header-logo.svg`; the component default
is embedded locally and performs no runtime asset request.

See the repository's `docs/consumer-setup.md`, `docs/portal-header-migration.md`,
catalog, and dedicated Storybook stories for complete integration guidance.

## Cookie Agreement

`CookieAgreement` is a standalone fixed-bottom privacy notice. It stays hidden
until the configurable scroll threshold is reached, then slides up into view;
it persists only an explicit `I AGREE` acceptance,
and has no Google Analytics or generic analytics integration. Reject is hidden
by default; when enabled it only dismisses the notice for the current page
session and the notice returns after refresh.

```tsx
import { CookieAgreement } from "nmi-devops-shared-components";
import "nmi-devops-shared-components/styles.css";

<CookieAgreement policyVersion="2026-01" scrollRevealThreshold={0.1} />;
```

The default `FIND OUT MORE` URL is
`https://www.gmanetwork.com/privacypolicy/`. The optional repository-local NPC
seal links to `https://www.gmanetwork.com/news/privacy-notice/`. Both HTTPS
destinations are independently configurable. Provide a typed `ConsentStore` to
persist acceptance with the approved host-only `gno_cookie_consent` adapter
defaults. The component does not classify or enforce consumer cookies/services;
that remains the consumer application's responsibility. Remote seal asset URLs
are rejected; artwork must be packaged locally by the consumer.
