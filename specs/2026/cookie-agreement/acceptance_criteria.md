# Acceptance criteria: Cookie Agreement

Automated verification and user-confirmed manual QA are complete for the current
working tree. Release-sensitive criteria remain pending where privacy/legal
acceptance, asset redistribution rights, or final release review is required.

| ID | Requirement | Criterion | Validation | Status |
| --- | --- | --- | --- | --- |
| CA-AC01 | CA-R01 | Package exports standalone runtime, types, and CSS that a consumer can import and render without importing Portal Header; packed files are intentional. | Build/pack and consumer fixture | PASS |
| CA-AC02 | CA-R02 | For unknown, expired, or version-mismatched state requiring a decision, the surface is fixed at the viewport bottom, hidden before the configured threshold, and slides up after vertical scroll reaches the threshold (default 10% of viewport height). A valid accepted record suppresses it. | State, component, and browser tests | PASS |
| CA-AC03 | CA-R03 | Default UI shows `I AGREE` and `FIND OUT MORE` and no Reject control. Enabling Reject renders it. `I AGREE` records acceptance and suppresses the surface; Reject only dismisses it for the current session, writes no record, and the surface returns after refresh. Privacy/seal navigation and unrelated clicks do not record a decision. | Component/browser positive and negative tests | PASS |
| CA-AC04 | CA-R04 | The current persistent record contains `accepted` status, policy version, decision timestamp, and expiry; customized/category states and persistent `rejected` records are not accepted in this phase. | Contract, documentation, and boundary tests | PASS |
| CA-AC05 | CA-R05 | Missing, malformed, read/write/clear-failed storage produces the approved safe state and observable error without crashing or false consent. | Failure tests | IN REVIEW — CR-001/CR-005 correction |
| CA-AC06 | CA-R06 | The approved default has no visible title, accessible name `Cookie notice`, the approved body copy, labels `I AGREE`/`FIND OUT MORE`, and `REJECT` only when enabled; all text is configurable plain text and raw HTML is unsupported. `FIND OUT MORE` defaults to `https://www.gmanetwork.com/privacypolicy/`; the NPC seal independently defaults to `https://www.gmanetwork.com/news/privacy-notice/`; each accepts an approved absolute HTTPS override. Long copy and absent artwork remain usable; all component assets are repository-local and versioned with no remote runtime asset loading. | Story/component/security tests and package inspection | IN REVIEW — CR-002/CR-006 correction |
| CA-AC07 | CA-R07 | Public types, source, and built output expose no GA/generic analytics functionality, callback, event mapping, import, global lookup, tag-management, script loading, or consent-mode behavior; functional decision callbacks remain analytics-neutral. | API/output inspection | PASS |
| CA-AC08 | CA-R08 | Surface has approved semantics/name, logical focus order, keyboard actions, and screen-reader announcements. | a11y/manual | PASS |
| CA-AC09 | CA-R08 | Approved viewport/zoom/long-copy matrix has reachable actions and no page overflow/covered essential controls. | Playwright/manual | PASS |
| CA-AC10 | CA-R09 | Server render/hydration has no mismatch or server storage/global access. | Next build/browser | PASS |
| CA-AC11 | CA-R10 | Source/output has no prohibited legacy/runtime dependency or Portal Header import, prop, style, rendering, lifecycle, or runtime-state coupling. | Static/review and independent consumer fixture | PASS |
| CA-AC12 | CA-R11 | Stories cover the scroll-threshold fixed-bottom surface, slide-up animation, default and Reject-enabled configurations, session-only Reject dismissal and refresh restoration, unknown, accepted, expired/version-mismatched, long-copy, mobile, storage-error, and reduced-motion states; artwork variants include the repository-local NPC seal, no-seal fallback, mobile/desktop layouts, both default destinations, independent custom HTTPS destinations, accessible linked-seal behavior, and no remote runtime loading. | Storybook inventory and a11y checks | IN REVIEW — CR-002/CR-003 correction |
| CA-AC13 | CA-R11 | Catalog documents policy ownership, configuration, persistence, actions, privacy, accessibility, and examples. | Catalog review | PASS |
| CA-AC14 | CA-R11 | Unit/a11y/package/Storybook/Next/Playwright checks pass, including privacy negative cases. | Quality commands | IN REVIEW — adjustment validation pending |
| CA-AC15 | CA-R11 | Packed artifact builds in plain JavaScript and TypeScript consent fixtures. | Consumer fixtures | IN REVIEW — CR-006 correction |
| CA-AC16 | CA-R12 | Migration guide defines `_ckn` treatment, policy-version behavior, revocation, and unsupported/deferred behavior. | Docs/privacy review | Pending |
| CA-AC17 | CA-R12 | Changelog records consumer/privacy impact, SemVer, migration, and evidence. | Release review | Pending |
| CA-AC18 | CA-R12 | The unchanged GitHub Actions `quality.yml` workflow passes its existing `npm run check` and `npm run pack:check` gate, and separately recorded local `npm run test:e2e` evidence passes for the same reviewed revision. | GitHub Actions and local Playwright evidence | Pending |
