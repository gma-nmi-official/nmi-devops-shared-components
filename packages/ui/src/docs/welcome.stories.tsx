import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Welcome",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  name: "Start here",
  render: () => (
    <article style={{ maxWidth: 860, lineHeight: 1.65 }}>
      <h1>NMI DevOps Shared Components</h1>
      <p>
        Welcome to the public component documentation for the NMI DevOps shared
        UI package.
      </p>
      <p>
        Browse live examples, change controls, and review accessibility behavior
        before adopting a component.
      </p>
      <p>
        <strong>Start here:</strong> use the sidebar for interactive components,
        visit <a href="../catalog/">/catalog</a> for package guidance, and open
        Releases for package changes.
      </p>
    </article>
  ),
};
