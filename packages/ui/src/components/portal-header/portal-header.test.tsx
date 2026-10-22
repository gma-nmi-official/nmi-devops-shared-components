import axe from "axe-core";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { resolvePortalHeaderNavigation } from "./navigation-links";
import { PortalHeader } from "./portal-header";
import { resolvePortalHeaderSocialLinks } from "./social-links";

const primaryNavigation = [
  { id: "home", label: "Home", href: "/", current: true },
  { id: "shows", label: "Shows", href: "/shows" },
  { id: "future", label: "Coming soon", href: "/future", disabled: true },
  { id: "partner", label: "Partner", href: "https://example.com", external: true, target: "_blank" as const },
];

afterEach(() => {
  cleanup();
  document.body.style.overflow = "";
});

describe("PortalHeader", () => {
  it("resolves all production navigation links in reference order with deterministic patches", () => {
    const resolved = resolvePortalHeaderNavigation(
      "gma",
      [{ id: "news", current: true }],
      [
        { id: "pictures", hidden: true },
        { id: "radio", href: "https://example.com/radio" },
        { id: "community", label: "Community", href: "https://example.com/community" },
      ],
    );

    expect(resolved.primaryNavigation.map(({ id }) => id)).toEqual([
      "home", "news", "entertainment", "lifestyle",
    ]);
    expect(resolved.primaryNavigation[1]).toEqual(expect.objectContaining({ current: true }));
    expect(resolved.networkNavigation.map(({ id }) => id)).toEqual([
      "sparkle", "radio", "music", "gma-pinoy-tv", "kapuso-foundation", "regional-tv",
      "corporate", "gma-play", "gtv", "gma-affordabox", "gma-now", "community",
    ]);
    expect(resolved.networkNavigation[1]).toEqual(expect.objectContaining({ href: "https://example.com/radio" }));
  });

  it("renders all sixteen default navigation links", () => {
    const { container } = render(<PortalHeader socialPreset="none" />);
    const gridCells = container.querySelectorAll(".gno-portal-header__menu-grid-glyph rect");
    expect(gridCells).toHaveLength(9);
    for (const cell of gridCells) {
      expect(cell).toHaveAttribute("fill", "currentColor");
      expect(cell).not.toHaveAttribute("stroke");
    }
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(container.querySelectorAll(".gno-portal-header__menu-grid-glyph rect")).toHaveLength(9);
    const menu = within(screen.getByRole("dialog", { name: "Navigation menu" }));
    expect(menu.getAllByRole("link").map((link) => link.textContent)).toEqual([
      "Home", "News", "Entertainment", "Lifestyle",
      "Sparkle GMA Artist Center", "Radio", "Music", "Pictures",
      "GMA Pinoy TV", "Kapuso Foundation", "Regional TV", "Corporate",
      "GMA Play", "GTV", "GMA Affordabox", "GMA Now",
    ]);
  });

  it("renders branding and safe navigation states", () => {
    const { container } = render(<PortalHeader brand={{ sectionLabel: "Entertainment" }} primaryNavigation={primaryNavigation} socialPreset="none" />);

    expect(screen.getByRole("img", { name: "GMA Network" })).toHaveAttribute("src", expect.stringMatching(/^data:image\/svg\+xml;base64,/));
    expect(container.querySelector(".gno-portal-header__section-label")).toHaveTextContent("Entertainment");
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getAllByRole("link", { name: "Home" })[0]).toHaveAttribute("aria-current", "page");
    expect(screen.getAllByText("Coming soon")[0]).toHaveAttribute("aria-disabled", "true");
    expect(screen.getAllByRole("link", { name: "Partner" })[0]).toHaveAttribute("rel", "external noopener noreferrer");
  });

  it("falls back to visible brand text when a logo fails", () => {
    render(<PortalHeader brand={{ logoSrc: "https://example.com/missing.svg" }} socialPreset="none" />);
    fireEvent.error(screen.getByRole("img", { name: "GMA Network" }));
    expect(screen.getByText("GMA Network")).toBeVisible();
  });

  it("resolves social overrides, hides defaults, appends new IDs, and omits unsafe URLs", () => {
    expect(resolvePortalHeaderSocialLinks("entertainment", [
      { id: "facebook", href: "https://example.com/facebook" },
      { id: "twitter", hidden: true },
      { id: "unsafe", href: "javascript:alert(1)", label: "Unsafe" },
      { id: "blank", href: "https://example.com/blank", label: "   " },
      { id: "community", href: "https://example.com/community", label: "  Community  ", icon: "custom" },
    ])).toEqual([
      expect.objectContaining({ id: "facebook", href: "https://example.com/facebook" }),
      expect.objectContaining({ id: "instagram" }),
      expect.objectContaining({ id: "youtube" }),
      expect.objectContaining({ id: "rss" }),
      expect.objectContaining({ id: "community", icon: "custom", label: "Community" }),
    ]);
  });

  it("omits whitespace-only social labels from rendered links", () => {
    const { container } = render(
      <PortalHeader
        socialLinks={[
          { id: "blank", href: "https://example.com/blank", label: "   " },
          { id: "community", href: "https://example.com/community", label: "  Community  " },
        ]}
        socialPreset="none"
      />,
    );
    expect(container.querySelector('a[href="https://example.com/blank"]')).not.toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Community" })).not.toHaveLength(0);
  });

  it("opens the full-width menu, traps focus, closes with Escape, and restores focus", async () => {
    const user = userEvent.setup();
    render(<PortalHeader primaryNavigation={primaryNavigation} socialPreset="none" />);
    const menuButton = screen.getByRole("button", { name: "Open menu" });

    await user.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(document.body.style.overflow).toBe("hidden");
    expect(within(screen.getByRole("dialog", { name: "Navigation menu" })).getByRole("link", { name: "Home" })).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(menuButton).toHaveFocus();
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(document.body.style.overflow).toBe("");

    await user.click(menuButton);
    await user.click(document.body);
    expect(menuButton).toHaveFocus();
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(document.body.style.overflow).toBe("");
  });

  it("applies the configurable section accent", () => {
    const { container } = render(
      <PortalHeader socialPreset="none" theme={{ accentColor: "#6c2862" }} />,
    );
    expect(container.querySelector(".gno-portal-header")).toHaveStyle({
      "--gno-portal-header-accent": "#6c2862",
    });
  });

  it("keeps search and the menu mutually exclusive and trims valid GET queries", async () => {
    const user = userEvent.setup();
    render(<PortalHeader primaryNavigation={primaryNavigation} search={{ action: "/search", queryParam: "q" }} socialPreset="none" />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(screen.getByRole("button", { name: "Open search" }));
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-expanded", "false");

    const input = screen.getByRole("searchbox", { name: "Search" });
    const form = screen.getByRole("search");
    await user.type(input, "   ");
    expect(fireEvent.submit(form)).toBe(false);
    expect(input).toBeInvalid();

    await user.clear(input);
    await user.type(input, "  sample query  ");
    expect(fireEvent.submit(form)).toBe(true);
    expect(input).toHaveValue("sample query");
    expect(input).toHaveAttribute("name", "q");
    expect(form).toHaveAttribute("action", "/search");
    expect(form).toHaveAttribute("method", "get");
  });

  it("falls back to anchors when a router adapter throws", () => {
    render(<PortalHeader primaryNavigation={primaryNavigation} renderLink={() => { throw new Error("adapter failed"); }} socialPreset="none" />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getAllByRole("link", { name: "Home" })[0]).toHaveAttribute("href", "/");
  });

  it("accepts approved relative and HTTPS navigation while rejecting ambiguous or unsafe values", () => {
    render(
      <PortalHeader
        primaryNavigation={[
          { id: "root", label: "Root relative", href: "/safe" },
          { id: "fragment", label: "Fragment", href: "#safe" },
          { id: "query", label: "Query", href: "?safe=true" },
          { id: "https", label: "Explicit HTTPS", href: "https://example.com/safe" },
          { id: "protocol-relative", label: "Protocol relative", href: "//attacker.example/path" },
          { id: "ambiguous", label: "Ambiguous slash", href: "/\\attacker.example/path" },
          { id: "http", label: "HTTP", href: "http://example.com" },
          { id: "javascript", label: "JavaScript", href: "javascript:alert(1)" },
        ]}
        socialPreset="none"
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    for (const label of ["Root relative", "Fragment", "Query", "Explicit HTTPS"]) {
      expect(screen.getAllByRole("link", { name: label })).not.toHaveLength(0);
    }
    for (const label of ["Protocol relative", "Ambiguous slash", "HTTP", "JavaScript"]) {
      expect(screen.queryByRole("link", { name: label })).not.toBeInTheDocument();
      expect(screen.getAllByText(label)[0]).toHaveAttribute("aria-disabled", "true");
    }
  });

  it("rejects ambiguous and unsafe search actions while preserving explicit HTTPS actions", () => {
    const { rerender } = render(
      <PortalHeader search={{ action: "//attacker.example/search", queryParam: "q" }} socialPreset="none" />,
    );
    for (const action of ["//attacker.example/search", "/\\attacker.example/search", "http://example.com/search", "javascript:alert(1)"]) {
      rerender(<PortalHeader search={{ action, queryParam: "q" }} socialPreset="none" />);
      expect(screen.queryByRole("button", { name: "Open search" })).not.toBeInTheDocument();
    }

    rerender(<PortalHeader search={{ action: "https://example.com/search", queryParam: "q" }} socialPreset="none" />);
    expect(screen.getByRole("button", { name: "Open search" })).toBeInTheDocument();
  });

  it("has no serious or critical automated accessibility violations", async () => {
    const { container } = render(
      <PortalHeader
        brand={{ sectionLabel: "Entertainment" }}
        networkNavigation={[{ id: "news", label: "News", href: "/news" }]}
        primaryNavigation={primaryNavigation}
        search={{ action: "/search", queryParam: "q" }}
      />,
    );
    const results = await axe.run(container, {
      resultTypes: ["violations"],
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""))).toEqual([]);
  });
});
