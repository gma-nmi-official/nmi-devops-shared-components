"use client";

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
}
