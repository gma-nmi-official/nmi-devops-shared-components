# Initial setup: <project>

## Identity and prerequisites

- Repository absolute path, branch, base/revision, and dirty changes:
- Applicable repository instructions and access confirmation:
- Existing project or greenfield; verified facts versus proposed tooling:
- Operating system, runtime/framework and package-manager versions:
- Dependency manifest/lockfile and installation command:
- Configuration example/source and required variable names (never secret values):
- Required services, local endpoints, safe fixture data, and test accounts:

## Repeatable setup and readiness

Record the working directory for every command. Do not execute destructive setup
or use production data implicitly. Mark inapplicable steps N/A with a reason.

| Step | Working directory | Exact command / action | Expected result | Actual result / evidence | Status |
| --- | --- | --- | --- | --- | --- |
| Verify tools | | | | | PASS / FAIL / BLOCKED / N/A |
| Install dependencies | | | | | |
| Configure local environment | | | | | |
| Start required services | | | | | |
| Initialize safe test data | | | | | |
| Start application / smoke check | | | | | |
| Run baseline tests | | | | | |

## Readiness and unresolved decisions

- Blocker or question, impact, owner, and next action:
- Evidence timestamp and verified revision:
- Ready for which delivery unit; prerequisites still pending:

For greenfield work, record approved scaffolding as the first unit and verify
setup before dependent feature work. Proposed commands are not execution evidence.
