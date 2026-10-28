# Solution design: documentation site revamp

- Requirements and acceptance criteria: [requirements.md](requirements.md) and
  [acceptance_criteria.md](acceptance_criteria.md).
- Repository baseline / architecture: Next.js 16.4.2 App Router application
  deployed as a GitHub Pages static export; Storybook is built under
  `public/storybook` and surfaced by `/docs`.
- Design owner: Athena; implementation owner after approval: Forge.

## Changed behavior and interfaces

### Information architecture

```text
/
├─ /catalog
│  ├─ /catalog/portal-header
│  ├─ /catalog/cookie-agreement
│  ├─ /catalog/ad-slot
│  └─ /catalog/google-analytics
└─ /docs (existing Storybook frame)
```

- `/` becomes the primary orientation and discovery surface.
- `/catalog` becomes a concise component/integration index instead of the sole
  long-form mixed guide.
- `/catalog/[slug]` renders a repository-backed guide from a typed guide registry.
  `generateStaticParams` enumerates all four slugs and `dynamicParams = false`
  prevents undocumented runtime paths. Next.js 16.4.2 documents this as the
  supported App Router approach for static dynamic routes.
- `/docs` remains unchanged except for navigation into it from the new shell.

### Content model

A typed, server-safe catalog registry will own stable metadata shared by home,
index, static params, metadata, and guide pages:

- slug, display name, category (`component` or `integration`), short summary;
- package import name and installation/setup snippets;
- prerequisites and consumer-owned responsibilities;
- configuration groups and operational/accessibility/security notes;
- Storybook deep link and repository-document references;
- optional preview identifier/component.

Guide prose stays explicit and reviewed per entry; the data model must not turn
rich content into unsafe HTML. JSX/React nodes or structured fields are preferred
to `dangerouslySetInnerHTML`.

### Presentation

- Create a reusable documentation shell with skip link, branded header,
  responsive navigation, bounded content width, and footer.
- Render the official NMI dark-background SVG in the branded home link. Keep the
  image decorative because the enclosing link supplies the accessible name.
- Use the existing palette as a base but formalize page tokens for background,
  surface, text, muted text, border, focus, primary blue, and GMA red accent.
- Use system fonts only; no new font or runtime asset dependency.
- Use cards for discovery and a two-column guide layout where space permits:
  sticky local table of contents plus readable main content. Collapse to one
  column at narrow widths.
- Code examples use semantic `pre > code`, wrap/scroll within their own region,
  and never cause page-level overflow.

### Brand assets and metadata

- Download both APR-004 user-provided assets once during approved
  implementation. Store the logo at `public/nmi-logo-dark-bg.svg` and replace
  `app/favicon.ico` with the supplied ICO binary.
- Record source URLs, retrieval date, content types, byte sizes, and SHA-256
  values in implementation evidence. The verified 2026-10-28 responses were
  HTTP 200: `image/svg+xml`, 7,102 bytes and `image/vnd.microsoft.icon`, 1,150
  bytes respectively.
- Rely on the documented Next.js root `app/favicon.ico` file convention. Do not
  add a remote `<link rel="icon">`.
- Use static root/index metadata and `generateMetadata` for the guide registry so
  each route has an accurate title and description at build time.

## Decisions

| ID | Requirement | Decision | Alternatives considered | Rationale / tradeoff | Approval reference |
| --- | --- | --- | --- | --- | --- |
| D-001 | R-003, R-005 | Keep `/catalog` and add `/catalog/[slug]`. | Replace catalog with `/components`; four unrelated top-level routes. | Preserves established links and gives a scalable hierarchy. | APR-003 |
| D-002 | R-003, R-006 | Use a typed registry plus `generateStaticParams`; disable unknown params. | Four copied route files. | One inventory powers discovery, metadata, and build-time routes with less drift; requires disciplined structured content. | APR-003 |
| D-003 | R-001, R-008 | Use a shared docs shell and design tokens in the current global stylesheet. | Introduce a UI framework or CSS-in-JS dependency. | Matches the small static site and adds no runtime dependency. | APR-003 |
| D-004 | R-007 | Store the supplied favicon locally at `app/favicon.ico`. | Runtime remote icon; generated icon. | Follows Next.js convention and removes availability/privacy dependency on the image CDN. | APR-003, refined by APR-004 |
| D-005 | R-004, R-010 | Move each existing preview to its matching guide and keep previews local/fake. | Remove previews; embed live providers. | Retains useful demonstrations without production network effects. | APR-003 |
| D-006 | R-013 | Store the supplied SVG locally and render it through `next/image` with the configured base path. | Runtime remote image; recreated wordmark. | Preserves the official artwork, works in GitHub Pages exports, and avoids a runtime host dependency. | APR-004 |

## Migration and recovery

- Existing `/catalog` remains valid, so no redirect is required (static exports
  do not support Next.js redirects).
- Existing deep hash links are not public API guarantees. Where practical,
  `/catalog` will retain a `setup` anchor pointing users to installation guidance,
  and README links will be updated to the new stable route model.
- Rollback is a source revert of this delivery unit plus restoration of the prior
  favicon. There is no data migration, database change, or server state.

## Delivery units and dependencies

See [wbs.md](wbs.md). Units are ordered shell/data model, pages and content,
favicon/metadata, then regression/documentation integration. All units form one
reviewed PR candidate.

## Open questions and development approval

No design-blocking question remains. Requirements and development were approved
by APR-002 and APR-003; brand assets were refined by APR-004, owner visual
acceptance was recorded by APR-005, and review corrections are approved by
APR-006 in [approvals.md](approvals.md).
