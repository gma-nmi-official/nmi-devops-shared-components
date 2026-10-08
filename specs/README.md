# Project specifications and execution records

This directory contains repository-local requirements, designs, test plans, approval records, and execution evidence for GNO shared components.

Use a project folder such as:

```text
specs/2026/portal-header/
├─ requirements.md
├─ user-stories.md
├─ design.md
├─ test_plan.md
└─ execution/
```

Keep component requirements and decisions in this repository so the vendored GNO workflow, future developers, and review agents can discover the same source of truth without depending on a separate local workflow checkout.

The workflow bundle is installed at the repository root under `.codex/` and `.agents/`. Read [`../AGENTS.md`](../AGENTS.md) before creating a new delivery unit.
