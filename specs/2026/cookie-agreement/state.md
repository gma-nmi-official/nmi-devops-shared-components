# Current state: Cookie Agreement

- Objective: standalone reusable Cookie Agreement component plan, independently imported and rendered from Portal Header.
- Phase/stage: Review-adjustment implementation and verification for PR #6 findings.
- Owner: Forge; Atlas coordinates privacy, verification, and review handoffs.
- Last updated: 2026-10-29 Asia/Shanghai.
- Approval: `approvals.md`; CA-A01-CA-A24 record the planning, development, and review-adjustment decisions. Commit, push, PR, release, and deployment remain separately gated.
- Blockers: consumer cookie/service inventory and Accept scope; NPC seal redistribution rights and final repository path; compatibility; privacy/legal acceptance before release. Persistent rejected policy is deferred. GA is explicitly outside this project.
- Next action: Vera validates CR-001/CR-002/CR-003/CR-005/CR-006/CR-007 corrections. Commit, push, PR, release, and deployment remain separately gated.

## Baseline

| Repository | Branch/HEAD | Dirty evidence | Adoption |
| --- | --- | --- | --- |
| `D:\gno-node-projects\gno-shared-components-v2` | `feature/cookie-agreement-review-adjustments` / current correction revision; base `origin/master` | Review-adjustment source changes in progress; unrelated `.playwright-mcp/` remains untracked and protected | CR-001/CR-002/CR-003/CR-005/CR-006/CR-007 corrections implemented locally; verification pending |

## Proposed stages

| Stage | Owner | Artifact | Status |
| --- | --- | --- | --- |
| Cookie-only production reference extraction | Athena | `reference_analysis.md`, `design.md` | Refreshed 2026-10-23; complete for planning |
| Repository adoption refresh | Athena | `initial_setup.md` and current repository evidence | Identity refreshed; readiness checks required before development approval |
| Privacy requirements/design | Athena/privacy/product | Requirements, criteria, design, NFR, WBS, test plan | Draft; approvals pending |
| CA-01-CA-06 | Forge/Vera/Argus/owners/Orion | Component, Storybook, catalog, package docs, changelog, tests, and manual QA evidence | Original implementation complete; review adjustments in progress |

Portal Header is a separate project at `../portal-header/state.md`. The components have no import, rendering, styling, lifecycle, or runtime-state dependency. Cookie Agreement is also documented in `/catalog` with a no-op preview store so catalog browsing never persists a real consent cookie.
