# User Stories and Acceptance Criteria — Portal Header

## Scope decisions

- This is the GNO revamp header only; no legacy/non-revamp variant is required.
- Account/SSO and GA/analytics are out of scope for this component revision.
- Cookie agreement/consent notification, NPC seal, privacy-policy banner, and consent analytics are out of scope for this component revision.
- Default navigation follows the reference `secondary` menu and remains consumer-overridable.
- Inter 600 is bundled and scoped to Portal_Header inside `gno-shared-components`.

## US-1: News Text Renders in Inter Semi Bold

**As a** visitor to GMA News Online,
**I want** the "News" text in the Portal Header to appear in Inter Semi Bold,
**So that** the header reflects the updated brand typography.

### Acceptance Criteria

1. THE News_Text SHALL be rendered using `font-family: 'Inter', sans-serif` and `font-weight: 600` (Semi Bold).
2. THE News_Text color SHALL remain white — no color change is introduced in this revision.
3. THE News_Text font size SHALL remain the same as the current production implementation — no size change is introduced in this revision.
4. THE Inter_Semi_Bold SHALL be delivered only through the Self_Hosted_Inter_600_Asset, and the Font_Preload SHALL start loading that asset before the Portal_Header needs it.
5. THE Self_Hosted_Inter_600_Asset SHALL use `font-display: swap` so that it does not block the Portal_Header from rendering.
6. THE Cumulative Layout Shift (CLS) attributable to the swap from Font_Fallback to Inter_Semi_Bold SHALL be below 0.1.
7. IF Inter fails to load, THEN THE News_Text SHALL fall back to the Font_Fallback stack and the Portal_Header layout SHALL remain intact with no overflow or wrapping.
8. THE News_Text target state SHALL be verified by confirming the specified Inter font family and 600 weight; a target-state reference image SHALL NOT be required.
9. THE News_Text SHALL use Inter_Semi_Bold at font-weight 600 at every responsive breakpoint; no viewport-specific font-family or font-weight difference SHALL be introduced.

---

## US-2: Non-Regression — Portal Header Remains Identical Outside the Font Change

**As a** visitor to GMA News Online,
**I want** everything in the Portal Header to look and behave exactly as it does today — except for the "News" text font,
**So that** this revision introduces no unintended visual or functional changes.

### Acceptance Criteria

1. THE GMA logo asset, position, and link (`https://www.gmanetwork.com/`) SHALL be unchanged.
2. WHEN the revamp Portal_Header is displayed, the logo, wordmark, menu control, background, spacing, and responsive behavior SHALL match the revamp reference.
3. The component SHALL render the Default_Navigation_Menu when no override is passed, including the reference labels, paths, order, and external targets.
4. The component SHALL NOT initialize or require account/SSO or GA/analytics integrations.
5. The component SHALL NOT render or initialize CookieNotification, consent cookies, NPC seal assets, privacy-policy agreement controls, or consent analytics.
6. The Inter asset SHALL be loaded from the package and scoped to Portal_Header without changing the consuming application's global typography.
7. The Portal_Header SHALL pass accessibility checks — landmark markup, semantic menu control, keyboard navigation, focus indicators, and color contrast.
8. The Portal_Header visual and responsive behavior outside the News_Text font change SHALL be verified against `reference_images/desktop_and_mobile.png` when supplied.
