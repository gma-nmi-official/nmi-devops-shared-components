# Initial setup: Ads component

## Repository identity

| Repository | Branch/revision | Purpose and access |
| --- | --- | --- |
| Shared components | `feature/ads-component` / `a546c6858312b4d3a168009efad37da276afe9b1` | Writable planning target; Next.js/React/TypeScript component package |
| Shared comparison | `origin/master` / `f4d5579` with merge base `c453774` | Branch is 3 commits behind and 2 commits ahead; rebase/merge strategy is a repository-owner decision before implementation |
| News reference | `C:\laragon\www\news`, `hotfix/GNO-21329` / `28d3312872ac7dee53215939faeeda50b0d37e87` | Read-only CodeIgniter/PHP and classic-JS ad behavior reference |

The `news/AGENTS.md` instructions were read before inspecting its ad files. No files in `news` were changed. Its worktree already contained untracked `.codex/` and `AGENTS.md`. The shared worktree already contained untracked `.playwright-mcp/`; it remains untouched.

## Stack and tooling evidence

- Shared package: Node.js 26.10.0, npm 11.19.1, React 19.2.8, Next.js 16.4.2, TypeScript 5, Storybook 10, Vitest 4, and Playwright.
- Package location: `packages/ui/`; public exports currently include Portal Header and Cookie Agreement.
- Relevant installed Next.js guidance reviewed: Server/Client Components, `use client`, `Script`, and third-party-library guidance under `node_modules/next/dist/docs/`.
- Relevant checks once development is approved: `npm run check`, `npm run pack:check`, and `npm run test:e2e` from the workspace root.
- News reference: CodeIgniter/PHP 7.4-compatible application, classic JavaScript/jQuery, Google Publisher Tag (GPT/GAM), and a separate AllAccess ad-zone script in some MREC views.

## Readiness

| Item | Evidence | Status |
| --- | --- | --- |
| Shared repository identity | `AGENTS.md`, registry, Git branch/revision/status and `origin/master` comparison | PASS for specification planning; branch synchronization remains before implementation |
| News repository identity/instructions | Registry path and `C:\laragon\www\news\AGENTS.md` | PASS for read-only analysis |
| MREC/leaderboard reference review | GPT helper, leaderboard module, MREC views, GPT loader and globals | PASS for planning; provider/sizing decisions remain open |
| Package and test tooling | `package.json`, `packages/ui/package.json`, current component foundation | PASS for planning |
| Requirements/development approval | `approvals.md` | Pending |

Requirements are approved by ADS-A04 and the implementation plan is ready for development review. No component source, Storybook story, consumer integration, or ad network request has been created or run; development approval remains pending.
