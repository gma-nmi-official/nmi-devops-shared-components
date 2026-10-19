# Release preparation — initial v1.0.0

## Context and objective

- Project: `gno-shared-components-v2` foundation.
- Objective: prepare the first stable `nmi-devops-shared-components` release metadata after the owner confirmed the foundation merged to `master` at `b0c0aba`.
- Requirement / acceptance link: R-009 / AC-013 (stable package versioning and package metadata).
- Repository: `D:\gno-node-projects\gno-shared-components-v2`.
- Branch / base: `feature/foundation-release-v1.0.0` / `b0c0aba`.
- Approval: A-017, approved 2026-10-19 15:22 Asia/Shanghai, authorizes local release preparation only.

## Decision and scope

Set root workspace, publishable package, and lockfile metadata to `1.0.0`. Move every entry from `Unreleased` to the dated `1.0.0` changelog section. Classify this package-identity transition as **major**, explain migration from the former package ID, and state that the initial stable foundation adds no public UI component exports. Update all current install/tag examples in the README, contributor guide, consumer setup guide, catalog page, and foundation presentation to `v1.0.0`. The catalog and presentation edits only refresh displayed examples; no runtime behavior or public component API changes.

No commit, push, PR, tag, GitHub Release, or package publication was performed or authorized by A-017.

## Changed files

- `package.json`
- `packages/ui/package.json`
- `package-lock.json`
- `CHANGELOG.md`
- `docs/versioning.md`
- `docs/consumer-setup.md`
- `README.md`
- `CONTRIBUTING.md`
- `app/catalog/page.tsx` (displayed consumer example only)
- `specs/2026/gno-shared-components-v2-foundation/presentation/foundation-presentation.md`
- `specs/2026/gno-shared-components-v2-foundation/presentation/foundation-presentation.html`
- `manual_testing.md`
- `specs/2026/gno-shared-components-v2-foundation/approvals.md`
- `specs/2026/gno-shared-components-v2-foundation/state.md`
- `specs/2026/gno-shared-components-v2-foundation/execution/14_release_preparation_2026-10-19.md`

## Validation

Environment: Node.js `v26.10.0`, npm `11.19.1`, Windows PowerShell.

| Check | Command | Result | Evidence |
| --- | --- | --- | --- |
| Full repository quality gate | `npm run check` | PASS | Typecheck and lint passed; Vitest exited 0 with no test files found; package build, Storybook static build, and Next.js 16.3.8 production build passed. Storybook emitted its expected empty-story, non-blocking large-chunk, and Node deprecation warnings. |
| Package artifact dry run | `npm run pack:check` | PASS | Reported `nmi-devops-shared-components@1.0.0`, `nmi-devops-shared-components-1.0.0.tgz`, and 7 files. |
| Release metadata manual acceptance | MT-REL-006 in root `manual_testing.md` | PASS | Confirmed aligned `1.0.0` metadata and all current README, contributor, consumer-guide, catalog, and presentation tag/download examples use `v1.0.0`. No current-surface `v0.1.0` example remains. |
| Whitespace/conflict check | `git diff --check` | PASS | No whitespace errors reported for tracked changes. |

## Findings and risks

- The changelog's major classification follows the existing versioning rule for the package-ID rename. Consumers of the former package identity must update the artifact, package/import name, and stylesheet import.
- This is metadata preparation only. A real GitHub Release and authenticated consumer install remain unverified until a separate, explicitly approved tag push and authorized consumer access.
- Historical `0.1.0` package results in `manual_testing.md`, the old changelog section, and dated execution/verification reports remain unchanged.
- No runtime source changes are in scope.

## Review, approval, and next action

- Development/release-preparation approval: A-017, approved.
- Independent review: pending; Forge's implementation checks are not an independent review.
- Commit, push, PR, tag, and release approval: not granted by A-017.
- Next: hand off the validated candidate for independent Argus review. Commit remains separately gated.
