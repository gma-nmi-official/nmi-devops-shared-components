import { describe, expect, it } from "vitest";
import { AnalyticsConfigurationError, validateConfig, validateEvent } from "./validation";

const gtagConfig = { measurementId: "G-TEST", transport: { type: "gtag" as const, gtag: () => {} } };

describe("Google Analytics validation", () => {
  it("requires a runtime measurement ID for direct gtag", () => {
    expect(() => validateConfig({ transport: gtagConfig.transport })).toThrow(AnalyticsConfigurationError);
  });

  it("accepts the consumer-owned GTM destination without a measurement ID", () => {
    expect(() => validateConfig({ transport: { type: "gtm", dataLayer: { push: () => 0 } } })).not.toThrow();
  });

  it("rejects reserved, malformed, non-finite, and oversized event data", () => {
    expect(() => validateEvent("click", { constructor: "bad" })).toThrow();
    expect(() => validateEvent("bad-name", {})).toThrow();
    expect(() => validateEvent("click", { value: Number.NaN })).toThrow();
    expect(() => validateEvent("click", { page_title: "x".repeat(301) })).toThrow();
  });

  it("accepts callbacks separately from scalar event parameters", () => {
    expect(() => validateEvent("click", { callback: () => {}, callbackTimeoutMs: 1000, event_value: 1 })).not.toThrow();
  });

  it("validates configured video defaults", () => {
    expect(() => validateConfig({ ...gtagConfig, video: { eventValue: Number.NaN } })).toThrow();
    expect(() => validateConfig({ ...gtagConfig, video: { eventValue: 1 } })).not.toThrow();
  });
});
