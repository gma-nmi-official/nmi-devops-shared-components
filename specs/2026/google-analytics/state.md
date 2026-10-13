# Current state: Google Analytics

- Objective: configurable standalone GA4 service with a direct-gtag runtime measurement ID or consumer-owned GTM destination, plus required page, click, search, `loaded_a_video`, `played_a_video`, and generic events. The legacy `news` file is algorithm reference material only.
- Phase/stage: Inception / reference analysis and requirements/design draft.
- Primary role: Athena; Atlas coordinates approvals.
- Last updated: 2026-10-13 Asia/Shanghai.
- Approval: `approvals.md`; GA-A01-GA-A07 authorize specification planning, optimized API/current-parameter behavior, runtime consumer destination configuration, reference-only use of `news`, empty-string payload values, default/additional dimensions, configurable scroll behavior, consumer-owned direct-gtag or GTM loading, bounded unknown-consent queue behavior, explicit page views, consumer event fields/extensions, and Next.js/package/browser fixtures.
- Blockers: proposed GTM envelope and callback mapping need requirements/design review; exact browser support matrix; final public API/configuration names; privacy/data-schema review; formal requirements approval; and development approval.
- Next action: review the proposed GTM dataLayer envelope/callback mapping, finalize the browser matrix and privacy/data-schema details, then obtain formal requirements approval before development planning.

## Repository baseline

| Repository | Branch/HEAD | Dirty evidence | Scope |
| --- | --- | --- | --- |
| Shared components | `master` / `c580e40819842932fe9430cefddca92bf6525867` | Existing reviewed foundation candidate and separate uncommitted specifications | Writable planning target; no implementation authorized |
| News | `feature/api-connectivity-checker` / `16c98484aeecdec2ba4552e5f5f834d029d7a7b4` | Untracked `.codex/` and `AGENTS.md` | Read-only algorithm reference; no integration target |

## Proposed stages

| Stage | Artifact | Status |
| --- | --- | --- |
| Reference/adoption review | `reference_analysis.md`, `repositories.md`, `initial_setup.md` | Complete for planning |
| Requirements/design | Specification, requirements, criteria, design, NFRs, WBS, test plan | Draft; user decisions recorded, formal requirements and development approvals pending |
| Consumer setup | `consumer_setup.md` for generic package consumers with runtime GA4-ID configuration | Draft; proposed API names and browser matrix clearly marked |
| GA-01-GA-06 | Future source, test, review, and operations evidence | Not authorized |

Portal Header and Cookie Agreement remain separate components. No source code, production configuration, external service, or consumer repository was changed in this planning scope.
