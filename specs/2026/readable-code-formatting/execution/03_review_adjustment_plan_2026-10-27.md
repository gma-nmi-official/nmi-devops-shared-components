# Review-adjustment plan

## Approval requested

Approve only the corrections below for RCF-REV01 and RCF-REV02. Approval would
authorize Forge implementation and Vera validation within this exact scope,
followed by independent Argus confirmation. It would not authorize commit, push,
PR, merge, release, or deployment.

## Corrections

### RCF-ADJ01 — preserve paired catalog prop semantics

- Update `CatalogParameter` to accept one or more prop names and render each name
  in its own `<code>` element with plain-text `and` separators.
- Keep every existing catalog label and description unchanged.
- Add a focused assertion that each paired Portal Header row contains two code
  elements and a non-code separator.

### RCF-ADJ02 — complete analytics readability within 16 KiB

- Expand the flagged dimension loops, Boolean validation conditions, and
  conditional state updates.
- Prefer a focused named helper or equivalent readable structure if it creates
  enough compiled-size headroom; do not rename public APIs, weaken validation,
  change errors, or raise/alter the 16 KiB limit.
- Preserve ordering, normalization, dimension defaults, scroll deduplication,
  and every transport/consent behavior.

## Validation plan

1. Run focused catalog and Google Analytics unit tests.
2. Run `npm run size:analytics`; the unchanged 16,384-byte limit must pass.
3. Run `npm run typecheck`, `npm run lint`, and `npm run check`.
4. Run GitHub Pages static export and the relevant catalog/analytics Playwright
   regression suite; expand to the full suite if filtering would omit shared
   page behavior.
5. Run `git diff --check` and hand the corrected diff to independent Argus.

No unrelated formatting, dependency, version, API, test-expectation, workflow,
or deployment change is included.
