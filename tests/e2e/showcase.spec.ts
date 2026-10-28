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

test("navigates through the documentation home, catalog, and a dedicated guide", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("NMI DevOps Shared Components");
  await expect(page.getByText("Shared Components", { exact: true })).toBeVisible();

  await expect(
    page.getByRole("heading", { level: 1, name: "Build consistent portal experiences with confidence." }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Start with the outcome you need." })).toBeVisible();

  const catalogLink = await focusWithKeyboard(page, "Explore component guides");
  await catalogLink.press("Enter");

  await expect(page).toHaveURL(/\/catalog\/?$/);
  await expect(page).toHaveTitle("Component guides | NMI DevOps Shared Components");
  await expect(
    page.getByRole("heading", { level: 1, name: "Choose a component. Start with a complete guide." }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Portal Header/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Cookie Agreement/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Ad Slot/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Google Analytics/ })).toBeVisible();

  await page.getByRole("link", { name: /Portal Header/ }).click();
  await expect(page).toHaveURL(/\/catalog\/portal-header\/?$/);
  await expect(page).toHaveTitle("Portal Header guide | NMI DevOps Shared Components");
  await expect(page.getByRole("heading", { level: 1, name: "Portal Header" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Install" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Setup" })).toBeVisible();
  await expect(page.getByText('import { PortalHeader } from "nmi-devops-shared-components";', { exact: false })).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL(/\/catalog\/?$/);

  await page.goForward();
  await expect(page).toHaveURL(/\/catalog\/portal-header\/?$/);
  await expect(page.getByRole("link", { name: "Home", exact: true })).toBeVisible();
});

test("Portal Header guide preserves configuration labels", async ({ page }) => {
  await page.goto("/catalog/portal-header#configuration");

  for (const label of [
    "brand",
    "navigationPreset",
    "primaryNavigation / networkNavigation",
    "socialPreset / socialLinks",
    "search",
    "renderLink",
    "theme",
  ]) {
    await expect(page.locator(".configuration-list code", { hasText: label })).toHaveCount(1);
  }
});

for (const path of [
  "/",
  "/catalog",
  "/catalog/portal-header",
  "/catalog/cookie-agreement",
  "/catalog/ad-slot",
  "/catalog/google-analytics",
] as const) {
  test(`${path} has no page-level horizontal overflow`, async ({ page }) => {
    await page.goto(path);

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  });
}

test("documentation routes expose distinct metadata and local NMI branding", async ({ page }) => {
  const routes = [
    ["/", "NMI DevOps Shared Components"],
    ["/catalog", "Component guides | NMI DevOps Shared Components"],
    ["/catalog/portal-header", "Portal Header guide | NMI DevOps Shared Components"],
    ["/catalog/cookie-agreement", "Cookie Agreement guide | NMI DevOps Shared Components"],
    ["/catalog/ad-slot", "Ad Slot guide | NMI DevOps Shared Components"],
    ["/catalog/google-analytics", "Google Analytics guide | NMI DevOps Shared Components"],
  ] as const;

  for (const [path, title] of routes) {
    await page.goto(path);
    await expect(page).toHaveTitle(title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /\S+/);
    await expect(page.locator('link[rel="icon"]')).toHaveAttribute("href", /favicon\.ico/);
    await expect(
      page.getByRole("link", { name: "NMI DevOps Shared Components home" }),
    ).toBeVisible();
    await expect(page.locator(".docs-brand__logo")).toHaveAttribute(
      "src",
      /nmi-logo-dark-bg\.svg/,
    );
  }
});

test("unknown component guide is not generated", async ({ page }) => {
  const response = await page.request.get("/catalog/not-a-component");

  expect(response.status()).toBe(404);
});

test("guide Storybook links forward their path query into the docs frame", async ({ page }) => {
  await page.goto("/catalog/portal-header");
  await page.getByRole("link", { name: "Open in Storybook" }).click();

  await expect(page).toHaveURL(
    /\/docs\/?\?path=\/story\/components-portalheader--desktop$/,
  );
  await expect(
    page.getByTitle("NMI DevOps Shared Components interactive documentation"),
  ).toHaveAttribute(
    "src",
    /\/storybook\/index\.html\?path=%2Fstory%2Fcomponents-portalheader--desktop$/,
  );
});

test("Portal Header exposes safe social links and a working native GET search", async ({ page }) => {
  await page.goto("/catalog/portal-header");

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
  await expect(page).toHaveURL(/\/catalog\/portal-header\/?$/);

  await search.fill("  sample query  ");
  await search.press("Enter");
  await expect(page).toHaveURL(/\/catalog\/portal-header\/?\?q=sample(\+|%20)query$/);
});

test("mobile dropdown closes with Escape and restores trigger focus", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/catalog/portal-header");
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

  await page.goto("/catalog/ad-slot");
  await expect(page.getByRole("heading", { level: 1, name: "Ad Slot" })).toBeVisible();
  await expect(page.getByText("googletag: GptCompatible", { exact: false })).toBeVisible();
  await expect(page.getByText("createGptAdProvider({ googletag })", { exact: false })).toBeVisible();
  const slot = page.getByRole("complementary", { name: "Example advertisement" });
  await expect(slot).toHaveAttribute("data-ad-format", "mrec");
  await expect(slot).toHaveAttribute("data-ad-state", "filled");
  expect(adNetworkRequests).toEqual([]);
});

test("Google Analytics catalog preview stays consent-aware and makes no provider request", async ({ page }) => {
  const analyticsRequests: string[] = [];
  page.on("request", (request) => {
    const hostname = new URL(request.url()).hostname;
    if (/google-analytics\.com|googletagmanager\.com/i.test(hostname)) {
      analyticsRequests.push(request.url());
    }
  });

  await page.goto("/catalog/google-analytics");
  await expect(page.getByRole("heading", { level: 1, name: "Google Analytics" })).toBeVisible();
  await expect(page.getByText("consent: ConsentState", { exact: false })).toBeVisible();
  await expect(page.getByText("gtag: Gtag", { exact: false })).toBeVisible();
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
    await page.goto("/catalog/portal-header");
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

    await page.locator(".guide-hero").click();
    await expect(panel).toBeHidden();
    await expect(menuButton).toBeFocused();
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  });
}

test("Portal Header matches the approved production visual structure", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/catalog/portal-header");

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
  const firstNetworkLinkBox = await panel
    .getByRole("link", { name: "Sparkle GMA Artist Center" })
    .boundingBox();
  expect(lifestyleBox?.y).toBeGreaterThan(homeBox?.y ?? 0);
  expect(firstNetworkLinkBox?.x).toBeGreaterThan(homeBox?.x ?? 0);

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
  await page.goto("/catalog/portal-header");

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
    await page.goto("/catalog/portal-header");
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  });
}
