import type { AnalyticsResult, ConsentState, EventInput } from "./types";

type PendingEvent = { eventName: string; params: EventInput; queuedAt: number };

export class DeliveryState {
  private consent: ConsentState;
  private initialized = false;
  private readonly queue: PendingEvent[] = [];
  private readonly expired: PendingEvent[] = [];
  constructor(
    private readonly capacity: number,
    private readonly maxAgeMs: number,
    initialConsent: ConsentState,
    private readonly enabled: boolean,
  ) {
    this.consent = initialConsent;
  }

  initialize() {
    this.initialized = true;
  }

  isReady(resolve: boolean | (() => boolean) | undefined) {
    return this.initialized && (typeof resolve === "function" ? resolve() : resolve ?? true);
  }

  getConsent() {
    return this.consent;
  }

  setConsent(state: ConsentState) {
    this.consent = state;
    if (state === "denied") this.queue.length = 0;
  }

  enqueue(eventName: string, params: EventInput): AnalyticsResult {
    if (!this.enabled) {
      return { status: "dropped", eventName, reason: "disabled" };
    }
    if (this.consent === "denied") {
      return { status: "dropped", eventName, reason: "consent_denied" };
    }
    const now = Date.now();
    this.removeExpired(now);
    if (this.queue.length >= this.capacity) {
      return { status: "dropped", eventName, reason: "queue_full" };
    }
    this.queue.push({ eventName, params: { ...params }, queuedAt: now });
    return { status: "queued", eventName, reason: "consent_unknown" };
  }

  takeReady(): PendingEvent[] {
    const now = Date.now();
    this.removeExpired(now);
    const entries = this.queue.splice(0);
    return entries.filter((entry) => now - entry.queuedAt <= this.maxAgeMs);
  }

  takeExpired(): PendingEvent[] {
    return this.expired.splice(0);
  }

  clear() {
    this.queue.length = 0;
  }

  private removeExpired(now: number) {
    for (let index = this.queue.length - 1; index >= 0; index -= 1) {
      if (now - this.queue[index].queuedAt > this.maxAgeMs) {
        this.expired.push(...this.queue.splice(index, 1));
      }
    }
  }
}
