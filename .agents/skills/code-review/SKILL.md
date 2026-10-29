---
name: "code-review"
description: "Independently review a tested GNO change set against approved requirements and prepare findings without editing code."
---

# Independent code review

Role: Argus. Read [policy](../../../AGENTS.md) and
[lifecycle](../../../.codex/workflows/lifecycle.md).
When readability/coding format is in scope, also read
`../coding-format-review/SKILL.md` and include a focused format pass.
Inputs: approved requirements/design, passing relevant tests, actual change set,
and recorded base. A PR need not exist. Missing prerequisites mean BLOCKED.

Inspect the local diff and relevant surrounding behavior. Check correctness,
permissions, error paths, compatibility, regressions, and test adequacy within
scope. Do not invent requirements or request unrelated modernization.

Review affected algorithms for preserved invariants, valid state transitions,
boundary cases, ordering, duplicate operations, and termination. Assess time and
space complexity against the approved workload and budgets, including unbounded
queues, caches, retries, and retained resources. Trace relevant failure and
recovery paths through surrounding code rather than reviewing the diff alone.

For asynchronous behavior, inspect resource ownership, races, cancellation,
stale-result protection, idempotency, and callback completion guarantees.
Verify input validation and error handling cover synchronous throws and rejected
promises, provide actionable messages and observable reporting/propagation,
release resources, and preserve the approved fallback/retry semantics. Identify
swallowed failures, false success, or sensitive data exposed through errors.

Challenge whether the tests establish the required behavior, including adverse
timing, boundaries, and recovery. For a correction, confirm its regression would
detect the original defect. Independently reproduce high-risk claims where
feasible; document evidence gaps rather than treating a green suite as proof.
Recommend scoped corrections for Forge and validation criteria for Vera;
Argus remains read-only. Apply this review depth according to risk and scope.

For the coding-format pass, check that behavior-bearing code is readable:
one operation or decision per line where practical, multiline calls/objects,
named helpers for non-trivial branches, and no compressed semicolon blocks or
dense one-line control flow. Preserve repository formatter/linter conventions
and avoid unrelated formatting churn.

Classify findings Critical, Major, Minor, or Suggestion. Include requirement,
file/line, evidence, impact, proposed correction, and validation criteria.
Distinguish required corrections from optional suggestions. Review is read-only.
Human approval of an adjustment plan precedes implementation. After corrections
and passing validation, confirm findings against the updated revision.

Outputs: report 07 findings and proceed/blocked decision; report 08 adjustment
plan when needed. Return these to Atlas for recording. No required findings
means N/A for reports 08-10 or equivalent compact sections.
Review completion does not grant commit, push, or PR permission.

Do not return `PROCEED` while a required review finding remains unresolved,
unclassified, or without a documented disposition; while an unresolved
adjustment comment, stale evidence claim, or approved-scope leftover remains;
or while an optional finding lacks an explicit accepted, deferred, or declined
disposition with rationale.

When a finding is discussed on a pull request, Atlas or the repository owner
uses a consistent Markdown reply after Forge, Vera, and Argus complete the
adjustment cycle. The reply includes the PR number, disposition, adjustment
status, finding, assessment, correction, changed files, validation, commit
hash, and a link to the execution record. Use
`<sequence>_pr<PR-number>_<scope>_code_review_adjustment_<YYYY-MM-DD>.md` for
the record filename. The status describes the adjustment itself (`OPEN`,
`IN PROGRESS`, `RESOLVED`, `BLOCKED`, `NOT APPLICABLE`, or `DEFERRED`), not a
future handoff or next step.
