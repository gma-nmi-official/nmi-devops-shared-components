# Current state: gno-shared-components-v2 foundation

## Portal Header minor release preparation — 2026-10-23

- Objective: prepare `nmi-devops-shared-components` version `1.1.0` after the
  owner-confirmed merges of Portal Header PR #2 and public documentation PR #3.
- Active unit / stage: U-REL-002 independent review closed with PROCEED. A-028
  corrections are validated and reports 22–24 record closure. Commit approval
  is the next separate gate.
- Repository / branch / base: isolated worktree on `feature/release-v1.1.0`,
  based on merged `master` revision
  `d91ac862dda90073875d16c70bb24886d334ff98`.
- Approval: A-022 authorizes local release preparation and checks only.
- Scope: align root, package, and lockfile versions at `1.1.0`; date the completed
  changelog entry; update active tag/download/version examples and the current
  GitHub repository URL; record QA and release-preparation evidence.
- Merge evidence: reviewed Portal Header commit `661ba9c` is an ancestor of
  `master`; PR #2 merged as `eb16f1c` with 1/1 quality checks, and PR #3 merged
  as current `master` `d91ac86` with 1/1 quality checks.
- Validation: metadata, active examples, changelog, `npm ci`, `npm run check`,
  package dry run, and `git diff --check` pass. The shipped-runtime audit is
  clean; the full audit retains five high development-only findings under the
  A-006 exception. GitHub Pages run `39879895039` passed on remote `master`
  `d91ac862`.
- F-REL-110 validation: the blocked-term scan is clean; the retained example
  matches the exported Portal Header props; `npm run docs:check`, the full
  `npm run check`, and `git diff --check` pass after the A-026 correction.
- F-REL-111 validation: private-download guidance is aligned across consumer
  docs and both presentation formats. The complete gate passes: 13/13 tests,
  two consumer fixtures, 28/28 browser cases, 37-file package dry run, zero
  shipped-runtime findings, the five-high A-006 development-only full-audit
  exception, four-way `1.1.0` alignment, and clean whitespace.
- Browser correction: A-025 approved plan 19. The current documentation journey,
  configured trailing slash, 375 px landing-page overflow, and catalog CSS
  leakage into Portal Header were corrected; all 28 browser cases now pass.
- Risks: PH-A20 screen-reader waiver and PH-A21 deferred Firefox/Safari/second-
  version coverage remain disclosed in the `1.1.0` changelog. A real release,
  authenticated consumer-asset download, and release-workflow result remain
  pending.
- Independent review: Argus returned PROCEED after closing F-REL-110, F-REL-111,
  and F-REL-112. See `execution/24_v1_1_0_final_review_closure_2026-10-23.md`.
- Next action: prepare the exact commit-approval artifact. Push, PR, merge, tag,
  and publication remain separately gated.

## Initial stable release preparation — 2026-10-19

- Objective: prepare the initial `1.0.0` package metadata and release documentation after the foundation was confirmed merged to `master` at `b0c0aba`.
- Active unit / stage: U-REL-001 release preparation; release candidate and push-result evidence are pushed, awaiting PR preparation and approval.
- Branch / base / commits: `feature/foundation-release-v1.0.0`, base `b0c0aba`, release-preparation commit `b8b2b56e54f024f9e8b29d98d7ca5f7261ed18c6`, documentation commits `cdce290df6870e91462027daba2a7759508bda8f` and `533aababb2fc025b9a920a6bb68eb66666779d26` (`docs: record v1.0.0 push outcome`).
- Approvals: A-017 authorizes release preparation; A-018 authorizes the release-preparation commit; A-019 and A-021 record the separate push approvals; A-020 records approval of the push-outcome documentation commit. PR creation, tag push, and release execution are not authorized yet.
- Scope: root/package/lockfile version alignment; dated changelog and migration notes; `v1.0.0` tag and consumer install examples across README, contributor guide, consumer setup guide, catalog, and foundation presentation; QA, execution, and approval evidence. Catalog/presentation edits only update displayed examples; no runtime behavior or package API changes.
- Diff reference: release-preparation commit `b8b2b56` contains the 15-path Argus candidate plus the review report (16 paths); `cdce290` records its commit result; `533aaba` records the push result and approval history. The branch is synchronized with `origin` at `533aababb2fc025b9a920a6bb68eb66666779d26`. Current local documentation correction is uncommitted in `approvals.md`, this `state.md`, and `execution/17_push_record_2026-10-19.md`.
- Checks: final `npm run check` PASS; `npm run pack:check` PASS; MT-REL-006 PASS; `git diff --check` PASS. Vitest found no test files; Storybook emitted expected no-story, non-blocking chunk-size, and Node deprecation warnings.
- Independent review: Argus returned PROCEED; F-REL-001 was closed after the state record distinguished the original 15-file candidate from the review report. See `execution/15_release_preparation_review_2026-10-19.md`.
- Remote: `origin` is the configured GitHub repository. The initial feature-branch push and subsequent documentation update push succeeded; `git ls-remote` confirmed `origin/feature/foundation-release-v1.0.0` at `533aababb2fc025b9a920a6bb68eb66666779d26`.
- Next action: request commit approval for the reviewed documentation-evidence correction, then obtain separate push approval for its resulting commit. After the push, prepare PR title/body/base/head and request PR approval before creating it.

## Previous GitHub hosting and package-release update — 2026-10-19

The current delivery target is GitHub `origin`, not the historical Bitbucket target documented below. The user approved updating the active package release guidance and adding `.github/workflows/release.yml`. The workflow runs for `v*` tags, verifies the tag against root and package versions, runs `npm run check`, packages the `.tgz`, and creates a GitHub Release with the package asset. At the time of A-014, consumer/setup guidance described authenticated downloads for a private repository; A-027 later replaced that active guidance after the repository became public.

No tag was pushed and no GitHub Release was created. Commit, push, and release-tag push remain separately gated. Manual cases MT-REL-002 and MT-REL-003 are BLOCKED until an approved release tag and authorized consumer credentials are available. Historical Bitbucket approvals and execution records below are retained as history.

On 2026-10-19 the user also approved A-015: after a PR is confirmed merged to `master` by the user or authorized repository owner, Orion should begin release readiness without waiting for another reminder. Orion verifies the merged revision, checks, aligned versions, and changelog, then prepares the exact tag push and resulting GitHub Release action for separate approval. Orion does not merge or tag without authorization. See `execution/13_orion_post_merge_release_handoff_2026-10-19.md`.

That previous workflow-change candidate passed `npm run check` and `git diff --check`. Argus independently reviewed it; both Minor findings were corrected under A-016 and closed on re-review. No required review findings remained for that earlier change. Its commit/push status is historical and does not establish review readiness for the current release-preparation candidate.

- Workflow release: current checked-in GNO lifecycle as of 2026-10-02
- Objective and agreed endpoint: design a configurable shared component foundation; proposed endpoint is validated and independently reviewed local implementation, then commit decision
- Current phase / stage / delivery unit: Direct merge blocked / package identity rename (R-014)
- Owner: Orion
- Last updated: 2026-10-13 Asia/Shanghai
- Active requirements/design version: foundation design with A-009/A-010 package-name amendment
- Approval log: `approvals.md`; A-006 approved the review corrections and temporary development-only audit exception; A-007 approved the one-line mobile overflow amendment
- Blockers: User declined PR creation and requested a direct merge. Auto-review rejected a direct update to protected/default `master` because it bypasses the repository-mandated PR and merge gates; no further push attempt is allowed. Remote master remains at `6c1a403f334a7d07fea8665d27e7f55e53526839`.
- Next concrete action: Await an authorized repository-governance change or a workflow-compliant path; do not create a PR or retry the direct master update under the current instructions.

The user approved product display name **NMI DevOps Shared Components** and consumer package ID `nmi-devops-shared-components` on 2026-10-13. Commit `eb7a73e52f0c4010c1decab37951752ef6f950cc` (`chore: rename package to NMI DevOps Shared Components`) was created on `feature/foundation-package-rename` from base `6c1a403f334a7d07fea8665d27e7f55e53526839` with the approved 32 files and pushed to `origin/feature/foundation-package-rename` on 2026-10-13. The remote branch was confirmed at the same commit with `git ls-remote`. The former ID remains in historical approvals and verification results as evidence of the prior contract; the changelog and versioning guide document its migration. This amendment supersedes the earlier A-002/A-003 package-name decision. Manual rename QA MT-NAME-001–004 passed on 2026-10-13 and is recorded in [`manual_testing.md`](../../../manual_testing.md) and [`execution/11_package_identity_rename_2026-10-13.md`](execution/11_package_identity_rename_2026-10-13.md). Argus independently reviewed the rename with no findings; see [`execution/12_package_identity_review_2026-10-13.md`](execution/12_package_identity_review_2026-10-13.md). The unrelated working-tree changes remain uncommitted.

## Current repository baseline

| Repository / absolute path | Branch / base | HEAD | Dirty diff evidence | Adoption record / freshness check |
| --- | --- | --- | --- | --- |
| gno-shared-components-v2 / `D:\gno-node-projects\gno-shared-components-v2` | `feature/foundation-release-v1.0.0` | `533aababb2fc025b9a920a6bb68eb66666779d26` | Remote origin branch is confirmed at this commit; local worktree has exactly three modified documentation paths listed above, pending review and separately gated commit/push. No unrelated changes were present at branch creation. | `../gno-shared-components-v2-adoption/adoption.md`; identity, branch, and push revision refreshed 2026-10-19 |

## Prior foundation evidence and history

Verification refresh at `c580e40819842932fe9430cefddca92bf6525867`: automated evidence is recorded in
[`execution/06_verification_audit_2026-10-09.md`](execution/06_verification_audit_2026-10-09.md),
and completed browser cases are recorded in [`manual_testing.md`](manual_testing.md).
Approved correction results are recorded in
[`execution/10_adjustment_validation_2026-10-09.md`](execution/10_adjustment_validation_2026-10-09.md).

## Proposed execution plan

| Stage / unit | Required / combined / N/A | Depth and rationale | Owner | Artifact / evidence | Status |
| --- | --- | --- | --- | --- | --- |
| Adoption refresh | Combined with inception | Existing adoption is current; identity/status rechecked | Athena | adoption report and this state | Complete |
| Requirements/design | Required | Package contract affects all future consumers | Athena | requirements/design/NFR documents | Approved |
| U-001 through U-005 construction | Required | Reviewable vertical delivery units | Forge, then Vera | `execution/compact_report.md` | Complete |
| U-006 integration | Required | Cross-unit and consumer-fixture confidence | Forge/Vera | `execution/compact_report.md` | Complete |
| Independent review | Required | GNO policy and shared-library risk | Argus | `execution/07_code_review_report_2026-10-09.md`, `execution/09_review_closure_2026-10-12.md` | PASS; no required findings remain |
| Review adjustments | Required | A-006 and A-007 corrections for F-003/F-005/F-006 plus mobile overflow | Forge/Vera/Argus | `execution/08_review_adjustment_plan_2026-10-09.md`, `execution/10_adjustment_validation_2026-10-09.md` | Complete and independently closed |
| Commit | Separately gated | Final scope now includes test/tooling/runtime files beyond A-004's documentation-only artifact | Orion | Future updated commit summary | Renewal/confirmation required after review |
| Push | Separately gated | Exact reviewed commit hash and command required | Orion | Future push approval | Pending concrete post-commit approval |

Compact execution records are selected per unit because the foundation is decomposed into small reviewable slices; inception retains full requirements/design documents due to the long-lived public package contract.

## Resume check

Before implementation, recheck HEAD, branch, worktree status, instructions, and installed Next.js documentation. Any user changes overlapping workspace/package configuration require reconciliation before U-001.

## Handoff and open decisions

A-002 and A-003 approved `gno-shared-components` at the time; that name decision is superseded by A-009/A-010 (`nmi-devops-shared-components`). A-006 and A-007 authorize the completed earlier correction scope. Argus closed those earlier findings on 2026-10-12; the new package-identity change still needs independent review. A-008 approved a different exact commit candidate and cannot authorize this change. Commit, push, PR, publication, merge, and deployment remain separately gated for the updated scope.

On 2026-10-02, the user initially selected
`https://github.com/gma-nmi-official/2026-GNO-Website-Revamp---Shared-Components.git`
as the delivery target. That GitHub configuration was later superseded by the
Bitbucket target recorded below; it is no longer the local `origin`.

On 2026-10-09, the user replaced that delivery target with Bitbucket. The initial
HTTPS connection reached the server but failed with `SEC_E_UNTRUSTED_ROOT`. The
user then explicitly requested HTTP. Local `origin` now uses
`http://samot.marlon@cvs.gmanmi.com/scm/gma_rnd/reactjs-shared-components.git`
for fetch and push. A read-only `git ls-remote origin` check succeeded and returned
no refs, consistent with an empty repository. No push had been attempted when this
record was prepared.

Also on 2026-10-02, the user clarified that the intended product is not limited to simple primitives: it must support composed portal components such as an importable portal header and must serve JavaScript consumer repositories. R-011/R-012 and AC-015/AC-016 capture this direction. At that stage, Button was the approved foundation proof and PortalHeader remained a future requirements/design unit. Button was subsequently removed as recorded below, leaving the current public inventory empty.

The user subsequently required a consumer-facing component display page with import instructions. R-013, AC-017/AC-018, and U-007 capture this material addition. The `/catalog` route provides an explicit empty public inventory, installation guidance, and illustrative future JavaScript/TypeScript imports. The current browser validation covers this empty-inventory contract.

The user then requested removal of all added components so the repository starts fresh and remains dedicated to GNO. The Button source, tests, story, export path, demo usage, and component-specific styles/docs were removed. The package build, catalog, and consumer-facing documentation infrastructure were preserved with an empty public inventory. Current validation: typecheck PASS, lint PASS, no-test suite PASS by explicit `passWithNoTests`, Next.js build PASS, and package dry-run PASS with 7 foundation files.
