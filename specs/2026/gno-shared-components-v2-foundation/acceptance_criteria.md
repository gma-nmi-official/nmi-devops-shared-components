# Acceptance criteria: gno-shared-components-v2 foundation

| ID | Requirement | Criterion | Validation method | Status |
| --- | --- | --- | --- | --- |
| AC-001 | R-001 | Root npm install links the workspace package and uses one committed lockfile. | Clean-install/workspace inspection | Pass |
| AC-002 | R-001, R-009 | `nmi-devops-shared-components` builds ESM JavaScript, declarations, CSS, and only documented export paths/package files. | Package build and packed-content inspection | Pass |
| AC-003 | R-002 | The showcase imports the library by package name, not by relative access to package source. | Source inspection and build | Pass |
| AC-004 | R-002 | A production Next.js showcase build renders the reference component successfully. | `next build` plus smoke test | Pass |
| AC-005 | R-003 | The first approved GNO component exposes a typed/configurable API, supports composition, and accepts documented consumer customization. | Component contract tests | Pending |
| AC-006 | R-003 | Changing documented CSS custom properties changes the reference theme without editing component source. | Story/DOM-style acceptance test | Pass |
| AC-007 | R-004 | Noninteractive exports remain server-compatible; any client directive is limited to an interactive module and survives packaging. | Output inspection and Next.js build | Pass |
| AC-008 | R-005 | The showcase renders styled components after importing the documented CSS export, without consumer Tailwind scanning of package sources. | Configuration inspection and browser smoke test | Pass |
| AC-009 | R-006 | Storybook documents the first approved GNO component's default, supported variants, responsive, loading/error, and theme states as applicable. | Storybook build and story inventory | Pending |
| AC-010 | R-007 | Type check, lint, unit/component tests, and automated accessibility checks pass. | Recorded command results | Pass |
| AC-011 | R-007 | Package build, Storybook static build, and Next.js showcase build pass from the recorded revision. | Recorded command results | Pass |
| AC-012 | R-008 | The first approved GNO component meets its documented API, keyboard, focus, and accessible behavior. | Component, interaction, and manual accessibility checks | Pending |
| AC-013 | R-009 | Package metadata declares supported engines and peer dependencies; release/versioning guidance documents breaking-change handling. | Manifest and documentation review | Pass |
| AC-014 | R-010 | Pre-existing `.gitignore`, `.next/`, and `next-env.d.ts` state is either preserved or changed only under explicit approved scope with evidence. | Before/after Git status and diff | Pass |
| AC-015 | R-011 | Architecture documentation identifies primitives, composed portal components, and framework adapters as distinct layers; no generic component is treated as the final GNO catalog scope. | Design and documentation review | Pass |
| AC-016 | R-012 | Published artifacts contain executable JavaScript and declarations, and documented imports do not require consumer TypeScript compilation. | Packed-content and consumer-contract inspection | Pass |
| AC-017 | R-013 | A catalog route lists every public component and provides a rendered example, purpose, supported variants/states, and links to deeper documentation. | Catalog inventory and browser acceptance test | Pass |
| AC-018 | R-013 | Each catalog entry includes copyable package installation, stylesheet import, named component import, and minimal usage examples valid for JavaScript; TypeScript-specific guidance is included only where it adds value. | Documentation inspection and example validation | Pass |
| AC-019 | R-014 | The display name is “NMI DevOps Shared Components”; the root workspace, publishable package, lockfile, scripts, showcase, release tarball, and current consumer documentation consistently use package ID `nmi-devops-shared-components`. Historical release evidence names the former ID explicitly and is not rewritten. | Manifest/lockfile consistency, full-text search, package dry-run, and showcase build | Pass |
