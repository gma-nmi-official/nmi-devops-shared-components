import { copyFile, mkdir } from "node:fs/promises";
const destination = new URL("../dist", import.meta.url);
await mkdir(destination, { recursive: true });
await copyFile(new URL("../src/styles.css", import.meta.url), new URL("../dist/styles.css", import.meta.url));
const assetDestination = new URL("../dist/assets", import.meta.url);
await mkdir(assetDestination, { recursive: true });
await copyFile(new URL("../src/assets/gma-header-logo.svg", import.meta.url), new URL("../dist/assets/gma-header-logo.svg", import.meta.url));
