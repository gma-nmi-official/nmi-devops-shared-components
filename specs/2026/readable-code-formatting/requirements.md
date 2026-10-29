# Readable code formatting requirements

## Objective

Make indentation and intentional line breaks an explicit Forge implementation
standard and apply that standard to every published component and deployed
public documentation surface without changing behavior.

## Requirements

| ID | Requirement | Acceptance |
| --- | --- | --- |
| RCF-R01 | Forge guidance must require indentation that exposes nesting, ownership, and control flow plus intentional line breaks for distinct operations. | Implementation skill and Forge agent instructions contain the rule. |
| RCF-R02 | Argus guidance must review indentation, line breaks, nested JSX, CSS, and behavior-bearing structures separately from behavior defects. | Coding-format skill and Argus agent instructions contain the rule. |
| RCF-R03 | Portal Header, Cookie Agreement, Ad Slot, Google Analytics, Storybook documentation, catalog previews/pages, and shared/public CSS must receive a focused readability pass. | Dense scoped structures are expanded and CSS nesting/declarations are indented. |
| RCF-R04 | The delivery must preserve APIs, runtime behavior, selectors, declarations, ordering, package versions, and deployment configuration. | Type, lint, tests, builds, size gates, static export, and browser checks pass. |
| RCF-R05 | Unrelated working-tree content must remain untouched. | Pre-existing `.playwright-mcp/` remains excluded. |

## Scope and decisions

- This is a behavior-neutral workflow and formatting delivery unit.
- No dependency, framework, architecture, public API, component state, test
  expectation, deployment workflow, or package-version change is authorized.
- Existing size limits remain unchanged. Formatting is adjusted as needed to
  preserve those limits.
- Automated regression coverage is applicable; new behavior tests are not
  required because no behavior changes are intended.
- Independent Argus review remains required before commit readiness.
