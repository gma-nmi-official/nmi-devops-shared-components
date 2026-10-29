import { gzipSync } from "node:zlib";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";

const directory = resolve("packages/ui/dist/analytics/google-analytics");
const files = readdirSync(directory).filter((file) => file.endsWith(".js"));
const bytes = files.reduce((total, file) => total + statSync(resolve(directory, file)).size, 0);
const gzipBytes = files.reduce((total, file) => total + gzipSync(readFileSync(resolve(directory, file))).length, 0);
const gzipLimit = 8 * 1024;

if (gzipBytes > gzipLimit) {
  console.error(`Compiled Google Analytics JavaScript is ${bytes} raw bytes and ${gzipBytes} gzip bytes; gzip limit is ${gzipLimit} bytes.`);
  process.exit(1);
}

console.log(`Compiled Google Analytics JavaScript is ${bytes} raw bytes and ${gzipBytes} gzip bytes across ${files.length} file(s); gzip limit is ${gzipLimit} bytes.`);
