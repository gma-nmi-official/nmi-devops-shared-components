export type ComponentGuide = {
  slug: string;
  name: string;
  category: "Component" | "Integration";
  summary: string;
  description: string;
  prerequisites: readonly string[];
  setupCode: string;
  configuration: readonly {
    name: string;
    description: string;
  }[];
  accessibility: readonly string[];
  security: readonly string[];
  operations: readonly string[];
  storyPath: string;
  sourcePath: string;
};

export const packageInstallCode = `gh release download v1.4.0 \\
  --repo gma-nmi-official/nmi-devops-shared-components \\
  --pattern "nmi-devops-shared-components-1.4.0.tgz"

npm install ./nmi-devops-shared-components-1.4.0.tgz`;

export const componentGuides = [
  {
    slug: "portal-header",
    name: "Portal Header",
    category: "Component",
    summary: "Responsive GMA navigation, search, social links, and branding.",
    description:
      "Build a production-compatible portal header with verified navigation presets and explicit consumer overrides.",
    prerequisites: [
      "React 19 application with the shared package installed.",
      "One application-level import of the package stylesheet.",
      "A narrow Client Component when providing a router render function.",
    ],
    setupCode: `import { PortalHeader } from "nmi-devops-shared-components";
import "nmi-devops-shared-components/styles.css";

export function SiteHeader() {
  return (
    <PortalHeader
      brand={{ sectionLabel: "News" }}
      primaryNavigation={[{ id: "news", current: true }]}
      socialPreset="news"
      search={{ action: "/search", queryParam: "q" }}
    />
  );
}`,
    configuration: [
      { name: "brand", description: "Home URL, accessible label, logo override, and section label." },
      { name: "navigationPreset", description: "Use the verified GMA menu or start from an empty navigation model." },
      { name: "primaryNavigation / networkNavigation", description: "Patch, hide, or append links by stable ID." },
      { name: "socialPreset / socialLinks", description: "Select a safe preset or patch HTTPS social destinations." },
      { name: "search", description: "Configure the native GET form action, query name, labels, and placeholder." },
      { name: "renderLink", description: "Connect a consumer router from a Client Component when needed." },
      { name: "theme", description: "Override the accent, mode hook, class name, or component CSS properties." },
    ],
    accessibility: [
      "Preserve meaningful link and search labels when overriding defaults.",
      "Keep the built-in focus indicators and verify the menu at 200% zoom.",
      "Test focus trapping, Escape dismissal, and trigger focus restoration.",
    ],
    security: [
      "Only HTTPS social destinations render from consumer configuration.",
      "The component does not implement account, SSO, consent, or analytics behavior.",
    ],
    operations: [
      "The package embeds its default logo and performs no runtime logo request.",
      "Consumers own destination availability and their router integration.",
    ],
    storyPath: "/docs/?path=/story/components-portalheader--desktop",
    sourcePath: "packages/ui/src/components/portal-header",
  },
  {
    slug: "cookie-agreement",
    name: "Cookie Agreement",
    category: "Component",
    summary: "An explicit, versioned privacy notice with consumer-owned storage.",
    description:
      "Present a fixed-bottom privacy notice after a configurable scroll threshold and persist only explicit acceptance.",
    prerequisites: [
      "React 19 application with the shared package and stylesheet installed.",
      "A policy version that changes whenever the accepted policy changes.",
      "A reviewed host privacy-policy URL and consent classification owned by the consumer.",
    ],
    setupCode: `import { CookieAgreement } from "nmi-devops-shared-components";
import "nmi-devops-shared-components/styles.css";

export function PrivacyNotice() {
  return (
    <CookieAgreement
      policyVersion="2026-01"
      scrollRevealThreshold={0.1}
      findOutMoreHref="https://www.gmanetwork.com/privacypolicy/"
    />
  );
}`,
    configuration: [
      { name: "policyVersion", description: "Required version used to invalidate older acceptance records." },
      { name: "store", description: "Optional typed read/write/clear adapter for consumer-controlled persistence." },
      { name: "scrollRevealThreshold", description: "Viewport-height fraction scrolled before the notice appears." },
      { name: "rejectEnabled", description: "Opt into session-only dismissal; it is hidden by default." },
      { name: "copy", description: "Plain-text accessible name, body, and action labels." },
      { name: "findOutMoreHref / seal", description: "Independent HTTPS policy destination and optional local seal." },
    ],
    accessibility: [
      "Keep the notice name, body, and actions understandable without relying on color.",
      "Verify keyboard access while the fixed surface is visible and at 200% zoom.",
      "Use concise action labels that describe consent and policy navigation.",
    ],
    security: [
      "Remote seal sources are rejected; package or host approved artwork locally.",
      "The component records an acceptance decision but does not classify or block services.",
      "Consumers remain responsible for consent policy, retention, and legal review.",
    ],
    operations: [
      "The default host-only cookie adapter uses the gno_cookie_consent key.",
      "Storage errors remain observable and should be covered by the host's monitoring strategy.",
    ],
    storyPath: "/docs/?path=/story/components-cookieagreement--visible-preview",
    sourcePath: "packages/ui/src/components/cookie-agreement",
  },
  {
    slug: "ad-slot",
    name: "Ad Slot",
    category: "Component",
    summary: "Provider-agnostic display advertising with explicit inventory rules.",
    description:
      "Own one display-ad lifecycle while keeping consent, eligibility, GPT setup, inventory paths, and sizes in consumer control.",
    prerequisites: [
      "React 19 application with the shared package and stylesheet installed.",
      "Consumer approval for advertising consent, eligibility, and inventory configuration.",
      "A provider created only after the host initializes its approved ad SDK.",
    ],
    setupCode: `"use client";

import { useMemo } from "react";
import {
  AdSlot,
  createGptAdProvider,
  type AdPlacementConfig,
  type GptCompatible,
} from "nmi-devops-shared-components";

const config: AdPlacementConfig = {
  key: "article-mrec",
  format: "mrec",
  reservedSize: [300, 250],
  rules: [
    {
      minWidth: 768,
      adUnitPath: "/123/news/article-mrec",
      sizes: [[300, 250]],
    },
  ],
};

export function ArticleAd({
  googletag,
  hasAdConsent,
}: {
  googletag: GptCompatible;
  hasAdConsent: boolean;
}) {
  const provider = useMemo(
    () => createGptAdProvider({ googletag }),
    [googletag],
  );

  return <AdSlot config={config} enabled={hasAdConsent} provider={provider} />;
}`,
    configuration: [
      { name: "config.rules", description: "Contiguous responsive rules with explicit paths and sizes for active ranges; disabled ranges are hidden before hydration regardless of consent and never call the provider." },
      { name: "enabled", description: "Bind to consent and eligibility; false guarantees no provider call and preserves reserved space only for active responsive ranges." },
      { name: "provider", description: "Inject the host-created provider after its SDK is initialized." },
      { name: "readinessTimeoutMs", description: "Set on createGptAdProvider to bound GPT readiness; the default is 5,000 ms and timeout becomes an observable provider error." },
      { name: "reservedSize", description: "Reserve predictable layout space before the provider responds." },
      { name: "emptyBehavior", description: "Reserve space by default or explicitly allow collapse for empty/error results." },
      { name: "targeting", description: "Attach approved, non-sensitive values to the provider request." },
    ],
    accessibility: [
      "Supply a concise advertisement label appropriate for the host product.",
      "Reserve space to reduce disruptive layout movement around reading content.",
    ],
    security: [
      "Never put sensitive or directly identifying data in targeting.",
      "The package does not inject GPT or another third-party provider script.",
      "Consent and provider loading remain explicit host responsibilities.",
    ],
    operations: [
      "Monitor provider errors and empty results through the host integration.",
      "Validate every production ad unit path and size map before release.",
    ],
    storyPath: "/docs/?path=/story/components-adslot--mrec",
    sourcePath: "packages/ui/src/components/ad-slot",
  },
  {
    slug: "google-analytics",
    name: "Google Analytics",
    category: "Integration",
    summary: "Consent-aware GA4 delivery through direct gtag.js or GTM.",
    description:
      "Create an explicit analytics client with semantic event helpers, shared content dimensions, and predictable consent behavior.",
    prerequisites: [
      "A browser application with the shared package installed; the package stylesheet is not required.",
      "A host-loaded, approved gtag.js or Google Tag Manager integration.",
      "A consent source and data-classification policy owned by the consumer.",
    ],
    setupCode: `"use client";

import {
  createGoogleAnalytics,
  type ConsentState,
  type Gtag,
} from "nmi-devops-shared-components";

export function trackCurrentPage({
  consent,
  gtag,
}: {
  consent: ConsentState;
  gtag: Gtag;
}) {
  const analytics = createGoogleAnalytics({
    transport: { type: "gtag", gtag },
    measurementId: "G-EXAMPLE",
    consent: "unknown",
    portalSection: "News",
  });

  analytics.initialize();
  analytics.setConsent(consent);
  return analytics.trackPageView({ page_title: document.title });
}`,
    configuration: [
      { name: "transport", description: "Choose the direct gtag adapter or a GTM dataLayer adapter." },
      { name: "measurementId", description: "Required by the direct gtag transport and validated before delivery." },
      { name: "consent", description: "Unknown queues, denied drops, and granted delivers or flushes queued events." },
      { name: "portalSection / defaults", description: "Merge reviewed content dimensions into every event." },
      { name: "onError", description: "Observe rejected transport sends without automatic retries." },
      { name: "track* helpers", description: "Send semantic page-view, click, search, scroll, and video events." },
    ],
    accessibility: [
      "Analytics is non-visual and must not change focus, announcements, or user interaction.",
      "Track semantic outcomes without making accessibility depend on successful delivery.",
    ],
    security: [
      "Never send credentials, direct identifiers, or unreviewed free-form user data.",
      "The package never loads provider scripts and does not bypass host consent policy.",
      "Failed sends are not retried, preventing hidden duplicate delivery behavior.",
    ],
    operations: [
      "Track route-level page views explicitly after navigation.",
      "Use onError and provider diagnostics to monitor rejected or failed delivery.",
    ],
    storyPath: "/docs/?path=/story/analytics-google-analytics--direct-gtag",
    sourcePath: "packages/ui/src/analytics/google-analytics",
  },
] as const satisfies readonly ComponentGuide[];

export function getComponentGuide(slug: string) {
  return componentGuides.find((guide) => guide.slug === slug);
}
