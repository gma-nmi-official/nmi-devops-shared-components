import { mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const outputDirectory = fileURLToPath(new URL("../release-artifacts/", import.meta.url));
const npmArguments = [
  "pack",
  "-w",
  "nmi-devops-shared-components",
  "--pack-destination",
  outputDirectory,
];

await rm(outputDirectory, { force: true, recursive: true });
await mkdir(outputDirectory, { recursive: true });

if (process.env.npm_execpath) {
  execFileSync(process.execPath, [process.env.npm_execpath, ...npmArguments], { stdio: "inherit" });
} else {
  const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
  execFileSync(npmCommand, npmArguments, { stdio: "inherit" });
}
