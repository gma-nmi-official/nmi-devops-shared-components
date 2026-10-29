# Current state: Google Analytics

- Objective: configurable standalone GA4 service with a direct-gtag runtime measurement ID or consumer-owned GTM destination, plus required page, click, search, `loaded_a_video`, `played_a_video`, and generic events. The legacy `news` file is algorithm reference material only.
- Phase/stage: Review-adjustment implementation complete; verification and independent review pending.
- Primary role: Atlas; Orion remains gated for Git delivery.
- Last updated: 2026-10-29 Asia/Shanghai.
- Approval: `approvals.md`; GA-A10 approves requirements and GA-A11 approves implementation of DU-1-DU-5, the verification/manual-QA plan, proposed `1.4.0` minor release candidate, and 16 KiB analytics-module budget. Commit, push, PR, merge, tag, release, deployment, and independent review remain unapproved.
- Blockers: none for validation; commit, push, PR, merge, tag, and release actions remain separately gated. Argus final confirmation report 18 resolved GA-SIZE02; raw runtime analytics output passes at 16,380 bytes against the approved 16,384-byte budget, including `types.js`.
- Follow-up branch: `feature/google-analytics-review-adjustments`, based on
  `master` `ccce578`; CR-001–CR-013 implementation is complete in the working
  tree. Focused/full tests, typecheck, consumer fixtures, gzip size gate,
  docs, targeted lint, and diff checks pass. Storybook/Next and independent
  review remain pending.
- Next action: complete remaining verification, then hand the corrected diff to
  Argus. Commit, push, PR, merge, tag, and release remain separately gated.

## Repository baseline

| Repository | Branch/HEAD | Dirty evidence | Scope |
| --- | --- | --- | --- |
| Shared components | `feature/google-analytics` / `43dd02552014506b81600783cb0dcff3ab9d8791`; base `master` / `e8132b6f227a8453dc07abf0d06710b876770805` | Google Analytics specification corrections, `user_stories.md`, and requirements approval package plus unrelated untracked `.playwright-mcp/`; branch is `0` behind and `2` commits ahead of `origin/master`, and HEAD matches `origin/feature/google-analytics` | Writable planning target; no implementation authorized |
| News | `hotfix/GNO-21329` / `28d3312872ac7dee53215939faeeda50b0d37e87` | Untracked `.codex/` and `AGENTS.md`; relevant reference files have no diff from recorded revision `16c98484aeecdec2ba4552e5f5f834d029d7a7b4` | Read-only algorithm reference; no integration target |

## Proposed stages

| Stage | Artifact | Status |
| --- | --- | --- |
| Reference/adoption review | `reference_analysis.md`, `repositories.md`, `initial_setup.md` | Complete for planning |
| Requirements/design | Specification, user stories, requirements, criteria, design, NFRs, WBS, test plan | Approved by GA-A10; validation statuses remain pending implementation |
| Consumer setup | `consumer_setup.md` for direct-gtag and GTM package consumers | Approved contract; implementation/release examples remain prospective |
| Requirements approval | `execution/01_requirements_approval_package_2026-10-26.md` | Approved by GA-A10 |
| Development planning | `execution/02_implementation_plan_2026-10-26.md` | Approved by GA-A11 |
| Construction | DU-1-DU-5 source/tests/docs/release candidate | Complete; source-size correction validated at 16,380 bytes / 16,384-byte limit including all 7 runtime files; Argus report 18 PASS |
| GA-01-GA-06 | Verification, manual QA, independent review, and operations evidence | Automated checks and independent review PASS; manual QA pending |

Portal Header and Cookie Agreement remain separate components. No source code, production configuration, external service, or consumer repository was changed in this planning scope.
