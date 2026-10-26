# Solution design: Google Analytics

## Architecture

The package provides a framework-neutral analytics instance. It is not a visual header or cookie component and does not require React at runtime for its core behavior.

Proposed package area:

- `packages/ui/src/analytics/google-analytics/` for the service, types, payload builders, normalizers, and tests.
- A package export for `createGoogleAnalytics` and public types.
- Generic package fixtures for JavaScript/TypeScript, browser, Next.js, and SSR consumption.
- A Storybook harness and catalog example for interactive verification; these are documentation surfaces rather than runtime dependencies.

## Approved public API

```ts
const analytics = createGoogleAnalytics(config)

analytics.initialize()
analytics.setCurrentParams(context)
analytics.getCurrentParams()
analytics.updateCurrentParams(partialContext)
analytics.clearCurrentParams()
analytics.trackPageView(page)
analytics.trackEvent(name, parameters)
analytics.trackClick(parameters)
analytics.trackSearch(parameters)
analytics.trackScroll(parameters)
analytics.trackVideoLoaded(parameters)
analytics.trackVideoPlayed(parameters)
analytics.setConsent(state)
analytics.flush()
```

The API intentionally has one context/default pipeline, one page-view path, and one generic named-event path. `setCurrentParams` replaces stored context using a clone. `getCurrentParams` returns an isolated snapshot. `updateCurrentParams` performs a validated partial merge so a scroll milestone or dynamic widget can change selected custom dimensions without erasing other page context. These context functions do not send events. Click, search, scroll, and video helpers only provide approved event names and field presets before calling `trackEvent`. Each send call returns a documented result such as `sent`, `queued`, `dropped`, or `failed`, enabling callers and tests to observe behavior without reading globals.

## Approved configuration

| Area | Approved configuration |
| --- | --- |
| Direct destination | Required `measurementId` for `{ type: "gtag", gtag }`; optional environment label |
| Transport | Consumer-selected `{ type: "gtag", gtag }` or `{ type: "gtm", dataLayer }` adapter; consumer-owned script/container loading; GTM mode does not accept or require `measurementId` |
| Destination | Direct gtag mode receives runtime GA4 measurement ID; GTM mode uses consumer-owned container/tag destination configuration |
| Defaults | `portalSection`, page context, event fields, normalizers |
| Dimensions | Built-in default schema plus consumer-registered keys/defaults/mappings/normalizers |
| Readiness | Explicit ready state or transport resolver; granted-plus-not-ready returns `failed/not_ready` with no readiness queue |
| Consent | Bounded queue only while `unknown`; drop and clear while `denied`; flush still-valid queued events once only after grant and transport readiness |
| Safety | Event allow/validation rules, queue capacity/lifetime/overflow policy, duplicate strategy, canonical callback/timeout fields, reserved transport keys, and error/debug hooks |

No measurement ID, portal URL, cookie rule, DOM selector, or production transport is compiled into the package.

### Transport contract

The public transport configuration is a discriminated adapter: `{ type: "gtag", gtag }` or `{ type: "gtm", dataLayer }`. Both receive the same normalized event name and parameter object. Direct mode calls the injected `gtag` function. GTM mode pushes `{ event: "gno_analytics_event", event_name, event_params }` to the consumer's initialized `dataLayer`. The consumer configures a GTM Custom Event trigger for `gno_analytics_event`, maps `event_name` to the GA4 Event Name, and maps event parameters from `event_params`.

The approved public event input uses adapter-neutral `callback` and `callbackTimeoutMs` fields. Adapters remove them from ordinary `event_params`: GTM maps them to top-level `eventCallback` and `eventTimeout`, while direct mode maps them to `event_callback` and `event_timeout`. A callback fires at most once at its transport's documented completion/timeout point, not as a guarantee of final GA processing. Callers cannot pass reserved envelope or transport keys (`event`, `event_name`, `event_params`, `eventCallback`, `eventTimeout`, `event_callback`, `event_timeout`, or `send_to`) as arbitrary event parameters.

The consumer disables the tag's automatic page view. When the component owns Next.js navigation page views, the consumer also disables Enhanced Measurement's page changes based on browser history events; otherwise navigation can still produce automatic duplicates. The component never injects `gtag.js` or `gtm.js`.

### Approved delivery state table

| Enabled | Consent | Transport ready | Result |
| --- | --- | --- | --- |
| No | Any | Any | `dropped/disabled`; no queue or send |
| Yes | `denied` | Any | `dropped/consent_denied`; clear pending consent queue |
| Yes | `unknown` | Any | `queued/consent_unknown` within configured capacity/lifetime |
| Yes | `granted` | No | `failed/not_ready`; invoke the error hook and do not create a second readiness queue |
| Yes | `granted` | Yes | `sent`, or `failed/transport_error` if the adapter rejects/throws |

`setConsent("granted")` and manual `flush()` send queued entries only when transport is ready. The in-memory FIFO defaults to capacity `100` and lifetime `5 minutes`, with configurable positive bounds. Each queued entry is removed exactly once after send, expiry, denial, or overflow handling. Overflow rejects the newest entry with `dropped/queue_full`, preserving earlier queue order; expired entries return/report `dropped/queue_expired`. Failed transport sends are not automatically retried because completion is ambiguous.

## Payload behavior

- Builders create new objects; caller configuration, context, and event inputs are never mutated.
- Default dimensions follow the reference `sendPageView`: `content_type`, `author`, `subsection`, `audience_interest`, `source`, `publish_date`, `keywords`, `content_id`, `section`, `show_name`, and `portal_section`.
- Default dimension values are strings. Unset values initialize to `""`; empty strings remain in page and event payloads. The `portalSection` initialization option seeds the built-in `portal_section` dimension, which page context may override.
- Consumers can register additional dimensions with defaults and optional mappings/normalizers. Registered keys work with set/get/partial update and flow into page and event payloads.
- Merge order is explicit: package defaults, registered dimension defaults, current instance context, then call-specific fields, subject to validation.
- Generic event payloads support `event_action`, `event_label`, `event_value`, callback handling, and configured additional GA event parameters. Outgoing parameters are flat string/number/boolean scalars, limited to 25 total, with GA-compatible name/value limits. Dangerous prototype keys, reserved prefixes/envelope/transport keys, nested arbitrary objects, and non-finite numbers are rejected. The consumer owns its approved field allowlist and must not supply PII.
- Scroll behavior is configuration-driven: event name, triggers or milestones, repeat/deduplication, fields, and partial dimension updates.
- `trackPageView` is the only shared page-view send path. Consumers disable the tag's default page view and Enhanced Measurement history-change page views, then call `trackPageView()` on initial load and client-side navigation.
- `trackVideoLoaded` sends `loaded_a_video`; `trackVideoPlayed` sends `played_a_video`. Categories are `Video Load` and `Video Play`; `event_value` defaults to numeric `0` and accepts a configured per-instance default or call-specific numeric override.
- `trackSearch` sends `search`; `trackClick` defaults to `click` only when no approved name is provided.
- Portal-specific rules such as NCAA are data configuration, not path detection.

## Consent and component boundaries

Cookie Agreement owns consent UI and persistence. The consumer application translates its approved record into the analytics service's neutral state. The analytics package does not import Cookie Agreement, inspect its DOM, read its storage, or change consent.

Portal Header calls analytics functions through consumer wiring if desired. Neither package imports or controls the other.

## Reference algorithm mapping

The `news` file supplies behavior evidence only. The shared public contract does not reproduce the `CUSTOM_ANALYTICS` global or its redundant methods:

| Legacy behavior | Optimized destination |
| --- | --- |
| Page defaults and custom dimensions | Configuration plus `setCurrentParams`, `getCurrentParams`, and `updateCurrentParams` |
| `sendPageView` / `ga_send_event` algorithms | `trackPageView` |
| `send_click_event` / `ga_click_event` algorithms | `trackEvent` or `trackClick` |
| Search algorithm | `trackSearch` |
| Scroll milestones with selected custom-dimension changes | `updateCurrentParams` followed by `trackScroll` or the approved generic event |
| Video action calls | `trackVideoLoaded` / `trackVideoPlayed` |
| `set_event_params` / `custom_values` | Internal pure builders, not public compatibility functions |

Facebook Pixel, `_em`, Mookie, DOM cleanup, and other-site URL inspection are not mapped. If consumers still require them, they need independent components or consumer code.

## Rollout and rollback

1. Validate the package in synthetic JavaScript/TypeScript, browser, Next.js, and SSR fixtures.
2. Compare optimized payload-builder results with approved reference examples using a spy transport.
3. Pack the candidate and confirm every published file and export is intentional.
4. Publish and consumer rollout remain later, separately approved actions.
5. Roll back a consuming application by restoring its previously approved package version; this component does not migrate stored consent.
