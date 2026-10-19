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

test("navigates through the showcase and empty catalog with keyboard focus", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("NMI DevOps Shared Components");
  await expect(page.getByText("NMI DevOps Shared Components", { exact: true })).toBeVisible();

  await expect(
    page.getByRole("heading", { level: 1, name: "A dedicated foundation for GNO portal interfaces." }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "No public components yet" })).toBeVisible();

  const catalogLink = await focusWithKeyboard(page, "Open the component catalog");
  await catalogLink.press("Enter");

  await expect(page).toHaveURL(/\/catalog$/);
  await expect(page).toHaveTitle("Component catalog | NMI DevOps Shared Components");
  await expect(
    page.getByRole("heading", { level: 1, name: "Importable building blocks for GNO portal products." }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "No public GNO components are published yet." }),
  ).toBeVisible();
  await expect(page.getByText("Rendered preview and supported states", { exact: true })).toBeVisible();
  await expect(page.getByText("Dedicated Storybook story with controls and interaction coverage", { exact: true })).toBeVisible();
  await expect(page.getByText('import { ApprovedGnoComponent } from "nmi-devops-shared-components";', { exact: false })).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { level: 1, name: "A dedicated foundation for GNO portal interfaces." })).toBeVisible();

  await page.goForward();
  await expect(page).toHaveURL(/\/catalog$/);
  await expect(page.getByRole("link", { name: "Showcase home" })).toBeVisible();
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
