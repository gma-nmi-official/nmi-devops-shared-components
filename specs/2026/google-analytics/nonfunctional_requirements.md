# Nonfunctional requirements: Google Analytics

| ID | Area | Requirement/target | Validation | Owner | Status |
| --- | --- | --- | --- | --- | --- |
| GA-NFR01 | Privacy | Send no event without the approved consent/readiness state; collect only approved fields; in GTM mode, consumer GTM consent defaults/updates precede relevant tag firing | Privacy-negative transport spies and GTM setup review | Privacy/analytics owner | Pending |
| GA-NFR02 | Reliability | Missing transport, invalid input, callbacks, and transport failures do not crash consumers | Failure tests | Engineering | Pending |
| GA-NFR03 | Determinism | Payload merging, normalization, and call results are immutable and deterministic | Unit/property cases | Engineering | Pending |
| GA-NFR04 | SSR | Import and server execution do not access `window`, `document`, storage, or `gtag` | SSR/build tests | Engineering | Pending |
| GA-NFR05 | Security | No unsafe evaluation, embedded credentials/IDs, arbitrary script URL injection, or unvalidated prototype-bearing merge | Static/negative tests | Security | Pending |
| GA-NFR06 | Performance | Record package/client size and event-call overhead; approve limits before release | Build/benchmark evidence | Product/engineering | Pending |
| GA-NFR07 | Compatibility | Approved JavaScript/TypeScript, Next.js, browser, direct-gtag, GTM, package, and SSR consumer fixtures pass | Consumer matrix | Architecture | Pending |
| GA-NFR08 | Observability | Debug/error hooks and call results expose sent/queued/dropped/failed behavior without leaking user data | Unit/harness tests | Analytics owner | Pending |
| GA-NFR09 | Operations | Bitbucket CI runs package, SSR, Storybook, compatibility, and browser gates | Pipeline | Repository owner | Pending |

This package does not claim privacy-law compliance or GA data-quality approval. Those decisions remain with the named privacy and analytics owners.
