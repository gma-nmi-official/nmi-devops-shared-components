# Solution design: Portal Header

## Interface and behavior

Proposed `packages/ui/src/components/portal-header/` owns the component, types, tests, story, and styles. Public groups are `brand`, `primaryNavigation`, `networkNavigation`, `socialLinks`, `search`, `renderLink`, and `theme`.

The component uses an explicit `closed/open` menu state. CSS handles responsive layout where possible. The interactive module owns focus return, Escape/outside behavior, overlay, and approved scroll locking. Search is independent and follows an approved mutual-exclusion rule with the menu. Approved logos, icons, fonts, and related visual files are stored in version-controlled repository paths and included through the package build rather than loaded from remote runtime sources.

Standard anchors are the default; a link render adapter supports Next.js without importing it. Portal Header exposes no account/authentication surface, analytics events, or GA integration; separate components own those concerns.

## Decisions

| ID | Requirement | Proposed decision | Alternative | Rationale | Approval |
| --- | --- | --- | --- | --- | --- |
| PH-D01 | PH-R01 | One named `PortalHeader` export plus public types | Legacy mode-specific exports | Stable consumer API | Pending |
| PH-D02 | PH-R02, PH-R04, PH-R06, PH-R07 | Consumer navigation/social/search data and router adapter | Hard-coded routes/globals | Removes consumer coupling | Pending |
| PH-D03 | PH-R03, PH-R09 | CSS responsiveness and narrow client module | Width branching/package-wide client | SSR predictability | Pending |
| PH-D04 | PH-R10 | Local component implementation only | Load/reference legacy runtime | Security and maintainability | Pending |
| PH-D05 | PH-R11 | Complete vertical unit: source/export/CSS/tests/story/catalog/docs | Documentation later | Required repository policy | Pending |

## Migration/recovery

Map legacy modes to fixture/config objects; do not preserve DOM classes or globals as public API. Existing production header remains until a separately approved consumer migration. Rollback removes the consumer integration or reverts the package release.

## Approval

See `wbs.md`. Development approval is pending final requirements, assets, adapters, compatibility, and tests.
