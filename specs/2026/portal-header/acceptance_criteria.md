# Acceptance criteria: Portal Header

| ID | Requirement | Criterion | Validation | Status |
| --- | --- | --- | --- | --- |
| PH-AC01 | PH-R01 | Package exports runtime, declarations, and documented CSS; packed files are intentional. | Build/pack inspection | Pending |
| PH-AC02 | PH-R02 | Consumer fixture renders approved branding, navigation links, and social links from props using repository-local, versioned assets without remote runtime asset loading. | Component/browser and package inspection | Pending |
| PH-AC03 | PH-R02 | Current/disabled/external links behave safely; `_blank` links use approved `rel`. | DOM/security tests | Pending |
| PH-AC04 | PH-R03, PH-R08 | Menu operates by keyboard, exposes state/controlled region, closes by approved Escape/outside behavior, and restores focus. | Interaction/a11y | Pending |
| PH-AC05 | PH-R03 | Approved viewport/zoom/long-label matrix has reachable controls and no page overflow. | Playwright/manual | Pending |
| PH-AC06 | PH-R04 | Search configuration is consumer-owned; blank input is blocked and valid submission occurs once. | Unit/browser | Pending |
| PH-AC08 | PH-R06 | Public types, source, and built output expose no GA/generic analytics callback, event mapping, import, global lookup, or consent-mode behavior. | API and output inspection | Pending |
| PH-AC09 | PH-R07 | Anchors work by default and Next.js showcase adapter builds without package-private imports. | Integration/build | Pending |
| PH-AC10 | PH-R08 | axe has no serious/critical violations and manual keyboard/screen-reader checks pass. | Automated/manual QA | Pending |
| PH-AC11 | PH-R09 | Server rendering/hydration completes without mismatch or browser-global error. | Next build/browser | Pending |
| PH-AC12 | PH-R10 | Source/output has no prohibited legacy/runtime dependency. | Static/review | Pending |
| PH-AC13 | PH-R11 | Dedicated stories cover desktop/mobile, drawer, navigation, social links, search, long content, theme, and failure states. | Storybook build/inventory | Pending |
| PH-AC14 | PH-R11 | Catalog entry contains preview, supported states, installation/import/configuration, accessibility, and Storybook link. | Catalog review | Pending |
| PH-AC15 | PH-R11 | Unit, a11y, package, Storybook, Next, and Playwright checks pass. | Quality commands | Pending |
| PH-AC16 | PH-R11 | Packed artifact builds in plain JavaScript and TypeScript fixtures. | Consumer fixtures | Pending |
| PH-AC17 | PH-R12 | Migration guide maps legacy modes, navigation links, social links, and search and lists deferred behavior. | Docs review | Pending |
| PH-AC18 | PH-R12 | Changelog includes consumer impact, SemVer, migration, and evidence. | Release review | Pending |
| PH-AC19 | PH-R12 | Approved Bitbucket pipeline passes the full release candidate gate. | CI evidence | Pending |
