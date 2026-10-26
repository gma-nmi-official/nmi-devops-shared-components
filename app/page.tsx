import Link from "next/link";

export default function Home() {
  return (
    <main className="docs-home">
      <header className="docs-home__topbar">
        <Link className="docs-home__brand" href="/" aria-label="NMI DevOps Shared Components home">
          <span className="docs-home__brand-mark" aria-hidden="true">NMI</span>
          <span>NMI DevOps Shared Components</span>
        </Link>
        <nav aria-label="Primary navigation">
          <Link href="/catalog">Package guide</Link>
          <Link href="/docs">Components</Link>
        </nav>
      </header>

      <section className="docs-home__hero" aria-labelledby="page-title">
        <div className="docs-home__hero-copy">
          <p className="docs-home__eyebrow">NMI DevOps Shared Components · v1.3.0</p>
          <h1 id="page-title">Build consistent portal experiences with shared components.</h1>
          <p className="docs-home__lede">
            A maintained React component package for accessible, configurable portal interfaces.
            Use this site to install the package, understand its API, and see each component in action.
          </p>
          <div className="docs-home__actions">
            <Link className="docs-home__button docs-home__button--primary" href="/catalog">
              Read the package guide
            </Link>
            <Link className="docs-home__button docs-home__button--secondary" href="/docs">
              Browse components
            </Link>
          </div>
        </div>

        <aside className="docs-home__summary" aria-label="Package summary">
          <p className="docs-home__summary-label">Package summary</p>
          <dl>
            <div><dt>Package</dt><dd><code>nmi-devops-shared-components</code></dd></div>
            <div><dt>Framework</dt><dd>React 19</dd></div>
            <div><dt>Documentation</dt><dd>Guides, examples, and releases</dd></div>
          </dl>
        </aside>
      </section>

      <section className="docs-home__section" aria-labelledby="start-title">
        <div className="docs-home__section-heading">
          <p className="docs-home__eyebrow">Start here</p>
          <h2 id="start-title">Everything you need to use the package.</h2>
        </div>
        <div className="docs-home__cards">
          <Link className="docs-home__card" href="/catalog#setup">
            <span className="docs-home__card-number">01</span>
            <h3>Set up the package</h3>
            <p>Install the package and add a component to your application.</p>
            <span className="docs-home__card-link">Open setup guide <span aria-hidden="true">→</span></span>
          </Link>
          <Link className="docs-home__card" href="/docs">
            <span className="docs-home__card-number">02</span>
            <h3>Explore components</h3>
            <p>Review live states, controls, accessibility notes, and usage examples.</p>
            <span className="docs-home__card-link">View component docs <span aria-hidden="true">→</span></span>
          </Link>
          <Link className="docs-home__card" href="/docs/?path=/docs/releases-changelog--latest">
            <span className="docs-home__card-number">03</span>
            <h3>Follow releases</h3>
            <p>Check what changed before upgrading and plan consumer updates.</p>
            <span className="docs-home__card-link">Read release notes <span aria-hidden="true">→</span></span>
          </Link>
        </div>
      </section>

      <section className="docs-home__install" aria-labelledby="install-title">
        <div>
          <p className="docs-home__eyebrow">Quick start</p>
          <h2 id="install-title">Install once, compose everywhere.</h2>
          <p>Use the package in a consumer application, then import the components you need.</p>
        </div>
        <pre><code>npm install nmi-devops-shared-components</code></pre>
      </section>

      <footer className="docs-home__footer">
        <span>Documentation for NMI DevOps Shared Components</span>
        <Link href="/catalog">Package guide <span aria-hidden="true">→</span></Link>
      </footer>
    </main>
  );
}
