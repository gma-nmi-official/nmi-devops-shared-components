# Release preparation — v1.1.0

## Context and objective

- Project: `gno-shared-components-v2` foundation and Portal Header.
- Objective: prepare the minor `nmi-devops-shared-components` `1.1.0` release
  after the owner-confirmed merges of Portal Header PR #2 and public Storybook
  documentation PR #3.
- Requirement / acceptance link: Portal Header PH-R12 / PH-AC18 and the package
  release policy in `docs/versioning.md`.
- Repository / branch / base: isolated worktree on
  `feature/release-v1.1.0`, based on merged `master`
  `d91ac862dda90073875d16c70bb24886d334ff98`.
- Approval: A-022 authorizes local release preparation and validation only.

## Prepared candidate

- Aligned the root workspace, publishable package, and both lockfile workspace
  versions at `1.1.0`.
- Moved the completed Portal Header and public Storybook documentation entries
  from `Unreleased` into `1.1.0` dated 2026-10-23.
- Updated active tag, download, tarball, displayed-version, and repository examples
  to the `v1.1.0` GitHub release contract.
- Recorded release QA, approval, and current-state evidence.
- Kept the unrelated `feature/cookie-agreement` worktree untouched by performing
  all release preparation in an isolated worktree.

No commit, push, PR, merge, tag, GitHub Release, or deployment was performed or
authorized by A-022.

## Validation evidence

Environment: Windows PowerShell, Node.js `v26.10.0`, npm `11.19.1`.

| Check | Result | Evidence |
| --- | --- | --- |
| Version metadata parse | PASS | Root package, publishable package, lock root, and `packages/ui` lock workspace all report `1.1.0`. |
| Changelog and active example inspection | PASS | Completed work is dated under `1.1.0`; active examples use `v1.1.0`, the matching tarball, and the current GitHub repository. |
| `git diff --check` | PASS | No whitespace errors. |
| `npm ci` | PASS WITH FINDINGS | Installed 567 packages from the committed lockfile; npm reported 11 dependency vulnerabilities. |
| `npm audit --json` | FAIL | 3 moderate, 6 high, and 2 critical vulnerabilities. Direct affected dependencies are Next.js, Storybook, Vite, Vitest, `@vitest/coverage-v8`, and `eslint-config-next`. |
| `npm run check`, `npm run test:e2e`, and `npm run pack:check` | BLOCKED | Do not qualify or package a release candidate with known critical/high dependency advisories. A separate local npm-path collision also requires a worktree-only execution workaround before rerunning the nested npm scripts. |

## Security remediation plan requiring approval

This is a material expansion from metadata-only release preparation and requires
development approval before implementation:

1. Upgrade `next` and `eslint-config-next` from `16.3.8` to `16.4.2`.
2. Upgrade Storybook and its first-party packages to `10.6.3`.
3. Upgrade Vite to `7.3.7` and Vitest plus `@vitest/coverage-v8` to `4.1.12`,
   avoiding unrelated major-version migrations.
4. Regenerate the lockfile with npm `11.19.1`, rerun `npm ci` and `npm audit`, and
   assess any remaining transitive ESLint toolchain advisory without accepting
   npm's incompatible suggestion to downgrade Next.js to 14.x.
5. Run the full quality, browser, packaging, and whitespace checks; update this
   evidence; then obtain independent review before the commit gate.

## Findings, risk, and recommendation

- The `1.1.0` metadata itself is internally consistent.
- The current dependency graph is not release-ready because it includes two
  critical and six high advisories, including affected Next.js and Storybook
  versions.
- PH-A20 (screen-reader waiver) and PH-A21 (deferred Firefox/Safari and second-
  version coverage) remain disclosed in the changelog and are not silently
  converted into validation passes.
- A tag push would trigger publication, so no tag should be created or pushed
  until remediation, verification, independent review, commit, push, PR, and
  owner merge are complete under their separate approval gates.

Recommendation: approve the scoped dependency remediation above. Release status
remains **BLOCKED** until it is implemented and validated.

## Approved remediation execution and resumed validation

- A-023 approved the scoped dependency remediation.
- Updated Next.js and `eslint-config-next` to `16.4.2`, Storybook packages to
  `10.6.3`, Vite to `7.3.7`, and Vitest packages to `4.1.12`; regenerated the
  lockfile with npm `11.19.1`.
- `npm ci`: PASS, 567 packages installed from the regenerated lockfile.
- `npm audit --omit=dev --json`: PASS, zero shipped-runtime vulnerabilities.
- Full `npm audit --json`: five high findings remain only in the existing
  development-time `eslint-config-next` → `@next/eslint-plugin-next` →
  `fast-glob` → `micromatch` → `braces` chain. npm proposes an incompatible
  Next.js 14 downgrade; A-006's existing exception applies to this same chain.
- `npm run check`: PASS. TypeScript, ESLint, 13 unit tests, two consumer
  fixtures, Storybook 10.6.3, and the Next.js 16.4.2 production build passed.
- `npm run pack:check`: PASS. The dry run reports
  `nmi-devops-shared-components@1.1.0`, the matching tarball, and 37 files.
- `git diff --check`: PASS.
- GitHub Pages run `39879895039`: PASS on remote `master` `d91ac862`.

## Browser regression blocker

`npm run test:e2e` completed with 21 passing and seven failing tests. The
failures expose integration drift from the merged public-documentation work:
superseded landing-page assertions, URL assertions that reject the configured
trailing slash, 375 px documentation-home overflow, and catalog link styling
that leaks into Portal Header link colors. The release candidate itself changes
only the displayed version under `app/`; it does not modify Portal Header source
or the pre-existing browser tests.

The concrete correction scope and validation plan are recorded in
`execution/19_v1_1_0_browser_regression_correction_plan_2026-10-23.md`.
Release status remains **BLOCKED** pending approval, implementation, passing
validation, and independent review of that correction unit.

## Browser correction validation closure

A-025 approved correction plan 19. The scoped CSS containment, mobile overflow,
current documentation journey, and trailing-slash assertions were implemented.
All 28 browser cases now pass, along with the final quality, runtime audit,
package dry-run, version-alignment, and whitespace checks. No component source,
public API, defaults, navigation data, or Storybook story changed in this unit.

Release readiness is now blocked only on independent review of the complete
candidate before Orion prepares the commit gate.
