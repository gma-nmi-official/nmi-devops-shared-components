# Specification: gno-shared-components-v2 adoption

## Business intent

- Problem and affected users: Establish a trustworthy repository baseline before
  product requirements or development begin.
- Desired outcome and measurable success criteria: Record repository identity,
  instructions, stack, architecture, quality tooling, Git state, constraints, and
  unresolved product decisions at the inspected revision.
- Business decision owner: User.
- Source request: "Athena, proceed with adoption" on 2026-10-02.

## Scope and exclusions

Scope is read-only adoption of `repository checkout root`
and creation of workflow records in this project directory. Application source,
repository configuration, dependencies, generated files, Git history, and remote
configuration are excluded. Product requirements and implementation planning are
deferred until the repository's intended consumers and component contract are
defined.

## Affected repositories and current context

See [repositories.md](repositories.md) and [adoption.md](adoption.md). The target
is an initial Create Next App checkout rather than an established shared-component
library.

## Constraints, dependencies, and operational owner

- The target repository's `AGENTS.md` requires consulting its installed Next.js
  documentation before future source changes.
- Existing dirty and generated-file changes belong to the user and must be
  preserved.
- No operational owner, deployment target, or package publication channel is
  currently defined.

## Delivery endpoint

Adoption handoff only. No development, Git publication, or deployment is included.

## Approval status

The user authorized repository adoption. No requirements or development approval
has been requested or inferred; see [approvals.md](approvals.md).
