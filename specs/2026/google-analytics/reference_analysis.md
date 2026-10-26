# Reference analysis: Google Analytics

## Repositories and source

| Repository | Revision inspected | Relevant source |
| --- | --- | --- |
| `C:\laragon\www\news` | Originally inspected at `feature/api-connectivity-checker` / `16c98484aeecdec2ba4552e5f5f834d029d7a7b4`; refreshed at `hotfix/GNO-21329` / `28d3312872ac7dee53215939faeeda50b0d37e87` on 2026-10-26 | `res/js/custom_analytics.js`, loader/consent files, call sites |
| `D:\gno-node-projects\gno-shared-components-v2` | `feature/google-analytics` / `43dd02552014506b81600783cb0dcff3ab9d8791`; base `master` / `e8132b6f227a8453dc07abf0d06710b876770805` | Target shared package and project specifications |

The `news` worktree already contains untracked `.codex/` and `AGENTS.md`; they are unrelated and must be preserved. The current reference file has 320 content lines and is read-only evidence. The reference file and inspected video evidence have no Git diff between the original adoption revision and the refreshed revision, so the algorithm observations remain current.

## Reference API

| Legacy member | Observed behavior | Proposed destination |
| --- | --- | --- |
| `sendPageView` | Reads URL/title/meta keywords and defaults, stores current context, calls page reporting | `trackPageView` plus configured/default context |
| `setCurrentParams` / `getCurrentParams` | Stores and shares mutable page context across page modules/widgets | Safe instance methods with the same names plus partial `updateCurrentParams` and clear behavior |
| `send_click_event` | Merges current context, configures GA4, sends named action | `trackEvent`; no compatibility alias |
| `ga_click_event` | Configures GA4 and sends click/action fields | `trackClick` or `trackEvent` |
| `ga_send_event` | Configures page path/title/location and invokes unrelated trackers | `trackPageView`; exclude unrelated side effects |
| `ga_search_event` | Sends `search` with category/label/value | `trackSearch` |
| `set_event_params` | Combines page fields and custom dimensions | Pure payload builder |
| `custom_values` | Normalizes `cbb` and `scitech` section values | Configurable pure normalizer |
| other-site handler | Sends explicit NCAA page view based on URL segment | Configured `portalSection`; no path inspection |

Repository search found extensive coupling: approximately 335 `ga_click_event`, 136 `ga_send_event`, 66 `send_click_event`, 42 `sendPageView`, 11 `getCurrentParams`, and 5 `setCurrentParams` references across current and historical assets. Counts are inventory signals, not a claim that every path is active production code.

## Required observed event behavior

### Page view

- `sendPageView` creates the complete known GA4 custom-dimension object first. `author`, `subsection`, `audience_interest`, `source`, `publish_date`, `content_id`, `section`, and `show_name` start as empty strings; `content_type` and `keywords` use page-derived defaults when available.
- The reference `custom_map` maps `dimension6` through `dimension15` to those ten fields. `portal_section` is sent as a GA4 parameter elsewhere in the reference, not in this `custom_map`; the requested shared default schema adds it as a normal dimension and permits consumers to register further mapped dimensions.
- Only recognized keys from the supplied parameters replace those defaults; `section` and `subsection` are converted to title case.
- `set_event_params` copies every custom-dimension value that is not `undefined`, so the legacy payload includes keys whose values are empty strings.
- Event: `page_view` or the legacy GA4 configuration behavior, pending GA owner decision.
- Page fields: `page_path`, `page_title`, `page_location`, and `portal_section`.
- Content context: `content_type`, `author`, `subsection`, `audience_interest`, `source`, `publish_date`, `keywords`, `content_id`, `section`, and `show_name`.
- The legacy default portal section is `News`; NCAA overrides it to `NCAA` by inspecting the first URL segment.

### Video

- `loaded_a_video` is sent after a player load callback.
- `played_a_video` is sent after a player playing callback.
- Observed fields include `event_category` (`Video Load` or `Video Play`), `event_label` (video URL/path), `event_value`, and the current content context. The reference is inconsistent: `res/js/video_player.js` uses `1`, while representative modern video and livestream call sites use `0`. The shared contract must not claim one value is preserved until the analytics owner selects `0`, `1`, or a caller/configuration-supplied value.
- AMP controller data builds the same names and adds content metadata, but AMP transport/parity requires an explicit decision.

### Click and search

- Click/action calls commonly provide `action`, `event_category`, `event_label`, `event_value`, optional `event_action`, `event_name`, `page_location`, and callback.
- Search sends the `search` event with category, label, and value.
- Event names in the wider repository are inconsistent in case and spacing; analytics owners must approve the shared naming policy before implementation.
- Page modules and widgets use `getCurrentParams` to access the same mutable object, then replace or alter selected custom dimensions through consumer code. The reference has no safe partial-update method. The shared API must provide cloned replacement, cloned snapshot reads, and `updateCurrentParams` partial merging. The shared component must make scroll naming, triggers, repeat behavior, fields, and dimension updates configurable for each consumer.

## Loader and consent evidence

- `application/views/page_components/header_js_registry.php` loads GA4 `gtag.js`, `gaTracking.js`, `cookie_consent_gtag_configuration.js`, and `custom_analytics.js` separately.
- `GLOBAL_GA4_ID_GNO` is emitted by `header_js_globals.php`.
- `cookie_consent_gtag_configuration.js` owns consent defaults and updates, local storage, region behavior, and Cookie Consent UI loading.
- The inspected `custom_analytics.js` calls `gtag()` directly. No GTM container bootstrap, `dataLayer.push()` event protocol, or GTM tag/trigger setup was observed in this file.
- The root has `package-lock.json` but no root `package.json`; current assets use PHP registries and `console/assets_minifier.php` conventions.

## GTM scope requested for the shared component

The source reference does not itself implement a GTM transport. The user has requested GTM support as an additional consumer integration path. Treat direct `gtag.js` and GTM as separate transport adapters over the same normalized event payloads:

- Direct `gtag.js`: consumer loads/configures the Google tag, provides its transport, and supplies the runtime GA4 measurement ID.
- GTM: consumer loads its own container and configures its Google tag/GA4 event tag and triggers. The shared component sends a documented analytics envelope through the consumer's `dataLayer`; the container resolves the GA4 destination.
- The component must not inject either loader. The GTM container ID and GA4 destination configuration remain consumer-owned; GTM is not a reason to hard-code or load an ID in this package.
- Disable automatic page views in the consumer's Google tag configuration for either route because the component sends explicit page views.

The proposed GTM envelope still needs formal requirements/design review. A fixed custom event key with a separate `event_name` and event-parameter object avoids conflating GTM's trigger event with the GA4 event name. Google documents `dataLayer.push()` as the GTM event/data interface and requires the consumer container's tags/triggers to interpret that data.

Official references: [Google Tag Manager data layer](https://developers.google.com/tag-platform/tag-manager/datalayer), [Google consent-mode setup](https://developers.google.com/tag-platform/security/guides/consent), [Google Analytics event setup](https://developers.google.com/analytics/devguides/collection/ga4/events), [manual and automatic page views](https://developers.google.com/analytics/devguides/collection/ga4/views), and [Google tag event parameters](https://developers.google.com/tag-platform/gtagjs/reference/parameters).

## Problems to remove from the shared design

- Unchecked browser globals: `gtag`, `GLOBAL_GA4_ID_GNO`, `base_url`, `sec_caps`, `window`, `document`, and jQuery.
- Shared mutable `currentParams` and input mutation through `Object.assign`.
- Duplicate `event_value` assignment and mixed `config` versus explicit `page_view` behavior.
- Direct DOM work, third-party tracker calls, and unconditional Mookie script insertion inside page reporting.
- Hard-coded portal defaults, URL-path site detection, and section normalization.
- Missing explicit readiness, consent, invalid-payload, transport-failure, and duplicate-event contracts.

## Recommendation

Build a framework-neutral analytics instance with immutable context/payload construction and two consumer-owned transport adapters: direct `gtag.js` with a runtime measurement ID, or GTM through the consumer's `dataLayer` and container configuration. Consolidate the reference into one context/default pipeline, one page-view path, and one named-event path, with small helpers for required GNO events. Treat `news` only as algorithm evidence; do not add a compatibility bridge or consumer integration. Keep consent UI/state ownership and all non-GA trackers outside the analytics module.
