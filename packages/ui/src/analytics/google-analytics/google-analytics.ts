import type { AnalyticsConfig, AnalyticsResult, EventInput, GoogleAnalytics, PageViewInput } from "./types";
import { cloneContext, createDefaults, replaceContext, updateContext } from "./context";
import { DeliveryState } from "./delivery-state";
import { dimensionEntries, stripCallback, validateConfig, validateEvent } from "./validation";
import { sendTransport } from "./transports";

export function createGoogleAnalytics(config: AnalyticsConfig): GoogleAnalytics {
  validateConfig(config);

  const dimensions = dimensionEntries(config);
  const defaults = createDefaults(dimensions);
  let current = { ...defaults };
  let initialized = false;
  const sentScrolls = new Set<string>();
  const delivery = new DeliveryState(
    config.queue?.capacity ?? 100,
    config.queue?.maxAgeMs ?? 300_000,
    config.consent ?? "unknown",
    config.enabled ?? true,
  );

  const reportError = (error: unknown, eventName?: string) => {
    config.onError?.(error, eventName);
    if (config.debug) console.error(error);
  };

  const ready = () => delivery.isReady(config.ready);

  const emit = (eventName: string, parameters: EventInput, fromQueue = false): AnalyticsResult => {
    try {
      validateEvent(eventName, parameters);
    } catch (error) {
      reportError(error, eventName);
      return { status: "failed", eventName, reason: "invalid_payload" };
    }

    if (!fromQueue && !(config.enabled ?? true)) {
      return { status: "dropped", eventName, reason: "disabled" };
    }

    if (!fromQueue && delivery.getConsent() === "denied") {
      return { status: "dropped", eventName, reason: "consent_denied" };
    }

    if (!fromQueue && delivery.getConsent() === "unknown") {
      return delivery.enqueue(eventName, parameters);
    }

    if (!ready()) {
      reportError(new Error("Analytics transport is not ready"), eventName);
      return { status: "failed", eventName, reason: "not_ready" };
    }

    const { eventParams, callback, callbackTimeoutMs } = stripCallback(parameters);
    const payload = { ...current, ...eventParams };
    const sent = sendTransport(
      config.transport,
      config.measurementId,
      { eventName, params: payload, callback, callbackTimeoutMs },
      (error) => reportError(error, eventName),
    );

    return sent
      ? { status: "sent", eventName }
      : { status: "failed", eventName, reason: "transport_error" };
  };

  const flush = () => {
    if (delivery.getConsent() !== "granted" || !ready()) return;

    for (const entry of delivery.takeReady()) {
      emit(entry.eventName, entry.parameters, true);
    }
  };

  const trackVideo = (eventName: string, category: string, parameters: EventInput): AnalyticsResult => {
    const value = parameters.event_value ?? config.video?.eventValue ?? 0;
    if (typeof value !== "number" || !Number.isFinite(value)) {
      reportError(new Error("video event_value must be finite"), eventName);
      return { status: "failed", eventName, reason: "invalid_video_value" };
    }

    const rest = { ...parameters };
    delete rest.event_value;

    return emit(eventName, { event_category: category, event_value: value, ...rest });
  };

  const api: GoogleAnalytics = {
    initialize() {
      if (initialized) return;
      initialized = true;
      delivery.initialize();
      flush();
    },
    setCurrentParams(params) {
      current = replaceContext(dimensions, params);
      sentScrolls.clear();
    },
    getCurrentParams() {
      return cloneContext(current);
    },
    updateCurrentParams(params) {
      current = updateContext(dimensions, current, params);
    },
    clearCurrentParams() {
      current = { ...defaults };
      sentScrolls.clear();
    },
    trackPageView(page: PageViewInput = {}) {
      sentScrolls.clear();
      return emit("page_view", page);
    },
    trackEvent(eventName, parameters = {}) {
      return emit(eventName, parameters);
    },
    trackClick(parameters = {}) {
      return emit("click", parameters);
    },
    trackSearch(parameters = {}) {
      return emit("search", parameters);
    },
    trackScroll(parameters = {}) {
      const milestone = (parameters as EventInput & { milestone?: number }).milestone;
      const configured = config.scroll?.milestones;
      const eventName = config.scroll?.eventName ?? "scroll";

      if (milestone !== undefined && configured && !configured.includes(milestone)) {
        return { status: "dropped", eventName, reason: "invalid_milestone" };
      }

      const key = String(milestone ?? "scroll");
      if (config.scroll?.deduplicatePerPage && sentScrolls.has(key)) {
        return { status: "dropped", eventName, reason: "duplicate" };
      }

      const updates = milestone === undefined ? undefined : config.scroll?.dimensionUpdates?.[String(milestone)];
      if (updates) current = updateContext(dimensions, current, updates);

      const result = emit(eventName, parameters);
      if (result.status === "sent" || result.status === "queued") sentScrolls.add(key);
      return result;
    },
    trackVideoLoaded(parameters = {}) {
      return trackVideo("loaded_a_video", "Video Load", parameters);
    },
    trackVideoPlayed(parameters = {}) {
      return trackVideo("played_a_video", "Video Play", parameters);
    },
    setConsent(state) {
      delivery.setConsent(state);
      if (state === "granted") flush();
    },
    flush,
  };

  return api;
}
