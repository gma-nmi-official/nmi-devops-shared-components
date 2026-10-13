# Work breakdown structure: Portal Header

## Scope

Build a reusable Portal Header with navigation links, social links, search, responsive behavior, accessibility, Storybook documentation, catalog guidance, and consumer examples.

## WBS summary

| Phase | Work area | Requirements | Owner | Depends on | Status |
| --- | --- | --- | --- | --- | --- |
| PH-01 | Confirm content and behavior | PH-R02-PH-R04, PH-R07 | Athena and product owners | Requirements approval | Planned |
| PH-02 | Define the public component API | PH-R01, PH-R07, PH-R09 | Forge | PH-01 and development approval | Planned |
| PH-03 | Build the header and responsive navigation | PH-R02, PH-R03, PH-R08 | Forge | PH-02 | Planned |
| PH-04 | Build social links and search | PH-R02, PH-R04 | Forge | PH-03 | Planned |
| PH-05 | Add stories, documentation, and consumer examples | PH-R11, PH-R12 | Forge and Vera | PH-03 and PH-04 | Planned |
| PH-06 | Validate, review, and prepare delivery | All approved requirements | Vera, Argus, and Orion | PH-01-PH-05 | Planned |

## PH-01 — Confirm content and behavior

| ID | Task | Output | Owner |
| --- | --- | --- | --- |
| PH-01.1 | Define the header variants, section labels, and supported layouts. | Approved header configuration matrix | Product owner |
| PH-01.2 | List primary and network navigation links, including ordering, active state, disabled state, and external-link behavior. | Navigation fixtures and behavior rules | Product/content owner |
| PH-01.3 | List social networks, accessible labels, repository-local icons, destinations, ordering, and external-link behavior. | Social-link fixtures and asset list | Product/content and brand owners |
| PH-01.4 | Define search placeholder, validation, submission mode, destination or callback contract, and error behavior. | Approved search contract and fixtures | Product/consumer owners |
| PH-01.5 | Inventory the logos, icons, fonts, colors, file formats, repository paths, sources, and redistribution rights. | Approved repository asset inventory | Brand and repository owners |

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
| PH-03.4 | Build the mobile menu, overlay, open/close controls, Escape behavior, outside-click behavior, and focus restoration. | Accessible mobile drawer | Forge |
| PH-03.5 | Add responsive styling for mobile, tablet, desktop, long labels, zoom, and reduced motion. | Component stylesheet | Forge |
| PH-03.6 | Test keyboard access, focus order, menu announcements, overflow, and server rendering/hydration. | Component and accessibility tests | Vera |

**Phase complete when:** navigation works with keyboard and pointer input, approved viewport tests pass, and the page has no unintended horizontal overflow.

## PH-04 — Build social links and search

| ID | Task | Output | Owner |
| --- | --- | --- | --- |
| PH-04.1 | Render configured social links with approved icons, accessible names, targets, and safe external-link attributes. | Social-link component area and tests | Forge and Vera |
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
| PH-06.4 | Run the approved Bitbucket pipeline against the exact candidate revision. | CI evidence | Repository owner and Vera |
| PH-06.5 | Review the complete change set independently against the approved requirements and design. | Independent review decision | Argus |
| PH-06.6 | Prepare commit, push, pull-request, release, and consumer-handoff details under their separate approval gates. | Operations handoff records | Orion |

**Phase complete when:** every applicable acceptance criterion passes for the same revision, manual QA is complete, independent review has no open required finding, and the requested Git action has its separate approval.

## Delivery order

PH-01 → PH-02 → PH-03 → PH-04 → PH-05 → PH-06

PH-05 documentation may start while PH-03 and PH-04 are being completed, but it cannot close until the public API and behavior are validated. No implementation phase begins before requirements and development approval.
