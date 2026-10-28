import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DocumentationShell } from "../../documentation-shell";
import { AdSlotPreview } from "../ad-slot-preview";
import { CookieAgreementPreview } from "../cookie-agreement-preview";
import {
  componentGuides,
  getComponentGuide,
  packageInstallCode,
} from "../component-guides";
import { GoogleAnalyticsPreview } from "../google-analytics-preview";
import { PortalHeaderPreview } from "../portal-header-preview";

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return componentGuides.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getComponentGuide(slug);

  if (!guide) {
    return {};
  }

  return {
    title: `${guide.name} guide | NMI DevOps Shared Components`,
    description: guide.description,
  };
}
function GuidePreview({ slug }: { slug: string }) {
  switch (slug) {
    case "portal-header":
      return (
        <div className="catalog__preview">
          <PortalHeaderPreview />
        </div>
      );
    case "cookie-agreement":
      return (
        <div className="catalog__cookie-preview">
          <p>The preview is visible immediately; production defaults reveal it after scrolling.</p>
          <CookieAgreementPreview />
        </div>
      );
    case "ad-slot":
      return (
        <div className="catalog__ad-preview">
          <AdSlotPreview />
        </div>
      );
    case "google-analytics":
      return <GoogleAnalyticsPreview />;
    default:
      return null;
  }
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getComponentGuide(slug);

  if (!guide) {
    notFound();
  }

  return (
    <DocumentationShell>
      <main className="guide" id="main-content">
        <nav aria-label="Breadcrumb" className="breadcrumbs">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/catalog">Component guides</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{guide.name}</span>
        </nav>

        <header className="guide-hero">
          <p className="docs-eyebrow">{guide.category} guide</p>
          <h1>{guide.name}</h1>
          <p>{guide.description}</p>
          <div className="guide-hero__actions">
            <Link className="docs-button docs-button--primary" href="#install">
              Start installation
            </Link>
            <Link className="docs-button docs-button--secondary" href={guide.storyPath}>
              Open in Storybook
            </Link>
          </div>
        </header>

        <div className="guide-layout">
          <aside className="guide-toc">
            <p>On this page</p>
            <nav aria-label="Guide sections">
              <a href="#overview">Overview</a>
              <a href="#preview">Preview</a>
              <a href="#install">Install</a>
              <a href="#setup">Setup</a>
              <a href="#configuration">Configuration</a>
              <a href="#operations">Operational considerations</a>
            </nav>
          </aside>

          <article className="guide-content">
            <section id="overview">
              <p className="guide-content__number">01</p>
              <h2>Overview</h2>
              <p>{guide.summary}</p>
              <h3>Before you begin</h3>
              <ul>
                {guide.prerequisites.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section id="preview">
              <p className="guide-content__number">02</p>
              <h2>Preview</h2>
              <p>
                This is a local demonstration. It does not call a production ad
                or analytics provider.
              </p>
              <GuidePreview slug={guide.slug} />
            </section>

            <section id="install">
              <p className="guide-content__number">03</p>
              <h2>Install</h2>
              <p>
                Download the approved private release asset, then install the
                archive from your consumer project.
              </p>
              <pre><code>{packageInstallCode}</code></pre>
            </section>

            <section id="setup">
              <p className="guide-content__number">04</p>
              <h2>Setup</h2>
              <p>
                Start with the smallest valid integration, then add only the
                configuration your product owns.
              </p>
              <pre><code>{guide.setupCode}</code></pre>
            </section>

            <section id="configuration">
              <p className="guide-content__number">05</p>
              <h2>Configuration</h2>
              <dl className="configuration-list">
                {guide.configuration.map((item) => (
                  <div key={item.name}>
                    <dt><code>{item.name}</code></dt>
                    <dd>{item.description}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="operations">
              <p className="guide-content__number">06</p>
              <h2>Operational considerations</h2>
              <div className="consideration-grid">
                <div>
                  <h3>Accessibility</h3>
                  <ul>
                    {guide.accessibility.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h3>Security and privacy</h3>
                  <ul>
                    {guide.security.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h3>Operations</h3>
                  <ul>
                    {guide.operations.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </section>

            <section className="guide-resources" aria-labelledby="resources-title">
              <p className="docs-eyebrow">Continue exploring</p>
              <h2 id="resources-title">Reference and source</h2>
              <div>
                <Link href={guide.storyPath}>Interactive Storybook example →</Link>
                <Link href="/docs/?path=/docs/guides--getting-started">Getting started reference →</Link>
                <a href="https://github.com/gma-nmi-official/nmi-devops-shared-components/blob/master/docs/consumer-setup.md">
                  Consumer setup document →
                </a>
              </div>
              <p>Source: <code>{guide.sourcePath}</code></p>
            </section>
          </article>
        </div>
      </main>
    </DocumentationShell>
  );
}
