import { describe, expect, it } from "vitest";
import { AdConfigurationError, resolveAdResponsiveRule, validateAdPlacementConfig } from "./resolve-rule";
import type { AdPlacementConfig } from "./types";

const config: AdPlacementConfig = {
  key: "article-leaderboard",
  format: "leaderboard",
  reservedSize: [970, 250],
  rules: [
    { minWidth: 0, maxWidth: 767, enabled: false },
    { minWidth: 768, maxWidth: 1199, adUnitPath: "/123/article/tablet", sizes: [[728, 90]] },
    { minWidth: 1200, adUnitPath: "/123/article/desktop", sizes: [[970, 250], [970, 90]] },
  ],
};

describe("ad placement configuration", () => {
  it("resolves consumer-owned rules at inclusive boundaries", () => {
    expect(resolveAdResponsiveRule(config, 767).enabled).toBe(false);
    expect(resolveAdResponsiveRule(config, 768)).toMatchObject({ adUnitPath: "/123/article/tablet" });
    expect(resolveAdResponsiveRule(config, 1200)).toMatchObject({ adUnitPath: "/123/article/desktop" });
  });

  it("requires every active rule to provide its full ad unit path and sizes", () => {
    const invalid = {
      ...config,
      rules: [{ minWidth: 0, adUnitPath: "", sizes: [] }],
    } as unknown as AdPlacementConfig;
    expect(validateAdPlacementConfig(invalid)).toEqual(expect.arrayContaining([
      "rules[0].adUnitPath must be a non-empty string",
      "rules[0].sizes must be a non-empty array supplied by the consumer",
    ]));
  });

  it("rejects gaps, overlaps, invalid sizes, and disabled rules carrying provider data", () => {
    const invalid = {
      key: "bad",
      format: "custom",
      emptyBehavior: "collapse",
      rules: [
        { minWidth: 1, maxWidth: 500, enabled: false, sizes: [[300, 250]] },
        { minWidth: 500, adUnitPath: "/unit", sizes: [[0, 250]] },
      ],
    } as unknown as AdPlacementConfig;
    const issues = validateAdPlacementConfig(invalid).join(" | ");
    expect(issues).toContain("minWidth must be 0");
    expect(issues).toContain("disabled rules must omit adUnitPath and sizes");
    expect(issues).toContain("minWidth must be 501");
    expect(issues).toContain("positive integer width/height pairs");
  });

  it("requires a reserved size unless collapse is explicitly selected", () => {
    const invalid = { key: "missing", format: "mrec", rules: [{ minWidth: 0, adUnitPath: "/unit", sizes: [[300, 250]] }] } as unknown as AdPlacementConfig;
    expect(() => resolveAdResponsiveRule(invalid, 320)).toThrow(AdConfigurationError);
  });

  it("validates and resolves without mutating consumer configuration", () => {
    const before = structuredClone(config);
    expect(resolveAdResponsiveRule(config, 1200)).toMatchObject({ adUnitPath: "/123/article/desktop" });
    expect(validateAdPlacementConfig(config)).toEqual([]);
    expect(config).toEqual(before);
  });
});
