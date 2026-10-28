# Nonfunctional requirements: documentation site revamp

| ID | Area | Measurable requirement / target | Source / rationale | Validation method | Owner | Approval |
| --- | --- | --- | --- | --- | --- | --- |
| NFR-001 | Accessibility | Semantic landmarks/headings, skip link, visible focus, keyboard navigation, descriptive link names, and readable 200% zoom on all new pages. | Existing accessibility baseline | Playwright + axe where applicable + manual QA | Vera | APR-003 |
| NFR-002 | Responsive compatibility | No page-level horizontal overflow at 320, 375, 768, 1024, or 1440px; content remains usable in current Chromium. | Existing E2E viewport baseline | Playwright | Vera | APR-003 |
| NFR-003 | Static deployment | All routes build with `GITHUB_PAGES=true`, the configured base path, trailing slashes, and no request-time server feature. | GitHub Pages architecture | Production build and output inspection | Forge / Vera | APR-003 |
| NFR-004 | Security/privacy | Documentation adds no HTML injection path, live ad request, analytics-provider request, credential, or runtime third-party asset request. | Static public docs and current safe previews | Code review + network interception | Argus / Vera | APR-003, APR-004 |
| NFR-005 | Reliability | Brand assets and guide content are repository-local; a remote content or image outage cannot break a built page. | User-supplied remote assets must not become runtime dependencies | Build/output/network inspection | Vera | APR-003, APR-004 |
| NFR-006 | Performance | New static pages add no production dependency and no client component unless interaction requires it; ordinary guide content renders as Server Components. | Preserve lightweight static site | Diff review + build route classification | Argus | APR-003 |
| NFR-007 | Maintainability | One typed catalog registry is the canonical route/inventory source; a new entry requires one registry addition plus its reviewed content/preview/tests. | Prevent drift across home, catalog, metadata, and static params | Typecheck + review | Forge / Argus | APR-003 |
| NFR-008 | Operations | Existing GitHub Pages workflow remains the deployment mechanism; final merge and deployment are owner actions. | Repository policy | Workflow diff review and handoff | Orion / owner | APR-003 |

## Constraints and accepted tradeoffs

- Current browser automation is Chromium-based. Cross-browser manual execution
  is not proposed because the change uses standard static HTML/CSS; this is
  subject to requirements approval.
- A single structured guide renderer improves consistency but constrains unique
  page layouts. Entry-specific previews remain supported through explicit,
  typed rendering rather than arbitrary HTML.
- No quantitative load-time budget is introduced without an owner target. The
  enforceable performance constraints are static rendering, no new dependency,
  and no unnecessary client boundary.

## Requirement-to-design and test links

Requirements R-001 through R-013 map to decisions D-001 through D-006 in
[design.md](design.md), acceptance criteria AC-001 through AC-016, and the
scenarios in [test_plan.md](test_plan.md).
