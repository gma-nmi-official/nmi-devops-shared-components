import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { PortalHeader } from "./portal-header";

const meta = {
  title: "Components/PortalHeader",
  component: PortalHeader,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    brand: { sectionLabel: "News" },
    primaryNavigation: [{ id: "news", current: true }],
    socialPreset: "news",
    search: { action: "/search", queryParam: "q", placeholder: "Search GMA Network" },
  },
  argTypes: {
    navigationPreset: { control: "select", options: ["gma", "none"] },
    socialPreset: { control: "select", options: ["entertainment", "news", "none"] },
    renderLink: { control: false },
  },
} satisfies Meta<typeof PortalHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  play: async ({ canvasElement }) => {
    const logo = canvasElement.querySelector<HTMLElement>(".gno-portal-header__logo");
    const label = canvasElement.querySelector<HTMLElement>(".gno-portal-header__section-label");
    await expect(logo).not.toBeNull();
    await expect(label).not.toBeNull();
    const logoBox = logo?.getBoundingClientRect();
    const labelBox = label?.getBoundingClientRect();
    const opticalOffset = (labelBox?.y ?? 0) + (labelBox?.height ?? 0) / 2
      - ((logoBox?.y ?? 0) + (logoBox?.height ?? 0) / 2);
    await expect(opticalOffset).toBeCloseTo(5, 0);
  },
};

export const Mobile: Story = {
  globals: { viewport: { value: "mobile1", isRotated: false } },
};

export const OpenDropdown: Story = {
  globals: { viewport: { value: "mobile1", isRotated: false } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Open menu" }));
    const menu = canvas.getByRole("dialog", { name: "Navigation menu" });
    const firstLink = within(menu).getByRole("link", { name: "Home" });
    const lastLink = within(menu).getByRole("link", { name: "GMA News RSS feed" });
    await expect(menu).toBeVisible();
    await expect(firstLink).toHaveFocus();
    lastLink.focus();
    await userEvent.tab();
    await expect(firstLink).toHaveFocus();
  },
};

export const EntertainmentSocialPreset: Story = {
  args: { brand: { sectionLabel: "Entertainment" }, socialPreset: "entertainment" },
};

export const WithoutSearchOrSocials: Story = { args: { search: undefined, socialPreset: "none" } };

export const LongContent: Story = {
  args: {
    brand: { sectionLabel: "A deliberately long consumer-provided section label that wraps safely" },
    primaryNavigation: [
      { id: "long", label: "A very long navigation item supplied by a portal consumer", href: "#long" },
    ],
  },
};

export const CustomSectionAccent: Story = { args: { theme: { accentColor: "#6c2862" } } };

export const NavigationOverrides: Story = {
  args: {
    networkNavigation: [
      { id: "pictures", hidden: true },
      { id: "community", label: "Community", href: "https://example.com/community" },
    ],
  },
};

export const FailureFallbacks: Story = {
  args: {
    brand: { logoSrc: "invalid-logo.svg", sectionLabel: "Fallbacks" },
    socialLinks: [
      { id: "unsafe", href: "javascript:alert(1)", label: "Unsafe link" },
      { id: "community", href: "https://example.com/community", label: "Community", icon: "unknown-icon" },
    ],
  },
};
