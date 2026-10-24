# Manual testing: Cookie Agreement

## Setup

- Repository: `D:\gno-node-projects\gno-shared-components-v2`
- Branch: `feature/cookie-agreement`
- Component: `CookieAgreement`
- Build: `npm run build-storybook` or the consumer application using the packed package
- Use a clean browser profile when testing default cookie persistence.
- Results below are user-confirmed LGTM; automated evidence is recorded in `test_plan.md`.

| ID | Requirement | Steps | Expected result | Result | Notes |
| --- | --- | --- | --- | --- | --- |
| MT-01 | CA-R02, CA-AC02 | Render with no accepted record, then scroll below and above the configured threshold at desktop and mobile widths. | Notice is hidden before the threshold and animates upward into view after the threshold; it remains fixed to the viewport bottom. | PASS | User-confirmed LGTM |
| MT-02 | CA-R03, CA-AC03 | Activate `I AGREE` with mouse, keyboard, and touch. Refresh the page. | Notice closes, acceptance persists, and it remains suppressed for the current policy version. | PASS | User-confirmed LGTM |
| MT-03 | CA-R03, CA-AC03 | Enable Reject, activate `REJECT`, then refresh. | Notice closes for the current page session, writes no consent record, and appears again after refresh. | PASS | User-confirmed LGTM |
| MT-04 | CA-R03, CA-AC03 | Activate `FIND OUT MORE`, NPC seal, scroll, wait, navigate, and click unrelated page content. | No action records acceptance or changes consent state. | PASS | User-confirmed LGTM |
| MT-05 | CA-R06, CA-AC06 | Verify default privacy destinations and configured absolute HTTPS overrides. | `FIND OUT MORE` and NPC seal navigate independently; unsafe/non-HTTPS overrides are not used. | PASS | User-confirmed LGTM |
| MT-06 | CA-R06, CA-AC06 | Inspect the seal at desktop/mobile widths and with the no-seal story. | Seal preserves its aspect ratio, has an accessible name, and no remote runtime image request occurs. | PASS | User-confirmed LGTM |
| MT-07 | CA-R08, CA-AC08 | Navigate with keyboard and inspect focus visibility, reading order, and screen-reader labels. | Actions and links are reachable in logical order with visible focus and `Cookie notice` naming. | PASS | User-confirmed LGTM |
| MT-08 | CA-R08, CA-AC09 | Test 200% zoom, narrow mobile width, long copy, and reduced-motion preference. | No essential control is covered or unreachable; reduced motion avoids non-essential animation. | PASS | User-confirmed LGTM |
| MT-09 | CA-R05, CA-AC05 | Simulate missing, malformed, expired, and failed storage. | Notice remains safe and visible; failures do not create false acceptance and are observable through the error callback. | PASS | User-confirmed LGTM |
| MT-10 | CA-R07, CA-AC07 | Inspect network requests, browser globals, and built output while interacting. | No GA, generic analytics, tag management, consent-mode behavior, or remote visual asset request exists. | PASS | User-confirmed LGTM |
| MT-11 | CA-R11, CA-AC13 | Open `/catalog` and navigate to the Cookie Agreement section. | The catalog shows the component overview, fixed-bottom preview, install example, and configurable props without writing a real consent cookie. | PASS | User-confirmed LGTM |

## QA sign-off

- Tester: User
- Revision tested: `feature/cookie-agreement` working tree based on `c30306bcb6936768c8aabf6257d7d3ca087c8a69`
- Date/time/timezone: 2026-10-23, time unavailable, Asia/Shanghai
- Overall result: PASS (LGTM)
- Open issues: None recorded; manual execution required.
