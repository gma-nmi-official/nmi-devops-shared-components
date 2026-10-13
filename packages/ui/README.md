# NMI DevOps Shared Components

This package is reserved for approved reusable GNO portal components. It currently contains the package, styling, build, and documentation foundation only; no public component exports are available yet.

The package will expose named exports and compiled CSS:

```tsx
// Illustrative only until the first approved public component is exported.
import { /* ApprovedGnoComponent */ } from "nmi-devops-shared-components";
import "nmi-devops-shared-components/styles.css";
```

Consumer setup, Next.js usage, catalog guidance, and versioning are documented in the repository's [`docs/consumer-setup.md`](../../docs/consumer-setup.md).
