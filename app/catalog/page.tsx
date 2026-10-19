import Link from "next/link";

export const metadata = {
  title: "Component catalog | NMI DevOps Shared Components",
  description: "GNO public components, configuration details, and import examples.",
};

export default function CatalogPage() {
  return (
    <main className="catalog">
      <header className="catalog__header">
        <Link className="catalog__back" href="/">← Showcase home</Link>
        <p className="showcase__eyebrow">GNO public component catalog</p>
        <h1>Importable building blocks for GNO portal products.</h1>
        <p>
          This catalog is intentionally empty while the first GNO component contract is being
          defined. Every approved public component will receive a rendered preview, supported
          states, configuration details, Storybook coverage, and JavaScript/TypeScript import
          examples here.
        </p>
      </header>
      <section aria-labelledby="catalog-status" className="catalog__empty">
        <p className="showcase__eyebrow">Ready for the first component</p>
        <h2 id="catalog-status">No public GNO components are published yet.</h2>
        <p>Once a component is approved, it will be exported from <code>nmi-devops-shared-components</code> and documented on this page.</p>
        <ul>
          <li>Rendered preview and supported states</li>
          <li>Configuration and component-scoped styling details</li>
          <li>Dedicated Storybook story with controls and interaction coverage</li>
          <li>JavaScript and TypeScript import examples</li>
        </ul>
        <pre><code>{`gh release download v1.0.0 --repo gma-nmi-official/2026-GNO-Website-Revamp---Shared-Components --pattern 'nmi-devops-shared-components-1.0.0.tgz'
npm install ./nmi-devops-shared-components-1.0.0.tgz

// Illustrative only until the first approved public component is exported.
import { ApprovedGnoComponent } from "nmi-devops-shared-components";
import "nmi-devops-shared-components/styles.css";`}</code></pre>
      </section>
    </main>
  );
}
