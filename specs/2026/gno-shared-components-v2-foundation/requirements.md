# Requirements: gno-shared-components-v2 foundation

## Requirements

| ID | Requirement | Source | Acceptance Link | Status |
| --- | --- | --- | --- | --- |
| R-001 | Provide a publishable, package-first React component library within an npm-workspaces repository. | User goal and foundation review | AC-001, AC-002 | Draft |
| R-002 | Support separate Next.js App Router consumers without requiring source copying. | User goal | AC-003, AC-004 | Draft |
| R-003 | Make components configurable through typed variants, composition, standard HTML props, and CSS custom-property tokens. | User goal and foundation review | AC-005, AC-006 | Draft |
| R-004 | Keep components server-compatible by default and isolate client boundaries to interactive modules. | Next.js/React architecture constraint | AC-007 | Draft |
| R-005 | Distribute compiled, explicitly imported library CSS so consumers are not required to configure Tailwind source scanning. | Tailwind v4 compatibility constraint | AC-008 | Draft |
| R-006 | Provide isolated component documentation and executable examples through Storybook. | Foundation review | AC-009 | Draft |
| R-007 | Establish automated type, lint, unit/component, accessibility, package-build, Storybook-build, and Next.js-consumer checks. | GNO quality policy | AC-010, AC-011 | Draft |
| R-008 | Validate the architecture through one production-quality first GNO component before expanding the catalog. | Risk-reduction recommendation | AC-012 | Draft |
| R-009 | Define stable public exports, peer-dependency boundaries, versioning expectations, and package contents. | Multi-repository consumption need | AC-002, AC-013 | Draft |
| R-010 | Preserve unrelated and pre-existing working-tree changes. | GNO policy | AC-014 | Draft |
| R-011 | Support composed portal-level components, including a future portal header, rather than limiting the package to low-level primitives. | User clarification, 2026-10-02 | AC-015 | Draft |
| R-012 | Publish runtime JavaScript plus declarations so both JavaScript and TypeScript consumer repositories can import supported components. | User clarification, 2026-10-02 | AC-016 | Draft |
| R-013 | Provide a browsable in-repository component catalog page that displays every public component and documents how consumers install, import, configure, and use it. | User clarification, 2026-10-02 | AC-017, AC-018 | Draft |
| R-014 | Use **NMI DevOps Shared Components** as the product display name and `nmi-devops-shared-components` as the consumer package ID across package metadata, imports, artifacts, and current documentation. | User direction, 2026-10-13 | AC-019 | Approved |

## Assumptions and open questions

Defaults proposed for approval:

- Distribution uses the npm-compatible package ID `nmi-devops-shared-components`; actual registry publication is deferred.
- React and React DOM are peer dependencies. Next.js-specific behavior is isolated behind an explicit adapter entry point and Next.js is not required by framework-neutral components.
- Initial consumers use maintained App Router versions compatible with React 19; the exact supported range will be proven by the consumer fixture and recorded before release.
- Visual customization uses GNO defaults plus CSS-variable theme overrides. Arbitrary replacement of component markup is not a goal.
- The first component is not selected yet. Tokens remain inside `packages/ui` until independent token-package consumers are demonstrated.
- The intended catalog includes composed portal UI; each composed component receives an explicit contract for branding, navigation, data, authentication state, responsive behavior, accessibility, and framework adapters as applicable.
- JavaScript consumption is a first-class requirement. TypeScript declarations improve typed consumers but must not be required to execute the package.
- The catalog page is part of the product, not merely a development sandbox. Storybook may provide deeper isolated documentation, but consumers must have a clear repository-hosted entry page for discovering components and copying usage instructions.

Open before release, but not blocking foundation implementation: registry URL/access policy, final compatibility matrix beyond the validated baseline, package publication owner, and whether the documentation site will be deployed.

## Approval status

Pending explicit requirements approval against this revision.
