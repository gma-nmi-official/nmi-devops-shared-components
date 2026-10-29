import type {
  AnalyticsConfig,
  AnalyticsResult,
  EventInput,
  GoogleAnalytics,
  PageViewInput,
} from "./types";
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
  const scrolls = new Set<string>();
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

  const completeCallback = (params: EventInput, eventName: string) => {
    const callback = params.callback;
    if (typeof callback !== "function") return;
    const complete = () => {
      try {
        callback();
      } catch (error) {
        reportError(error, eventName);
      }
    };
    if (typeof params.callbackTimeoutMs === "number") {
      setTimeout(complete, params.callbackTimeoutMs);
    } else {
      complete();
    }
  };

  const emit = (eventName: string, params: EventInput, queued = false): AnalyticsResult => {
    try {
      validateEvent(eventName, params);
    } catch (error) {
      reportError(error, eventName);
      completeCallback(params, eventName);
      return { status: "failed", eventName, reason: "invalid_payload" };
    }

    const { eventParams, callback, callbackTimeoutMs } = stripCallback(params);
    const payload = queued ? eventParams : { ...current, ...eventParams };
    try {
      validateEvent(eventName, payload);
    } catch (error) {
      reportError(error, eventName);
      completeCallback(params, eventName);
      return { status: "failed", eventName, reason: "invalid_payload" };
    }

    if (!queued && !(config.enabled ?? true)) {
      const result = { status: "dropped" as const, eventName, reason: "disabled" };
      completeCallback(params, eventName);
      return result;
    }

    if (!queued && delivery.getConsent() === "denied") {
      const result = { status: "dropped" as const, eventName, reason: "consent_denied" };
      completeCallback(params, eventName);
      return result;
    }

    if (!queued && delivery.getConsent() === "unknown") {
      const result = delivery.enqueue(eventName, payload);
      completeCallback(params, eventName);
      return result;
    }

    if (!ready()) {
      reportError(new Error("Analytics transport is not ready"), eventName);
      const result = { status: "failed" as const, eventName, reason: "not_ready" };
      completeCallback(params, eventName);
      return result;
    }

    const sent = sendTransport(
      config.transport,
      config.measurementId,
      { eventName, params: payload, callback, callbackTimeoutMs },
      (error) => reportError(error, eventName),
    );

    return sent
      ? { status: "sent", eventName }
      : (completeCallback(params, eventName), { status: "failed", eventName, reason: "transport_error" });
  };

  const flush = () => {
    if (delivery.getConsent() !== "granted" || !ready()) return;

    for (const entry of delivery.takeReady()) {
      emit(entry.eventName, entry.params, true);
    }
    for (const entry of delivery.takeExpired()) {
      reportError(new Error("Analytics queue entry expired"), entry.eventName);
    }
  };

  const trackVideo = (eventName: string, category: string, params: EventInput): AnalyticsResult => {
    const value = params.event_value ?? config.video?.eventValue ?? 0;
    if (typeof value !== "number" || !Number.isFinite(value)) {
      reportError(new Error("video event_value must be finite"), eventName);
      return { status: "failed", eventName, reason: "invalid_video_value" };
    }

    const rest = { ...params };
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
      try {
        current = replaceContext(dimensions, params);
        scrolls.clear();
      } catch (error) {
        reportError(error);
      }
    },
    getCurrentParams() {
      return cloneContext(current);
    },
    updateCurrentParams(params) {
      try {
        current = updateContext(dimensions, current, params);
      } catch (error) {
        reportError(error);
      }
    },
    clearCurrentParams() {
      current = { ...defaults };
      scrolls.clear();
    },
    trackPageView(page: PageViewInput = {}) {
      scrolls.clear();
      return emit("page_view", page);
    },
    trackEvent(eventName, params = {}) {
      return emit(eventName, params);
    },
    trackClick(params = {}) {
      return emit("click", params);
    },
    trackSearch(params = {}) {
      return emit("search", params);
    },
    trackScroll(params = {}) {
      const milestone = (params as EventInput & { milestone?: number }).milestone;
      const configured = config.scroll?.milestones;
      const eventName = config.scroll?.eventName ?? "scroll";

      if (milestone !== undefined && configured && !configured.includes(milestone)) {
        return { status: "dropped", eventName, reason: "invalid_milestone" };
      }

      const key = String(milestone ?? "scroll");
      if (config.scroll?.deduplicatePerPage && scrolls.has(key)) {
        return { status: "dropped", eventName, reason: "duplicate" };
      }

      const updates = milestone === undefined
        ? undefined
        : config.scroll?.dimensionUpdates?.[String(milestone)];
      if (updates) {
        current = updateContext(dimensions, current, updates);
      }

      const result = emit(eventName, params);
      if (result.status === "sent" || result.status === "queued") {
        scrolls.add(key);
      }
      return result;
    },
    trackVideoLoaded(params = {}) {
      return trackVideo("loaded_a_video", "Video Load", params);
    },
    trackVideoPlayed(params = {}) {
      return trackVideo("played_a_video", "Video Play", params);
    },
    setConsent(state) {
      delivery.setConsent(state);
      if (state === "granted") {
        flush();
      }
    },
    flush,
  };

  return api;
}
