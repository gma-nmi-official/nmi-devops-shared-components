import type {
  PortalHeaderSocialIcon,
  PortalHeaderSocialLink,
  PortalHeaderSocialPreset,
} from "./types";

export type ResolvedSocialLink = {
  id: string;
  href: string;
  label: string;
  icon: PortalHeaderSocialIcon | (string & {});
  target: "_self" | "_blank";
  rel?: string;
};

const entertainment = [
  { id: "facebook", href: "https://facebook.com/gmanetwork", label: "GMA Network on Facebook", icon: "facebook" },
  { id: "twitter", href: "https://twitter.com/gmanetwork", label: "GMA Network on X", icon: "x" },
  { id: "instagram", href: "https://instagram.com/gmanetwork", label: "GMA Network on Instagram", icon: "instagram" },
  { id: "youtube", href: "https://youtube.com/gmanetwork", label: "GMA Network on YouTube", icon: "youtube" },
  { id: "rss", href: "https://www.gmanetwork.com/rss", label: "GMA Network RSS feed", icon: "rss" },
] as const satisfies readonly Omit<ResolvedSocialLink, "target">[];

const news = [
  { id: "facebook", href: "https://www.facebook.com/gmanews", label: "GMA News on Facebook", icon: "facebook" },
  { id: "twitter", href: "https://twitter.com/gmanews", label: "GMA News on X", icon: "x" },
  { id: "instagram", href: "https://www.instagram.com/gmanews", label: "GMA News on Instagram", icon: "instagram" },
  { id: "youtube", href: "https://www.youtube.com/gmanews", label: "GMA News on YouTube", icon: "youtube" },
  { id: "viber", href: "https://chats.viber.com/gmanews", label: "GMA News on Viber", icon: "viber" },
  { id: "rss", href: "https://www.gmanetwork.com/news/rss", label: "GMA News RSS feed", icon: "rss" },
] as const satisfies readonly Omit<ResolvedSocialLink, "target">[];

export const portalHeaderSocialPresets = {
  entertainment: Object.freeze(entertainment.map((item) => Object.freeze({ ...item }))),
  news: Object.freeze(news.map((item) => Object.freeze({ ...item }))),
  none: Object.freeze([]),
} as const;
Object.freeze(portalHeaderSocialPresets);

function isSafeSocialHref(href: string | undefined): href is string {
  if (!href) return false;
  try {
    return new URL(href).protocol === "https:";
  } catch {
    return false;
  }
}

export function resolvePortalHeaderSocialLinks(
  preset: PortalHeaderSocialPreset = "entertainment",
  patches: readonly PortalHeaderSocialLink[] = [],
): ResolvedSocialLink[] {
  const defaults: ResolvedSocialLink[] = portalHeaderSocialPresets[preset].map((item) => ({
    ...item,
    target: "_blank",
  }));
  const patchById = new Map(patches.map((patch) => [patch.id, patch]));
  const resolved: ResolvedSocialLink[] = [];

  for (const item of defaults) {
    const patch = patchById.get(item.id);
    if (!patch) {
      if (isSafeSocialHref(item.href)) resolved.push(item);
      continue;
    }
    patchById.delete(item.id);
    if (patch.hidden) continue;
    const merged = { ...item, ...patch };
    const label = merged.label?.trim();
    if (!isSafeSocialHref(merged.href) || !label) continue;
    resolved.push({
      id: merged.id,
      href: merged.href,
      label,
      icon: merged.icon ?? "link",
      target: merged.target ?? "_blank",
      rel: merged.rel,
    });
  }

  for (const patch of patches) {
    if (!patchById.has(patch.id)) continue;
    patchById.delete(patch.id);
    const label = patch.label?.trim();
    if (patch.hidden || !label || !isSafeSocialHref(patch.href)) continue;
    resolved.push({
      id: patch.id,
      href: patch.href,
      label,
      icon: patch.icon ?? "link",
      target: patch.target ?? "_blank",
      rel: patch.rel,
    });
  }

  return resolved;
}
