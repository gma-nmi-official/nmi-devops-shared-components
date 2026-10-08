import type { Preview } from "@storybook/nextjs-vite";
import "../packages/ui/src/styles.css";
const preview: Preview = { parameters: { a11y: { test: "error" }, controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } } } };
export default preview;
