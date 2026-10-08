---
name: "release-operations"
description: "Prepare and perform separately approved GNO commit, push, PR, merge, deployment, and operations handoff actions."
---

# Release and operations

Role: Orion. Read [policy](../../../AGENTS.md) and
[lifecycle](../../../.codex/workflows/lifecycle.md).
Inputs: approved scope/endpoint, repository/base/revision, changed files, passing
tests, independent review, validated adjustments or N/A, and approval history.

Verify actual state before each action. Prepare commit scope/message, obtain
commit approval, stage only approved files, commit, and record the resulting hash.
Present the complete push summary required by AGENTS.md. Obtain explicit push
approval after the summary; verify commit and target are unchanged before pushing.
Record command outcome and remote revision. Do not infer force-push authorization
or retry against a different target under ordinary push approval.

After successful push, prepare PR title/body/base/head, obtain separate PR
approval, create it, and record its real URL. Merge needs its own approval and
current required CI/review evidence.

Prepare environment/artifact, deployment order, migrations, compatibility,
backup needs, smoke checks, monitoring, owner, rollback triggers and commands.
Obtain deployment approval for concrete operations. Execute only authorized
recovery on failure. Verify deployed revision and relevant user behavior.
Return source-code blockers to Atlas instead of changing application code.

Outputs: reports 11-16 or compact equivalents, release result and feedback.
If operations belong to another team, identify the receiving owner and mark
deployment not executed. PR creation is distinct from production verification.
