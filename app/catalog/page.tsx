import type { Metadata } from "next";
import Link from "next/link";
import { DocumentationShell } from "../documentation-shell";
import { componentGuides } from "./component-guides";

export const metadata: Metadata = {
  title: "Component guides | NMI DevOps Shared Components",
  description:
    "Installation, setup, configuration, and operational guidance for every shared GNO component and integration.",
};

export default function CatalogPage() {
  return (
    <DocumentationShell>
      <main className="catalog-index" id="main-content">
        <header className="catalog-index__hero">
          <p className="docs-eyebrow">Package catalog</p>
          <h1>Choose a component. Start with a complete guide.</h1>
          <p>
            Every public entry has one durable home for installation, setup,
            configuration, examples, and the responsibilities that remain with
            the consumer application.
          </p>
        </header>

        <section aria-labelledby="catalog-title" id="setup">
          <div className="catalog-index__heading">
            <h2 id="catalog-title">Available guides</h2>
            <span>{componentGuides.length} maintained entries</span>
          </div>
          <div className="catalog-list">
            {componentGuides.map((guide, index) => (
              <Link
                className="catalog-list__item"
                href={`/catalog/${guide.slug}`}
                key={guide.slug}
              >
                <span className="catalog-list__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <span className="catalog-list__category">{guide.category}</span>
                  <h2>{guide.name}</h2>
                  <p>{guide.summary}</p>
                </div>
                <span className="catalog-list__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <aside className="catalog-index__storybook">
          <div>
            <p className="docs-eyebrow">Need every state?</p>
            <h2>Use Storybook for interactive API exploration.</h2>
          </div>
          <Link className="docs-button docs-button--secondary" href="/docs">
            Browse Storybook
          </Link>
        </aside>
      </main>
    </DocumentationShell>
  );
}
