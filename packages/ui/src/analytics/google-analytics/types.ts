export type AnalyticsScalar = string | number | boolean;
export type ConsentState = "unknown" | "granted" | "denied";
export type AnalyticsStatus = "sent" | "queued" | "dropped" | "failed";

export type AnalyticsResult = {
  status: AnalyticsStatus;
  eventName: string;
  reason?: string;
};

export type Gtag = (...args: unknown[]) => void;
export type DataLayer = { push: (value: unknown) => unknown };

export type GtagTransport = { type: "gtag"; gtag: Gtag };
export type GtmTransport = { type: "gtm"; dataLayer: DataLayer };
export type AnalyticsTransport = GtagTransport | GtmTransport;

export type DimensionDefinition = {
  default?: string;
  mapping?: string;
  normalizer?: (value: string) => string;
};

export type ScrollConfiguration = {
  eventName?: string;
  milestones?: readonly number[];
  deduplicatePerPage?: boolean;
  dimensionUpdates?: Readonly<Record<string, Readonly<Record<string, string>>>>;
};

export type VideoConfiguration = { eventValue?: number };

export type AnalyticsConfig = {
  measurementId?: string;
  transport: AnalyticsTransport;
  portalSection?: string;
  customDimensions?: Readonly<Record<string, string | DimensionDefinition>>;
  scroll?: ScrollConfiguration;
  video?: VideoConfiguration;
  enabled?: boolean;
  consent?: ConsentState;
  ready?: boolean | (() => boolean);
  queue?: { capacity?: number; maxAgeMs?: number };
  onError?: (error: unknown, eventName?: string) => void;
  debug?: boolean;
};

export type CurrentParams = Readonly<Record<string, string>>;
export type EventParameters = Readonly<Record<string, AnalyticsScalar>>;
export type Callback = () => void;

export type EventInput = Readonly<Record<string, AnalyticsScalar | Callback | undefined>>;

export type PageViewInput = EventInput & {
  page_path?: string;
  page_title?: string;
  page_location?: string;
};

export type GoogleAnalytics = {
  initialize(): void;
  setCurrentParams(params: Readonly<Record<string, string>>): void;
  getCurrentParams(): CurrentParams;
  updateCurrentParams(params: Readonly<Record<string, string>>): void;
  clearCurrentParams(): void;
  trackPageView(page?: PageViewInput): AnalyticsResult;
  trackEvent(eventName: string, parameters?: EventInput): AnalyticsResult;
  trackClick(parameters?: EventInput): AnalyticsResult;
  trackSearch(parameters?: EventInput): AnalyticsResult;
  trackScroll(parameters?: EventInput & { milestone?: number }): AnalyticsResult;
  trackVideoLoaded(parameters?: EventInput): AnalyticsResult;
  trackVideoPlayed(parameters?: EventInput): AnalyticsResult;
  setConsent(state: ConsentState): void;
  flush(): void;
};
