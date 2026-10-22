import Link from "next/link";
import { PortalHeaderPreview } from "./portal-header-preview";

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
          Explore the public component contract, rendered states, configuration guidance,
          accessibility notes, and consumer examples.
        </p>
      </header>
      <nav aria-label="Component index" className="catalog__index"><a href="#portal-header">Portal Header</a></nav>
      <section aria-labelledby="portal-header-title" className="catalog__entry" id="portal-header">
        <div className="catalog__entry-heading">
          <div><p className="showcase__eyebrow">Navigation</p><h2 id="portal-header-title">Portal Header</h2></div>
          <p>A production-compatible global header with branding, primary and network navigation, approved social presets, native GET search, and an accessible responsive dropdown.</p>
        </div>
        <div className="catalog__preview"><PortalHeaderPreview /></div>
        <dl className="catalog__details">
          <div><dt>Supported states</dt><dd>Production-compatible compact desktop/mobile bar with the section label optically aligned to the GMA wordmark, complete ordered GMA navigation preset, stable-ID navigation patches, full-width dropdown, current/disabled links, Entertainment/News/no social preset, search, long content, configurable section accent, and safe fallbacks.</dd></div>
          <div><dt>Accessibility</dt><dd>Semantic landmarks, labelled controls, visible and contained menu focus, Escape and outside close with trigger-focus restoration, reduced motion, and non-navigable disabled items.</dd></div>
          <div><dt>Storybook</dt><dd><a href="http://localhost:6006/?path=/docs/components-portalheader--docs">Open the dedicated Portal Header stories locally</a>.</dd></div>
        </dl>
        <div className="catalog__usage">
          <div><h3>Install and import</h3><pre><code>{`import { PortalHeader } from "nmi-devops-shared-components";
import "nmi-devops-shared-components/styles.css";`}</code></pre></div>
          <div><h3>Configure</h3><pre><code>{`<PortalHeader
  brand={{ sectionLabel: "Entertainment" }}
  primaryNavigation={[{ id: "entertainment", current: true }]}
  socialPreset="entertainment"
  search={{ action: "/search", queryParam: "q" }}
/>`}</code></pre></div>
          <div><h3>Router adapter</h3><pre><code>{`renderLink={({ href, children, ...props }) =>
  <Link href={href} {...props}>{children}</Link>
}`}</code></pre></div>
        </div>
      </section>
    </main>
  );
}
