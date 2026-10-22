# Work breakdown structure: Portal Header

## Scope

Build a reusable Portal Header with navigation links, social links, search, responsive behavior, accessibility, Storybook documentation, catalog guidance, and consumer examples.

## WBS summary

| Phase | Work area | Requirements | Owner | Depends on | Status |
| --- | --- | --- | --- | --- | --- |
| PH-01 | Confirm content and behavior | PH-R02-PH-R04, PH-R07 | Athena and product owners | Requirements approval | Complete; PH-A10 |
| PH-02 | Define the public component API | PH-R01, PH-R07, PH-R09 | Forge | PH-01 and development approval | Complete; report 05 |
| PH-03 | Build the header and responsive navigation | PH-R02, PH-R03, PH-R08 | Forge | PH-02 | Complete; report 05 |
| PH-04 | Build social links and search | PH-R02, PH-R04 | Forge | PH-03 | Complete; report 05 |
| PH-05 | Add stories, documentation, and consumer examples | PH-R11, PH-R12 | Forge and Vera | PH-03 and PH-04 | Complete; report 05 |
| PH-06 | Validate, review, and prepare delivery | All approved requirements | Vera, Argus, and Orion | PH-01-PH-05 | Verification/review complete; report 14 prepares the exact commit gate, approval pending |
| PH-07 | Align visual structure to the live News header | PH-R02, PH-R03, PH-R08, PH-R11 | Forge | PH-A12 and PH-A13 | Complete; report 07 |
| PH-08 | Revalidate revised candidate | All requirements including PH-AC20 | Vera and Argus | PH-07 | Complete for approved scope; report 13 closes review |
| PH-09 | Add complete ordered production navigation defaults | PH-R02, PH-R03, PH-R11 | Forge | PH-A14 and PH-A15 | Complete; report 09 |
| PH-10 | Revalidate navigation/icon correction | All requirements including PH-AC21-PH-AC22 | Vera and Argus | PH-09 | Complete for approved scope; report 13 closes review |
| PH-10a/PH-10b | Correct and revalidate logo-label optical alignment | PH-AC20 at desktop/mobile widths | Forge then Vera | PH-10 configured automation | Complete; configured revalidation passes |
| PH-10c-PH-10e | Execute PH-MT02, correct PH-VF03, and independently revalidate | PH-AC04, PH-AC10 | Vera, Forge, then Vera | PH-10b | Complete; PH-MT02 retest passes |
| PH-10f-PH-10j | Complete local QA, owner decisions, installed-browser verification, revised-scope closure, and final independent validation | PH-AC05, PH-AC10, PH-AC18 | Vera, user, Atlas | PH-10e | Complete; report 10j passes and candidate is ready for Argus |
| PH-12a/PH-12b/PH-13 | Implement, independently revalidate, and close approved review corrections ARG-PH-01 through ARG-PH-03 | PH-R02, PH-AC02, PH-AC15, PH-AC18 | Forge, Vera, then Argus | PH-A22 | Complete; reports 12a/12b/13, no required finding remains |
| PH-14 | Prepare the exact Portal Header commit gate without staging | All approved requirements and closed review findings | Orion | PH-13 | Complete; report 14, explicit commit approval pending |

## PH-01 — Confirm content and behavior

| ID | Task | Output | Owner |
| --- | --- | --- | --- |
| PH-01.1 | Define the header variants, section labels, and supported layouts. | Approved header configuration matrix | Product owner |
| PH-01.2 | List primary and network navigation links, including ordering, active state, disabled state, and external-link behavior. | Navigation fixtures and behavior rules | Product/content owner |
| PH-01.3 | Define social presets, types, accessible labels, repository-local icons, destinations, override/hide/append ordering, and external-link behavior without analytics. | PH-A08/PH-A09: approved six-type schema, HTTPS Entertainment/News presets, and deterministic consumer patches | Product/content and brand owners |
| PH-01.4 | Define search placeholder, validation, submission mode, destination or callback contract, and error behavior. | Approved search contract and fixtures | Product/consumer owners |
| PH-01.5 | Inventory the logos, icons, fonts, colors, file formats, repository paths, sources, and redistribution rights. | `asset_inventory.md`; logo/Font Awesome Free plus system-font, fallback, and package-token defaults approved | Brand and repository owners |

**Phase complete when:** all content, repository asset, search, and routing decisions are recorded and the requirements are approved.

## PH-02 — Define the public component API

| ID | Task | Output | Owner |
| --- | --- | --- | --- |
| PH-02.1 | Define PortalHeader props for branding, navigation, social links, search, theme, and link rendering. | Public TypeScript interface | Forge |
| PH-02.2 | Define navigation, social-link, search, and theme data types. | Exported public types | Forge |
| PH-02.3 | Define default anchor behavior and the optional router-link adapter. | Link-rendering contract | Forge |
| PH-02.4 | Define component CSS variables and default design tokens without embedding consumer assets. | Public CSS contract | Forge and design owner |
| PH-02.5 | Configure component, type, and CSS exports while preserving the narrow client boundary. | Buildable package exports | Forge |
| PH-02.6 | Confirm the supported browser matrix and whether the optional Next.js router adapter is required. | Compatibility and integration decision | Architecture and consumer owners |

**Phase complete when:** the browser/Next.js compatibility decision is recorded and TypeScript, package build, package inspection, and JavaScript/TypeScript import checks pass for the proposed public API.

## PH-03 — Build the header and responsive navigation

| ID | Task | Output | Owner |
| --- | --- | --- | --- |
| PH-03.1 | Build the semantic header, home/brand link, section label, and navigation regions. | Base PortalHeader component | Forge |
| PH-03.2 | Render primary and network navigation from consumer data. | Configurable navigation lists | Forge |
| PH-03.3 | Implement active, disabled, internal, and external link states. | Link-state behavior and tests | Forge and Vera |
| PH-03.4 | Build the responsive menu, open/close controls, Escape behavior, outside-click behavior, and focus restoration. PH-A12 supersedes the initial off-canvas presentation with a full-width dropdown. | Accessible responsive dropdown | Forge |
| PH-03.5 | Add responsive styling for mobile, tablet, desktop, long labels, zoom, and reduced motion. | Component stylesheet | Forge |
| PH-03.6 | Test keyboard access, focus order, menu announcements, overflow, and server rendering/hydration. | Component and accessibility tests | Vera |

**Phase complete when:** navigation works with keyboard and pointer input, approved viewport tests pass, and the page has no unintended horizontal overflow.

## PH-04 — Build social links and search

| ID | Task | Output | Owner |
| --- | --- | --- | --- |
| PH-04.1 | Implement immutable Entertainment/News defaults and render stable-ID overrides, hidden defaults, and appended social links with approved icons, accessible names, HTTPS validation, targets, and safe external-link attributes; emit no analytics behavior. | Social-link component area and tests | Forge and Vera |
| PH-04.2 | Build the search input, label, open/close behavior when applicable, and submit control. | Accessible search interface | Forge |
| PH-04.3 | Reject blank searches and support the approved native-form or callback submission contract exactly once per valid submission. | Search behavior and tests | Forge and Vera |
| PH-04.4 | Implement safe handling for missing icons, invalid links, incomplete search configuration, and router-adapter failures. | Failure-state tests | Forge and Vera |

**Phase complete when:** social links and search pass unit, interaction, accessibility, and browser tests using synthetic fixtures.

## PH-05 — Add stories, documentation, and consumer examples

| ID | Task | Output | Owner |
| --- | --- | --- | --- |
| PH-05.1 | Add Storybook stories and controls for desktop, mobile, open menu, link states, social links, search, long content, themes, and failures. | Dedicated Portal Header stories | Forge |
| PH-05.2 | Add the catalog preview, supported states, configuration guidance, accessibility notes, imports, and Storybook link. | Catalog entry | Forge |
| PH-05.3 | Add package documentation and plain JavaScript, TypeScript, and Next.js consumer examples. | README guidance and buildable fixtures | Forge and Vera |
| PH-05.4 | Document migration mapping, intentionally unsupported legacy behavior, consumer impact, SemVer classification, and validation evidence. | Migration guide and changelog entry | Athena, Forge, and Orion |

**Phase complete when:** Storybook and catalog builds pass, all public states are documented, and packed-package consumer examples build successfully.

## PH-06 — Validate, review, and prepare delivery

| ID | Task | Output | Owner |
| --- | --- | --- | --- |
| PH-06.1 | Run typecheck, lint, unit tests, accessibility tests, package build, Storybook build, Next.js build, and package dry run. | Automated verification report | Vera |
| PH-06.2 | Run Playwright tests for desktop/mobile navigation, menu behavior, social links, search, overflow, console errors, and failure states. | Browser verification evidence | Vera |
| PH-06.3 | Execute manual keyboard, screen-reader, zoom, responsive-layout, and consumer-example cases. | Completed manual_testing.md | Assigned QA |
| PH-06.4 | Verify the approved GitHub Actions release workflow against the exact tagged revision. | GitHub Actions and package-artifact evidence | Repository owner and Vera |
| PH-06.5 | Review the complete change set independently against the approved requirements and design. | Independent review decision | Argus |
| PH-06.6 | Prepare commit, push, pull-request, release, and consumer-handoff details under their separate approval gates. | Operations handoff records | Orion |

**Phase complete when:** every applicable acceptance criterion passes for the same revision, manual QA is complete, independent review has no open required finding, and the requested Git action has its separate approval.

## Delivery order

PH-01 → PH-02 → PH-03 → PH-04 → PH-05 → PH-06

PH-05 documentation may start while PH-03 and PH-04 are being completed, but it cannot close until the public API and behavior are validated. No implementation phase begins before requirements and development approval.

## PH-07 — Production visual alignment

1. Replace the neutral light/two-row desktop layout and off-canvas drawer with the approved compact dark bar and full-width responsive dropdown.
2. Add configurable section accent and production-compatible dimension/color/font CSS variables without importing the legacy stylesheet or remote font assets.
3. Move all navigation into the dropdown; keep desktop socials/search/grid in the bar and mobile search/socials inside the dropdown.
4. Update unit/a11y tests, Storybook states, catalog examples, Playwright visual-structure assertions, consumer documentation, migration guidance, and changelog.
5. Record exact production-reference measurements, implementation evidence, and affected verification results.

PH-07 is approved by PH-A12/PH-A13. PH-08 must revalidate affected evidence before Argus review.

## PH-09 — Complete ordered navigation

1. Add the immutable 4-link primary and 12-link network `gma` preset using the verified production labels, HTTPS destinations, and DOM order.
2. Resolve stable-ID overrides, hidden defaults, and appended entries while retaining `navigationPreset="none"` for fully consumer-owned navigation.
3. Align desktop layout to one primary plus three top-to-bottom network columns; retain two mobile columns and scroll reachability.
4. Replace the rounded Font Awesome grip with the approved local nine-solid-square menu-grid SVG matching the verified live glyph; PH-A18 corrects the initial outlined-cell implementation.
5. Update unit/Playwright coverage, Storybook, catalog, consumer documentation, migration guidance, changelog, and workflow evidence.

PH-09 is approved by PH-A14/PH-A15 and expanded by PH-A16/PH-A17 for the menu-grid correction. PH-10 must independently revalidate the affected candidate before review.

PH-10a is approved by PH-A19 after the user's alignment screenshot. It applies the measured production `5px` optical offset, updates the dedicated story/catalog/changelog and browser assertion, and requires focused Vera revalidation before the remaining manual QA handoff.

PH-10c records the PH-MT02 failure at desktop/mobile widths. PH-10d corrects
the approved focus lifecycle by deriving the trap boundary from visible
focusable controls and using completed click handling so outside closure can
restore the menu trigger after the browser's pointer-focus default action. Unit,
Playwright, Storybook, catalog, changelog, and evidence are updated together.
PH-10e independently revalidates the corrected candidate. PH-MT02 and PH-AC04
pass; PH-AC10 remains PARTIAL/BLOCKED only because its separate PH-MT03
screen-reader acceptance work is still unexecuted.

PH-10f completes all locally executable remaining checks. PH-10g records the
user's Windows Chrome/Edge keyboard-at-200%-zoom PASS and PH-A20 waiver of the
unexecuted real screen-reader case as N/A with accepted risk. It does not waive
PH-MT07; the native latest-two browser matrix remains the only verification
blocker before Argus review.

PH-10h expands compatibility evidence to installed branded browsers. All 52
Chrome/Edge desktop/mobile cases pass. Stock Firefox cannot initialize the
Playwright automation protocol, and second-version/native Safari infrastructure
remains unavailable, so PH-MT07 stays BLOCKED rather than being inferred PASS.

PH-A21 revises the current delivery compatibility scope to the evidence actually
available and passing: configured Playwright Chromium plus installed Windows
Chrome/Edge. PH-10i records that revision. PH-10j independently validates its
traceability, the updated changelog evidence, and the final 7 PASS / 0 FAIL /
0 BLOCKED / 1 N/A manual status. Verification is complete for the approved scope
and the candidate is ready for Argus.

PH-12a implements the PH-A22-approved Argus corrections: visible header text and
control colors now consume the documented component-root text token, the logo
inventory records its implemented and packaged state, and the unrelated unused
global muted token is excluded from this delivery. PH-12b independently
revalidates the corrections and affected regressions as PASS. PH-13 independently
closes ARG-PH-01 through ARG-PH-03. Orion may prepare the concrete commit gate,
but staging and commit still require explicit user approval.

PH-14 verifies the actual branch/base, exact 66-file delivery scope, passing
verification and review closure, proposed `feat: add GNO-21354 portal header`
message, explicit exclusions, and path-scoped commands. The commit gate is
prepared, but no staging or commit is authorized until the user explicitly
approves report 14.
