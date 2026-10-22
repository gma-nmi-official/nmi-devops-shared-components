import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ReactNode } from "react";

const meta = { title: "Guides", parameters: { layout: "padded" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const Guide = ({ children }: { children: ReactNode }) => (
  <article style={{ maxWidth: 860, lineHeight: 1.65 }}>{children}</article>
);

export const GettingStarted: Story = {
  name: "Getting started",
  render: () => <Guide><h1>Getting started</h1><p>Install the package, import the component you need, and include the shared stylesheet once.</p><pre>{`npm install nmi-devops-shared-components\n\nimport { PortalHeader } from "nmi-devops-shared-components";\nimport "nmi-devops-shared-components/styles.css";`}</pre><p>The <a href="../catalog/">package catalog</a> includes consumer-facing configuration examples.</p></Guide>,
};

export const Accessibility: Story = {
  name: "Accessibility",
  render: () => <Guide><h1>Accessibility</h1><p>Accessibility is part of the component contract. Stories include interaction checks where behavior matters, and the accessibility panel runs against each rendered example.</p><p>Preserve semantic labels, visible focus treatment, keyboard behavior, and reduced-motion support when integrating a component.</p></Guide>,
};
