# Requirements: Public Storybook documentation

## Requirements

| ID | Requirement | Source | Acceptance Link | Status |
| --- | --- | --- | --- | --- |
| R-001 | Generate Storybook as part of the application's production build and include it in the same deployable artifact. | User clarification | AC-001, AC-010 | Approved SB-A01 |
| R-002 | Give first-time visitors a friendly landing page that states what the library is, who it serves, what is available, and where to begin. | User request | AC-002 | Approved SB-A01 |
| R-003 | Organize navigation in a predictable order: Overview, Guides, then Components. | Friendly/understandable outcome | AC-003 | Approved SB-A01 |
| R-004 | Give every component exported by the package a curated page covering purpose, when to use it, installation/import, a basic example, supported states, configuration, accessibility, responsive behavior, and limitations. | Repository policy and user clarification | AC-004 | Approved SB-A01 |
| R-005 | Preserve interactive component examples, useful controls, responsive views, and representative success, empty/optional, long-content, and failure/fallback states. | Existing Storybook behavior | AC-005 | Approved SB-A01 |
| R-006 | Use plain language and progressive detail: task-oriented guidance before generated API tables. | User request | AC-006 | Approved SB-A01 |
| R-007 | Apply a consistent repository-owned Storybook identity using supported theming APIs and accessible contrast, focus, and typography. | User request | AC-007 | Approved SB-A01 |
| R-008 | Publish only curated content and assets. Exclude secrets, credential values, private source paths, internal workflow records, unapproved components, and private-only operational details. | Public exposure boundary | AC-008 | Approved SB-A01 |
| R-009 | Serve the Storybook-powered documentation from the deployed application's origin at the technology-neutral `/docs` route, without a separate hosting service or user-facing hostname. | User clarification and URL amendment | AC-009 | Approved SB-A03 |
| R-010 | Fail the combined application build when Storybook cannot build, so a deployment cannot silently omit or publish stale component documentation. | Operational safety | AC-010 | Approved SB-A01 |
| R-011 | Provide stable landing, guide, component-doc, and story links plus page metadata and a favicon/brand treatment; replace localhost-only Storybook references where appropriate. | Documentation usability | AC-011 | Approved SB-A01 |
| R-012 | Make the application route the supported way to access Storybook in local and deployed environments; remove the standalone port-6006 access command and its documentation. | User clarification | AC-012 | Approved SB-A01 |
| R-013 | Update contributor guidance so future component delivery units include the same curated docs sections and supported Storybook states. | Repository policy | AC-013 | Approved SB-A01 |
| R-014 | Include a Releases section sourced from the consumer-facing changelog, showing Unreleased changes and every published package version with impact and migration guidance. | User clarification | AC-014 | Approved SB-A01 |
| R-015 | Revamp `/catalog` as the package documentation and consumer guide; keep it as a distinct page with installation, API, usage, accessibility, release, and Storybook links. Do not redirect or remove it. | User clarification | AC-015 | Approved SB-A04 |
| R-016 | Provide a simple landing page at `/` that explains the package and offers clear links to `/catalog` and `/docs`. | User clarification | AC-016 | Approved SB-A04 |

## Assumptions and open questions

Verified facts:

- The Git remote is GitHub and `master` is the required PR target.
- Storybook 10.6.1 builds a static site into `storybook-static/`.
- Next.js serves files from the root `public` directory at same-origin URL paths.
- The current `npm run build` builds the package and Next.js application but does not generate Storybook into the application artifact.

Recommendations awaiting approval:

- Generate Storybook into an ignored `public/docs/` directory before `next build`, rewrite `/docs` to its `index.html`, and preserve Storybook's query-string deep links. This uses the existing application deployment and keeps Storybook's hashed static assets together.
- Generate Storybook before `npm run dev` so local contributors use the same `/docs` route as deployed consumers. Remove `npm run dev:storybook` from the supported scripts.
- Render the consumer-facing `CHANGELOG.md` in a curated Releases page and include it in the public-content audit.
- Keep `/catalog` as the package-level documentation page and link each component entry to its interactive `/docs` Storybook page.
- Keep `/` as a concise orientation page rather than duplicating the full catalog or Storybook content.

Deployment-specific packaging may need adjustment if the eventual platform excludes files generated under `public` during its build. The implementation plan requires a local production-server proof and records any platform-specific check for the deployment owner.

## Approval status

Approved under SB-A01 and amended by SB-A03 on 2026-10-22 Asia/Shanghai. These approvals do not authorize implementation, commit, push, PR creation, merge, or deployment.
