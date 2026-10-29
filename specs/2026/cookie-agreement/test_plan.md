# Test plan: Cookie Agreement

- Requirements/design: privacy/legal and development approval pending.
- Planning revision: `c30306bcb6936768c8aabf6257d7d3ca087c8a69` plus the current Cookie Agreement documentation diff; base `master` `eeba893daff3f8076d7444963b673e2515762f6c`. Refresh and record the exact revision before each delivery unit and verification run.
- Data: synthetic policy versions, accepted decisions, session-only Reject dismissals, expiry, malformed records, and storage failures; no production consent/user data.
- Tools: typecheck, ESLint, Vitest/Testing Library, axe, Storybook, package/Next builds, local Playwright, and the status-quo GitHub Actions `quality.yml` workflow.
- Manual QA: `manual_testing.md` for keyboard/screen reader, copy comprehension, zoom, responsive layout, privacy actions, and reset behavior; user-confirmed PASS/LGTM recorded for MT-01 through MT-11.

| Risk | Level/scenario | Expected | Required |
| --- | --- | --- | --- |
| Package/API | Build/pack/JS+TS fixtures | Public imports/CSS/types work | Yes |
| State model | Unit transitions for unknown/accepted/expired/version mismatch plus invalid customized/category records | Only the current accepted persistent record is valid; persistent rejected records are deferred | Yes |
| Reject semantics | Select configured Reject, refresh, and inspect storage | Reject dismisses only for the current session, writes no record, and the agreement returns after refresh | Yes |
| Action visibility | Default configuration and Reject-enabled configuration | Default shows only `I AGREE` and `FIND OUT MORE`; Reject appears only when configured | Yes |
| Default content | No visible title, accessible surface name, approved body, labels, plain-text overrides, and attempted raw HTML | Approved defaults render; overrides remain text; raw HTML is not interpreted | Yes |
| Scroll reveal | Decision-required state on initial render and after Reject dismissal | Fixed-bottom surface is hidden before `scrollRevealThreshold` (default `0.1` viewport height) and slides up after the threshold; no consent is recorded by scrolling | Yes |
| Implicit consent | Scroll, route, timeout, unrelated clicks | No decision record, persistence write, or decision callback | Yes |
| Privacy navigation | `FIND OUT MORE` and NPC seal with their separate defaults and independent custom HTTPS destinations | Each link navigates to its own configured target and no accepted/rejected record or decision callback is produced | Yes |
| Persistence | Missing/malformed/read/write/clear failure | Safe state, observable error, no false consent | Yes |
| Persistence defaults | Approved host-only `gno_cookie_consent`, path `/`, `SameSite=Lax`, HTTPS `Secure`, 365-day expiry, explicit policy version, clear-on-revocation, and no default `_ckn` migration | Adapter applies approved defaults and consumer overrides; no legacy or cross-host consent is read | Yes |
| GA independence | Inspect API/source/output for GA, analytics callbacks, globals, tag management, or consent mode | No analytics contract or runtime coupling exists | Yes |
| Decision callback | Missing/throwing functional callback and storage ordering | Approved safe state is preserved without false consent | Yes |
| Accessibility | Semantics, names, focus, keyboard, announcements, reduced motion | Approved behavior | Yes |
| Responsive | 320/375/768/1024/1440, 200% zoom, long copy/actions | Usable/no overflow/essential controls reachable | Widths need approval |
| NPC seal/Storybook | Repository-local seal, no-seal fallback, mobile/desktop, long copy, both default destinations, independent custom HTTPS destinations, keyboard navigation, and network inspection | Correct aspect ratio and linked semantics; both defaults and approved HTTPS overrides work independently; no remote asset request | Yes after rights approval |
| SSR | Server render/hydration/storage boundary | No mismatch/global error | Yes |
| Legacy independence | Source/output scan | No legacy/header/runtime coupling | Yes |
| Standalone use | Packed consumer imports and renders only Cookie Agreement | No Portal Header import, rendering, styles, lifecycle, or runtime state required | Yes |
| Documentation | Story/catalog/record/policy/migration review | All approved states/actions documented | Yes |
| Local browser gate | `npm run test:e2e` on the reviewed revision | Playwright browser and privacy-negative cases pass with command, environment, result, and revision recorded | Before review and release |
| CI | Unchanged GitHub Actions `quality.yml` on the reviewed revision | Existing `npm run check` and `npm run pack:check` gate passes | Before release |

Exit requires all applicable criteria PASS, privacy-owner acceptance, standalone manual QA, independent review closure, current story/catalog/docs/changelog, and exact revision evidence.

## Verification evidence

- Reviewed working tree: `feature/cookie-agreement`, base HEAD `c30306bcb6936768c8aabf6257d7d3ca087c8a69`; changes remain uncommitted.
- `npm run check` — PASS: typecheck, ESLint, 24 Vitest tests, consumer fixtures, Storybook coverage/build, and Next production build.
- `npm run pack:check` — PASS: dry-run package includes Cookie Agreement runtime, types, CSS, and local NPC seal asset.
- `npm run test:e2e` — PASS: 28 Playwright tests across desktop and mobile projects.
- Manual QA in `manual_testing.md` — PASS/LGTM, user-confirmed for MT-01 through MT-11.
- Independent Argus review — PASS after correction revalidation; no commit/push/PR approval granted.
