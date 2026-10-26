# Test plan: Google Analytics

## Strategy

- Use injected direct-gtag spies and GTM dataLayer spies; automated tests must not call production GA endpoints.
- Use synthetic measurement IDs, page context, video labels, consent states, and failures.
- Verify exact event names, payloads, send count/order, immutability, and call results.
- Validate typed package imports, SSR, Storybook, approved browser compatibility, and generic JavaScript/TypeScript and Next.js fixtures.
- Create standalone `manual_testing.md` during verification with requirement-linked result fields.

## Coverage

| Area | Scenarios | Expected |
| --- | --- | --- |
| Configuration/transport | Direct measurement IDs and gtag transports; GTM dataLayer/container mode; enabled/disabled; invalid config | Isolated deterministic instances; correct GTM event envelope; no embedded production or container ID |
| Context | Set/get/update/clear, cloned snapshots, partial nested updates, merge precedence, unknown keys, empty values, normalization | Only supplied approved keys change; unrelated stored context is preserved and external mutation is impossible |
| Page view | Default/override path/title/location/portal/context; initial load and Next.js history navigation in both transports; tag default and Enhanced Measurement settings | Exact approved `page_view`; explicit direct/GTM route; no automatic or history-listener duplicate |
| Generic/click | Required/optional fields, custom name, callback/timeout, reserved keys, invalid values | Exact validated payload, adapter mapping, at-most-once callback, and documented result |
| Search | Valid/invalid search event | Exact `search` payload once |
| Scroll | Configured event name, thresholds/milestones or triggers, repeat/deduplication, fields, partial dimension changes | Event follows consumer configuration with latest context and configured deduplication behavior |
| Video | Load/play callbacks, repeated callbacks, context overrides, selected canonical value policy | Exact `loaded_a_video` and `played_a_video`; approved category/value/context; duplicates handled as approved |
| Consent | Unknown/denied/granted transitions, queue capacity/lifetime/overflow/expiry, and flush | Approved queue/drop/replay; each entry removed once; no unauthorized event |
| Readiness | Every readiness/consent state-table row, missing/delayed transport, initialization order, manual flush | Exact result; no readiness queue unless separately approved; bounded behavior |
| Failures | Transport throw, callback throw, invalid payload/normalizer | Error hook/result; consumer remains stable |
| SSR | Import/server execution/hydration | No browser-global access or server send |
| Independence | Static/output scan and browser trace | No Portal Header, Cookie Agreement, jQuery, non-GA trackers, or DOM side effects |
| Reference parity | Approved reference payload examples | Required algorithms are preserved through the optimized API without legacy globals or bridges |
| Package/docs | Build/pack/JS/TS/Next.js/SSR/browser examples for direct gtag and GTM, Storybook/catalog | All public APIs and states are current and buildable |
| CI | Clean Bitbucket candidate | Full gate passes at exact revision |

## Exit criteria

All applicable acceptance criteria pass against the same revision; privacy and analytics owners approve consent and event schemas; manual QA is complete; Storybook, catalog, API docs, consumer setup, reference mapping, and changelog are current; and independent review has no open required finding.
