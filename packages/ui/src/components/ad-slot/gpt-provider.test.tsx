import { describe, expect, it, vi } from "vitest";
import { createGptAdProvider } from "./gpt-provider";
import type { GptSlotRenderEndedEvent } from "./gpt-provider";

describe("createGptAdProvider", () => {
  it("defines, targets, displays, reports, and destroys a GPT slot through the command queue", async () => {
    let listener: ((event: GptSlotRenderEndedEvent) => void) | undefined;
    const pubads = {
      addEventListener: vi.fn((_type, nextListener) => { listener = nextListener; }),
      removeEventListener: vi.fn(),
    };
    const slot = { addService: vi.fn(), setTargeting: vi.fn() };
    slot.addService.mockReturnValue(slot);
    slot.setTargeting.mockReturnValue(slot);
    const googletag = {
      cmd: { push: vi.fn((command: () => void) => command()) },
      defineSlot: vi.fn(() => slot),
      destroySlots: vi.fn(() => true),
      display: vi.fn(),
      pubads: vi.fn(() => pubads),
    };
    const onStateChange = vi.fn();
    const provider = createGptAdProvider({ googletag });
    const handle = await provider.createSlot({
      elementId: "ad-one",
      adUnitPath: "/123/one",
      sizes: [[300, 250]],
      targeting: { section: "news", tags: ["one", "two"] },
      onStateChange,
    });

    expect(googletag.defineSlot).toHaveBeenCalledWith("/123/one", [[300, 250]], "ad-one");
    expect(slot.addService).toHaveBeenCalledWith(pubads);
    expect(slot.setTargeting).toHaveBeenCalledWith("section", "news");
    expect(slot.setTargeting).toHaveBeenCalledWith("tags", ["one", "two"]);
    expect(googletag.display).toHaveBeenCalledWith("ad-one");
    listener?.({ slot, isEmpty: false });
    listener?.({ slot, isEmpty: true });
    expect(onStateChange.mock.calls.map(([state]) => state)).toEqual(["filled", "empty"]);

    await provider.destroySlot(handle);
    await provider.destroySlot(handle);
    expect(pubads.removeEventListener).toHaveBeenCalledTimes(1);
    expect(googletag.destroySlots).toHaveBeenCalledTimes(1);
  });

  it("rejects when GPT cannot define the requested slot", async () => {
    const googletag = {
      cmd: { push: (command: () => void) => command() },
      defineSlot: () => null,
      destroySlots: () => true,
      display: () => undefined,
      pubads: () => ({ addEventListener: () => undefined, removeEventListener: () => undefined }),
    };
    const provider = createGptAdProvider({ googletag });
    await expect(provider.createSlot({ elementId: "missing", adUnitPath: "/missing", sizes: [[1, 1]], targeting: {}, onStateChange: vi.fn() }))
      .rejects.toThrow("GPT could not define ad slot missing");
  });

  it("removes the listener and slot when display fails during creation", async () => {
    const pubads = { addEventListener: vi.fn(), removeEventListener: vi.fn() };
    const slot = { addService: vi.fn(), setTargeting: vi.fn() };
    slot.addService.mockReturnValue(slot);
    slot.setTargeting.mockReturnValue(slot);
    const destroySlots = vi.fn(() => true);
    const provider = createGptAdProvider({
      googletag: {
        cmd: { push: (command: () => void) => command() },
        defineSlot: () => slot,
        destroySlots,
        display: () => { throw new Error("display failed"); },
        pubads: () => pubads,
      },
    });

    await expect(provider.createSlot({ elementId: "failed", adUnitPath: "/failed", sizes: [[300, 250]], targeting: {}, onStateChange: vi.fn() }))
      .rejects.toThrow("display failed");
    expect(pubads.removeEventListener).toHaveBeenCalledTimes(1);
    expect(destroySlots).toHaveBeenCalledWith([slot]);
  });

  it("ignores render events for other GPT slots", async () => {
    let listener: ((event: GptSlotRenderEndedEvent) => void) | undefined;
    const pubads = {
      addEventListener: vi.fn((_type, nextListener) => { listener = nextListener; }),
      removeEventListener: vi.fn(),
    };
    const slot = { addService: vi.fn(), setTargeting: vi.fn() };
    slot.addService.mockReturnValue(slot);
    slot.setTargeting.mockReturnValue(slot);
    const provider = createGptAdProvider({
      googletag: {
        cmd: { push: (command: () => void) => command() },
        defineSlot: () => slot,
        destroySlots: () => true,
        display: () => undefined,
        pubads: () => pubads,
      },
    });
    const onStateChange = vi.fn();
    await provider.createSlot({ elementId: "owned", adUnitPath: "/owned", sizes: [[300, 250]], targeting: {}, onStateChange });
    const otherSlot = { addService: vi.fn(), setTargeting: vi.fn() };

    listener?.({ slot: otherSlot, isEmpty: false });
    expect(onStateChange).not.toHaveBeenCalled();
    listener?.({ slot, isEmpty: false });
    expect(onStateChange).toHaveBeenCalledWith("filled");
  });

  it("keeps cleanup retryable when GPT reports destroy failure", async () => {
    const pubads = { addEventListener: vi.fn(), removeEventListener: vi.fn() };
    const slot = { addService: vi.fn(), setTargeting: vi.fn() };
    slot.addService.mockReturnValue(slot);
    slot.setTargeting.mockReturnValue(slot);
    const destroySlots = vi.fn()
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);
    const provider = createGptAdProvider({
      googletag: {
        cmd: { push: (command: () => void) => command() },
        defineSlot: () => slot,
        destroySlots,
        display: () => undefined,
        pubads: () => pubads,
      },
    });
    const handle = await provider.createSlot({ elementId: "retry", adUnitPath: "/retry", sizes: [[300, 250]], targeting: {}, onStateChange: vi.fn() });

    await expect(provider.destroySlot(handle)).rejects.toThrow("GPT could not destroy ad slot retry");
    await expect(provider.destroySlot(handle)).resolves.toBeUndefined();
    expect(destroySlots).toHaveBeenCalledTimes(2);
    expect(pubads.removeEventListener).toHaveBeenCalledTimes(1);
  });

  it("keeps cleanup retryable when listener removal throws", async () => {
    const pubads = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
        .mockImplementationOnce(() => { throw new Error("listener cleanup failed"); })
        .mockImplementationOnce(() => undefined),
    };
    const slot = { addService: vi.fn(), setTargeting: vi.fn() };
    slot.addService.mockReturnValue(slot);
    slot.setTargeting.mockReturnValue(slot);
    const destroySlots = vi.fn(() => true);
    const provider = createGptAdProvider({
      googletag: {
        cmd: { push: (command: () => void) => command() },
        defineSlot: () => slot,
        destroySlots,
        display: () => undefined,
        pubads: () => pubads,
      },
    });
    const handle = await provider.createSlot({ elementId: "retry-listener", adUnitPath: "/retry", sizes: [[300, 250]], targeting: {}, onStateChange: vi.fn() });

    await expect(provider.destroySlot(handle)).rejects.toThrow("listener cleanup failed");
    await expect(provider.destroySlot(handle)).resolves.toBeUndefined();
    expect(pubads.removeEventListener).toHaveBeenCalledTimes(2);
    expect(destroySlots).toHaveBeenCalledTimes(1);
  });
});
