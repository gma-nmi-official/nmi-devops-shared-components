# Consumer setup

This guide explains how a JavaScript or TypeScript application consumes the published GNO component package.

## 1. Install the package

Download the approved `.tgz` asset from the private GitHub Release, then install it in the consumer application. Set `GH_TOKEN` to a token authorized to read the repository and keep it in the consumer's CI secret store:

```bash
  gh release download v1.4.0 \
  --repo gma-nmi-official/nmi-devops-shared-components \
  --pattern 'nmi-devops-shared-components-1.4.0.tgz'
npm install ./nmi-devops-shared-components-1.4.0.tgz
```

The example uses the proposed current minor release, `v1.4.0`. Do not commit the token. The installed package and import name remain `nmi-devops-shared-components`.

## 2. Import the component and styles

Import components through the package's public named exports. Do not import internal files from `packages/ui/src`.

```tsx
import { PortalHeader } from "nmi-devops-shared-components";
import "nmi-devops-shared-components/styles.css";
```

The stylesheet import is required for the package tokens and component-scoped styles.
Portal Header defaults to the production-compatible compact dark GMA bar. Use
`theme.accentColor` or `--gno-portal-header-accent` for the consumer section
color; the package never loads the legacy stylesheet or a remote font.

## 3. Use it in a Next.js application

`PortalHeader` is an interactive client entry point and can be rendered from a
Server Component when its props contain only serializable data.

```tsx
import { PortalHeader } from "nmi-devops-shared-components";

export default function Page() {
  return <PortalHeader primaryNavigation={[{ id: "home", current: true }]} />;
}
```

The default `gma` navigation preset contains all 16 verified production links in
reference order. `primaryNavigation` and `networkNavigation` patch defaults by
stable ID, support `hidden: true`, and append new IDs. Set
`navigationPreset="none"` to supply a completely custom menu.

If the consumer supplies a Next.js `Link` adapter, define it in a narrow Client
Component because function props cannot cross the Server/Client boundary:

```tsx
"use client";

import Link from "next/link";
import { PortalHeader, type PortalHeaderLinkRenderProps } from "nmi-devops-shared-components";

const renderLink = ({ children, href, ...props }: PortalHeaderLinkRenderProps) =>
  <Link href={href} {...props}>{children}</Link>;

export function SiteHeader() {
  return <PortalHeader renderLink={renderLink} />;
}
```

Keep application routes, data fetching, authentication, analytics, and other integrations in the consuming application unless the component contract explicitly says otherwise.

### Configure Google Analytics

`createGoogleAnalytics` supports direct `gtag.js` and GTM `dataLayer` adapters;
the package does not inject provider scripts. Consumers own consent policy,
route page views, and sensitive-data classification.

```tsx
"use client";
import { createGoogleAnalytics } from "nmi-devops-shared-components";

const analytics = createGoogleAnalytics({
  transport: { type: "gtag", gtag: window.gtag }, measurementId: "G-EXAMPLE",
  consent: "unknown", portalSection: "News",
});
analytics.setConsent("granted");
analytics.trackPageView({ page_title: document.title });
```

Use `{ type: "gtm", dataLayer: window.dataLayer }` for GTM. Unknown consent
queues up to 100 events for five minutes; denied drops events and granted
flushes them FIFO. The factory is safe to import during SSR.

### Configure display ads

`AdSlot` is a client component with an injected provider. The consumer must load
and initialize GPT, configure service-wide lazy loading, decide consent and
eligibility, and supply the complete ad unit path and non-empty size list for
every active responsive rule. The component does not infer inventory from
`format`.

Load GPT from the consumer application. The shared package does not inject this
third-party script or choose inventory for you:

```html
<script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
<script>
  window.googletag = window.googletag || { cmd: [] };
</script>
```

In a client component, create the provider after the consumer has initialized
`window.googletag`:

```tsx
"use client";

import { AdSlot, createGptAdProvider, type AdPlacementConfig } from "nmi-devops-shared-components";

const config: AdPlacementConfig = {
  key: "article-leaderboard",
  format: "leaderboard",
  reservedSize: [970, 250],
  rules: [
    { minWidth: 0, maxWidth: 767, enabled: false },
    { minWidth: 768, maxWidth: 1199, adUnitPath: "/123/news/tablet", sizes: [[728, 90]] },
    { minWidth: 1200, adUnitPath: "/123/news/desktop", sizes: [[970, 250], [970, 90]] },
  ],
};

const provider = createGptAdProvider({ googletag: window.googletag });

export function ArticleAd({ hasAdConsent }: { hasAdConsent: boolean }) {
  return <AdSlot config={config} enabled={hasAdConsent} provider={provider} />;
}
```

Use `emptyBehavior: "collapse"` only when layout movement is acceptable. The
default reserve behavior requires `reservedSize`. Keep user IDs and other
sensitive values out of targeting. Tests and documentation should use a fake
provider and must not request the live GPT script.

## 4. Find component-specific guidance

Run the showcase and open `/catalog` to choose a dedicated guide for each
approved component or integration. Every guide includes:

- purpose and supported states
- public props, events, and configuration
- JavaScript and TypeScript examples
- responsive and accessibility notes
- stylesheet and installation requirements
- link to its dedicated Storybook story

The deployed `/docs` route is the interactive component reference. `/catalog`
is the consumer onboarding index, with durable pages at
`/catalog/portal-header`, `/catalog/cookie-agreement`, `/catalog/ad-slot`, and
`/catalog/google-analytics`.

Portal Header migration from the legacy widget is documented in
[`portal-header-migration.md`](portal-header-migration.md).

## 5. Keep versions predictable

Use the package version shown in the component catalog. Follow the package changelog when upgrading. Breaking prop, export, token, or behavior changes require migration notes.
