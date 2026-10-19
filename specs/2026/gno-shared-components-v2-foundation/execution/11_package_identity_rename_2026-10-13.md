# Package identity rename — verification report

## Context and scope

- Product display name: **NMI DevOps Shared Components**.
- Consumer package ID: `nmi-devops-shared-components`.
- Private npm workspace identity: `nmi-devops-shared-components-workspace`.
- Former consumer package ID: `gno-shared-components`; retained only in historical evidence and explicit migration guidance.
- Repository / branch / base: `D:\gno-node-projects\gno-shared-components-v2`, `feature/foundation-package-rename`, `6c1a403f334a7d07fea8665d27e7f55e53526839`.
- Requirements: [R-014](../requirements.md), [AC-019](../acceptance_criteria.md).
- User approvals: [A-009 and A-010](../approvals.md).

## Updated surfaces

Updated root and package manifests, lockfile, workspace dependency and scripts, package imports, release artifact naming, showcase metadata and browser assertions, consumer documentation, PortalHeader references, foundation specifications and presentation, changelog, versioning guidance, and QA cases. The repository name/path remains `gno-shared-components-v2`. Previous verification reports and user decisions were preserved as historical evidence.

## Verification results

| Check | Result | Evidence |
| --- | --- | --- |
| `npm install --package-lock-only --ignore-scripts --offline` | PASS | Lockfile workspace metadata regenerated from the renamed manifests. |
| `npm install --ignore-scripts --offline` | PASS | Replaced the stale old workspace symlink with the new workspace package. |
| `npm run check` | PASS | Typecheck, lint, package build, Storybook build, and Next.js 16.3.8 production build completed. Vitest exited successfully but found no unit test files; Storybook completed with no story files configured. |
| `npm run test:e2e` | PASS | Six Chromium desktop/mobile browser tests passed, including assertions for the new product and catalog titles and package import example. |
| `npm run pack:check` | PASS | `nmi-devops-shared-components@0.1.0`; artifact `nmi-devops-shared-components-0.1.0.tgz`; 7 files. |
| `git diff --check` | PASS | No whitespace errors. |
| Manual QA cases MT-NAME-001–004 in `manual_testing.md` | PASS | Vera executed manifest/lockfile inspection, manual Playwright inspection of `/` and `/catalog`, `npm run pack:check`, and consumer documentation review on 2026-10-13. Detailed actual results are recorded in the standalone QA file. |
| Independent review | PASS | Argus reviewed the local rename diff against R-014/AC-019 and A-009/A-010. No required findings or optional suggestions; independent package metadata/artifact checks and `git diff --check` passed. Review evidence is in [report 12](12_package_identity_review_2026-10-13.md). Argus's attempts to rerun `npm run check` and `npm run test:e2e` were blocked by runner `spawn EPERM`; the already recorded passing executions remain the evidence for those suites. |

## Release and consumer impact

Renaming the consumer package ID changes install URLs and JavaScript/TypeScript import paths, including the CSS import. The changelog classifies a published package-ID change as a major migration and includes the former ID as the migration source. Package version remains `0.1.0` in this implementation candidate; release version/tag and Bitbucket publication remain separately gated.

Current distribution was later moved to GitHub Releases; see the 2026-10-19 hosting update in [`state.md`](../state.md) and the current [`docs/versioning.md`](../../../../docs/versioning.md).

## Recommendation and next action

The code, docs, lockfile, showcase, and package artifact are aligned for the new identity; all four manual QA cases passed and Argus found no findings. No review-adjustment plan is needed for this iteration. A commit proposal for this exact rename scope is prepared in [report 12](12_package_identity_review_2026-10-13.md). A-008 does not cover this changed scope. No commit or push was performed.
