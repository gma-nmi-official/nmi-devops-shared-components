# Test plan: Ads component

## Strategy

- Use a fake GPT/provider adapter and synthetic unit paths; never request production ads in unit, Storybook, or Playwright runs.
- Verify slot configuration, responsive sizes, targeting pass-through, lifecycle isolation, no-fill behavior, and cleanup.
- Test SSR separately so browser globals are accessed only after client mount.
- Use Storybook to demonstrate all supported formats and states; create standalone `manual_testing.md` during verification.

## Coverage

| Area | Scenarios | Expected |
| --- | --- | --- |
| Configuration | Required format/provider/unit, invalid sizes/targeting, defaults/overrides | Validated config; no embedded production IDs |
| MREC | Below/above 1200 px, custom sizes, provider path choice | Approved MREC map and one slot |
| Leaderboard | Mobile, 993–1280 desktop, wide desktop; unit switch and resize | Correct configured desktop/mobile unit and sizes; no duplicate slot |
| Provider readiness | GPT command queue ready now/late, provider missing | One display after ready or observable failure |
| Lifecycle | Mount, update, replacement, unmount, multiple slots | Only owned slot created/destroyed; no leakage |
| Targeting | Approved section/page data, keywords, empty/invalid values | Passed through as configured; no package-generated targeting |
| No-fill | Reserve-space and collapse policy, ad blocker, provider error | Explicit empty result; surrounding layout remains stable |
| Privacy | Not eligible/unknown/eligible transitions | No unauthorized slot request; consumer state controls behavior |
| SSR | Server render, hydration, import | No `window`/GPT access on server; no request |
| Accessibility | Label customization, semantic role/name, focus behavior | Slot is identifiable and does not create an unexpected focus target |
| Storybook/docs | All formats and states, examples, package exports | Stories and documentation match supported API |
| Network | Full harness/browser run | No production ad requests or partner scripts |

## Exit criteria

All applicable acceptance criteria pass at the same revision; privacy and monetization owners resolve provider, sizing, no-fill, and targeting decisions; manual QA is complete; Storybook/catalog/consumer docs are current; and independent review has no open required finding.
