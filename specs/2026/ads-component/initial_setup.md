# Initial setup: Ads component

## Repository identity

| Repository | Branch/revision | Purpose and access |
| --- | --- | --- |
| Shared components | `master` / `c580e40819842932fe9430cefddca92bf6525867` | Writable specification target; Next.js/React/TypeScript component package |
| News reference | `C:\laragon\www\news`, `feature/api-connectivity-checker` / `16c98484aeecdec2ba4552e5f5f834d029d7a7b4` | Read-only CodeIgniter/PHP and classic-JS ad behavior reference |

The `news/AGENTS.md` instructions were read before inspecting its ad files. No files in `news` were changed. Shared worktree status was not available through the current shell bridge; preserve all existing working-tree changes.

## Stack and tooling evidence

- Shared package: Node.js 26.10.0, npm 11.19.1, React 19.2.8, Next.js 16.3.8, TypeScript 5, Storybook 10, Vitest 4, and Playwright.
- Package location: `packages/ui/`, currently a foundation with no public components.
- Relevant checks once development is approved: `npm run check`, `npm run pack:check`, and `npm run test:e2e` from the workspace root.
- News reference: CodeIgniter/PHP 7.4-compatible application, classic JavaScript/jQuery, Google Publisher Tag (GPT/GAM), and a separate AllAccess ad-zone script in some MREC views.

## Readiness

| Item | Evidence | Status |
| --- | --- | --- |
| Shared repository identity | `AGENTS.md`, registry, `.git/HEAD`, branch ref | PASS for specification planning |
| News repository identity/instructions | Registry path and `C:\laragon\www\news\AGENTS.md` | PASS for read-only analysis |
| MREC/leaderboard reference review | GPT helper, leaderboard module, MREC views, GPT loader and globals | PASS for planning; provider/sizing decisions remain open |
| Package and test tooling | `package.json`, `packages/ui/package.json`, current component foundation | PASS for planning |
| Requirements/development approval | `approvals.md` | Pending |

Specification work is ready for requirements review only. No component source, Storybook story, consumer integration, or ad network request has been created or run.
