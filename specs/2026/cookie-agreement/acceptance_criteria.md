# Acceptance criteria: Cookie Agreement

| ID | Requirement | Criterion | Validation | Status |
| --- | --- | --- | --- | --- |
| CA-AC01 | CA-R01 | Package exports standalone runtime, types, and CSS that a consumer can import and render without importing Portal Header; packed files are intentional. | Build/pack and consumer fixture | Pending |
| CA-AC02 | CA-R02 | Unknown/required state displays; valid current record suppresses; expired/version-mismatched record requires a decision. | State/storage tests | Pending |
| CA-AC03 | CA-R03 | Only an explicit approved action records consent; scroll, route change, timeout, and unrelated clicks do not. | Browser negative tests | Pending |
| CA-AC04 | CA-R04 | Records contain approved version/status/categories/timestamps/expiry and reject invalid transitions. | Contract tests | Pending |
| CA-AC05 | CA-R05 | Missing, malformed, read/write/clear-failed storage produces the approved safe state and observable error without crashing or false consent. | Failure tests | Pending |
| CA-AC06 | CA-R06 | Approved copy/actions/privacy URL/seal are configurable; long copy and absent artwork remain usable; all component assets are repository-local and versioned; no raw HTML API or remote runtime asset loading exists. | Story/component tests and package inspection | Pending |
| CA-AC07 | CA-R07 | Public types, source, and built output expose no GA/generic analytics callback, event mapping, import, global lookup, tag-management, or consent-mode behavior; functional decision callbacks remain analytics-neutral. | API/output inspection | Pending |
| CA-AC08 | CA-R08 | Surface has approved semantics/name, logical focus order, keyboard actions, and screen-reader announcements. | a11y/manual | Pending |
| CA-AC09 | CA-R08 | Approved viewport/zoom/long-copy matrix has reachable actions and no page overflow/covered essential controls. | Playwright/manual | Pending |
| CA-AC10 | CA-R09 | Server render/hydration has no mismatch or server storage/global access. | Next build/browser | Pending |
| CA-AC11 | CA-R10 | Source/output has no prohibited legacy/runtime dependency or Portal Header import, prop, style, rendering, lifecycle, or runtime-state coupling. | Static/review and independent consumer fixture | Pending |
| CA-AC12 | CA-R11 | Stories cover every approved status/action, long copy, mobile, storage error, and reduced-motion state. | Storybook inventory | Pending |
| CA-AC13 | CA-R11 | Catalog documents policy ownership, configuration, persistence, actions, privacy, accessibility, and examples. | Catalog review | Pending |
| CA-AC14 | CA-R11 | Unit/a11y/package/Storybook/Next/Playwright checks pass, including privacy negative cases. | Quality commands | Pending |
| CA-AC15 | CA-R11 | Packed artifact builds in plain JavaScript and TypeScript consent fixtures. | Consumer fixtures | Pending |
| CA-AC16 | CA-R12 | Migration guide defines `_ckn` treatment, policy-version behavior, revocation, and unsupported/deferred behavior. | Docs/privacy review | Pending |
| CA-AC17 | CA-R12 | Changelog records consumer/privacy impact, SemVer, migration, and evidence. | Release review | Pending |
| CA-AC18 | CA-R12 | Approved Bitbucket pipeline passes the complete release gate. | CI evidence | Pending |
