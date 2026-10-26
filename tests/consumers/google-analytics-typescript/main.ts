import { createGoogleAnalytics, type DataLayer } from "nmi-devops-shared-components";

const dataLayer: DataLayer = { push: () => undefined };
export const analytics = createGoogleAnalytics({
  transport: { type: "gtm", dataLayer },
  consent: "unknown",
  customDimensions: { content_type: "article" },
});

export const result = analytics.trackPageView({ page_title: "Fixture" });
