import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useMemo, useState } from "react";
import { AdSlot } from "./ad-slot";
import type { AdPlacementConfig, AdProvider } from "./types";

function fakeProvider(result: "filled" | "empty" | "error" = "filled"): AdProvider {
  return {
    createSlot(request) {
      queueMicrotask(() => request.onStateChange(result, result === "error" ? new Error("Storybook provider error") : undefined));
      return { id: request.elementId };
    },
    destroySlot() {},
  };
}

const loadingProvider: AdProvider = {
  createSlot: (request) => ({ id: request.elementId }),
  destroySlot() {},
};

const mrecConfig: AdPlacementConfig = {
  key: "story-mrec",
  format: "mrec",
  reservedSize: [300, 250],
  rules: [{ minWidth: 0, adUnitPath: "/storybook/mrec", sizes: [[300, 250]] }],
};

const firstMrecConfig: AdPlacementConfig = { ...mrecConfig, key: "story-mrec-first" };
const secondMrecConfig: AdPlacementConfig = { ...mrecConfig, key: "story-mrec-second" };

type ProviderActivity = { creates: number; destroys: number };

function MultipleSlotsHarness() {
  const [showFirst, setShowFirst] = useState(true);
  const [activity, setActivity] = useState<Record<"first" | "second", ProviderActivity>>({
    first: { creates: 0, destroys: 0 },
    second: { creates: 0, destroys: 0 },
  });
  const providers = useMemo(() => {
    const createInstrumentedProvider = (key: "first" | "second"): AdProvider => ({
      createSlot(request) {
        setActivity((current) => ({ ...current, [key]: { ...current[key], creates: current[key].creates + 1 } }));
        queueMicrotask(() => request.onStateChange("filled"));
        return { id: request.elementId };
      },
      destroySlot() {
        setActivity((current) => ({ ...current, [key]: { ...current[key], destroys: current[key].destroys + 1 } }));
      },
    });
    return { first: createInstrumentedProvider("first"), second: createInstrumentedProvider("second") };
  }, []);

  return (
    <div style={{ display: "grid", gap: 24 }}>
      <button type="button" onClick={() => setShowFirst((visible) => !visible)}>
        {showFirst ? "Unmount first slot" : "Mount first slot"}
      </button>
      <output aria-label="First slot lifecycle">creates {activity.first.creates}; destroys {activity.first.destroys}</output>
      <output aria-label="Second slot lifecycle">creates {activity.second.creates}; destroys {activity.second.destroys}</output>
      {showFirst ? <AdSlot config={firstMrecConfig} enabled provider={providers.first} /> : null}
      <AdSlot config={secondMrecConfig} enabled provider={providers.second} />
    </div>
  );
}

const leaderboardConfig: AdPlacementConfig = {
  key: "story-leaderboard",
  format: "leaderboard",
  reservedSize: [970, 250],
  rules: [
    { minWidth: 0, maxWidth: 767, enabled: false },
    { minWidth: 768, maxWidth: 1199, adUnitPath: "/storybook/leaderboard/tablet", sizes: [[728, 90]] },
    { minWidth: 1200, adUnitPath: "/storybook/leaderboard/desktop", sizes: [[970, 250], [970, 90]] },
  ],
};

const meta = {
  title: "Components/AdSlot",
  component: AdSlot,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: { description: { component: "A provider-agnostic display-ad slot. Consumers must configure the full ad unit path and every size for each active responsive rule." } },
  },
  args: { config: mrecConfig, enabled: true, provider: fakeProvider() },
  argTypes: {
    enabled: { control: "boolean", description: "Consumer-owned consent and eligibility result. False prevents every provider call." },
    config: { control: "object", description: "Complete placement configuration, including sizes for every active responsive rule." },
    provider: { control: false, description: "Consumer-created provider adapter. Stories use a local fake only." },
    onStateChange: { action: "state changed", control: false },
    placeholder: { control: false },
  },
} satisfies Meta<typeof AdSlot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mrec: Story = {};
export const Leaderboard: Story = { args: { config: leaderboardConfig } };
export const CustomDisplay: Story = { args: { config: { ...mrecConfig, key: "story-custom", format: "custom", reservedSize: [320, 100], rules: [{ minWidth: 0, maxWidth: 767, enabled: false }, { minWidth: 768, adUnitPath: "/storybook/custom", sizes: [[320, 100]] }] } } };
export const Loading: Story = { args: { provider: loadingProvider, placeholder: "Waiting for the fake provider…" } };
export const CustomLabel: Story = { args: { label: "Sponsored placement" } };
export const ConsumerDisabled: Story = { args: { enabled: false } };
export const ReservedEmpty: Story = { args: { provider: fakeProvider("empty") } };
export const CollapsedEmpty: Story = { args: { config: { ...mrecConfig, emptyBehavior: "collapse", reservedSize: undefined }, provider: fakeProvider("empty") } };
export const ProviderError: Story = { args: { provider: fakeProvider("error") } };
export const MultipleSlots: Story = { render: () => <MultipleSlotsHarness /> };
