# Verification Report: Portal Header PH-06

## Executive summary

Vera independently verified the unchanged Portal Header implementation diff on
2026-10-21 Asia/Shanghai. The repository quality gate, 8 component/accessibility
tests, 2 JavaScript/TypeScript consumer fixture builds, Storybook, Next.js build,
20 configured Chromium Playwright tests, package dry run, logo integrity, client
boundary, and prohibited-runtime scans pass. Verification is not ready for
Argus: two negative-case defects fail approved safety/accessibility behavior,
and required human accessibility/zoom plus latest-two Chrome, Edge, Firefox, and
Safari coverage remains BLOCKED.

## Workflow context

- Role/stage: Vera / Construction verification, PH-06.
- Repository: `D:\gno-node-projects\gno-shared-components-v2`.
- Branch/base/HEAD: `feature/portal-header` at
  `0b2561575b68f1e89ea9cf16fdaaa7e039670296`.
- Approval oracle: PH-A10 requirements and PH-A11 development.
- Input implementation evidence:
  `execution/05_development_report_2026-10-21.md`.
- Dirty identity before Vera artifacts: tracked binary diff hash
  `3d93b0977a5fe7125449b4724c42457f28723435`, plus the untracked files listed
  by `git ls-files --others --exclude-standard` in the PH-02 through PH-05
  implementation. `.playwright-mcp/` is unrelated user runtime output and was
  excluded and left untouched.
- Scope boundary: Vera added only this report and `manual_testing.md`; no
  application/package correction, commit, push, PR, merge, release, or
  deployment was performed.

## Environment

- OS: Microsoft Windows NT `10.0.26200.0`.
- PowerShell: `7.6.6`.
- Node.js: `v26.10.0`; npm: `11.19.1`.
- React: `19.2.8`; Next.js: `16.3.8`; Playwright: `1.63.0`.
- Data/endpoints: synthetic local catalog/consumer fixtures and localhost test
  server only; no production credentials or destructive data.

## Automated and static results

| ID | Exact command/check | Expected | Actual | Status |
| --- | --- | --- | --- | --- |
| PH-V01 | `npm run check` | Package/root typecheck, lint, Vitest, JS/TS consumers, Storybook, and Next production build pass | Exit 0 after an initial restricted-sandbox `spawn EPERM` retry outside the sandbox; 1 test file and 8/8 tests passed, 2 fixtures built, Storybook and five static Next pages/routes built | PASS |
| PH-V02 | `npm run test:e2e` | Configured browser interactions, errors, and responsive checks pass | Exit 0; 20/20 passed in `chromium-desktop` and `chromium-mobile`; no collected console/page errors | PASS |
| PH-V03 | `npm run pack:check` | Intended package files and metadata are present | Exit 0 after an initial restricted npm-cache `EPERM` retry; 33 files, 18.5 kB packed, 60.2 kB unpacked | PASS |
| PH-V04 | `Get-FileHash` on source and built GMA SVG | Source/output equal approved SHA-256 | Both equal `4265686660C12D10F6954D8DEC60884933D680F10DD79A4FF7A76C016D62F39A` | PASS |
| PH-V05 | First-line inspection of source/built interactive entry | Narrow package entry preserves the client directive | Both begin with `"use client"` | PASS |
| PH-V06 | `rg` prohibited-runtime scan over package source/output and catalog adapter | No GA/analytics global, jQuery, legacy handler, unsafe HTML/eval, consent mode, or production logo hotlink | No matches | PASS |
| PH-V07 | `rg` framework-import scan over package source/output | Package has no Next/router runtime dependency | No matches | PASS |
| PH-V08 | `git diff --check` | No whitespace errors | Exit 0; only existing LF-to-CRLF working-copy notices | PASS |
| PH-V09 | Story/catalog/docs/changelog/export inspection | Required states, usage, migration, SemVer impact, and public exports are discoverable | Dedicated stories cover desktop/mobile/open drawer/social/no-search/long/theme/failure states; catalog, README, migration guide, changelog, and exports are current | PASS |
| PH-V10 | `npx playwright test --browser=firefox` | Supplemental Firefox run can execute | Exit 1 before tests: Playwright rejects `--browser` when config defines projects | BLOCKED (infrastructure/configuration, not product failure) |

Expected non-failing warnings: Storybook/Vite consumer bundling reports that it
ignores module directives in browser-only bundles, while the distributed ESM
entry preserves `"use client"`; Storybook reports existing large documentation
chunks and Node `module.register()` deprecation; Playwright reports the existing
`NO_COLOR`/`FORCE_COLOR` warning.

## Failed negative cases

### PH-VF01: Protocol-relative navigation and search URLs are accepted

- Oracle: PH-AC03 safe navigation behavior and PH-NFR02 prohibition on implicit
  external URL trust.
- Evidence: `isSafeNavigationHref()` at
  `packages/ui/src/components/portal-header/portal-header.tsx:34` returns true
  for every value starting with `/` before URL parsing. Therefore
  `//attacker.example/path` is accepted for a navigation `href` and search
  `action`. Node URL resolution confirmed that this value becomes
  `https://attacker.example/path` from an HTTPS consumer origin.
- Impact: configuration that appears relative can navigate or submit search data
  to another origin without requiring an explicit approved HTTPS URL.
- Expected: accept root-relative paths beginning with exactly one `/`, fragments,
  queries, and explicitly validated HTTPS destinations; reject protocol-relative
  and ambiguous slash/backslash forms.
- Actual/status: protocol-relative value is treated as safe; **FAIL**.
- Required correction/validation: harden URL classification and add navigation
  and search regression tests for `//host`, slash/backslash ambiguity,
  `javascript:`, `http:`, relative, and explicit HTTPS cases.

### PH-VF02: Whitespace-only custom social labels render unnamed links

- Oracle: PH-AC07 requires all rendered social entries to be accessible links;
  approved defaults require a label for every new ID.
- Evidence: `resolvePortalHeaderSocialLinks()` checks `!merged.label` and
  `!patch.label` at `social-links.ts:69` and `social-links.ts:83` without
  trimming. A label such as `"   "` is truthy and becomes the anchor's
  `aria-label`, yielding no meaningful accessible name.
- Impact: a valid HTTPS custom/overridden social destination can render as an
  icon-only link without an accessible name.
- Expected: omit whitespace-only labels or normalize/validate a non-empty trimmed
  accessible name.
- Actual/status: whitespace-only labels pass resolution; **FAIL**.
- Required correction/validation: trim/validate labels and add resolver/DOM/axe
  regression coverage for blank and whitespace-only labels.

Atlas and Forge were notified of both findings during PH-06. Vera did not modify
implementation code or tests to conceal them.

## Acceptance status

| Criteria | Status | Evidence/rationale |
| --- | --- | --- |
| PH-AC01, PH-AC02 | PASS | Build, package inventory, exports, local asset hash, catalog fixture, and no remote logo/icon/font runtime dependency |
| PH-AC03 | FAIL | Current/disabled/explicit new-tab behavior passes, but PH-VF01 accepts protocol-relative cross-origin navigation/search values |
| PH-AC04 | BLOCKED | Automated drawer Escape/focus restoration/trap checks pass; required independent keyboard/outside behavior remains unexecuted in PH-MT02 |
| PH-AC05 | BLOCKED | Chromium 320/375/768/1024/1440 width checks pass; 200% zoom, long-label visual checks, real-device behavior, and full browsers are unexecuted |
| PH-AC06 | PASS | Unit and Chromium browser checks prove blank rejection, trim, GET name/action, one navigation, and mutual exclusion for safe fixtures |
| PH-AC07 | FAIL | Presets, ordering, hide/append, unsafe schemes, generic icon, and safe rel checks otherwise pass; PH-VF02 allows whitespace-only accessible labels |
| PH-AC08, PH-AC09 | PASS | Source/output/API scans exclude analytics and package-private/Next imports; anchors, throwing-adapter fallback, and Next showcase build pass |
| PH-AC10 | BLOCKED | Axe reports no serious/critical findings with color contrast disabled; manual screen reader, keyboard, contrast, and preference checks remain unexecuted |
| PH-AC11, PH-AC12 | PASS | Next SSR/static build and Chromium run report no mismatch/browser-global error; prohibited legacy/runtime scans pass |
| PH-AC13, PH-AC14 | PASS | Storybook inventory and catalog inspection cover/document the approved states, imports, configuration, accessibility, and story link |
| PH-AC15 | FAIL/BLOCKED | Automated configured suite passes, but failed negative requirements and required manual/full-browser checks prevent the aggregate criterion from passing |
| PH-AC16 | PASS | Plain JavaScript and TypeScript consumer fixture builds pass |
| PH-AC17, PH-AC18 | PASS | Migration guide and Unreleased changelog contain required mapping, unsupported behavior, consumer/SemVer impact, migration, and evidence state |
| PH-AC19 | N/A for PH-06 | Exact-tag GitHub Actions publication is a pre-release gate and cannot run before separately approved commit/push/PR/merge/tag actions; it remains required for release completion |

## Nonfunctional and manual/browser status

- PH-NFR01: BLOCKED. Automated axe scope passes, but required screen-reader,
  contrast, keyboard, reduced-motion, and zoom evidence is unexecuted.
- PH-NFR02: FAIL due PH-VF01. Prohibited runtime/dependency scans otherwise pass.
- PH-NFR03: PASS for invalid socials/search, throwing router adapter, and core
  navigation fallback except the safety defect separately classified above.
- PH-NFR04: PASS for Next build and configured Chromium error collection.
- PH-NFR05: BLOCKED pending 200% zoom/long-content human checks; configured width
  checks pass.
- PH-NFR06: PASS as a recorded baseline, not a budget: package is 18.5 kB packed
  and 60.2 kB unpacked; no hard threshold was approved.
- PH-NFR07: BLOCKED. Only the repository's bundled Chromium desktop/mobile
  projects ran. Installed Firefox/WebKit engines are not proof of branded/latest
  two stable Firefox or native Safari; Edge, Chrome latest-two, Firefox
  latest-two, and Safari latest-two infrastructure is not configured.
- PH-NFR08: N/A for PH-06 and still required at release: no approved tag/exact
  release revision exists.

The standalone QA reference is
[`../manual_testing.md`](../manual_testing.md). It contains 8 required cases:
0 PASS, 0 human-execution FAIL, 8 BLOCKED, and 0 N/A. The recipient is the
Portal Header QA/accessibility owner, pending assignment. The handoff is prepared
but not sent or executed.

## Risks and recommendation

- The two defects are within the approved behavior and can return to Forge as
  pre-review corrections; they do not require a new requirement. Vera must rerun
  the affected unit, full quality, Playwright, package, and static checks after
  any change and update the dirty-diff identity/evidence.
- Required human QA and the latest-two stable browser matrix need an assigned
  owner and suitable Windows/macOS/browser infrastructure. Passing Chromium
  cannot be generalized to that matrix.
- Release workflow evidence remains a later separately approved Git/release gate.

**Recommendation:** PH-06 is **FAIL/BLOCKED** and is not eligible for Argus
independent review or commit readiness. Return PH-VF01 and PH-VF02 to Forge
through Atlas, then reverify the corrected unchanged candidate and execute all
required manual/browser cases before review handoff.

## Approval status and next stage

- Requirements: approved by PH-A10.
- Development: approved by PH-A11.
- Verification: FAIL/BLOCKED at this iteration; automated positive suite passes.
- Independent review: not ready.
- Review adjustments: not applicable because these are pre-review verification
  failures within approved scope.
- Git delivery/release/merge/deployment: not approved and not performed.
- Next action: Forge corrects PH-VF01 and PH-VF02; Vera performs PH-06 revalidation
  and Atlas assigns/coordinates the manual and browser QA handoff.
