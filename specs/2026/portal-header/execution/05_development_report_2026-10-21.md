# Development Report: Portal Header

## Executive Summary

Forge completed the approved PH-02 through PH-05 implementation under PH-A11.
The package now exports one configurable `PortalHeader`, public types and CSS,
repository-local branding, individually imported Font Awesome Free icons,
Entertainment/News social presets, navigation, a responsive accessible drawer,
native GET search, and a consumer router-link adapter. Storybook, catalog,
consumer fixtures, migration guidance, tests, and the changelog were updated in
the same delivery unit. Implementation checks pass; independent Vera verification
and Argus review remain pending.

## Workflow Context

- Role/stage: Forge / Construction, PH-02 through PH-05.
- Repository: `D:\gno-node-projects\gno-shared-components-v2`.
- Branch/base: `feature/portal-header` at
  `0b2561575b68f1e89ea9cf16fdaaa7e039670296`.
- Approval: PH-A10 requirements; PH-A11 development.
- Scope boundary: no commit, push, PR, merge, release, deployment, analytics,
  account/SSO, Cookie Agreement, or workflow change.
- Protected state: the user-owned `.playwright-mcp/` directory and Atlas-owned
  planning/coordination records were not edited by Forge.

## Project Summary

The existing React 19 package previously had no public component exports. This
unit adds the first component while preserving the package's ESM, TypeScript,
compiled-CSS, Storybook 10, Next.js 16.3.8, Vitest, and Playwright conventions.

## Previous Stage Summary

PH-A10 approved the requirements and defaults. PH-A11 approved the final design,
WBS, and test plan for PH-02 through PH-05. The verified GMA source logo and
Font Awesome Free individual SVG packages were approved inputs.

## Current Stage Objective

Implement the approved public API, navigation/drawer, social/search behavior,
package assets and exports, component tests, Storybook states, catalog guidance,
JavaScript/TypeScript/Next.js examples, migration notes, and changelog without
performing a Git delivery action.

## Documents Referenced

- `requirements.md`, `acceptance_criteria.md`, `nonfunctional_requirements.md`
- `design.md`, `wbs.md`, `test_plan.md`, `asset_inventory.md`
- `initial_setup.md`, `approvals.md`, `state.md`
- Installed Next.js 16.3.8 server/client, linking, images, CSS, accessibility,
  and supported-browser guidance under `node_modules/next/dist/docs/`

## Execution Details

### Requirement-to-file mapping

| Requirements | Implementation |
| --- | --- |
| PH-R01, PH-R07, PH-R09 | `packages/ui/src/index.ts`; `components/portal-header/types.ts`, `portal-header.tsx`, and `index.ts`; package exports; preserved narrow `"use client"` boundary; default anchors and optional adapter with safe anchor fallback |
| PH-R02, PH-R06, PH-R10 | `social-links.ts`, `icons.tsx`, `logo.ts`, verified `src/assets/gma-header-logo.svg`, Font Awesome dependencies, `THIRD_PARTY_NOTICES.md`; immutable presets, deterministic patches, HTTPS-only social URLs, generic icon fallback, and no analytics/legacy runtime |
| PH-R03, PH-R08 | `portal-header.tsx` and `styles.css`; semantic navigation, current/disabled states, mobile dialog/drawer, focus entry/restoration/trap, Escape/outside/overlay close, scroll restoration, reduced motion, responsive tokens, and no page overflow |
| PH-R04 | Optional consumer-owned native GET form with safe relative/HTTPS action, configurable parameter, trim, blank rejection, focus, and menu/search mutual exclusion |
| PH-R11 | `portal-header.test.tsx`, `portal-header.stories.tsx`, `tests/e2e/showcase.spec.ts`, consumer fixtures/check script, Next.js catalog preview and catalog guidance |
| PH-R12 | `docs/consumer-setup.md`, `docs/portal-header-migration.md`, package README, and `CHANGELOG.md` Unreleased minor-impact entry |

### Changed implementation areas

- Package source/assets: `packages/ui/src/components/portal-header/**`,
  `packages/ui/src/assets/gma-header-logo.svg`, `packages/ui/src/index.ts`, and
  `packages/ui/src/styles.css`.
- Package contract/build: `packages/ui/package.json`, lockfile, asset copy script,
  package README, and third-party notices.
- Showcase/docs: home copy, catalog page/client router-adapter preview, catalog
  CSS, consumer setup, migration guide, and changelog.
- Tests/tooling: eight Vitest component/a11y cases, Storybook stories and controls,
  JavaScript/TypeScript fixture builds, and 20 Playwright desktop/mobile cases.

### Important implementation judgments

- The exact approved SVG is stored and exported from the package. Its bytes are
  also represented by a local data URI for the default `<img>`, avoiding a
  runtime request while retaining the visible-text error fallback.
- The package deliberately uses `<img>` rather than `next/image`; importing Next
  would violate the approved framework-neutral public contract. The targeted
  lint exception records that reason.
- Unsafe navigation/search schemes become non-navigable or unavailable. Social
  links accept HTTPS only. `_blank` links always add `noopener noreferrer`.
- The closed drawer uses a right-origin scale transition rather than an off-canvas
  translation because translated fixed content increased page scroll width in
  Chromium at 320/375 px. Reduced-motion users receive no transition.
- The synchronous router adapter call is protected by an anchor fallback. Errors
  thrown later by React while rendering consumer-returned nodes remain consumer
  error-boundary responsibility.

## Findings

### Passing evidence

| Command/check | Result |
| --- | --- |
| `npm run check` | PASS on 2026-10-21: package build, root/package typecheck, ESLint, 8/8 Vitest tests, 2/2 JS/TS consumer fixture builds, Storybook static build, and Next.js production build/static generation |
| `npm run test:e2e` | PASS: 20/20 Chromium desktop/mobile cases, including navigation, safe socials, valid/blank GET search, drawer Escape/focus restoration, console/page errors, and 320/375/768/1024/1440 overflow checks |
| `npm run pack:check` | PASS: 33 intentional files; packed baseline 18.5 kB compressed / 60.2 kB unpacked |
| SHA-256, source and built logo | PASS: both equal `4265686660c12d10f6954d8dec60884933d680f10dd79a4ff7a76c016d62f39a` |
| Source/built boundary scan | PASS: no GA/analytics contract, `gtag`, `dataLayer`, jQuery, `social_ribbon_click`, consent coupling, or mutable logo-source hotlink |
| Built client boundary inspection | PASS: built interactive entry begins with `"use client"` |
| `git diff --check` | PASS; only Git's existing LF-to-CRLF working-copy notices were emitted |

Expected non-failing build warnings: Vite/Storybook reports that it ignores the
module directive while producing browser-only bundles, although the emitted
package preserves `"use client"`; Storybook also reports its existing large docs
chunks and Node's `module.register()` deprecation. Playwright reports the existing
`NO_COLOR`/`FORCE_COLOR` environment warning.

### Failures corrected within approved scope

- Removed an unsupported Vitest `--runInBand` option and corrected the axe-core
  module import; the final eight-test suite passes.
- Corrected initial social preset inference and later runtime-froze exported
  preset arrays/items.
- Corrected initial mobile e2e failures caused by the catalog's intrinsic width,
  translated closed drawer, and hidden mobile social region. The final matrix is
  20/20 passing.

## Risks

- Latest-two-version Edge, Firefox, and Safari execution is not available in the
  current Playwright configuration; Vera must record those as run or BLOCKED,
  never infer PASS from Chromium.
- Manual screen-reader, 200% zoom, real-device pointer behavior, contrast, and
  consumer visual/brand acceptance remain unexecuted and belong in the required
  standalone manual QA record.
- No hard client-bundle budget was approved. The current package tarball baseline
  is recorded, but consuming bundlers determine final Font Awesome contribution.
- Release workflow and artifact publication evidence cannot exist before the
  separately approved reviewed/tagged revision.

## Recommendation

Hand the unchanged local implementation diff to Vera for PH-06 automated and
manual-test preparation. After passing verification, hand the same revision to
Argus for independent review. Do not stage or commit before those gates close and
the user separately approves the Git action.

## Approval Status

- Requirements: approved, PH-A10.
- Development: approved, PH-A11; implemented.
- Verification: pending Vera.
- Independent review: pending Argus.
- Review adjustments: not approved and not applicable until findings exist.
- Commit/push/PR/merge/release/deployment: not approved.

## Next Stage

Vera verifies PH-AC01 through PH-AC18 where applicable, creates the standalone
`manual_testing.md`, records unavailable browser/manual infrastructure honestly,
and provides exact dirty-diff evidence for Argus review.
