import type { AnalyticsTransport, Callback, DataLayer, Gtag } from "./types";

export type TransportEvent = {
  eventName: string;
  params: Record<string, unknown>;
  callback?: Callback;
  callbackTimeoutMs?: number;
};

function createCompletion(
  callback: Callback | undefined,
  timeoutMs: number | undefined,
  onError: (error: unknown) => void,
) {
  if (!callback) return undefined;
  let completed = false;
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const complete = () => {
    if (completed) return;
    completed = true;
    if (timeout) clearTimeout(timeout);
    try {
      callback();
    } catch (error) {
      onError(error);
    }
  };
  if (timeoutMs !== undefined) timeout = setTimeout(complete, timeoutMs);
  return complete;
}

export function sendTransport(
  transport: AnalyticsTransport,
  measurementId: string | undefined,
  event: TransportEvent,
  onError: (error: unknown) => void,
): boolean {
  if (transport.type === "gtag") {
    const params = {
      ...event.params,
      ...(measurementId ? { send_to: measurementId } : {}),
    } as Record<string, unknown>;
    const complete = createCompletion(event.callback, event.callbackTimeoutMs, onError);
    if (complete) params.event_callback = complete;
    if (event.callbackTimeoutMs !== undefined) params.event_timeout = event.callbackTimeoutMs;

    try {
      transport.gtag("event", event.eventName, params);
      return true;
    } catch (error) {
      onError(error);
      complete?.();
      return false;
    }
  }

  const eventParams = { ...event.params };
  const envelope: Record<string, unknown> = {
    event: "gno_analytics_event",
    event_name: event.eventName,
    event_params: eventParams,
  };
  const complete = createCompletion(event.callback, event.callbackTimeoutMs, onError);
  if (complete) envelope.eventCallback = complete;
  if (event.callbackTimeoutMs !== undefined) envelope.eventTimeout = event.callbackTimeoutMs;

  try {
    transport.dataLayer.push(envelope);
    return true;
  } catch (error) {
    onError(error);
    complete?.();
    return false;
  }
}

export function isDataLayer(value: unknown): value is DataLayer {
  return Boolean(value && typeof (value as DataLayer).push === "function");
}

export function isGtag(value: unknown): value is Gtag {
  return typeof value === "function";
}
