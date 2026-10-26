# Specification: Google Analytics

## Business intent

- Problem: GNO consumers need one configurable GA4 integration instead of copying the mutable, global `CUSTOM_ANALYTICS` implementation and its unrelated third-party side effects.
- Algorithm reference: `C:\laragon\www\news\res\js\custom_analytics.js`. The `news` repository is not a consumer integration target for this delivery.
- Package owner: `D:\gno-node-projects\gno-shared-components-v2`.
- Outcome: consumers configure one standalone analytics service that builds page views and named events from approved default custom dimensions, current page context, and call-specific overrides. Search and video helpers reuse that core algorithm.
- Success: required event names and fields are preserved, each instance routes to its consumer-configured GA4 destination (runtime measurement ID for direct gtag or GTM container configuration for GTM), consent and readiness behavior are explicit, no event depends on jQuery or consumer globals, package fixtures pass, and independent review closes.

## Scope

In scope:

- Configurable direct-gtag or GTM transport, default and additional custom dimensions, readiness behavior, consent state, debug/error hooks, and field normalization. Direct-gtag consumers provide their GA4 measurement ID at runtime; GTM consumers own the container and GA4 destination configuration.
- Built-in functions for current-parameter set/get/partial update, `page_view`, `loaded_a_video`, `played_a_video`, search, click, scroll, and generic named events.
- Default dimensions from the reference `sendPageView`: `content_type`, `author`, `subsection`, `audience_interest`, `source`, `publish_date`, `keywords`, `content_id`, `section`, `show_name`, and `portal_section`. Unset values remain empty strings and are sent as such.
- A configuration hook for consumers to register additional dimensions, their defaults, mappings, and normalizers.
- Configurable scroll event name, triggers or milestones, repeat/deduplication behavior, payload fields, and dimension updates.
- Standalone TypeScript/JavaScript package API without reproducing every redundant legacy function.
- Storybook test harness, catalog guidance, unit tests, package fixtures, browser tests, reference-algorithm mapping, and generic consumer setup documentation.

## Exclusions

- Portal Header rendering or event ownership.
- Cookie Agreement UI, persistence, or policy ownership. The analytics service may receive an approved consent state through a neutral application boundary without importing Cookie Agreement.
- Facebook Pixel, Effective Measure `_em`, Mookie/tagr injection, DOM cleanup, advertising, and consumer-specific navigation behavior.
- Production measurement IDs, production deployment, consumer source changes, publication, and rollout without their later approvals.
- AMP analytics implementation until its required parity is approved.

## Confirmed consumer decisions

1. Resolved: the consumer owns tag loading and supplies the selected transport: direct `gtag.js` or GTM through its `dataLayer`. The shared component does not load either script.
2. Resolved: queue events in a bounded queue while consent is unknown; drop events and clear the queue when consent is denied; flush valid queued events once when consent is granted.
3. Resolved: each direct-gtag consumer reads its GA4 measurement ID from its own environment and passes it at initialization. GTM consumers configure the GA4 destination in their container and pass no measurement ID to the package. Measurement and container IDs are never package constants.
4. Resolved direction: consumers call `trackPageView()` for initial loads and client-side navigation. To make the component the single page-view owner, consumers disable the tag's default page view and Enhanced Measurement history-change page views; an alternative ownership model requires renewed approval.
5. Resolved scope: non-GA trackers and DOM behavior remain outside this component.
6. Resolved: Next.js is the required framework integration; use the shared repository's installed Next.js version for the fixture.
7. Resolved: proceed with package, browser, and Next.js/SSR fixtures using spy transports.
8. Resolved: GTM is included as an optional consumer integration path alongside direct `gtag.js`; the consumer owns its GTM container and GA4 destination setup.

## Approved dimension and scroll decisions

- Default dimensions follow the reference `sendPageView` schema, including `portal_section`.
- Dimension values are strings. Unset dimensions default to `""`, and empty strings remain present in outgoing payloads.
- Consumers can register additional dimensions through configuration; registered dimensions participate in set/get/partial update, normalization, inheritance, and payload construction.
- Scroll event name, triggers or milestones, repeat/deduplication behavior, payload fields, and dimension updates are configurable per consumer.

## Approved API direction

The new public API will optimize the reference instead of copying its redundant methods. It explicitly includes `setCurrentParams`, `getCurrentParams`, and `updateCurrentParams`. The setter replaces current context, the getter returns a cloned snapshot, and the updater partially merges only supplied approved custom-dimension/page-context keys without sending an event. One page-view function sends page data. One named-event function sends actions. Search, scroll, `loaded_a_video`, and `played_a_video` are small helpers over the named-event function. Legacy `CUSTOM_ANALYTICS` names are reference evidence and are not part of the shared public API.

Generic event payloads support `event_action`, `event_label`, `event_value`, and callback handling. Consumers may add further GA event parameters in the event payload; the component forwards supplied event fields while merging current dimensions, subject to documented validation and reserved-field rules.

The exact video event names and categories are stable. GA-A10 resolves the inconsistent legacy values by defaulting `event_value` to numeric `0` while allowing a configured per-instance default or call-specific numeric override.

## Endpoint and approval

GA-A10 approves GA-D01-GA-D09 and requirements GA-R01-GA-R13 / GA-AC01-GA-AC26. Development approval remains pending. No source implementation is authorized, and the `news` repository remains read-only reference material.
