import Link from "next/link";
import { PortalHeaderPreview } from "./portal-header-preview";

export const metadata = {
  title: "Portal Header documentation | NMI DevOps Shared Components",
  description: "A clear setup and configuration guide for the Portal Header component.",
};

export default function CatalogPage() {
  return (
    <main className="catalog">
      <header className="catalog__header">
        <Link className="catalog__back" href="/">← Documentation home</Link>
        <p className="showcase__eyebrow">Package guide · Portal Header</p>
        <h1>Build a portal header in minutes.</h1>
        <p>Use this guide to understand the component, preview its default state, install it, and configure the parts your application needs.</p>
      </header>

      <nav aria-label="Page sections" className="catalog__index">
        <a href="#overview">Overview</a>
        <a href="#preview">Preview</a>
        <a href="#setup">Install</a>
        <a href="#parameters">Configure</a>
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

      <section aria-labelledby="setup-title" className="catalog__section" id="setup">
        <p className="showcase__eyebrow">03 · Install</p>
        <h2 id="setup-title">Add it to your application</h2>
        <p>Install the package, import the component, and load the shared stylesheet once.</p>
        <pre><code>{`npm install nmi-devops-shared-components

import { PortalHeader } from "nmi-devops-shared-components";
import "nmi-devops-shared-components/styles.css";

export function SiteHeader() {
  return <PortalHeader brand={{ sectionLabel: "News" }} />;
}`}</code></pre>
      </section>

      <section aria-labelledby="parameters-title" className="catalog__section" id="parameters">
        <p className="showcase__eyebrow">04 · Configure</p>
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
