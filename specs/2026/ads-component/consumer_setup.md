# Consumer setup proposal: Ads component

The package is not implemented. Names and examples below describe the proposed contract and must be aligned with approved requirements before development.

## Responsibility boundary

The consumer application owns:

- loading GPT once from the publisher-approved URL;
- consent/privacy mode, single-request mode, service-level lazy loading, and `enableServices`;
- all network IDs, full ad-unit paths, targeting values, and eligibility decisions;
- where a slot appears in the page or article content tree.

The shared package owns:

- a provider-neutral `AdSlot` client component;
- responsive-rule validation and selection;
- one provider slot per mounted instance;
- filled/empty/error state, reserved/collapse rendering, and owned-slot cleanup;
- an optional GPT adapter factory that receives the already initialized provider object.

The package never loads a production ad script, reads consent storage, creates publisher targeting, or embeds GNO inventory values.

Every active responsive rule must contain the consumer's full provider unit path and complete non-empty size list. `mrec` and `leaderboard` select semantics/styling/documentation only; they do not inject size defaults. Disabled rules are the only rules that omit a unit path and sizes.

## Application-wide provider setup

Load and configure GPT once in the consumer application. Next.js 16.4.2 requires browser API and lifecycle work to stay behind a client boundary. The application may use its approved `next/script` strategy, but the shared slot must receive an initialized adapter instead of a script URL.

```tsx
// app/ad-provider.tsx — consumer-owned Client Component
"use client";

import { useEffect, useState } from "react";

// Illustrative only. The exact factory is not implemented. Do not read
// window at module scope because Client Components can be prerendered.
export function AdProviderBoundary() {
  const [provider, setProvider] = useState<AdProvider>();

  useEffect(() => {
    if (!window.googletag) return;
    setProvider(createGptAdProvider({ googletag: window.googletag }));
  }, []);

  if (!provider) return null;
  return <PageAdPlacements provider={provider} />;
}
```

Application-wide GPT settings, including `pubads().enableLazyLoad(...)`, must be applied before/with global service initialization. They are not individual `AdSlot` props.

## Canonical placement configuration

```ts
const placements = {
  articleMrec: {
    key: "article-mrec",
    format: "mrec",
    rules: [
      {
        minWidth: 0,
        maxWidth: 1199,
        adUnitPath: runtimeAds.articleMrec,
        sizes: [[300, 250], [250, 250]],
      },
      {
        minWidth: 1200,
        adUnitPath: runtimeAds.articleMrec,
        sizes: [[300, 250], [336, 280], [250, 250]],
      },
    ],
    targeting: approvedPageTargeting,
    emptyBehavior: "reserve",
    reservedSize: [300, 250],
  },
  pageLeaderboard: {
    key: "page-leaderboard",
    format: "leaderboard",
    rules: [
      {
        minWidth: 0,
        maxWidth: 992,
        adUnitPath: runtimeAds.mobileLeaderboard,
        sizes: [[320, 100], [320, 50]],
      },
      {
        minWidth: 993,
        maxWidth: 1280,
        adUnitPath: runtimeAds.desktopLeaderboard,
        sizes: [[728, 90]],
      },
      {
        minWidth: 1281,
        adUnitPath: runtimeAds.desktopLeaderboard,
        sizes: [[970, 90], [728, 90]],
      },
    ],
    targeting: approvedPageTargeting,
    emptyBehavior: "reserve",
    reservedSize: [320, 100],
  },
} as const;
```

These are consumer configuration examples based on observed `news` patterns. The package does not apply these sizes automatically. Consumers must supply the actual approved sizes and provisioned full provider paths for every active rule. Do not copy production values into public stories.

## Rendering placements

```tsx
<AdSlot
  config={placements.pageLeaderboard}
  enabled={adRequestAllowed}
  provider={adProvider}
  label="Advertisement"
  onStateChange={handleAdState}
/>

<AdSlot
  config={placements.articleMrec}
  enabled={adRequestAllowed}
  provider={adProvider}
  label="Advertisement"
/>
```

Each mounted component gets a unique provider element ID and owns one provider handle. If the responsive rule signature changes, it destroys the old handle before creating the replacement. `enabled={false}` must make no provider call.

## Other standard display ads

Use `format: "custom"` for another standard rectangular GPT display placement whose lifecycle matches MREC/leaderboard, such as the legacy footer leaderboard:

```ts
const footerLeaderboard = {
  key: "footer-leaderboard",
  format: "custom",
  rules: [
    {
      minWidth: 0,
      maxWidth: 1000,
      enabled: false,
    },
    {
      minWidth: 1001,
      adUnitPath: runtimeAds.footerLeaderboard,
      sizes: [[728, 90], [970, 90], [970, 250]],
    },
  ],
  emptyBehavior: "collapse",
} as const;
```

If a placement should not exist in a viewport range, configure an explicit disabled rule. Rule validation must not silently accept an accidental gap.

Do not use `custom` to disguise native, video, interstitial, out-of-page, pushdown, skinning, or refresh behavior. Those formats have different provider and UX contracts and need separate requirements.

## Article MREC placement

The legacy `story.js` imperatively inserts a container near the second content child and cycles inventory suffixes. In React, the consumer article renderer should insert `AdSlot` as a real node in the structured content tree. The shared component does not parse article HTML, choose a paragraph, generate GNO unit names, or cycle inventory.

```tsx
function ArticleBody({ blocks }: { blocks: readonly ArticleBlock[] }) {
  return blocks.flatMap((block, index) => {
    const content = <ArticleBlockView key={`block-${index}`} block={block} />;
    if (index !== 1) return [content];
    return [
      content,
      <AdSlot
        key="article-mrec-1"
        config={placements.articleMrec}
        enabled={adRequestAllowed}
        provider={adProvider}
        label="Advertisement"
      />,
    ];
  });
}
```

The exact insertion rule is consumer behavior and must be tested in that consumer.

## Placeholder and no-fill

Space reservation and placeholder UI are separate:

- reserved space controls layout shift;
- an optional consumer-provided placeholder may render only while loading;
- `filled` removes the placeholder and retains the slot;
- `empty` applies `reserve` or `collapse`;
- `error` is observable and must not leave a permanent loading state.

The placeholder is React content, never raw HTML from configuration.

## Legacy AllAccess boundary

The `news` reference also injects AllAccess `deliverjs.nmi`/`deliveraw.nmi` scripts for zone/native integrations. The initial recommendation excludes those integrations. If required later, define a separate adapter and security/lifecycle review; do not add arbitrary script URL or zone-script injection to the standard GPT slot.

## Approved first-release decisions

1. GPT/GAM-only provider; AllAccess is excluded.
2. Include `custom` standard rectangular display alongside semantic MREC/leaderboard.
3. Use explicit disabled responsive rules; consumers own every active rule's full unit path and size list.
4. Require explicit consumer eligibility and consumer-provided string/string-array targeting.
5. Reserve by default with required `reservedSize`; allow explicit collapse; clear placeholder on every terminal state.
6. Use the approved 100 ms resize debounce, 8 KiB gzip ads-module target with raw-size reporting, and repository Chromium desktop/mobile automation matrix. ADS-A10 supersedes the original uncompressed planning target.

These requirements are approved by ADS-A04. Source implementation remains subject to separate development approval.
