# Execution report 01: Ad reference analysis

## Executive summary

Reviewed the registered `news` repository and its local instructions. The reference has responsive GPT/GAM leaderboard slots, GPT/GAM MREC slots, and a separate legacy AllAccess MREC zone script. Created a separate `ads-component` specification draft for a configurable MREC/leaderboard `AdSlot`; provider scope and several business contracts remain open.

## Workflow context

- Project: Ads component, `specs/2026/ads-component/`.
- Stage: Repository/reference analysis and requirements draft.
- Primary role: Athena.
- Target repository: `D:\gno-node-projects\gno-shared-components-v2`, `master`, base `c580e40819842932fe9430cefddca92bf6525867`.
- Reference repository: `C:\laragon\www\news`, `feature/api-connectivity-checker`, `16c98484aeecdec2ba4552e5f5f834d029d7a7b4`; read-only.

## Previous stage summary

No prior ads-component artifacts existed. The existing Google Analytics specifications were consulted only for shared workspace context and are a separate component project.

## Current stage objective

Inspect repository instructions, ad loading/runtime patterns, MREC and leaderboard sizes, and package readiness; turn verified facts into a reviewable specification without implementing source.

## Documents and files referenced

- Workspace `AGENTS.md`, lifecycle, repository registry, and `packages/ui/package.json` / root `package.json`.
- `news/AGENTS.md`.
- `news/res/js/ads/ads_leaderboard.js`, `footer_leaderboard_main.js`, `res/js/third_party/dfp.js`, `res/js/common_screen_sizes.js`, `res/js/gnoadscript.js`.
- `news/application/views/ads/ads_view.php`, `mrect_ads_view.php`, `mrect_ads_story_mobile.php`, `footer_leaderboard_main.php`, `third_party/dfp.php`, and page component ad registry/global files.

## Execution details

- Confirmed shared workspace package is React/TypeScript/Next.js with Storybook, Vitest, and Playwright; no public component exports exist yet.
- Confirmed `news` uses GPT/GAM service initialization and `loadAd` slot creation, responsive leaderboard unit/size selection, MREC sizing globals, per-slot targeting, and a separate AllAccess MREC view.
- Created linked initial setup, reference analysis, specification, requirements, user stories, acceptance criteria, design, NFRs, test plan, WBS, consumer setup, approval log, state, and this execution report.
- No source, package config, Storybook, consumer integration, or live ad network request was changed or executed.

## Findings and risks

- Provider is unresolved because MREC references show both GPT/GAM and AllAccess delivery.
- MREC size contract differs between the GPT global size map and AllAccess wrapper.
- GPT bootstrap, inventory paths, targeting, privacy/consent, lazy loading, and no-fill behavior require consumer/business ownership decisions.
- Shared Git status could not be inspected via the available shell bridge; existing working-tree changes must be preserved.

## Recommendation

Proceed with requirements review for a single configurable `AdSlot`, MREC and leaderboard presets, and a consumer-owned GPT/GAM adapter as the first-release recommendation. Keep AllAccess support as an explicit open decision. Approve provider, sizing, privacy, and empty-slot contracts before development planning is finalized.

## Approval status

ADS-A01 approves specifications/reference review only. Requirements and development approval remain pending.

## Next stage

Requirements review with product, monetization/ad-operations, privacy, and architecture owners.
