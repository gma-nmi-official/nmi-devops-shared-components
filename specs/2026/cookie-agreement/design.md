# Solution design: Cookie Agreement

## Interface and behavior

Proposed `packages/ui/src/components/cookie-agreement/` owns the component, consent types, optional store adapter, repository-local assets, tests, story, and styles. It has its own public export and CSS and is independently imported, rendered, configured, tested, and released. It does not import, wrap, render, configure, or share runtime state with Portal Header.

Controlled inputs include current record/status, policy version, approved copy, action labels, an opt-in Reject configuration, configurable `scrollRevealThreshold`, separate optional URL overrides for `FIND OUT MORE` and the NPC seal, optional seal content, functional decision callbacks, and a storage-error callback. The default visible text controls are `I AGREE` and `FIND OUT MORE`; Reject is hidden unless configured. `FIND OUT MORE` defaults to `https://www.gmanetwork.com/privacypolicy/`; the NPC seal defaults to `https://www.gmanetwork.com/news/privacy-notice/`. Approved overrides must be absolute HTTPS URLs. The approved model has no category-preference UI or customized status.

The current persistent record fields are `policyVersion`, `status` (`accepted`),
`decidedAt`, and optional `expiresAt`. Reject is currently a session-only
dismissal and does not write a `rejected` record or change cookie/service policy.
`ConsentStore` exposes `read`, `write`, and `clear`; cookie attributes and
retention are adapter configuration, not presentation constants. A persistent
`rejected` status is deferred pending a new privacy decision.

The approved persistence default is a configurable host-only cookie named
`gno_cookie_consent`, path `/`, `SameSite=Lax`, `Secure=true` over HTTPS, and a
365-day expiry. `policyVersion` is required from the consumer; revocation clears
the record; legacy `_ckn` is not read or migrated by default. Consumers may
override these adapter defaults through the typed persistence interface.

Unknown/malformed/expired/version-mismatched storage returns the approved safe state,
requiring an explicit decision. A decision-required surface is fixed to the
viewport bottom and hidden until `scrollRevealThreshold` (default `0.1` of the
viewport height) is reached, then slides upward into view. Clicking `I AGREE` writes acceptance;
an enabled Reject action only dismisses the surface for the current page session,
and refresh shows it again. Cookie Agreement does not load, block, enable,
disable, or configure consumer cookies, services, or analytics.

## Approved content contract

The approved default content is recorded in `requirements.md`. The component has
no visible title by default but exposes the accessible
surface name `Cookie notice`. Body and action labels are configurable plain text;
raw HTML is not accepted. The default body requires an explicit `I AGREE` action
and does not describe continued browsing or passive interaction as consent.
`REJECT` is the default label only when the opt-in Reject action is enabled.

## Production-reference presentation

The production [stylesheet](https://aphrodite.gmanetwork.com/assets/revamp/css/build/widgets/header_style.css)
and [JavaScript](https://aphrodite.gmanetwork.com/assets/revamp/js/build/widgets/header.js)
are design references only. Extraction is restricted to the `.ckn-*` rules and
the `CookieNotification` module documented in `reference_analysis.md`; no other
Portal Header behavior or styling enters this component.

The approved visual direction retains the recognizable fixed-bottom surface,
dark translucent background, red top accent and actions, white copy, optional
seal area, and responsive copy/action grouping. The surface starts hidden and
slides upward after vertical scroll reaches `scrollRevealThreshold` (default
`0.1` of viewport height). The new
implementation uses namespaced component classes and tokens, content-driven
height, safe-area spacing, visible keyboard focus, reduced-motion behavior, and
repository-local approved artwork. The 768/769 px reference split is a test
candidate until the responsive matrix is approved, not a mandatory breakpoint.

The optional seal uses
[`gno-npc-seal.webp`](https://images.gmanetwork.com/res/img/gno-npc-seal.webp)
(230×400 px) as its approved visual reference. If rights are confirmed and the
seal is included, implementation copies the verified asset into the package,
preserves its aspect ratio, and exposes no remote runtime request. The seal is an
interactive link to its own configurable seal privacy destination. It requires a
descriptive accessible name, visible focus, keyboard activation, and safe
external-link behavior. `FIND OUT MORE` has a separate configurable destination;
neither link records a consent decision.

Storybook must make the artwork contract reviewable without a consumer app. Its
inventory includes a default decision-required story with the repository-local
NPC seal, a no-seal fallback, mobile and desktop seal layouts, long-copy behavior
with the seal present, both default destinations, independent valid custom HTTPS
destinations, the default acknowledgment presentation, and a separate
Reject-enabled configuration.
Controls may toggle optional artwork/configuration but must not introduce a
remote runtime URL. Story accessibility checks cover image semantics, focus and
keyboard behavior when interactive, responsive sizing, and reduced motion.

The current interaction keeps the surface visible until an explicit `I AGREE`
acceptance or an enabled session-only Reject dismissal. Refresh restores the
decision-required surface after a Reject dismissal. No passive interaction
records consent. The component must not use
jQuery, js-cookie globals, direct DOM injection, global selectors/IDs, hard-coded
`_ckn` persistence, analytics, remote fonts or artwork, or the legacy custom
document event. Decision controls are semantic buttons; privacy navigation is a
validated link. Copy, action semantics, storage, breakpoint behavior, and final
tokens remain subject to their recorded approvals.

## Decisions

| ID | Requirement | Proposed decision | Alternative | Rationale | Approval |
| --- | --- | --- | --- | --- | --- |
| CA-D01 | CA-R01 | Independent `CookieAgreement` export and public consent types | Coupled portal shell | Independent adoption/release | Pending |
| CA-D02 | CA-R02-CA-R07 | Controlled UI plus optional store/event adapters | Hard-coded `_ckn` cookie | Explicit policy ownership/testability | Pending |
| CA-D03 | CA-R03, CA-R04 | Persistent `accepted` record only for the current phase; default UI shows `I AGREE` and `FIND OUT MORE`; Reject is opt-in, hidden by default, and session-only | Persisted Reject, category preferences, or always-visible Reject | Keeps the temporary Reject behavior reversible while avoiding an unapproved persistent policy | User approved current-phase dismissal; persistent rejected model deferred |
| CA-D04 | CA-R08, CA-R09 | Narrow client module with deterministic initial state | Package-wide client/global storage | SSR predictability | Pending |
| CA-D05 | CA-R06, CA-R10 | Local implementation with all approved assets stored and versioned in this repository | Load remote or legacy notice/assets | Security, reproducibility, and rights boundary | Pending |
| CA-D06 | CA-R11 | Complete vertical unit with tests/story/catalog/docs | Documentation later | Required repository policy | Pending |
| CA-D07 | CA-R06, CA-R08, CA-R10 | Adapt only the reference `.ckn-*` visual language and `CookieNotification` observations; rebuild with semantic, accessible, namespaced React/CSS | Reuse the full legacy header assets or reproduce them verbatim | Preserves recognizable presentation without importing unrelated coupling or obsolete behavior | User approved reference scope; final tokens/behavior pending |
| CA-D08 | CA-R06, CA-R08, CA-R10 | Use the supplied GNO NPC seal as optional repository-local artwork; give the seal and `FIND OUT MORE` independent configurable HTTPS destinations with their approved defaults | Load the seal remotely, fix either URL, or couple both links to one setting | Matches the approved visual/source and distinct privacy navigation while preserving offline packaging and consumer configuration | User approved reference, interaction, and defaults; rights pending |
| CA-D09 | CA-R02, CA-R08 | Fixed-bottom surface hidden until `scrollRevealThreshold` (default `0.1` viewport height), then animated upward | Immediate visibility or legacy multi-event reveal | Matches the corrected requested interaction while keeping consent explicit | User approved CA-A21; supersedes CA-A19 immediate visibility |

## Migration/recovery

Privacy owner decides whether legacy `_ckn=1` is migrated, treated as expired, or retained for a transition. Existing production notice remains until separately approved consumer migration. Rollback removes integration or reverts the package release; record compatibility must prevent accidental consent loss or false consent.

## Approval

See `wbs.md`. Privacy/legal, requirements, and development approvals are pending.
