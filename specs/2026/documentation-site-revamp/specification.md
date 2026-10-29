# Specification: documentation site revamp

## Business intent

- Problem and affected users: package consumers currently land on a serviceable
  home page and then enter one long mixed catalog page. They cannot navigate
  directly to a complete guide for one component or integration.
- Desired outcome and measurable success criteria: present a professional,
  branded documentation home at `/`; expose every public catalog entry from
  that page; and provide a dedicated, statically generated setup and usage guide
  for each entry.
- Business decision owner: repository owner / user.
- Source request: 2026-10-27 request to revamp `/`, give each component its own
  guide/installation/setup page, and update the favicon. APR-004 supersedes the
  original icon source and adds the official NMI logo from `www.gmanmi.com`.

## Scope and exclusions

In scope:

- A refreshed documentation-site shell and home page at `/`.
- A component index at `/catalog`.
- Dedicated guides for Portal Header, Cookie Agreement, Ad Slot, and Google
  Analytics under `/catalog/<slug>`.
- Local use of the requested GMA New Media favicon through the Next.js
  `app/favicon.ico` convention and the supplied NMI SVG in the shared shell.
- Route metadata, responsive styling, accessible navigation, test updates, and
  repository consumer-documentation updates required by the new route model.

Out of scope:

- Changes to published package APIs, component behavior, component styles, or
  Storybook stories; no component is changing in this delivery unit.
- Authentication, search indexing, a CMS, analytics collection, or server-side
  data fetching for the documentation site.
- Package version, lockfile version, package release, or `CHANGELOG.md` changes;
  this is a documentation application change, not a published-package change.
- Commit, push, pull request, merge, or deployment without their later,
  separately required approvals.

## Affected repositories and current context

- Repository: `D:\gno-node-projects\gno-shared-components-v2`.
- Stack: Next.js 16.4.2 App Router, React 19.2.8, TypeScript 5, static GitHub
  Pages export, Playwright end-to-end coverage.
- Current branch at specification time:
  `feature/ads-storybook-realistic-data` at
  `e8b09639b2ddf46b084f74ed4ff700c00c4ca3ca`, two commits ahead of `master`.
  Source implementation must use a dedicated feature branch after the current
  branch is resolved; the branch decision is not part of requirements approval.
- Existing interactive Storybook remains available through `/docs`.

## Constraints, dependencies, and operational owner

- The production site must continue to build with `output: "export"`,
  `trailingSlash: true`, and `NEXT_PUBLIC_BASE_PATH` for GitHub Pages.
- All guide content must be repository-local and available without a runtime
  content service.
- Both brand assets must be copied into the repository; the deployed site must
  not depend on the remote image host at runtime.
- On 2026-10-28, the supplied logo and favicon URLs returned HTTP 200. The logo
  was `image/svg+xml` and 7,102 bytes; the favicon was
  `image/vnd.microsoft.icon` and 1,150 bytes.
- GitHub Pages deployment remains owned by the repository owner after approved
  PR review and merge to `master`.

## Delivery endpoint

Validated and independently reviewed pull-request handoff. Final merge and
deployment remain owner actions.

## Approval status

Requirements and development, including the asset refinement, are approved in
[approvals.md](approvals.md).
