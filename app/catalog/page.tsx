import Link from "next/link";
import { AdSlotPreview } from "./ad-slot-preview";
import { CookieAgreementPreview } from "./cookie-agreement-preview";
import { PortalHeaderPreview } from "./portal-header-preview";

export const metadata = {
  title: "Component catalog | NMI DevOps Shared Components",
  description: "Setup, previews, and configuration guidance for shared GNO components.",
};

export default function CatalogPage() {
  return (
    <main className="catalog">
      <header className="catalog__header">
        <Link className="catalog__back" href="/">← Documentation home</Link>
        <p className="showcase__eyebrow">Package guide · Shared Components</p>
        <h1>Build consistent portal experiences in minutes.</h1>
        <p>Use this guide to understand each component, preview its default state, install it, and configure the parts your application needs.</p>
      </header>

      <nav aria-label="Page sections" className="catalog__index">
        <a href="#overview">Overview</a>
        <a href="#preview">Preview</a>
        <a href="#cookie-agreement">Cookie Agreement</a>
        <a href="#ad-slot">Ad Slot</a>
        <a href="#setup">Install</a>
        <a href="#parameters">Portal Header</a>
        <a href="#cookie-configuration">Cookie Agreement config</a>
      </nav>

      <section aria-labelledby="overview-title" className="catalog__section" id="overview">
        <p className="showcase__eyebrow">01 · Overview</p>
        <h2 id="overview-title">What is Portal Header?</h2>
        <p>Portal Header is a responsive, accessible navigation header for GNO portal applications.</p>
        <ul className="catalog__list">
          <li>Branding with a logo and section label</li>
          <li>Primary and network navigation</li>
          <li>Optional social links and GET search</li>
          <li>Keyboard-friendly mobile menu and focus handling</li>
        </ul>
      </section>

      <section aria-labelledby="preview-title" className="catalog__section" id="preview">
        <p className="showcase__eyebrow">02 · Preview</p>
        <h2 id="preview-title">See the default header</h2>
        <p>The preview uses the News social preset, a current News navigation item, and a catalog search action.</p>
        <div className="catalog__preview"><PortalHeaderPreview /></div>
      </section>

      <section aria-labelledby="cookie-agreement-title" className="catalog__section" id="cookie-agreement">
        <p className="showcase__eyebrow">03 · Cookie Agreement</p>
        <h2 id="cookie-agreement-title">What is Cookie Agreement?</h2>
        <p>Cookie Agreement is a standalone fixed-bottom privacy notice. In production it remains hidden until the configurable scroll threshold is reached, then slides up; it persists only explicit <code>I AGREE</code> acceptance and contains no GA or generic analytics functionality.</p>
        <div className="catalog__cookie-preview">
          <p>Live preview: threshold is set to 0 here so the fixed-bottom slide-up surface is visible while browsing the catalog.</p>
          <CookieAgreementPreview />
        </div>
        <ul className="catalog__list">
          <li><code>FIND OUT MORE</code> links to the configurable privacy policy destination.</li>
          <li>Reject is hidden by default; when enabled it dismisses only for the current session.</li>
          <li>The repository-local NPC seal and all visual assets load without remote runtime assets.</li>
        </ul>
      </section>

      <section aria-labelledby="ad-slot-title" className="catalog__section" id="ad-slot">
        <p className="showcase__eyebrow">04 · Ad Slot</p>
        <h2 id="ad-slot-title">Configurable display ads without hidden inventory defaults</h2>
        <p><code>AdSlot</code> owns one slot lifecycle while the consumer owns GPT setup, consent, eligibility, full ad unit paths, and every allowed size for each active breakpoint.</p>
        <div className="catalog__ad-preview"><AdSlotPreview /></div>
        <div className="catalog__parameters">
          <div><code>config.rules</code><span>Contiguous responsive rules; active rules require a full ad unit path and non-empty sizes.</span></div>
          <div><code>enabled</code><span>Set from consumer consent and eligibility. False guarantees no provider slot is created.</span></div>
          <div><code>provider</code><span>Inject a provider such as <code>createGptAdProvider</code>; the catalog uses a local fake.</span></div>
          <div><code>emptyBehavior</code><span>Reserve space by default; select collapse explicitly when layout movement is acceptable.</span></div>
        </div>
        <pre><code>{`const config = {
  key: "article-mrec",
  format: "mrec",
  reservedSize: [300, 250],
  rules: [
    { minWidth: 0, maxWidth: 767, enabled: false },
    { minWidth: 768, adUnitPath: "/123/news/article-mrec", sizes: [[300, 250], [300, 600]] }
  ]
};

<AdSlot config={config} enabled={hasAdConsent} provider={provider} />`}</code></pre>
      </section>

      <section aria-labelledby="setup-title" className="catalog__section" id="setup">
        <p className="showcase__eyebrow">05 · Install</p>
        <h2 id="setup-title">Add it to your application</h2>
        <p>Install the package, import the component, and load the shared stylesheet once.</p>
        <pre><code>{`npm install nmi-devops-shared-components

import { PortalHeader } from "nmi-devops-shared-components";
import "nmi-devops-shared-components/styles.css";

export function SiteHeader() {
  return <PortalHeader brand={{ sectionLabel: "News" }} />;
}`}</code></pre>
      </section>

      <section aria-labelledby="cookie-configuration-title" className="catalog__section" id="cookie-configuration">
        <p className="showcase__eyebrow">06 · Configure Cookie Agreement</p>
        <h2 id="cookie-configuration-title">Keep consent explicit and consumer-owned</h2>
        <p>Pass a policy version and optionally inject a typed <code>ConsentStore</code>. The default adapter uses a host-only <code>gno_cookie_consent</code> cookie with a 365-day expiry.</p>
        <div className="catalog__parameters">
          <div><code>policyVersion</code><span>Required version used to invalidate older acceptance records.</span></div>
          <div><code>store</code><span>Optional typed read/write/clear adapter; storage failures remain observable.</span></div>
          <div><code>rejectEnabled</code><span>Opt-in temporary dismissal; hidden by default and not persisted.</span></div>
          <div><code>scrollRevealThreshold</code><span>Viewport-height fraction scrolled before the notice slides up; defaults to <code>0.1</code>.</span></div>
          <div><code>copy</code><span>Configure plain-text accessible name, body, and action labels.</span></div>
          <div><code>findOutMoreHref</code><span>Independent absolute HTTPS privacy-policy destination.</span></div>
          <div><code>seal</code><span>Optional repository-local NPC seal source, alt text, and independent HTTPS destination.</span></div>
        </div>
        <pre><code>{`import { CookieAgreement } from "nmi-devops-shared-components";
import "nmi-devops-shared-components/styles.css";

<CookieAgreement
  policyVersion="2026-01"
  rejectEnabled
  findOutMoreHref="https://www.gmanetwork.com/privacypolicy/"
/>`}</code></pre>
      </section>

      <section aria-labelledby="parameters-title" className="catalog__section" id="parameters">
        <p className="showcase__eyebrow">07 · Configure Portal Header</p>
        <h2 id="parameters-title">Choose what your header needs</h2>
        <p>All props are optional. Start with the defaults, then add only the options your product uses.</p>
        <div className="catalog__parameters">
          <div><code>brand</code><span>Logo, alt text, home link, and section label.</span></div>
          <div><code>navigationPreset</code><span>Use the built-in <code>gma</code> menu or start with <code>none</code>.</span></div>
          <div><code>primaryNavigation</code><span>Set primary labels, links, current, disabled, or hidden states.</span></div>
          <div><code>networkNavigation</code><span>Patch or extend network links by stable ID.</span></div>
          <div><code>socialPreset</code><span>Choose <code>news</code>, <code>entertainment</code>, or <code>none</code>.</span></div>
          <div><code>socialLinks</code><span>Supply custom social URLs, icons, labels, targets, or hidden items.</span></div>
          <div><code>search</code><span>Configure the GET action, query name, label, placeholder, and submit label.</span></div>
          <div><code>theme</code><span>Set light/dark mode, accent color, class name, or inline styles.</span></div>
          <div><code>renderLink</code><span>Connect the header to a router such as Next.js <code>Link</code>.</span></div>
          <div><code>menuLabel</code> and <code>closeMenuLabel</code><span>Customize mobile menu button announcements.</span></div>
          <div><code>searchToggleLabel</code> and <code>closeSearchLabel</code><span>Customize search button announcements.</span></div>
        </div>
      </section>
    </main>
  );
}
