# Manual testing reference for QA: <project / unit>

## Scope and handoff

- Requirements / acceptance criteria and automated test report:
- Repository, branch, base/revision, and dirty diff reference:
- Environment / build / endpoint:
- Prepared by and date:
- QA recipient / owner (or pending assignment):
- Handoff: Prepared / Sent (reference and date) / Execution complete:
- Required manual checks and any N/A reasons:

This reference supplements automated unit testing. Label cases accurately as
manual unit, integration, acceptance, or regression checks; browser checks are
not unit tests. Preparing or sending the file does not mean QA has executed it.

## Preconditions and safe setup

Link the initial setup record. Specify tools, exact commands and working
directories, roles/accounts, safe fixtures, and the starting state. Do not include
secrets or production data. Explain cleanup and how to repeat each case safely.

## Case <ID>: <behavior>

Copy this section per case, covering positive, negative/boundary, and affected
regression behavior. Replace placeholders with concrete inputs and expectations.

- Requirement / acceptance criterion:
- Test level and required or optional:
- Preconditions and input data:

| Step | Action / exact command | Expected observable result |
| --- | --- | --- |
| 1 | | |

- Cleanup / reset:
- Actual result: Not executed
- Status: BLOCKED (not executed) / PASS / FAIL / N/A (reason)
- Tester / execution date / tested revision:
- Evidence / screenshot / log reference:
- Defect reference and retest result:

## Results and next action

Record totals, blockers, defects, QA owner, and next action. Required unrun cases
remain BLOCKED; no required FAIL or BLOCKED permits readiness. Record N/A reasons
when no manual checks apply. Preserve previous results when a new revision
requires retesting, and link the current record from state.md and the test report.
