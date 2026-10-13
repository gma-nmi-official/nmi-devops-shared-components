# Argus review adjustment record

Historical note: this record describes the 2026-10-08 correction under the former package ID `gno-shared-components`. The current product display name is **NMI DevOps Shared Components**, and the consumer package ID is `nmi-devops-shared-components`; see the foundation naming amendment and changelog.

## Scope

Apply the approved Argus corrections for the foundation before commit:

1. Separate the private workspace identity from the publishable package identity.
2. Make Bitbucket `.tgz` distribution explicit and remove conflicting restricted-npm metadata.
3. Update manual-testing evidence with the developer-confirmed catalog, Storybook, and packaging results.
4. Mark placeholder consumer examples as illustrative until a public component export exists.

## Approval

The repository owner approved proceeding with these corrections on 2026-10-08.

## Implementation status

- Root workspace renamed to `gno-shared-components-workspace`.
- `packages/ui` remains `gno-shared-components`.
- Added `predev` to build the package before starting the Next.js showcase from a clean checkout.
- `publishConfig.access` was removed from the package metadata because Bitbucket artifacts are the approved distribution source.
- Consumer/versioning documentation now describes Bitbucket artifact promotion and labels unavailable imports as illustrative.
- Manual evidence records PASS for setup, catalog, Storybook startup, generated-output hygiene, package dry-run, and release artifact creation.

## Validation status

- ESLint: PASS.
- Root and package type checks with incremental writes disabled: PASS.
- Vitest: PASS with no test files found.
- Package build: PASS in the developer's writable local environment.
- Package dry-run: PASS in the developer's local environment.
- Independent review: final post-adjustment review completed; remaining status is recorded in the review handoff.
