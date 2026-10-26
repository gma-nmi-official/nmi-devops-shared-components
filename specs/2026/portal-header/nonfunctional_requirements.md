# Nonfunctional requirements: Portal Header

| ID | Area | Requirement/target | Validation | Owner | Approval |
| --- | --- | --- | --- | --- | --- |
| PH-NFR01 | Accessibility | WCAG 2.2 AA-oriented; no serious/critical axe findings; complete keyboard behavior | axe/manual | Accessibility owner | Approved by PH-A10 |
| PH-NFR02 | Security | No `eval`, unsafe HTML, jQuery/global dependency, embedded credentials, or implicit external URL trust | Static/negative tests | Security | Approved by PH-A10 |
| PH-NFR03 | Reliability | Missing/failing router adapters and invalid social/search configuration do not crash or block core navigation | Failure tests | Engineering | Approved by PH-A10 |
| PH-NFR04 | SSR | No hydration mismatch or server access to browser globals | Next build/browser | Engineering | Approved by PH-A10 |
| PH-NFR05 | Responsive | No page overflow at 320/375/768/1024/1440 CSS pixels, 200% zoom, or with long labels | Playwright/manual | Design/a11y | Approved by PH-A10 |
| PH-NFR06 | Performance | Record packed/client baseline and selected Font Awesome contribution; no unapproved hard threshold | Build measurement | Product | Approved by PH-A10 |
| PH-NFR07 | Compatibility | React 19 and Next.js 16 pass; for this delivery, configured Playwright Chromium plus installed Windows Chrome `155.0.8059.85` and Edge `155.0.4283.62` pass desktop/mobile checks. Firefox, Safari, and second-version coverage are deferred residual risk | Matrix tests | Engineering | Revised by PH-A21 |
| PH-NFR08 | Operations | GitHub Actions runs the repository's approved release checks for the exact tagged revision | GitHub Actions | Repository owner | Approved by PH-A10 |

No availability target or hard bundle budget is approved. Record measured baselines for future decisions.
