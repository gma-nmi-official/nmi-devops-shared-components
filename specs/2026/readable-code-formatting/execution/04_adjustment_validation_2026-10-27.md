# Review-adjustment implementation and validation

## Context and approval

- Approval: RCF-A02, user decision `Proceed with the adjustments` on
  2026-10-27 Asia/Shanghai.
- Scope: RCF-ADJ01 and RCF-ADJ02 only.
- Findings addressed: RCF-REV01 and RCF-REV02.

## Corrections

### RCF-ADJ01

- `CatalogParameter` now accepts one or more parameter-name strings.
- Each parameter name renders in its own `<code>` element with plain-text `and`
  separators, preserving the original semantic and styling structure.
- Added a Playwright assertion for both paired Portal Header rows, including two
  code elements and no code element containing the separator.

### RCF-ADJ02

- Expanded the default/custom dimension loops, GTM/consent/video/callback
  validation conditions, scroll-dimension update, successful-scroll recording,
  and granted-consent flush into readable blocks.
- Renamed private parameters and queue fields to concise conventional names to
  retain compiled-size headroom without changing public APIs or behavior.
- Preserved the unchanged 16,384-byte Google Analytics limit.

## Validation

| Check | Result |
| --- | --- |
| `npm test -- packages/ui/src/analytics/google-analytics` | PASS: 17/17 tests |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm run size:analytics` | PASS: 16,369 / 16,384 bytes |
| `npm run check` | PASS: 73/73 unit tests, six consumer fixtures, sizes, lint/typecheck, Storybook, and Next.js build |
| `npm run test:e2e` | PASS: 34/34 Chromium desktop/mobile cases |
| GitHub Pages environment `npm run build` | PASS: static `/`, `/catalog`, and `/docs` routes |
| `git diff --check` | PASS |

Existing non-fatal Storybook/consumer `use client` warnings remain unchanged.
No dependency, package version, public API, CSS declaration, workflow, release,
or deployment change was introduced by the adjustments.

## Handoff

Return the corrected dirty candidate to independent Argus for confirmation of
RCF-REV01 and RCF-REV02. Commit, push, PR, merge, release, and deployment remain
unapproved.
