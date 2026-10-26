# Manual Testing Evidence

## Scope

Foundation verification for the shared-components repository, including the
catalog, Storybook setup, consumer documentation, vendored workflow, and the
release-artifact flow. The original 2026-10-08 release checks were for the then
planned Bitbucket process; current release guidance uses GitHub Releases, with
its workflow QA recorded below.

## Environment

- Repository: `gno-shared-components-v2`
- Revision: `ef5546d0dcf953d0fed2e4b844d425d3814f6e98` (working tree contains
  the uncommitted foundation and approved adjustment changes)
- Node.js: `v26.10.0`
- npm: `11.19.1`
- Tester: Vera
- Date: 2026-10-08

## Cases

| ID | Requirement | Setup | Steps | Expected result | Actual result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| MT-001 | Local developer setup | Repository checkout and Node/npm installed | Run `npm ci`, then start the documented Next.js development command | Dependencies install and showcase loads | Developer confirmed local setup and showcase operation; see final verification record | PASS |
| MT-002 | Catalog documentation | Development server running | Open `/catalog` and inspect component documentation and consumer examples | Catalog renders and explains component usage | Developer confirmed the catalog loads successfully in the browser | PASS |
| MT-003 | Storybook documentation | Dependencies installed | Run `npm run dev:storybook`, open `http://localhost:6006` | Storybook starts and component stories are discoverable | Storybook loaded successfully; empty state is expected before the first public story | PASS |
| MT-004 | Release artifact | Valid package version and dependencies | Run `npm run pack:release`, inspect generated tarball contents | Versioned `.tgz` is created with only package files | `gno-shared-components-0.1.0.tgz` created successfully; 7 package files reported | PASS |
| MT-005 | Generated-output hygiene | Repository checkout | Confirm `storybook-static/`, package `dist/`, `.next/`, coverage, release artifacts, and `*.tgz` are ignored | Generated outputs do not appear as tracked changes | `git check-ignore` confirmed all six generated-output patterns are ignored | PASS |

## Handoff

MT-001 through MT-005 have PASS evidence from the developer's local manual
testing or Vera's repository checks. The final verification record below is
authoritative; earlier blocked results are historical runner/permission evidence.
## Verification update — 2026-10-08

The developer reported that `npm run check` completed without errors through the Next.js production build:

```text
Creating an optimized production build ...
✓ Compiled successfully
✓ Finished TypeScript
✓ Collecting page data using 6 workers
✓ Generating static pages using 6 workers (5/5)
✓ Finalizing page optimization
```

Recorded result: **PASS for the reported Next.js production-build portion**. Other quality-gate commands should remain separately recorded unless their output is confirmed.

The developer also reported that `npm run pack:check` completed without errors:

```text
version: 0.1.0
filename: gno-shared-components-0.1.0.tgz
package size: 1.3 kB
unpacked size: 2.6 kB
total files: 7
```

Recorded result: **PASS for package dry-run inspection**.

The developer also reported that `npm run pack:release` created:

```text
gno-shared-components-0.1.0.tgz
```

Recorded result: **PASS for release artifact creation**. The reported `DEP0190` warning came from the packaging helper's Windows shell fallback; the helper was updated to invoke npm through its Node CLI path when available, avoiding `shell: true` during normal `npm run pack:release` execution.

Follow-up result: `npm run pack:release` completed cleanly with no `DEP0190` warning and produced `gno-shared-components-0.1.0.tgz`.

Recorded result: **PASS for clean release artifact creation**.

## Final local verification update — 2026-10-08

The developer confirmed that the previously blocked build checks completed successfully in the local writable environment:

```text
npm run build:package       PASS
npm run build-storybook     PASS
npx next build              PASS
```

Recorded result: **PASS for the previously blocked build checks**, pending final Argus review confirmation.

## Verification update — 2026-10-08 (Vera revalidation)

Automated checks executed from the repository root at revision
`ef5546d0dcf953d0fed2e4b844d425d3814f6e98`, with Node.js `v26.10.0` and npm
`11.19.1`:

| Check | Command | Result | Evidence / reason |
| --- | --- | --- | --- |
| Lint | `npm run lint` | PASS | ESLint exited 0. |
| Root typecheck | `npx tsc --noEmit --incremental false` | PASS | TypeScript exited 0 without writing `.tsbuildinfo`. |
| Package typecheck | `npm run typecheck -w gno-shared-components` | PASS | TypeScript exited 0. |
| Tests | `npm run test` | PASS | Vitest exited 0; no test files were found, which is expected for the empty foundation. |
| Package dry-run | `npm_config_cache=D:\PERSONAL_WORKFLOW\.npm-cache-temp npm run pack:check` | PASS | `gno-shared-components@0.1.0`, 7 files, tarball metadata generated. |
| Package build | `npm run build:package` | BLOCKED | Windows `EPERM` while removing `packages/ui/dist`; no build assertion ran. |
| Storybook static build | `npm run build-storybook` | BLOCKED | Windows `EPERM` while writing Storybook cache under `node_modules/.cache`. |
| Next production build | `npx next build` | BLOCKED | Windows `EPERM` while writing `.next/trace`. |

Generated-output hygiene was checked with `git check-ignore` and passed for
`storybook-static/`, `packages/*/dist/`, `.next/`, `coverage/`,
`release-artifacts/`, and `*.tgz`.

Package identity check passed: the private root is
`gno-shared-components-workspace@0.1.0`; the publishable workspace is
`gno-shared-components@0.1.0`.

The three build checks were subsequently confirmed PASS by the developer in a
writable local environment. The earlier BLOCKED results are retained as
historical evidence of the agent-runner and Windows-permission issue.

## Final verification record — authoritative status

| Check | Environment | Result | Evidence |
| --- | --- | --- | --- |
| `npm ci` and local showcase setup | Node.js v26.10.0, npm 11.19.1 | PASS | Developer confirmed local setup and showcase operation |
| `/catalog` browser check | Local development server | PASS | Catalog rendered successfully |
| `npm run dev:storybook` | Local browser at `http://localhost:6006` | PASS | Storybook loaded; empty state is expected before public stories |
| `npm run check` | Local writable environment | PASS | Developer reported no errors through production build |
| `npm run build:package` | Local writable environment | PASS | Developer confirmed package build completed |
| `npm run build-storybook` | Local writable environment | PASS | Developer confirmed Storybook build completed |
| `npx next build` | Local writable environment | PASS | Developer confirmed Next.js production build completed |
| `npm run pack:check` | Local writable environment | PASS | Version `0.1.0`, 7 package files |
| `npm run pack:release` | Local writable environment | PASS | `gno-shared-components-0.1.0.tgz` created without `DEP0190` |
| Generated-output ignore checks | Repository working tree | PASS | Generated output patterns are ignored |

## Package identity rename QA — 2026-10-13

- Requirement / acceptance criterion: R-014 / AC-019
- QA owner: Vera
- Repository / branch / revision: `gno-shared-components-v2`, `feature/foundation-package-rename`, `6c1a403f334a7d07fea8665d27e7f55e53526839` (uncommitted rename change set)
- Environment: Windows PowerShell, Node.js/npm workspace, local Next.js 16.3.8 dev server, Playwright browser.
- Setup: `npm run dev -- --hostname 0.0.0.0`; server built the package and became ready at `http://localhost:3000`.

| ID | Action | Expected result | Actual result | Status |
| --- | --- | --- | --- | --- |
| MT-NAME-001 | Inspect root and `packages/ui` manifests plus lockfile workspace entries. | Root is `nmi-devops-shared-components-workspace`; published package and workspace dependency are `nmi-devops-shared-components`. | PowerShell JSON inspection confirmed root and lock root names are `nmi-devops-shared-components-workspace`, package and lock workspace names are `nmi-devops-shared-components`, version is `0.1.0`, and lock dependency resolves to `packages/ui`. | PASS |
| MT-NAME-002 | Open `/` and `/catalog` in the browser and inspect page title and heading. | Product is identified as NMI DevOps Shared Components; catalog imports and examples use the new package ID. | Playwright opened `http://localhost:3000/` (title `NMI DevOps Shared Components`; page heading `A dedicated foundation for GNO portal interfaces.`) and `/catalog` (title `Component catalog | NMI DevOps Shared Components`; visible package ID and install/import/style examples use `nmi-devops-shared-components`). | PASS |
| MT-NAME-003 | Run package dry-run and inspect generated artifact metadata/name. | Tarball uses `nmi-devops-shared-components-<version>.tgz` and package metadata reports the new ID. | `npm run pack:check` exited 0; npm reported `nmi-devops-shared-components@0.1.0`, filename `nmi-devops-shared-components-0.1.0.tgz`, and 7 files. | PASS |
| MT-NAME-004 | Follow consumer setup example using the new package ID and stylesheet path. | Example installation/import guidance is internally consistent; migration note identifies the old ID only as the previous package. | Read `docs/consumer-setup.md`, `packages/ui/README.md`, and root `README.md`: install URL, JS/TS import, and `styles.css` path consistently use the renamed ID; versioning guidance and changelog explain the old ID as a migration source. | PASS |

These cases supplement, and do not rewrite, the completed historical checks below. Browser inspection was performed manually with Playwright; the separate automated E2E run remains recorded in the execution report.

## GitHub Release workflow QA — 2026-10-19

- Requirement: release the versioned package from GitHub Actions as a GitHub Release asset.
- Workflow: `.github/workflows/release.yml`
- QA owner: Vera / release owner
- Execution status: Pending a separately approved tag push. No release tag was pushed as part of this change.
- Local automated validation: `npm run check` PASS and `npm run pack:check` PASS on Node.js `v26.10.0` / npm `11.19.1` (2026-10-19). The check reports no Vitest test files, an expected empty Storybook story pattern, and a non-blocking chunk-size warning.

| ID | Setup / steps | Expected result | Actual result | Status |
| --- | --- | --- | --- | --- |
| MT-REL-001 | Inspect the workflow trigger, permissions, version check, package steps, and release command. | A `v*` tag starts the workflow; only the required `contents: write` permission is granted; the tag must match both package versions; the workflow runs checks, packs one `.tgz`, and attaches it to the release. | Static inspection confirms those configured steps and permissions. | PASS |
| MT-REL-002 | Push an approved tag matching the root and package versions; inspect the GitHub Actions run and release assets. | Workflow completes and attaches the matching `.tgz` to the GitHub Release. | Requires an approved tag push and GitHub Actions run. | BLOCKED |
| MT-REL-003 | From an authorized consumer CI environment, authenticate, download the release asset with the documented command, then install the local tarball. | The expected package version installs and its package imports resolve. | Requires a created private GitHub Release and authorized consumer credentials. | BLOCKED |
| MT-REL-004 | Simulate Orion receiving confirmation that a PR has merged to `master`, with matching versions/changelog and passing checks. | Orion verifies the merged commit and release readiness, then presents the exact tag push and requests separate approval; it does not merge or tag automatically. | This handoff behavior is documented but has not been exercised in a live release handoff. | BLOCKED |
| MT-REL-005 | Repeat the handoff with a missing version bump or changelog entry. | Orion reports a blocker and routes the missing work through a reviewed PR; it does not tag the incomplete release. | This blocker path is documented but has not been exercised in a live release handoff. | BLOCKED |

## Initial stable release preparation QA — 2026-10-19

- Requirement / acceptance criterion: R-009 / AC-013
- Repository / branch / base: `gno-shared-components-v2`, `feature/foundation-release-v1.0.0`, `b0c0aba`
- Environment: Windows PowerShell, Node.js `v26.10.0`, npm `11.19.1`
- Setup: repository root with the committed npm lockfile and installed workspace dependencies; no secrets, service, or production data required.
- QA owner: Vera (handoff pending); MT-REL-006 was executed by Forge as a metadata acceptance check.
- Handoff: Prepared; execution evidence recorded by Forge, independent review pending.

| ID | Action / exact command | Expected result | Actual result | Status |
| --- | --- | --- | --- | --- |
| MT-REL-006 | Inspect `package.json`, `packages/ui/package.json`, and `package-lock.json`; run `npm run pack:check`; inspect `README.md`, `CONTRIBUTING.md`, `docs/versioning.md`, `docs/consumer-setup.md`, `/catalog`, the foundation presentation, and `CHANGELOG.md`. | Root, package, and lock versions all equal `1.0.0`; dry-run names `nmi-devops-shared-components@1.0.0`; all current tag/download examples use `v1.0.0` and the matching tarball; changelog lists every former Unreleased item, major SemVer rationale, migration notes, and validation evidence. | Node/npm JSON inspection confirmed all workspace/package/lock versions equal `1.0.0`; `npm run pack:check` reported `nmi-devops-shared-components@1.0.0`, `nmi-devops-shared-components-1.0.0.tgz`, and 7 package files. Inspected README, CONTRIBUTING, versioning and consumer setup guides, catalog example, both presentation formats, and changelog: all current release examples use `v1.0.0`; no current-surface `v0.1.0` examples remain. Dated manual/execution evidence and the old changelog entry remain unchanged. | PASS |

This release-metadata check supplements automated quality validation. It does not push a tag, create a GitHub Release, or test authenticated consumer download; MT-REL-002 and MT-REL-003 remain separately blocked pending those operations and credentials.

## Initial stable release preparation — Vera validation — 2026-10-19

- Requirement / acceptance criterion: R-009 / AC-013; release-preparation checks in `specs/2026/gno-shared-components-v2-foundation/execution/14_release_preparation_2026-10-19.md`.
- Repository / branch / base: `gno-shared-components-v2`, `feature/foundation-release-v1.0.0`, HEAD `b0c0aba1ced6b0f91dc37e7890044c83b984a801` with the approved, uncommitted release-preparation diff (15 files including this QA record).
- Environment: Windows PowerShell, Node.js `v26.10.0`, npm `11.19.1`; installed dependencies from the repository lockfile.
- Setup and safety: run from repository root; no production credentials, external services, or production data used. A sandbox permission restriction required retrying the local build/test and npm-cache commands with local process/cache access enabled.
- QA owner: Vera.
- QA recipient: Atlas for handoff to Argus independent review.
- Handoff: Prepared; validation evidence completed and reported to Atlas. No external message sent. Independent review remains pending.

| ID | Action / exact command | Expected result | Actual result | Status |
| --- | --- | --- | --- | --- |
| MT-REL-007 | Run `npm run check` from the repository root. | Typecheck, lint, tests, package build, Storybook static build, and Next.js production build complete successfully. | First sandbox attempt stopped at Vitest/esbuild with Windows `spawn EPERM`; retry with local process access exited 0. Typecheck and lint passed; Vitest exited 0 with no test files; package build, Storybook build, and Next.js 16.3.8 production build passed. Storybook emitted the expected no-stories notice, a non-blocking chunk-size warning, and a Node deprecation warning. | PASS |
| MT-REL-008 | Run `npm run pack:check` from the repository root. | Dry-run reports `nmi-devops-shared-components@1.0.0`, the matching tarball name, and only intended package files. | First sandbox attempt could not write npm's local cache (`EPERM`); retry with cache access exited 0 and reported `nmi-devops-shared-components@1.0.0`, `nmi-devops-shared-components-1.0.0.tgz`, and 7 files. | PASS |
| MT-REL-009 | Run `git diff --check`; parse root/package/lock metadata; inspect active README, contributor, consumer setup, versioning, catalog, and presentation examples, then inspect historical QA/review evidence. | No whitespace errors; all four version metadata locations equal `1.0.0`; current examples use `v1.0.0`; prior release evidence remains intact. | `git diff --check` exited 0. PowerShell JSON inspection confirmed root, publishable package, lock root, and `packages/ui` lock version are all `1.0.0`. Scanned all 7 active example surfaces: none contains a `v0.1.0` tag/download example. The `0.1.0` changelog section and former package/artifact references remain in dated historical QA/review evidence. | PASS |

These checks validate only the local metadata candidate. A real GitHub Release, authenticated consumer download, and tag-triggered workflow remain unexecuted; see MT-REL-002/003. No commit, push, PR, or tag was created by this QA run.

## Minor v1.1.0 release preparation QA — 2026-10-23

- Requirement / acceptance criterion: repository release policy in
  `docs/versioning.md`; Portal Header PH-R12 / PH-AC18.
- Repository / branch / base: isolated worktree,
  `feature/release-v1.1.0`, `d91ac862dda90073875d16c70bb24886d334ff98`.
- QA owner: Vera after Forge implementation checks.
- Handoff: prepared; results are recorded only after execution.

| ID | Action / exact command | Expected result | Actual result | Status |
| --- | --- | --- | --- | --- |
| MT-REL-010 | Parse `package.json`, `packages/ui/package.json`, and both workspace entries in `package-lock.json`. | All release metadata equals `1.1.0`. | Node JSON inspection confirmed root, publishable package, lock root, and `packages/ui` lock workspace all equal `1.1.0`. | PASS |
| MT-REL-011 | Inspect `CHANGELOG.md` and active README, contributor, consumer-setup, versioning, documentation-home, and foundation-presentation examples. | Completed Portal Header/public-docs work is dated under `1.1.0`; active examples use `v1.1.0`, its matching tarball, and the current GitHub repository. | Static inspection confirmed the dated `1.1.0` entry and aligned active release examples. | PASS |
| MT-REL-012 | Run `npm run check`, `npm run test:e2e`, `npm run pack:check`, and `git diff --check`. | All configured quality, browser, package, and whitespace checks pass; package dry run reports `1.1.0`. | Initial browser validation completed with 21 passing and seven failing tests due to public-documentation integration drift described in correction plan 19. After the A-025 corrections, `npm run check`, all 28 browser cases, the 37-file `1.1.0` package dry run, and `git diff --check` passed. | PASS |
| MT-REL-013 | After a separately approved tag push, inspect the GitHub Actions release and install the private `.tgz` from an authorized consumer environment. | `v1.1.0` workflow succeeds, publishes the matching private asset, and authenticated consumer installation resolves public imports. | Requires later tag-push approval, the resulting release asset, repository access, and an authorized `GH_TOKEN`. | BLOCKED |
| MT-REL-014 | Run `npm ci` and `npm audit --json` against the committed dependency graph. | Installation succeeds and no high or critical advisories remain before release qualification. | `npm ci` installed 567 packages. Audit reported 11 vulnerabilities: 3 moderate, 6 high, and 2 critical, directly affecting Next.js, Storybook, Vite, Vitest, `@vitest/coverage-v8`, and `eslint-config-next`. | FAIL |
| MT-REL-015 | Apply A-023 dependency remediation; rerun clean install, full and shipped-runtime audits, and the configured quality gate. | Critical/runtime findings are cleared; the existing development-only ESLint chain is unchanged and explicitly assessed; all non-browser quality checks pass. | Upgraded Next.js/ESLint config to `16.4.2`, Storybook to `10.6.3`, Vite to `7.3.7`, and Vitest packages to `4.1.12`. `npm ci` and `npm run check` passed; shipped-runtime audit reports zero findings. Full audit retains only the five-item development ESLint globbing chain covered by A-006. | PASS |
| MT-REL-016 | Inspect the GitHub Pages workflow result on remote `master`. | The documentation deployment completes for the merged release base. | Public GitHub API reports workflow run `39879895039` completed successfully at `d91ac862dda90073875d16c70bb24886d334ff98`. | PASS |
| MT-REL-017 | Validate the A-025 browser regression corrections at desktop and mobile project settings. | Current documentation navigation and trailing-slash URLs pass; the 375 px home page does not overflow; catalog styles do not override Portal Header link tokens; existing Portal Header interaction and responsive coverage remains green. | `npm run test:e2e` completed 28/28 PASS. The suite covered both navigation journeys, home/catalog page overflow, native GET search, focus restoration/trapping, production visual structure, root token overrides, and Portal Header overflow at 320/375/768/1024/1440 px. | PASS |
| MT-REL-018 | Validate approved F-REL-110/F-REL-111 documentation corrections and rerun the complete release gate. | Obsolete Portal Footer/API/state claims are absent; private-download guidance is accurate; quality, browser, package, audit, version, and whitespace checks pass. | Both blocked-term scans passed. `npm run check` passed with 13/13 tests and two consumer fixtures; `npm run test:e2e` passed 28/28; `npm run pack:check` reported the 37-file `1.1.0` package; shipped-runtime audit reported zero findings and full audit retained five high development-only findings under A-006; all four version locations equal `1.1.0`; `git diff --check` passed. | PASS |
