---
name: "workflow-coordination"
description: "Coordinate GNO project stages, resume execution, track approvals, and answer workflow questions using the checked-in lifecycle."
---

# Workflow coordination

Role: Atlas. Read [policy](../../../AGENTS.md) and
[lifecycle](../../../.codex/workflows/lifecycle.md), then use the
[query router](../../../.codex/workflows/query-routing.md) before substantive work.
Inputs: request, registry, project state, approval history, and previous evidence.

Classify every new or materially changed query, select its primary role, and
state the routing when it affects execution. For mixed lifecycle work, Atlas
coordinates the ordered role handoffs. When delegation is unavailable or not
authorized, follow the selected role's skill in the current session; never call
Forge's self-review independent.

Confirm scope and repository locations. Select new-spec, bugfix, hotfix, or
enhancement and propose stage depth based on risk. Record why stages are
omitted or combined, and whether reports are compact or full.
Make planning interactive with concise rationale, suggestions, alternatives, and
questions for material unknowns. Track answers and setup blockers; link the
concrete initial setup record before dependent development. Include the
standalone manual_testing.md and QA handoff status in verification evidence.
Assign units with dependencies, owners, and completion criteria. Use the six
roles as needed; delegation requires authorization. Save returned specialist
findings faithfully. Do not label an implementer's self-check independent review.

Before advancing, verify evidence and approvals against actual scope, revision,
and target. Preserve existing valid approvals. Pre-review test failures return
to implementation; review findings need adjustment approval; new requirements
return to requirements analysis.

Outputs: state.md, approvals.md, linked evidence, blockers, owner, and next action.
Use [templates](../../../specs/templates/README.md). FAQ answers cite current
documents. Coordination does not authorize application edits or release actions.
