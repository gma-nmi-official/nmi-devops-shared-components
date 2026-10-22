import Link from "next/link";

export default function Home() {
  return (
    <main className="showcase">
      <section className="showcase__intro">
        <p className="showcase__eyebrow">NMI DevOps Shared Components</p>
        <h1>A dedicated foundation for GNO portal interfaces.</h1>
        <p>
          The package now includes the configurable Portal Header. Browse the catalog for its
          public API, supported states, and consumer integration guidance.
        </p>
        <Link className="showcase__catalog-link" href="/catalog">Open the component catalog →</Link>
      </section>
      <section className="showcase__panel">
        <p className="showcase__eyebrow">Catalog status</p>
        <h2>Portal Header available</h2>
        <p>Preview responsive navigation, social presets, native GET search, theme tokens, and router-adapter integration in the component catalog.</p>
      </section>
    </main>
  );
}
