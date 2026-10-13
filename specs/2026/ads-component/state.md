# Current state: Ads component

- Objective: specify a reusable MREC and leaderboard ads component using the read-only `news` repository as behavior evidence.
- Stage: Inception / repository-reference analysis and requirements draft.
- Primary role: Athena; Atlas coordinates approvals.
- Last updated: 2026-10-13 Asia/Shanghai.
- Repository baseline: shared components `master` / `c580e40819842932fe9430cefddca92bf6525867`; news reference `feature/api-connectivity-checker` / `16c98484aeecdec2ba4552e5f5f834d029d7a7b4`.
- Worktree status: shared Git status could not be read through the available shell bridge; preserve existing changes. The news repository was read-only and not modified.
- Approval: ADS-A01 authorizes reference review and specification creation only.
- Findings: news uses GPT/GAM for responsive leaderboard and some MREC slots, plus a separate AllAccess zone script for certain MREC views. Unit IDs, sizes, targeting, and GPT bootstrap are consumer/site-specific.
- Blockers: provider scope (GPT/GAM vs AllAccess), final MREC size mapping, GPT loader owner, targeting/consent policy, no-fill/collapse behavior, exact browser matrix, formal requirements approval, and development approval.
- Next action: review the provider/sizing/privacy questions in `requirements.md` with product, monetization, privacy, and architecture owners before requirements approval.

## Artifact status

| Artifact | Status |
| --- | --- |
| Repository/reference analysis and initial setup | Complete for planning |
| Specification, user stories, requirements, acceptance criteria, design, NFRs, WBS, test plan, consumer guide | Draft |
| Implementation, verification, review, release | Not authorized |
