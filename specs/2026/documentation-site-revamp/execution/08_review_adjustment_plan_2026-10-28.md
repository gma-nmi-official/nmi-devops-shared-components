# Review adjustment plan: documentation site revamp

## Objective and scope

Resolve required findings F-001 through F-003 from
[report 07](07_independent_review_report_2026-10-28.md) without adding a new
feature, changing published package behavior, or expanding release scope. The
optional formatting suggestion is excluded to avoid unrelated churn.

## Proposed corrections

| Unit | Finding | Owner | Files / responsibility | Correction | Validation |
| --- | --- | --- | --- | --- | --- |
| A-001 | F-001 | Forge | `app/catalog/component-guides.ts`; focused snippet fixture/check if needed | Make Ad Slot and Google Analytics setup snippets complete and copy-ready. Show explicit provider/consent creation or input, explicit gtag transport, and required client boundary using current public APIs. | Snippet compile/equivalent check; guide content assertions; typecheck; consumer fixtures; affected Playwright; static build. |
| A-002 | F-002 | Forge | `tests/e2e/showcase.spec.ts` | Add a guide-to-Storybook regression proving `/docs` query forwarding into the Storybook iframe. Preserve base-path assertions. | Focused browser test then full `npm run test:e2e`. |
| A-003 | F-003 | Atlas / Forge | `design.md`, `nonfunctional_requirements.md`, `execution/06_verification_report_2026-10-28.md`, linked state as needed | Remove stale current-stage pending/BLOCKED claims, record APR-003–APR-005, and add R-013/AC-016 traceability without rewriting genuine history. | Cross-read all linked records; search for stale current-status claims. |

## Ordered execution and checks

1. Forge applies A-001 through A-003 only after explicit adjustment approval.
2. Run focused lint/typecheck and snippet/content checks while implementing.
3. Vera runs the focused Storybook-forwarding test, affected guide tests,
   `npm run test:e2e`, `npm run check`, and the configured-base-path static
   export. Refresh `manual_testing.md` only if rendered presentation changes.
4. Argus independently rereads the updated diff, confirms F-001 through F-003,
   and records report 10 closure or remaining findings.

## Impact, risk, and rollback

- Consumer impact: documentation correctness and regression coverage only;
  published package runtime and version remain unchanged.
- Main risk: an example could imply unsupported initialization or a browser test
  could assert an implementation detail. Corrections must use current public API
  and test the documented query-forwarding outcome.
- Rollback: revert only the approved correction diff before commit. No data,
  deployment, or migration state exists.

## Approval status

Approved by APR-006. Approval authorizes A-001 through A-003 and their
validation only; it does not authorize commit, push, PR, merge, release, or
deployment.
