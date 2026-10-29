import type { CurrentParams, DimensionDefinition } from "./types";
import { AnalyticsConfigurationError, normalizeValue, validateScalar } from "./validation";

function assertContextValue(value: unknown, key: string): asserts value is string {
  if (typeof value !== "string") {
    throw new AnalyticsConfigurationError([`context ${key}:string`]);
  }
  const issues = validateScalar(key, value);
  if (issues.length) throw new AnalyticsConfigurationError(issues);
}

export function createDefaults(
  definitions: Readonly<Record<string, DimensionDefinition>>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(definitions).map(([key, definition]) => [
      key,
      normalizeValue(key, definition.default ?? "", definition),
    ]),
  );
}

export function cloneContext(value: Readonly<Record<string, string>>): CurrentParams {
  return { ...value };
}

export function replaceContext(
  definitions: Readonly<Record<string, DimensionDefinition>>,
  value: Readonly<Record<string, string>>,
): Record<string, string> {
  const next = createDefaults(definitions);
  for (const key of Object.keys(definitions)) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      assertContextValue(value[key], key);
      next[key] = normalizeValue(key, value[key], definitions[key]);
    }
  }
  return next;
}

export function updateContext(
  definitions: Readonly<Record<string, DimensionDefinition>>,
  current: Readonly<Record<string, string>>,
  value: Readonly<Record<string, string>>,
): Record<string, string> {
  const next = { ...current };
  for (const key of Object.keys(value)) {
    if (Object.prototype.hasOwnProperty.call(definitions, key)) {
      assertContextValue(value[key], key);
      next[key] = normalizeValue(key, value[key], definitions[key]);
    }
  }
  return next;
}
