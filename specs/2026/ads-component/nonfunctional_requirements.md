# Nonfunctional requirements: Ads component

| ID | Area | Requirement/target | Validation | Owner | Status |
| --- | --- | --- | --- | --- | --- |
| ADS-NFR01 | Privacy | Use only consumer-approved eligibility and targeting; no cookie/storage access or user profiling in the package | Privacy-negative tests | Privacy/monetization owner | Approved target; validation pending |
| ADS-NFR02 | Reliability | Provider readiness, no-fill, errors, resize, and unmount do not crash the page or duplicate slots | Lifecycle/failure tests | Engineering | Approved target; validation pending |
| ADS-NFR03 | SSR | Server render/import does not access browser or ad globals and does not request ads | SSR/build tests | Engineering | Approved target; validation pending |
| ADS-NFR04 | Performance | No server/disabled request, one live handle per instance, 100 ms resize debounce, no duplicate request for unchanged rule signature, and compiled ads modules at most 8 KiB gzip excluding React/GPT (raw bytes are reported for observability) | Browser/lifecycle/size report | Product/engineering | Superseded by ADS-A10; validation recorded in execution 16 |
| ADS-NFR05 | Accessibility | Provide a semantic container and configurable visible or screen-reader ad label; avoid focus traps | Accessibility review | Accessibility owner | Approved target; validation pending |
| ADS-NFR06 | Compatibility | Next.js 16.4.2, React 19.2.8, SSR, React Strict Mode, and repository Chromium desktop/mobile Playwright projects; broader browsers require separate approval/evidence | Consumer matrix | Architecture | Approved target; validation pending |
| ADS-NFR07 | Security | No arbitrary script URL, HTML injection, or unvalidated provider configuration | Static/negative tests | Security | Approved target; validation pending |
| ADS-NFR08 | Operations | CI covers typecheck, lint, tests, build, Storybook, package inspection, and browser behavior with a fake provider | Pipeline | Repository owner | Approved target; validation pending |

The component does not claim ad policy, legal, privacy, viewability, or monetization compliance. Those approvals remain with the named consumer and business owners.
