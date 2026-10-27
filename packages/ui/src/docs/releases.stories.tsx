import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import changelog from "../../../../CHANGELOG.md?raw";

const meta = {
  title: "Releases/Changelog",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Latest: Story = {
  render: () => (
    <article style={{ maxWidth: 860, lineHeight: 1.65 }}>
      <h1>Package releases</h1>
      <p>
        Release notes are published from the package changelog so this page
        stays aligned with consumer-facing releases.
      </p>
      <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
        {changelog}
      </pre>
    </article>
  ),
};
