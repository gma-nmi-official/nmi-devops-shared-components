import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CookieAgreement } from "./cookie-agreement";
import type { ConsentStore } from "./types";

const storybookStore: ConsentStore = {
  read: () => null,
  write: () => undefined,
  clear: () => undefined,
};

const meta = {
  title: "Components/CookieAgreement",
  component: CookieAgreement,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { story: { inline: false, height: "220px" } },
  },
  args: { policyVersion: "2026-01", store: storybookStore },
  argTypes: {
    policyVersion: { control: "text" },
    rejectEnabled: { control: "boolean", description: "Temporary session-only dismissal; hidden by default." },
    scrollRevealThreshold: { control: { type: "range", min: 0, max: 1, step: 0.05 }, description: "Viewport-height fraction scrolled before the notice slides up." },
    findOutMoreHref: { control: "text", description: "Absolute HTTPS privacy-policy destination." },
    seal: { control: false, description: "Repository-local NPC seal configuration." },
    store: { control: false },
    record: { control: false },
    onAccepted: { action: "accepted", control: false },
    onStorageError: { action: "storage error", control: false },
  },
} satisfies Meta<typeof CookieAgreement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const VisiblePreview: Story = { args: { scrollRevealThreshold: 0 } };
export const ScrollReveal: Story = { args: { scrollRevealThreshold: 0.1 } };
export const RejectEnabled: Story = { args: { rejectEnabled: true } };
export const NoSeal: Story = { args: { seal: null } };
export const LongCopy: Story = { args: { copy: { body: "This is intentionally long consumer-provided copy explaining the cookie policy, acceptance behavior, privacy notice, and temporary Reject dismissal across multiple lines and responsive widths." } } };
export const CustomPrivacyDestination: Story = { args: { findOutMoreHref: "https://example.com/privacy" } };
