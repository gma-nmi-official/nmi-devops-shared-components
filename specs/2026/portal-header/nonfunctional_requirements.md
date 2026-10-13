# Nonfunctional requirements: Portal Header

| ID | Area | Requirement/target | Validation | Owner | Approval |
| --- | --- | --- | --- | --- | --- |
| PH-NFR01 | Accessibility | WCAG 2.2 AA-oriented; no serious/critical axe findings; complete keyboard behavior | axe/manual | Accessibility owner | Pending |
| PH-NFR02 | Security | No `eval`, unsafe HTML, jQuery/global dependency, embedded credentials, or implicit external URL trust | Static/negative tests | Security | Pending |
| PH-NFR03 | Reliability | Missing/failing router adapters and invalid social/search configuration do not crash or block core navigation | Failure tests | Engineering | Pending |
| PH-NFR04 | SSR | No hydration mismatch or server access to browser globals | Next build/browser | Engineering | Pending |
| PH-NFR05 | Responsive | No page overflow at approved widths/200% zoom/long labels | Playwright/manual | Design/a11y | Pending |
| PH-NFR06 | Performance | Record packed/client baseline; threshold requires owner approval | Build measurement | Product | Pending |
| PH-NFR07 | Compatibility | React 19 baseline and approved Next/browser matrix pass | Matrix tests | Engineering | Pending |
| PH-NFR08 | Operations | Bitbucket CI runs full package/story/build/browser gate | Pipeline | Repository owner | Pending |

No availability target or bundle budget is invented before owner approval.
