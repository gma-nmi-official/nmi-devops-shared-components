# Orion post-merge release handoff

## Context and objective

- Project: `gno-shared-components-v2` foundation and GitHub package release setup.
- Objective: after an owner-confirmed PR merge to `master`, have Orion begin release readiness and prepare the tag-push action while preserving all existing approvals.
- References: `AGENTS.md`, `.codex/workflows/lifecycle.md`, `.codex/agents/orion.toml`, `.agents/skills/release-operations/SKILL.md`, `docs/versioning.md`, `manual_testing.md`.
- Repository / branch: `D:\gno-node-projects\gno-shared-components-v2`, `feature/foundation-package-rename`.
- Base revision: `eb7a73e52f0c4010c1decab37951752ef6f950cc`; working tree already contained the GitHub release workflow/documentation changes from the prior approved scope.
- User decision: A-015 in `../approvals.md` authorizes this local workflow update only.

## Decision and change

After the user or authorized repository owner confirms a PR merged to `master`, Orion begins release readiness without another reminder. Orion checks that the reviewed revision is on `master`, required checks passed, root and publishable package versions match, and the changelog entry is present. Missing preparation returns as a blocker and must be completed through a reviewed PR.

For a ready release, Orion presents the annotated tag, exact target commit, remote, command, and the fact that pushing the tag triggers the GitHub Actions workflow to create a release and upload the tarball. Orion waits for explicit approval of that concrete tag push, then verifies the workflow and release asset. Orion does not perform the final PR merge, and a merge does not itself authorize tag publication.

## Changed files

- `.codex/agents/orion.toml`
- `.agents/skills/release-operations/SKILL.md`
- `.codex/workflows/lifecycle.md`
- `docs/versioning.md`
- `CONTRIBUTING.md`
- `README.md`
- `CHANGELOG.md`
- `specs/2026/gno-shared-components-v2-foundation/approvals.md`
- `specs/2026/gno-shared-components-v2-foundation/state.md`
- `manual_testing.md`

No package API, package version, release tag, GitHub Release, commit, or remote branch was changed by this unit. No `VERSION` file exists; the npm package versions are unchanged because this updates the repository workflow rather than the published package surface.

## Validation and risks

- `npm run check`: PASS on Node.js `v26.10.0` / npm `11.19.1`; typecheck, lint, package tests (no test files found), package build, Storybook build, and Next.js production build completed successfully. Storybook reported its expected empty story pattern and a non-blocking large-chunk warning.
- `git diff --check`: PASS.
- Orion/lifecycle guidance: inspected for consistent owner-operated merge, post-merge checks, version/changelog readiness, explicit tag-push approval, and post-push release verification.
- TOML parser: unavailable in the local environment; Orion TOML was inspected for valid multiline string boundaries and instruction placement.
- Manual QA: MT-REL-004 and MT-REL-005 in root `manual_testing.md` are BLOCKED pending a live post-merge release handoff; no tag was pushed in this unit.
- Risk: the handoff depends on Orion receiving or verifying an owner-confirmed merge event; it does not provide background monitoring. The tag-triggered GitHub workflow still needs a real approved tag run.

## Approval and next stage

- Workflow-change approval: A-015.
- Commit/push/merge/release approval: not granted by this workflow-change request.
- Independent review: Argus reviewed the candidate at base `135b6458e7fc024490a3a45e99a21b44b3eb376e` and returned BLOCKED with two Minor documentation findings.
- Review adjustment approval: A-016. The two approved corrections restore the dated Bitbucket fact and add base revision `135b6458e7fc024490a3a45e99a21b44b3eb376e` to A-014/A-015.
- Validation after corrections: `git diff --check` and focused factual/approval-record inspection PASS; full application checks remain PASS from the unchanged implementation revision.
- Argus re-review: PASS; both approved Minor findings are closed, with no remaining required findings. The optional recommendation to guard release tags against non-`master` commits remains outside this approved scope.
- Next: prepare the exact commit summary. Push requires its concrete post-commit approval.
