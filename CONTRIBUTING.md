# Contributing to GNO shared components

This repository uses a staged workflow so every shared component has an approved contract, implementation evidence, documentation, and a reproducible release. The workflow bundle is checked into `.codex/` and `.agents/`, so developers and agents use the same local policy after cloning the repository.

## 1. Adopt the repository

Before making changes:

1. Read [`AGENTS.md`](AGENTS.md), [`prompt.md`](prompt.md), this guide, and the relevant component documentation.
2. Confirm the repository, branch, Node.js version, and package manager.
3. Install the locked dependencies:

   ```bash
   npm ci
   ```

4. Run the existing checks before editing:

   ```bash
   npm run check
   ```

Protect unrelated working-tree changes. Do not reset, delete, or rewrite another developer's work.

## 2. Define a component delivery unit

Do not begin with implementation code. Create or confirm the component contract first:

- business purpose and scope
- user stories and acceptance criteria
- public props, events, states, and responsive behavior
- accessibility expectations
- consumer-owned integrations and explicit exclusions
- package exports, styling, and dependency boundaries

Store component documentation under `docs/components/<component-name>/`. The first component is `portal_header`.

The formal delivery record belongs under `specs/<year>/<project>/` and must include, as applicable:

- requirements and business intent
- user stories and acceptance criteria
- technical design and non-functional requirements
- implementation and test plan
- manual testing record
- approval decisions and execution state
- independent review findings and adjustment validation
- changelog and release evidence

Agents must link these records to the implementation, Storybook story, catalog entry, tests, and release artifact. A component is not ready for development when its approved specification is incomplete.

## Changelog maintenance

Keep [`CHANGELOG.md`](CHANGELOG.md) up to date as part of the same delivery unit. Before review, move completed work into the appropriate `Unreleased` section and record:

- affected component(s)
- user-visible or consumer-visible impact
- patch, minor, major, or pre-release classification
- migration notes for breaking changes
- validation and release-artifact evidence

Do not defer changelog updates until after a release. The changelog is part of the reviewable change and must describe what consumers will receive.

## 3. Implement the complete unit

An approved component delivery unit includes all applicable artifacts:

- implementation under `packages/ui/src/`
- public export through the package entry point
- component-scoped styles and assets
- behavior and accessibility tests
- a dedicated Storybook story with controls and supported states
- a `/catalog` entry with consumer installation and import examples
- JavaScript/TypeScript usage documentation
- changelog entry when the published package changes

Storybook is mandatory for component changes. When implementation, props, states,
styles, assets, or accessibility behavior change, update the corresponding story,
controls, and interaction/accessibility coverage in the same change. A component
delivery unit is not ready for review while Storybook or catalog documentation is stale.

Components must remain framework-neutral React UI unless an adapter is separately approved. Consumers own routes, data, authentication, analytics, and other application integrations.

## 4. Verify before review

Run the complete quality gate:

```bash
npm run check
npm run pack:check
```

For a release artifact, also run:

```bash
npm run pack:release
```

Record the commands and results. Manual browser checks supplement automated tests; an unrun check is not a pass.

## 5. Independent review

Before commit, an independent reviewer or assigned review stage must compare the change against the approved requirements and the local diff. Review findings require an approved adjustment plan before corrections are implemented.

The implementer must not claim their own verification as independent review.

## 6. Version, changelog, and release

This repository currently publishes one package version for all components:

- patch: bug, accessibility, documentation, or non-breaking style fix
- minor: new component or backward-compatible capability
- major: removed export, renamed prop, or breaking contract/token/behavior change

When multiple components change, use the highest-impact bump. Keep the root and `packages/ui` versions aligned, update [`CHANGELOG.md`](CHANGELOG.md), and add migration notes for breaking changes.

Create an annotated tag only after validation and approval:

```bash
git tag -a v0.1.0 -m "release: gno-shared-components v0.1.0"
```

Bitbucket tag builds produce a versioned `.tgz` artifact. Do not publish, push, create a pull request, or upload a release without the separate approval required for that action.

See [`docs/versioning.md`](docs/versioning.md) for the detailed release policy and [`docs/consumer-setup.md`](docs/consumer-setup.md) for consumer guidance.
