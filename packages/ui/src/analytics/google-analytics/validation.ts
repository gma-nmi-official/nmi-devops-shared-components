import type {
  AnalyticsConfig,
  AnalyticsScalar,
  DimensionDefinition,
  EventInput,
} from "./types";

export const DEFAULT_DIMENSIONS = [
  "content_type", "author", "subsection", "audience_interest", "source", "publish_date",
  "keywords", "content_id", "section", "show_name", "portal_section",
] as const;

const RESERVED_KEYS = new Set([
  "event", "event_name", "event_params", "eventCallback", "eventTimeout", "event_callback", "event_timeout", "send_to",
  "__proto__", "prototype", "constructor",
]);
const RESERVED_PREFIXES = ["google_", "ga_", "firebase_"];
const NAME_PATTERN = /^[A-Za-z][A-Za-z0-9_]*$/;

export class AnalyticsConfigurationError extends Error {
  readonly issues: readonly string[];
  constructor(issues: readonly string[]) {
    super(`Invalid analytics configuration: ${issues.join(", ")}`);
    this.issues = issues;
  }
}

export function isScalar(value: unknown): value is AnalyticsScalar {
  return typeof value === "string" || typeof value === "boolean" || (typeof value === "number" && Number.isFinite(value));
}

export function validateName(name: string, label: string): string[] {
  const issues: string[] = [];
  if (!NAME_PATTERN.test(name) || name.length > 40) {
    issues.push(`${label} must start with a letter, contain only letters, numbers, or underscores, and be at most 40 characters`);
  }
  if (RESERVED_KEYS.has(name) || RESERVED_PREFIXES.some((prefix) => name.toLowerCase().startsWith(prefix))) {
    issues.push(`${label} uses a reserved GA4 name or prefix`);
  }
  return issues;
}

export function validateScalar(key: string, value: unknown): string[] {
  if (!isScalar(value)) return [`${key} must be a string, finite number, or boolean`];
  if (typeof value === "string") {
    const max = key === "page_title" ? 300 : key === "page_location" ? 1000 : 100;
    if (value.length > max) {
      return [`${key} must be at most ${max} characters`];
    }
  }
  return [];
}

export function dimensionEntries(
  config: AnalyticsConfig,
): Readonly<Record<string, DimensionDefinition>> {
  const entries: Record<string, DimensionDefinition> = {};
  for (const key of DEFAULT_DIMENSIONS) {
    entries[key] = {
      default: key === "portal_section"
        ? (config?.portalSection ?? "News")
        : "",
    };
  }
  for (const [key, value] of Object.entries(config?.customDimensions ?? {})) {
    entries[key] = typeof value === "string" ? { default: value } : value;
  }
  return entries;
}

export function validateConfig(config: AnalyticsConfig): void {
  const issues: string[] = [];
  if (!config || typeof config !== "object") {
    issues.push("config must be an object");
  }
  if (!config?.transport || (config.transport.type !== "gtag" && config.transport.type !== "gtm")) {
    issues.push("transport must be configured as gtag or gtm");
  }
  if (config?.transport?.type === "gtag") {
    if (typeof config.measurementId !== "string" || !config.measurementId.trim()) {
      issues.push("measurementId must be a non-empty string for gtag transport");
    }
    if (typeof config.transport.gtag !== "function") {
      issues.push("transport.gtag must be a function");
    }
  } else if (
    config?.transport?.type === "gtm"
    && (
      !config.transport.dataLayer
      || typeof config.transport.dataLayer.push !== "function"
    )
  ) {
    issues.push("transport.dataLayer.push must be a function");
  }
  const dimensions = dimensionEntries(config);
  for (const [key, definition] of Object.entries(dimensions)) {
    issues.push(...validateName(key, `dimension ${key}`));
    if (definition.default !== undefined && typeof definition.default !== "string") {
      issues.push(`dimension ${key}.default must be a string`);
    } else if (definition.default !== undefined) {
      issues.push(...validateScalar(key, definition.default));
    }
  }
  const capacity = config?.queue?.capacity ?? 100;
  const maxAgeMs = config?.queue?.maxAgeMs ?? 300_000;
  if (
    config?.consent !== undefined
    && !["unknown", "granted", "denied"].includes(config.consent)
  ) {
    issues.push("consent must be unknown, granted, or denied");
  }
  if (
    config?.video?.eventValue !== undefined
    && (
      !Number.isFinite(config.video.eventValue)
      || typeof config.video.eventValue !== "number"
    )
  ) {
    issues.push("video.eventValue must be a finite number");
  }
  if (!Number.isInteger(capacity) || capacity < 1) {
    issues.push("queue.capacity must be a positive integer");
  }
  if (!Number.isInteger(maxAgeMs) || maxAgeMs < 1) {
    issues.push("queue.maxAgeMs must be a positive integer");
  }
  if (issues.length) {
    throw new AnalyticsConfigurationError(issues);
  }
}

export function validateEvent(eventName: string, params: EventInput, limit = 25): void {
  const issues = validateName(eventName, "event name");
  const entries = Object.entries(params).filter(([key]) => key !== "callback" && key !== "callbackTimeoutMs");
  if (entries.length > limit) {
    issues.push(`event parameters must not exceed ${limit} entries`);
  }
  for (const [key, value] of entries) {
    issues.push(...validateName(key, `param ${key}`));
    issues.push(...validateScalar(key, value));
  }
  const callback = params.callback;
  const timeoutMs = params.callbackTimeoutMs;
  if (callback !== undefined && typeof callback !== "function") {
    issues.push("callback must be a function");
  }
  if (
    timeoutMs !== undefined
    && (
      typeof timeoutMs !== "number"
      || !Number.isInteger(timeoutMs)
      || timeoutMs < 0
    )
  ) {
    issues.push("callbackTimeoutMs must be a non-negative integer");
  }
  if (issues.length) {
    throw new AnalyticsConfigurationError(issues);
  }
}

export function normalizeValue(
  key: string,
  value: string,
  definition?: DimensionDefinition,
): string {
  if (definition?.normalizer) return definition.normalizer(value);
  if (key === "section" && value.toLowerCase() === "cbb") return "Community Bulletin Board";
  if (key === "section" && value.toLowerCase() === "scitech") return "SciTech";
  if (key === "section" || key === "subsection") {
    return value.replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
  }
  return value;
}

export function stripCallback(params: EventInput): {
  eventParams: Record<string, AnalyticsScalar>;
  callback?: () => void;
  callbackTimeoutMs?: number;
} {
  const { callback, callbackTimeoutMs: timeoutMs, ...eventParams } = params;
  const scalars: Record<string, AnalyticsScalar> = {};
  for (const [key, value] of Object.entries(eventParams)) {
    if (isScalar(value)) scalars[key] = value;
  }
  return {
    eventParams: scalars,
    callback: typeof callback === "function" ? callback : undefined,
    callbackTimeoutMs: typeof timeoutMs === "number" ? timeoutMs : undefined,
  };
}
