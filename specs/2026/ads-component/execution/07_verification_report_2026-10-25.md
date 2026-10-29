# Execution report 07: Ads component verification

## Result

The original candidate passed its recorded automated checks and manual run, but independent review invalidated lifecycle coverage and ADS-MT08 evidence. Approved corrections ADS-ADJ01–ADS-ADJ04 are implemented and await Vera revalidation; current adjustment status is **PENDING**, not release-ready.

## Scope and environment

- Repository/branch: `D:\gno-node-projects\gno-shared-components-v2`, `feature/ads-component`.
- Revision reference: baseline `a546c6858312b4d3a168009efad37da276afe9b1` plus the current ads-component working-tree diff.
- Date: 2026-10-25, Asia/Shanghai.
- Locked toolchain: dependencies restored with `npm ci`; final builds used Next.js 16.4.2, Storybook 10.6.3, Vite 7.3.7, and Vitest 4.1.12.
- Supported automated browser matrix: configured Chromium desktop 1440 × 900 and mobile 375 × 812.
- Provider safety: synthetic unit paths and fake providers only; no live GPT/AllAccess request.

## Automated evidence

| Check | Result | Evidence |
| --- | --- | --- |
| Package/root typecheck and package build | PASS | `npm run typecheck` |
| Ads output budget | PASS | `npm run size:ads`; compiled ads JS 15,538 bytes across five files, limit 20,480 bytes |
| Lint | PASS | `npm run lint` |
| Unit/component/accessibility tests | PASS | `npm run test`; 5 files, 40 tests |
| JavaScript/TypeScript consumer builds | PASS | `npm run test:consumers`; four fixtures |
| Storybook coverage/build | PASS | `npm run docs:check`, `npm run build-storybook`; three public component stories plus release docs |
| Next.js production build/SSR boundary | PASS | `next build` within `npm run check`; `/`, `/catalog`, and `/docs` statically generated |
| Full quality gate | PASS | `npm run check` |
| Package dry run | PASS | `npm run pack:check`; `nmi-devops-shared-components@1.3.0`, 74 files, ads JS/types/styles included |
| Browser suite | PASS | `npm run test:e2e`; 30/30 across configured desktop/mobile Chromium projects |
| Live-network negative | PASS | Browser assertion observed no doubleclick/googlesyndication/googletagservices request in the catalog preview |
| Static ownership/coupling inspection | PASS | Ads package contains no loader URL, `window.googletag`, service-wide lazy/init call, production inventory, Portal Header, Cookie Agreement, analytics, or consent-storage dependency |

Non-failing tool output: jsdom reports that canvas `getContext()` is not implemented; ads tests do not use canvas. Vite reports the existing informational handling of package `"use client"` directives while consumer and Storybook bundles complete successfully.

## Manual evidence

- PASS retained: ADS-MT01–ADS-MT07, ADS-MT09, and ADS-MT10.
- BLOCKED pending rerun: ADS-MT08. Its earlier PASS was superseded by ADS-REV03; the corrected story now uses stable instrumented providers.
- ADS-MT09 was completed by the repository owner at genuine 200% browser zoom and reported LGTM; Vera's earlier custom-label, keyboard-focus, and desktop/mobile overflow subchecks also passed.
- ADS-MT08's initial evidence did not distinguish a preserved second provider handle from recreation. That evidence is invalid and must be replaced by a stable-provider counter check.
- A Storybook-only presentation defect found during ADS-MT03 was corrected by changing the AdSlot story layout from centered to padded. The corrected MREC content measured 300 × 250 px, excluding its border, and the responsive stories were rechecked.

## Acceptance summary

- ADS-AC01, ADS-AC02, ADS-AC04, ADS-AC08–ADS-AC15, and ADS-AC17 retain unaffected evidence.
- ADS-AC03, ADS-AC05–ADS-AC07, ADS-AC16, and ADS-AC18 are under adjustment revalidation.
- ADS-AC10 now has unit evidence plus passing manual reserve/collapse inspection.
- ADS-MT08 is blocked pending rerun; the other nine manual cases retain PASS.

## Blockers and residual risks

- Release readiness: blocked by adjustment revalidation, ADS-MT08 rerun, and independent review closure.
- Exact live consumer inventory, GPT bootstrap, consent, service-wide lazy loading, and targeting policy remain consumer integration responsibilities and were intentionally not exercised.
- Firefox, Safari/WebKit, and real assistive-technology checks are outside the approved first-release automated matrix; 200% zoom and keyboard inspection are included in manual QA.

## Recommendation

Vera must run the focused adjustment plan, full regressions, package/browser checks, and corrected ADS-MT08. If PASS, return ADS-REV01–ADS-REV05 to Argus for independent closure. Do not request commit approval before both stages complete.
