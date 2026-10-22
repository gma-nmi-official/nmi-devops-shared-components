# Verification Report: Installed Browser Compatibility

## Result

The full Portal Header desktop/mobile browser suite passes in the installed
branded Chrome and Edge versions: **52/52 cases PASS**. Installed Firefox was
detected but could not initialize Playwright's required automation protocol, so
its attempts are infrastructure BLOCKED, not application failures. PH-MT07
remains BLOCKED by Firefox, second-version, and native Safari coverage.

## Candidate and environment

- Repository/branch: `D:\gno-node-projects\gno-shared-components-v2`,
  `feature/portal-header`.
- Base HEAD: `0b2561575b68f1e89ea9cf16fdaaa7e039670296` with the existing unstaged
  Portal Header candidate.
- OS: Windows; execution date 2026-10-22 Asia/Shanghai.
- Chrome: `155.0.8059.85`.
- Edge: `155.0.4283.62`.
- Firefox: `152.0.4` detected but automation unavailable.
- Viewports: desktop `1440x900`, mobile `375x812`, plus the suite's explicit
  320/375/768/1024/1440 overflow checks.

## Execution

A temporary Playwright verification configuration selected the installed
Chrome and Edge channels and the installed Firefox executable, then ran the
repository's 13 browser cases in desktop and mobile projects for each browser.
The temporary configuration was removed after execution.

| Browser/project | Result |
| --- | --- |
| Installed Chrome desktop/mobile | PASS, 26/26 |
| Installed Edge desktop/mobile | PASS, 26/26 |
| Installed Firefox desktop/mobile | BLOCKED, 0/26 executed; browser exited before Playwright automation connected |
| Second installed versions | BLOCKED; binaries unavailable |
| Native Safari | BLOCKED; Apple infrastructure unavailable |

The combined command exited nonzero solely because all 26 Firefox projects
failed at browser launch. Firefox logs showed headless startup followed by
process exit before the required automation pipe became usable. No Portal
Header page or assertion ran in those projects, so this is not classified as a
component FAIL.

## Handoff

- No Chrome or Edge compatibility defect was found.
- PH-MT07 remains BLOCKED because its approved matrix requires latest-two
  Chrome, Edge, Firefox, and native Safari releases.
- Next action: execute the remaining matrix on suitable infrastructure or obtain
  a separate user-approved compatibility-scope revision.
- Argus and Orion remain gated. No source implementation or Git action was
  performed.
