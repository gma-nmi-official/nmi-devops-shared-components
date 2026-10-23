# Manual testing reference for QA: Copilot agent profiles

## Scope and handoff

- Requirements: [state.md](state.md), R-001 through R-003
- Automated/configuration validation: [state.md](state.md)
- Repository: `gma-nmi-official/nmi-devops-shared-components`
- Branch: `feature/copilot-agent-profiles`
- Base: `master` at `d91ac862dda90073875d16c70bb24886d334ff98`
- Revision: `414684a17bbc3d33e34aa622929359b2eb735535`
- Prepared by and date: Atlas, 2026-10-23 (Asia/Shanghai)
- QA recipient / owner: Pending assignment
- Handoff: Prepared; not sent
- Required manual checks: Confirm local VS Code discovery and GitHub.com
  discovery after the profiles reach the relevant branch/default branch.

This reference supplements structural validation. The checks below have not
been executed; preparing this file does not imply that Copilot discovered or ran
any profile.

## Preconditions and safe setup

- Use an authorized VS Code Copilot session and the repository checkout on
  `feature/copilot-agent-profiles` for case COPILOT-MANUAL-001.
- For case COPILOT-MANUAL-002, the profile commit must be pushed and merged to
  the repository's default branch. No push or merge is authorized by this
  record.
- Do not use production credentials or create a GitHub agent task as part of
  this check unless separately authorized.
- No cleanup is required.

## Case COPILOT-MANUAL-001: VS Code agent picker discovery

- Requirement / acceptance criterion: R-003
- Test level and required or optional: Manual acceptance; required
- Preconditions and input data: Open the repository at
  `feature/copilot-agent-profiles` in a VS Code version that supports Copilot
  custom agents.

| Step | Action / exact command | Expected observable result |
| --- | --- | --- |
| 1 | Open the Copilot Chat agent selector. | The selector lists Atlas, Athena, Forge, Vera, Argus, and Orion as available custom agents. |
| 2 | Select each profile in turn. | Each profile loads its matching role instructions without a profile parsing error. |

- Cleanup / reset: Return to the regular Copilot agent.
- Actual result: Not executed
- Status: BLOCKED (not executed)
- Tester / execution date / tested revision: Not assigned
- Evidence / screenshot / log reference: None
- Defect reference and retest result: None

## Case COPILOT-MANUAL-002: GitHub.com custom agent discovery

- Requirement / acceptance criterion: R-003
- Test level and required or optional: Manual acceptance; required
- Preconditions and input data: Profiles are present on the repository's
  default branch; sign in with an account permitted to use Copilot agents.

| Step | Action / exact command | Expected observable result |
| --- | --- | --- |
| 1 | Open the repository's Copilot Agents page and start/select a new agent task. | The custom-agent selector lists Atlas, Athena, Forge, Vera, Argus, and Orion. |
| 2 | Select a profile without submitting a task. | The selected profile is accepted and its name/instructions are shown; no session is claimed as executed by this check. |

- Cleanup / reset: Leave the page without starting a task.
- Actual result: Not executed
- Status: BLOCKED (profiles are not yet on the default branch)
- Tester / execution date / tested revision: Not assigned
- Evidence / screenshot / log reference: None
- Defect reference and retest result: None

## Results and next action

Both required manual checks remain BLOCKED. After separate push approval and
merge to the default branch, assign a QA owner, execute the checks, and update
their actual results and evidence. Until then, GitHub-side availability is not
claimed.
