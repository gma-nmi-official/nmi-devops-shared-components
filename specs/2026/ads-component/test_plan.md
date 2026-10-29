# Test plan: Ads component

## Strategy

- Use a fake GPT/provider adapter and synthetic unit paths; never request production ads in unit, Storybook, or Playwright runs.
- Verify slot configuration, responsive sizes, targeting pass-through, lifecycle isolation, no-fill behavior, and cleanup.
- Test SSR separately so browser globals are accessed only after client mount.
- Use Storybook to demonstrate all supported formats and states; create standalone `manual_testing.md` during verification.

## Coverage

| Area | Scenarios | Expected |
| --- | --- | --- |
| Configuration | Required format/provider/unit, missing/empty/invalid consumer sizes, targeting, and disabled rules | Active rules require consumer sizes; no embedded size or production inventory defaults |
| Rule resolver | Empty, malformed, overlapping/gapped, boundary, and immutable responsive rules | Invalid config is rejected; each supported width resolves exactly one rule |
| MREC | Below/above 1200 px, consumer sizes, provider path choice | Consumer-configured MREC map and one slot; no inferred sizes |
| Leaderboard | Mobile, 993–1280 desktop, wide desktop; unit switch and resize burst | Correct configured unit path and sizes; 100 ms proposed debounce; prior slot destroyed before replacement; no duplicate slot |
| Custom display | Footer leaderboard and synthetic non-preset dimensions | Same standard slot lifecycle without package inventory defaults |
| Provider readiness | GPT command queue ready now/late, provider missing, render-event filtering/listener removal, stale async completion | One display after ready or observable failure; no event/listener leakage |
| Lifecycle | Mount, Strict Mode remount, update, replacement, unmount, multiple slots | Only owned slot created/destroyed; no leakage |
| Targeting | Approved section/page data, keywords, empty/invalid values | Passed through as configured; no package-generated targeting |
| No-fill | Reserve-space and collapse policy, ad blocker, provider error | Explicit empty result; surrounding layout remains stable |
| Privacy | Disabled/enabled transitions | No provider call while disabled; consumer state controls behavior |
| GPT ownership | Consumer bootstrap plus multiple component slots | Service initialization/lazy configuration occurs once outside slots |
| SSR | Server render, hydration, import | No `window`/GPT access on server; no request |
| Accessibility | Label customization, semantic role/name, focus behavior | Slot is identifiable and does not create an unexpected focus target |
| Storybook/docs | All formats and states, examples, package exports | Stories and documentation match supported API |
| Network | Full harness/browser run | No production ad requests or partner scripts |
| Package size | Compiled ads modules excluding React/GPT | Proposed uncompressed total is at most 20 KiB |

## Exit criteria

All applicable acceptance criteria and approved ADS-A04 decisions pass at the same release-complete revision; manual QA is complete; Storybook/catalog/consumer docs, version, lockfile, and changelog are current; and independent review has no open required finding.
