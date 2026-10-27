# Readable code formatting implementation and verification

## Context

- Role sequence: Atlas coordination, local Forge implementation, local Vera
  verification; independent Argus review remains separate and pending.
- Approval: RCF-A01, user decision `Proceed` on 2026-10-27 Asia/Shanghai.
- Base: `master` at `e2ccde05efbe998b2a33d7eb97b28cccfec1eb83`.
- Objective: make indentation/newline readability explicit and apply it across
  all published components and deployed public documentation without behavior
  changes.

## Implementation

- Updated Forge implementation instructions and agent definitions with explicit
  indentation, nesting, ownership, control-flow, JSX, CSS, and newline rules.
- Updated Argus coding-format guidance and mirrored agent instructions so the
  same concerns receive a separate readability review.
- Reformatted Portal Header, Cookie Agreement, Ad Slot, and Google Analytics
  sources, stories, and catalog previews.
- Expanded deployed home/catalog/Storybook JSX and converted shared/public CSS
  from compressed rules to indented declarations while preserving order.
- Added the `CatalogParameter` presentation helper to replace repeated dense
  catalog markup; output semantics and browser behavior remain covered by the
  existing end-to-end suite.
- Updated the Unreleased changelog. Package versions and lockfile were not
  changed because no release or consumer behavior change is intended.

## Validation evidence

| Check | Result |
| --- | --- |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run check` outside the restricted sandbox | PASS: 73 unit tests, six consumer fixtures, lint/typecheck, Storybook, Next.js build, and both size gates |
| Ad Slot compiled size | PASS: 18,410 / 20,480 bytes |
| Google Analytics compiled size | PASS: 16,380 / 16,384 bytes |
| GitHub Pages environment `npm run build` | PASS: static `/`, `/catalog`, and `/docs` routes |
| `npm run test:e2e` | PASS: 32/32 Chromium desktop/mobile cases |
| `git diff --check` | PASS |

The first full-check attempt reached the analytics size gate at 16,865 bytes.
Formatting was tightened without changing the 16 KiB limit or runtime logic.
The next sandboxed full check reached Vitest but failed with `spawn EPERM`; the
same command was rerun outside the restricted sandbox and passed. Storybook and
consumer builds continue to emit their existing non-fatal `use client` bundler
warnings.

## Risks and review status

- The analytics module has four bytes of remaining budget. The gate passes, but
  future implementation must continue to monitor it.
- No runtime manual QA is required for this formatting-only unit; the independent
  readability inspection cases remain pending in `manual_testing.md`.
- This implementing session does not claim independent review. Argus must review
  the final diff before commit readiness.
- No commit, push, PR, merge, release, or deployment action was performed or is
  authorized.
