# Verification Report: PH-VF03 Correction Revalidation

## Result

PH-VF03 is **resolved**. Vera independently repeated PH-MT02 against the
corrected dirty candidate and observed PASS at `1440x900` and `375x812`.
Focused and full configured regression gates also pass. PH-AC04 is PASS;
PH-AC10 remains PARTIAL/BLOCKED because PH-MT03 screen-reader QA is separate
and unexecuted.

## Candidate and environment

- Repository: `D:\gno-node-projects\gno-shared-components-v2`.
- Branch/HEAD: `feature/portal-header` /
  `0b2561575b68f1e89ea9cf16fdaaa7e039670296` with an unstaged dirty candidate.
- Correction reference: Forge report 10d tracked-diff hash
  `1f33da55a1b96809679a8f13bec1377a804497a0`; untracked candidate files are not
  represented by that Git diff hash.
- System/browser: Windows, repository-installed Playwright Chromium
  `153.0.8010.12`; Node `v26.10.0`; npm `11.19.1`.
- Acceptance endpoint: `http://localhost:3000/catalog`; HTTP readiness returned
  `200`. Synthetic catalog configuration was used; production navigation was
  intercepted and no production request was allowed.
- Viewports: desktop `1440x900`; mobile `375x812`.
- Execution date/timezone: 2026-10-21, Asia/Shanghai.

## PH-MT02 observed evidence

| Behavior | Desktop actual | Mobile actual | Result |
| --- | --- | --- | --- |
| Open and initial focus | Dialog visible; `Home` focused; body overflow `hidden` | Same | PASS |
| Visible forward boundary | 16 visible controls; `GMA Now` + Tab wraps to `Home` | 24 visible controls; RSS + Tab wraps to `Home` | PASS |
| Visible backward boundary | `Home` + Shift+Tab wraps to `GMA Now` | `Home` + Shift+Tab wraps to RSS | PASS |
| Escape closure | Dialog hidden; `Open menu` focused; overflow `visible` | Same | PASS |
| Outside-click closure | Dialog hidden; `Open menu` focused; overflow `visible` | Same | PASS |
| Search/menu relationship | Both opening orders are mutually exclusive; the newly opened input/Home receives focus | Search remains visible only inside the open mobile dialog | PASS |
| Keyboard link activation | Intercepted Home Enter activation count `1`; dialog closes; trigger focus and scroll restore; URL remains local | Same | PASS |

The direct checks used Node with `require("playwright")`, launched local
headless Chromium, opened the catalog at each exact viewport, queried the
`Navigation menu` dialog's visible anchors/buttons/inputs, exercised
Tab/Shift+Tab, Escape, outside click, both desktop menu/search opening orders,
and an Enter event whose default navigation was prevented and counted. Each
script exited `0` and printed the values summarized above.

## Automated and regression evidence

| Command | Expected | Actual | Status |
| --- | --- | --- | --- |
| `npx playwright test --grep "(traps visible menu focus\|mobile dropdown closes)"` | Correct focus boundary and close restoration at both configured projects/widths | 6/6 passed | PASS |
| `npx vitest run packages/ui/src/components/portal-header/portal-header.test.tsx` | Component interaction/a11y regression passes | 13/13 passed | PASS |
| `npm run check` | Typecheck, lint, unit/a11y, consumers, Storybook, package and Next build pass | Exit 0; 13/13 tests, 2 consumer fixtures, Storybook and Next 16.3.8 build pass | PASS |
| `npm run test:e2e` | Full configured desktop/mobile browser regression passes | 26/26 passed | PASS |
| `npm run pack:check` | Intended package contents remain publishable | Exit 0; 37 files, 21.6 kB packed, 76.3 kB unpacked | PASS |
| `git diff --check` | No whitespace errors in the dirty candidate | Exit 0; informational LF-to-CRLF notices only | PASS |

The initial sandbox attempts to launch Chromium/Vitest and access npm's cache
returned `EPERM`; they were rerun with the required local process/cache
permission and then passed. Expected non-failing warnings were limited to
`FORCE_COLOR`, Vite handling of the package's `"use client"` directive,
Storybook chunk size, and Node's `module.register()` deprecation.

## Status and handoff

- PH-VF03: resolved.
- PH-MT02: PASS after correction; report 10c retains the earlier FAIL history.
- PH-AC04: PASS.
- PH-AC10: PARTIAL/BLOCKED because PH-MT03 screen-reader execution remains
  required; this report does not infer that result from automation.
- Overall manual totals: 1 PASS, 0 FAIL, 7 BLOCKED, 0 N/A.
- Remaining blockers: PH-MT01 and PH-MT03-PH-MT08, including native latest-two
  Chrome, Edge, Firefox, and Safari coverage.
- Recipient/next owner: assigned QA/Vera for remaining manual/browser cases;
  handoff is recorded in repository evidence, not externally sent.
- Argus review remains pending fully passing verification. No application code,
  test implementation, staging, commit, push, PR, merge, release, or deployment
  action was performed by Vera.
