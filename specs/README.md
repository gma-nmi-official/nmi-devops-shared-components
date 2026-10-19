# Project specifications and execution records

This directory contains repository-local requirements, designs, test plans, approval records, and execution evidence for NMI DevOps Shared Components.

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

Reusable workflow templates are available under [`templates/`](templates/), including requirements, design, acceptance criteria, test plans, manual testing, approvals, bugfix records, and execution reports.

## Transferred project records

The project history previously maintained in the external `PERSONAL_WORKFLOW` checkout is stored locally under [`2026/`](2026/):

- [`gno-shared-components-v2-adoption/`](2026/gno-shared-components-v2-adoption/) — repository adoption
- [`gno-shared-components-v2-registration/`](2026/gno-shared-components-v2-registration/) — repository registration
- [`gno-shared-components-v2-foundation/`](2026/gno-shared-components-v2-foundation/) — foundation requirements, `portal_header` specifications, execution evidence, and presentation

Future agents should use these repository-local records as the primary project source of truth. The external workflow checkout is no longer required to discover this project's specifications.
