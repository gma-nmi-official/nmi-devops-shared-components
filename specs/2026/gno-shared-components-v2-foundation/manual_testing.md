# Manual testing reference for QA: foundation baseline

## Scope and handoff

- Requirements / acceptance criteria: `requirements.md`, `acceptance_criteria.md`
- Automated verification: `execution/06_verification_audit_2026-10-09.md`
- Repository / revision: `D:\gno-node-projects\gno-shared-components-v2`, `master`, `c580e40819842932fe9430cefddca92bf6525867`
- Environment: local Windows checkout; Node.js 26.10.0; npm 11.19.1; localhost only
- Prepared by and date: Vera, 2026-10-09 Asia/Shanghai
- QA recipient / owner: repository owner or assigned manual QA
- Handoff: Browser acceptance execution complete by Vera; prepared for Atlas/Argus review
- Required manual checks: local showcase/catalog navigation and browser presentation. No production credentials or data are required.

This reference supplements automated verification. The recorded results below
come from the approved Playwright suite, a direct Chromium probe, and visual
inspection of desktop/mobile screenshots. No external or production system was used.

## Preconditions and safe setup

1. From the repository root, run `npm ci` if dependencies are not already installed.
2. Run `npm run dev` and use the local URL printed by Next.js (normally `http://localhost:3000`).
3. Use a supported desktop browser. Do not connect the checkout to production services.
4. Stop the local server after testing. Generated `.next/` output is ignored.

## Case MT-001: showcase and catalog navigation

- Requirement / acceptance criterion: R-002, R-013 / AC-004, AC-017
- Test level: Required manual integration and acceptance check
- Preconditions: Local development server is running.

| Step | Action | Expected observable result |
| --- | --- | --- |
| 1 | Open `/`. | The GNO shared-components showcase loads without a browser error and states that no public components exist yet. |
| 2 | Activate `Open the component catalog`. | The browser navigates to `/catalog`. |
| 3 | Activate `Showcase home`. | The browser returns to `/`. |

- Cleanup / reset: Close the browser tab.
- Actual result: PASS. Chromium loaded both routes, focused and activated the catalog link with the keyboard, and navigated back to `/` through the `Showcase home` link. No console or page errors were captured.
- Status: PASS
- Tester / execution date / tested revision: Vera / 2026-10-09 Asia/Shanghai / base `c580e408` plus the approved uncommitted adjustment diff
- Evidence / screenshot / log reference: `npm run test:e2e` (6/6 passing) and direct Chromium probe output in `execution/10_adjustment_validation_2026-10-09.md`
- Defect reference and retest result: None

## Case MT-002: empty catalog and consumer guidance

- Requirement / acceptance criterion: R-012, R-013 / AC-017, AC-018
- Test level: Required manual acceptance and negative-state check
- Preconditions: Local development server is running.

| Step | Action | Expected observable result |
| --- | --- | --- |
| 1 | Open `/catalog`. | The page clearly reports that no public GNO components are published. |
| 2 | Review the promised catalog coverage list. | Preview, states, configuration, Storybook, and JavaScript/TypeScript guidance are listed for future approved components. |
| 3 | Review the code sample. | It is visibly labelled illustrative and is not presented as a currently executable component import. |
| 4 | Check keyboard focus while tabbing through links. | Focus is visible and navigation links can be activated with the keyboard. |

- Cleanup / reset: None.
- Actual result: PASS. The empty-inventory heading, promised future coverage, and illustrative import label were visible at desktop and mobile widths. Keyboard focus had a visible outline and navigation succeeded.
- Status: PASS
- Tester / execution date / tested revision: Vera / 2026-10-09 Asia/Shanghai / base `c580e408` plus the approved uncommitted adjustment diff
- Evidence / screenshot / log reference: Playwright suite, direct Chromium probe, and ignored local screenshots `test-results/manual-catalog-desktop.png` and `test-results/manual-catalog-mobile.png`
- Defect reference and retest result: None

## Case MT-003: responsive and visual regression smoke

- Requirement / acceptance criterion: R-006, R-007 / AC-010, AC-011
- Test level: Required manual regression check
- Preconditions: Local development server is running.

| Step | Action | Expected observable result |
| --- | --- | --- |
| 1 | View `/` and `/catalog` at approximately 1440 px width. | Text, panels, links, and code samples are readable with no overlap or horizontal clipping. |
| 2 | Repeat at approximately 375 px width. | Content reflows without inaccessible controls or page-level horizontal overflow. |
| 3 | Inspect the browser console on both routes. | No application runtime error is reported. |

- Cleanup / reset: Restore the browser viewport and stop the local server.
- Actual result: PASS. At 1440 px the document measured 1440/1440 client/scroll width. At 375 px it measured 375/375; the code block remained internally scrollable at 277/912 without widening the page. Visual inspection found readable content without overlap or clipped controls, and the browser emitted no console/page errors.
- Status: PASS
- Tester / execution date / tested revision: Vera / 2026-10-09 Asia/Shanghai / base `c580e408` plus the approved uncommitted adjustment diff
- Evidence / screenshot / log reference: Playwright desktop/mobile overflow cases, direct measurement probe, and the two ignored local screenshots above
- Defect reference and retest result: None

## Results and next action

- Required cases: 3
- Passed: 3
- Failed: 0
- Blocked / not executed: 0
- Next action: Atlas hands the validated candidate to Argus for independent finding closure. Separate human exploratory QA may be scheduled but is not required by the approved correction plan.
