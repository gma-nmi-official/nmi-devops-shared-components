"use client";

/* eslint-disable @next/next/no-img-element -- Public library code cannot depend on Next.js Image. */

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from "react";
import { PortalHeaderIcon, PortalHeaderMenuGridGlyph, PortalHeaderSocialIcon, portalHeaderControlIcons } from "./icons";
import { defaultGmaLogoSrc } from "./logo";
import { resolvePortalHeaderNavigation } from "./navigation-links";
import { resolvePortalHeaderSocialLinks } from "./social-links";
import type {
  PortalHeaderLinkRenderProps,
  PortalHeaderNavigationItem,
  PortalHeaderProps,
  PortalHeaderRenderLink,
} from "./types";

function safeRel(target: "_self" | "_blank" | undefined, rel: string | undefined, external = false) {
  const tokens = rel?.split(/\s+/).filter(Boolean) ?? [];
  if (external) tokens.push("external");
  if (target === "_blank") tokens.push("noopener", "noreferrer");
  const result = Array.from(new Set(tokens)).join(" ");
  return result || undefined;
}

function isSafeNavigationHref(href: string) {
  const value = href.trim();
  if (!value) return false;
  if (value.includes("\\")) return false;
  if (value.startsWith("/")) return !value.startsWith("//");
  if (value.startsWith("#") || value.startsWith("?")) return true;
  try {
    return value.toLowerCase().startsWith("https://") && new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

function getVisibleFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (element) => typeof element.checkVisibility !== "function" || element.checkVisibility(),
  );
}

function DefaultLink(props: PortalHeaderLinkRenderProps) {
  const { children, ...anchorProps } = props;
  return <a {...anchorProps}>{children}</a>;
}

function renderSafeLink(
  props: PortalHeaderLinkRenderProps,
  renderLink: PortalHeaderRenderLink | undefined,
): ReactNode {
  if (renderLink) {
    try {
      const rendered = renderLink(props);
      if (rendered != null) return rendered;
    } catch {
      // Consumer adapters must not make core navigation unavailable.
    }
  }
  return <DefaultLink {...props} />;
}

function NavigationList({
  items,
  label,
  renderLink,
  onNavigate,
}: {
  items: readonly PortalHeaderNavigationItem[];
  label: string;
  renderLink?: PortalHeaderRenderLink;
  onNavigate?: () => void;
}) {
  if (items.length === 0) return null;

  return (
    <nav aria-label={label} className="gno-portal-header__nav">
      <ul className="gno-portal-header__nav-list">
        {items.map((item) => (
          <li key={item.id}>
            {item.disabled || !isSafeNavigationHref(item.href) ? (
              <span aria-disabled="true" className="gno-portal-header__nav-link is-disabled">
                {item.label}
              </span>
            ) : (
              renderSafeLink({
                  href: item.href,
                  children: item.label,
                  className: "gno-portal-header__nav-link",
                  target: item.target,
                  rel: safeRel(item.target, item.rel, item.external),
                  "aria-current": item.current ? "page" : undefined,
                  onClick: onNavigate,
                }, renderLink)
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SocialLinks({
  links,
  renderLink,
  className = "",
}: {
  links: ReturnType<typeof resolvePortalHeaderSocialLinks>;
  renderLink?: PortalHeaderRenderLink;
  className?: string;
}) {
  if (links.length === 0) return null;
  return (
    <nav aria-label="Social media" className={["gno-portal-header__socials", className].filter(Boolean).join(" ")}>
      <ul>
        {links.map((item) => (
          <li key={item.id}>
            {renderSafeLink({
              href: item.href,
              children: <PortalHeaderSocialIcon icon={item.icon} />,
              className: "gno-portal-header__social-link",
              target: item.target,
              rel: safeRel(item.target, item.rel),
              "aria-label": item.label,
            }, renderLink)}
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SearchForm({
  id,
  inputRef,
  mobile = false,
  search,
  onSubmit,
}: {
  id: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  mobile?: boolean;
  search: NonNullable<PortalHeaderProps["search"]>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form
      action={search.action}
      className={["gno-portal-header__search", mobile ? "is-mobile" : ""].filter(Boolean).join(" ")}
      method="get"
      onSubmit={onSubmit}
      role="search"
    >
      <label className="gno-portal-header__search-label" htmlFor={id}>
        {search.label ?? "Search"}
      </label>
      <div className="gno-portal-header__search-field">
        <input
          id={id}
          name={search.queryParam}
          onInput={(event) => event.currentTarget.setCustomValidity("")}
          placeholder={search.placeholder ?? "Search"}
          ref={inputRef}
          type="search"
        />
        <button aria-label={search.submitLabel ?? "Search"} type="submit">
          <PortalHeaderIcon icon={portalHeaderControlIcons.search} />
        </button>
      </div>
    </form>
  );
}

export function PortalHeader({
  brand,
  navigationPreset = "gma",
  primaryNavigation = [],
  networkNavigation = [],
  socialPreset = "entertainment",
  socialLinks = [],
  search,
  renderLink,
  theme,
  menuLabel = "Open menu",
  closeMenuLabel = "Close menu",
  searchToggleLabel = "Open search",
  closeSearchLabel = "Close search",
}: PortalHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [failedLogoSrc, setFailedLogoSrc] = useState<string>();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const wasMenuOpen = useRef(false);
  const menuId = useId();
  const searchId = useId();
  const resolvedSocialLinks = resolvePortalHeaderSocialLinks(socialPreset, socialLinks);
  const resolvedNavigation = resolvePortalHeaderNavigation(
    navigationPreset,
    primaryNavigation,
    networkNavigation,
  );
  const searchEnabled = Boolean(search?.queryParam.trim() && search.action.trim() && isSafeNavigationHref(search.action));
  const brandLabel = brand?.label ?? "GMA Network";
  const logoSrc = brand?.logoSrc ?? defaultGmaLogoSrc;

  useEffect(() => {
    if (!menuOpen) {
      if (wasMenuOpen.current) menuButtonRef.current?.focus();
      wasMenuOpen.current = false;
      return;
    }

    wasMenuOpen.current = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (menuPanelRef.current) getVisibleFocusableElements(menuPanelRef.current)[0]?.focus();

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab" || !menuPanelRef.current) return;
      const focusable = getVisibleFocusableElements(menuPanelRef.current);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("click", closeOutside);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("click", closeOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  const toggleMenu = () => {
    setSearchOpen(false);
    setMenuOpen((open) => !open);
  };

  const toggleSearch = () => {
    setMenuOpen(false);
    setSearchOpen((open) => !open);
  };

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    const input = search ? event.currentTarget.elements.namedItem(search.queryParam) : null;
    if (!(input instanceof HTMLInputElement)) return;
    const query = input.value.trim();
    if (!query) {
      event.preventDefault();
      input.setCustomValidity("Enter a search term.");
      input.reportValidity();
      return;
    }
    input.setCustomValidity("");
    input.value = query;
  };

  const brandContent = (
    <span className="gno-portal-header__brand-content">
      {failedLogoSrc !== logoSrc && logoSrc ? (
        <img
          alt={brand?.logoAlt ?? brandLabel}
          className="gno-portal-header__logo"
          height="40"
          onError={() => setFailedLogoSrc(logoSrc)}
          src={logoSrc}
          width="66"
        />
      ) : <span className="gno-portal-header__brand-fallback">{brandLabel}</span>}
      {brand?.sectionLabel ? <span className="gno-portal-header__section-label">{brand.sectionLabel}</span> : null}
    </span>
  );

  const headerStyle = {
    ...theme?.style,
    ...(theme?.accentColor ? { "--gno-portal-header-accent": theme.accentColor } : {}),
  } as CSSProperties;

  return (
    <header
      className={["gno-portal-header", theme?.className].filter(Boolean).join(" ")}
      data-gno-theme={theme?.mode}
      ref={headerRef}
      style={headerStyle}
    >
      <div className="gno-portal-header__bar">
        <div className="gno-portal-header__inner">
          <div className="gno-portal-header__brand">
            {renderSafeLink({ href: brand?.href && isSafeNavigationHref(brand.href) ? brand.href : "/", children: brandContent, className: "gno-portal-header__brand-link" }, renderLink)}
          </div>

          <div className="gno-portal-header__actions">
            <SocialLinks className="gno-portal-header__desktop-socials" links={resolvedSocialLinks} renderLink={renderLink} />
            {searchEnabled ? (
              <button
                aria-controls={searchId}
                aria-expanded={searchOpen}
                aria-label={searchOpen ? closeSearchLabel : searchToggleLabel}
                className="gno-portal-header__icon-button gno-portal-header__search-button"
                onClick={toggleSearch}
                type="button"
              >
                <PortalHeaderIcon icon={searchOpen ? portalHeaderControlIcons.close : portalHeaderControlIcons.search} />
              </button>
            ) : null}
            <button
              aria-controls={menuId}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? closeMenuLabel : menuLabel}
              className="gno-portal-header__icon-button gno-portal-header__menu-button"
              onClick={toggleMenu}
              ref={menuButtonRef}
              type="button"
            >
              <PortalHeaderMenuGridGlyph />
            </button>
          </div>
        </div>
      </div>

      {searchEnabled && search ? (
        <div className="gno-portal-header__search-panel" hidden={!searchOpen} id={searchId}>
          <SearchForm id={`${searchId}-desktop-input`} inputRef={searchInputRef} onSubmit={submitSearch} search={search} />
        </div>
      ) : null}

      <div
        aria-hidden={!menuOpen}
        aria-label="Navigation menu"
        aria-modal={menuOpen || undefined}
        className="gno-portal-header__menu-panel"
        data-open={menuOpen || undefined}
        id={menuId}
        inert={!menuOpen}
        ref={menuPanelRef}
        role="dialog"
      >
        <div className="gno-portal-header__menu-inner">
          <div className="gno-portal-header__menu-navigation">
            <div className="gno-portal-header__primary-navigation">
              <NavigationList items={resolvedNavigation.primaryNavigation} label="Primary menu" onNavigate={() => setMenuOpen(false)} renderLink={renderLink} />
            </div>
            <div className="gno-portal-header__network-navigation">
              <NavigationList items={resolvedNavigation.networkNavigation} label="GMA Network" onNavigate={() => setMenuOpen(false)} renderLink={renderLink} />
            </div>
          </div>
          <div className="gno-portal-header__mobile-misc">
            {searchEnabled && search ? (
              <SearchForm id={`${searchId}-mobile-input`} mobile onSubmit={submitSearch} search={search} />
            ) : null}
            <SocialLinks links={resolvedSocialLinks} renderLink={renderLink} />
          </div>
        </div>
      </div>
    </header>
  );
}
