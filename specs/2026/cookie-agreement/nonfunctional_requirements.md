# Nonfunctional requirements: Cookie Agreement

| ID | Area | Requirement/target | Validation | Owner | Approval |
| --- | --- | --- | --- | --- | --- |
| CA-NFR01 | Privacy | Only the approved consent record is stored after an explicit decision; the component contains no analytics/tag-manager behavior or analytics event payload | Storage/browser spies and output inspection | Privacy owner | Pending |
| CA-NFR02 | Accessibility | WCAG 2.2 AA-oriented; no serious/critical axe findings; keyboard/screen-reader behavior complete | axe/manual | Accessibility owner | Pending |
| CA-NFR03 | Security | No unsafe HTML, `eval`, jQuery/global dependency, embedded credentials, or implicit external URL trust | Static/negative tests | Security | Pending |
| CA-NFR04 | Reliability | Storage and functional decision-callback failures do not crash or falsely record consent | Failure tests | Engineering/privacy | Pending |
| CA-NFR05 | SSR | No hydration mismatch or server access to browser storage/globals | Next build/browser | Engineering | Pending |
| CA-NFR06 | Responsive | Long approved copy/actions remain usable at approved widths/200% zoom without page overflow | Playwright/manual | Design/a11y | Pending |
| CA-NFR07 | Compatibility | React 19 baseline and approved Next/browser/storage matrix pass | Matrix tests | Engineering | Pending |
| CA-NFR08 | Operations | Bitbucket CI runs full package/story/build/browser/privacy-negative gate | Pipeline | Repository owner | Pending |

This plan does not claim legal compliance. Privacy/legal ownership and measurable policy requirements are mandatory before implementation approval.
