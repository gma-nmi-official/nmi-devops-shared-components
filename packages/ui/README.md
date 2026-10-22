# NMI DevOps Shared Components

Reusable React 19 components for GNO portal applications. Import the required
stylesheet once at the application root.

```tsx
import { PortalHeader } from "nmi-devops-shared-components";
import "nmi-devops-shared-components/styles.css";
```

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
links, action buttons, and social links. The font stack starts with `Open Sans` but the package
does not load it remotely; consumers may provide it, otherwise local fallbacks
are used. Preserve meaningful link labels and the visible focus styles. Manual
verification at supported viewports, 200% zoom, and with a screen reader remains
part of consumer acceptance.

Font Awesome and logo notices are in `THIRD_PARTY_NOTICES.md`. The menu-grid
control is a repository-local inline SVG matching the live solid-square glyph and
does not load Fontello or Bootstrap. The versioned logo asset is also exported as
`nmi-devops-shared-components/assets/gma-header-logo.svg`; the component default
is embedded locally and performs no runtime asset request.

See the repository's `docs/consumer-setup.md`, `docs/portal-header-migration.md`,
catalog, and dedicated Storybook stories for complete integration guidance.
