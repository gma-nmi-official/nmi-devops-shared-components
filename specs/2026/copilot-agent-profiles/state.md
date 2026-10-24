# Current state: Copilot agent profiles

- Objective and agreed endpoint: Make the six GNO specialist roles available
  as GitHub Copilot custom agent profiles while retaining their GNO role
  boundaries and approval gates.
- Current phase / stage / delivery unit: Closure / implementation committed;
  GitHub publication pending.
- Owner: Atlas
- Last updated: 2026-10-23 (Asia/Shanghai)
- Approval log: [approvals.md](approvals.md)
- Verification and review: [manual_testing.md](manual_testing.md)
- Blockers: The branch has not been pushed or merged to the repository default
  branch. GitHub-side agent discovery and session creation have not been
  manually verified.
- Next concrete action: User reviews the feature branch; obtain separate
  approval before any push. After merge, execute the GitHub discovery checks in
  [manual_testing.md](manual_testing.md).

## Requirements and acceptance

| ID | Requirement | Acceptance criterion | Status |
| --- | --- | --- | --- |
| R-001 | Provide a Copilot profile for each GNO role. | Atlas, Athena, Forge, Vera, Argus, and Orion each have a `.github/agents/<role>.agent.md` file. | PASS |
| R-002 | Preserve role responsibilities and workflow approval boundaries. | Each profile describes its corresponding GNO role and does not grant approvals reserved for the user. | PASS; independent review found no required corrections. |
| R-003 | Make profiles consumable by Copilot. | Profiles have valid agent frontmatter; availability in VS Code and on GitHub.com remains subject to manual checks. | Structural check PASS; runtime discovery BLOCKED pending publication and execution. |

## Repository baseline and evidence

| Repository | Branch / base | Revision | Change |
| --- | --- | --- | --- |
| `gma-nmi-official/nmi-devops-shared-components` | `feature/copilot-agent-profiles` / `master` | `414684a17bbc3d33e34aa622929359b2eb735535` (`feat: add Copilot custom agent profiles`) | Six new `.github/agents/*.agent.md` profiles; no push recorded. |

The commit is based on `master` at `d91ac862dda90073875d16c70bb24886d334ff98`.
The unrelated untracked `.playwright-mcp/` files were left untouched.

## Execution and review evidence

- Structural validation: PASS. Confirmed the six expected profile filenames,
  YAML frontmatter boundaries, required names and quoted descriptions, tools
  arrays, and supported tool aliases.
- `git diff --cached --check`: PASS before commit.
- Independent Argus review of the six profiles: PROCEED, no required findings
  or optional suggestions.
- Application/runtime test suite: N/A; this change adds agent configuration
  only.
- GitHub.com discovery and VS Code picker checks: BLOCKED / not executed; see
  [manual_testing.md](manual_testing.md).
- Commit: `414684a17bbc3d33e34aa622929359b2eb735535`.
- Push, pull request, merge, and deployment: not performed or authorized by
  this record.
