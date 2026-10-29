import Link from "next/link";
import { componentGuides } from "./catalog/component-guides";
import { DocumentationShell } from "./documentation-shell";

export default function Home() {
  return (
    <DocumentationShell>
      <main id="main-content">
        <section className="home-hero" aria-labelledby="page-title">
          <div className="home-hero__copy">
            <p className="docs-eyebrow">NMI DevOps · Shared Components v1.4.0</p>
            <h1 id="page-title">
              Build consistent portal experiences with confidence.
            </h1>
            <p className="home-hero__lede">
              Production-minded React components and integrations for GNO portal
              teams—documented from first install through operational handoff.
            </p>
            <div className="docs-actions">
              <Link className="docs-button docs-button--primary" href="/catalog">
                Explore component guides
              </Link>
              <Link className="docs-button docs-button--secondary" href="/docs">
                Open Storybook
              </Link>
            </div>
          </div>
          <aside className="home-hero__panel" aria-label="Package summary">
            <p>One package. Clear ownership.</p>
            <dl>
              <div>
                <dt>Package</dt>
                <dd>nmi-devops-shared-components</dd>
              </div>
              <div>
                <dt>Runtime</dt>
                <dd>React 19</dd>
              </div>
              <div>
                <dt>Current inventory</dt>
                <dd>3 components · 1 integration</dd>
              </div>
            </dl>
          </aside>
        </section>

        <section className="docs-section" aria-labelledby="guides-title">
          <div className="docs-section__heading">
            <div>
              <p className="docs-eyebrow">Component guides</p>
              <h2 id="guides-title">Start with the outcome you need.</h2>
            </div>
            <p>
              Each guide covers installation, a minimal setup, configuration,
              responsibility boundaries, and operational considerations.
            </p>
          </div>
          <div className="guide-card-grid">
            {componentGuides.map((guide, index) => (
              <Link
                className="guide-card"
                href={`/catalog/${guide.slug}`}
                key={guide.slug}
              >
                <span className="guide-card__index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="guide-card__category">{guide.category}</span>
                <h3>{guide.name}</h3>
                <p>{guide.summary}</p>
                <span className="guide-card__link">
                  Read guide <span aria-hidden="true">↗</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="quick-start" aria-labelledby="quick-start-title" id="setup">
          <div>
            <p className="docs-eyebrow">Quick start</p>
            <h2 id="quick-start-title">From release asset to first render.</h2>
            <p>
              Download the approved package release, install the archive, then
              open the guide for the component you are integrating.
            </p>
          </div>
          <div className="quick-start__steps">
            <span>01</span>
            <code>gh release download v1.4.0</code>
            <span>02</span>
            <code>npm install ./nmi-devops-shared-components-1.4.0.tgz</code>
          </div>
        </section>
      </main>
    </DocumentationShell>
  );
}
