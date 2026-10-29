import axe from "axe-core";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AdSlot, RESIZE_DEBOUNCE_MS } from "./ad-slot";
import { createGptAdProvider } from "./gpt-provider";
import type { AdPlacementConfig, AdProvider, AdProviderSlotRequest } from "./types";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

const config: AdPlacementConfig = {
  key: "catalog-mrec",
  format: "mrec",
  reservedSize: [300, 250],
  targeting: { section: "news", tags: ["catalog", "test"] },
  rules: [
    { minWidth: 0, maxWidth: 767, enabled: false },
    { minWidth: 768, adUnitPath: "/123/catalog/mrec", sizes: [[300, 250], [300, 600]] },
  ],
};

function createProvider() {
  const requests: AdProviderSlotRequest[] = [];
  const createSlot = vi.fn((request: AdProviderSlotRequest) => {
    requests.push(request);
    return { id: request.elementId };
  });
  const destroySlot = vi.fn();
  return { provider: { createSlot, destroySlot } satisfies AdProvider, requests, createSlot, destroySlot };
}

function deferred<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((nextResolve, nextReject) => {
    resolve = nextResolve;
    reject = nextReject;
  });
  return { promise, reject, resolve };
}

describe("AdSlot", () => {
  it("never calls the provider while consumer eligibility is false", async () => {
    const fake = createProvider();
    render(<AdSlot config={config} enabled={false} provider={fake.provider} />);
    await act(async () => undefined);
    expect(fake.createSlot).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Advertisement")).toHaveAttribute("data-ad-state", "idle");
  });

  it("keeps disabled responsive rules provider-free", async () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 375, writable: true });
    const fake = createProvider();
    render(<AdSlot config={config} enabled provider={fake.provider} />);
    await act(async () => undefined);
    expect(fake.createSlot).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Advertisement")).toHaveClass("gno-ad-slot--disabled");
  });

  it("surfaces a blocked GPT command queue as an error", async () => {
    const provider = createGptAdProvider({
      googletag: {
        cmd: { push: vi.fn() },
        defineSlot: vi.fn(),
        destroySlots: vi.fn(() => true),
        display: vi.fn(),
        pubads: vi.fn(),
      },
      readinessTimeoutMs: 1,
    });

    await expect(provider.createSlot({
      elementId: "blocked-slot",
      adUnitPath: "/123/blocked",
      sizes: [[300, 250]],
      targeting: {},
      onStateChange: vi.fn(),
    })).rejects.toThrow("GPT did not become ready");
  });

  it("bypasses a stalled create when disabled", async () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1024, writable: true });
    const pending = deferred<{ id: string }>();
    const provider = {
      createSlot: vi.fn(() => pending.promise),
      destroySlot: vi.fn(),
    } satisfies AdProvider;
    const view = render(<AdSlot config={config} enabled provider={provider} />);
    await waitFor(() => expect(provider.createSlot).toHaveBeenCalledTimes(1));

    view.rerender(<AdSlot config={config} enabled={false} provider={provider} />);
    await waitFor(() => expect(screen.getByLabelText("Advertisement")).toHaveClass("gno-ad-slot--disabled"));
    expect(provider.destroySlot).not.toHaveBeenCalled();
    pending.resolve({ id: "late-slot" });
    await act(async () => undefined);
    expect(provider.destroySlot).toHaveBeenCalledTimes(1);
  });

  it("passes the consumer ad unit path, sizes, and targeting to the provider", async () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1024, writable: true });
    const fake = createProvider();
    render(<AdSlot config={config} enabled provider={fake.provider} slotId="catalog-slot" />);
    await waitFor(() => expect(fake.createSlot).toHaveBeenCalledTimes(1));
    expect(fake.requests[0]).toMatchObject({
      elementId: "catalog-slot",
      adUnitPath: "/123/catalog/mrec",
      sizes: [[300, 250], [300, 600]],
      targeting: { section: "news", tags: ["catalog", "test"] },
    });
    act(() => fake.requests[0].onStateChange("filled"));
    expect(screen.getByLabelText("Advertisement")).toHaveAttribute("data-ad-state", "filled");
  });

  it("debounces resize and recreates only when the responsive rule changes", async () => {
    vi.useFakeTimers();
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1024, writable: true });
    const fake = createProvider();
    render(<AdSlot config={config} enabled provider={fake.provider} />);
    await act(async () => undefined);
    expect(fake.createSlot).toHaveBeenCalledTimes(1);

    act(() => {
      window.dispatchEvent(new Event("resize"));
      window.dispatchEvent(new Event("resize"));
      vi.advanceTimersByTime(RESIZE_DEBOUNCE_MS);
    });
    await act(async () => undefined);
    expect(fake.createSlot).toHaveBeenCalledTimes(1);

    window.innerWidth = 375;
    act(() => {
      window.dispatchEvent(new Event("resize"));
      vi.advanceTimersByTime(RESIZE_DEBOUNCE_MS);
    });
    await act(async () => undefined);
    expect(fake.destroySlot).toHaveBeenCalledTimes(1);
    expect(fake.createSlot).toHaveBeenCalledTimes(1);
  });

  it("cleans up safely when React Strict Mode replays effects", async () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1024, writable: true });
    const fake = createProvider();
    const view = render(<StrictMode><AdSlot config={config} enabled provider={fake.provider} /></StrictMode>);
    await waitFor(() => expect(fake.createSlot).toHaveBeenCalled());
    view.unmount();
    await waitFor(() => expect(fake.destroySlot).toHaveBeenCalled());
    expect(fake.destroySlot.mock.calls.length).toBe(fake.createSlot.mock.calls.length);
  });

  it("serializes Strict Mode replay while provider readiness is delayed", async () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1024, writable: true });
    const creation = deferred<{ id: string }>();
    const createSlot = vi.fn(() => creation.promise);
    const destroySlot = vi.fn();
    const provider: AdProvider = { createSlot, destroySlot };
    const view = render(<StrictMode><AdSlot config={config} enabled provider={provider} /></StrictMode>);
    await waitFor(() => expect(createSlot).toHaveBeenCalledTimes(1));

    await act(async () => creation.resolve({ id: "strict-late-slot" }));
    view.unmount();
    await waitFor(() => expect(destroySlot).toHaveBeenCalledWith({ id: "strict-late-slot" }));
    expect(createSlot).toHaveBeenCalledTimes(1);
    expect(destroySlot).toHaveBeenCalledTimes(1);
  });

  it("serializes Strict Mode replay through a late GPT command queue", async () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1024, writable: true });
    const commands: Array<() => void> = [];
    const pubads = { addEventListener: vi.fn(), removeEventListener: vi.fn() };
    const slot = { addService: vi.fn(), setTargeting: vi.fn() };
    slot.addService.mockReturnValue(slot);
    slot.setTargeting.mockReturnValue(slot);
    const googletag = {
      cmd: { push: vi.fn((command: () => void) => commands.push(command)) },
      defineSlot: vi.fn(() => slot),
      destroySlots: vi.fn(() => true),
      display: vi.fn(),
      pubads: vi.fn(() => pubads),
    };
    const provider = createGptAdProvider({ googletag });
    const view = render(<StrictMode><AdSlot config={config} enabled provider={provider} /></StrictMode>);
    await waitFor(() => expect(commands).toHaveLength(1));

    await act(async () => commands.shift()?.());
    await waitFor(() => expect(googletag.defineSlot).toHaveBeenCalledTimes(1));
    expect(googletag.display).toHaveBeenCalledTimes(1);

    view.unmount();
    await waitFor(() => expect(commands).toHaveLength(1));
    await act(async () => commands.shift()?.());
    await waitFor(() => expect(googletag.destroySlots).toHaveBeenCalledTimes(1));
    expect(googletag.defineSlot).toHaveBeenCalledTimes(1);
  });

  it("does not recreate a slot when only the state callback identity changes", async () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1024, writable: true });
    const fake = createProvider();
    const firstCallback = vi.fn();
    const secondCallback = vi.fn();
    const view = render(<AdSlot config={config} enabled onStateChange={firstCallback} provider={fake.provider} />);
    await waitFor(() => expect(fake.createSlot).toHaveBeenCalledTimes(1));

    view.rerender(<AdSlot config={config} enabled onStateChange={secondCallback} provider={fake.provider} />);
    await act(async () => undefined);
    expect(fake.createSlot).toHaveBeenCalledTimes(1);
    expect(fake.destroySlot).not.toHaveBeenCalled();

    act(() => fake.requests[0].onStateChange("filled"));
    expect(secondCallback).toHaveBeenLastCalledWith("filled", undefined);
    expect(firstCallback).not.toHaveBeenCalledWith("filled", undefined);
  });

  it("destroys a stale pending creation before creating a config replacement", async () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1024, writable: true });
    const firstCreation = deferred<{ id: string }>();
    const firstDestruction = deferred<void>();
    const events: string[] = [];
    let createCount = 0;
    const provider: AdProvider = {
      createSlot: vi.fn((request) => {
        createCount += 1;
        events.push(`create:${request.adUnitPath}`);
        if (createCount === 1) return firstCreation.promise;
        return { id: request.elementId };
      }),
      destroySlot: vi.fn((slot) => {
        events.push(`destroy:${slot.id}`);
        return firstDestruction.promise;
      }),
    };
    const replacement: AdPlacementConfig = {
      ...config,
      key: "replacement",
      rules: [
        { minWidth: 0, maxWidth: 767, enabled: false },
        { minWidth: 768, adUnitPath: "/123/catalog/replacement", sizes: [[300, 250]] },
      ],
    };
    const view = render(<AdSlot config={config} enabled provider={provider} />);
    await waitFor(() => expect(provider.createSlot).toHaveBeenCalledTimes(1));
    view.rerender(<AdSlot config={replacement} enabled provider={provider} />);

    await act(async () => firstCreation.resolve({ id: "stale-slot" }));
    await waitFor(() => expect(provider.destroySlot).toHaveBeenCalledWith({ id: "stale-slot" }));
    expect(provider.createSlot).toHaveBeenCalledTimes(1);

    await act(async () => firstDestruction.resolve());
    await waitFor(() => expect(provider.createSlot).toHaveBeenCalledTimes(2));
    expect(events).toEqual([
      "create:/123/catalog/mrec",
      "destroy:stale-slot",
      "create:/123/catalog/replacement",
    ]);
  });

  it("waits for an owned slot to be destroyed before using a replacement provider", async () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1024, writable: true });
    const old = createProvider();
    const destroy = deferred<void>();
    old.destroySlot.mockImplementation(() => destroy.promise);
    const replacement = createProvider();
    const view = render(<AdSlot config={config} enabled provider={old.provider} />);
    await waitFor(() => expect(old.createSlot).toHaveBeenCalledTimes(1));

    view.rerender(<AdSlot config={config} enabled provider={replacement.provider} />);
    await waitFor(() => expect(old.destroySlot).toHaveBeenCalledTimes(1));
    expect(replacement.createSlot).not.toHaveBeenCalled();

    await act(async () => destroy.resolve());
    await waitFor(() => expect(replacement.createSlot).toHaveBeenCalledTimes(1));
  });

  it("keeps the peak live-slot count at one during active replacement", async () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1024, writable: true });
    const destruction = deferred<void>();
    let liveSlots = 0;
    let peakLiveSlots = 0;
    const provider: AdProvider = {
      createSlot: vi.fn((request) => {
        liveSlots += 1;
        peakLiveSlots = Math.max(peakLiveSlots, liveSlots);
        return { id: request.elementId };
      }),
      destroySlot: vi.fn(async () => {
        await destruction.promise;
        liveSlots -= 1;
      }),
    };
    const replacement: AdPlacementConfig = {
      ...config,
      key: "peak-replacement",
      rules: [
        { minWidth: 0, maxWidth: 767, enabled: false },
        { minWidth: 768, adUnitPath: "/123/catalog/peak-replacement", sizes: [[300, 250]] },
      ],
    };
    const view = render(<AdSlot config={config} enabled provider={provider} />);
    await waitFor(() => expect(provider.createSlot).toHaveBeenCalledTimes(1));
    view.rerender(<AdSlot config={replacement} enabled provider={provider} />);
    await waitFor(() => expect(provider.destroySlot).toHaveBeenCalledTimes(1));
    expect(provider.createSlot).toHaveBeenCalledTimes(1);
    expect(liveSlots).toBe(1);

    await act(async () => destruction.resolve());
    await waitFor(() => expect(provider.createSlot).toHaveBeenCalledTimes(2));
    expect(liveSlots).toBe(1);
    expect(peakLiveSlots).toBe(1);
  });

  it("retries the same GPT handle before creating a config replacement", async () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1024, writable: true });
    const events: string[] = [];
    let liveSlots = 0;
    let peakLiveSlots = 0;
    let slotNumber = 0;
    const pubads = { addEventListener: vi.fn(), removeEventListener: vi.fn() };
    const defineSlot = vi.fn(() => {
      slotNumber += 1;
      liveSlots += 1;
      peakLiveSlots = Math.max(peakLiveSlots, liveSlots);
      events.push(`define:${slotNumber}`);
      const slot = { addService: vi.fn(), setTargeting: vi.fn() };
      slot.addService.mockReturnValue(slot);
      slot.setTargeting.mockReturnValue(slot);
      return slot;
    });
    const destroySlots = vi.fn()
      .mockImplementationOnce(() => {
        events.push("destroy:false");
        return false;
      })
      .mockImplementation(() => {
        events.push("destroy:true");
        liveSlots -= 1;
        return true;
      });
    const provider = createGptAdProvider({
      googletag: {
        cmd: { push: (command: () => void) => command() },
        defineSlot,
        destroySlots,
        display: vi.fn(),
        pubads: () => pubads,
      },
    });
    const onStateChange = vi.fn();
    const replacement: AdPlacementConfig = {
      ...config,
      key: "gpt-replacement",
      rules: [
        { minWidth: 0, maxWidth: 767, enabled: false },
        { minWidth: 768, adUnitPath: "/123/catalog/gpt-replacement", sizes: [[300, 250]] },
      ],
    };
    const view = render(<AdSlot config={config} enabled onStateChange={onStateChange} provider={provider} />);
    await waitFor(() => expect(defineSlot).toHaveBeenCalledTimes(1));

    view.rerender(<AdSlot config={replacement} enabled onStateChange={onStateChange} provider={provider} />);
    await waitFor(() => expect(defineSlot).toHaveBeenCalledTimes(2));

    expect(destroySlots).toHaveBeenCalledTimes(2);
    expect(events).toEqual(["define:1", "destroy:false", "destroy:true", "define:2"]);
    expect(onStateChange).toHaveBeenCalledWith("error", expect.objectContaining({ message: expect.stringContaining("could not destroy") }));
    expect(liveSlots).toBe(1);
    expect(peakLiveSlots).toBe(1);
  });

  it("retries GPT listener cleanup before creating a provider replacement", async () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1024, writable: true });
    const cleanupFailure = new Error("listener removal failed");
    const pubads = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
        .mockImplementationOnce(() => { throw cleanupFailure; })
        .mockImplementation(() => undefined),
    };
    const defineSlot = vi.fn(() => {
      const slot = { addService: vi.fn(), setTargeting: vi.fn() };
      slot.addService.mockReturnValue(slot);
      slot.setTargeting.mockReturnValue(slot);
      return slot;
    });
    const destroySlots = vi.fn(() => true);
    const provider = createGptAdProvider({
      googletag: {
        cmd: { push: (command: () => void) => command() },
        defineSlot,
        destroySlots,
        display: vi.fn(),
        pubads: () => pubads,
      },
    });
    const replacement = createProvider();
    const onStateChange = vi.fn();
    const view = render(<AdSlot config={config} enabled onStateChange={onStateChange} provider={provider} />);
    await waitFor(() => expect(defineSlot).toHaveBeenCalledTimes(1));

    view.rerender(<AdSlot config={config} enabled onStateChange={onStateChange} provider={replacement.provider} />);
    await waitFor(() => expect(replacement.createSlot).toHaveBeenCalledTimes(1));

    expect(pubads.removeEventListener).toHaveBeenCalledTimes(2);
    expect(destroySlots).toHaveBeenCalledTimes(1);
    expect(onStateChange).toHaveBeenCalledWith("error", cleanupFailure);
  });

  it("retains a failed cleanup handle and blocks replacement until a later trigger succeeds", async () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1024, writable: true });
    let liveSlots = 0;
    let peakLiveSlots = 0;
    const createSlot = vi.fn((request: AdProviderSlotRequest) => {
      liveSlots += 1;
      peakLiveSlots = Math.max(peakLiveSlots, liveSlots);
      return { id: request.elementId };
    });
    const cleanupFailure = new Error("cleanup remained unavailable");
    const destroySlot = vi.fn()
      .mockRejectedValueOnce(cleanupFailure)
      .mockRejectedValueOnce(cleanupFailure)
      .mockRejectedValueOnce(cleanupFailure)
      .mockRejectedValueOnce(cleanupFailure)
      .mockImplementation(async () => { liveSlots -= 1; });
    const provider: AdProvider = { createSlot, destroySlot };
    const onStateChange = vi.fn();
    const firstReplacement: AdPlacementConfig = {
      ...config,
      key: "blocked-replacement",
      rules: [
        { minWidth: 0, maxWidth: 767, enabled: false },
        { minWidth: 768, adUnitPath: "/123/catalog/blocked", sizes: [[300, 250]] },
      ],
    };
    const secondReplacement: AdPlacementConfig = {
      ...firstReplacement,
      key: "successful-replacement",
      rules: [
        { minWidth: 0, maxWidth: 767, enabled: false },
        { minWidth: 768, adUnitPath: "/123/catalog/success", sizes: [[300, 250]] },
      ],
    };
    const view = render(<AdSlot config={config} enabled onStateChange={onStateChange} provider={provider} />);
    await waitFor(() => expect(createSlot).toHaveBeenCalledTimes(1));

    view.rerender(<AdSlot config={firstReplacement} enabled onStateChange={onStateChange} provider={provider} />);
    await waitFor(() => expect(destroySlot).toHaveBeenCalledTimes(4));
    expect(createSlot).toHaveBeenCalledTimes(1);
    expect(liveSlots).toBe(1);
    expect(onStateChange).toHaveBeenCalledWith("error", cleanupFailure);

    view.rerender(<AdSlot config={secondReplacement} enabled onStateChange={onStateChange} provider={provider} />);
    await waitFor(() => expect(createSlot).toHaveBeenCalledTimes(2));
    expect(destroySlot).toHaveBeenCalledTimes(5);
    expect(liveSlots).toBe(1);
    expect(peakLiveSlots).toBe(1);
  });

  it("retries unmount cleanup with the same handle and reports the transient failure", async () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1024, writable: true });
    const cleanupFailure = new Error("first unmount cleanup failed");
    const destroySlot = vi.fn()
      .mockRejectedValueOnce(cleanupFailure)
      .mockResolvedValueOnce(undefined);
    const provider: AdProvider = { createSlot: () => ({ id: "unmount-retry" }), destroySlot };
    const onStateChange = vi.fn();
    const view = render(<AdSlot config={config} enabled onStateChange={onStateChange} provider={provider} />);
    await waitFor(() => expect(screen.getByLabelText("Advertisement")).toHaveAttribute("data-ad-state", "loading"));

    view.unmount();
    await waitFor(() => expect(destroySlot).toHaveBeenCalledTimes(2));
    expect(destroySlot.mock.calls[0][0]).toBe(destroySlot.mock.calls[1][0]);
    expect(onStateChange).toHaveBeenCalledWith("error", cleanupFailure);
  });

  it("destroys a slot whose pending creation completes after unmount", async () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1024, writable: true });
    const creation = deferred<{ id: string }>();
    const destroySlot = vi.fn();
    const provider: AdProvider = { createSlot: () => creation.promise, destroySlot };
    const view = render(<AdSlot config={config} enabled provider={provider} />);
    await waitFor(() => expect(screen.getByLabelText("Advertisement")).toHaveAttribute("data-ad-state", "loading"));
    view.unmount();

    await act(async () => creation.resolve({ id: "late-slot" }));
    await waitFor(() => expect(destroySlot).toHaveBeenCalledWith({ id: "late-slot" }));
  });

  it("keeps provider cleanup isolated between component instances", async () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1024, writable: true });
    const fake = createProvider();
    const first = render(<AdSlot config={{ ...config, key: "first" }} enabled provider={fake.provider} slotId="first-slot" />);
    const second = render(<AdSlot config={{ ...config, key: "second" }} enabled provider={fake.provider} slotId="second-slot" />);
    await waitFor(() => expect(fake.createSlot).toHaveBeenCalledTimes(2));
    first.unmount();
    await waitFor(() => expect(fake.destroySlot).toHaveBeenCalledTimes(1));
    expect(fake.destroySlot).toHaveBeenCalledWith({ id: "first-slot" });
    expect(screen.getByLabelText("Advertisement")).toHaveAttribute("data-ad-state", "loading");
    second.unmount();
  });

  it("reports provider creation failures as an observable error state", async () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1024, writable: true });
    const failure = new Error("provider unavailable");
    const onStateChange = vi.fn();
    const provider: AdProvider = { createSlot: () => Promise.reject(failure), destroySlot: vi.fn() };
    render(<AdSlot config={config} enabled onStateChange={onStateChange} provider={provider} />);
    await waitFor(() => expect(screen.getByLabelText("Advertisement")).toHaveAttribute("data-ad-state", "error"));
    expect(onStateChange).toHaveBeenLastCalledWith("error", failure);
  });

  it("reserves space by default and collapses only after an empty result when configured", async () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1024, writable: true });
    const fake = createProvider();
    const collapseConfig: AdPlacementConfig = { ...config, emptyBehavior: "collapse", reservedSize: undefined };
    render(<AdSlot config={collapseConfig} enabled provider={fake.provider} />);
    await waitFor(() => expect(fake.requests).toHaveLength(1));
    act(() => fake.requests[0].onStateChange("empty"));
    expect(screen.getByLabelText("Advertisement")).toHaveClass("gno-ad-slot--collapsed");
  });

  it("has no serious or critical accessibility violations", async () => {
    const fake = createProvider();
    const { container } = render(<AdSlot config={config} enabled={false} provider={fake.provider} />);
    const results = await axe.run(container, { resultTypes: ["violations"] });
    expect(results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""))).toEqual([]);
  });

  it("renders on the server without calling or reading the provider", () => {
    const fake = createProvider();
    const markup = renderToString(<AdSlot config={config} enabled provider={fake.provider} slotId="ssr-slot" />);
    expect(markup).toContain("ssr-slot");
    expect(markup).toContain("Advertisement");
    expect(fake.createSlot).not.toHaveBeenCalled();
    expect(fake.destroySlot).not.toHaveBeenCalled();
  });
});
