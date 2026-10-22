# Solution design: Public Storybook documentation

- Requirements and acceptance criteria: `requirements.md`, `acceptance_criteria.md`.
- Repository baseline / architecture: Next.js 16.3.8 workspace, React 19.2.8 package, Storybook 10.6.1 with `@storybook/nextjs-vite`, docs, and a11y addons.
- Design owner: Athena for proposal; repository owner for decisions.

## Changed behavior and interfaces

Storybook becomes the implementation behind the application's interactive documentation surface at `/docs`. The Next.js `/catalog` remains a distinct package documentation and consumer guide, with concise API, installation, usage, release, accessibility, and Storybook links. The root `/` is a simple orientation landing page.

Proposed information architecture:

1. **Overview / Welcome** — purpose, audience, component status, and quick paths.
2. **Guides / Getting Started** — package installation, stylesheet import, and first render.
3. **Guides / Using These Docs** — how to use Canvas, controls, viewport, accessibility results, and deep links.
4. **Guides / Accessibility** — consumer responsibilities and component guarantees.
5. **Components / All Components** — inventory generated/maintained against the package entry point.
6. **Components / Portal Header** — curated component docs tied to the existing stories.
7. **Releases** — consumer-facing Unreleased notes and every published version from `CHANGELOG.md`.

Content will be hand-authored MDX for narrative guidance and Component Story Format for interactive behavior. Generated prop tables remain on component pages but follow introductory and task-oriented content. Public pages will not import repository-wide README, specs, or workflow records. The root `CHANGELOG.md` is the approved exception because repository policy already treats it as the consumer release record; it is rendered in a Releases page and audited for deployment-safe content.

The manager uses Storybook's supported theme API for product title, colors, and brand link. Docs use a matching supported docs theme. CSS escape hatches are avoided unless a specific approved requirement cannot be met through stable APIs.

The repository generates Storybook into an ignored directory under `public/docs/` before both `next dev` and `next build`. Next.js serves files in `public` from the application origin. A Next.js rewrite maps `/docs` to `/docs/index.html` while keeping `/docs` in the browser; Storybook keeps its query-string navigation and relative hashed assets beneath that path. `/catalog` remains a normal Next.js documentation route. The standalone `dev:storybook` script and port-6006 guidance are removed so the application route is the supported access path.

## Decisions

| ID | Requirement | Decision | Alternatives considered | Rationale / tradeoff | Approval reference |
| --- | --- | --- | --- | --- | --- |
| D-001 | R-001, R-009, R-010 | Generate Storybook into `public/docs/` before `next build` and expose it at `/docs`. | `/storybook`; GitHub Pages; Chromatic; separate docs app; iframe page | Produces one deployment and a user-oriented, technology-neutral URL. The generated directory stays ignored and is rebuilt from source. | Pending |
| D-002 | R-002-R-006 | Use curated MDX pages plus CSF stories/autodocs. | Autodocs only; separate documentation app | MDX supports plain-language journeys while retaining live examples and API extraction in one site. | Pending |
| D-003 | R-007 | Use supported manager/docs theme APIs and local assets. | Broad custom manager CSS | Reduces upgrade fragility and external asset dependencies. | Pending |
| D-004 | R-008 | Maintain an explicit public-content allowlist and scan the built Storybook artifact. | Publish all existing Markdown | Prevents internal lifecycle, repository, and operational details from becoming visible in the deployed documentation by accident. | Pending |
| D-005 | R-011 | Use a Next.js rewrite from `/docs` to `/docs/index.html` and test Storybook query-string deep links. | Redirect to the explicit HTML filename; proxy through an App route | Keeps a clean `/docs` browser URL while leaving Storybook's static router intact. | Pending |
| D-006 | R-012 | Build static Storybook during `predev` and the production `build`; remove the standalone Storybook dev script. | Retain port 6006 for hot reload | Aligns local and deployed access with the application route requested by the owner, at the cost of rebuilding Storybook to see story changes. | Pending |
| D-007 | R-004, R-014 | Add an All Components coverage check and render the consumer changelog in a Releases MDX page. | Manually maintained lists; separate release site | Keeps component/release documentation complete and tied to repository sources of truth. | Pending |
| D-008 | R-015, R-016 | Revamp `app/catalog/page.tsx` as package docs, keep its preview for quick evaluation, and simplify `app/page.tsx` into a landing page linking to `/catalog` and `/docs`. | Redirect catalog; make the landing page a full component catalog | Separates package onboarding from interactive Storybook while giving new visitors a clear starting point. | Pending |

## Migration and recovery

No component API, package distribution, or consumer migration is planned. Existing Storybook story IDs should remain stable where practical; any changed documentation deep link is recorded in the documentation report.

Deployment is additive to the current application artifact. A Storybook failure prevents the combined build. Recovery is to redeploy the last known-good application revision or remove the documentation build integration through a reviewed change; deployment and rollback actions retain their applicable approvals.

## Delivery units and dependencies

See `wbs.md`. The Portal Header page depends on the component reaching a reviewed release candidate. Component coverage depends on the public package entry point. Release coverage depends on the consumer-facing changelog. The production-route unit depends on the documentation shell and a verified Storybook output path.

## Planned file and command changes

| Area | Planned files | Concrete change |
| --- | --- | --- |
| Storybook configuration | `.storybook/main.ts`, `.storybook/preview.ts`, new `.storybook/manager.ts`, optional head metadata files | Load MDX, order navigation, apply supported manager/docs themes, set documentation metadata, and retain global component styles/a11y enforcement. |
| Narrative documentation | New `packages/ui/src/docs/*.mdx` files | Add Welcome, Getting Started, Using These Docs, Accessibility, All Components, and Releases pages. Releases imports the root consumer changelog as raw Markdown. |
| Component documentation | `packages/ui/src/components/portal-header/portal-header.stories.tsx` and a colocated MDX page if needed | Add plain-language guidance, complete controls/states, API documentation, accessibility, responsive behavior, and limitations without changing component runtime behavior. |
| Completeness/safety checks | New scripts under `scripts/` | Match component barrels exported from `packages/ui/src/index.ts` to colocated stories/docs; verify the Releases source; scan generated Storybook output for prohibited content and missing entry/assets. |
| Application build and route | `package.json`, `.gitignore`, `next.config.ts` | Build Storybook to ignored `public/docs/` during `predev` and `build`, remove `dev:storybook`, fail on docs-build errors, and rewrite `/docs` to the static entry point while preserving `/catalog`. |
| Package docs and landing links | `README.md`, `CONTRIBUTING.md`, `docs/consumer-setup.md`, `app/catalog/page.tsx`, `app/catalog/portal-header-preview.tsx`, `app/page.tsx`, and affected tests | Revamp `/catalog` as the package documentation page, keep its preview, simplify `/` as a landing page, link both to `/docs`, and define the component/release documentation checklist. |
| Evidence | This project’s future execution reports and standalone `manual_testing.md` | Record commands, content audit, component/release coverage, browser behavior, and review evidence. |

Planned root command behavior:

- `npm run dev`: package build and Storybook static generation run first; Next.js then serves the application and `/docs`.
- `npm run build`: package build, Storybook static generation, completeness/safety checks, then `next build`.
- `npm run build-storybook`: produces `public/docs/` for application delivery.
- `npm run check`: retains typecheck, lint, unit, consumer, Storybook, and Next.js coverage without accepting stale documentation output.
- `npm run dev:storybook`: removed.

## Open questions and development approval

Requirements are approved under SB-A01 with the `/docs` amendment SB-A03 and catalog/landing amendment SB-A04. Development approval SB-A02 is pending for this design, `wbs.md`, `test_plan.md`, and `initial_setup.md`. Implementation remains unauthorized until SB-A02 is approved.
