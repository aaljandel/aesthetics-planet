import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

function walk(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (entry.name.endsWith(".b64") && !existsSync(path.slice(0, -4))) {
      writeFileSync(path.slice(0, -4), Buffer.from(readFileSync(path, "utf8"), "base64"));
    }
  }
}

walk("public");
