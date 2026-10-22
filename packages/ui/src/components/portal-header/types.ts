import type { CSSProperties, MouseEventHandler, ReactNode } from "react";

export type PortalHeaderNavigationItem = {
  id: string;
  label: string;
  href: string;
  current?: boolean;
  disabled?: boolean;
  external?: boolean;
  target?: "_self" | "_blank";
  rel?: string;
};

export type PortalHeaderNavigationPatch = {
  id: string;
  label?: string;
  href?: string;
  current?: boolean;
  disabled?: boolean;
  external?: boolean;
  target?: "_self" | "_blank";
  rel?: string;
  hidden?: boolean;
};

export type PortalHeaderNavigationPreset = "gma" | "none";

export type PortalHeaderBrand = {
  href?: string;
  label?: string;
  logoSrc?: string;
  logoAlt?: string;
  sectionLabel?: string;
};

export type PortalHeaderSocialIcon =
  | "facebook"
  | "twitter"
  | "x"
  | "instagram"
  | "youtube"
  | "viber"
  | "rss"
  | "link";

export type PortalHeaderSocialPreset = "entertainment" | "news" | "none";

export type PortalHeaderSocialLink = {
  id: string;
  href?: string;
  label?: string;
  icon?: PortalHeaderSocialIcon | (string & {});
  target?: "_self" | "_blank";
  rel?: string;
  hidden?: boolean;
};

export type PortalHeaderSearch = {
  action: string;
  queryParam: string;
  label?: string;
  placeholder?: string;
  submitLabel?: string;
};

export type PortalHeaderLinkRenderProps = {
  href: string;
  children: ReactNode;
  className?: string;
  target?: "_self" | "_blank";
  rel?: string;
  "aria-current"?: "page";
  "aria-label"?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export type PortalHeaderRenderLink = (props: PortalHeaderLinkRenderProps) => ReactNode;

export type PortalHeaderTheme = {
  mode?: "light" | "dark";
  accentColor?: string;
  className?: string;
  style?: CSSProperties;
};

export type PortalHeaderProps = {
  brand?: PortalHeaderBrand;
  navigationPreset?: PortalHeaderNavigationPreset;
  primaryNavigation?: readonly PortalHeaderNavigationPatch[];
  networkNavigation?: readonly PortalHeaderNavigationPatch[];
  socialPreset?: PortalHeaderSocialPreset;
  socialLinks?: readonly PortalHeaderSocialLink[];
  search?: PortalHeaderSearch;
  renderLink?: PortalHeaderRenderLink;
  theme?: PortalHeaderTheme;
  menuLabel?: string;
  closeMenuLabel?: string;
  searchToggleLabel?: string;
  closeSearchLabel?: string;
};
