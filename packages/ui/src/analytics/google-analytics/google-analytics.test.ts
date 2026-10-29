import { describe, expect, it, vi } from "vitest";
import { createGoogleAnalytics } from "./google-analytics";

describe("createGoogleAnalytics", () => {
  it("sends explicit page views and named helpers through direct gtag", () => {
    const calls: unknown[][] = [];
    const analytics = createGoogleAnalytics({ measurementId: "G-ONE", consent: "granted", transport: { type: "gtag", gtag: (...args) => calls.push(args) } });
    analytics.initialize();
    analytics.setCurrentParams({ content_type: "Article", section: "news" });
    expect(analytics.trackPageView({ page_path: "/story", page_title: "Title" })).toMatchObject({ status: "sent", eventName: "page_view" });
    expect(analytics.trackVideoLoaded({ event_label: "/video" })).toMatchObject({ status: "sent", eventName: "loaded_a_video" });
    expect(calls).toHaveLength(2);
    expect(calls[0]).toEqual(["event", "page_view", expect.objectContaining({ content_type: "Article", section: "News", page_path: "/story", send_to: "G-ONE" })]);
    expect(calls[1]).toEqual(["event", "loaded_a_video", expect.objectContaining({ event_category: "Video Load", event_value: 0 })]);
  });

  it("queues unknown consent and flushes once after grant", () => {
    const calls: unknown[][] = [];
    const analytics = createGoogleAnalytics({ consent: "unknown", transport: { type: "gtm", dataLayer: { push: (value) => { calls.push([value]); } } } });
    analytics.initialize();
    expect(analytics.trackSearch({ event_label: "weather" })).toMatchObject({ status: "queued" });
    expect(calls).toHaveLength(0);
    analytics.setConsent("granted");
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toEqual(expect.objectContaining({ event: "gno_analytics_event", event_name: "search", event_params: expect.objectContaining({ event_label: "weather" }) }));
  });

  it("completes queued callbacks without retaining them until consent", () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    const analytics = createGoogleAnalytics({ consent: "unknown", transport: { type: "gtm", dataLayer: { push: vi.fn() } } });
    analytics.initialize();
    expect(analytics.trackClick({ callback, callbackTimeoutMs: 100 })).toMatchObject({ status: "queued" });
    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledOnce();
    vi.useRealTimers();
  });

  it("snapshots context when queuing an event", () => {
    const calls: unknown[] = [];
    const analytics = createGoogleAnalytics({ consent: "unknown", transport: { type: "gtm", dataLayer: { push: (value) => calls.push(value) } } });
    analytics.initialize();
    analytics.setCurrentParams({ content_id: "article-A" });
    analytics.trackPageView({ page_path: "/a" });
    analytics.setCurrentParams({ content_id: "article-B" });
    analytics.setConsent("granted");
    expect(calls[0]).toEqual(expect.objectContaining({ event_params: expect.objectContaining({ content_id: "article-A" }) }));
  });

  it("validates merged dimensions against the total payload limit", () => {
    const onError = vi.fn();
    const analytics = createGoogleAnalytics({ consent: "granted", onError, transport: { type: "gtm", dataLayer: { push: vi.fn() } } });
    analytics.initialize();
    const parameters = Object.fromEntries(Array.from({ length: 15 }, (_, index) => [`custom_${index}`, index]));
    expect(analytics.trackEvent("custom_event", parameters)).toMatchObject({ status: "failed", reason: "invalid_payload" });
    expect(onError).toHaveBeenCalledWith(expect.objectContaining({ message: "Invalid analytics configuration: event parameters must not exceed 25 entries" }), "custom_event");
  });

  it("reports invalid runtime context through onError", () => {
    const onError = vi.fn();
    const analytics = createGoogleAnalytics({ consent: "granted", onError, transport: { type: "gtm", dataLayer: { push: vi.fn() } } });
    analytics.initialize();
    analytics.setCurrentParams({ section: 5 } as unknown as Record<string, string>);
    expect(onError).toHaveBeenCalledOnce();
    analytics.setCurrentParams({ keywords: "x".repeat(101) });
    expect(onError).toHaveBeenCalledTimes(2);
    expect(() => createGoogleAnalytics(null as never)).toThrow(/config must be an object/);
    expect(() => createGoogleAnalytics({ transport: { type: "gtm", dataLayer: {} } } as never)).toThrow(/transport\.dataLayer\.push must be a function/);
  });

  it("handles denied, disabled, and scroll milestone outcomes", () => {
    const deniedCallback = vi.fn();
    const denied = createGoogleAnalytics({ consent: "denied", transport: { type: "gtm", dataLayer: { push: vi.fn() } } });
    denied.initialize();
    expect(denied.trackClick({ callback: deniedCallback })).toMatchObject({ status: "dropped", reason: "consent_denied" });
    expect(deniedCallback).toHaveBeenCalledOnce();

    const disabled = createGoogleAnalytics({ enabled: false, consent: "granted", transport: { type: "gtm", dataLayer: { push: vi.fn() } } });
    disabled.initialize();
    expect(disabled.trackClick()).toMatchObject({ status: "dropped", reason: "disabled" });

    const analytics = createGoogleAnalytics({
      consent: "granted",
      scroll: { milestones: [25], deduplicatePerPage: true },
      transport: { type: "gtm", dataLayer: { push: vi.fn() } },
    });
    analytics.initialize();
    expect(analytics.trackScroll({ milestone: 10 })).toMatchObject({ status: "dropped", reason: "invalid_milestone" });
    expect(analytics.trackScroll({ milestone: 25 }).status).toBe("sent");
    expect(analytics.trackScroll({ milestone: 25 })).toMatchObject({ status: "dropped", reason: "duplicate" });
  });

  it("returns not-ready without creating a readiness queue", () => {
    const onError = vi.fn();
    const analytics = createGoogleAnalytics({ consent: "granted", ready: false, onError, transport: { type: "gtm", dataLayer: { push: vi.fn() } } });
    analytics.initialize();
    expect(analytics.trackClick()).toMatchObject({ status: "failed", reason: "not_ready" });
    expect(onError).toHaveBeenCalledOnce();
  });

  it("returns cloned context snapshots and preserves unrelated dimensions", () => {
    const analytics = createGoogleAnalytics({ consent: "granted", customDimensions: { series: "" }, transport: { type: "gtm", dataLayer: { push: () => 0 } } });
    analytics.initialize();
    analytics.setCurrentParams({ content_type: "Article", series: "A" });
    const snapshot = analytics.getCurrentParams() as Record<string, string>;
    snapshot.content_type = "Changed";
    analytics.updateCurrentParams({ section: "News" });
    expect(analytics.getCurrentParams()).toMatchObject({ content_type: "Article", series: "A", section: "News" });
  });

  it("uses configured video values and allows finite call overrides", () => {
    const calls: unknown[][] = [];
    const analytics = createGoogleAnalytics({ consent: "granted", measurementId: "G-VIDEO", video: { eventValue: 1 }, transport: { type: "gtag", gtag: (...args) => calls.push(args) } });
    analytics.initialize();
    analytics.trackVideoLoaded();
    analytics.trackVideoPlayed({ event_value: 2 });
    expect(calls[0][2]).toEqual(expect.objectContaining({ event_value: 1 }));
    expect(calls[1][2]).toEqual(expect.objectContaining({ event_value: 2 }));
  });

  it("reports synchronous transport failures as failed", () => {
    const onError = vi.fn();
    const analytics = createGoogleAnalytics({ consent: "granted", onError, transport: { type: "gtm", dataLayer: { push: () => { throw new Error("blocked"); } } } });
    analytics.initialize();
    expect(analytics.trackClick()).toMatchObject({ status: "failed", reason: "transport_error" });
    expect(onError).toHaveBeenCalledOnce();
  });

  it("completes a transport-failure callback once", () => {
    const callback = vi.fn();
    const analytics = createGoogleAnalytics({
      consent: "granted",
      transport: {
        type: "gtm",
        dataLayer: {
          push: () => {
            throw new Error("blocked");
          },
        },
      },
    });
    analytics.initialize();

    expect(analytics.trackClick({ callback, callbackTimeoutMs: 100 })).toMatchObject({
      status: "failed",
      reason: "transport_error",
    });
    expect(callback).toHaveBeenCalledOnce();
  });

  it("reports expired entries once and clears them when consent is denied", () => {
    vi.useFakeTimers();
    const onError = vi.fn();
    const analytics = createGoogleAnalytics({
      consent: "unknown",
      onError,
      queue: { maxAgeMs: 100 },
      transport: { type: "gtm", dataLayer: { push: vi.fn() } },
    });
    analytics.initialize();
    analytics.trackClick();
    vi.advanceTimersByTime(101);
    analytics.trackClick();
    analytics.setConsent("granted");
    expect(onError).toHaveBeenCalledWith(expect.objectContaining({ message: "Analytics queue entry expired" }), "click");

    onError.mockClear();
    const denied = createGoogleAnalytics({
      consent: "unknown",
      onError,
      queue: { maxAgeMs: 100 },
      transport: { type: "gtm", dataLayer: { push: vi.fn() } },
    });
    denied.initialize();
    denied.trackClick();
    vi.advanceTimersByTime(101);
    denied.trackClick();
    denied.setConsent("denied");
    denied.setConsent("granted");
    expect(onError).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  it("bounds GTM callbacks and invokes them at most once", () => {
    vi.useFakeTimers();
    const callbacks: Array<() => void> = [];
    const analytics = createGoogleAnalytics({ consent: "granted", transport: { type: "gtm", dataLayer: { push: (value) => callbacks.push((value as { eventCallback: () => void }).eventCallback) } } });
    analytics.initialize();
    const callback = vi.fn();
    analytics.trackClick({ callback, callbackTimeoutMs: 100 });
    callbacks[0](); callbacks[0]();
    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledOnce();
    vi.useRealTimers();
  });
});
