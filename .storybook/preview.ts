import type { Preview } from "@storybook/nextjs-vite";
import "../packages/ui/src/styles.css";
import "./storybook.css";

const preview: Preview = {
  parameters: {
    a11y: { test: "error" },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    options: {
      storySort: {
        order: ["Welcome", "Guides", "Components", "Releases"],
      },
    },
    docs: {
      description: {
        component: "Friendly, production-minded building blocks for GNO portal products.",
      },
    },
  },
};
export default preview;
