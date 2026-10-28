# Manual testing reference for QA: documentation site revamp

## Scope and handoff

- Requirements / acceptance criteria and automated test report:
  [requirements.md](requirements.md),
  [acceptance_criteria.md](acceptance_criteria.md), and
  [execution/06_verification_report_2026-10-28.md](execution/06_verification_report_2026-10-28.md).
- Repository / branch / revision: `D:\gno-node-projects\gno-shared-components-v2`,
  `feature/documentation-site-revamp`, base
  `54e9a06d9ee86874b5c4cf40f7e0d3ce1a67e6ed`, with the documented dirty diff.
- Environment: local Next.js 16.4.2 documentation application on Windows,
  Node.js 22.23.4, npm 10.9.9, headless Chromium.
- Prepared and technically executed by: Vera role in the current Codex session,
  2026-10-28 Asia/Shanghai.
- QA recipient / owner: repository owner / user.
- Handoff: Executed; owner aesthetic acceptance recorded by APR-005.
- Required manual checks: desktop presentation, narrow/mobile presentation,
  200% zoom readability, and owner acceptance of the professional visual direction.

This reference supplements automated checks. Browser and visual acceptance
checks are not unit tests, and Vera's inspection is not independent review.

## Preconditions and safe setup

1. Follow [initial_setup.md](initial_setup.md) without exposing `.env.local` values.
2. From the repository root, run `npm run dev` and open the local URL shown by
   Next.js. An existing local server at `http://127.0.0.1:3000` was used.
3. Use only repository-local preview fakes; do not configure production ad or
   analytics providers.
4. No persistent data is created. Stop the local server after testing if it was
   started specifically for QA.

## Case MT-001: Professional desktop documentation home

- Requirement / acceptance criterion: R-001, R-002 / AC-001, AC-002, AC-003.
- Test level: manual acceptance, required.
- Preconditions: local application running; Chromium viewport 1440x900.

| Step | Action | Expected observable result |
| --- | --- | --- |
| 1 | Open `/`. | Official NMI logo, branded header, one clear H1, package summary, primary actions, and four guide cards are visible. |
| 2 | Review hierarchy, spacing, typography, palette, cards, quick start, and footer. | Presentation is coherent, professional, and consistently uses the navy/blue/red editorial system. |
| 3 | Scan the full page. | No clipped content, unintended overlap, or page-level horizontal overflow appears. |

- Actual result: Technical visual inspection passed after APR-004. The official
  NMI logo is sharp and proportionate in the header; the desktop hierarchy,
  component inventory, quick-start block, and footer render coherently.
- Status: PASS (technical visual inspection).
- Tester / date / revision: Vera role, 2026-10-28, base `54e9a06` plus dirty diff.
- Evidence: local ignored screenshots `test-results/manual-home-nmi.png` and
  `test-results/manual-home-nmi-mobile.png`; automated
  desktop assertions in the final 48-case Playwright run.

## Case MT-002: Mobile dedicated guide

- Requirement / acceptance criterion: R-003, R-004, R-008 / AC-004, AC-005,
  AC-010, AC-011.
- Test level: manual acceptance/regression, required.
- Preconditions: local application running; Chromium viewport 375x812.

| Step | Action | Expected observable result |
| --- | --- | --- |
| 1 | Open `/catalog/portal-header`. | Breadcrumb, guide title, actions, local table of contents, and every required section are available in reading order. |
| 2 | Review Preview, Install, Setup, Configuration, Operational considerations, and resources. | Code remains contained, the preview fits the page, cards collapse to one column, and text remains readable. |
| 3 | Scan the full page. | No page-level horizontal overflow or clipped guide content appears. |

- Actual result: The guide collapses cleanly to one column, retains the entire
  content sequence, and contains preview/code regions without page overflow.
- Status: PASS.
- Tester / date / revision: Vera role, 2026-10-28, base `54e9a06` plus dirty diff.
- Evidence: local ignored screenshot
  `test-results/manual-portal-mobile.png`; responsive Playwright assertions.

## Case MT-003: 200% zoom readability

- Requirement / acceptance criterion: R-008 / AC-011.
- Test level: manual accessibility acceptance, required.
- Preconditions: local application running; Chromium 1280x800; document zoom
  set to 200% for the inspection.

| Step | Action | Expected observable result |
| --- | --- | --- |
| 1 | Open `/catalog` and apply 200% zoom. | Heading, guide list, Storybook callout, navigation, and footer reflow without lost content. |
| 2 | Inspect the full page and measure root client/scroll widths. | Content remains readable and scroll width does not exceed client width. |

- Actual result: Visual inspection passed; measured client width and scroll
  width were both 1280 CSS pixels after the test zoom was applied.
- Status: PASS.
- Tester / date / revision: Vera role, 2026-10-28, base `54e9a06` plus dirty diff.
- Evidence: local ignored screenshot
  `test-results/manual-catalog-200-percent.png` and recorded dimensions.

## Case MT-004: Owner aesthetic acceptance

- Requirement / acceptance criterion: R-001 / AC-002.
- Test level: owner acceptance, required by the approved test plan.
- Preconditions: MT-001 through MT-003 and automated verification pass.

| Step | Action | Expected observable result |
| --- | --- | --- |
| 1 | Repository owner reviews `/`, `/catalog`, and one guide at desktop and mobile width. | Owner accepts the visual direction as professional and suitable for the documentation site, or records focused changes. |

- Actual result: The repository owner responded “Proceed with the next step”
  immediately after being asked to confirm the new visual direction.
- Status: PASS.
- Tester / execution date / tested revision: Repository owner, 2026-10-28
  Asia/Shanghai, base `54e9a06` plus the unchanged documented dirty diff.
- Evidence / defect: APR-005; no focused visual change was requested.

## Results and next action

- Technical manual cases: 3 PASS.
- Owner acceptance cases: 1 PASS.
- Defects found: none in executed technical cases.
- Next action: independent Argus review of the unchanged tested candidate.
