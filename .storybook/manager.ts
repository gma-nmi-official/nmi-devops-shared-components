import { addons } from "storybook/manager-api";
import { themes } from "storybook/theming";

addons.setConfig({
  title: "NMI DevOps Shared Components",
  theme: themes.light,
  sidebar: { showRoots: true },
});
