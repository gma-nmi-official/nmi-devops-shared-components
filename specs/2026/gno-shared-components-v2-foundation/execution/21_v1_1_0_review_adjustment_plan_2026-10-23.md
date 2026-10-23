# v1.1.0 review-adjustment plan

## Objective

Close required Argus findings F-REL-110 and F-REL-111 without changing Portal
Header source, its public API, package behavior, or the already validated release
version.

## Proposed corrections

### F-REL-110 — current Portal Header presentation contract

- Replace `PortalFooter` and obsolete Portal Header props in both presentation
  formats with a minimal example using actual public props, such as
  `brand.sectionLabel`, `primaryNavigation`, `socialPreset`, and `search`.
- State that Portal Header is the released first component and that `/catalog`
  and `/docs` contain its consumer guidance and Storybook states.
- Replace the obsolete planned-component and deliberate-exclusion sections with
  the actual released scope and only the still-valid exclusions: account/SSO,
  GA/analytics, cookie consent, backend APIs, application authentication,
  consumer-specific routing, public npm registry publication, and agent-owned
  deployment.
- Refresh next steps to the current `v1.1.0` reviewed-PR and separately approved
  tag workflow.
- Preserve Markdown/HTML content parity.

### F-REL-111 — public repository release guidance

- Update `README.md`, `docs/consumer-setup.md`, and `docs/versioning.md` so the
  default release-asset download is documented for the public repository.
- Remove the claim that repository access or a token is required. Retain an
  optional `GH_TOKEN` note only for CI/tool authentication or rate limits, with
  secret-storage guidance.
- Apply the same public-repository contract to both presentation formats.
- Update the current-state summary while retaining explicitly dated historical
  private-repository decisions as history.

## Files and validation

Expected correction paths:

- `README.md`
- `docs/consumer-setup.md`
- `docs/versioning.md`
- `specs/2026/gno-shared-components-v2-foundation/presentation/foundation-presentation.md`
- `specs/2026/gno-shared-components-v2-foundation/presentation/foundation-presentation.html`
- `specs/2026/gno-shared-components-v2-foundation/state.md`
- release approval, QA, and execution evidence

Validation after approval:

1. Compare retained code examples with `packages/ui/src/components/portal-header/types.ts`
   and the public export surface.
2. Scan active surfaces for `PortalFooter`, obsolete prop names, empty/planned/
   excluded Portal Header claims, and private-repository/private-asset wording.
3. Check Markdown/HTML presentation parity.
4. Run `npm run check`, `npm run test:e2e`, `npm run pack:check`, both dependency
   audits, version alignment, and `git diff --check`.
5. Return the corrected candidate to Argus for independent closure.

## Approval boundary

Review-adjustment approval authorizes only the corrections and validation above.
Commit, push, PR, merge, tag, GitHub Release publication, and deployment remain
separately gated.

## Execution status — 2026-10-23

- A-026 records the user's decision, "No portal footer," and authorizes only
  F-REL-110.
- Both presentation formats now import only `PortalHeader`, use its released
  public props, identify it as the first released catalog component, and omit
  `PortalFooter` and obsolete planned/excluded implementation claims.
- No component source or public API changed.
- The focused blocked-term scan returned no matches. The example prop names and
  public export were checked against `types.ts` and the package barrel export.
- `npm run docs:check`, `npm run check` (including 13/13 Vitest tests, two
  consumer fixtures, Storybook 10.6.3, and Next.js 16.4.2), and
  `git diff --check` passed. The first sandboxed `npm run check` attempt stopped
  at Vitest with `spawn EPERM`; the authorized out-of-sandbox rerun passed.
- A-027 records the user's decision, "Proceed," for F-REL-111. The user's later
  decision confirms that the repository is intentionally private; active consumer
  and release guidance now requires repository access and an authorized
  `GH_TOKEN`, with CI secret-storage guidance.
- Explicitly dated historical public-repository wording remains history; no
  source, runtime, or public API changed.
- Final correction validation passed: both finding-specific scans,
  `npm run check` (13/13 tests, two consumer fixtures, Storybook 10.6.3, and
  Next.js 16.4.2), `npm run test:e2e` (28/28), `npm run pack:check` (37 files at
  `1.1.0`), `npm audit --omit=dev` (zero findings), full `npm audit` (five high
  development-only findings under A-006), four-way version alignment, and
  `git diff --check`. The sandboxed package dry run first
  encountered npm-cache `EPERM`; the authorized rerun passed.
- The candidate is ready for Argus independent closure. Git actions and release
  publication remain separately gated.

## Independent closure result

Argus returned **BLOCKED** in report 22. F-REL-110 is closed. F-REL-111 remains
open because anonymous external checks return HTTP 404, and F-REL-112 requires
correction of the non-reproducible zero-full-audit claims. Report 23 contains the
second adjustment plan; no second-round correction is authorized yet.
