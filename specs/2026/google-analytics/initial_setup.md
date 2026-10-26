# Initial setup: Google Analytics

## Repository identity

| Repository | Branch | HEAD | Worktree note |
| --- | --- | --- | --- |
| Shared components | `feature/google-analytics` (base `master` / `e8132b6f227a8453dc07abf0d06710b876770805`) | `43dd02552014506b81600783cb0dcff3ab9d8791` | HEAD matches `origin/feature/google-analytics`; current dirty scope is the linked Google Analytics specification/approval/planning package; unrelated untracked `.playwright-mcp/` must remain untouched |
| News reference | `hotfix/GNO-21329` | `28d3312872ac7dee53215939faeeda50b0d37e87` | Read-only algorithm evidence; untracked `.codex/` and `AGENTS.md` must remain untouched; relevant reference files are unchanged from the recorded adoption revision |

## Stack and integration evidence

- Shared package: Node 26.10.0, npm 11.19.1, React 19.2.8, Next.js 16.4.2, Storybook 10.6.3, Vitest 4.1.12, and Playwright.
- Published package identity: `nmi-devops-shared-components` version `1.3.0`; the root workspace is private.
- News reference: legacy CodeIgniter/PHP application whose custom analytics file supplies behavior evidence only.
- Its GA4 loader, consent configuration, registries, and minification pipeline are not integration requirements for this shared component.
- No production IDs, cookies, user data, or external GA network calls are needed for specification or package tests.

## Readiness

| Item | Evidence | Status |
| --- | --- | --- |
| Shared repository identity | Branch/HEAD and dirty-state inspection | PASS for planning |
| Reference identity/instructions | Git identity and `news/AGENTS.md` read | PASS for read-only analysis |
| Reference review | `custom_analytics.js`, loader, consent, video, and representative call-site inspection | PASS |
| Shared-package consumer route | Package exports, direct-gtag and GTM transport fixtures, and generic JavaScript/TypeScript, Next.js 16.4.2, browser, and SSR fixtures planned | CONFIRMED FOR PLANNING |
| Measurement/consent/event decisions | GA-D01-GA-D09 in the requirements approval package | APPROVED by GA-A10 |
| Requirements approval | `approvals.md` / GA-A10 | APPROVED |
| Development approval | Implementation plan and `approvals.md` | Pending |

Requirements are approved by GA-A10 after the 2026-10-26 freshness check. Consumer-owned direct-gtag/GTM loading, event/schema limits, consent/readiness behavior, explicit page-view ownership, Chromium desktop/mobile automation, and Next.js 16.4.2 fixtures are fixed by GA-D01-GA-D09. Implementation remains blocked only on the separate development approval package; production consumers remain responsible for their privacy-approved field allowlist and GTM/container configuration.
