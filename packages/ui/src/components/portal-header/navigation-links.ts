import type {
  PortalHeaderNavigationItem,
  PortalHeaderNavigationPatch,
  PortalHeaderNavigationPreset,
} from "./types";

const primaryNavigation = [
  { id: "home", label: "Home", href: "https://www.gmanetwork.com/" },
  { id: "news", label: "News", href: "https://www.gmanetwork.com/news/" },
  { id: "entertainment", label: "Entertainment", href: "https://www.gmanetwork.com/entertainment/" },
  { id: "lifestyle", label: "Lifestyle", href: "https://www.gmanetwork.com/lifestyle/" },
] as const satisfies readonly PortalHeaderNavigationItem[];

const networkNavigation = [
  { id: "sparkle", label: "Sparkle GMA Artist Center", href: "https://www.gmanetwork.com/sparkle/" },
  { id: "radio", label: "Radio", href: "https://www.gmanetwork.com/radio/" },
  { id: "music", label: "Music", href: "https://www.gmanetwork.com/music/" },
  { id: "pictures", label: "Pictures", href: "https://www.gmanetwork.com/pictures/" },
  { id: "gma-pinoy-tv", label: "GMA Pinoy TV", href: "https://www.gmanetwork.com/international/" },
  { id: "kapuso-foundation", label: "Kapuso Foundation", href: "https://www.gmanetwork.com/kapusofoundation/" },
  { id: "regional-tv", label: "Regional TV", href: "https://www.gmanetwork.com/regionaltv/" },
  { id: "corporate", label: "Corporate", href: "https://www.gmanetwork.com/corporate/" },
  { id: "gma-play", label: "GMA Play", href: "https://www.gmanetwork.com/gmaplay/" },
  { id: "gtv", label: "GTV", href: "https://www.gmanetwork.com/gtv/" },
  { id: "gma-affordabox", label: "GMA Affordabox", href: "https://www.gmanetwork.com/affordabox/" },
  { id: "gma-now", label: "GMA Now", href: "https://www.gmanetwork.com/digital-tv-gma-now/" },
] as const satisfies readonly PortalHeaderNavigationItem[];

function freezeItems(items: readonly PortalHeaderNavigationItem[]) {
  return Object.freeze(items.map((item) => Object.freeze({ ...item })));
}

export const portalHeaderNavigationPresets = Object.freeze({
  gma: Object.freeze({
    primaryNavigation: freezeItems(primaryNavigation),
    networkNavigation: freezeItems(networkNavigation),
  }),
  none: Object.freeze({
    primaryNavigation: Object.freeze([]) as readonly PortalHeaderNavigationItem[],
    networkNavigation: Object.freeze([]) as readonly PortalHeaderNavigationItem[],
  }),
});

function resolveNavigationGroup(
  defaults: readonly PortalHeaderNavigationItem[],
  patches: readonly PortalHeaderNavigationPatch[],
): PortalHeaderNavigationItem[] {
  const patchById = new Map(patches.map((patch) => [patch.id, patch]));
  const resolved: PortalHeaderNavigationItem[] = [];

  for (const item of defaults) {
    const patch = patchById.get(item.id);
    if (!patch) {
      resolved.push({ ...item });
      continue;
    }
    patchById.delete(item.id);
    if (patch.hidden) {
      continue;
    }
    const merged = { ...item, ...patch };
    const label = merged.label?.trim();
    const href = merged.href?.trim();
    if (!label || !href) {
      continue;
    }
    resolved.push({ ...merged, label, href });
  }

  for (const patch of patches) {
    if (!patchById.has(patch.id)) {
      continue;
    }
    patchById.delete(patch.id);
    const label = patch.label?.trim();
    const href = patch.href?.trim();
    if (patch.hidden || !label || !href) {
      continue;
    }
    resolved.push({ ...patch, label, href });
  }

  return resolved;
}

export function resolvePortalHeaderNavigation(
  preset: PortalHeaderNavigationPreset = "gma",
  primaryPatches: readonly PortalHeaderNavigationPatch[] = [],
  networkPatches: readonly PortalHeaderNavigationPatch[] = [],
) {
  const defaults = portalHeaderNavigationPresets[preset];
  return {
    primaryNavigation: resolveNavigationGroup(defaults.primaryNavigation, primaryPatches),
    networkNavigation: resolveNavigationGroup(defaults.networkNavigation, networkPatches),
  };
}
