# Readable code formatting implementation plan

## Approved compact path

The user approved one compact delivery unit on 2026-10-27 Asia/Shanghai. It
combines requirements, workflow enhancement, implementation, and verification
records while preserving the independent-review and Git approval gates.

## Delivery unit RCF-DU1

1. Update Forge and Argus skills/configuration with explicit indentation and
   intentional-newline guidance.
2. Reformat the published Portal Header, Cookie Agreement, Ad Slot, and Google
   Analytics sources plus their stories and catalog previews.
3. Reformat deployed home/catalog/Storybook sources and shared/public CSS.
4. Update the Unreleased changelog with behavior-neutral consumer impact.
5. Run whitespace, type, lint, unit, consumer, size, Storybook, Next.js,
   GitHub Pages export, and Playwright regression checks.
6. Hand the tested diff to independent Argus. Do not commit, push, create a PR,
   merge, release, or deploy without later approvals.

## Compatibility and rollback

No compatibility change is intended. Rollback is a path-scoped reversion of this
delivery after approval; no data, schema, service, or deployment migration exists.
