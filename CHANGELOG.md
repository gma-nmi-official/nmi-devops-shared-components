# Changelog

All notable changes to `nmi-devops-shared-components` are documented in this file.

The project follows [Semantic Versioning](https://semver.org/). The repository publishes one npm package, so every published release has one package version even when only one component changed.

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
