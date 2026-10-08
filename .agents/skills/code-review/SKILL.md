---
name: "code-review"
description: "Independently review a tested GNO change set against approved requirements and prepare findings without editing code."
---

# Independent code review

Role: Argus. Read [policy](../../../AGENTS.md) and
[lifecycle](../../../.codex/workflows/lifecycle.md).
Inputs: approved requirements/design, passing relevant tests, actual change set,
and recorded base. A PR need not exist. Missing prerequisites mean BLOCKED.

Inspect the local diff and relevant surrounding behavior. Check correctness,
permissions, error paths, compatibility, regressions, and test adequacy within
scope. Do not invent requirements or request unrelated modernization.

Classify findings Critical, Major, Minor, or Suggestion. Include requirement,
file/line, evidence, impact, proposed correction, and validation criteria.
Distinguish required corrections from optional suggestions. Review is read-only.
Human approval of an adjustment plan precedes implementation. After corrections
and passing validation, confirm findings against the updated revision.

Outputs: report 07 findings and proceed/blocked decision; report 08 adjustment
plan when needed. Return these to Atlas for recording. No required findings
means N/A for reports 08-10 or equivalent compact sections.
Review completion does not grant commit, push, or PR permission.
