# Test plan: Portal Header

- Requirements: approved by PH-A10 and revised by PH-A12/PH-A14/PH-A16; revised design/development approved by PH-A13/PH-A15/PH-A17.
- Base: `0b2561575b68f1e89ea9cf16fdaaa7e039670296`; refresh before each unit.
- Data: approved production navigation/social presets plus synthetic patch/search values; no production credentials and no automated activation of external links.
- Tools: typecheck, ESLint, Vitest/Testing Library, axe, Storybook, package/Next builds, Playwright, and the approved GitHub Actions release workflow.
- Manual QA: `manual_testing.md` for keyboard, zoom, responsive presentation, and consumer behavior; real screen-reader execution is waived by PH-A20 and the compatibility matrix is revised by PH-A21.

| Risk | Level/scenario | Expected | Required |
| --- | --- | --- | --- |
| Package/API | Build/pack/JS+TS fixtures | Public imports/CSS/types work | Yes |
| Navigation | Unit/component for 16-link GMA preset, exact labels/URLs/order, same-ID override, hide, append, none/empty, long/current/disabled/external items | Complete, safe, deterministic DOM | Yes |
| Dropdown/a11y | Keyboard; visible first/last focus wrapping at 375px and 1440px; Escape/outside close with trigger-focus restoration; closed-content isolation; reduced motion | Approved state/focus behavior | Yes |
| Responsive | 320/375/768/1024/1440, 200% zoom, long labels | No overflow/clipped controls | Yes |
| Production parity | 1440px and 375px computed styles/layout against the 2026-10-21 live News reference | Single dark compact bar; configurable red accent; measured dimensions within practical browser rounding; section-label center 5px below the antenna-inclusive logo box center; correct desktop/mobile action placement; all 16 links in exact reference order; full-width 1+3/2-column dropdown | Yes |
| Menu-grid glyph | Unit DOM plus desktop/mobile browser visual inspection | Trigger contains nine solid square local SVG cells at the production-sized control in closed/expanded states; no outlined boxes, rounded-dot grip, or runtime icon font | Yes |
| Search | Missing config, blank/trimmed/valid GET submission, menu/search mutual exclusion | Missing search stays hidden; blank blocked; valid submits once; state remains deterministic | Yes |
| Compatibility | React 19, Next.js 16 showcase, configured Playwright Chromium, installed Windows Chrome `155.0.8059.85`, and Edge `155.0.4283.62` | Approved PH-A21 delivery matrix passes; Firefox, Safari, and second-version coverage remain documented deferred risk | Yes |
| Social links | Entertainment/News presets, same-ID override, hide, append, generic-icon fallback, HTTPS rejection, same/new-tab targets, keyboard activation | Approved defaults and deterministic patches render as accessible semantic links with safe `rel`; unsafe links and analytics behavior are absent | Yes |
| GA independence | Inspect public API/source/output for GA, analytics callbacks, globals, or consent-mode behavior | No analytics contract or runtime coupling exists | Yes |
| Router | Missing/throwing adapter | Core anchor/navigation behavior remains safe | Yes |
| SSR | Server render/hydration | No mismatch/global error | Yes |
| Legacy independence | Source/output scan | No prohibited coupling | Yes |
| Documentation | Story/catalog/export inventory | Every public state documented | Yes |
| Release automation | GitHub Actions on the exact approved tag/revision | Release checks pass and the expected package artifact is published | Before release completion |

Account, authentication, and SSO behavior are outside this test plan. Exit requires all applicable criteria PASS, standalone manual QA, independent review closure, current story/catalog/docs/changelog, and exact revision evidence.
