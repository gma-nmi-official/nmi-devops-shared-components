# Requirements Document

## Introduction

The Portal_Header is the GNO revamp header displayed at the top of the GMA portal. It contains the GMA logo, the News_Text wordmark, and the revamp menu control. The component is revamp-only; it does not expose a legacy/non-revamp variant. Navigation uses the default menu data from the supplied production reference. Account/SSO integration, GA/analytics integration, and the CookieNotification/cookie-agreement UI are explicitly excluded. The News_Text font style is updated to Inter_Semi_Bold (`font-weight: 600`). All other in-scope visual behavior, layout, colors, icons, spacing, and accessibility should remain compatible with the revamp reference.

---

## Glossary

- **Portal_Header**: The slim, full-width dark bar at the top of every page on GMA News Online. In its desktop responsive layout, it contains the GMA logo, the "News" text, the Social_Media_Icon_Set, utility icons, and a red bottom border. In its mobile responsive layout, it hides the Social_Media_Icon_Set, retains the GMA logo and News_Text wordmark, and displays the Grid_Menu_Icon as its only utility/navigation icon control.

- **News_Text**: The word "News" displayed in white immediately to the right of the GMA logo. In this revision, its font is updated to Inter Semi Bold.

- **Social_Media_Icon_Set**: The Facebook, Twitter/X, Instagram, YouTube, Viber, and RSS icon links displayed in the Portal_Header desktop responsive layout.

- **Grid_Menu_Icon**: The grid/menu utility icon displayed in the Portal_Header desktop and mobile responsive layouts.

- **Inter_Semi_Bold**: The Inter font family at font-weight: 600. The target typeface for the News_Text in this revision.

- **Self_Hosted_Inter_600_Asset**: The self-hosted Inter font asset containing only the 600 weight used to render Inter_Semi_Bold.

- **Font_Preload**: The resource preload for the Self_Hosted_Inter_600_Asset that starts loading the asset before the Portal_Header needs it.

- **Font_Fallback**: The system sans-serif font stack (e.g., Arial, Helvetica, sans-serif) used to render the News_Text if Inter fails to load.
- **Default_Navigation_Menu**: The default GNO menu data represented by the reference `secondary` menu: Home, News, Entertainment, Lifestyle, Sparkle, Radio, Music, Pictures, GMA Pinoy TV, Kapuso Foundation, Regional TV, Corporate, GMA Play, GTV, GMA Affordabox, and GMA Now. External-target behavior for GMA Affordabox and GMA Now is preserved.
- **Component_Scoped_Font_Asset**: The Inter 600 WOFF2 asset shipped by `nmi-devops-shared-components` and used only by Portal_Header through a component-scoped font-family/token or class boundary.
- **CookieNotification**: The separate cookie-consent banner and privacy-policy interaction found in the legacy `header.js`; it is not part of Portal_Header.

---

## Requirements

### Requirement 0: Revamp-only component boundary

The Portal_Header SHALL represent the GNO revamp header only. It SHALL NOT expose a legacy/non-revamp variant prop or include account/SSO behavior, GA/analytics behavior, or unrelated portal modes. The public API SHALL use named configuration for consumer-owned links and callbacks without requiring those integrations.

### Requirement 0.1: Default navigation

The Portal_Header SHALL render the Default_Navigation_Menu when no consumer menu override is provided. The default labels, relative paths, ordering, and external targets SHALL match the reference `secondary` menu. Menu data SHALL be replaceable by the consuming repository without modifying package source.

### Requirement 0.3: Link behavior and cookie-agreement exclusion

The GMA logo SHALL link to the configured GMA home URL. Default navigation SHALL preserve the reference labels, relative paths, order, and targets; GMA Affordabox and GMA Now SHALL open in a new browsing context as in the reference. The component SHALL not render, initialize, import, or depend on CookieNotification, consent cookies, NPC seal assets, the privacy-policy agreement banner, or any cookie-agreement analytics.

### Requirement 0.2: Component-scoped bundled font

The Inter 600 asset SHALL be bundled inside `nmi-devops-shared-components`, scoped to Portal_Header, and SHALL NOT become a global font rule for consuming applications. Consumers SHALL receive the required font behavior by importing the Portal_Header package/style contract; they SHALL NOT need to host or preload the asset themselves. The component SHALL use `font-display: swap` and a system fallback.

### Requirement 1: Update News Text Font to Inter Semi Bold

The News_Text must be rendered in Inter_Semi_Bold (`font-family: Inter; font-weight: 600`) at every responsive breakpoint. Inter_Semi_Bold must be delivered only through the Self_Hosted_Inter_600_Asset, and the Font_Preload must start loading that asset before the Portal_Header needs it. The Self_Hosted_Inter_600_Asset must use `font-display: swap` so the Portal_Header is not blocked from rendering. The color (white) and size of the News_Text must remain unchanged from the current production implementation. If Inter_Semi_Bold fails to load, the News_Text must use Font_Fallback while preserving the Portal_Header layout. Visual sign-off for the News_Text update must verify the specified Inter font family and 600 weight; a target-state reference image is not required. The apparent mobile/desktop wordmark difference in the baseline image is a capture artifact and is not a viewport-specific typography requirement. This update gives the Portal_Header a fresher typographic feel while preserving the established brand identity.

---

### Requirement 2: Non-Regression — All Other Portal Header Elements Remain Unchanged

All aspects of the in-scope revamp Portal_Header not explicitly covered by Requirement 1 must remain compatible with the current revamp production implementation — including layout, spacing, background color, logo asset, icon behavior, menu behavior, and accessibility — so that this revision introduces no unintended changes beyond the News_Text font update and package integration. The supplied reference must be treated as the source of truth when the earlier prose conflicts with the compiled revamp CSS; specifically, revamp CSS hides social/search controls and removes the generic border rule. The visual and responsive behavior of those unchanged elements must be verified against `reference_images/desktop_and_mobile.png` when that reference image is supplied.
