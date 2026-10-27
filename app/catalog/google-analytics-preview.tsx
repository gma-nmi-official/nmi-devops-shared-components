"use client";

import { useEffect, useMemo, useState } from "react";
import {
  createGoogleAnalytics,
  type ConsentState,
  type DataLayer,
} from "nmi-devops-shared-components";

export function GoogleAnalyticsPreview() {
  const [consent, setConsent] = useState<ConsentState>("unknown");
  const [status, setStatus] = useState("Waiting for consent");
  const dataLayer = useMemo<DataLayer>(
    () => ({
      push: (entry) => {
        const eventName = (entry as { event_name?: string }).event_name ?? "event";
        setStatus(`GTM queued ${String(eventName)}`);
      },
    }),
    [],
  );
  const analytics = useMemo(
    () => createGoogleAnalytics(
      {
        transport: { type: "gtm", dataLayer },
        portalSection: "News",
      },
    ),
    [dataLayer],
  );

  useEffect(() => {
    analytics.initialize();
  }, [analytics]);

  function updateConsent(next: ConsentState) {
    setConsent(next);
    analytics.setConsent(next);
    if (next === "granted") {
      analytics.trackPageView({ page_title: "Catalog" });
    }
  }

  return (
    <div
      className="catalog__analytics-preview"
      role="region"
      aria-label="Google Analytics preview"
    >
      <div className="catalog__parameters">
        <div>
          <code>transport</code>
          <span>GTM dataLayer adapter (the direct gtag adapter is also supported).</span>
        </div>
        <div>
          <code>consent</code>
          <span>Unknown queues events; denied drops them; granted flushes them.</span>
        </div>
        <div>
          <code>defaults</code>
          <span>Shared content dimensions are merged into each event.</span>
        </div>
      </div>
      <div className="catalog__analytics-controls">
        <label htmlFor="analytics-consent">Consent state</label>
        <select
          id="analytics-consent"
          value={consent}
          onChange={(event) => {
            updateConsent(event.target.value as ConsentState);
          }}
        >
          <option value="unknown">Unknown</option>
          <option value="granted">Granted</option>
          <option value="denied">Denied</option>
        </select>
        <button
          type="button"
          onClick={() => {
            const result = analytics.trackClick({ content_id: "catalog-card" });
            setStatus(result.status);
          }}
        >
          Track click
        </button>
        <output>{status}</output>
      </div>
    </div>
  );
}
