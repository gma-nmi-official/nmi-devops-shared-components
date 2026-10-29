# Manual testing reference for QA: Google Analytics

## Scope and handoff

- Requirements / acceptance criteria and automated test report: `requirements.md`, `acceptance_criteria.md`, `test_plan.md`, `execution/03_development_report_2026-10-26.md`
- Repository, branch, base/revision, and dirty diff reference: `D:\gno-node-projects\gno-shared-components-v2`, `feature/google-analytics`, HEAD `43dd02552014506b81600783cb0dcff3ab9d8791`, dirty Google Analytics diff; preserve unrelated `.playwright-mcp/`
- Environment / build / endpoint: Node 22.23.4, npm 10.9.9, Next.js 16.4.2, Chromium desktop 1440×900 and mobile 375×812; use the public `/docs/` Storybook entry and `/catalog` (the underlying static asset is `/storybook/index.html`)
- Prepared by and date: Vera handoff preparation, 2026-10-26 Asia/Shanghai
- QA recipient / owner: Pending assignment (repository owner / analytics privacy QA)
- Handoff: Prepared; not sent or executed
- Required manual checks: all cases below; none are N/A

## Preconditions and safe setup

Use synthetic IDs only (`G-TEST123`), injected spies, and the local Storybook/catalog build. Do not load a production tag, container, account, cookie, or personal data. From the repository root run `npm run build:package`, then build Storybook and start the local Next app. Capture browser console, network, and screenshot evidence. Reset consent and reload between cases.

## Cases

### Case GA-MT01: SSR-safe package import

- Requirement / acceptance criterion: GA-R01, GA-AC01, GA-NFR01
- Test level and required or optional: Manual integration, required
- Preconditions and input data: Node process with no `window` or `document`.

| Step | Action / exact command | Expected observable result |
| --- | --- | --- |
| 1 | Import the package from a Node/SSR fixture. | Import completes without browser-global errors or network calls. |
| 2 | Construct an instance with an injected GTM spy but do not grant consent. | No event is sent during import/construction. |

- Cleanup / reset: End the Node process.
- Actual result: Passed per user QA confirmation on 2026-10-27; SSR import and no-consent transport safety verified.
- Status: PASS

### Case GA-MT02: Direct gtag page views

- Requirement / acceptance criterion: GA-R03, GA-AC03, GA-AC04
- Test level and required or optional: Manual acceptance, required
- Preconditions and input data: Injected `gtag` spy and synthetic measurement ID.

| Step | Action / exact command | Expected observable result |
| --- | --- | --- |
| 1 | Grant consent and call `trackPageView` once. | Exactly one `page_view` call targets the configured measurement ID. |
| 2 | Navigate to a second local route and call the helper explicitly. | Exactly one additional page view; no automatic history duplicate. |

- Cleanup / reset: Clear spy calls and reload.
- Actual result: Passed per user QA confirmation on 2026-10-27; direct gtag page-view behavior verified.
- Status: PASS

### Case GA-MT03: GTM envelope

- Requirement / acceptance criterion: GA-R02, GA-AC05
- Test level and required or optional: Manual acceptance, required
- Preconditions and input data: Injected `dataLayer.push` spy.

| Step | Action / exact command | Expected observable result |
| --- | --- | --- |
| 1 | Grant consent and send click/search/generic events. | Only GTM pushes occur; each uses `gno_analytics_event`, `event_name`, and `event_params`. |
| 2 | Inspect the pushed values. | No direct `gtag` invocation or production endpoint request occurs. |

- Cleanup / reset: Clear the data layer spy.
- Actual result: Passed per user QA confirmation on 2026-10-27; GTM envelope and no-provider-request behavior verified.
- Status: PASS

### Case GA-MT04: Consent queue, grant, and denial

- Requirement / acceptance criterion: GA-R05, GA-AC12, GA-AC13, GA-AC14
- Test level and required or optional: Manual acceptance, required
- Preconditions and input data: Unknown, granted, and denied consent states.

| Step | Action / exact command | Expected observable result |
| --- | --- | --- |
| 1 | Send events while consent is unknown. | Events return queued and no transport call occurs. |
| 2 | Grant consent. | Queued events flush once in FIFO order. |
| 3 | Repeat with denied consent. | Events return dropped and the transport remains untouched. |

- Cleanup / reset: Recreate the analytics instance.
- Actual result: Passed per user QA confirmation on 2026-10-27; consent queue, grant flush, and denial behavior verified.
- Status: PASS

### Case GA-MT05: Queue expiry, overflow, disabled, and readiness

- Requirement / acceptance criterion: GA-R05, GA-R06, GA-AC15, GA-AC16, GA-AC17
- Test level and required or optional: Manual boundary/regression, required
- Preconditions and input data: Fake clock, capacity 2, max age 5 minutes, readiness false.

| Step | Action / exact command | Expected observable result |
| --- | --- | --- |
| 1 | Enqueue three events. | First two queue; newest is dropped for overflow. |
| 2 | Advance clock beyond max age and grant consent. | Expired entries are dropped and not sent. |
| 3 | Send while granted but not ready. | Result is `failed/not_ready`, with no retry queue. |

- Cleanup / reset: Restore timers and recreate the instance.
- Actual result: Passed per user QA confirmation on 2026-10-27; queue boundary, disabled, and readiness behavior verified.
- Status: PASS

### Case GA-MT06: Context cloning and dimensions

- Requirement / acceptance criterion: GA-R04, GA-AC06, GA-AC07, GA-AC08
- Test level and required or optional: Manual unit/acceptance, required
- Preconditions and input data: Built-in and registered custom dimensions.

| Step | Action / exact command | Expected observable result |
| --- | --- | --- |
| 1 | Set, get, update, and clear current parameters. | Returned snapshots can be mutated without changing stored state. |
| 2 | Send an event with an override. | Merge order is defaults, context, then call-specific fields. |
| 3 | Use `cbb` and `scitech` section values. | Values normalize to approved display labels. |

- Cleanup / reset: Recreate the instance.
- Actual result: Passed per user QA confirmation on 2026-10-27; context cloning, dimensions, and normalization verified.
- Status: PASS

### Case GA-MT07: Named event and video helpers

- Requirement / acceptance criterion: GA-R07, GA-AC09, GA-AC10, GA-AC11
- Test level and required or optional: Manual acceptance, required
- Preconditions and input data: Granted consent and transport spy.

| Step | Action / exact command | Expected observable result |
| --- | --- | --- |
| 1 | Trigger click, search, scroll, and generic helpers. | Exact approved event names and scalar fields are sent once. |
| 2 | Trigger video loaded and played with and without numeric override. | Names/categories match the contract and default value is numeric `0`. |
| 3 | Repeat a configured scroll milestone. | Deduplication prevents the second send. |

- Cleanup / reset: Clear spy calls and page state.
- Actual result: Passed per user QA confirmation on 2026-10-27; named events, video helpers, and scroll deduplication verified.
- Status: PASS

### Case GA-MT08: Validation and callback failures

- Requirement / acceptance criterion: GA-R08, GA-AC18, GA-AC19, GA-AC20, GA-AC21
- Test level and required or optional: Manual negative/acceptance, required
- Preconditions and input data: Reserved names, non-finite values, transport throw, callback timeout.

| Step | Action / exact command | Expected observable result |
| --- | --- | --- |
| 1 | Send reserved, malformed, oversized, and non-finite payloads. | Result is failed; no transport call occurs. |
| 2 | Make the transport throw. | `onError` observes the failure without crashing the consumer. |
| 3 | Exercise callback and timeout paths. | Callback fires at most once and timeout mapping is correct. |

- Cleanup / reset: Clear timers and recreate the instance.
- Actual result: Passed per user QA confirmation on 2026-10-27; validation, transport failure, and callback behavior verified.
- Status: PASS

### Case GA-MT09: Instance isolation

- Requirement / acceptance criterion: GA-R09, GA-AC22
- Test level and required or optional: Manual regression, required
- Preconditions and input data: Two instances with different contexts, consent, and transports.

| Step | Action / exact command | Expected observable result |
| --- | --- | --- |
| 1 | Send events from both instances. | Each destination receives only its own context and events. |
| 2 | Change consent on one instance. | The other instance's queue and consent remain unchanged. |

- Cleanup / reset: Dispose test instances and clear spies.
- Actual result: Passed per user QA confirmation on 2026-10-27; instance isolation verified.
- Status: PASS

### Case GA-MT10: Browser documentation and network safety

- Requirement / acceptance criterion: GA-R12, GA-R13, GA-NFR02-GA-NFR08, GA-AC23-GA-AC26
- Test level and required or optional: Manual browser/regression, required
- Preconditions and input data: Local `/docs` and `/catalog`, Chromium at 1440×900 and 375×812.

| Step | Action / exact command | Expected observable result |
| --- | --- | --- |
| 1 | Open `/docs/` and browse analytics stories. | Storybook loads, controls render, and no console errors occur. |
| 2 | Open `/catalog#google-analytics`, exercise consent controls and click tracking. | Preview is functional and uses only fake/injected transport behavior. |
| 3 | Inspect network requests. | No Google Analytics, GTM, or other production tracking request occurs. |
| 4 | Check both viewports. | No horizontal overflow or inaccessible controls. |

- Cleanup / reset: Close the browser and remove local build output if needed.
- Actual result: Passed per user QA confirmation on 2026-10-27; `/docs/`, catalog, viewport, and network safety behavior verified.
- Status: PASS

## Results and next action

Automated verification passes typecheck, lint, 73 unit tests, consumer fixtures, package dry-run, production build, and 32/32 desktop/mobile Playwright tests. The analytics runtime size is 16,380 bytes against the approved 16,384-byte budget. All manual cases are recorded PASS from the user's QA confirmation on 2026-10-27. Next action is the separate commit-approval artifact.
