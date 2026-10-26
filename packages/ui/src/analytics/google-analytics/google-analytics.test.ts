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
