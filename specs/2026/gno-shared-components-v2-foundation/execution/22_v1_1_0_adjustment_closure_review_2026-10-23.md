# v1.1.0 review-adjustment closure review

## Context and decision

Argus independently reviewed the A-026/A-027 corrections in the isolated
`feature/release-v1.1.0` worktree at base
`d91ac862dda90073875d16c70bb24886d334ff98`.

Decision: **BLOCKED**. F-REL-110 is closed. F-REL-111 remains open, and new
Minor finding F-REL-112 requires an evidence correction.

## Findings

### F-REL-111 — Major — public download contract is not externally verified

Unauthenticated checks returned HTTP 404 for the GitHub API repository endpoint,
the direct repository URL, and the configured GitHub Pages URL. Authenticated
`git ls-remote origin HEAD` still succeeds, which is consistent with repository
credentials being available locally but does not prove public access.

Active guidance must not promise anonymous public release downloads unless an
unauthenticated request confirms the repository is externally public. Either the
owner must make and verify the repository publicly reachable, or the guidance
must describe the actual authenticated/private download contract. Presentation
status wording must also stop describing A-027 as pending after resolution.

### F-REL-112 — Minor — full-audit evidence is inaccurate

Argus reproduced zero findings for `npm audit --omit=dev`, but the full
`npm audit` reproduced five high findings in the known development-only chain:

`eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch` → `braces`

The newer zero-full-audit claims contradict the actual graph and the preserved
A-006 exception. Current release evidence must retain the zero shipped-runtime
result while accurately recording the five-high development-only exception.

## Independent evidence

- `npm run check`: PASS; 13/13 tests, two consumer fixtures, Storybook 10.6.3,
  and Next.js 16.4.2.
- `npm run test:e2e`: PASS; 28/28.
- `npm run pack:check`: PASS; `1.1.0`, 37 files.
- Four-way version alignment: PASS; all `1.1.0`.
- `npm audit --omit=dev`: PASS; zero findings.
- Full `npm audit`: five high development-only findings under A-006.
- `git diff --check`: PASS.

No files were modified by Argus. Commit readiness remains blocked.
