# Specification: gno-shared-components-v2 foundation

## Business intent

- Problem and affected users: JavaScript and TypeScript web teams need reusable, configurable portal-level UI components without copying source or coupling applications to one another.
- Desired outcome: establish a versioned component package that is consumable by separate JavaScript/TypeScript projects, including Next.js applications, and can provide composed features such as a complete portal header while remaining themeable, testable, and integration-safe.
- Business decision owner: user/requester.
- Source request: "This repo goal is to create a configurable shared components to share with other nextJS project."

## Scope and exclusions

In scope: repository/workspace foundation, package contract, tokens and styling contract, Storybook, automated tests, one vertical reference component, CI design, release readiness, an extensible architecture for composed portal components such as a portal header, and a browsable component catalog with consumer installation/import guidance.

The approved product display name is **NMI DevOps Shared Components** and the consumer package ID is `nmi-devops-shared-components`. The repository slug remains `gno-shared-components-v2`.

Excluded from the current foundation implementation: the actual portal header and broader portal-component implementation set, application-specific business rules, authentication implementation, backend APIs, deployment of the catalog site, publishing to a registry, and changes to consumer repositories. These composed components require their own requirements and contracts before implementation; the catalog page itself is required in the repository.

## Affected repositories and current context

`repository checkout root` is an adopted Create Next App scaffold at `ef5546d0dcf953d0fed2e4b844d425d3814f6e98`. It does not yet expose a component package, tests, CI, or release automation. See `repositories.md` and the linked adoption record.

## Constraints, dependencies, and operational owner

- Preserve the existing Next.js 16.3.8, React 19.2.8, TypeScript 5, Tailwind CSS 4, and npm baseline unless an approved implementation spike proves a change necessary.
- Follow the repository's `AGENTS.md` and relevant local Next.js documentation before code changes.
- Protect the pre-existing dirty worktree.
- Registry credentials, final package name, and publication owner are not required for foundation implementation; publication remains separately gated.

## Delivery endpoint

Validated and independently reviewed local foundation, followed by a separate commit approval decision. Push, PR, registry publication, and deployment are out of scope unless separately requested and approved.

## Approval status

Foundation requirements and development were previously approved in `approvals.md`. The 2026-10-13 package-name amendment is recorded there; publication remains separately gated.
