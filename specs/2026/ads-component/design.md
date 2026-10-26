# Solution design: Ads component

## Design status

Requirements and the recommended architecture boundary are approved by ADS-A04. This remains a proposed implementation contract until separate development approval. The current branch contains specifications only.

## Architecture

Split ad integration into three layers:

1. **Consumer bootstrap:** the consuming application loads GPT once, configures consent/privacy mode, `enableSingleRequest`, service-level lazy loading, and `enableServices`, then creates one adapter. These application-wide operations do not belong to an individual React slot.
2. **Provider adapter:** a small browser-only adapter translates provider-neutral slot requests into GPT `defineSlot`, targeting, `display`, render events, and `destroySlots`. It receives the initialized provider object; it does not find or inject a global script.
3. **`AdSlot` component:** a client-component boundary that renders the label/container, resolves the active responsive rule, requests exactly one owned slot when eligible, reports state, and destroys only that slot on replacement or unmount.

The initial release supports standard rectangular display slots. `mrec` and `leaderboard` are semantic format labels, not size presets; `custom` accepts the same standard display-slot contract for publisher-defined placements such as a footer leaderboard. Every active rule requires consumer-provided sizes. Native, video/IMA, interstitial, out-of-page, pushdown, skinning, and refresh scheduling require separate contracts.

## Proposed public contract

```ts
export type AdSize = readonly [width: number, height: number];

export type ActiveAdResponsiveRule = {
  minWidth: number;
  maxWidth?: number;
  enabled?: true;
  adUnitPath: string;
  sizes: readonly AdSize[];
};

export type DisabledAdResponsiveRule = {
  minWidth: number;
  maxWidth?: number;
  enabled: false;
};

export type AdResponsiveRule = ActiveAdResponsiveRule | DisabledAdResponsiveRule;

export type AdTargetingValue = string | readonly string[];
export type AdTargeting = Readonly<Record<string, AdTargetingValue>>;
export type AdSlotState = "idle" | "loading" | "filled" | "empty" | "error";

export type AdPlacementConfig = {
  key: string;
  format: "mrec" | "leaderboard" | "custom";
  rules: readonly AdResponsiveRule[];
  targeting?: AdTargeting;
} & (
  | { emptyBehavior?: "reserve"; reservedSize: AdSize }
  | { emptyBehavior: "collapse"; reservedSize?: AdSize }
);

export type AdProviderSlotRequest = {
  elementId: string;
  adUnitPath: string;
  sizes: readonly AdSize[];
  targeting: AdTargeting;
  onStateChange: (state: Exclude<AdSlotState, "idle">, error?: unknown) => void;
};

export type AdProviderSlot = { readonly id: string };

export interface AdProvider {
  createSlot(request: AdProviderSlotRequest): AdProviderSlot | Promise<AdProviderSlot>;
  destroySlot(slot: AdProviderSlot): void | Promise<void>;
}

export type AdSlotProps = {
  config: AdPlacementConfig;
  enabled: boolean;
  provider: AdProvider;
  label?: string;
  placeholder?: React.ReactNode;
  slotId?: string;
  className?: string;
  onStateChange?: (state: AdSlotState, error?: unknown) => void;
};
```

```tsx
<AdSlot
  config={placements.articleMrec}
  enabled={adRequestAllowed}
  provider={adProvider}
  label="Advertisement"
  onStateChange={handleAdState}
/>
```

`enabled` is required. `false` means no provider call. The consumer owns the legal/privacy decision and provider privacy configuration; the component does not inspect cookies or consent storage.

The exported names and canonical configuration shape shown here are part of the proposed implementation plan and require development approval before source changes.

## Responsive rule model

Rules are ordered by ascending `minWidth`, must start at `0`, and must not overlap or leave gaps. An active rule contains positive integer dimensions and a non-empty ad-unit path; an explicit disabled rule requests no slot in that viewport range. A pure resolver selects one rule for the current viewport.

- If the active rule signature changes (enabled state, unit path, or sizes), the component destroys the old owned slot before creating at most one replacement. A future optimization may use GPT size mapping, but it is not required by the first contract.
- Resize handling must be debounced and compare a stable rule signature so repeated events cannot duplicate a slot.
- Server rendering outputs the wrapper, label, reserved space, and stable element ID only. It makes no provider call. Client mount resolves the first active rule.

Reference-derived examples for consumer documentation only:

| Format example | Consumer-configured responsive rules |
| --- | --- |
| MREC | `0+`: `300x250`, `250x250`; `1200+`: add `336x280` |
| Leaderboard | `0–992`: `320x100`, `320x50`; `993–1280`: `728x90`; `1281+`: `970x90`, `728x90` |
| Footer leaderboard example | consumer-defined `1001+`: `728x90`, `970x90`, `970x250` |

Each active rule carries the consumer-provisioned full provider unit path and non-empty complete size list. No ad size, network ID, GNO unit name, section mapping, test inventory, or zone ID is embedded or inferred by the package.

## Slot lifecycle

1. Render a stable wrapper and unique provider element ID. The default ID derives from a sanitized React `useId`; an explicit unique `slotId` may be supported for diagnostics.
2. Remain `idle` while `enabled` is false. When enabled on the client, resolve and validate the active rule.
3. Call `provider.createSlot` once for the active signature and enter `loading`.
4. Map provider events to `filled`, `empty`, or `error`. Apply `emptyBehavior` without leaving a perpetual loading placeholder.
5. On a material config/provider/rule change, cancel stale async completion, destroy the prior owned handle, then create one replacement.
6. On unmount, destroy only the handle created by that instance. React Strict Mode mount/cleanup/remount must not leak or duplicate slots.

## GPT adapter boundary

The first adapter should be a separately exported factory such as `createGptAdProvider({ googletag })`. The consumer supplies an initialized GPT-compatible object. The adapter queues operations through `googletag.cmd`, calls `defineSlot`, applies validated targeting, subscribes to slot render events before `display`, filters events to the owned slot, removes listeners during cleanup, and calls `destroySlots([slot])`.

The adapter must not:

- inject `gpt.js` or accept an arbitrary script URL;
- hard-code `/344684475/`, `GMA_News_Online`, `ad_pt`, `ad_pos`, or unit naming rules;
- call service-wide `enableLazyLoad`, `enableSingleRequest`, or `enableServices` per slot;
- mutate caller configuration;
- reuse the legacy global counters or jQuery DOM insertion.

If consumers need component-level deferred creation in addition to GPT service-level lazy loading, define a separate future `deferUntilVisible` behavior backed by `IntersectionObserver`. Do not label that behavior `lazyLoad` until its relationship to GPT service configuration is explicit.

## Rendering, accessibility, and empty behavior

- Use an `aside` or equivalent labeled region with a configurable visible label; default English copy is `Advertisement`.
- Reserve a deterministic block/inline size from the consumer's required `reservedSize` when reserve behavior is selected; do not infer it from the active rule's size order.
- `emptyBehavior="reserve"` keeps the reserved region after no-fill; `collapse` removes its reserved height only after an explicit empty result.
- A consumer-provided loading placeholder is optional and must not be inserted as raw HTML. It disappears on filled, empty, or error.
- The slot is not keyboard-focusable and must not trap focus.

## Approved decisions and deferred alternatives

- **Approved ADS-A04:** GPT/GAM-only provider adapter in the first release. AllAccess native/zone scripts remain deferred pending separate lifecycle, security, and ownership requirements.
- **Approved ADS-A04:** support `custom` standard display configuration alongside semantic MREC/leaderboard formats.
- **Approved ADS-A04:** keep application-wide GPT initialization and lazy-load settings consumer-owned.
- **Approved ADS-A04:** reserve space by default and allow explicit collapse on no-fill.
- **Deferred alternative:** MREC/leaderboard-only scope or specialized providers/formats require a new requirements decision.

## Planned files

- `packages/ui/src/components/ad-slot/types.ts`
- `packages/ui/src/components/ad-slot/resolve-rule.ts`
- `packages/ui/src/components/ad-slot/ad-slot.tsx`
- `packages/ui/src/components/ad-slot/gpt-provider.ts`
- `packages/ui/src/components/ad-slot/ad-slot.test.tsx`
- `packages/ui/src/components/ad-slot/ad-slot.stories.tsx`
- `packages/ui/src/components/ad-slot/index.ts`
- `packages/ui/src/index.ts`
- `packages/ui/src/styles.css`
- catalog preview/guidance and consumer fixtures under `app/` and `tests/`
- `CHANGELOG.md` and linked ads-component verification/review records

## Exclusions

No campaign management, bidding, refresh scheduler, frequency cap, production inventory configuration, native script injection, video/IMA, interstitial, out-of-page, pushdown, skinning, or consumer article-placement algorithm is included in the initial delivery unit.
