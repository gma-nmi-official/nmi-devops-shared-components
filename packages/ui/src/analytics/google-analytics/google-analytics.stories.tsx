import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useEffect, useMemo, useState } from "react";
import { createGoogleAnalytics } from "./google-analytics";
import type { AnalyticsConfig, ConsentState, DataLayer, Gtag } from "./types";

type AnalyticsHarnessProps = {
  transport?: "gtag" | "gtm";
  ready?: boolean;
  failTransport?: boolean;
};

function AnalyticsHarness({
  transport = "gtag",
  ready = true,
  failTransport = false,
}: AnalyticsHarnessProps) {
  const [consent, setConsent] = useState<ConsentState>("granted");
  const [lastEvent, setLastEvent] = useState("No event sent");
  const [gtmEvents, setGtmEvents] = useState<unknown[]>([]);
  const dataLayer = useMemo<DataLayer>(
    () => ({
      push: (value) => {
        if (failTransport) {
          throw new Error("Storybook transport failure");
        }
        setGtmEvents((events) => [...events, value]);
      },
    }),
    [failTransport],
  );
  const gtag = useMemo<Gtag>(
    () => (_command, _name, parameters) => {
      if (failTransport) {
        throw new Error("Storybook transport failure");
      }
      const values = parameters as Record<string, unknown> | undefined;
      const contentId = values?.content_id ?? "no content id";
      setLastEvent(`${String(_name)} · ${String(contentId)}`);
    },
    [failTransport],
  );
  const config = useMemo<AnalyticsConfig>(
    () => ({
      transport: transport === "gtag"
        ? { type: "gtag", gtag }
        : { type: "gtm", dataLayer },
      measurementId: transport === "gtag" ? "G-STORYBOOK" : undefined,
      consent,
      portalSection: "News",
      ready,
    }),
    [consent, dataLayer, gtag, ready, transport],
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
      <output aria-label="Last event">{lastEvent}</output>
      {transport === "gtm" ? (
        <output aria-label="GTM event count">GTM events: {gtmEvents.length}</output>
      ) : null}
      <output aria-label="Readiness">{ready ? "Ready" : "Not ready"}</output>
      <output aria-label="Payload log">
        Payloads: {gtmEvents.length || (lastEvent === "No event sent" ? 0 : 1)}
      </output>
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
  },
  args: { transport: "gtag", ready: true, failTransport: false },
} satisfies Meta<typeof AnalyticsHarness>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DirectGtag: Story = {};
export const GoogleTagManager: Story = { args: { transport: "gtm" } };
export const UnknownConsent: Story = { render: () => <AnalyticsHarness transport="gtm" /> };
