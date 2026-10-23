# Current state: Public Storybook documentation

- Workflow release: repository-local GNO workflow at baseline `0b256157`.
- Objective and agreed endpoint: revamp Storybook into friendly interactive documentation for every public component and package release at `/docs`, keep `/catalog` as the package documentation guide, and provide a simple landing page at `/`.
- Current phase / stage / delivery unit: Verification / SB-01 through SB-04 / automated verification complete, independent review pending.
- Owner: Atlas coordinating the development gate after Athena's completed requirements/design work.
- Last updated: 2026-10-22 Asia/Shanghai.
- Active requirements/design version: requirements v1 plus `/docs` and catalog/landing amendments approved; design/development plan v3 proposed.
- Approval log: `approvals.md`; SB-A01, SB-A02, SB-A03, and SB-A04 approved from the user's clarified directions, “Please continue”, and “Approved.”
- Blockers: none for the implementation scope; independent review and commit approval remain required.
- Next concrete action: independent Argus review of the local change set, followed by separate commit approval if review passes.

## Repository baseline and current evidence

| Repository / absolute path | Branch / base | HEAD | Dirty diff evidence | Adoption record / freshness check |
| --- | --- | --- | --- | --- |
| NMI DevOps Shared Components / `D:\gno-node-projects\gno-shared-components-v2` | `feature/portal-header` / merged base represented by current HEAD | `0b2561575b68f1e89ea9cf16fdaaa7e039670296` | 25 tracked files changed and 11 untracked paths before this project's planning docs; all are protected. Storybook config/workflow files were clean; Portal Header story was untracked. GitHub repository target is now `gma-nmi-official/nmi-devops-shared-components`; local `origin` still reports the former URL. | Existing adoption checked against package/config/workflows; `initial_setup.md` records the 2026-10-22 refresh. |

## Proposed execution plan

| Stage / unit | Required / combined / N/A | Depth and rationale | Owner | Artifact / evidence | Status |
| --- | --- | --- | --- | --- | --- |
| Adoption refresh | Combined with inception | Existing adoption refreshed for Storybook, CI, Next.js routing/build behavior, and deployed-documentation exposure | Athena | `initial_setup.md`, `repositories.md` | Complete for planning |
| Requirements | Required | Deployed documentation changes the information-exposure boundary | Athena/Atlas | Specification, requirements, criteria, NFRs | Approved SB-A01 |
| Design/development plan | Required | Defines content architecture, same-build integration, routing, safeguards, and delivery units | Athena/Atlas | Design, WBS, test plan | Ready; pending SB-A02 |
| SB-01-SB-04 implementation | Required | Reviewable documentation, safeguard, and production-build units | Forge | `implementation.md` | Complete; verification handoff |
| Verification | Required | Build, accessibility, public-output, browser, workflow, and regression evidence | Vera/human QA | `manual_testing.md`, command evidence | Ready for independent QA |
| Independent review | Required | Deployed content and production-build integration require independent review | Argus | Future review report | Pending passing verification |
| Git delivery and launch | Separately gated | Commit, push, PR, owner merge, and application deployment are distinct actions | Orion/owner | Future summaries and launch evidence | Pending |

Full inception documents are used because this work creates a deployed documentation boundary. Construction may use compact per-unit execution reports if SB-A02 approves that choice. Deployment remains a separate operational decision.

## Resume check

Before implementation, recheck branch, HEAD, worktree, Portal Header state, installed Storybook/Next.js versions, relevant local framework docs, approvals, and the renamed GitHub target. Do not treat the planning-doc additions as ownership of the existing dirty candidate.

## Handoff and open decisions

The revised recommendation generates curated Storybook MDX, complete component documentation, and changelog-based release history into ignored static output under `public/docs/` before Next.js development/production startup. The application exposes interactive docs at `/docs`, package guidance at `/catalog`, and a simple landing page at `/`; the standalone port-6006 workflow is removed. There is no separate Pages site and no package-publication change. The authorized owner performs the final PR merge; no source or external configuration changes are authorized by these drafts.
