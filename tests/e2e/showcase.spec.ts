import { expect, test as base, type Page } from "playwright/test";

const test = base.extend<{ browserErrors: string[] }>({
  browserErrors: [
    async ({ page }, use) => {
      const browserErrors: string[] = [];

      page.on("console", (message) => {
        if (message.type() === "error") {
          browserErrors.push(`console: ${message.text()}`);
        }
      });
      page.on("pageerror", (error) => {
        browserErrors.push(`page: ${error.message}`);
      });

      await use(browserErrors);
      expect(browserErrors, "The page emitted browser errors").toEqual([]);
    },
    { auto: true },
  ],
});

async function focusWithKeyboard(page: Page, accessibleName: string) {
  const link = page.getByRole("link", { name: accessibleName });

  for (let attempt = 0; attempt < 10; attempt += 1) {
    await page.keyboard.press("Tab");
    if (await link.evaluate((element) => element === document.activeElement)) {
      break;
    }
  }

  await expect(link).toBeFocused();
  expect(
    await link.evaluate((element) => {
      const style = getComputedStyle(element);
      return style.outlineStyle !== "none" && Number.parseFloat(style.outlineWidth) > 0;
    }),
    "Keyboard focus should have a visible outline",
  ).toBe(true);

  return link;
}

test("navigates through the documentation home and component catalog with keyboard focus", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("NMI DevOps Shared Components");
  await expect(page.getByText("NMI DevOps Shared Components", { exact: true })).toBeVisible();

  await expect(
    page.getByRole("heading", { level: 1, name: "Build consistent portal experiences with shared components." }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Everything you need to use the package." })).toBeVisible();

  const catalogLink = await focusWithKeyboard(page, "Read the package guide");
  await catalogLink.press("Enter");

  await expect(page).toHaveURL(/\/catalog\/?$/);
  await expect(page).toHaveTitle("Component catalog | NMI DevOps Shared Components");
  await expect(
    page.getByRole("heading", { level: 1, name: "Build consistent portal experiences in minutes." }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "What is Portal Header?" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "What is Cookie Agreement?" })).toBeVisible();
  await expect(page.getByRole("region", { name: "Cookie notice" })).toBeVisible();
  await expect(page.getByText("Primary and network navigation", { exact: true })).toBeVisible();
  await expect(page.getByText('import { PortalHeader } from "nmi-devops-shared-components";', { exact: false })).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { level: 1, name: "Build consistent portal experiences with shared components." })).toBeVisible();

  await page.goForward();
  await expect(page).toHaveURL(/\/catalog\/?$/);
  await expect(page.getByRole("link", { name: "Documentation home" })).toBeVisible();
});

test("paired Portal Header parameters preserve separate code labels", async ({ page }) => {
  await page.goto("/catalog#parameters");

  for (const labels of [
    ["menuLabel", "closeMenuLabel"],
    ["searchToggleLabel", "closeSearchLabel"],
  ]) {
    const row = page.locator(".catalog__parameters > div").filter({
      has: page.getByText(labels[0], { exact: true }),
    });

    await expect(row.locator("code")).toHaveText(labels);
    await expect(row).toContainText(`${labels[0]} and ${labels[1]}`);
    await expect(row.locator("code").filter({ hasText: "and" })).toHaveCount(0);
  }
});

for (const path of ["/", "/catalog"] as const) {
  test(`${path} has no page-level horizontal overflow`, async ({ page }) => {
    await page.goto(path);

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  });
}

test("Portal Header exposes safe social links and a working native GET search", async ({ page }) => {
  await page.goto("/catalog");

  const menuButton = page.getByRole("button", { name: "Open menu" });
  await menuButton.click();

  const facebook = page.getByRole("link", { name: "GMA News on Facebook" }).first();
  await expect(facebook).toHaveAttribute("href", "https://www.facebook.com/gmanews");
  await expect(facebook).toHaveAttribute("rel", /noopener/);
  await expect(page.locator('a[href^="javascript:"]')).toHaveCount(0);

  const desktopSearchToggle = page.getByRole("button", { name: "Open search" });
  let search;
  if (await desktopSearchToggle.isVisible()) {
    await page.keyboard.press("Escape");
    await desktopSearchToggle.click();
    search = page.getByRole("searchbox", { name: "Search" });
  } else {
    search = page.getByRole("dialog", { name: "Navigation menu" }).getByRole("searchbox", { name: "Search" });
  }
  await search.fill("   ");
  await search.press("Enter");
  await expect(page).toHaveURL(/\/catalog\/?$/);

  await search.fill("  sample query  ");
  await search.press("Enter");
  await expect(page).toHaveURL(/\/catalog\/?\?q=sample(\+|%20)query$/);
});

test("mobile dropdown closes with Escape and restores trigger focus", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/catalog");
  const menuButton = page.getByRole("button", { name: "Open menu" });

  await menuButton.click();
  await expect(page.getByRole("dialog", { name: "Navigation menu" })).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await page.keyboard.press("Escape");
  await expect(menuButton).toBeFocused();
  await expect(page.getByRole("dialog", { name: "Navigation menu" })).toBeHidden();
});

test("Ad Slot catalog preview uses consumer configuration without a live ad-network request", async ({ page }) => {
  const adNetworkRequests: string[] = [];
  page.on("request", (request) => {
    if (/doubleclick|googlesyndication|googletagservices/i.test(request.url())) adNetworkRequests.push(request.url());
  });

  await page.goto("/catalog");
  await expect(page.getByRole("heading", { level: 2, name: "Configurable display ads without hidden inventory defaults" })).toBeVisible();
  const slot = page.getByRole("complementary", { name: "Example advertisement" });
  await expect(slot).toHaveAttribute("data-ad-format", "mrec");
  await expect(slot).toHaveAttribute("data-ad-state", "filled");
  expect(adNetworkRequests).toEqual([]);
});

test("Google Analytics catalog preview stays consent-aware and makes no provider request", async ({ page }) => {
  const analyticsRequests: string[] = [];
  page.on("request", (request) => {
    if (/google-analytics|googletagmanager|google-analytics\.com/i.test(request.url())) analyticsRequests.push(request.url());
  });

  await page.goto("/catalog#google-analytics");
  await expect(page.getByRole("heading", { level: 2, name: "Consent-aware GA4 delivery" })).toBeVisible();
  const preview = page.getByRole("region", { name: "Google Analytics preview" });
  await expect(preview).toBeVisible();
  await expect(preview.getByText("Waiting for consent")).toBeVisible();
  await preview.getByRole("button", { name: "Track click" }).click();
  await expect(preview.getByText("queued")).toBeVisible();
  await preview.getByLabel("Consent state").selectOption("granted");
  await expect(preview.getByText("GTM queued page_view")).toBeVisible();
  expect(analyticsRequests).toEqual([]);
});

for (const width of [375, 1440]) {
  test(`Portal Header traps visible menu focus and restores it after outside close at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 768 ? 812 : 900 });
    await page.goto("/catalog");
    const menuButton = page.getByRole("button", { name: "Open menu" });

    await menuButton.click();
    const panel = page.getByRole("dialog", { name: "Navigation menu" });
    const visibleFocusable = panel.locator(
      'a[href]:visible, button:not([disabled]):visible, input:not([disabled]):visible',
    );
    const first = visibleFocusable.first();
    const last = visibleFocusable.last();

    await expect(first).toBeFocused();
    await last.focus();
    await page.keyboard.press("Tab");
    await expect(first).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(last).toBeFocused();

    await page.locator(".catalog__header").click();
    await expect(panel).toBeHidden();
    await expect(menuButton).toBeFocused();
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  });
}

test("Portal Header matches the approved production visual structure", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/catalog");

  const header = page.locator(".gno-portal-header");
  const bar = header.locator(".gno-portal-header__bar");
  const logo = header.locator(".gno-portal-header__logo");
  const label = header.locator(".gno-portal-header__section-label");
  const desktopSocials = header.locator(".gno-portal-header__desktop-socials");
  const searchButton = header.locator(".gno-portal-header__search-button");
  const menuGridGlyph = header.locator(".gno-portal-header__menu-grid-glyph");

  await expect(bar).toHaveCSS("background-color", "rgb(46, 46, 46)");
  await expect(bar).toHaveCSS("border-bottom-color", "rgb(204, 0, 1)");
  expect((await bar.boundingBox())?.height).toBeCloseTo(51, 0);
  expect((await logo.boundingBox())?.width).toBeCloseTo(66, 0);
  expect((await logo.boundingBox())?.height).toBeCloseTo(40, 0);
  await expect(label).toHaveCSS("color", "rgb(255, 255, 255)");
  await expect(label).toHaveCSS("font-size", "15px");
  const desktopLogoBox = await logo.boundingBox();
  const desktopLabelBox = await label.boundingBox();
  expect(
    (desktopLabelBox?.y ?? 0) + (desktopLabelBox?.height ?? 0) / 2
      - ((desktopLogoBox?.y ?? 0) + (desktopLogoBox?.height ?? 0) / 2),
  ).toBeCloseTo(5, 0);
  await expect(desktopSocials).toBeVisible();
  await expect(searchButton).toBeVisible();
  await expect(menuGridGlyph).toBeVisible();
  await expect(menuGridGlyph.locator("rect")).toHaveCount(9);
  await expect(menuGridGlyph.locator("rect").first()).toHaveAttribute("fill", "currentColor");
  await expect(menuGridGlyph.locator("rect").first()).not.toHaveAttribute("stroke");

  await header.getByRole("button", { name: "Open menu" }).click();
  const panel = header.getByRole("dialog", { name: "Navigation menu" });
  await expect(panel).toBeVisible();
  await expect(menuGridGlyph).toBeVisible();
  const expectedNavigation = [
    ["Home", "https://www.gmanetwork.com/"],
    ["News", "https://www.gmanetwork.com/news/"],
    ["Entertainment", "https://www.gmanetwork.com/entertainment/"],
    ["Lifestyle", "https://www.gmanetwork.com/lifestyle/"],
    ["Sparkle GMA Artist Center", "https://www.gmanetwork.com/sparkle/"],
    ["Radio", "https://www.gmanetwork.com/radio/"],
    ["Music", "https://www.gmanetwork.com/music/"],
    ["Pictures", "https://www.gmanetwork.com/pictures/"],
    ["GMA Pinoy TV", "https://www.gmanetwork.com/international/"],
    ["Kapuso Foundation", "https://www.gmanetwork.com/kapusofoundation/"],
    ["Regional TV", "https://www.gmanetwork.com/regionaltv/"],
    ["Corporate", "https://www.gmanetwork.com/corporate/"],
    ["GMA Play", "https://www.gmanetwork.com/gmaplay/"],
    ["GTV", "https://www.gmanetwork.com/gtv/"],
    ["GMA Affordabox", "https://www.gmanetwork.com/affordabox/"],
    ["GMA Now", "https://www.gmanetwork.com/digital-tv-gma-now/"],
  ] as const;
  const navigationLinks = panel.locator(".gno-portal-header__menu-navigation a");
  await expect(navigationLinks).toHaveCount(expectedNavigation.length);
  expect(await navigationLinks.allTextContents()).toEqual(expectedNavigation.map(([label]) => label));
  for (const [index, [, href]] of expectedNavigation.entries()) {
    await expect(navigationLinks.nth(index)).toBeVisible();
    await expect(navigationLinks.nth(index)).toHaveAttribute("href", href);
  }
  await expect(header.locator(".gno-portal-header__menu-navigation")).toHaveCSS(
    "grid-template-columns",
    /\S+\s+\S+/,
  );
  await expect(header.locator(".gno-portal-header__network-navigation .gno-portal-header__nav-list")).toHaveCSS("column-count", "3");

  const homeBox = await panel.getByRole("link", { name: "Home", exact: true }).boundingBox();
  const lifestyleBox = await panel.getByRole("link", { name: "Lifestyle", exact: true }).boundingBox();
  const sparkleBox = await panel.getByRole("link", { name: "Sparkle GMA Artist Center" }).boundingBox();
  const pinoyBox = await panel.getByRole("link", { name: "GMA Pinoy TV" }).boundingBox();
  const playBox = await panel.getByRole("link", { name: "GMA Play", exact: true }).boundingBox();
  expect(lifestyleBox?.y).toBeGreaterThan(homeBox?.y ?? 0);
  expect(sparkleBox?.x).toBeGreaterThan(homeBox?.x ?? 0);
  expect(pinoyBox?.x).toBeGreaterThan(sparkleBox?.x ?? 0);
  expect(playBox?.x).toBeGreaterThan(pinoyBox?.x ?? 0);

  await page.setViewportSize({ width: 375, height: 812 });
  expect((await bar.boundingBox())?.height).toBeCloseTo(42.4, 0);
  const mobileLogoBox = await logo.boundingBox();
  const mobileLabelBox = await label.boundingBox();
  expect(
    (mobileLabelBox?.y ?? 0) + (mobileLabelBox?.height ?? 0) / 2
      - ((mobileLogoBox?.y ?? 0) + (mobileLogoBox?.height ?? 0) / 2),
  ).toBeCloseTo(5, 0);
  await expect(desktopSocials).toBeHidden();
  await expect(searchButton).toBeHidden();
  await expect(header.locator(".gno-portal-header__mobile-misc")).toBeVisible();
  await expect(header.locator(".gno-portal-header__menu-navigation")).toHaveCSS(
    "grid-template-columns",
    /^\S+$/,
  );
  const mobileLists = header.locator(".gno-portal-header__menu-navigation .gno-portal-header__nav-list");
  for (let index = 0; index < await mobileLists.count(); index += 1) {
    await expect(mobileLists.nth(index)).toHaveCSS("column-count", "2");
  }
  const lastNavigationLink = panel.getByRole("link", { name: "GMA Now" });
  await lastNavigationLink.scrollIntoViewIfNeeded();
  await expect(lastNavigationLink).toBeVisible();
});

test("Portal Header applies its text token from the component root", async ({ page }) => {
  await page.goto("/catalog");

  const header = page.locator(".gno-portal-header");
  const sectionLabel = header.locator(".gno-portal-header__section-label");
  const menuButton = header.locator(".gno-portal-header__menu-button");

  await expect(sectionLabel).toHaveCSS("color", "rgb(255, 255, 255)");
  await expect(menuButton).toHaveCSS("color", "rgb(255, 255, 255)");
  await menuButton.click();

  const socialLink = header.locator(".gno-portal-header__social-link:visible").first();
  const navigationLink = header.getByRole("link", { name: "Home", exact: true });
  await expect(socialLink).toHaveCSS("color", "rgb(255, 255, 255)");
  await expect(navigationLink).toHaveCSS("color", "rgb(255, 255, 255)");
  await page.keyboard.press("Escape");
  await page.mouse.move(0, 300);

  await header.evaluate((element) => {
    (element as HTMLElement).style.setProperty("--gno-portal-header-text", "rgb(18, 52, 86)");
  });
  await expect(sectionLabel).toHaveCSS("color", "rgb(18, 52, 86)");
  await expect(menuButton).toHaveCSS("color", "rgb(18, 52, 86)");
  await menuButton.click();
  await expect(socialLink).toHaveCSS("color", "rgb(18, 52, 86)");
  await expect(navigationLink).toHaveCSS("color", "rgb(18, 52, 86)");
});

for (const width of [320, 375, 768, 1024, 1440]) {
  test(`Portal Header has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/catalog");
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  });
}
