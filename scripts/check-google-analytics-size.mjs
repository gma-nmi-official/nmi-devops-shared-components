import { readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";

const directory = resolve("packages/ui/dist/analytics/google-analytics");
const files = readdirSync(directory).filter((file) => file.endsWith(".js"));
const bytes = files.reduce((total, file) => total + statSync(resolve(directory, file)).size, 0);
const limit = 16 * 1024;

if (bytes > limit) {
  console.error(`Compiled Google Analytics JavaScript is ${bytes} bytes; limit is ${limit} bytes.`);
  process.exit(1);
}

console.log(`Compiled Google Analytics JavaScript is ${bytes} bytes across ${files.length} file(s); limit is ${limit} bytes.`);
