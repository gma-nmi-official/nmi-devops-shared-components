# Specification: Cookie Agreement

## Business intent

- Problem/users: GNO portal teams need a consistent reusable cookie agreement surface without copying a hard-coded legacy notice or coupling consent to jQuery, global analytics, or one cookie format.
- Outcome: consumers independently import and render an accessible `CookieAgreement` with an approved consent model, copy, persistence contract, and privacy link.
- Success: public runtime/types/CSS, policy-owner-approved states, storage failure handling, Storybook/catalog guidance, browser/accessibility/privacy evidence, and independent review pass.
- Decision owner: privacy/legal owner for consent semantics/copy; product/repository owner for UI/API/release.
- Source: user request dated 2026-10-12 and the cookie behavior in the supplied production references.

## Scope and exclusions

In scope: a standalone controlled consent UI, approved explicit actions, policy/version model, optional preference categories, privacy link, repository-local trust/seal and visual assets, persistence adapter, responsive/accessibility behavior, docs, tests, and migration mapping.

Excluded: Google Analytics, generic analytics callbacks/events, tag management, GA consent mode, and analytics loading. Those belong to a separate future component/specification which may consume the approved consent record at the application boundary. Portal Header composition, imports, props, rendering, styling, lifecycle, and runtime state are excluded. Legal advice/compliance certification, privacy-policy authorship, a full consent-management backend, remote runtime loading, publication, rollout, and deployment are also excluded.

## Repository/context

`D:\gno-node-projects\gno-shared-components-v2`, `master`, base `c580e408`. The package currently has no public component exports. Existing foundation changes and Portal Header planning are separate scopes.

## Endpoint and approval

Current endpoint is a reviewable plan only. Privacy/legal, requirements, and development approvals are pending.
