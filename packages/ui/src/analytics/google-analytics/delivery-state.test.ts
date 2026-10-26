import { beforeEach, describe, expect, it, vi } from "vitest";
import { DeliveryState } from "./delivery-state";

describe("Google Analytics delivery state", () => {
  beforeEach(() => { vi.useFakeTimers(); });
  it("bounds unknown-consent queue and rejects newest entries", () => {
    const state = new DeliveryState(1, 300_000, "unknown", true);
    expect(state.enqueue("first", {})).toMatchObject({ status: "queued" });
    expect(state.enqueue("second", {})).toMatchObject({ status: "dropped", reason: "queue_full" });
  });
  it("expires queued entries and clears on denial", () => {
    const state = new DeliveryState(2, 100, "unknown", true);
    state.enqueue("old", {});
    vi.advanceTimersByTime(101);
    expect(state.takeReady()).toEqual([]);
    state.enqueue("pending", {});
    state.setConsent("denied");
    expect(state.takeReady()).toEqual([]);
  });
  it("does not queue when disabled or consent is denied", () => {
    expect(new DeliveryState(2, 100, "unknown", false).enqueue("x", {})).toMatchObject({ status: "dropped", reason: "disabled" });
    expect(new DeliveryState(2, 100, "denied", true).enqueue("x", {})).toMatchObject({ status: "dropped", reason: "consent_denied" });
  });
});
