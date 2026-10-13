# Specification: Portal Header

## Business intent

- Problem/users: GNO portal teams need a consistent reusable global header without copying the legacy jQuery widget or consumer-specific globals.
- Outcome: JavaScript and TypeScript consumers import a configurable, accessible `PortalHeader` from `gno-shared-components`.
- Success: public runtime/types/CSS, documented states, packed consumer examples, responsive/accessibility/browser evidence, and independent review all pass.
- Decision owner: repository/product owner; brand and consumer owners remain to be named.
- Source: user request dated 2026-10-12 and the supplied production header references.

## Scope and exclusions

In scope: repository-local branding assets, section label, primary/network navigation links, social links, search, mobile drawer, router adapter, Storybook, catalog guidance, tests, and migration mapping.

Excluded: account, authentication, SSO, Google Analytics, generic analytics callbacks/events, tag management, and analytics consent-mode coordination. Analytics belongs to a separate future component/specification. Cookie Agreement imports, props, rendering, styling, lifecycle, runtime state, and behavior are owned by its standalone component. Production route ownership, remote runtime loading, publication, consumer rollout, and deployment are also excluded without separate approval.

## Repository/context

`D:\gno-node-projects\gno-shared-components-v2`, `master`, base `c580e408`. `packages/ui` has no public component exports. React 19, Next.js 16.3.8, Storybook 10, and Playwright Chromium are present. Existing foundation changes and the Cookie Agreement plan are separate scopes.

## Endpoint and approval

Current endpoint is a reviewable plan only. Requirements and development approval are pending in `approvals.md`.
