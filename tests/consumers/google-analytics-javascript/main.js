import { createGoogleAnalytics } from "nmi-devops-shared-components";

const dataLayer = { push(value) { this.last = value; }, last: undefined };
export const analytics = createGoogleAnalytics({
  transport: { type: "gtm", dataLayer },
  consent: "unknown",
});

export function trackArticleClick() {
  return analytics.trackClick({ content_id: "fixture-article", section: "News" });
}
