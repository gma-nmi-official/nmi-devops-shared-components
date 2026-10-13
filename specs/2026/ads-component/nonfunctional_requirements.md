# Nonfunctional requirements: Ads component

| ID | Area | Requirement/target | Validation | Owner | Status |
| --- | --- | --- | --- | --- | --- |
| ADS-NFR01 | Privacy | Use only consumer-approved eligibility and targeting; no cookie/storage access or user profiling in the package | Privacy-negative tests | Privacy/monetization owner | Pending |
| ADS-NFR02 | Reliability | Provider readiness, no-fill, errors, resize, and unmount do not crash the page or duplicate slots | Lifecycle/failure tests | Engineering | Pending |
| ADS-NFR03 | SSR | Server render/import does not access browser or ad globals and does not request ads | SSR/build tests | Engineering | Pending |
| ADS-NFR04 | Performance | Reserve predictable slot space and record component/provider overhead; approve numeric budgets before release | Browser/size report | Product/engineering | Pending |
| ADS-NFR05 | Accessibility | Provide a semantic container and configurable visible or screen-reader ad label; avoid focus traps | Accessibility review | Accessibility owner | Pending |
| ADS-NFR06 | Compatibility | Next.js 16.3.8, React 19.2.8, installed browser/test stack and approved breakpoints are supported | Consumer matrix | Architecture | Pending |
| ADS-NFR07 | Security | No arbitrary script URL, HTML injection, or unvalidated provider configuration | Static/negative tests | Security | Pending |
| ADS-NFR08 | Operations | CI covers typecheck, lint, tests, build, Storybook, package inspection, and browser behavior with a fake provider | Pipeline | Repository owner | Pending |

The component does not claim ad policy, legal, privacy, viewability, or monetization compliance. Those approvals remain with the named consumer and business owners.
