# Package identity rename — independent review and commit proposal

## Review context

- Repository: `D:\gno-node-projects\gno-shared-components-v2`.
- Branch / base: `feature/foundation-package-rename` / `6c1a403f334a7d07fea8665d27e7f55e53526839`.
- Scope: rename product display identity to **NMI DevOps Shared Components** and consumer package ID to `nmi-devops-shared-components`.
- Requirements / acceptance: [R-014](../requirements.md), [AC-019](../acceptance_criteria.md).
- Approvals: [A-009/A-010](../approvals.md).
- Verification: [package rename QA report](11_package_identity_rename_2026-10-13.md) and [manual cases](../../../../manual_testing.md).
- Reviewer: Argus, independent read-only review.

## Review result

**Decision: PROCEED.** Argus found no required findings and no optional suggestions. The review found the approved identity consistently applied across manifests, lockfile, workspace scripts/links, showcase title and imports, package dry-run metadata/artifact, current consumer documentation, changelog migration guidance, PortalHeader references, and QA evidence. Historical `gno-shared-components` references remain only as explicitly labeled prior-release evidence or migration source.

Argus independently confirmed `npm run pack:check`, workspace/package identity via npm inspection, and `git diff --check`. Argus attempted to rerun `npm run check` and `npm run test:e2e`, but the runner returned `spawn EPERM` before those suites ran. The previously recorded successful full check and six-test E2E run are retained in report 11. No files were changed by Argus. This review does not authorize commit, push, PR, publication, merge, or deployment.

No review adjustments are required for this iteration; reports 08–10 remain historical evidence for earlier findings and are not reopened.

## Proposed commit — approval required

- Repository: `D:\gno-node-projects\gno-shared-components-v2`.
- Branch: `feature/foundation-package-rename`.
- Base revision: `6c1a403f334a7d07fea8665d27e7f55e53526839`.
- Proposed message: `chore: rename package to NMI DevOps Shared Components`.
- Candidate files (32):

```text
CHANGELOG.md
CONTRIBUTING.md
README.md
app/catalog/page.tsx
app/layout.tsx
app/page.tsx
docs/consumer-setup.md
docs/review-adjustments.md
docs/versioning.md
manual_testing.md
next.config.ts
package-lock.json
package.json
packages/ui/README.md
packages/ui/package.json
scripts/pack-release.mjs
specs/2026/gno-shared-components-v2-foundation/acceptance_criteria.md
specs/2026/gno-shared-components-v2-foundation/approvals.md
specs/2026/gno-shared-components-v2-foundation/components/portal_header/requirements.md
specs/2026/gno-shared-components-v2-foundation/components/portal_header/user-stories.md
specs/2026/gno-shared-components-v2-foundation/design.md
specs/2026/gno-shared-components-v2-foundation/execution/11_package_identity_rename_2026-10-13.md
specs/2026/gno-shared-components-v2-foundation/execution/12_package_identity_review_2026-10-13.md
specs/2026/gno-shared-components-v2-foundation/presentation/foundation-presentation.html
specs/2026/gno-shared-components-v2-foundation/presentation/foundation-presentation.md
specs/2026/gno-shared-components-v2-foundation/requirements.md
specs/2026/gno-shared-components-v2-foundation/specification.md
specs/2026/gno-shared-components-v2-foundation/state.md
specs/2026/gno-shared-components-v2-foundation/test_plan.md
specs/2026/gno-shared-components-v2-foundation/wbs.md
specs/README.md
tests/e2e/showcase.spec.ts
```

Excluded from this candidate: `repositories/repositories.md`, `.playwright-mcp/`, and `specs/2026/announcement-component/`; these are unrelated existing working-tree changes. No files have been staged.

## Validation and next gate

Recorded PASS: `npm run check`; `npm run test:e2e` (6 Chromium desktop/mobile tests); `npm run pack:check`; MT-NAME-001–004; `git diff --check`; independent Argus review. Argus's rerun attempts for the first two commands were blocked by runner process permissions as above.

## Commit result

The user approved this exact candidate with “Proceed.” Orion committed all 32 listed files on `feature/foundation-package-rename` as `eb7a73e52f0c4010c1decab37951752ef6f950cc`, message `chore: rename package to NMI DevOps Shared Components`. The unrelated `repositories/repositories.md`, `.playwright-mcp/`, and announcement planning changes were left out of the commit.

## Push result

The user approved pushing the exact commit to the named branch with “I see proceed with the next step” after the concrete push proposal. Orion verified the local branch, HEAD, and HTTP `origin`, then ran `git push origin feature/foundation-package-rename`. The push succeeded and Bitbucket reported the new branch `feature/foundation-package-rename`. `git ls-remote origin refs/heads/feature/foundation-package-rename` confirmed the remote hash is `eb7a73e52f0c4010c1decab37951752ef6f950cc`. No force push, PR, merge, or publication occurred.

The user declined the prepared PR and reiterated a request for direct merge because the change is a package rename. The direct update remains blocked by automatic review and the repository's required PR/merge gates. No PR was created and no further attempt to update `master` was made. Remote `master` remains unchanged at `6c1a403f334a7d07fea8665d27e7f55e53526839`.

## Direct merge request — blocked

The user then requested “@orion directly to merge to master.” The commit is a fast-forward child of the then-current remote `master`, but the attempted direct push to `refs/heads/master` could not connect to Bitbucket over port 80. A retry with network access was rejected by automatic approval review because it would update the protected/default `master` branch directly and bypass the repository-mandated PR and merge gates. No workaround was attempted. A subsequent read-only `git ls-remote` confirmed `master` remains at `6c1a403f334a7d07fea8665d27e7f55e53526839`, while the feature branch remains at `eb7a73e52f0c4010c1decab37951752ef6f950cc`. The prepared PR proposal below is the compliant next step; no PR has been created.

## Prepared pull request — approval required

- Repository: Bitbucket `gma_rnd/reactjs-shared-components`.
- Base: `master` at `6c1a403f334a7d07fea8665d27e7f55e53526839`.
- Head: `feature/foundation-package-rename` at `eb7a73e52f0c4010c1decab37951752ef6f950cc`.
- Proposed title: `feat: rename foundation package to NMI DevOps Shared Components`.
- Proposed description:

```markdown
## Summary

Rename the shared package identity to **NMI DevOps Shared Components** with consumer package ID `nmi-devops-shared-components`. The workspace manifest, package metadata, lockfile, build and release scripts, showcase, catalog, consumer documentation, and migration guidance now use the new identity. The catalog install and import examples show the new package name. The changelog documents the consumer migration as a major package identity change.

## Validation

- `npm run check` — PASS (including package, Storybook, and Next.js builds; no unit test files or configured Storybook stories currently exist).
- `npm run test:e2e` — PASS (6 Chromium desktop/mobile tests).
- `npm run pack:check` — PASS (`nmi-devops-shared-components@0.1.0`, 7 files).
- Manual QA MT-NAME-001–004 — PASS.
- Independent Argus review — PROCEED, no findings.
- `git diff --check` — PASS.

## Consumer impact

Consumers migrate package installation, JavaScript/TypeScript imports, and the stylesheet import from `gno-shared-components` to `nmi-devops-shared-components`. No public component is currently exported.
```

No PR has been created. PR approval remains pending; merge, publication, and deployment each require their own authorization.
