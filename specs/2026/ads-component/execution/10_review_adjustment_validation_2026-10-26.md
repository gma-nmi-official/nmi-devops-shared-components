# Execution report 10: Ads component review-adjustment validation

## Result

**PASS.** Vera validation confirms ADS-ADJ01–ADS-ADJ04 and relevant regressions on the corrected working-tree candidate. Independent Argus closure remains required before commit readiness.

## Scope and revision

- Repository/branch: `D:\gno-node-projects\gno-shared-components-v2`, `feature/ads-component`.
- Revision reference: baseline `a546c6858312b4d3a168009efad37da276afe9b1` plus the corrected current working-tree diff.
- Approval: ADS-A06 authorizes review corrections and validation only.
- Date: 2026-10-26, Asia/Shanghai.

## Finding validation

| Finding | Result | Evidence |
| --- | --- | --- |
| ADS-REV01 | PASS | Persistent per-instance lifecycle queue serializes effect generations. Tests cover delayed create/destroy, config/provider replacement, pending-create unmount, Strict Mode replay with a delayed provider and a real late GPT command queue, destroy-before-create ordering, and peak live-slot count of one. |
| ADS-REV02 | PASS | Latest callback is held outside lifecycle dependencies. Rerender with a new callback performs no create/destroy and later state reaches the new callback. |
| ADS-REV03 | PASS | Story uses stable configs/providers and visible per-slot counters. Corrected ADS-MT08 observed first slot 1 create/1 destroy and unchanged second slot 1 create/0 destroys after unmount. |
| ADS-REV04 | PASS | GPT cleanup commits destroyed state only after successful cleanup, handles `destroySlots(false)` as an error, and permits retry after listener-removal or destroy failure. |
| ADS-REV05 | PASS | Acceptance criteria, changelog, manual QA, current state, and this validation report now describe the corrected candidate consistently. |

## Automated evidence

| Check | Result | Evidence |
| --- | --- | --- |
| Focused AdSlot tests | PASS | Three files, 28/28 tests; includes mutation-negative, SSR, event filtering, cleanup retry, lifecycle ordering, and late GPT queue cases |
| Full quality gate | PASS | `npm run check`; typecheck, size, lint, 5 Vitest files / 52 tests, four consumer fixtures, Storybook, and Next.js production build |
| Ads output budget | PASS | 16,970 bytes across five compiled JavaScript files; limit 20,480 bytes |
| Package dry run | PASS | `npm run pack:check`; `nmi-devops-shared-components@1.3.0`, 74 files, corrected ads JS/types/styles included |
| Browser regressions | PASS | `npm run test:e2e`; 30/30 configured Chromium desktop/mobile tests |
| Live-network negative | PASS | Existing catalog browser assertion passed in both Playwright projects; no live ad-network request |

Non-failing output remains informational: jsdom reports unavailable canvas `getContext()` and Vite reports existing `"use client"`, sourcemap, public-directory, and large-chunk warnings while all builds pass.

## Manual adjustment evidence

- ADS-MT08 PASS on 2026-10-26: before unmount, both independent slots were filled at creates 1 / destroys 0. After unmounting the first, it reported creates 1 / destroys 1; the second remained filled with its original element ID at creates 1 / destroys 0. No console error or horizontal overflow occurred.
- ADS-MT09 remains PASS based on the repository owner's genuine 200% zoom confirmation because the correction did not change component presentation.
- Manual QA is again 10/10 PASS.

## Residual risk and handoff

The lifecycle queue intentionally waits for asynchronous provider work; a consumer provider that never settles create or destroy will also prevent subsequent lifecycle work from progressing. This preserves the peak-one-slot invariant and remains consumer-provider behavior rather than a package timeout policy.

Hand the corrected diff and this report to independent Argus for ADS-REV01–ADS-REV05 closure. No commit, push, pull request, merge, release, or deployment is authorized.
