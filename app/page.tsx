import Link from "next/link";

export default function Home() {
  return (
    <main className="showcase">
      <section className="showcase__intro">
        <p className="showcase__eyebrow">GNO shared components</p>
        <h1>A dedicated foundation for GNO portal interfaces.</h1>
        <p>
          The component package is ready for the first approved GNO component. Browse the
          catalog for public exports and consumer import guidance.
        </p>
        <Link className="showcase__catalog-link" href="/catalog">Open the component catalog →</Link>
      </section>
      <section className="showcase__panel">
        <p className="showcase__eyebrow">Catalog status</p>
        <h2>No public components yet</h2>
        <p>The package and documentation surface are initialized. GNO components will be added here through approved delivery units.</p>
      </section>
    </main>
  );
}
