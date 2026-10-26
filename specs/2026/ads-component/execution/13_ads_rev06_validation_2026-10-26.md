# Execution report 13: ADS-REV06 adjustment validation

## Result

**PASS.** ADS-ADJ05 preserves cleanup ownership, retries with the same handle, prevents overlapping replacement after cleanup failure, and reports failure through the existing callback contract. Independent Argus closure remains required.

## Scope and revision

- Repository/branch: `D:\gno-node-projects\gno-shared-components-v2`, `feature/ads-component`.
- Revision reference: baseline `a546c6858312b4d3a168009efad37da276afe9b1` plus the current corrected working-tree diff.
- Approval: ADS-A07 on 2026-10-26 Asia/Shanghai.
- Finding: ADS-REV06 from report 11.

## Focused evidence

- Owned slot state persists across effect generations as `{ provider, slot }` and is cleared only when its original provider resolves destruction successfully.
- A real fake-GPT integration returns `destroySlots(false)` once, reports the failure, retries the identical handle, destroys it, and only then defines the replacement; recorded peak live slots is one.
- Listener removal throws once during provider replacement, then the identical handle is retried successfully before the replacement provider creates a slot.
- Four consecutive cleanup rejections across cleanup and replacement activation retain the old handle, expose error, and create no replacement. A later config trigger retries successfully and keeps peak live slots at one.
- Unmount cleanup rejects once, reports the transient error, retries the identical handle, and resolves without an unhandled rejection.
- Focused command: `npm run test -- packages/ui/src/components/ad-slot/ad-slot.test.tsx packages/ui/src/components/ad-slot/gpt-provider.test.tsx packages/ui/src/components/ad-slot/resolve-rule.test.tsx` — PASS, 3 files / 32 tests.

## Full regression evidence

| Check | Result | Evidence |
| --- | --- | --- |
| Full quality gate | PASS | `npm run check`; typecheck, lint, 5 Vitest files / 56 tests, four consumer fixtures, Storybook, and Next.js production build |
| Ads output budget | PASS | 17,747 bytes across five compiled JavaScript files; limit 20,480 bytes |
| Package dry run | PASS | `npm run pack:check`; `nmi-devops-shared-components@1.3.0`, 74 files |
| Browser regressions | PASS | `npm run test:e2e`; 30/30 configured Chromium desktop/mobile tests |
| Live-network negative | PASS | Catalog assertion passed in both browser projects without live ad-network requests |
| Manual QA | PASS / unchanged | ADS-MT08 stable-provider identity and ADS-MT09 presentation are unaffected by the internal cleanup correction; ADS-MT01–ADS-MT10 remain PASS |

Informational output is unchanged: jsdom canvas availability and existing Vite `"use client"`, sourcemap, public-directory, and chunk-size warnings do not fail builds.

## Handoff

Return the corrected diff to independent Argus for ADS-REV06 closure. No commit, push, pull request, merge, release, or deployment is authorized.
