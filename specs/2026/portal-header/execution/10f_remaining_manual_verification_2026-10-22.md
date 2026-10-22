# Verification Report: Remaining Portal Header QA

## Result

The locally executable remaining Portal Header verification is complete.
PH-MT04, PH-MT05, PH-MT06, and PH-MT08 pass. PH-MT01 remains BLOCKED with
substantial passing evidence because native 200% keyboard/metadata evidence is
incomplete; PH-MT03 remains BLOCKED because a real screen reader is unavailable;
PH-MT07 remains BLOCKED because bundled Chromium cannot represent the approved
latest-two branded Chrome, Edge, Firefox, and native Safari matrix.

Current manual totals are **5 PASS, 0 FAIL, 3 BLOCKED, and 0 N/A**. Overall
verification is therefore BLOCKED and is not ready for Argus handoff.

## Candidate and environment

- Repository: `D:\gno-node-projects\gno-shared-components-v2`.
- Branch/HEAD: `feature/portal-header` /
  `0b2561575b68f1e89ea9cf16fdaaa7e039670296`, unstaged dirty candidate.
- Candidate reference: tracked implementation diff hash
  `7da8d440643c7ea37ec59e3cff0f9a082c9c6fae`, excluding verification documents;
  untracked candidate files are not represented by a Git diff hash.
- Environment: Windows; Node `v26.10.0`; npm `11.19.1`; Playwright Chromium
  `153.0.8010.12`; local synthetic catalog `http://localhost:3000/catalog`.
- Date/timezone: 2026-10-22, Asia/Shanghai.
- Safety: synthetic local data only; production links were inspected but not
  activated; no credentials or production data were used.

## Commands and regression evidence

| Command/check | Expected | Actual | Status |
| --- | --- | --- | --- |
| `npm run check` | Typecheck, lint, unit/a11y, JS/TS consumers, Storybook, package, and Next.js build pass | Exit 0 after sandbox-authorized rerun; 13/13 tests, two fixtures, Storybook, Next.js 16.3.8 static build passed | PASS |
| `npm run test:e2e` | Configured browser regression passes | 26/26 bundled Chromium desktop/mobile cases passed | PASS |
| `npm run pack:check` | Intended package files are publishable | Exit 0; 37 files, 21.6 kB packed, 76.3 kB unpacked | PASS |
| `npx vitest run packages/ui/src/components/portal-header/portal-header.test.tsx --reporter=verbose` | Social, URL, router, interaction, and axe cases pass | 13/13 passed | PASS |
| Direct Playwright five-width measurement | No horizontal overflow and approved compact dimensions | Client width equalled scroll width at 320/375/768/1024/1440; bars measured 42.39px mobile and 51px desktop | PASS |
| Direct Playwright accessibility-media inspection | Contrast/focus/reduced-motion/forced-colors remain usable | Dark bar `rgb(46,46,46)`, white text (~13.6:1), visible 3px solid focus outline with 3px offset in normal/forced/high-contrast modes, transition duration 0s under reduced motion | PASS |
| Direct Playwright social/request inspection | Safe accessible socials; no tracking/hotlink request | Six News social links had names, `_blank`, `noopener noreferrer`, no inline handler; zero non-local requests during load/operation | PASS |
| Prohibited source/built-output scan | No GA/analytics/legacy runtime coupling | No prohibited matches | PASS |
| Runtime asset-hotlink scan excluding test/story fixtures | No remote runtime asset loading | No implementation/built-CSS hotlinks | PASS |
| Story/catalog/migration inventory scan | Required supported states and guidance are present | Nine stories plus install, config, router, accessibility, migration, unsupported behavior, and rollback guidance found | PASS |
| `git diff --check` | No whitespace errors | Run after evidence updates; informational line-ending notices only | PASS |

The first sandboxed `npm run check` attempt stopped at Vitest with `spawn EPERM`.
The identical command was rerun with permission to launch local subprocesses and
passed. Expected non-failing warnings were limited to Vite handling of the
component's `"use client"` directive, Storybook chunk size, Node's
`module.register()` deprecation, and Playwright `FORCE_COLOR` messages.

An auxiliary direct file import of `packages/ui/dist/index.js` failed because
raw Node ESM does not resolve its extensionless internal directory import. This
is not the approved consumer path or an exit criterion: the two clean JavaScript
and TypeScript React/Next/bundler consumer fixtures using the package export both
passed. Raw unbundled Node ESM consumption is not claimed as supported.

## Manual-case assessment

| Case | Current evidence | Status |
| --- | --- | --- |
| PH-MT01 | Five widths, approved dimensions/order, overflow suite, and prior user "LGTM when it zoom" observation pass; native zoom browser/version and keyboard metadata remain absent | BLOCKED (partial pass) |
| PH-MT02 | Independently passed in report 10e | PASS |
| PH-MT03 | Automated axe and semantic assertions pass, but no real screen reader/announcement run is available | BLOCKED |
| PH-MT04 | Local contrast, focus, reduced-motion, forced-colors, theme, and axe evidence pass | PASS |
| PH-MT05 | Presets, override/hide/append, unsafe/unnamed omission, safe targets, local assets, and analytics independence pass | PASS |
| PH-MT06 | Safe/unsafe URL classification, blank/trimmed search, single local GET, and throwing-adapter anchor fallback pass | PASS |
| PH-MT07 | Bundled Chromium regression passes, but latest-two branded/native matrix is unavailable | BLOCKED |
| PH-MT08 | JS/TS fixtures, package contents, Storybook/catalog inventory, migration, and rollback documentation pass | PASS |

PH-VF01, PH-VF02, and PH-VF03 remain resolved. No new source defect was found.

## Acceptance status and handoff

- PASS evidence is now recorded for PH-AC01-PH-AC04, PH-AC06-PH-AC09,
  PH-AC11-PH-AC17, and PH-AC20-PH-AC22, subject to the exact qualifications in
  `acceptance_criteria.md`.
- PH-AC05 remains PARTIAL/BLOCKED by PH-MT01 and PH-MT07.
- PH-AC10 remains PARTIAL/BLOCKED by PH-MT03.
- PH-AC18 remains PARTIAL/BLOCKED because its changelog validation paragraph is
  intentionally prospective while overall verification is incomplete; refresh
  it with exact passing evidence before release review.
- PH-AC19 remains pending exact-revision GitHub Actions/release evidence and is
  not inferred from local checks.
- Recipient/next owner: human accessibility/cross-browser QA for real
  screen-reader announcements, native 200% zoom keyboard/metadata, and both
  supported current releases of branded Chrome, Edge, Firefox, and Safari.
- Argus handoff: BLOCKED because required checks remain BLOCKED. Orion commit
  preparation cannot begin until verification passes and Argus review closes.
- No application source, test implementation, staging, commit, push, PR,
  merge, release, deployment, or external message was performed by Vera.
