import type { AdProvider, AdProviderSlot, AdProviderSlotRequest, AdTargetingValue } from "./types";

export type GptSlotRenderEndedEvent = {
  slot: GptSlot;
  isEmpty: boolean;
};

export type GptPubAdsService = {
  addEventListener(type: "slotRenderEnded", listener: (event: GptSlotRenderEndedEvent) => void): void;
  removeEventListener(type: "slotRenderEnded", listener: (event: GptSlotRenderEndedEvent) => void): void;
};

export type GptSlot = {
  addService(service: GptPubAdsService): GptSlot;
  setTargeting(key: string, value: string | readonly string[]): GptSlot;
};

export type GptCompatible = {
  cmd: { push(command: () => void): unknown };
  defineSlot(
    adUnitPath: string,
    sizes: readonly (readonly [number, number])[],
    elementId: string,
  ): GptSlot | null;
  destroySlots(slots: readonly GptSlot[]): boolean;
  display(elementId: string): void;
  pubads(): GptPubAdsService;
};

type InternalSlot = {
  destroyed: boolean;
  destroyPromise?: Promise<void>;
  listener: (event: GptSlotRenderEndedEvent) => void;
  listenerRemoved: boolean;
  pubads: GptPubAdsService;
  slot: GptSlot;
};

function cloneTargetingValue(value: AdTargetingValue): string | readonly string[] {
  return typeof value === "string" ? value : [...value];
}

export function createGptAdProvider({
  googletag,
  readinessTimeoutMs = 5000,
}: {
  googletag: GptCompatible;
  readinessTimeoutMs?: number;
}): AdProvider {
  const slots = new WeakMap<AdProviderSlot, InternalSlot>();

  return {
    createSlot(request: AdProviderSlotRequest) {
      return new Promise<AdProviderSlot>((resolve, reject) => {
        let settled = false;
        const timeout = setTimeout(() => {
          if (settled) return;
          settled = true;
          reject(new Error(`GPT did not become ready within ${readinessTimeoutMs}ms`));
        }, readinessTimeoutMs);
        googletag.cmd.push(() => {
          if (settled) return;
          let handle: AdProviderSlot | undefined;
          let internal: InternalSlot | undefined;
          try {
            const pubads = googletag.pubads();
            const slot = googletag.defineSlot(request.adUnitPath, request.sizes, request.elementId);
            if (!slot) {
              throw new Error(`GPT could not define ad slot ${request.elementId}`);
            }

            slot.addService(pubads);
            for (const [key, value] of Object.entries(request.targeting)) {
              slot.setTargeting(key, cloneTargetingValue(value));
            }

            handle = Object.freeze({ id: request.elementId });
            const listener = (event: GptSlotRenderEndedEvent) => {
              if (event.slot === slot) {
                request.onStateChange(event.isEmpty ? "empty" : "filled");
              }
            };
            pubads.addEventListener("slotRenderEnded", listener);
            internal = { destroyed: false, listener, listenerRemoved: false, pubads, slot };
            slots.set(handle, internal);
            googletag.display(request.elementId);
            settled = true;
            clearTimeout(timeout);
            resolve(handle);
          } catch (error) {
            settled = true;
            clearTimeout(timeout);
            if (internal && handle) {
              try {
                internal.pubads.removeEventListener("slotRenderEnded", internal.listener);
                googletag.destroySlots([internal.slot]);
              } catch {
                // Preserve the original creation failure.
              }
              slots.delete(handle);
            }
            reject(error);
          }
        });
      });
    },

    destroySlot(handle: AdProviderSlot) {
      const internal = slots.get(handle);
      if (!internal || internal.destroyed) {
        return Promise.resolve();
      }
      if (internal.destroyPromise) {
        return internal.destroyPromise;
      }

      let resolveDestroy!: () => void;
      let rejectDestroy!: (error: unknown) => void;
      const destroyPromise = new Promise<void>((resolve, reject) => {
        resolveDestroy = resolve;
        rejectDestroy = reject;
      });
      internal.destroyPromise = destroyPromise;

      try {
        googletag.cmd.push(() => {
          try {
            if (!internal.listenerRemoved) {
              internal.pubads.removeEventListener("slotRenderEnded", internal.listener);
              internal.listenerRemoved = true;
            }
            if (!googletag.destroySlots([internal.slot])) {
              throw new Error(`GPT could not destroy ad slot ${handle.id}`);
            }
            internal.destroyed = true;
            internal.destroyPromise = undefined;
            slots.delete(handle);
            resolveDestroy();
          } catch (error) {
            internal.destroyPromise = undefined;
            rejectDestroy(error);
          }
        });
      } catch (error) {
        internal.destroyPromise = undefined;
        rejectDestroy(error);
      }

      return destroyPromise;
    },
  };
}
