# Acceptance criteria: Ads component

| ID | Requirement | Criterion | Validation | Status |
| --- | --- | --- | --- | --- |
| ADS-AC01 | ADS-R01 | Package exports `AdSlot`, format/provider types, and documented configuration without importing consumer globals. | Package/type fixtures | Pending |
| ADS-AC02 | ADS-R02 | `mrec` preset resolves the approved configurable sizes for each breakpoint, including the chosen MREC provider policy. | Unit/contract tests | Pending |
| ADS-AC03 | ADS-R02 | `leaderboard` selects the configured desktop/mobile units and sizes at each agreed breakpoint; a resize does not create duplicate slots. | Unit/browser tests | Pending |
| ADS-AC04 | ADS-R03 | Provider script loading and one-time initialization remain consumer-owned; package contains no live GPT or AllAccess loader. | Static/package inspection | Pending |
| ADS-AC05 | ADS-R03 | GPT/GAM adapter receives slot path, container element, size mapping, and approved targeting and calls provider APIs through its readiness queue. | Fake GPT adapter contract test | Pending |
| ADS-AC06 | ADS-R04, ADS-R07 | Mount, ready, fill, no-fill, provider failure, config replacement, and unmount produce deterministic state and only one owned slot. | Lifecycle tests | Pending |
| ADS-AC07 | ADS-R04 | Unmount destroys only the slot created by that component instance; other instances remain registered. | Multi-slot isolation test | Pending |
| ADS-AC08 | ADS-R05 | Consumer unit path, targeting, keywords, sizing, and lazy-load settings reach the adapter without mutation or package defaults containing production inventory data. | Contract/static tests | Pending |
| ADS-AC09 | ADS-R06 | Slot exposes an accessible, configurable ad label and has a reserved layout size derived from configured sizes. | Accessibility/render tests | Pending |
| ADS-AC10 | ADS-R06, ADS-R07 | No-fill follows explicit collapse/reserve configuration and does not leave a broken frame, console error, or unexpected layout jump. | Browser test | Pending |
| ADS-AC11 | ADS-R07, ADS-R12 | Provider not-ready/error/no-fill states are observable through documented state/callbacks and remain isolated to their slot. | Unit/component tests | Pending |
| ADS-AC12 | ADS-R08 | Server import/render performs no access to `window`, `document`, or provider globals and makes no ad request. | SSR/build tests | Pending |
| ADS-AC13 | ADS-R08 | Unit, Storybook, and Playwright fixtures use fake provider data and produce no production ad network traffic. | Network trace | Pending |
| ADS-AC14 | ADS-R09 | Component uses consumer-provided privacy/eligibility input and does not access user data or consent storage. | Static/privacy-negative tests | Pending |
| ADS-AC15 | ADS-R10 | Source and output do not depend on Portal Header, Cookie Agreement, Google Analytics, GTM, or news globals. | Static/package inspection | Pending |
| ADS-AC16 | ADS-R11 | Dedicated Storybook stories cover MREC and leaderboard formats, breakpoints, label, loading, filled, empty, and error states. | Storybook review | Pending |
| ADS-AC17 | ADS-R11 | Catalog and consumer guide document provider ownership, slot config, responsive sizing, targeting boundary, privacy input, SSR, and no-fill behavior. | Documentation review | Pending |
| ADS-AC18 | ADS-R12 | Typecheck, lint, unit/component, SSR, Storybook, build, pack, and Playwright checks pass at one revision before review. | Verification report | Pending |
