# Consumer setup proposal: Ads component

The package is not implemented yet. Component and provider property names in these examples are proposed pending requirements/design approval.

## Provider ownership

The recommended initial integration has the consuming application load and initialize GPT/GAM once, including its privacy and service configuration. A consumer creates its provider adapter and passes it to each `AdSlot`. The component creates and cleans up individual slots; it does not add scripts or global services.

## MREC

```tsx
<AdSlot
  format="mrec"
  provider={adProvider}
  adUnitPath={env.ads.articleMrec}
  sizes={[
    { minWidth: 0, sizes: [[300, 250], [250, 250]] },
    { minWidth: 1200, sizes: [[300, 250], [336, 280], [250, 250]] },
  ]}
  targeting={approvedPageTargeting}
  label="Advertisement"
  emptySlot="reserve"
/>
```

## Responsive leaderboard

```tsx
<AdSlot
  format="leaderboard"
  provider={adProvider}
  adUnitPath={env.ads.desktopLeaderboard}
  mobileAdUnitPath={env.ads.mobileLeaderboard}
  sizes={[
    { minWidth: 0, sizes: [[320, 100], [320, 50]] },
    { minWidth: 993, sizes: [[728, 90]] },
    { minWidth: 1281, sizes: [[970, 90], [728, 90]] },
  ]}
  targeting={approvedPageTargeting}
  lazyLoad
  label="Advertisement"
/>
```

These examples illustrate the observed reference ranges. Product/monetization owners must approve actual breakpoints, inventory paths, targeting keys, and empty behavior. The consumer must provide a unique container for every placement and avoid mounting both direct legacy markup and the component in the same slot.

## Legacy AllAccess MREC

The reference also has MREC templates that load `deliverjs.nmi` with a zone ID. This draft does not make the shared component inject that partner script. If the AllAccess path is required, approve it as a separate provider adapter and define its lifecycle/security constraints before development.
# Ads component: end-to-end consumer setup (proposal)

This guide describes the proposed consumer integration for the Ads component. The package API and provider adapter are not implemented yet; names and code below are illustrative and must be aligned with the approved design before implementation.

## Confirmed consumer decisions

- Placeholder UI is optional and configurable by the consumer. A consumer that does not want a placeholder may omit it.
- Consumers provide placement configuration, including ad-unit paths, sizes, responsive rules, and targeting. A page may render multiple MREC and multiple leaderboard placements; each rendered placement must have its own provider slot instance/ID.
- The consumer's consent/privacy integration controls whether an ad request is allowed, and the consumer supplies only publisher-approved targeting values.
- Lazy loading and automatic refresh policy remain unresolved; see the open decisions below.

## Verified in-story reference behavior

The `news/res/js/story/story.js` reference inserts an MREC into the article body after a content-selected child (the source comment describes placement after the second paragraph). The MREC slot element ID is `mrec_story_frame_<articleIndex>`. For viewport widths below 768px, the DFP ad-unit name is generated as `GNO_<section>_Article_Mrec_<1..4>`; the suffix cycles through 1–4 using the loaded-MREC counter. In test mode, it switches to `GNO_TEST_Mobile_Mrec1` or `GNO_TEST_Desktop_Mrec1`. Mobile MREC size uses the configured MREC sizes, with the first MREC receiving an expanded size set at 480px and below. The actual consumer must preserve its publisher's section capitalization and test/production mapping; `MRECT_ARTICLE_1` is not the literal name pattern found in this reference.

The same `setWrappedMrec` function separately inserts `.story_native_ads` on narrow mobile viewports (480px and below), subject to the native-ad SAF option. When `GLOBAL_GNO_NATIVE_ADS_ENABLED` is enabled, it loads the AllAccess `deliveraw.nmi` script with a native-ad zone ID. This is a **native ad integration**, separate from the in-body DFP MREC slot; it must not be represented as an MREC placement. Whether the shared Ads component should support this AllAccess native-ad integration remains an explicit scope decision.

## 1. Install and identify the consumer environment

Install the published shared-components package using the consumer application's package manager. Confirm that the application uses a supported React version and identify its Next.js routing model. The ads UI must render from a client component because ad providers use browser APIs and a DOM slot. Keep page content and layout server-rendered where possible.

```tsx
// app/news/page.tsx — Server Component
import { AdPlacements } from './ad-placements';

export default function NewsPage() {
  return <main><ArticleContent /><AdPlacements /></main>;
}
```

```tsx
// app/news/ad-placements.tsx — Client Component
'use client';

import { AdSlot } from 'gno-shared-components/ads';
import { useAdProvider } from './ad-provider';

export function AdPlacements() {
  const provider = useAdProvider();
  return <>
    <AdSlot provider={provider} placement="leaderboard" />
    <AdSlot provider={provider} placement="mrec" />
  </>;
}
```

## 2. Configure inventory and placement rules

The consumer supplies its own ad-unit paths, sizes, responsive rules, and targeting values. Keep publisher inventory identifiers in consumer configuration rather than hard-coding them in the shared UI package. The values below are examples based on the `news` reference and require publisher approval.

```ts
export const adConfig = {
  networkId: '1234567', // replace with the publisher's GAM network
  placements: {
    mrec: {
      adUnitPath: '/1234567/example/mrec',
      sizes: [[300, 250], [250, 250]],
      targeting: { position: 'mrec' },
    },
    leaderboard: {
      adUnitPath: '/1234567/example/leaderboard',
      responsiveSizes: [
        { minWidth: 1280, sizes: [[970, 90], [728, 90]] },
        { minWidth: 993, sizes: [[728, 90]] },
        { minWidth: 0, sizes: [[320, 100], [320, 50]] },
      ],
      targeting: { position: 'leaderboard' },
    },
  },
};
```

Use the actual network and ad-unit paths provisioned for the environment. Do not send sensitive or personal data as ad targeting. Confirm consent/privacy integration and targeting policy with the publisher before enabling requests.

### Where the ad unit value goes

Put the publisher-provisioned ad-unit identifier in the consumer's configuration for each placement. A value such as `GNO_DESKTOP_LEADERBOARD` may be the publisher's inventory/ad-unit code used by its existing integration. Keep that code distinct from the component's semantic placement name (such as `leaderboard`). If the provider adapter calls GPT directly, it may also need the full GAM ad-unit path (for example, `/1234567/news/article/leaderboard`); confirm whether the publisher code is itself the provider path or needs mapping before implementation.

```ts
const placements = {
  articleMrec: {
    placement: 'mrec',
    adUnitName: 'GNO_News_Article_Mrec_1', // reference-derived example; confirm publisher section mapping
    adUnitPath: '/1234567/news/article/mrec', // only if the provider requires a full GPT path
    sizes: [[300, 250]],
  },
  homeLeaderboard: {
    placement: 'leaderboard',
    adUnitName: 'GNO_DESKTOP_LEADERBOARD', // publisher-provisioned code example
    adUnitPath: '/1234567/home/leaderboard', // only if the provider requires a full GPT path
    sizes: [[970, 90], [728, 90]],
  },
};
```

The shared component receives or resolves this consumer-owned placement configuration when defining the provider slot. The exact field (`adUnitName`, `adUnitPath`, or both) depends on the approved provider adapter contract. Storybook should use clearly fake identifiers and a mock provider; never put production inventory IDs in public stories.

## 3. Load and initialize the ad provider once

The consumer owns the GPT/GAM script and service initialization. Load it once at the application level, apply publisher-approved privacy and targeting configuration, and initialize services before placements request slots. Do not load GPT separately in every `AdSlot`. The shared component should receive an initialized provider/adapter and manage its own slot lifecycle only.

Document the provider URL consumers need to load:

- **GPT/GAM:** `https://securepubads.g.doubleclick.net/tag/js/gpt.js` (load from Google's official domain).
- **AllAccess (only if separately approved):** `https://ads.allaccess.com.ph/deliverjs.nmi` (the script URL found in the `news` reference; confirm with the publisher/vendor before use).

These URLs belong in consumer integration documentation and the Storybook setup notes, because the consumer owns third-party script loading. The component API should receive an initialized provider/adapter; it should not require a script URL prop or inject a script per placement. Storybook stories should use a mock provider and must not load these production scripts or issue live ad requests.

```tsx
// app/layout.tsx — application-level provider script/init, loaded once
// Load GPT from its official URL once and use the publisher's approved
// initialization and consent integration here.
```

Create one adapter around the provider API and expose it through a client-side context or pass it to the page. The adapter translates the component's placement configuration into provider slot operations, including define/display, refresh policy, and destroy/cleanup. The exact adapter interface remains subject to design approval.

```ts
// Illustrative only; this proposed API is not implemented.
export const adProvider = createGptAdProvider({
  googletag: window.googletag,
  networkId: adConfig.networkId,
  placements: adConfig.placements,
});
```

## 4. Render each placement where it belongs

Render a placement in the page's content flow. Give each placement a stable unique instance/slot ID if the provider requires one. Use the approved responsive mapping for the consumer's actual design breakpoints.

```tsx
<AdSlot
  provider={adProvider}
  placement="mrec"
  targeting={{ section: 'news' }}
  label="Advertisement"
  reserveSpaceOnNoFill
/>

<AdSlot
  provider={adProvider}
  placement="leaderboard"
  targeting={{ section: 'news' }}
  label="Advertisement"
  reserveSpaceOnNoFill
/>
```

The component should render an accessible ad label and a predictable container. The consumer decides placement location and page-specific targeting. No-fill behavior, reserved dimensions, lazy loading, refresh behavior, and collapse rules must be finalized in the component contract; the example assumes space is reserved to avoid layout shift.

### Place an MREC inside the article body

For an in-article MREC, the consumer renders the ad component in the article's content tree at the desired position. For example, if the article renderer has structured blocks, it can insert a separate MREC slot after the second paragraph. The shared component renders the slot container at that point; the configured provider fills it when the ad request completes.

```tsx
function ArticleBody({ blocks, provider, targeting }) {
  let paragraphCount = 0;

  return blocks.flatMap((block, index) => {
    const renderedBlock = (
      <ArticleBlock key={`article-block-${index}`} block={block} />
    );

    if (block.type !== 'paragraph') return [renderedBlock];

    paragraphCount += 1;
    if (paragraphCount === 2) {
      return [
        renderedBlock,
        <AdSlot
          key="article-mrec-1"
          provider={provider}
          placement="articleMrec"
          targeting={targeting}
          label="Advertisement"
          placeholder={/* optional consumer-provided placeholder */ undefined}
        />,
      ];
    }

    return [renderedBlock];
  });
}
```

The insertion point is consumer-controlled and may follow a different rule than the reference's second-paragraph placement. If the consumer currently stores the article as one HTML string, render it through an HTML-to-React/content-block pipeline and insert the component node there, or add an explicit ad marker to the content model. Do not concatenate a React component into an HTML string or imperatively insert React-managed markup after rendering. Give every inline slot a stable unique key and its own provider slot/container ID. The optional native placement named `story_native_ads` in the reference is a separate AllAccess native-ad integration, not this MREC slot.

### Placeholder while an ad loads

Space reservation and a visible placeholder are different behaviors. Reserving space prevents the page from shifting; a placeholder is visible fallback content inside that reserved area while the ad request is pending. The reference review identified ad containers/placeholder treatment, but the exact shared-component behavior and visual design still need approval. The consumer should be able to provide or configure the placeholder rather than having the package invent publisher-specific artwork or copy.

```tsx
// Illustrative proposed API; not implemented.
<AdSlot
  provider={adProvider}
  placement="mrec"
  label="Advertisement"
  placeholder={<AdPlaceholder format="mrec" />}
  reserveSpaceOnNoFill
/>
```

The placeholder should be removed when the provider reports that the ad rendered. If the request returns no fill or fails, apply the separately approved no-fill behavior (for example, retain reserved blank space or collapse the slot); do not leave a loading placeholder indefinitely. Placeholder visibility, timeout, and failure behavior remain requirements to settle before implementation.

## 5. Verify locally and in the ad test environment

Use a mock provider in component tests and Storybook so routine UI work does not make real ad calls. Verify that each placement is defined once, uses the expected size mapping at mobile/tablet/desktop widths, receives approved targeting, cleans up on unmount/navigation, and handles no-fill without breaking the page. Then verify against the publisher's designated test inventory before production configuration is enabled.

## 6. Keep AllAccess separate unless approved

The `news` reference has AllAccess placements that load a separate vendor script. They are not part of the proposed GPT/GAM integration by default. If AllAccess is required, define its ownership, script-loading, consent, sizing, and lifecycle contract as a separate provider/placement before adding it to this component.

## Consumer checklist

- Install the shared package and render ads only from a client boundary.
- Add publisher-owned GAM network, ad-unit paths, sizes, and breakpoints to consumer configuration.
- Load and initialize GPT once at application level; the component does not inject the provider script.
- Apply publisher-approved consent/privacy controls before ad requests.
- Create one adapter/provider and reuse it across placements.
- Render MREC and leaderboard at the intended page locations with approved targeting and accessible labels.
- Validate responsive behavior, no-fill, cleanup, navigation, and test inventory before release.
- Obtain a separate decision for AllAccess; do not silently route it through GPT/GAM.

## Open decisions

- Is the first release GPT/GAM only, with AllAccess deferred as a separate integration?
- Should consumers load and initialize each provider once, with the component managing placement slots?
- Should the component use lazy loading, and should it ever refresh an ad automatically?
