# Delivery units and work breakdown: gno-shared-components-v2 foundation

| Unit | Work item | Requirements / acceptance criteria | Repository | Dependencies | Owner | Definition of done | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| U-001 | Repository hygiene and npm workspace conversion | R-001, R-010 / AC-001, AC-014 | gno-shared-components-v2 | Development approval | Forge | Workspace layout works; pre-existing dirt is explicitly preserved/resolved within approved scope; basic checks pass | Planned |
| U-002 | Package contract and build spike | R-001, R-002, R-004, R-009 / AC-002, AC-003, AC-007, AC-013 | gno-shared-components-v2 | U-001 | Forge | ESM, declarations, exports, peers, CSS path, directive preservation, and packed contents are proven | Planned |
| U-003 | Tokens and compiled styling contract | R-003, R-005 / AC-006, AC-008 | gno-shared-components-v2 | U-002 | Forge | Default/dark tokens and compiled stylesheet work without consumer source scanning | Planned |
| U-004 | Storybook and automated quality platform | R-006, R-007 / AC-009, AC-010, AC-011 | gno-shared-components-v2 | U-001, U-002 | Forge | Storybook, tests, a11y, builds, and scripts run locally; CI configuration reflects them | Planned |
| U-005 | First approved GNO component vertical slice | R-003, R-008 / AC-005, AC-006, AC-009, AC-012 | gno-shared-components-v2 | U-003, U-004 | Forge | Public GNO component API, stories, tests, styles, accessibility, and exports satisfy criteria | Planned |
| U-006 | Integration, documentation, and release readiness | R-002, R-007, R-009 / AC-003, AC-004, AC-011, AC-013 | gno-shared-components-v2 | U-002 through U-005 | Forge/Vera/Argus | Clean full checks pass, showcase consumes package, docs are current, independent review is complete | Planned |
| U-007 | Consumer-facing component catalog foundation | R-013 / AC-017, AC-018 | gno-shared-components-v2 | U-002, U-004 | Forge/Vera | Empty inventory, catalog contract, installation/import guidance, browser validation, and future component-entry pattern satisfy the catalog criteria | Complete |

## Delivery order and integration

Implement in unit order, combining U-003 and U-004 only if their configuration changes cannot be meaningfully reviewed separately. U-007 follows the first public component and becomes the catalog pattern for future components. Each unit receives implementation evidence, Vera validation, and Argus independent review before release readiness. Review corrections require their own approval. Cross-unit integration runs after U-005/U-007 and again on the final candidate revision.
