import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useEffect, useMemo, useState } from "react";
import { createGoogleAnalytics } from "./google-analytics";
import type { AnalyticsConfig, ConsentState, DataLayer, Gtag } from "./types";

type AnalyticsHarnessProps = {
  transport?: "gtag" | "gtm";
  ready?: boolean;
  failTransport?: boolean;
  liveCollection?: boolean;
};

const newsStoryContext = {
  content_type: "Article",
  author: "GMA News Online",
  subsection: "National",
  audience_interest: "General",
  source: "GMA News Online",
  publish_date: "2026-10-27",
  keywords: "news, philippines",
  content_id: "GNO-21356",
  section: "News",
  show_name: "24 Oras",
};

function AnalyticsHarness({
  transport = "gtag",
  ready = true,
  failTransport = false,
  liveCollection = false,
}: AnalyticsHarnessProps) {
  const storybookEnv = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env;
  const liveMeasurementId = (
    storybookEnv?.VITE_STORYBOOK_GA4_ID ?? storybookEnv?.STORYBOOK_GA4_ID
  )?.trim();
  const [consent, setConsent] = useState<ConsentState>("granted");
  const [lastEvent, setLastEvent] = useState("No event sent");
  const [gtmEvents, setGtmEvents] = useState<unknown[]>([]);
  const [callbackState, setCallbackState] = useState("Callback not used");
  const [liveState, setLiveState] = useState(
    liveCollection && liveMeasurementId ? "Live GA4 enabled" : "Mock transport enabled",
  );
  useEffect(() => {
    if (!liveCollection || !liveMeasurementId || transport !== "gtag") return;

    const liveWindow = window as Window & {
      dataLayer?: unknown[];
      gtag?: (...args: unknown[]) => void;
    };

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(liveMeasurementId)}`;
    script.onload = () => setLiveState("Live GA4 script loaded");
    script.onerror = () => setLiveState("Live GA4 script failed to load");
    liveWindow.dataLayer = liveWindow.dataLayer || [];
    liveWindow.gtag = function gtag(..._args: unknown[]) {
      liveWindow.dataLayer?.push(arguments);
    };
    liveWindow.gtag("js", new Date());
    liveWindow.gtag("config", liveMeasurementId, { send_page_view: false });
    document.head.appendChild(script);

    return () => {
      script.remove();
      setLiveState("Mock transport enabled");
    };
  }, [liveCollection, liveMeasurementId, transport]);
  const dataLayer = useMemo<DataLayer>(
    () => ({
      push: (value) => {
        if (failTransport) {
          throw new Error("Storybook transport failure");
        }
        setGtmEvents((events) => [...events, value]);
        const callback = (value as { eventCallback?: () => void }).eventCallback;
        callback?.();
      },
    }),
    [failTransport],
  );
  const gtag = useMemo<Gtag>(
    () => (command, name, parameters) => {
      if (failTransport) {
        throw new Error("Storybook transport failure");
      }
      const liveWindow = window as Window & { gtag?: Gtag };
      if (liveCollection && liveMeasurementId && typeof liveWindow.gtag === "function") {
        const liveParameters = { ...(parameters as Record<string, unknown>) };
        delete liveParameters.send_to;
        liveWindow.gtag(command, name, liveParameters);
        setLastEvent(`${String(name)} · live GA4 request`);
        return;
      }
      const values = parameters as Record<string, unknown> | undefined;
      const contentId = values?.content_id ?? "no content id";
      setLastEvent(`${String(name)} · ${String(contentId)}`);
      const callback = values?.event_callback;
      if (typeof callback === "function") callback();
    },
    [failTransport, liveCollection, liveMeasurementId],
  );
  const config = useMemo<AnalyticsConfig>(
    () => ({
      transport: transport === "gtag"
        ? { type: "gtag", gtag }
        : { type: "gtm", dataLayer },
      measurementId: transport === "gtag"
        ? liveCollection && liveMeasurementId
          ? liveMeasurementId
          : "G-STORYBOOK"
        : undefined,
      consent,
      portalSection: "News",
      customDimensions: newsStoryContext,
      ready,
    }),
    [consent, dataLayer, gtag, liveCollection, liveMeasurementId, ready, transport],
  );
  const analytics = useMemo(() => createGoogleAnalytics(config), [config]);
  useEffect(() => {
    analytics.initialize();
  }, [analytics]);

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 560 }}>
      <strong>Google Analytics integration preview</strong>
      <label>
        Consent
        <select
          value={consent}
          onChange={(event) => {
            const next = event.target.value as ConsentState;
            setConsent(next);
            analytics.setConsent(next);
          }}
        >
          <option value="unknown">Unknown</option>
          <option value="granted">Granted</option>
          <option value="denied">Denied</option>
        </select>
      </label>
      <button
        type="button"
        onClick={() => {
          const result = analytics.trackClick({ content_id: "storybook-card" });
          setLastEvent(`${result.status} · click`);
        }}
      >
        Track click
      </button>
      <button
        type="button"
        onClick={() => {
          setCallbackState("Waiting for callback");
          const result = analytics.trackPageView({
            ...newsStoryContext,
            callback: () => setCallbackState("Callback received"),
            callbackTimeoutMs: 500,
          });
          setLastEvent(`${result.status} · page_view`);
        }}
      >
        Track page view with callback
      </button>
      <output aria-label="Last event">{lastEvent}</output>
      <output aria-label="Callback state">{callbackState}</output>
      <output aria-label="Collection mode">{liveState}</output>
      {transport === "gtm" ? (
        <output aria-label="GTM event count">GTM events: {gtmEvents.length}</output>
      ) : null}
      <output aria-label="Readiness">{ready ? "Ready" : "Not ready"}</output>
      <output aria-label="Payload log">
        Payloads: {gtmEvents.length || (lastEvent === "No event sent" ? 0 : 1)}
      </output>
      <pre aria-label="News payload">{JSON.stringify(newsStoryContext, null, 2)}</pre>
    </div>
  );
}

const meta = {
  title: "Analytics/Google Analytics",
  component: AnalyticsHarness,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Consent-aware GA4 event delivery with direct gtag.js and GTM dataLayer transports.",
      },
    },
  },
  argTypes: {
    transport: { control: "radio", options: ["gtag", "gtm"] },
    ready: { control: "boolean" },
    failTransport: { control: "boolean" },
    liveCollection: { control: "boolean" },
  },
  args: { transport: "gtag", ready: true, failTransport: false, liveCollection: false },
} satisfies Meta<typeof AnalyticsHarness>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DirectGtag: Story = {};
export const GoogleTagManager: Story = { args: { transport: "gtm" } };
export const UnknownConsent: Story = { render: () => <AnalyticsHarness transport="gtm" /> };
