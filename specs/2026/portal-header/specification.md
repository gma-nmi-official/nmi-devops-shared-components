# Specification: Portal Header

## Business intent

- Problem/users: GNO portal teams need a consistent reusable global header without copying the legacy jQuery widget or consumer-specific globals.
- Outcome: JavaScript and TypeScript consumers import a configurable, accessible `PortalHeader` from `nmi-devops-shared-components`.
- Success: public runtime/types/CSS, documented states, packed consumer examples, responsive/accessibility/browser evidence, and independent review all pass.
- Decision owner: repository/product owner; brand and consumer owners remain to be named.
- Source: user request dated 2026-10-12 and the supplied production header references.

## Scope and exclusions

In scope: repository-local branding assets, section label/accent, complete ordered GMA primary/network navigation defaults and patches, social links, search, production-compatible compact bar and full-width responsive dropdown, local solid-square menu-grid glyph, router adapter, Storybook, catalog guidance, tests, and migration mapping.

Excluded: account, authentication, SSO, Google Analytics, generic analytics callbacks/events, tag management, and analytics consent-mode coordination. Analytics belongs to a separate future component/specification. Cookie Agreement imports, props, rendering, styling, lifecycle, runtime state, and behavior are owned by its standalone component. Production route ownership, remote runtime loading, publication, consumer rollout, and deployment are also excluded without separate approval.

## Repository/context

`D:\gno-node-projects\gno-shared-components-v2`, `feature/portal-header`, base `0b2561575b68f1e89ea9cf16fdaaa7e039670296`. `packages/ui` has no public component exports. React 19, Next.js 16.3.8, Storybook 10, and Playwright Chromium are present. Cookie Agreement remains a separate scope.

## Endpoint and approval

Requirements are approved by PH-A10 and revised by PH-A12, PH-A14, and PH-A16. Development is authorized by PH-A11, PH-A13, PH-A15, and PH-A17 against the finalized design/WBS/test plan. Commit, push, pull request, merge, release, and deployment are not authorized.
