# Solution design: gno-shared-components-v2 foundation

- Requirements and acceptance criteria: `requirements.md`, `acceptance_criteria.md`
- Repository baseline: adopted Create Next App scaffold at `ef5546d0dcf953d0fed2e4b844d425d3814f6e98`
- Design owner: Athena role in the current session

## Changed behavior and interfaces

Convert the app-shaped scaffold into a private npm-workspaces root containing a publishable `packages/ui` library and an `apps/showcase` Next.js integration application. Storybook operates from the repository as the component workshop.

The public `nmi-devops-shared-components` library contract consists of documented package exports, React component props, peer dependencies, and one explicit stylesheet export. Tokens are CSS custom properties. Components use complete, statically detectable Tailwind class names internally; consumers import compiled CSS and need no Tailwind configuration for the library.

The human-facing product name is **NMI DevOps Shared Components**. The private workspace root is `nmi-devops-shared-components-workspace`; the consumer package ID is `nmi-devops-shared-components`.

Framework-neutral components do not import Next.js. If adapters become necessary, they use an explicit `nmi-devops-shared-components/next` boundary. Components are server-compatible unless interaction requires a narrow client entry point.

The catalog has three intended layers:

1. Primitives that establish consistent interaction and styling contracts.
2. Composed portal components such as PortalHeader, built from primitives but exposing domain-neutral configuration for branding, navigation, account state, responsive behavior, and extension slots.
3. Framework adapters for concerns such as Next.js links, images, routing, or server/client integration. Composed components must not hard-code one consumer application's routes, authentication implementation, analytics, or fetched data.

Runtime distribution is JavaScript with optional TypeScript declarations, so plain JavaScript repositories and TypeScript repositories use the same public exports.

The Next.js showcase also serves as the consumer-facing component catalog. Its catalog route must be driven by an explicit inventory of public components so newly exported components cannot be silently omitted. Every entry presents a rendered example, component purpose, supported configuration/states, package installation command, stylesheet import, named import, minimal JavaScript usage, and a link to Storybook or deeper API documentation. Storybook remains the detailed development workshop; the catalog is the approachable discovery and onboarding surface.

## Decisions

| ID | Requirement | Decision | Alternatives considered | Rationale / tradeoff | Approval reference |
| --- | --- | --- | --- | --- | --- |
| D-001 | R-001 | npm workspaces with `apps/showcase` and `packages/ui` | Single app; Turborepo from day one | Clear package boundary with minimal new tooling | Pending |
| D-002 | R-002, R-009 | Compiled ESM package, declarations, CSS, and explicit exports | Raw TypeScript source only | Stable cross-repository consumption and inspectable release artifact | Pending |
| D-003 | R-003, R-005 | CSS-variable tokens and compiled library CSS | Require consumer Tailwind scanning; CSS-in-JS | Framework-light theming and reliable Tailwind v4 consumption | Pending |
| D-004 | R-004 | Server-compatible default exports and narrow client boundaries | Mark package barrel as client | Minimizes client JavaScript and preserves App Router composition | Pending |
| D-005 | R-006, R-007 | Storybook Next.js/Vite plus Vitest/component/a11y checks and a real Next.js showcase | Showcase only; Storybook only | Covers isolated states and actual framework integration | Pending |
| D-006 | R-008 | The first approved GNO component as the first vertical slice | Build tokens/tooling separately, then many components | Tests the entire contract before multiplying it | Pending |

The exact package builder is intentionally selected during U-002 by a small directive/CSS/declaration spike. It must meet the output contract; tool preference alone is not an architectural requirement.

## Migration and recovery

The package-ID rename is a consumer-facing breaking migration: consumers of `gno-shared-components` must install `nmi-devops-shared-components`, update JavaScript/TypeScript imports and the stylesheet path, and use the new Bitbucket tarball filename. No data migration is involved. Recovery is Git reversion of the approved unit; unrelated dirty files must not be overwritten.

## Delivery units and dependencies

See `wbs.md`. U-001 establishes workspace hygiene; U-002 establishes the package contract; U-003 styling; U-004 documentation/testing; U-005 the first approved GNO component; U-006 integration and release documentation.

## Open questions and development approval

Registry configuration and final multi-version compatibility remain release decisions. Development approval is pending for this design and `test_plan.md`.
