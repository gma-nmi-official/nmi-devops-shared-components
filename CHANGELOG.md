# Changelog

All notable changes to `gno-shared-components` are documented in this file.

The project follows [Semantic Versioning](https://semver.org/). The repository publishes one npm package, so every published release has one package version even when only one component changed.

## [Unreleased]

### Added

- Defined the foundation for configurable GNO portal components.
- Added the repository-local GNO workflow bundle for Claude Code, Codex, and developers.
- Added contributor, consumer setup, versioning, and release documentation.
- Added Bitbucket tag validation and versioned `.tgz` artifact packaging.
- Clarified the private workspace name, Bitbucket-only distribution strategy, and illustrative consumer examples.
- Added a `predev` package build so the showcase can resolve package styles from a clean checkout.

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
