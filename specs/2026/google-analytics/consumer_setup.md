# Consumer setup: Google Analytics

## Status

This guide records the GA-A10-approved consumer integration contract before implementation. Each analytics instance selects one transport: direct `gtag.js` or GTM. Required automation covers the repository's Chromium desktop/mobile projects plus Next.js 16.4.2 package/SSR fixtures. Scroll behavior is configurable by each consumer.

The installed package name is `nmi-devops-shared-components`. The analytics service is standalone and requires no Portal Header, Cookie Agreement, framework UI rendering, or stylesheet.

## Shared setup rules

1. In direct-gtag mode, supply the GA4 measurement ID at runtime. GTM mode resolves its destination in the consumer-owned container and does not pass a measurement ID to the package. Never compile a production or container ID into the package.
2. The consumer selects and loads either direct `gtag.js` or its GTM container. Direct mode supplies the `gtag` transport; GTM mode supplies a `dataLayer` transport and configures the container to send GA4 events.
3. Pass consent state from application-owned privacy logic. Events wait in a bounded queue while consent is unknown; denied consent drops events and clears that queue.
4. Set the initial page/custom-dimension context.
5. Send page views explicitly with `trackPageView()`; the consumer disables the tag's default page view and, for Next.js navigation ownership, Enhanced Measurement history-change page views.
6. Use partial context updates for scroll milestones or dynamic content; do not rebuild or mutate the complete context object.

## End-to-end consumer flow

The following is the approved integration flow for the `1.4.0` candidate. The
analytics export is opt-in and remains subject to verification, independent
review, and the separate release gates.

### 1. Install the shared package

```bash
npm install nmi-devops-shared-components
```

### 2. Configure the consumer environment (direct gtag mode)

The consuming application owns the GA4 measurement ID:

```env
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
```

The consumer maps its environment variable to `measurementId`. The shared package does not read environment variables or contain a production ID.

### 3. Load GA4 in the consumer

The application loads and initializes `gtag.js`, making a `gtag`-compatible function available before event delivery. The agreed setup gives this component sole ownership of explicit page views.

The consumer initializes GA with automatic page views disabled:

```ts
gtag("config", measurementId, { send_page_view: false });
```

For a Next.js single-page application, the consumer also disables **Page changes based on browser history events** in the GA4 web stream's Enhanced Measurement settings. `send_page_view: false` disables the tag's default page view but does not by itself disable history-change page views. The browser fixture must prove one page view for the initial load and one for each client-side navigation.

### 4. Create one analytics instance

Create the instance in the consumer's browser entry or client-only analytics module:

```ts
import { createGoogleAnalytics } from "nmi-devops-shared-components";

const measurementId = process.env.NEXT_PUBLIC_GA4_ID;

if (!measurementId) {
  throw new Error("Missing NEXT_PUBLIC_GA4_ID");
}

export const analytics = createGoogleAnalytics({
  measurementId,
  portalSection: "News",
  customDimensions: {
    article_series: "",
  },
  scroll: {
    eventName: "article_scroll",
    milestones: [25, 50, 75, 100],
    deduplicatePerPage: true,
  },
  transport: {
    type: "gtag",
    gtag: (...args) => window.gtag(...args),
  },
  consent: "unknown",
});

analytics.initialize();
```

The `gtag` transport selects the direct Google tag adapter. Page and feature code calls analytics methods instead of calling the transport. The consumer has already loaded/configured `gtag.js` with its default page view disabled and has disabled Enhanced Measurement history-change page views when this component owns navigation tracking.

### 5. Set the initial page dimensions

```ts
analytics.setCurrentParams({
  content_type: "Article",
  author: "GMA Integrated News",
  subsection: "",
  audience_interest: "",
  source: "",
  publish_date: "Oct 12, 2026",
  keywords: "news, example",
  content_id: "12345",
  section: "News",
  show_name: "",
  portal_section: "News",
});
```

`setCurrentParams` establishes the complete page context.

The default schema also includes `portal_section`. Default and consumer-registered dimensions use empty strings when unset, and those empty values remain present in outgoing payloads. Consumers may configure additional dimension keys, defaults, and normalizers.

### 6. Apply the consumer's consent result

```ts
analytics.setConsent(consentRecord.analytics ? "granted" : "denied");
```

Cookie Agreement or other application privacy logic owns the consent decision. Analytics only receives the neutral state.

While consent is `unknown`, the component queues events within its configured capacity and lifetime. If consent becomes `denied`, it clears pending events and drops new ones. If consent becomes `granted`, it sends valid queued events once.

### 7. Send the page view

```ts
analytics.trackPageView({
  page_path: window.location.pathname,
  page_title: document.title,
  page_location: window.location.href,
});
```

### 8. Send feature events

```ts
analytics.trackEvent("click", {
  event_category: "Article",
  event_label: "Related story",
  event_value: 1,
  event_action: "open_related_story",
  campaign_name: "spring_launch",
  callback: () => console.log("Google tag event processed"),
  callbackTimeoutMs: 2000,
});

analytics.trackSearch({ event_label: "weather" });
analytics.trackVideoLoaded({ event_label: "/videos/example" });
analytics.trackVideoPlayed({ event_label: "/videos/example" });
```

### 9. Update only changed dimensions

```ts
analytics.updateCurrentParams({ subsection: "Article body" });
analytics.trackScroll({ milestone: 50 });
```

Only `subsection` changes. All other current parameters remain available to this and later events.

### 10. Handle navigation or a new page

```ts
analytics.setCurrentParams(nextPageContext);
analytics.trackPageView(nextPage);
```

Replacing the complete context prevents dimensions from the previous page from leaking into the next page.

## Modern JavaScript or TypeScript consumer

Install the approved package artifact according to the repository consumer guide, then import the public factory:

```ts
import { createGoogleAnalytics } from "nmi-devops-shared-components";
```

Create one analytics instance for the consumer application:

```ts
const analytics = createGoogleAnalytics({
  measurementId: runtimeConfig.ga4MeasurementId,
  portalSection: "News",
  transport: {
    type: "gtag",
    gtag: (...args) => window.gtag(...args),
  },
  consent: "unknown",
  onError: (error) => {
    console.error("Analytics error", error);
  },
});
```

The configuration names are approved by GA-A10. In direct mode the consumer owns the real measurement ID and transport initialization. In GTM mode, the container owns the GA4 destination configuration.

## Alternative GTM consumer setup

Use this path when the application routes analytics through Google Tag Manager. The consumer owns the GTM container ID, loads the GTM snippet, initializes `window.dataLayer`, and configures the container's Google tag and GA4 Event tag. The shared component does not load `gtm.js`; a GTM-mode instance does not need a GA4 measurement ID because the container resolves the destination.

Initialize the data layer before loading the consumer's GTM container:

```ts
window.dataLayer = window.dataLayer || [];
// The application loads its GTM snippet with its environment-specific GTM ID.
```

Configure the consumer-owned container to:

1. Create a Custom Event trigger for `gno_analytics_event`.
2. Configure a Google tag for the consumer's GA4 measurement ID, disable its automatic page view, and disable Enhanced Measurement history-change page views when this component owns Next.js navigation tracking.
3. Configure a GA4 Event tag using the data-layer variable `event_name` as the event name and map the needed keys from `event_params`.
4. Publish/test the container in the consumer's environment; package fixtures use a spy data layer and make no GA request.

The proposed adapter pushes one envelope for every accepted event:

```ts
window.dataLayer.push({
  event: "gno_analytics_event",
  event_name: "page_view",
  event_params: {
    page_path: window.location.pathname,
    page_title: document.title,
    page_location: window.location.href,
    portal_section: "News",
    content_type: "Article",
  },
  // Optional; GTM calls this after processing tags for this data-layer event.
  eventCallback: () => console.log("GTM event processed"),
  eventTimeout: 2000,
});
```

Create the analytics instance with the GTM adapter:

```ts
const analytics = createGoogleAnalytics({
  portalSection: "News",
  transport: { type: "gtm", dataLayer: window.dataLayer },
  consent: "unknown",
});
```

The `event` key is the GTM trigger name; `event_name` is the GA4 event name. The user event payload remains in `event_params`, where the consumer maps any approved extra event parameters it needs in GTM. The public API accepts adapter-neutral `callback` and `callbackTimeoutMs`; the GTM adapter maps them to `eventCallback`/`eventTimeout`, and the direct adapter maps them to `event_callback`/`event_timeout`. Each callback reports completion or timeout at its transport's processing point, not confirmed receipt by GA, and fires at most once.

Consent remains owned by the consuming application. It configures GTM consent defaults and updates through GTM's consent APIs before relevant tags process data-layer events. When permission changes to granted, the consumer applies the GTM consent update first, then calls `analytics.setConsent("granted")` so the component flushes only after GTM has the current state. The component's bounded unknown-consent queue and denied-drop policy apply before data is sent to the data layer; the consumer's GTM consent configuration remains an additional tag-firing control.

The generic event API accepts additional GA event parameters supplied by the consumer. It forwards consumer fields alongside inherited current dimensions, subject to the API's validation and reserved-field rules.

### Set the initial current parameters

```ts
analytics.setCurrentParams({
  content_type: "Article",
  author: "GMA Integrated News",
  subsection: "Top Stories",
  audience_interest: "",
  source: "",
  publish_date: "Oct 12, 2026",
  keywords: "news, example",
  content_id: "12345",
  section: "News",
  show_name: "",
});
```

`setCurrentParams` replaces the stored parameters using a clone. Later caller mutations must not affect the analytics instance.

### Read and partially update current parameters

```ts
const snapshot = analytics.getCurrentParams();

analytics.updateCurrentParams({
  subsection: "Infinite Scroll Page 2",
  content_id: "67890",
});
```

`getCurrentParams` returns a clone. `updateCurrentParams` changes only supplied approved keys and preserves `content_type`, `author`, and every other stored value.

### Send a page view

```ts
analytics.trackPageView({
  page_path: "/news/topstories/example/",
  page_title: "Example story",
  page_location: window.location.href,
});
```

The service combines page fields with the latest current parameters and configured `portalSection`.

### Send action events

```ts
analytics.trackEvent("click", {
  event_category: "Article",
  event_label: "Related story",
  event_value: 1,
});

analytics.trackSearch({
  event_category: "Search",
  event_label: "weather",
  event_value: 1,
});
```

### Send video events

```ts
analytics.trackVideoLoaded({
  event_label: "/news/video/example/",
  event_value: 0,
});

analytics.trackVideoPlayed({
  event_label: "/news/video/example/",
  event_value: 0,
});
```

These helpers send the exact event names `loaded_a_video` and `played_a_video`, include the latest current parameters, and default `event_value` to numeric `0`. A consumer may configure a different per-instance default or pass a call-specific numeric override when preserving a legacy `1` path.

### Update context and send a scroll event

```ts
analytics.updateCurrentParams({
  subsection: "Article body",
});

analytics.trackScroll({
  milestone: 50,
  event_label: "/news/topstories/example/",
});
```

This scroll example is illustrative. Each consumer configures the event name, thresholds or triggers, repeat/deduplication rules, fields, and any dimension updates it needs.

Scroll behavior is configured by the consumer. Options can define the event name, milestone list, deduplication policy, event fields, and dimensions to update at each milestone. The values above are illustrative; the component will not impose these defaults.

### Apply consent state

```ts
analytics.setConsent("granted");
// or
analytics.setConsent("denied");
```

The application maps its approved consent record to `unknown`, `granted`, or `denied`. The analytics package does not import Cookie Agreement or read its storage/DOM.

## Runtime environment configuration

In direct gtag mode, each application supplies its own GA4 measurement ID when creating the analytics instance. In GTM mode, the consumer's GTM container owns the GA4 destination, while the package receives a dataLayer adapter. The package must not contain a default production ID or GTM container ID.

```ts
const analytics = createGoogleAnalytics({
  measurementId: process.env.NEXT_PUBLIC_GA4_ID,
  portalSection: runtimeConfig.portalSection,
  transport: {
    type: "gtag",
    gtag: (...args) => window.gtag(...args),
  },
  consent: runtimeConsentState,
});
```

For local, staging, and production environments, direct-gtag consumers map their own configuration to `measurementId`; GTM consumers load the environment's container and configure its GA4 destination there:

| Environment | Consumer-owned value |
| --- | --- |
| Local/test | A test ID or spy transport; or a test GTM container with spy dataLayer; no production request |
| Staging | The approved staging GA4 measurement ID or staging GTM container/destination |
| Production | The approved production GA4 measurement ID or production GTM container/destination |

Two instances may use different direct measurement IDs or GTM data layers/destinations and transports. Instance configuration, current parameters, consent, queues, and events must remain isolated.

The `news/res/js/custom_analytics.js` file is algorithm reference material only. This delivery does not add a `news` script-registry entry, global compatibility API, migration bridge, or source change.

## Local verification setup

Use a spy transport instead of GA during development and automated tests:

```js
var sent = [];

var analytics = createGoogleAnalytics({
    measurementId: 'G-TEST',
    portalSection: 'News',
    consent: 'granted',
    transport: {
        type: 'gtag',
        gtag: function () {
            sent.push(Array.prototype.slice.call(arguments));
        }
    }
});

analytics.setCurrentParams({ content_type: 'Test' });
analytics.trackPageView({ page_path: '/test/', page_title: 'Test' });

console.log(sent);
```

Verification must confirm exact event names and payloads, one approved send per call, partial-update preservation, consent/readiness behavior, no production network request, and no non-GA side effect.

## Approved compatibility contract

1. Required browser automation is Chromium desktop `1440×900` and Chromium mobile `375×812`; Firefox/WebKit are outside the approved matrix.
2. The required framework/package fixtures use Next.js 16.4.2 and include SSR-safe imports.
3. GA-D01-GA-D09 define video values, callback/timeout names, reserved fields, GTM envelope, page-view ownership, schema validation, and readiness/queue behavior.
