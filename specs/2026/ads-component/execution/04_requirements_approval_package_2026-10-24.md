# Execution report 04: Requirements approval package

## Executive summary

The ads-component requirements are ready for user review. ADS-A03 already confirms that consumers provide the full unit path and complete non-empty size list for every active responsive rule. This package consolidates the remaining recommended decisions into one reviewable first-release boundary. No implementation is authorized by this document.

## Workflow context

- Project: Ads component.
- Stage: Requirements review.
- Primary role: Atlas coordinating Athena requirements/design artifacts.
- Repository baseline: `feature/ads-component` / `a546c6858312b4d3a168009efad37da276afe9b1` plus the planning worktree recorded in `state.md`.
- Required gate: explicit requirements approval before final development-plan approval.

## Previous stage summary

Reports 02 and 03 refreshed the repository/reference analysis, established one canonical configurable slot model, and confirmed consumer ownership of all active-rule sizes.

## Current stage objective

Present the exact remaining scope and behavior decisions, their rationale, alternatives, acceptance impact, and recommended approval statement.

## Review artifacts

- `specification.md`
- `requirements.md` (ADS-R01–ADS-R12)
- `acceptance_criteria.md` (ADS-AC01–ADS-AC18)
- `nonfunctional_requirements.md` (ADS-NFR01–ADS-NFR08)
- `design.md`
- `consumer_setup.md`
- `test_plan.md`
- `wbs.md`

## Confirmed requirement

ADS-A03: every active responsive rule requires a consumer-provided full provider unit path and complete non-empty size list. Semantic formats never inject sizes. Explicit disabled rules omit both.

## Recommended remaining decisions

| Decision | Recommended first-release requirement | Alternative and tradeoff |
| --- | --- | --- |
| Provider | GPT/GAM adapter only | AllAccess would require a separate script/security/lifecycle contract and delays the standard-slot delivery |
| Supported formats | Semantic `mrec`, `leaderboard`, and `custom` standard rectangular display | MREC/leaderboard only is narrower but forces package changes for footer or other rectangular placements |
| Provider ownership | Consumer loads/configures GPT once; package receives an initialized provider and owns only each component's slot/listeners | Package loading GPT risks duplicate services and consumer consent/configuration conflicts |
| Eligibility/targeting | Required consumer `enabled` input; false makes no provider call; all targeting is consumer-provided and validated structurally | Inferring consent or targeting inside the package creates privacy/policy coupling |
| Empty behavior | Default to `reserve`; allow explicit `collapse`; loading placeholder is optional consumer React content and clears on filled/empty/error | Default collapse saves space but can cause layout shift; permanent reserve may leave blank space |
| Other ad types | Exclude AllAccess, native, video/IMA, interstitial, out-of-page, pushdown, skinning, refresh scheduling, and article insertion policy | Combining these now would hide different provider/UX lifecycles behind one unsafe contract |
| Compatibility | Next.js 16.4.2, React 19.2.8, SSR, React Strict Mode; automated Chromium desktop/mobile at repository Playwright viewports | Broader browser guarantees require added browser projects and owner-approved QA capacity |
| Performance | No request while disabled/server-rendered; one live provider handle per instance; resize work debounced at 100 ms; no duplicate request for an unchanged rule signature; compiled ads module target at most 20 KiB uncompressed excluding React and GPT | Different numeric thresholds require product/architecture input and corresponding test/build instrumentation |

## Acceptance impact

Approval makes the following behavior normative:

- active configurations without sizes or unit paths fail validation;
- package code contains no production inventory, ad-size defaults, script URLs, consent-store access, or GNO targeting policy;
- provider operations happen only after client mount and explicit eligibility;
- responsive signature changes destroy the owned slot before replacement;
- Strict Mode and stale queued work cannot leak or duplicate a slot;
- Storybook, unit, and browser fixtures use a fake provider and make no live ad-network requests;
- component, story, catalog, consumer documentation, tests, manual QA, and changelog ship in the same delivery unit.

## Delivery sequence after requirements approval

1. Refresh design/WBS wording with any approved deviations and present the exact development plan for separate approval.
2. Resolve the branch synchronization approach before source changes; refresh revision evidence afterward.
3. Forge implements the approved units using the JavaScript-framework guidance and installed Next.js documentation.
4. Vera verifies automated and manual acceptance evidence.
5. Argus or a human independent reviewer reviews the tested change set.
6. Any corrections require review-adjustment approval and revalidation.
7. Commit, push, PR, merge, and release remain separate later approvals.

## Risks

- The proposed 20 KiB module budget is a planning target and needs build measurement once files exist.
- Automated browser coverage remains Chromium-only unless broader coverage is approved.
- Consumer-provided sizes can be structurally valid but incompatible with provisioned GAM inventory; staging QA remains consumer/ad-operations owned.
- The branch is currently behind `origin/master`; evidence affected by synchronization must be refreshed before development.

## Recommendation

Approve ADS-R01–ADS-R12, ADS-AC01–ADS-AC18, ADS-NFR01–ADS-NFR08, ADS-A03, and the recommended remaining decisions above as the first-release requirements baseline. Treat reference dimensions as examples only.

## Approval status

Pending explicit user decision. “Proceed” authorized preparation of this package but is not recorded as requirements approval.

## Next stage

After explicit requirements approval, Athena finalizes the delivery-unit implementation/test plan and Atlas presents it for separate development approval.
