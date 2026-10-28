# Requirements: documentation site revamp

## Requirements

| ID | Requirement | Source | Acceptance Link | Status |
| --- | --- | --- | --- | --- |
| R-001 | Revamp `/` as a professional documentation landing page with clear package purpose, version/context, primary actions, and coherent GMA-aligned visual language. | User request | AC-001, AC-002 | Approved |
| R-002 | Present all four public entries—Portal Header, Cookie Agreement, Ad Slot, and Google Analytics—on the home page and component index. | User request; current package exports | AC-003 | Approved |
| R-003 | Give every public entry a dedicated guide route: `/catalog/portal-header`, `/catalog/cookie-agreement`, `/catalog/ad-slot`, and `/catalog/google-analytics`. | User request | AC-004 | Approved |
| R-004 | Each guide must contain an overview, prerequisites/responsibility boundary, installation, minimal setup example, key configuration, accessibility/security notes where applicable, and links to its Storybook reference and related repository guidance. | Interpreted guide outcome | AC-005, AC-006 | Approved |
| R-005 | Keep `/catalog` as a useful index and preserve `/docs` as the interactive Storybook surface. | Compatibility recommendation | AC-007 | Approved |
| R-006 | All routes and content must support the existing Next.js static export, base path, and trailing-slash deployment model. | Repository constraint | AC-008 | Approved |
| R-007 | Replace `app/favicon.ico` with a repository-local copy of the user-supplied GMA New Media favicon; do not reference the remote URL at runtime. | User request refined by APR-004; reliability requirement | AC-009 | Approved |
| R-008 | The home, index, and guide pages must be keyboard operable, semantically structured, visibly focusable, responsive from 320px upward, and free of page-level horizontal overflow. | Repository quality baseline | AC-010, AC-011 | Approved |
| R-009 | Provide distinct, descriptive title and description metadata for `/`, `/catalog`, and every guide route. | Professional documentation / SEO | AC-012 | Approved |
| R-010 | Preserve safe preview behavior: no live ad-network or analytics-provider request and no regression to existing component interactions used in guide previews. | Existing catalog behavior | AC-013 | Approved |
| R-011 | Update automated browser coverage and repository-facing navigation/copy so the documented route model matches the implementation. | Workflow / regression safety | AC-014 | Approved |
| R-012 | Do not change published package behavior, exports, version, component Storybook states, or release metadata in this unit. | Scope control | AC-015 | Approved |
| R-013 | Use a repository-local copy of the supplied official NMI dark-background SVG as the documentation-shell logo, with an accessible home-link name and no runtime request to the source host. | User request; APR-004 | AC-016 | Approved |

## Assumptions and open questions

- Assumption: “each component” includes the Google Analytics integration because
  it is one of the four current public catalog entries.
- Recommendation pending approval: retain `/catalog` as the index and use the
  four `/catalog/<slug>` routes above. This preserves the established URL while
  making every guide directly addressable.
- Recommendation pending approval: use an editorial documentation aesthetic
  based on the existing navy, blue, red accent, white, and neutral palette;
  avoid reproducing the consumer Portal Header as the documentation-site shell.
- No blocking content question remains. Existing Storybook, package README,
  consumer setup, and component specs are the source of truth for guide copy.

## Approval status

Approved by APR-002 and refined by APR-004. Development is authorized only to
the scope recorded in [approvals.md](approvals.md).
