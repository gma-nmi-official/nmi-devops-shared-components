---
name: "workflow-enhancement"
description: "Propose and implement explicitly approved changes to the GNO framework, setup, agents, skills, or templates."
---

# Workflow enhancement

Atlas coordinates. Read [policy](../../../AGENTS.md) and
[enhancement workflow](../../../.codex/workflows/enhancement.md).
Inputs: requested behavior, existing framework, previous evidence and approval.

Inspect before changing. Prepare scope, affected files, compatibility impact,
and validation plan. Reuse approval already granted for the same scope;
otherwise obtain workflow-change approval. Do not edit application repositories.

Align policy and dependent agents, skills, workflows, templates, setup,
validator, README, prompt, changelog, and version as applicable.
Preserve the six agreed names and gates unless their change is explicitly approved.
For script changes, run relevant positive and negative tests before review.
Validate configuration structure and references; preserve user changes/history.

Output a self-contained execution report with context, approval, changes,
commands/results, risks, review status, and next stage. Review adjustments need
approval. Commit and push remain separate actions.
