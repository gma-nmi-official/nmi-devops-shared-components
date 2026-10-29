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

When a finding is discussed on a pull request, Atlas or the repository owner
uses a consistent Markdown reply after Forge, Vera, and Argus complete the
adjustment cycle. The reply includes the PR number, disposition, adjustment
status, finding, assessment, correction, changed files, validation, commit
hash, and a link to the execution record. Use
`<sequence>_pr<PR-number>_<scope>_code_review_adjustment_<YYYY-MM-DD>.md` for
the record filename. The status describes the adjustment itself (`OPEN`,
`IN PROGRESS`, `RESOLVED`, `BLOCKED`, `NOT APPLICABLE`, or `DEFERRED`), not a
future handoff or next step.
