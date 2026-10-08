# Project templates

Create one project under specs/<year>/<project>. One business scope can affect
multiple registered repositories. Preserve existing records and adoption history.
Follow [policy](../../AGENTS.md) and [lifecycle](../../.codex/workflows/lifecycle.md).

Start with specification.md, requirements.md, acceptance_criteria.md,
repositories.md, state.md, and approvals.md. Add design.md,
nonfunctional_requirements.md, wbs.md, and test_plan.md to the depth the task needs.
Inapplicable topics can be short N/A entries with rationale, recorded in the plan.
For a small task, equivalent sections may live in one compact document linked
from state.md; do not create empty artifacts just to satisfy a count.

Use [initial_setup.md](initial_setup.md) for concrete project prerequisites,
commands, and readiness evidence; equivalent sections may live in a compact
report. During verification, always create a standalone
[manual_testing.md](manual_testing.md) for QA, including in compact mode.
Populate cases and handoff status, or state why manual checks are N/A. Link it
from state.md and the test report; preserve prior results during retests.

Choose compact or full execution records in the approved plan:
- Compact: execution/compact_report.md holds stage decisions and evidence.
- Full: execution/01 through 16 document the stages. Use REPORT_TEMPLATE.md for
  shared context and keep stage-specific fields from each numbered template.
- For multiple units/iterations, keep separate linked copies or append dated
  iterations without overwriting previous results.
- No review adjustments: record N/A for 08-10 or the corresponding compact sections.
- Out-of-scope deployment: 15-16 record receiving owner and handoff, not deployment.

For bugfixes, add the [investigation records](bugfix/README.md).
No document or checkbox constitutes approval; approvals.md records actual
human decisions, their scope, and reference revision.
