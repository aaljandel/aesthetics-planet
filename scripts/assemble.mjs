import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { payloadManifest } from "./payload-manifest.mjs";

function readParts(dir) {
  const parts = readdirSync(dir)
    .filter((name) => !name.startsWith("."))
    .sort();
  if (!parts.length) throw new Error(`No parts in ${dir}`);
  return parts.map((name) => readFileSync(join(dir, name), "utf8")).join("");
}

let wrote = 0;
for (const item of payloadManifest) {
  if (!existsSync(item.dir)) {
    if (!existsSync(item.out)) throw new Error(`Missing ${item.out} and ${item.dir}`);
    continue;
  }
  const body = readParts(item.dir);
  if (body.length !== item.bytes) {
    throw new Error(`${item.out}: assembled ${body.length} bytes, expected ${item.bytes}`);
  }
  mkdirSync(dirname(item.out), { recursive: true });
  writeFileSync(item.out, body);
  wrote += 1;
}

console.log(`assemble: wrote ${wrote} file(s)`);
