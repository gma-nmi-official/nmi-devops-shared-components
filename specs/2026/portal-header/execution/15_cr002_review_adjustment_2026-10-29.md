# Portal Header CR-002 review adjustment

## Scope

The attached review identified CR-001 (catalog overflow) and CR-002 (custom
social icon names). CR-001 is stale against current `master`: the referenced
`.catalog__usage` and `.catalog__entry` selectors no longer exist, and the
current catalog/PortalHeader overflow coverage passes at 320px. CR-002 remains
valid in the current implementation.

## Finding and correction

`PortalHeaderSocialIcon` previously indexed a plain object with arbitrary
consumer strings. Names such as `constructor`, `toString`, and `__proto__`
could resolve inherited values instead of the generic link icon and cause a
rendering exception.

The resolver now checks that the icon name is an own key before indexing the
map; unknown names use the Font Awesome link fallback. The Storybook
`FailureFallbacks` state and the unit regression test both exercise
`icon: "constructor"`.

## Validation

- PortalHeader unit/accessibility suite: 14/14 passed.
- Full Vitest suite: 74/74 passed across 9 test files.
- TypeScript typecheck: passed.
- ESLint: passed.
- Current Playwright suite: 48/48 passed, including `/catalog` and
  `/catalog/portal-header` page-overflow checks and PortalHeader widths from
  320px through 1440px on desktop/mobile Chromium.
- `git diff --check`: passed.

## Delivery

This is a focused follow-up correction for the already merged Portal Header.
The `.playwright-mcp/` user-owned files remain excluded. The report, source,
test, and Storybook changes are intended for `feature/portal-header`; PR
creation and merge remain owner actions.
