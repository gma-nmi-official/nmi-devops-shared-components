# Test plan: Portal Header

- Requirements/design: pending approval.
- Base: `c580e408`; refresh before each unit.
- Data: synthetic navigation links, social links, and search values; no production credentials.
- Tools: typecheck, ESLint, Vitest/Testing Library, axe, Storybook, package/Next builds, Playwright, approved Bitbucket CI.
- Manual QA: future `manual_testing.md` for keyboard, screen reader, zoom, responsive presentation, and consumer behavior.

| Risk | Level/scenario | Expected | Required |
| --- | --- | --- | --- |
| Package/API | Build/pack/JS+TS fixtures | Public imports/CSS/types work | Yes |
| Navigation | Unit/component for empty/long/current/disabled/external items | Safe deterministic DOM | Yes |
| Drawer/a11y | Keyboard, focus, Escape, outside, scroll, reduced motion | Approved state/focus behavior | Yes |
| Responsive | 320/375/768/1024/1440, 200% zoom, long labels | No overflow/clipped controls | Widths need approval |
| Search | Blank/valid/native/callback/failure | Blank blocked; valid once; safe failure | If approved |
| GA independence | Inspect public API/source/output for GA, analytics callbacks, globals, or consent-mode behavior | No analytics contract or runtime coupling exists | Yes |
| Router | Missing/throwing adapter | Core anchor/navigation behavior remains safe | Yes |
| SSR | Server render/hydration | No mismatch/global error | Yes |
| Legacy independence | Source/output scan | No prohibited coupling | Yes |
| Documentation | Story/catalog/export inventory | Every public state documented | Yes |
| CI | Clean Bitbucket pipeline | Full gate passes | Before release |

Account, authentication, and SSO behavior are outside this test plan. Exit requires all applicable criteria PASS, standalone manual QA, independent review closure, current story/catalog/docs/changelog, and exact revision evidence.
