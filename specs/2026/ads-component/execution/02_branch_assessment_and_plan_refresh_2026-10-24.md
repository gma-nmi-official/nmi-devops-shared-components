# Execution report 02: Ads branch assessment and plan refresh

## Executive summary

Reviewed `feature/ads-component` against `origin/master`, refreshed the requested `news` reference at its current local revision, and revised the ads plan into a configurable standard display-slot contract. The branch contains specifications only; there is no component implementation to validate or independently approve. The refreshed recommendation is a provider-neutral `AdSlot`, a GPT/GAM adapter, MREC/leaderboard presets, and an optional `custom` standard display format, with application-wide provider setup remaining consumer-owned.

## Workflow context

- Project: Ads component, `specs/2026/ads-component/`.
- Request: review the current branch and plan configurable leaderboard, MREC, and related ads using `C:\laragon\www\news\res\js\third_party\dfp.js` as a key reference.
- Primary role: Atlas coordinating Athena-style repository/design analysis.
- Review classification: branch assessment, not lifecycle report 07 independent code review. Approved requirements, implementation, and passing verification do not exist.
- Scope approval: ADS-A02 permits review and planning artifacts only.

## Previous stage summary

The 2026-10-13 planning pass created draft requirements/design documents from an older shared-repository and `news` revision. Formal requirements and development approval remained pending.

## Current stage objective

1. Establish the actual branch/revision/diff and preserve unrelated worktree content.
2. Re-check the current `news` implementation, especially `dfp.js`, MREC, leaderboard, footer leaderboard, responsive breakpoints, and article placement behavior.
3. Identify planning defects and produce an implementable configurable component plan without modifying application source.

## Documents and files referenced

- Shared repository: `AGENTS.md`, query router, lifecycle, workflow/design/review skills, registry, package manifests, CI, package exports, Cookie Agreement component/story/test conventions, style build, and installed Next.js 16.4.2 Server/Client, `use client`, `Script`, and third-party-library documentation.
- Ads project: all files under `specs/2026/ads-component/`.
- News repository instructions: `C:\laragon\www\news\AGENTS.md`.
- News ad reference: `res/js/third_party/dfp.js`, `res/js/ads/ads_leaderboard.js`, `res/js/ads/footer_leaderboard_main.js`, `res/js/common_screen_sizes.js`, `res/js/story/story.js`, `res/js/gnoadscript.js`, `application/views/third_party/dfp.php`, MREC views, and header globals.

## Repository and readiness evidence

| Item | Evidence | Result |
| --- | --- | --- |
| Shared identity | `feature/ads-component` at `a546c6858312b4d3a168009efad37da276afe9b1` | PASS |
| Branch relation | `origin/master` at `f4d5579`; merge base `c453774`; 3 commits behind, 2 ahead | Needs synchronization decision before implementation |
| Branch change set | 14 ads specification files; no `packages/ui` or app source changes | Planning-only branch |
| Shared worktree at start | Untracked `.playwright-mcp/` | Preserved, not modified |
| News identity | `hotfix/GNO-21329` at `28d3312872ac7dee53215939faeeda50b0d37e87` | PASS for read-only reference |
| News worktree at start | Untracked `.codex/` and `AGENTS.md` | Preserved, not modified |
| Local stack | Node 26.10.0, npm 11.19.1, Next.js 16.4.2, React 19.2.8 | Recorded |

## Branch assessment findings

### Major — stale adoption/readiness evidence

The branch recorded old branches/revisions, Next.js 16.3.8, inability to read Git status, and a package with no public components. Actual evidence is Next.js 16.4.2 with Portal Header and Cookie Agreement exports, a readable worktree, and different current revisions. Development approval must not rely on stale setup evidence.

**Resolution in planning artifacts:** refreshed `initial_setup.md`, `reference_analysis.md`, NFR compatibility, and `state.md`. Historical report 01 remains unchanged as history.

### Major — provider-wide lazy loading was modeled as a slot prop

The old examples exposed `lazyLoad` on `AdSlot`, while the reference implements lazy loading through `googletag.pubads().enableLazyLoad`, a shared service setting. Multiple components independently changing it would create order-dependent global behavior.

**Resolution in planning artifacts:** consumer bootstrap now owns service-level provider configuration. A future component-level Intersection Observer feature must use a distinct contract such as `deferUntilVisible`.

### Major — responsive replacement behavior was not implementable from one canonical config

The documents alternated between `adUnitPath`/`mobileAdUnitPath`, placement lookup, `reserveSpaceOnNoFill`, and other example-only props. They required resize isolation but did not define rule validation, disabled ranges, signature comparison, or destroy-before-replace behavior.

**Resolution in planning artifacts:** one responsive-rule model now covers unit path and sizes per range, explicit disabled ranges, immutable validation, and deterministic replacement/cleanup.

### Major — “other ads” extensibility lacked a safe boundary

The prior plan hard-coded two formats but also referenced footer leaderboard and other legacy ads without saying which lifecycle was reusable. Treating native, out-of-page, video, pushdown, or skinning as ordinary rectangular slots would hide materially different provider and UX behavior.

**Resolution in planning artifacts:** recommend `custom` only for standard rectangular display slots; explicitly exclude other lifecycles pending separate requirements.

### Minor — consumer guide contained competing API drafts

The guide contained two introductory sections and examples using several incompatible prop/config shapes.

**Resolution in planning artifacts:** replaced it with one canonical proposal matching the design and open decisions.

## Reference findings that shape the design

- `dfp.js` combines GPT queueing, slot creation, targeting, display, global counters, GNO naming, DOM insertion, and page-specific exceptions. Only provider lifecycle belongs in the shared adapter.
- `/344684475/`, `site_id`, `ad_pt`, `ad_pos`, section transformations, test inventory, and unit suffix cycling remain consumer policy.
- Standard leaderboard rules observed: mobile through 992 px (`320x100`, `320x50`), smaller desktop 993–1280 (`728x90`), wide desktop 1281+ (`970x90`, `728x90`).
- Global MREC rules observed: `300x250`/`250x250`, adding `336x280` at 1200+. The first narrow-mobile story MREC adds large filmstrip sizes, which is a placement-specific rule and not a shared default.
- Footer leaderboard is a useful custom standard-display example but is disabled through 1000 px and includes `970x250`.
- AllAccess zone/native scripts are distinct integrations and should not be loaded by the initial standard GPT component.

## Delivery plan

| Unit | Outcome | Dependencies | Exit evidence |
| --- | --- | --- | --- |
| ADS-01 | Approve provider, custom-display, responsive sizes/disabled ranges, targeting/eligibility, empty behavior, performance, and browser decisions | Current draft | Requirements and development approvals |
| ADS-02 | Add typed rule resolver, `AdSlot`, state model, stable IDs, SSR rendering, Strict Mode-safe owned lifecycle | ADS-01 | Unit/component tests |
| ADS-03 | Add GPT adapter plus approved MREC, leaderboard, and custom standard display examples | ADS-02 | Adapter contract and breakpoint tests |
| ADS-04 | Export package API/styles and add Next.js fake-provider consumer/catalog fixtures | ADS-03 | Type/consumer/build checks |
| ADS-05 | Add required Storybook states, docs, changelog, Playwright network isolation, and standalone `manual_testing.md` | ADS-04 | Verification evidence at one revision |
| ADS-06 | Independent review, approved corrections if any, revalidation, then separate Git/release approvals | ADS-05 | Review closure and release handoff |

Planned implementation files are listed in `design.md`; detailed tasks and owners are in `wbs.md`.

## Risks

- GPT event/listener cleanup and queued async work can complete after React cleanup unless stale completions are guarded.
- Any active responsive-rule signature change requires destroy/recreate in the first contract. A later GPT size-mapping optimization must preserve the same duplicate-impression guarantees.
- React Strict Mode exercises mount/cleanup/remount and must be covered explicitly.
- Reserving the largest possible size reduces layout shift but may leave excessive whitespace; the reservation rule needs product/design approval.
- Production ad behavior cannot be proven in public Storybook or automated tests; use fake providers and an authorized consumer staging environment for final integration QA.
- Branch synchronization can materially change package conventions; refresh affected evidence after the repository owner chooses merge/rebase handling.

## Recommendation

Approve the recommended first-release boundary: GPT/GAM only, consumer-owned bootstrap, MREC/leaderboard presets, configurable custom standard display slots, explicit eligibility, reserve-by-default empty behavior, and no AllAccess/native/out-of-page/video behavior. After those decisions are recorded, finalize development approval and implement ADS-02 through ADS-05 before independent review.

## Approval status

Planning refresh is complete under ADS-A02. Requirements approval, development approval, implementation, verification, independent review, commit, push, PR, merge, release, and deployment are not approved.

## Next stage

Requirements decision and approval with product, monetization/ad operations, privacy, design, and repository owners.
