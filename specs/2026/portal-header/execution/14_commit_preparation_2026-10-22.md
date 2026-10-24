# Commit Preparation: Portal Header

## Decision

The reviewed Portal Header candidate is ready for the commit approval gate.
Orion verified the actual repository, branch, base revision, dirty change set,
passing verification, and independent review closure. This report prepares the
commit only: no file is staged and no commit, push, pull request, merge, release,
or deployment action is authorized or performed.

## Repository and proposed commit

- Repository: `D:\gno-node-projects\gno-shared-components-v2`.
- Branch: `feature/portal-header`.
- Current HEAD/base: `0b2561575b68f1e89ea9cf16fdaaa7e039670296`.
- Candidate: the reviewed unstaged/untracked Portal Header delivery plus this
  commit-preparation record and its state/WBS status updates.
- Proposed commit message: `feat: add GNO-21354 portal header`.
- Approval status: **APPROVED by PH-A23**; Orion must revalidate and execute only
  the exact path-scoped commit described here.

## Gate evidence

| Gate | Evidence | Status |
| --- | --- | --- |
| Requirements and development | PH-A10-PH-A19 approve the requirements, revisions, implementation, stories, catalog, tests, documentation, and visual corrections | PASS |
| Accepted delivery qualifications | PH-A20 records PH-MT03 as N/A/waived rather than PASS; PH-A21 accepts configured Chromium plus installed Windows Chrome/Edge and defers Firefox, Safari, and second-version coverage | PASS with recorded residual risk |
| Automated and manual verification | Report 10j records `npm run check` PASS, 26/26 configured Playwright cases, package dry run PASS, and 7 PASS / 0 FAIL / 0 BLOCKED / 1 N/A manual totals | PASS for the then-current candidate |
| Review adjustments | PH-A22 authorizes ARG-PH-01 through ARG-PH-03 corrections; report 12a implements them | PASS |
| Adjustment revalidation | Report 12b records focused Playwright 2/2, `npm run check`, 28/28 configured Playwright, package dry run, logo integrity, built-CSS inspection, unused-token scan, and `git diff --check` | PASS |
| Independent review | Report 13 closes ARG-PH-01 through ARG-PH-03 with no required or optional finding remaining | CLOSED; proceed to commit preparation |
| Current revision/scope check | Actual branch and HEAD match the reviewed base; the worktree remains unstaged; `git diff --check` exits 0 with only line-ending notices | PASS |

The operations-only additions in this report and the corresponding state/WBS
updates do not alter the reviewed application, package, test, or acceptance
behavior.

## Exact proposed file scope

The commit contains exactly these **66 files**:

### Root manifests and release record

- `CHANGELOG.md`
- `package-lock.json`
- `package.json`

### Catalog application and consumer documentation

- `app/catalog/page.tsx`
- `app/catalog/portal-header-preview.tsx`
- `app/globals.css`
- `app/page.tsx`
- `docs/consumer-setup.md`
- `docs/portal-header-migration.md`

### Publishable package

- `packages/ui/package.json`
- `packages/ui/README.md`
- `packages/ui/THIRD_PARTY_NOTICES.md`
- `packages/ui/scripts/copy-styles.mjs`
- `packages/ui/src/assets/gma-header-logo.svg`
- `packages/ui/src/components/portal-header/icons.tsx`
- `packages/ui/src/components/portal-header/index.ts`
- `packages/ui/src/components/portal-header/logo.ts`
- `packages/ui/src/components/portal-header/navigation-links.ts`
- `packages/ui/src/components/portal-header/portal-header.stories.tsx`
- `packages/ui/src/components/portal-header/portal-header.test.tsx`
- `packages/ui/src/components/portal-header/portal-header.tsx`
- `packages/ui/src/components/portal-header/social-links.ts`
- `packages/ui/src/components/portal-header/types.ts`
- `packages/ui/src/index.ts`
- `packages/ui/src/styles.css`

### Test tooling and fixtures

- `scripts/check-consumer-fixtures.mjs`
- `tests/consumers/portal-header-javascript/main.jsx`
- `tests/consumers/portal-header-typescript/main.tsx`
- `tests/e2e/showcase.spec.ts`

### Portal Header specification and lifecycle evidence

- `specs/2026/portal-header/acceptance_criteria.md`
- `specs/2026/portal-header/approvals.md`
- `specs/2026/portal-header/asset_inventory.md`
- `specs/2026/portal-header/design.md`
- `specs/2026/portal-header/initial_setup.md`
- `specs/2026/portal-header/manual_testing.md`
- `specs/2026/portal-header/nonfunctional_requirements.md`
- `specs/2026/portal-header/reference_analysis.md`
- `specs/2026/portal-header/repositories.md`
- `specs/2026/portal-header/requirements.md`
- `specs/2026/portal-header/specification.md`
- `specs/2026/portal-header/state.md`
- `specs/2026/portal-header/test_plan.md`
- `specs/2026/portal-header/wbs.md`
- `specs/2026/portal-header/execution/05_development_report_2026-10-21.md`
- `specs/2026/portal-header/execution/06_verification_report_2026-10-21.md`
- `specs/2026/portal-header/execution/06a_pre_review_correction_implementation_2026-10-21.md`
- `specs/2026/portal-header/execution/06b_correction_revalidation_2026-10-21.md`
- `specs/2026/portal-header/execution/07_production_visual_alignment_implementation_2026-10-21.md`
- `specs/2026/portal-header/execution/09_navigation_completeness_implementation_2026-10-21.md`
- `specs/2026/portal-header/execution/10_navigation_correction_verification_2026-10-21.md`
- `specs/2026/portal-header/execution/10a_logo_label_alignment_implementation_2026-10-21.md`
- `specs/2026/portal-header/execution/10b_logo_label_alignment_revalidation_2026-10-21.md`
- `specs/2026/portal-header/execution/10c_ph_mt02_keyboard_verification_2026-10-21.md`
- `specs/2026/portal-header/execution/10d_ph_vf03_focus_correction_implementation_2026-10-21.md`
- `specs/2026/portal-header/execution/10e_ph_vf03_correction_revalidation_2026-10-21.md`
- `specs/2026/portal-header/execution/10f_remaining_manual_verification_2026-10-22.md`
- `specs/2026/portal-header/execution/10g_owner_qa_waiver_2026-10-22.md`
- `specs/2026/portal-header/execution/10h_installed_browser_verification_2026-10-22.md`
- `specs/2026/portal-header/execution/10i_compatibility_scope_revision_2026-10-22.md`
- `specs/2026/portal-header/execution/10j_scope_closure_verification_2026-10-22.md`
- `specs/2026/portal-header/execution/11_independent_code_review_2026-10-22.md`
- `specs/2026/portal-header/execution/12_review_adjustment_plan_2026-10-22.md`
- `specs/2026/portal-header/execution/12a_review_adjustment_implementation_2026-10-22.md`
- `specs/2026/portal-header/execution/12b_review_adjustment_revalidation_2026-10-22.md`
- `specs/2026/portal-header/execution/13_independent_review_closure_2026-10-22.md`
- `specs/2026/portal-header/execution/14_commit_preparation_2026-10-22.md`

## Explicit exclusions

- `.playwright-mcp/`: user/runtime browser artifacts; untracked and unrelated to
  the publishable Portal Header delivery.
- `specs/2026/public-storybook-documentation/`: separate untracked project and
  not part of the approved Portal Header scope.
- Any file not named in the 66-file list above, including generated `dist/`,
  `.next/`, Storybook build output, Playwright output, and dependency folders.

These exclusions require explicit path staging. `git add --all`, broad globs,
and directory-wide staging are not approved staging strategies.

## Residual risks and later gates

- PH-MT03 real screen-reader execution was not performed and remains N/A/waived
  under PH-A20 with accepted accessibility risk.
- Firefox, native Safari, and second browser versions remain deferred under
  PH-A21; delivery evidence covers configured Chromium and installed Windows
  Chrome `155.0.8059.85` and Edge `155.0.4283.62`.
- PH-AC19 remains a later exact-release-revision GitHub Actions/tag gate; it is
  not evidence for this commit.
- A commit approval will authorize only staging the listed files and creating
  the proposed commit. It will not authorize push, PR creation, merge, tagging,
  release publication, or deployment.

## Exact next commands after explicit commit approval

Orion must first reverify that branch, HEAD, and file scope are unchanged. If
they are unchanged, run these exact path-scoped staging commands:

```powershell
git add -- CHANGELOG.md package-lock.json package.json app/catalog/page.tsx app/catalog/portal-header-preview.tsx app/globals.css app/page.tsx docs/consumer-setup.md docs/portal-header-migration.md
git add -- packages/ui/package.json packages/ui/README.md packages/ui/THIRD_PARTY_NOTICES.md packages/ui/scripts/copy-styles.mjs packages/ui/src/assets/gma-header-logo.svg packages/ui/src/components/portal-header/icons.tsx packages/ui/src/components/portal-header/index.ts packages/ui/src/components/portal-header/logo.ts packages/ui/src/components/portal-header/navigation-links.ts packages/ui/src/components/portal-header/portal-header.stories.tsx packages/ui/src/components/portal-header/portal-header.test.tsx packages/ui/src/components/portal-header/portal-header.tsx packages/ui/src/components/portal-header/social-links.ts packages/ui/src/components/portal-header/types.ts packages/ui/src/index.ts packages/ui/src/styles.css
git add -- scripts/check-consumer-fixtures.mjs tests/consumers/portal-header-javascript/main.jsx tests/consumers/portal-header-typescript/main.tsx tests/e2e/showcase.spec.ts
git add -- specs/2026/portal-header/acceptance_criteria.md specs/2026/portal-header/approvals.md specs/2026/portal-header/asset_inventory.md specs/2026/portal-header/design.md specs/2026/portal-header/initial_setup.md specs/2026/portal-header/manual_testing.md specs/2026/portal-header/nonfunctional_requirements.md specs/2026/portal-header/reference_analysis.md specs/2026/portal-header/repositories.md specs/2026/portal-header/requirements.md specs/2026/portal-header/specification.md specs/2026/portal-header/state.md specs/2026/portal-header/test_plan.md specs/2026/portal-header/wbs.md
git add -- specs/2026/portal-header/execution/05_development_report_2026-10-21.md specs/2026/portal-header/execution/06_verification_report_2026-10-21.md specs/2026/portal-header/execution/06a_pre_review_correction_implementation_2026-10-21.md specs/2026/portal-header/execution/06b_correction_revalidation_2026-10-21.md specs/2026/portal-header/execution/07_production_visual_alignment_implementation_2026-10-21.md specs/2026/portal-header/execution/09_navigation_completeness_implementation_2026-10-21.md specs/2026/portal-header/execution/10_navigation_correction_verification_2026-10-21.md specs/2026/portal-header/execution/10a_logo_label_alignment_implementation_2026-10-21.md specs/2026/portal-header/execution/10b_logo_label_alignment_revalidation_2026-10-21.md specs/2026/portal-header/execution/10c_ph_mt02_keyboard_verification_2026-10-21.md specs/2026/portal-header/execution/10d_ph_vf03_focus_correction_implementation_2026-10-21.md specs/2026/portal-header/execution/10e_ph_vf03_correction_revalidation_2026-10-21.md specs/2026/portal-header/execution/10f_remaining_manual_verification_2026-10-22.md specs/2026/portal-header/execution/10g_owner_qa_waiver_2026-10-22.md specs/2026/portal-header/execution/10h_installed_browser_verification_2026-10-22.md specs/2026/portal-header/execution/10i_compatibility_scope_revision_2026-10-22.md specs/2026/portal-header/execution/10j_scope_closure_verification_2026-10-22.md specs/2026/portal-header/execution/11_independent_code_review_2026-10-22.md specs/2026/portal-header/execution/12_review_adjustment_plan_2026-10-22.md specs/2026/portal-header/execution/12a_review_adjustment_implementation_2026-10-22.md specs/2026/portal-header/execution/12b_review_adjustment_revalidation_2026-10-22.md specs/2026/portal-header/execution/13_independent_review_closure_2026-10-22.md specs/2026/portal-header/execution/14_commit_preparation_2026-10-22.md
git diff --cached --name-status
git diff --cached --check
git commit -m "feat: add GNO-21354 portal header"
```

Before the commit command, Orion must confirm that the staged inventory is the
same 66-file list and that both excluded paths remain unstaged. After a
successful commit, Orion records the resulting hash and prepares a separate
push summary; no push occurs without a new explicit approval.
