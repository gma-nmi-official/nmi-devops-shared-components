# Verification Report: Portal Header PH-10b Logo/Label Alignment

## Executive summary

Vera independently revalidated the PH-10a logo/section-label optical alignment
correction approved by PH-A19. The configured automated, browser, package, and
static candidate is **PASS**. Direct browser measurements at `1440x900` and
`375x812` confirm that the `66x40` logo is unchanged, the section-label center is
exactly `5px` below the antenna-inclusive logo-box center, the bar remains
`51px`/`42.4px` high, and page-level horizontal overflow remains zero.

No product defect was found. Overall Portal Header verification remains
**PARTIAL/BLOCKED**, because the eight required human/native-browser cases have
not been executed. In particular, 200% zoom, real keyboard/screen-reader and
contrast/preference checks, and the latest-two stable Chrome, Edge, Firefox, and
native Safari matrix remain required.

## Context and candidate identity

- Repository: `D:\gno-node-projects\gno-shared-components-v2`.
- Branch/HEAD: `feature/portal-header` /
  `0b2561575b68f1e89ea9cf16fdaaa7e039670296`, with the shared uncommitted Portal
  Header candidate.
- Tracked candidate diff hash excluding this report, `../state.md`, and
  `../manual_testing.md`: `ac641e8b313e369107e6f51780999e71f84ebc34`.
- Untracked implementation, tests, documentation, and evidence remain identified
  by `git status --short`. `.playwright-mcp/` is runtime evidence and was neither
  deleted nor proposed for package/Git delivery.
- Oracle: approved PH-R01 through PH-R12 and PH-AC01 through PH-AC22, with the
  PH-A19 correction to PH-AC20; PH-10 and PH-10a reports provide the immediately
  preceding evidence.
- Role/stage: Vera / PH-10b focused revalidation. Vera changed only this report,
  `../state.md`, and `../manual_testing.md`; no application, package, or test
  source was modified.

## Environment and safety

- Windows NT `10.0.26200.0`; PowerShell `7.6.6`.
- Node.js `v26.10.0`; npm `11.19.1`; Playwright `1.63.0`.
- Safe inputs: repository fixtures, built package output, and a local Next.js
  catalog server. No credentials, production data writes, or external-link
  activation were used.

## Commands and results

| Command/check | Expected | Actual | Status |
| --- | --- | --- | --- |
| `npm run check` in the restricted sandbox | Full quality gate starts | Typecheck and lint passed; Vitest/esbuild startup was denied by sandbox `spawn EPERM` | BLOCKED environment attempt; rerun below |
| `npm run check` with approved execution permission | Typecheck, lint, unit/a11y, JS/TS fixtures, Storybook, and Next.js build pass | Exit 0; 13/13 Vitest tests, 2/2 consumer fixtures, Storybook build, and Next.js 16 static production build passed | PASS |
| `npm run test:e2e` in the restricted sandbox | Configured desktop/mobile acceptance suite starts | Playwright process startup was denied by sandbox `spawn EPERM` | BLOCKED environment attempt; rerun below |
| `npm run test:e2e` with approved execution permission | Browser acceptance and regressions pass | Exit 0; 22/22 configured Chromium desktop/mobile tests passed | PASS |
| `npm run pack:check` in the restricted sandbox | Inspect package inventory | npm cache access was denied by sandbox `EPERM` | BLOCKED environment attempt; rerun below |
| `npm run pack:check` with approved execution permission | Intended package files and output are present | Exit 0; 37 files, 21.4 kB packed, 75.6 kB unpacked | PASS |
| `git diff --check` | No whitespace errors | Exit 0; only LF-to-CRLF working-copy notices | PASS |
| Source/built-output runtime scan | No GA/analytics, jQuery, Fontello/Glyphicon/Bootstrap runtime, remote CSS/JS/font, unsafe HTML/eval, or Next.js package import | No prohibited runtime/import matches; the only `next/` text is the intentional ESLint rule comment explaining why public library code does not import Next Image | PASS |
| Built CSS inspection | Distributable CSS contains the same focused offset as source | `dist/styles.css` contains `position:relative` and `inset-block-start:.3125rem` for only `.gno-portal-header__section-label` | PASS |
| Story/catalog/changelog inspection | Consumer and component evidence explains the correction | Dedicated Desktop story asserts the 5px geometry; catalog documents optical alignment; changelog records consumer impact and desktop/mobile behavior | PASS |

The successful permission-approved reruns show the three initial `EPERM` results
were sandbox limitations, not candidate failures. Expected non-failing warnings
remain the preserved `"use client"` bundler handling, Storybook chunk sizes,
Node `module.register()` deprecation, and Playwright color-environment warning.

## Independent geometry evidence

After the production build, Vera started the local catalog with
`npm run start -- -p 3200` and measured the rendered DOM independently through a
browser session. The measurement did not rely only on the assertions in the
repository test suite.

| Viewport | Bar | Logo | Label | Label-center minus logo-center | Computed label inset | Horizontal overflow | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `1440x900` | `51px` high | `66x40px` | `37.5125x16px` | `5px` | `5px` | `0px` | PASS |
| `375x812` | `42.4px` high | `66x40px` | `37.5125x16px` | `5px` | `5px` | `0px` | PASS |

Computed label styling was `position: relative`, `font-size: 15px`, and
`line-height: 16px` at both widths. Browser console inspection returned zero
errors and zero warnings. The configured E2E suite additionally reconfirmed no
horizontal overflow at 320, 375, 768, 1024, and 1440 CSS px and all existing
navigation, search, menu, social, and grid-glyph regressions.

## Acceptance mapping

| Criterion | Status | Evidence / limitation |
| --- | --- | --- |
| PH-AC01 | PASS | Package build/dry-run includes runtime, declarations, CSS, local logo, and notices in the intentional 37-file inventory |
| PH-AC05 | BLOCKED | Configured five-width overflow and responsive layout tests pass, including unchanged 51px/42.4px bars; required human 200% zoom, long-label, and native-browser checks remain unrun |
| PH-AC13 | PASS | Dedicated stories and controls remain present; Storybook production build passes and Desktop story contains the focused 5px assertion |
| PH-AC14 | PASS | Catalog preview, supported states, import/configuration guidance, accessibility notes, Storybook link, and optical-alignment guidance are present |
| PH-AC15 | PASS | Unit/a11y, package, Storybook, Next.js, and 22 configured browser checks pass |
| PH-AC16 | PASS | Plain JavaScript and TypeScript consumer fixtures both build |
| PH-AC18 | PASS | Changelog records the component, 5px desktop/mobile correction, consumer impact, SemVer, migration, and validation context |
| PH-AC20 | BLOCKED | Direct automated geometry at 1440/375 passes exactly with unchanged heights/actions and no second row; required independent human/native-browser visual comparison remains unrun |

Affected PH-AC01/05/13/14/15/16/18 regressions have no automated/static
failure. PH-AC20's configured evidence is restored after PH-A19, but its manual
portion remains blocked and therefore the overall criterion is not marked PASS.

## Manual QA handoff and conclusion

The standalone QA reference remains [`../manual_testing.md`](../manual_testing.md).
It records 8 required cases: 0 PASS, 0 human-execution FAIL, 8 BLOCKED, and 0
N/A. The Portal Header QA/accessibility owner is still pending assignment; the
handoff is prepared, not sent or executed.

- PH-10b configured automated/static revalidation: **PASS**.
- Open product defects: **none found**.
- Overall Portal Header verification: **PARTIAL/BLOCKED** solely by required
  unexecuted human/native-browser checks.
- Next owner/action: Atlas assigns the QA/accessibility owner for PH-MT01 through
  PH-MT08 on this exact candidate. Vera records actual results afterward. Only a
  fully passing candidate proceeds to Argus independent review and later,
  separately approved Git delivery.
- No staging, commit, push, PR, merge, release, or deployment was performed.
