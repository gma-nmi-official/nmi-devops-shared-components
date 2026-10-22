# Acceptance criteria: Public Storybook documentation

| ID | Requirement | Criterion | Validation Method | Status |
| --- | --- | --- | --- | --- |
| AC-001 | R-001 | `npm run build` generates both the Next.js application and Storybook static output in the same deployment-ready workspace/artifact. | Clean production build and artifact inspection | Pending |
| AC-002 | R-002 | The first page identifies the library, intended audience, available components, installation path, and clear next actions without requiring repository knowledge. | Content review and manual usability walkthrough | Pending |
| AC-003 | R-003 | Sidebar items appear in the approved Overview, Guides, Components order and use human-readable labels. | Storybook navigation inspection | Pending |
| AC-004 | R-004 | Every component exported from the package entry point appears in the Storybook component index and has all nine required documentation sections, with working examples and links. | Export-to-doc coverage check and documentation checklist | Pending |
| AC-005 | R-005 | Portal Header stories expose useful controls and cover desktop, mobile, open menu, optional-content, long-content, customization, override, and fallback states. | Story inventory and interaction checks | Pending |
| AC-006 | R-006 | A non-implementer can follow the basic integration path before encountering the full API reference, and jargon is explained or removed. | Human documentation review | Pending |
| AC-007 | R-007 | Manager and docs themes use consistent naming and styling; keyboard focus remains visible and automated accessibility checks report no serious or critical violations in the tested docs/stories. | Keyboard walkthrough and axe/Storybook checks | Pending |
| AC-008 | R-008 | A public-content audit finds no secret values, credential-like strings, local absolute paths, internal execution records, or unapproved component documentation in `storybook-static/`. | Static-output scan and reviewer inspection | Pending |
| AC-009 | R-009 | After `npm run build` and `npm run start`, `/docs` reaches the documentation landing page, retains `/docs` as the browser-facing entry URL, and loads all Storybook assets from the same application origin. | Local production-server HTTP/browser smoke test | Pending |
| AC-010 | R-010 | A forced Storybook build failure makes the combined application build fail before a deployable result is accepted. | Build dependency/failure-path test | Pending |
| AC-011 | R-011 | Direct links to landing, guide, component docs, and component stories load through the same-origin route; metadata and favicon are present; catalog/repository guidance uses that route rather than localhost in production guidance. | Link/asset smoke test | Pending |
| AC-012 | R-012 | `npm run dev` prepares Storybook and serves it through `/docs`; the `dev:storybook` script and port-6006 instructions are absent from supported documentation. | Script inspection and local application smoke test | Pending |
| AC-013 | R-013 | Contributor documentation defines the public component-doc checklist and future component stories follow it. | Documentation review | Pending |
| AC-014 | R-014 | The Releases navigation entry shows Unreleased plus every version heading in `CHANGELOG.md`, and each published release includes consumer impact and migration guidance or an explicit no-migration statement. | Changelog-to-doc coverage check and content review | Pending |
| AC-015 | R-015 | `/catalog` remains reachable as package documentation and contains clear installation, component/API, usage, accessibility, release, and Storybook links without duplicating every interactive state. | Content review and browser smoke test | Pending |
| AC-016 | R-016 | `/` gives a first-time visitor a short explanation and clear links to package documentation and interactive component docs. | Content review and browser smoke test | Pending |
