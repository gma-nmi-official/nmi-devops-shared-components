import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useMemo, useState } from "react";
import { AdSlot } from "./ad-slot";
import { createGptAdProvider } from "./gpt-provider";
import type { GptCompatible } from "./gpt-provider";
import type { AdPlacementConfig, AdProvider } from "./types";

function fakeProvider(result: "filled" | "empty" | "error" = "filled"): AdProvider {
  return {
    createSlot(request) {
      queueMicrotask(() => {
        request.onStateChange(
          result,
          result === "error" ? new Error("Storybook provider error") : undefined,
        );
      });
      const element = document.getElementById(request.elementId);
      if (result === "filled" && element) {
        const creative = document.createElement("div");
        creative.textContent = "GMA News · Sponsored placement";
        creative.style.alignItems = "center";
        creative.style.background = "#f2f4f7";
        creative.style.color = "#2e2e2e";
        creative.style.display = "flex";
        creative.style.fontFamily = "sans-serif";
        creative.style.fontSize = "14px";
        creative.style.height = "100%";
        creative.style.justifyContent = "center";
        creative.style.textAlign = "center";
        creative.style.width = "100%";
        element.appendChild(creative);
      }
      return { id: request.elementId };
    },
    destroySlot(slot) {
      document.getElementById(slot.id)?.replaceChildren();
    },
  };
}

type StorybookGpt = GptCompatible & {
  enableServices(): void;
};

type StorybookWindow = Window & {
  googletag?: StorybookGpt;
};

type StorybookEnv = {
  VITE_STORYBOOK_LIVE_ADS?: string;
  VITE_STORYBOOK_AD_UNIT_PATH?: string;
};

const storybookEnv = (import.meta as unknown as { env: StorybookEnv }).env;
const defaultLiveAds = storybookEnv.VITE_STORYBOOK_LIVE_ADS !== "false";
const defaultLiveAdUnitPath =
  storybookEnv.VITE_STORYBOOK_AD_UNIT_PATH ??
  "/344684475/GNO_TEST_Desktop_Mrec1";
const defaultLiveAdUnitName =
  defaultLiveAdUnitPath.split("/").filter(Boolean).pop() ??
  "GNO_TEST_Desktop_Mrec1";
const defaultLiveAdNetworkPath =
  defaultLiveAdUnitPath.slice(0, -defaultLiveAdUnitName.length).replace(/\/$/, "") ||
  "/344684475";

let liveProviderPromise: Promise<AdProvider> | undefined;

function getLiveGptProvider(): Promise<AdProvider> {
  if (liveProviderPromise) {
    return liveProviderPromise;
  }

  liveProviderPromise = new Promise<AdProvider>((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Live Storybook ads require a browser."));
      return;
    }

    const storybookWindow = window as StorybookWindow;
    const googletag =
      storybookWindow.googletag ??
      ({ cmd: [] } as unknown as StorybookGpt);
    storybookWindow.googletag = googletag;

    const finishLoading = () => {
      googletag.cmd.push(() => {
        googletag.enableServices();
        resolve(createGptAdProvider({ googletag }));
      });
    };

    if (typeof googletag.defineSlot === "function") {
      finishLoading();
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
    script.onload = finishLoading;
    script.onerror = () => reject(new Error("Unable to load the GPT script."));
    document.head.appendChild(script);
  });

  return liveProviderPromise;
}

const liveGptProvider: AdProvider = {
  async createSlot(request) {
    const provider = await getLiveGptProvider();
    return provider.createSlot(request);
  },
  async destroySlot(slot) {
    const provider = await getLiveGptProvider();
    return provider.destroySlot(slot);
  },
};

const loadingProvider: AdProvider = {
  createSlot: (request) => ({ id: request.elementId }),
  destroySlot() {},
};

const newsArticleTargeting = {
  section: "News",
  subsection: "National",
  content_type: "Article",
  content_id: "GNO-21356",
  environment: "storybook",
};

const liveNewsTargeting = {
  ad_pt: "News_Index_Page",
  ad_pos: "GNO_TEST_Desktop_Mrec1_1",
  site_id: "GMA_News_Online",
  section: "News",
  content_type: "Article",
  content_id: "GNO-21356",
};

const mrecConfig: AdPlacementConfig = {
  key: "story-mrec",
  format: "mrec",
  reservedSize: [300, 250],
  targeting: newsArticleTargeting,
  rules: [{ minWidth: 0, adUnitPath: "/storybook/gmanews/news/mrec", sizes: [[300, 250]] }],
};

const liveNewsMrecConfig: AdPlacementConfig = {
  key: "story-live-news-mrec",
  format: "mrec",
  reservedSize: [300, 250],
  targeting: liveNewsTargeting,
  rules: [
    {
      minWidth: 0,
      adUnitPath: defaultLiveAdUnitPath,
      sizes: [[300, 250], [336, 280], [250, 250], [300, 600]],
    },
  ],
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
        setActivity((current) => ({
          ...current,
          [key]: {
            ...current[key],
            creates: current[key].creates + 1,
          },
        }));
        queueMicrotask(() => request.onStateChange("filled"));
        return { id: request.elementId };
      },
      destroySlot() {
        setActivity((current) => ({
          ...current,
          [key]: {
            ...current[key],
            destroys: current[key].destroys + 1,
          },
        }));
      },
    });
    return {
      first: createInstrumentedProvider("first"),
      second: createInstrumentedProvider("second"),
    };
  }, []);

  return (
    <div style={{ display: "grid", gap: 24 }}>
      <button type="button" onClick={() => setShowFirst((visible) => !visible)}>
        {showFirst ? "Unmount first slot" : "Mount first slot"}
      </button>
      <output aria-label="First slot lifecycle">
        creates {activity.first.creates}; destroys {activity.first.destroys}
      </output>
      <output aria-label="Second slot lifecycle">
        creates {activity.second.creates}; destroys {activity.second.destroys}
      </output>
      {showFirst ? <AdSlot config={firstMrecConfig} enabled provider={providers.first} /> : null}
      <AdSlot config={secondMrecConfig} enabled provider={providers.second} />
    </div>
  );
}

function LiveNewsArticleHarness() {
  const [liveAds, setLiveAds] = useState(defaultLiveAds);
  const [draftNetworkPath, setDraftNetworkPath] = useState(defaultLiveAdNetworkPath);
  const [networkPath, setNetworkPath] = useState(defaultLiveAdNetworkPath);
  const [draftAdUnitName, setDraftAdUnitName] = useState(defaultLiveAdUnitName);
  const [adUnitName, setAdUnitName] = useState(defaultLiveAdUnitName);
  const adUnitPath = `${networkPath.replace(/\/$/, "")}/${adUnitName}`;
  const provider = useMemo(
    () => (liveAds ? liveGptProvider : fakeProvider()),
    [liveAds],
  );
  const config = useMemo<AdPlacementConfig>(
    () => ({
      ...liveNewsMrecConfig,
      key: `story-live-news-mrec-${adUnitPath}`,
      targeting: {
        ...liveNewsTargeting,
        ad_pos: `${adUnitName}_1`,
      },
      rules: [
        {
          minWidth: 0,
          adUnitPath,
          sizes: [[300, 250], [336, 280], [250, 250], [300, 600]],
        },
      ],
    }),
    [adUnitName, adUnitPath],
  );

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <label>
        <input
          checked={liveAds}
          onChange={(event) => setLiveAds(event.target.checked)}
          type="checkbox"
        />{" "}
        Enable live GPT ads
      </label>
      <label style={{ display: "grid", gap: 4 }}>
        Ad network path
        <input
          onChange={(event) => setDraftNetworkPath(event.target.value)}
          type="text"
          value={draftNetworkPath}
        />
      </label>
      <label style={{ display: "grid", gap: 4 }}>
        Ad unit name
        <input
          onChange={(event) => setDraftAdUnitName(event.target.value)}
          type="text"
          value={draftAdUnitName}
        />
      </label>
      <button
        onClick={() => {
          setNetworkPath(draftNetworkPath);
          setAdUnitName(draftAdUnitName);
        }}
        type="button"
      >
        Initialize ad slot
      </button>
      <AdSlot
        config={config}
        enabled
        key={`${liveAds}-${adUnitPath}`}
        label="Live GMA News test placement"
        provider={provider}
      />
    </div>
  );
}

const leaderboardConfig: AdPlacementConfig = {
  key: "story-leaderboard",
  format: "leaderboard",
  reservedSize: [970, 250],
  rules: [
    { minWidth: 0, maxWidth: 767, enabled: false },
    {
      minWidth: 768,
      maxWidth: 1199,
      adUnitPath: "/storybook/leaderboard/tablet",
      sizes: [[728, 90]],
    },
    {
      minWidth: 1200,
      adUnitPath: "/storybook/leaderboard/desktop",
      sizes: [[970, 250], [970, 90]],
    },
  ],
};

const liveLeaderboardConfig: AdPlacementConfig = {
  key: "story-live-leaderboard",
  format: "leaderboard",
  reservedSize: [970, 250],
  targeting: {
    ...liveNewsTargeting,
    ad_pos: "GNO_TEST_Desktop_Leaderboard1_1",
  },
  rules: [
    {
      minWidth: 0,
      maxWidth: 767,
      adUnitPath: "/344684475/GNO_TEST_Mobile_Leaderboard",
      sizes: [[320, 50], [320, 100]],
    },
    {
      minWidth: 768,
      adUnitPath: "/344684475/GNO_TEST_Desktop_Leaderboard1",
      sizes: [[728, 90], [970, 90]],
    },
  ],
};

const liveCustomConfig: AdPlacementConfig = {
  key: "story-live-custom",
  format: "custom",
  reservedSize: [300, 250],
  targeting: {
    ...liveNewsTargeting,
    ad_pos: "GNO_TEST_Desktop_Mrec1_1",
  },
  rules: [
    {
      minWidth: 0,
      adUnitPath: "/344684475/GNO_TEST_Desktop_Mrec1",
      sizes: [[300, 250], [336, 280]],
    },
  ],
};

const meta = {
  title: "Components/AdSlot",
  component: AdSlot,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A provider-agnostic display-ad slot. Consumers must configure the full ad unit path and every size for each active responsive rule.",
      },
    },
  },
  args: { config: mrecConfig, enabled: true, provider: fakeProvider() },
  argTypes: {
    enabled: {
      control: "boolean",
      description: "Consumer-owned consent and eligibility result. False prevents every provider call.",
    },
    config: {
      control: "object",
      description: "Complete placement configuration, including sizes for every active responsive rule.",
    },
    provider: {
      control: false,
      description:
        "Consumer-created provider adapter. Standard stories use a local fake; LiveNewsArticle, LiveLeaderboard, and LiveCustom use the reference GPT test units.",
    },
    onStateChange: { action: "state changed", control: false },
    placeholder: { control: false },
  },
} satisfies Meta<typeof AdSlot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mrec: Story = {};
export const NewsArticle: Story = {
  args: {
    label: "Sponsored news placement",
    config: {
      ...mrecConfig,
      key: "story-news-article-mrec",
    },
  },
};
export const LiveNewsArticle: Story = {
  render: () => <LiveNewsArticleHarness />,
};
export const LiveLeaderboard: Story = {
  args: {
    config: liveLeaderboardConfig,
    label: "Live GMA News leaderboard test placement",
    provider: liveGptProvider,
  },
};
export const LiveCustom: Story = {
  args: {
    config: liveCustomConfig,
    label: "Live GMA News custom test placement",
    provider: liveGptProvider,
  },
};
export const Leaderboard: Story = { args: { config: leaderboardConfig } };
export const CustomDisplay: Story = {
  args: {
    config: {
      ...mrecConfig,
      key: "story-custom",
      format: "custom",
      reservedSize: [320, 100],
      rules: [
        { minWidth: 0, maxWidth: 767, enabled: false },
        {
          minWidth: 768,
          adUnitPath: "/storybook/custom",
          sizes: [[320, 100]],
        },
      ],
    },
  },
};
export const Loading: Story = { args: { provider: loadingProvider, placeholder: "Waiting for the fake provider…" } };
export const CustomLabel: Story = { args: { label: "Sponsored placement" } };
export const ConsumerDisabled: Story = { args: { enabled: false } };
export const ReducedMotion: Story = {
  parameters: {
    docs: { description: { story: "Use the browser or OS reduced-motion preference to verify collapse transitions are disabled." } },
  },
};
export const DisabledResponsive: Story = { args: { config: leaderboardConfig } };
export const ReservedEmpty: Story = { args: { provider: fakeProvider("empty") } };
export const CollapsedEmpty: Story = {
  args: {
    config: {
      ...mrecConfig,
      emptyBehavior: "collapse",
      reservedSize: undefined,
    },
    provider: fakeProvider("empty"),
  },
};
export const ProviderError: Story = { args: { provider: fakeProvider("error") } };
export const MultipleSlots: Story = { render: () => <MultipleSlotsHarness /> };
