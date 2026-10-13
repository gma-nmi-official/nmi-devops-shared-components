# Current state: Cookie Agreement

- Objective: standalone reusable Cookie Agreement component plan, independently imported and rendered from Portal Header.
- Phase/stage: Inception / privacy requirements and design draft.
- Owner: Athena; Atlas coordinates product/privacy approval.
- Last updated: 2026-10-12 Asia/Shanghai.
- Approval: `approvals.md`; CA-A01-CA-A04 authorize planning and scope decisions only.
- Blockers: consent model, copy/actions, policy/record/storage/revocation, category/service mapping, repository asset inventory and rights, compatibility, CI owner, privacy/legal and requirements/development approvals. GA is explicitly outside this project.
- Next action: privacy/product owners resolve `requirements.md` decisions and approve/revise requirements.

## Baseline

| Repository | Branch/HEAD | Dirty evidence | Adoption |
| --- | --- | --- | --- |
| `D:\gno-node-projects\gno-shared-components-v2` | `master` / `c580e40819842932fe9430cefddca92bf6525867` | Existing reviewed foundation candidate plus separate planning scopes; Cookie Agreement files are unapproved for commit | `../gno-shared-components-v2-adoption/adoption.md`; refreshed in `initial_setup.md` |

## Proposed stages

| Stage | Owner | Artifact | Status |
| --- | --- | --- | --- |
| Reference/adoption refresh | Athena | `reference_analysis.md`, `initial_setup.md` | Complete for planning |
| Privacy requirements/design | Athena/privacy/product | Requirements, criteria, design, NFR, WBS, test plan | Draft; approvals pending |
| CA-01-CA-06 | Forge/Vera/Argus/owners/Orion | Future execution evidence | Not authorized |

Portal Header is a separate project at `../portal-header/state.md`. The components have no import, rendering, styling, lifecycle, or runtime-state dependency. No source code or external system changed in this planning scope.
