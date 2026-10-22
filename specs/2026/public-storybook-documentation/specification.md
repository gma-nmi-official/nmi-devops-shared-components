# Specification: Public Storybook documentation

## Business intent

- Problem and affected users: the repository has a working engineering Storybook, but it does not yet provide a welcoming, structured documentation experience or a public URL. Component consumers, designers, QA, and other stakeholders currently need repository access and local setup to understand the library.
- Desired outcome: a friendly Storybook documentation site generated as part of this application's production build and exposed from the same deployed application so consumers can discover, evaluate, and integrate approved components.
- Measurable success: a first-time visitor can identify the library purpose, find a component, understand its supported behavior, and reach a working example and integration guidance without repository access.
- Business decision owner: repository owner / user.
- Source request: user request on 2026-10-22 Asia/Shanghai to revamp Storybook and publish understandable public documentation.

## Scope and exclusions

In scope:

- Storybook information architecture, visual identity, welcome and getting-started documentation.
- Curated documentation for every component exported by the public package, beginning with `PortalHeader` once that component is approved for delivery.
- Interactive stories, controls, accessibility guidance, responsive states, and copyable examples.
- A release-history section covering the current unreleased changes and every published package release.
- Production-build integration that places the static Storybook inside the deployable application artifact.
- A stable same-origin documentation route at `/docs`.
- `/catalog` remains the package documentation and consumer guide, while `/docs` remains the interactive Storybook documentation.
- A simple landing page at `/` introduces the package and links visitors to the catalog and interactive docs.
- Removal of the separate port-6006 Storybook access path from the supported repository workflow.
- Public-content review, build validation, link/asset checks, and documentation handoff.

Excluded from this delivery unit:

- Making the source repository public.
- Changing the package registry, package license, or package publication process.
- Changing `PortalHeader` runtime behavior or its public API.
- Adding analytics, authentication, comments, a documentation CMS, or a third-party visual-review service.
- Publishing unapproved work from feature branches.
- A custom documentation domain or separate documentation deployment.

## Affected repositories and current context

The only affected repository is `D:\gno-node-projects\gno-shared-components-v2`. It is on `feature/portal-header` at `0b2561575b68f1e89ea9cf16fdaaa7e039670296` with a substantial pre-existing Portal Header candidate. Those changes are protected and outside this project's ownership.

The current Storybook 10.6.1 configuration has docs and accessibility addons, one untracked Portal Header story with autodocs, and no same-build application integration or hand-authored MDX pages. A production build succeeds when process spawning is allowed.

## Constraints, dependencies, and operational owner

- GitHub organization policy must permit a public Pages site for the private repository.
- Storybook must be built before Next.js development/production startup packages or serves the application's static assets; a Storybook failure must fail the combined production build.
- The documentation inherits the deployed application's hostname and access boundary. No second hosting service or deployment credential is introduced.
- The Portal Header delivery must reach an approved, reviewed revision before its story can be presented as released public documentation.
- Documentation uses repository-local content and assets only; runtime calls to private services are prohibited.

## Delivery endpoint

The planned endpoint is a reviewed PR handoff containing the Storybook revamp and production-build integration. After an authorized application deployment, the documentation route is verified on the same deployed origin. Deployment itself remains separately gated when requested.

## Approval status

Requirements are approved under SB-A01. Development approval remains pending in `approvals.md`.
