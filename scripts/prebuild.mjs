import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import process from "node:process";

// Hoshimi is a regular dependency, so its declaration bundle is always present
// under node_modules after install (locally and on Vercel). The API reference is
// generated from that bundle; no submodule or TypeDoc build is required.

const skipApiReference = process.env.SKIP_CORE_API_BUILD === "1";

if (skipApiReference) {
  console.log("[prebuild] SKIP_CORE_API_BUILD=1, skipping API reference generation.");
  process.exit(0);
}

if (!existsSync("node_modules/hoshimi/dist/index.d.cts")) {
  console.error("[prebuild] Missing hoshimi declarations at node_modules/hoshimi/dist/index.d.cts.");
  console.error("[prebuild] Run: pnpm install");
  process.exit(1);
}

try {
  console.log("[prebuild] Generating API reference from hoshimi declarations...");
  execSync("node scripts/generate-api-reference.mjs", { stdio: "inherit" });
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error("[prebuild] Failed to generate API reference:", message);
  process.exit(1);
}

process.exit(0);
