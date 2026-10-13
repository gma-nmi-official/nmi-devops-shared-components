# Test plan: Cookie Agreement

- Requirements/design: privacy/legal and development approval pending.
- Base: `c580e408`; refresh before each unit.
- Data: synthetic policy versions, categories, decisions, expiry, malformed records, and storage failures; no production consent/user data.
- Tools: typecheck, ESLint, Vitest/Testing Library, axe, Storybook, package/Next builds, Playwright, approved Bitbucket CI.
- Manual QA: future `manual_testing.md` for keyboard/screen reader, copy comprehension, zoom, responsive layout, privacy actions, and revocation.

| Risk | Level/scenario | Expected | Required |
| --- | --- | --- | --- |
| Package/API | Build/pack/JS+TS fixtures | Public imports/CSS/types work | Yes |
| State model | Unit transitions for unknown/accepted/rejected/customized/expired/version mismatch | Only approved transitions | Yes |
| Implicit consent | Scroll, route, timeout, unrelated clicks | No decision/storage/event | Yes |
| Persistence | Missing/malformed/read/write/clear failure | Safe state, observable error, no false consent | Yes |
| GA independence | Inspect API/source/output for GA, analytics callbacks, globals, tag management, or consent mode | No analytics contract or runtime coupling exists | Yes |
| Decision callback | Missing/throwing functional callback and storage ordering | Approved safe state is preserved without false consent | Yes |
| Accessibility | Semantics, names, focus, keyboard, announcements, reduced motion | Approved behavior | Yes |
| Responsive | 320/375/768/1024/1440, 200% zoom, long copy/actions | Usable/no overflow/essential controls reachable | Widths need approval |
| SSR | Server render/hydration/storage boundary | No mismatch/global error | Yes |
| Legacy independence | Source/output scan | No legacy/header/runtime coupling | Yes |
| Standalone use | Packed consumer imports and renders only Cookie Agreement | No Portal Header import, rendering, styles, lifecycle, or runtime state required | Yes |
| Documentation | Story/catalog/record/policy/migration review | All approved states/actions documented | Yes |
| CI | Clean Bitbucket pipeline | Full gate and privacy-negative tests pass | Before release |

Exit requires all applicable criteria PASS, privacy-owner acceptance, standalone manual QA, independent review closure, current story/catalog/docs/changelog, and exact revision evidence.
