# User stories: Google Analytics

## Scope decisions

- The shared package owns a framework-neutral analytics service, payload construction, consent/readiness gating, and direct-gtag/GTM adapters.
- Consumers own script/container loading, runtime destinations, consent decisions, tag configuration, and application wiring.
- `C:\laragon\www\news\res\js\custom_analytics.js` and its call sites are read-only algorithm evidence, not an integration target or compatibility API.
- Non-GA trackers, DOM behavior, production identifiers, consumer rollout, and AMP parity are outside this delivery.

## GA-US01: Configure an isolated analytics instance

**As a** package consumer,
**I want** to configure one direct-gtag or GTM analytics instance with its own destination, defaults, dimensions, consent, readiness, and hooks,
**So that** multiple applications or instances cannot leak analytics state or identifiers to each other.

Acceptance links: GA-AC01-GA-AC03, GA-AC09-GA-AC14, GA-AC23, GA-AC25-GA-AC26.

## GA-US02: Maintain immutable page context

**As a** feature developer,
**I want** to replace, read, clear, and partially update registered page-context values without mutating caller data,
**So that** navigation, infinite scroll, and dynamic content retain the intended dimensions without stale-value leakage.

Acceptance links: GA-AC04, GA-AC05, GA-AC08, GA-AC22-GA-AC24.

## GA-US03: Send one explicit page view

**As an** analytics owner,
**I want** one normalized `page_view` for the initial page and each approved client-side navigation,
**So that** tag defaults and Enhanced Measurement history listeners do not duplicate reporting.

Acceptance links: GA-AC04, GA-AC10, GA-AC16-GA-AC18, GA-AC25.

## GA-US04: Track reusable named events

**As a** feature developer,
**I want** a generic event function plus click, search, scroll, video-loaded, and video-played helpers,
**So that** approved event names and context are constructed consistently without legacy globals or redundant functions.

Acceptance links: GA-AC05-GA-AC08, GA-AC17, GA-AC22, GA-AC24.

GA-A10 approves numeric `0` as the helper default with a configured per-instance default or call-specific numeric override for legacy `1` paths.

## GA-US05: Respect consent and delivery readiness

**As a** privacy owner,
**I want** deterministic sent, queued, dropped, and failed outcomes for every consent/readiness transition,
**So that** no event is sent before the consumer's approved consent and transport conditions are satisfied.

Acceptance links: GA-AC09-GA-AC11, GA-AC15-GA-AC18, GA-AC26.

GA-A10 approves the state table and the 100-entry, five-minute FIFO policy with reject-newest overflow, expiry drops, and no automatic transport retry.

## GA-US06: Integrate and verify the package safely

**As a** consumer and release owner,
**I want** typed exports, Storybook/catalog guidance, package/browser/Next.js/SSR fixtures, and release documentation,
**So that** the analytics service can be evaluated without production IDs, production network calls, or unrelated component dependencies.

Acceptance links: GA-AC01-GA-AC03, GA-AC12-GA-AC21, GA-AC25-GA-AC26.
