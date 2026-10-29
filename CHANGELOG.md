# Changelog

All notable changes to `nmi-devops-shared-components` are documented in this file.

The project follows [Semantic Versioning](https://semver.org/). The repository publishes one npm package, so every published release has one package version even when only one component changed.

## [Unreleased]

### Changed

- Reformatted published component sources, Storybook stories, catalog pages,
  and shared CSS so indentation and intentional line breaks expose nesting,
  control flow, and data structure without changing public behavior.
- Strengthened the verification workflow with a generated-output revision
  preflight and an explicit rule that PASS evidence cannot cross commits or
  branches.
- Standardized post-commit PR review-adjustment replies and PR-numbered
  `code_review_adjustment` execution records.

### Fixed

- Corrected AdSlot disabled-breakpoint SSR rendering, preserved reserved space
  for `enabled={false}`, documented GPT readiness and responsive behavior, and
  added blocked-provider regression coverage. The AdSlot gate now reports raw
  and gzip output and enforces an 8 KiB gzip budget.

**Consumer impact / SemVer:** Patch for the AdSlot behavior correction; no
consumer migration is required. The existing public API remains compatible.

**Validation evidence:** type checking, targeted lint, unit and consumer tests,
size gates, Storybook coverage/build, and package dry-run evidence are recorded
in the component execution records. Independent review remains pending for the
current follow-up candidate.

## [1.4.1] - 2026-10-29

### Fixed

- Batched PortalHeader, CookieAgreement, AdSlot, and Google Analytics review
  corrections, including consent/lifecycle edge cases, responsive behavior,
  runtime validation, and browser-safe package output.
- Preserved consumer-facing APIs while adding regression coverage, Storybook
  states, catalog guidance, and corrected package metadata.

**Consumer impact / SemVer:** Patch. Existing consumers require no migration.

**Validation evidence:** merged PRs #13, #14, #15, and #16; full Vitest,
typecheck, consumer fixtures, size gates, Storybook, and Next.js production
builds passed. Browser verification limitations remain documented in the
component execution records.

## [1.4.0] - 2026-10-26

### Added

- Added the consent-aware `createGoogleAnalytics` GA4 integration with direct
  `gtag.js` and GTM `dataLayer` transports, explicit page views, semantic event
  helpers, validated dimensions, bounded callbacks, and FIFO consent queuing.
- Added Storybook, catalog, JavaScript/TypeScript fixtures, SSR-safe import
  coverage, browser checks, and a 16 KiB compiled-module budget.

**Consumer impact / SemVer: Minor.** This is a backward-compatible named export;
existing consumers do not need to change.

**Migration:** No existing package API migration is required. Consumers adopting
analytics must load the approved provider, own consent policy, call route page
views explicitly, and avoid sensitive identifiers in event dimensions.

**Validation evidence:** Initial candidate typecheck, lint, unit, consumer,
size-gate, Storybook, Next.js, browser, and audit checks passed. Follow-up
review corrections are tracked in the Google Analytics adjustment plan before
the release tag. Published package source maps are enabled for the corrected
build.

## [1.3.0] - 2026-10-24

### Added

- Added the configurable, provider-agnostic `AdSlot` component for MREC,
  leaderboard, and custom rectangular display placements, plus a GPT adapter.
- Added consumer-owned responsive rules that require a complete ad unit path
  and non-empty size list for every active rule; disabled rules create no slot.
- Added reserve-by-default and explicit collapse behavior, targeting, lifecycle
  state callbacks, 100 ms responsive switching, Storybook/catalog guidance,
  JavaScript/TypeScript fixtures, and fake-provider unit and browser coverage.
- Serialized asynchronous slot replacement across React effect generations,
  stabilized state callbacks against parent rerenders, and made GPT cleanup
  failures observable and retryable.

**Consumer impact / SemVer: Minor.** This is a backward-compatible named export.
Existing consumers do not need to change. Ad consumers must continue to own GPT
loading and initialization, consent and eligibility, service-wide lazy loading,
inventory paths, sizes, and targeting policy.

**Migration:** No existing package API migration is required. Legacy DFP/GPT
wrappers should map each active breakpoint to an explicit full ad unit path and
size list; unsupported native, video, out-of-page, refresh, and page-insertion
behavior remains in the consuming application.

**Validation evidence:** after ADS-ADJ01–ADS-ADJ05, `npm run check`, 56/56
Vitest tests, four JavaScript/TypeScript consumer fixtures, Storybook and Next.js
production builds, the 17,747-byte ads-module budget check, package dry run,
30/30 configured Chromium desktop/mobile Playwright cases, and manual QA
ADS-MT01–ADS-MT10 pass. ADS-REV01–ADS-REV06 are closed by independent Argus;
commit and release operations remain separately gated.

## [1.2.0] - 2026-10-24

### Added

- Added the standalone `CookieAgreement` component with explicit acceptance
  persistence, configurable temporary Reject dismissal, configurable scroll
  reveal and slide-up animation, separate privacy destinations, repository-local
  NPC seal artwork, Storybook/catalog coverage, and no analytics or Portal Header
  coupling.

**Consumer impact / SemVer: Minor.** This is a backward-compatible new named
component export. Existing consumers do not need to change. New consumers can
import `CookieAgreement` and the existing package stylesheet.

**Migration:** No existing package API migration is required. Consumers should
review the default privacy destinations and provide an approved `policyVersion`.

**Validation evidence:** `npm run check`, `npm run pack:check`, 28 Playwright
tests, user-confirmed manual QA (MT-01 through MT-11), and independent Argus
review passed on the merged feature revision. The release workflow will rerun
the full quality gate for the approved `v1.2.0` tag.

## [1.1.0] - 2026-10-23

### Added

- Added the `PortalHeader` component and public TypeScript contracts with
  configurable branding and section accent, primary/network navigation,
  accessible full-width responsive dropdown,
  optional native GET search, consumer router-link adapter, and public CSS tokens.
- Added immutable Entertainment and News social presets plus deterministic
  stable-ID override, hide, and append behavior. Social URLs are HTTPS-only and
  have no analytics integration.
- Added the immutable 16-link GMA navigation preset in verified production
  order, with stable-ID override, hide, append, and `none` behavior.
- Added a verified repository-local GMA logo, individually imported Font Awesome
  Free icons, third-party notices, focused unit/accessibility coverage, Storybook
  states, catalog guidance, and migration examples.
- Aligned the default presentation with the live GMA News header: a compact dark
  single bar, News-red configurable accent, production-sized logo and label,
  desktop social/search/grid actions, and mobile search/socials inside the
  expanded menu. Legacy CSS/JS, Fontello, remote fonts, account/SSO, and
  analytics remain excluded.
- Matched the expanded menu ordering with one primary plus three top-to-bottom
  network columns on desktop and a reachable two-column mobile layout.
- Replaced the rounded Font Awesome grip with a local nine-solid-square SVG that
  matches the live menu-grid glyph without loading the legacy Fontello font.
- Matched the live header's optical brand alignment by positioning the section
  label 5px below the antenna-inclusive logo image-box center on desktop and mobile.
- Corrected dropdown focus containment to ignore hidden responsive controls and
  restored trigger focus after outside-pointer closure.
- Corrected the public Portal Header text token so root-level overrides drive
  visible section, navigation, action-button, and social-link colors.
- Added the public documentation landing page, consumer catalog, and embedded
  Storybook at `/docs`, with GitHub Pages deployment configuration.

### Changed

- Updated release validation dependencies to patched Next.js `16.4.2`,
  Storybook `10.6.3`, Vite `7.3.7`, and Vitest `4.1.12` versions.
- Contained catalog documentation link styles so they cannot override Portal
  Header tokens, and corrected mobile documentation-home overflow.

**Consumer impact / SemVer: Minor.** This is a backward-compatible new named
component export. Existing consumers do not need to change. New consumers import
`PortalHeader` and the existing package stylesheet, then optionally patch the
default navigation and provide search configuration. Next.js consumers only need a Client
Component wrapper when passing the optional function-valued router adapter.

**Migration:** No existing package API migration is required. Legacy-header
mapping and intentionally unsupported behavior are documented in
[`docs/portal-header-migration.md`](docs/portal-header-migration.md).

**Validation evidence:** Typecheck, lint, 13/13 unit/accessibility tests, two
JavaScript/TypeScript consumer fixtures, Storybook, Next.js 16.4.2, the 28/28
configured Playwright suite, 52/52 installed Windows Chrome/Edge cases, and the
37-file package dry-run pass. The shipped-runtime dependency audit has zero
findings; the full audit retains five high findings in the development-only
`eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch`
→ `braces` chain under the existing A-006 exception.
PH-A20 waives unexecuted real screen-reader QA and
PH-A21 accepts the configured Chromium plus installed Chrome/Edge delivery
matrix; Firefox, Safari, and second-version coverage remain explicit residual
risk. Exact-revision GitHub Actions release evidence remains pending until an
approved tag.

## [1.0.0] - 2026-10-19

This is the initial stable release of the **NMI DevOps Shared Components** package foundation. This release contains package, build, showcase, catalog, documentation, and release infrastructure; it does not add a public UI component export.

**SemVer: Major.** The release establishes the stable package identity `nmi-devops-shared-components`, replacing the former package ID. Any consumer using the former package must migrate its release artifact URL, dependency/import name, and stylesheet import to `nmi-devops-shared-components` and `nmi-devops-shared-components/styles.css` before upgrading. There are no component API changes in this release.

### Added

- Defined the foundation for configurable GNO portal components.
- Added the repository-local GNO workflow bundle for Claude Code, Codex, and developers.
- Added contributor, consumer setup, versioning, and release documentation.
- Added GitHub tag validation and versioned `.tgz` release-asset packaging.
- Added Orion's post-merge release-readiness handoff with separate tag-push approval.

### Fixed

- Replaced the unavailable generated `LayoutProps` helper with a stable `ReactNode` layout prop type for CI-compatible Next.js typechecking.

### Changed

- Renamed the consumer package to `nmi-devops-shared-components` (display name: **NMI DevOps Shared Components**); migration details are above.
- Restricted the GitHub quality workflow to pull requests targeting `master` and pushes to `master`, with manual dispatch and superseded-run cancellation.
- Switched private package distribution from Bitbucket to GitHub Releases and documented authenticated consumer asset downloads.
- Added a `predev` package build so the showcase can resolve package styles from a clean checkout.

**Validation evidence:** `npm run check` and `npm run pack:check` were run for this release-preparation revision on Node.js `v26.10.0` / npm `11.19.1`. `npm run check` runs typecheck, lint, Vitest, the package build, Storybook static build, and Next.js production build. Vitest currently finds no test files; this is the repository's configured empty-test-suite behavior. The package dry run confirms the `nmi-devops-shared-components@1.0.0` artifact metadata and contents. See [`manual_testing.md`](manual_testing.md) and [`execution/14_release_preparation_2026-10-19.md`](specs/2026/gno-shared-components-v2-foundation/execution/14_release_preparation_2026-10-19.md) for actual outcomes.

## [0.1.0] - 2026-10-08

### Added

- Established the npm workspace and publishable `packages/ui` package.
- Added the JavaScript runtime, TypeScript declarations, and compiled stylesheet contract.
- Added the Next.js showcase and consumer catalog foundation.
- Added Storybook, Vitest, accessibility checks, package validation, and CI workflow foundations.
- Added consumer setup and component documentation guidance.

## Release policy

- A component does not receive an independent npm version at this stage.
- Every package release updates the root and publishable package versions together.
- The release bump is determined by the highest-impact public change included in the release:
  - **Patch**: bug fix, accessibility correction, documentation correction, or non-breaking visual/style fix.
  - **Minor**: new component, new optional prop, new state, or other backward-compatible capability.
  - **Major**: removed or renamed export, breaking prop/event change, incompatible token/style contract, or behavior that requires consumer migration.
- If several components change together, use the highest required bump across all component changes.
- Internal refactoring that does not change the published package does not require a package release.
- Pre-release versions such as `0.3.0-rc.1` may be used for consumer validation before a stable release.
- Every release entry must describe affected components, consumer impact, migration notes when required, and validation evidence.

See [`docs/versioning.md`](docs/versioning.md) for the complete workflow.
