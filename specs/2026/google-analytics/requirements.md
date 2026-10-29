# Requirements: Google Analytics

| ID | Requirement | Source | Acceptance link | Status |
| --- | --- | --- | --- | --- |
| GA-R01 | Export a standalone configurable analytics factory/service and public types for JavaScript/TypeScript consumers. | User/foundation | GA-AC01, GA-AC02 | Approved GA-A10 |
| GA-R02 | Accept exactly one consumer-selected direct `gtag.js` or GTM `dataLayer` transport per instance, default and additional dimension definitions, scroll behavior, enabled/debug state, readiness, consent, bounded unknown-consent queue policy, normalizers, and error hooks. Direct gtag receives the consumer's runtime GA4 measurement ID; GTM resolves its destination from consumer-owned container configuration. No loader or production/container ID is embedded. | User/reference/privacy | GA-AC03, GA-AC10, GA-AC22, GA-AC25 | Approved GA-A10 |
| GA-R03 | Include `setCurrentParams`, `getCurrentParams`, and `updateCurrentParams`, one page-view function, and one generic named-event function; expose click, search, scroll, `loaded_a_video`, and `played_a_video` as thin helpers over the generic event path. | User/reference | GA-AC04-GA-AC08, GA-AC22 | Approved GA-A10 |
| GA-R04 | Build immutable page-view payloads with approved `page_path`, `page_title`, `page_location`, `portal_section`, and content-context fields without reading consumer globals. | Reference | GA-AC04 | Approved GA-A10 |
| GA-R05 | Send generic/click/search events and configurable scroll events without mutating caller input. Support `event_action`, `event_label`, `event_value`, callback handling, and consumer-supplied additional GA event parameters. Scroll configuration covers event name, triggers or milestones, repeat/deduplication, payload fields, and dimension updates. | User/reference | GA-AC05, GA-AC06, GA-AC22, GA-AC24 | Approved GA-A10 |
| GA-R06 | Send exact `loaded_a_video` and `played_a_video` event names with approved labels, `Video Load` / `Video Play` categories, and current content context. Default `event_value` to numeric `0`; allow a configured per-instance default or call-specific numeric override, preserving the legacy `1` case without making helper behavior inconsistent. | User/reference/GA-D01 | GA-AC07 | Approved GA-A10 |
| GA-R07 | Initialize the default string dimensions from reference `sendPageView`, including `portal_section`, to empty strings; retain empty strings in outgoing payloads; allow configured additional dimensions; and provide pure normalization. `setCurrentParams` replaces context, `getCurrentParams` returns an isolated snapshot, and `updateCurrentParams` partially merges only registered keys while preserving all others. | User/reference | GA-AC08, GA-AC22 | Approved GA-A10 |
| GA-R08 | Define deterministic SSR, disabled, transport-not-ready, consent-unknown, consent-denied, queue-overflow/expiry, manual-flush, invalid-payload, duplicate-call, callback/timeout, and transport-failure behavior without crashing the consumer. Queue only during unknown consent in an in-memory FIFO with default capacity 100 and five-minute lifetime; reject newest on overflow; drop expired entries; do not automatically retry ambiguous transport failures. Denial drops and clears; grant flushes still-valid events once only when ready. | Reliability/privacy/GA-D03-GA-D05 | GA-AC09-GA-AC11, GA-AC26 | Approved GA-A10 |
| GA-R09 | Remain independent of Portal Header and Cookie Agreement; accept neutral consent/readiness input without importing or controlling either component. | User/component boundary | GA-AC12 | Approved GA-A10 |
| GA-R10 | Treat `news/res/js/custom_analytics.js` only as algorithm evidence; do not import it, depend on its globals, expose its redundant legacy names, or modify the `news` repository in this delivery. | User/reference boundary | GA-AC02, GA-AC13 | Approved GA-A10 |
| GA-R11 | Contain no Facebook Pixel, Effective Measure, Mookie/tagr, advertising, DOM cleanup, jQuery, URL-path site detection, or other non-GA side effect. | Reference separation | GA-AC14 | Approved GA-A10 |
| GA-R12 | Include unit, privacy-negative, SSR, package, Chromium desktop/mobile, Next.js 16.4.2, and generic consumer-fixture validation for both transport modes using spies and no production network calls. Firefox/WebKit are outside the approved automated matrix. | GNO policy/GA-D06-GA-D07 | GA-AC15-GA-AC18, GA-AC25 | Approved GA-A10 |
| GA-R13 | Include a dedicated Storybook test harness, catalog guidance, API/event-schema documentation, consumer setup, reference-algorithm mapping, and changelog evidence in the delivery unit. | GNO policy | GA-AC19-GA-AC21 | Approved GA-A10 |

## Required default dimensions

`content_type`, `author`, `subsection`, `audience_interest`, `source`, `publish_date`, `keywords`, `content_id`, `section`, `show_name`, and `portal_section` are the approved default string dimensions. Each starts as `""` when no value is supplied and remains present in outgoing payloads. Consumers may register additional dimension keys, defaults, mappings, and normalizers through configuration.

## Approved contract decisions

GA-A10 approves GA-D01-GA-D09 in `execution/01_requirements_approval_package_2026-10-26.md`: the video-value policy, GTM envelope, callback/timeout API, readiness/consent state table, queue defaults, Chromium matrix, explicit page-view ownership, event/schema validation, and public API names.

## Approval

Approved by GA-A10 on 2026-10-26 Asia/Shanghai. Development approval remains pending.
