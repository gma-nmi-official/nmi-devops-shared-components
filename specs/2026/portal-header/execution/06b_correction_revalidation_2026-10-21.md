# Correction Revalidation: Portal Header PH-06b

## Executive summary

Vera independently revalidated Forge's scoped PH-VF01 and PH-VF02 corrections
on 2026-10-21 Asia/Shanghai. Both corrections and their affected automated
regressions pass: unsafe/ambiguous navigation and search values are rejected,
approved relative and explicit HTTPS forms remain accepted, and whitespace-only
social labels are omitted while valid labels are trimmed. The corrected
automated candidate is PASS. Overall PH-06 remains PARTIAL because the required
human accessibility/zoom cases and latest-two stable Chrome, Edge, Firefox, and
Safari matrix are still BLOCKED and unexecuted.

## Context and candidate identity

- Repository/branch: `D:\gno-node-projects\gno-shared-components-v2`,
  `feature/portal-header`.
- Base/HEAD: `0b2561575b68f1e89ea9cf16fdaaa7e039670296` with the shared uncommitted
  PH-02 through PH-06b change set.
- Current tracked binary diff hash after correction and evidence updates:
  `d30b00ff34f174ff304d8277cbe127745a8070a9`. Untracked implementation and
  evidence files remain identified by `git status --short`; unrelated
  `.playwright-mcp/` output remains excluded and untouched.
- Approval oracle: PH-A10 requirements and PH-A11 development.
- Previous evidence preserved: `06_verification_report_2026-10-21.md`.
- Correction input:
  `06a_pre_review_correction_implementation_2026-10-21.md`.
- Vera changed only this report and appended a dated status note to
  `../manual_testing.md`; implementation and root coordination records were not
  modified.

## Exact correction inspection

### PH-VF01 URL classification

`isSafeNavigationHref()` now:

1. trims for validation and rejects empty input;
2. rejects any backslash;
3. accepts a leading `/` only when it is not `//`;
4. accepts fragment `#...` and query `?...` values;
5. accepts absolute values only when they explicitly start with `https://`
   case-insensitively and parse to the HTTPS protocol.

The same function gates navigation items, brand links, and search actions.
Focused DOM tests prove navigation acceptance for `/safe`, `#safe`,
`?safe=true`, and `https://example.com/safe`; rejection for
`//attacker.example/path`, `/\attacker.example/path`, HTTP, and JavaScript;
and search rejection for the same unsafe classes while preserving explicit
HTTPS. Because search invokes the identical classifier, its single-slash,
fragment, and query decisions are the same inspected branches.

### PH-VF02 accessible social labels

`resolvePortalHeaderSocialLinks()` trims labels for both preset overrides and
new appended IDs before validation. Empty results are omitted. Focused resolver
and rendered-DOM tests prove that `"   "` is omitted and
`"  Community  "` resolves/renders with the accessible name `Community`.

No unrelated API, asset, layout, analytics, or dependency behavior changed.

## Revalidation evidence

Environment: Windows NT `10.0.26200.0`, PowerShell `7.6.6`, Node.js
`v26.10.0`, npm `11.19.1`, Playwright `1.63.0`; synthetic local fixtures and
localhost only.

| Command/check | Expected | Actual | Status |
| --- | --- | --- | --- |
| `npx vitest run packages/ui/src/components/portal-header/portal-header.test.tsx` | Both fixes and affected component behavior pass | Exit 0; 1 file, 10/10 tests passed | PASS |
| Source/test inspection of `portal-header.tsx`, `social-links.ts`, and `portal-header.test.tsx` | Required positive and negative branches are implemented and asserted | Shared URL classifier covers navigation/search; social resolver trims before validation; focused assertions cover the reported defects | PASS |
| `npm run check` | Typecheck, lint, all tests, JS/TS fixtures, Storybook, and Next build pass | Exit 0; 10/10 tests, 2 fixtures, Storybook static build, and Next production/static build passed | PASS |
| `npm run test:e2e` | Existing interaction, search, navigation, error, and responsive regressions remain green | Exit 0; 20/20 configured Chromium desktop/mobile cases passed with no collected console/page errors | PASS |
| `npm run pack:check` | Corrected output remains intentionally packaged | Exit 0; 33 files, 18.6 kB packed, 60.6 kB unpacked | PASS |
| Built-output inspection | Built classifier and trimmed-label correction are present | `dist` contains backslash/single-slash classification and trimmed labels in both resolver branches | PASS |
| Prohibited-runtime scan | Corrections introduce no analytics, legacy, unsafe HTML/eval, consent, jQuery, or logo hotlink coupling | No matches | PASS |
| `git diff --check` | No whitespace errors | Exit 0; only pre-existing LF-to-CRLF working-copy notices | PASS |

The existing non-failing Storybook/Vite module-directive, documentation chunk,
Node deprecation, and Playwright color-environment warnings remain unchanged.

## Finding disposition and acceptance impact

| Finding/criterion | Before | Revalidation | Result |
| --- | --- | --- | --- |
| PH-VF01 / PH-AC03 / PH-NFR02 | Protocol-relative navigation/search accepted | Unsafe and ambiguous forms rejected; approved forms retained; full regressions pass | RESOLVED / PASS |
| PH-VF02 / PH-AC07 | Whitespace-only custom social label accepted | Blank result omitted and valid label trimmed in resolver and DOM | RESOLVED / PASS |
| PH-AC15 automated checks | Failed/blocked by the two defects | All configured automated checks pass | PASS for configured automation |
| PH-AC04, PH-AC05, PH-AC10; PH-NFR01, PH-NFR05 | Required human QA unexecuted | No change; 8 manual cases remain unexecuted | BLOCKED |
| PH-NFR07 | Only configured Chromium projects available | No change; latest-two branded/native browser matrix not executed | BLOCKED |
| PH-AC19 / PH-NFR08 | No separately approved release revision/tag | No change; later release gate | N/A for PH-06b |

## Manual/browser handoff status

The updated standalone reference is
[`../manual_testing.md`](../manual_testing.md). It preserves the initial PH-06
results and appends this correction status. PH-MT05 and PH-MT06 are ready for
manual retest, but all 8 required cases still report 0 PASS, 0 human-execution
FAIL, 8 BLOCKED, and 0 N/A. The Portal Header QA/accessibility recipient remains
pending assignment; the handoff is prepared, not sent or executed.

## Conclusion and next action

- Correction revalidation: **PASS**.
- Overall verification: **PARTIAL** because required manual and browser matrix
  evidence remains BLOCKED; no implementation failures remain open.
- Argus eligibility: the corrected automated diff and evidence are suitable for
  technical independent review, but they are **not a passing workflow handoff to
  Argus or commit readiness** under the current policy while required PH-MT01
  through PH-MT08 and PH-NFR07 remain BLOCKED. Atlas may prepare review context,
  but must not represent verification as complete.
- Next action: assign and execute the manual/accessibility/latest-two browser QA
  matrix on the exact candidate, refresh Vera evidence, then hand a fully passing
  revision to Argus. No Git or release action is authorized by this report.
