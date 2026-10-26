import type {
  ActiveAdResponsiveRule,
  AdPlacementConfig,
  AdResponsiveRule,
  AdSize,
  AdTargetingValue,
} from "./types";

const FORMATS = new Set(["mrec", "leaderboard", "custom"]);

export class AdConfigurationError extends Error {
  readonly issues: readonly string[];

  constructor(issues: readonly string[]) {
    super(`Invalid ad placement configuration: ${issues.join("; ")}`);
    this.name = "AdConfigurationError";
    this.issues = issues;
  }
}

function isPositiveInteger(value: unknown): value is number {
  return Number.isInteger(value) && Number(value) > 0;
}

function isValidSize(value: unknown): value is AdSize {
  return Array.isArray(value) && value.length === 2 && isPositiveInteger(value[0]) && isPositiveInteger(value[1]);
}

function validateTargetingValue(key: string, value: unknown, issues: string[]) {
  if (typeof value === "string") {
    if (!value.trim()) issues.push(`targeting.${key} must not be empty`);
    return;
  }
  if (!Array.isArray(value) || value.length === 0 || value.some((entry) => typeof entry !== "string" || !entry.trim())) {
    issues.push(`targeting.${key} must be a non-empty string or non-empty string array`);
  }
}

export function validateAdPlacementConfig(config: AdPlacementConfig): readonly string[] {
  const issues: string[] = [];
  const candidate = config as unknown as Record<string, unknown>;

  if (typeof candidate.key !== "string" || !candidate.key.trim()) issues.push("key must be a non-empty string");
  if (typeof candidate.format !== "string" || !FORMATS.has(candidate.format)) issues.push("format must be mrec, leaderboard, or custom");
  if (!Array.isArray(candidate.rules) || candidate.rules.length === 0) {
    issues.push("rules must be a non-empty array");
  } else {
    const rules = candidate.rules;
    let expectedMin = 0;
    rules.forEach((rawRule, index) => {
      const rule = rawRule as Record<string, unknown>;
      const prefix = `rules[${index}]`;
      if (!Number.isInteger(rule.minWidth) || Number(rule.minWidth) < 0) issues.push(`${prefix}.minWidth must be a non-negative integer`);
      if (rule.minWidth !== expectedMin) issues.push(`${prefix}.minWidth must be ${expectedMin} to avoid gaps or overlaps`);

      if (rule.maxWidth !== undefined && (!Number.isInteger(rule.maxWidth) || Number(rule.maxWidth) < Number(rule.minWidth))) {
        issues.push(`${prefix}.maxWidth must be an integer greater than or equal to minWidth`);
      }

      if (rule.enabled === false) {
        if ("adUnitPath" in rule || "sizes" in rule) issues.push(`${prefix} disabled rules must omit adUnitPath and sizes`);
      } else {
        if (typeof rule.adUnitPath !== "string" || !rule.adUnitPath.trim()) issues.push(`${prefix}.adUnitPath must be a non-empty string`);
        if (!Array.isArray(rule.sizes) || rule.sizes.length === 0) {
          issues.push(`${prefix}.sizes must be a non-empty array supplied by the consumer`);
        } else if (rule.sizes.some((size) => !isValidSize(size))) {
          issues.push(`${prefix}.sizes must contain positive integer width/height pairs`);
        }
      }

      if (rule.maxWidth === undefined) {
        if (index !== rules.length - 1) issues.push(`${prefix} without maxWidth must be the final rule`);
        expectedMin = Number.POSITIVE_INFINITY;
      } else {
        expectedMin = Number(rule.maxWidth) + 1;
      }
    });
    const lastRule = rules[rules.length - 1] as Record<string, unknown>;
    if (lastRule.maxWidth !== undefined) issues.push("the final rule must omit maxWidth so every viewport width is covered");
  }

  if (candidate.targeting !== undefined) {
    if (!candidate.targeting || typeof candidate.targeting !== "object" || Array.isArray(candidate.targeting)) {
      issues.push("targeting must be an object");
    } else {
      for (const [key, value] of Object.entries(candidate.targeting)) {
        if (!key.trim()) issues.push("targeting keys must not be empty");
        validateTargetingValue(key, value, issues);
      }
    }
  }

  if (candidate.emptyBehavior !== undefined && candidate.emptyBehavior !== "reserve" && candidate.emptyBehavior !== "collapse") {
    issues.push("emptyBehavior must be reserve or collapse");
  }
  if (candidate.emptyBehavior !== "collapse" && !isValidSize(candidate.reservedSize)) {
    issues.push("reservedSize is required and must be a positive integer pair when emptyBehavior is reserve or omitted");
  }
  if (candidate.reservedSize !== undefined && !isValidSize(candidate.reservedSize)) {
    issues.push("reservedSize must be a positive integer width/height pair");
  }

  return issues;
}

export function assertValidAdPlacementConfig(config: AdPlacementConfig): void {
  const issues = validateAdPlacementConfig(config);
  if (issues.length > 0) throw new AdConfigurationError(issues);
}

export function resolveAdResponsiveRule(config: AdPlacementConfig, viewportWidth: number): AdResponsiveRule {
  assertValidAdPlacementConfig(config);
  if (!Number.isFinite(viewportWidth) || viewportWidth < 0) throw new AdConfigurationError(["viewportWidth must be a non-negative finite number"]);
  const rule = config.rules.find((candidate) => viewportWidth >= candidate.minWidth && (candidate.maxWidth === undefined || viewportWidth <= candidate.maxWidth));
  if (!rule) throw new AdConfigurationError([`no responsive rule covers viewport width ${viewportWidth}`]);
  return rule;
}

function targetingEntries(targeting: Readonly<Record<string, AdTargetingValue>> | undefined) {
  return Object.entries(targeting ?? {}).sort(([left], [right]) => left.localeCompare(right));
}

export function getAdResponsiveRuleSignature(rule: AdResponsiveRule): string {
  if (rule.enabled === false) return `disabled:${rule.minWidth}:${rule.maxWidth ?? "max"}`;
  return JSON.stringify([rule.minWidth, rule.maxWidth ?? null, rule.adUnitPath, rule.sizes]);
}

export function getAdPlacementConfigSignature(config: AdPlacementConfig): string {
  assertValidAdPlacementConfig(config);
  return JSON.stringify([
    config.key,
    config.format,
    config.rules.map(getAdResponsiveRuleSignature),
    targetingEntries(config.targeting),
    config.emptyBehavior ?? "reserve",
    config.reservedSize ?? null,
  ]);
}

export function isActiveAdResponsiveRule(rule: AdResponsiveRule): rule is ActiveAdResponsiveRule {
  return rule.enabled !== false;
}
