import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { AdSlotPreview } from "./ad-slot-preview";
import { CookieAgreementPreview } from "./cookie-agreement-preview";
import { GoogleAnalyticsPreview } from "./google-analytics-preview";
import { PortalHeaderPreview } from "./portal-header-preview";

export const metadata = {
  title: "Component catalog | NMI DevOps Shared Components",
  description: "Setup, previews, and configuration guidance for shared GNO components.",
};

function CatalogParameter({
  children,
  names,
}: {
  children: ReactNode;
  names: string | readonly string[];
}) {
  const parameterNames = typeof names === "string" ? [names] : names;

  return (
    <div>
      {parameterNames.map((name, index) => (
        <Fragment key={name}>
          {index > 0 ? " and " : null}
          <code>{name}</code>
        </Fragment>
      ))}
      <span>{children}</span>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <main className="catalog">
      <header className="catalog__header">
        <Link className="catalog__back" href="/">
          ← Documentation home
        </Link>
        <p className="showcase__eyebrow">Package guide · Shared Components</p>
        <h1>Build consistent portal experiences in minutes.</h1>
        <p>
          Use this guide to understand each component, preview its default
          state, install it, and configure the parts your application needs.
        </p>
      </header>

      <nav aria-label="Page sections" className="catalog__index">
        <a href="#overview">Overview</a>
        <a href="#preview">Preview</a>
        <a href="#cookie-agreement">Cookie Agreement</a>
        <a href="#ad-slot">Ad Slot</a>
        <a href="#google-analytics">Google Analytics</a>
        <a href="#setup">Install</a>
        <a href="#parameters">Portal Header</a>
        <a href="#cookie-configuration">Cookie Agreement config</a>
      </nav>

      <section
        aria-labelledby="overview-title"
        className="catalog__section"
        id="overview"
      >
        <p className="showcase__eyebrow">01 · Overview</p>
        <h2 id="overview-title">What is Portal Header?</h2>
        <p>
          Portal Header is a responsive, accessible navigation header for GNO
          portal applications.
        </p>
        <ul className="catalog__list">
          <li>Branding with a logo and section label</li>
          <li>Primary and network navigation</li>
          <li>Optional social links and GET search</li>
          <li>Keyboard-friendly mobile menu and focus handling</li>
        </ul>
      </section>

      <section
        aria-labelledby="preview-title"
        className="catalog__section"
        id="preview"
      >
        <p className="showcase__eyebrow">02 · Preview</p>
        <h2 id="preview-title">See the default header</h2>
        <p>
          The preview uses the News social preset, a current News navigation
          item, and a catalog search action.
        </p>
        <div className="catalog__preview">
          <PortalHeaderPreview />
        </div>
      </section>

      <section
        aria-labelledby="cookie-agreement-title"
        className="catalog__section"
        id="cookie-agreement"
      >
        <p className="showcase__eyebrow">03 · Cookie Agreement</p>
        <h2 id="cookie-agreement-title">What is Cookie Agreement?</h2>
        <p>
          Cookie Agreement is a standalone fixed-bottom privacy notice. In
          production it remains hidden until the configurable scroll threshold
          is reached, then slides up; it persists only explicit <code>I AGREE</code>
          {" "}acceptance and contains no GA or generic analytics functionality.
        </p>
        <div className="catalog__cookie-preview">
          <p>
            Live preview: threshold is set to 0 here so the fixed-bottom
            slide-up surface is visible while browsing the catalog.
          </p>
          <CookieAgreementPreview />
        </div>
        <ul className="catalog__list">
          <li>
            <code>FIND OUT MORE</code> links to the configurable privacy policy
            destination.
          </li>
          <li>
            Reject is hidden by default; when enabled it dismisses only for the
            current session.
          </li>
          <li>
            The repository-local NPC seal and all visual assets load without
            remote runtime assets.
          </li>
        </ul>
      </section>

      <section
        aria-labelledby="ad-slot-title"
        className="catalog__section"
        id="ad-slot"
      >
        <p className="showcase__eyebrow">04 · Ad Slot</p>
        <h2 id="ad-slot-title">
          Configurable display ads without hidden inventory defaults
        </h2>
        <p>
          <code>AdSlot</code> owns one slot lifecycle while the consumer owns GPT
          setup, consent, eligibility, full ad unit paths, and every allowed size
          for each active breakpoint.
        </p>
        <div className="catalog__ad-preview">
          <AdSlotPreview />
        </div>
        <div className="catalog__parameters">
          <CatalogParameter names="config.rules">
            Contiguous responsive rules; active rules require a full ad unit
            path and non-empty sizes.
          </CatalogParameter>
          <CatalogParameter names="enabled">
            Set from consumer consent and eligibility. False guarantees no
            provider slot is created.
          </CatalogParameter>
          <CatalogParameter names="provider">
            Inject a provider such as <code>createGptAdProvider</code>; the
            catalog uses a local fake.
          </CatalogParameter>
          <CatalogParameter names="emptyBehavior">
            Reserve space by default; select collapse explicitly when layout
            movement is acceptable.
          </CatalogParameter>
        </div>
        <pre>
          <code>{`const config = {
  key: "article-mrec",
  format: "mrec",
  reservedSize: [300, 250],
  rules: [
    { minWidth: 0, maxWidth: 767, enabled: false },
    { minWidth: 768, adUnitPath: "/123/news/article-mrec", sizes: [[300, 250], [300, 600]] }
  ]
};

<AdSlot config={config} enabled={hasAdConsent} provider={provider} />`}</code>
        </pre>
      </section>

      <section
        aria-labelledby="setup-title"
        className="catalog__section"
        id="setup"
      >
        <p className="showcase__eyebrow">05 · Install</p>
        <h2 id="setup-title">Add it to your application</h2>
        <p>
          Install the package, import the component, and load the shared
          stylesheet once.
        </p>
        <pre>
          <code>{`npm install nmi-devops-shared-components

import { PortalHeader } from "nmi-devops-shared-components";
import "nmi-devops-shared-components/styles.css";

export function SiteHeader() {
  return <PortalHeader brand={{ sectionLabel: "News" }} />;
}`}</code>
        </pre>
      </section>

      <section
        aria-labelledby="google-analytics-title"
        className="catalog__section"
        id="google-analytics"
      >
        <p className="showcase__eyebrow">06 · Google Analytics</p>
        <h2 id="google-analytics-title">Consent-aware GA4 delivery</h2>
        <p>
          The opt-in integration provides explicit page views, semantic
          click/search/scroll/video helpers, configurable content dimensions,
          and direct <code>gtag.js</code> or GTM transports. It never loads a
          provider script or retries failed sends.
        </p>
        <GoogleAnalyticsPreview />
        <pre>
          <code>{`const analytics = createGoogleAnalytics({
  transport: { type: "gtag", gtag },
  measurementId: "G-EXAMPLE",
  consent: "unknown",
  portalSection: "News",
});`}</code>
        </pre>
      </section>

      <section
        aria-labelledby="cookie-configuration-title"
        className="catalog__section"
        id="cookie-configuration"
      >
        <p className="showcase__eyebrow">07 · Configure Cookie Agreement</p>
        <h2 id="cookie-configuration-title">
          Keep consent explicit and consumer-owned
        </h2>
        <p>
          Pass a policy version and optionally inject a typed
          {" "}<code>ConsentStore</code>. The default adapter uses a host-only
          {" "}<code>gno_cookie_consent</code> cookie with a 365-day expiry.
        </p>
        <div className="catalog__parameters">
          <CatalogParameter names="policyVersion">
            Required version used to invalidate older acceptance records.
          </CatalogParameter>
          <CatalogParameter names="store">
            Optional typed read/write/clear adapter; storage failures remain
            observable.
          </CatalogParameter>
          <CatalogParameter names="rejectEnabled">
            Opt-in temporary dismissal; hidden by default and not persisted.
          </CatalogParameter>
          <CatalogParameter names="scrollRevealThreshold">
            Viewport-height fraction scrolled before the notice slides up;
            defaults to <code>0.1</code>.
          </CatalogParameter>
          <CatalogParameter names="copy">
            Configure plain-text accessible name, body, and action labels.
          </CatalogParameter>
          <CatalogParameter names="findOutMoreHref">
            Independent absolute HTTPS privacy-policy destination.
          </CatalogParameter>
          <CatalogParameter names="seal">
            Optional repository-local NPC seal source, alt text, and independent
            HTTPS destination.
          </CatalogParameter>
        </div>
        <pre>
          <code>{`import { CookieAgreement } from "nmi-devops-shared-components";
import "nmi-devops-shared-components/styles.css";

<CookieAgreement
  policyVersion="2026-01"
  rejectEnabled
  findOutMoreHref="https://www.gmanetwork.com/privacypolicy/"
/>`}</code>
        </pre>
      </section>

      <section
        aria-labelledby="parameters-title"
        className="catalog__section"
        id="parameters"
      >
        <p className="showcase__eyebrow">08 · Configure Portal Header</p>
        <h2 id="parameters-title">Choose what your header needs</h2>
        <p>
          All props are optional. Start with the defaults, then add only the
          options your product uses.
        </p>
        <div className="catalog__parameters">
          <CatalogParameter names="brand">
            Logo, alt text, home link, and section label.
          </CatalogParameter>
          <CatalogParameter names="navigationPreset">
            Use the built-in <code>gma</code> menu or start with <code>none</code>.
          </CatalogParameter>
          <CatalogParameter names="primaryNavigation">
            Set primary labels, links, current, disabled, or hidden states.
          </CatalogParameter>
          <CatalogParameter names="networkNavigation">
            Patch or extend network links by stable ID.
          </CatalogParameter>
          <CatalogParameter names="socialPreset">
            Choose <code>news</code>, <code>entertainment</code>, or
            {" "}<code>none</code>.
          </CatalogParameter>
          <CatalogParameter names="socialLinks">
            Supply custom social URLs, icons, labels, targets, or hidden items.
          </CatalogParameter>
          <CatalogParameter names="search">
            Configure the GET action, query name, label, placeholder, and submit
            label.
          </CatalogParameter>
          <CatalogParameter names="theme">
            Set light/dark mode, accent color, class name, or inline styles.
          </CatalogParameter>
          <CatalogParameter names="renderLink">
            Connect the header to a router such as Next.js <code>Link</code>.
          </CatalogParameter>
          <CatalogParameter names={["menuLabel", "closeMenuLabel"]}>
            Customize mobile menu button announcements.
          </CatalogParameter>
          <CatalogParameter names={["searchToggleLabel", "closeSearchLabel"]}>
            Customize search button announcements.
          </CatalogParameter>
        </div>
      </section>
    </main>
  );
}
