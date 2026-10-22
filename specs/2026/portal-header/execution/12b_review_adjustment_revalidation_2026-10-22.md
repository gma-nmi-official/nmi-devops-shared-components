# Verification Report: Portal Header Review Adjustments

## Result

**PASS.** Vera independently revalidated the PH-A22 corrections for
ARG-PH-01 through ARG-PH-03 against reports 11, 12, and 12a. The component-root
text-token contract works with unchanged white defaults, the logo evidence and
packed artifact agree, the unused global muted token is absent from
implementation, and the affected regression surface passes. The corrected dirty
candidate is ready for Argus review closure; this result does not authorize a
Git or release action.

## Context

- Repository/branch: `D:\gno-node-projects\gno-shared-components-v2`,
  `feature/portal-header`.
- Recorded HEAD: `0b2561575b68f1e89ea9cf16fdaaa7e039670296` plus the existing
  unstaged/untracked Portal Header candidate.
- Verification owner/time: Vera, 2026-10-22 16:52 +08:00, Asia/Shanghai.
- Environment: Windows `10.0.26200.0`, Node `v26.10.0`, npm `11.19.1`,
  Playwright `1.63.0`, Next.js `16.3.8`.
- Scope: PH-A22 only. `.playwright-mcp/` and
  `specs/2026/public-storybook-documentation/` were excluded and unchanged by
  this verification.
- Preserved qualifications: PH-A20's real-screen-reader waiver and PH-A21's
  deferred Firefox/Safari/second-version coverage remain accepted residual
  risks and were not reopened.

## Finding validation

| Finding | Expected | Actual | Status |
| --- | --- | --- | --- |
| ARG-PH-01 | The documented component-root `--gno-portal-header-text` override controls visible section, navigation, action, and social colors while production defaults remain white. | The focused test observed `rgb(255, 255, 255)` by default and `rgb(18, 52, 86)` after a root override for the section label, menu control, visible social link, and Home navigation link in both configured desktop and mobile projects. Source and built CSS use the token for those rules; README limits the supported override to `.gno-portal-header`. | PASS |
| ARG-PH-02 | The authoritative inventory matches the repository, embedded default, export, and packed artifact. | Source, embedded data URI, and built asset are each 1,659 bytes and share SHA-256 `4265686660c12d10f6954d8dec60884933d680f10dd79a4ff7a76c016d62f39a`. The 37-file dry run includes `dist/assets/gma-header-logo.svg` and `THIRD_PARTY_NOTICES.md`; the inventory records implemented/hash-matched/exported/packaged status. | PASS |
| ARG-PH-03 | The unused `--gno-color-muted` does not enter implementation or the public stylesheet surface. | A repository implementation scan excluding specifications and generated/runtime directories found no match. Remaining matches are historical approval/review evidence only. | PASS |

## Commands and evidence

| Command/check | Expected result | Actual result | Status |
| --- | --- | --- | --- |
| `npx playwright test --grep "Portal Header applies its text token from the component root"` | Default and overridden computed colors pass in configured desktop/mobile projects. | 2/2 passed in 9.6 seconds. The restricted first attempt returned Windows `spawn EPERM`; the authorized outside-sandbox rerun passed. | PASS |
| `npm run check` | Typecheck, lint, unit/accessibility tests, consumer fixtures, Storybook, and Next.js build pass. | Exit 0; 13/13 Vitest tests, two JS/TS consumer fixtures, Storybook, and Next.js 16.3.8 static build passed. | PASS |
| `npm run test:e2e` | Corrected behavior and affected browser regressions pass. | Exit 0; 28/28 configured Chromium desktop/mobile tests passed in 17.5 seconds. | PASS |
| `npm run pack:check` | Intended package contents include CSS, logo, and notices. | Exit 0; 37 files, 21.7 kB packed, 76.6 kB unpacked; exported logo and notices included. | PASS |
| PowerShell SHA-256 comparison of source, embedded base64 bytes, and built logo | All three hashes and byte lengths match the approved asset. | All hashes equal the approved SHA-256; all lengths are 1,659 bytes. | PASS |
| `rg` implementation scan for `--gno-color-muted` | No implementation/public-output match. | No match outside historical specification evidence and excluded generated/runtime directories. | PASS |
| Built CSS inspection | Package output preserves the corrected text-token rules. | `dist/styles.css` uses `var(--gno-portal-header-text)` for section label, nav link, icon button, and social link rules. | PASS |
| `git diff --check` | No whitespace error. | Exit 0; only existing LF-to-CRLF conversion notices. | PASS |

Expected non-failing warnings were limited to bundler handling of `"use client"`,
Storybook source-map/chunk-size notices, Node's `module.register` deprecation,
Playwright `FORCE_COLOR`, and Git line-ending notices.

## Acceptance and manual-test impact

- PH-AC02 remains PASS with corrected token and asset evidence.
- PH-AC15 remains PASS; the configured browser suite now contains 28 cases.
- PH-AC18 remains PASS; changelog evidence now names the token correction and
  the current 28/28 configured suite.
- `manual_testing.md` remains the standalone QA reference. This adjustment was
  fully covered by computed-style automation, package inspection, and static
  evidence; it introduces no new human-only case. Existing totals remain
  **7 PASS, 0 FAIL, 0 BLOCKED, and 1 N/A/waived** under PH-A20/PH-A21.

## Handoff

Adjustment validation status: **PASS**. No failed requirement or new blocker was
found. Atlas may hand the corrected dirty candidate and reports 11, 12, 12a,
and 12b to Argus for independent closure of ARG-PH-01 through ARG-PH-03. No
staging, commit, push, pull request, release, merge, or deployment action was
performed or authorized.
