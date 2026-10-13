# Initial setup: Google Analytics

## Repository identity

| Repository | Branch | HEAD | Worktree note |
| --- | --- | --- | --- |
| Shared components | `master` | `c580e40819842932fe9430cefddca92bf6525867` | Existing reviewed foundation candidate and uncommitted component specifications must remain isolated |
| News reference | `feature/api-connectivity-checker` | `16c98484aeecdec2ba4552e5f5f834d029d7a7b4` | Read-only algorithm evidence; untracked `.codex/` and `AGENTS.md` must remain untouched |

## Stack and integration evidence

- Shared package: Node 26.10.0, npm 11.19.1, React 19.2.8, Next.js 16.3.8, Storybook 10, Vitest, and Playwright Chromium.
- News reference: legacy CodeIgniter/PHP application whose custom analytics file supplies behavior evidence only.
- Its GA4 loader, consent configuration, registries, and minification pipeline are not integration requirements for this shared component.
- No production IDs, cookies, user data, or external GA network calls are needed for specification or package tests.

## Readiness

| Item | Evidence | Status |
| --- | --- | --- |
| Shared repository identity | Branch/HEAD and dirty-state inspection | PASS for planning |
| Reference identity/instructions | Git identity and `news/AGENTS.md` read | PASS for read-only analysis |
| Reference review | `custom_analytics.js`, loader, consent, video, and representative call-site inspection | PASS |
| Shared-package consumer route | Package exports, direct-gtag and GTM transport fixtures, and generic JavaScript/TypeScript, Next.js 16.3.8, browser, and SSR fixtures planned | CONFIRMED FOR PLANNING |
| Measurement/consent/event decisions | See `specification.md` and `requirements.md` | BLOCKED for implementation |
| Requirements/development approval | `approvals.md` | Pending |

Ready for requirements review. Consumer-owned direct-gtag/GTM loading, event fields/extensions, consent behavior, explicit page views, and Next.js 16.3.8 fixtures are recorded from user decisions. Implementation still requires formal requirements and development approval; review the proposed GTM envelope/callback contract, finalize the supported browser matrix, and complete privacy/data-schema review during requirements closure. Scroll behavior is approved as consumer-configurable.
