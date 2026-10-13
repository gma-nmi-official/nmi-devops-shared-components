# Solution design: Ads component

## Architecture proposal

Use one framework component, `AdSlot`, with `format="mrec"` or `format="leaderboard"`. Format presets provide default responsive size mappings, while consumers provide the actual inventory path and may override sizes. A provider adapter isolates GPT/GAM's browser-global API from the React component.

The consumer initializes its ad provider once and passes the provider adapter or instance into the component. The component owns only the slot element and the lifecycle of its own provider slot. Do not load GPT/AllAccess scripts, initialize global services per component, or embed GNO inventory values in the package.

## Proposed consumer API

```tsx
<AdSlot
  format="mrec"
  provider={adProvider}
  adUnitPath={runtimeAds.mrecUnit}
  sizes={mrecSizeMap}
  targeting={approvedTargeting}
  label="Advertisement"
  lazyLoad
  emptySlot="reserve"
/>

<AdSlot
  format="leaderboard"
  provider={adProvider}
  adUnitPath={runtimeAds.leaderboard.desktop}
  mobileAdUnitPath={runtimeAds.leaderboard.mobile}
  sizes={leaderboardSizeMap}
  targeting={approvedTargeting}
/>
```

Names and exact shape are proposed; requirements and development approval are pending.

## Sizing presets from observed behavior

| Format | Proposed default | Reference evidence |
| --- | --- | --- |
| MREC | Below 1200 px: `300x250`, `250x250`; at/above 1200 px: add `336x280` | `mrec_size` in `header_js_globals.php` |
| Leaderboard desktop | Default `970x90`, `728x90`; 993–1280 px `728x90` only | `ads_leaderboard.js`, `common_screen_sizes.js` |
| Leaderboard mobile | `320x100`, `320x50`, mobile inventory path | `ads_leaderboard.js`, mobile threshold at 992 px |

These sizes remain consumer-overridable. The footer leaderboard is a distinct placement and size policy. The AllAccess MREC's 320x270 wrapper is not assumed equivalent to the GPT MREC preset.

## Slot lifecycle

1. Render a stable wrapper and accessible label during SSR/client render; do not reference browser/provider globals in module scope.
2. On client mount, wait for the consumer provider readiness queue, create a unique element/slot, apply the resolved size and approved targeting, then request/display the slot once.
3. Reflect loading, filled, no-fill, and provider-error states. Keep an explicit reserved-space or collapse policy to manage layout shift.
4. On format, provider, unit, or sizing change, cleanly replace only the owned slot. On unmount, destroy only that instance's slot.

## Privacy and targeting boundary

Consumers pass the approved ad-eligibility/consent state and targeting values. The component does not read cookies/storage, infer audience traits, or create section/keyword targeting. Provider initialization and consent configuration remain consumer-owned.

## Alternatives and rationale

- **GPT/GAM first vs both GPT and AllAccess:** GPT/GAM has a reusable slot lifecycle and serves the leaderboard reference; AllAccess appears in legacy MREC views as a separately loaded zone script. Recommendation: one GPT/GAM adapter initially. Add AllAccess only if a monetization owner requires it.
- **Component loads GPT vs consumer owns GPT:** recommendation is consumer ownership so multiple slots share one initialized provider, prevent duplicate scripts/services, and allow consumer-specific consent configuration.
- **Fixed format sizes vs consumer-defined mappings:** use reference-based presets with explicit consumer overrides to balance simple reuse and inventory-specific needs.

## Exclusions

No ad campaign management, bidding logic, refresh scheduler, frequency cap, video/IMA integration, interstitial/pushdown behavior, or policy decision is included without separate approved requirements.
