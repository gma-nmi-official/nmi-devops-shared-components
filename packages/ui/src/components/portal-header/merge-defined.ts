export function mergeDefined<T extends object>(base: T, patch: Partial<T>): T {
  const definedPatch = Object.fromEntries(
    Object.entries(patch).filter(([, value]) => value !== undefined),
  ) as Partial<T>;
  return { ...base, ...definedPatch };
}
