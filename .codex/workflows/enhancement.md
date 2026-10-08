# Workflow enhancement

Follow [AGENTS.md](../../AGENTS.md). Atlas assesses the requested change,
affected framework files, compatibility, and validation plan. Prepare a concrete
proposal; use explicit approval already present in the conversation when it
covers the change. Application source repositories are outside this task.

Update applicable policy, agents, skills, workflows, templates, setup, validator,
README, and prompt together. Update CHANGELOG and VERSION for behavior changes.
Run relevant unit tests before review, including setup preservation and negative
validator cases when scripts change. Record execution under specs/<year>/<project>.
Code review findings require adjustment approval before implementation.
Commit and push remain separate, ungranted actions until explicitly approved.
