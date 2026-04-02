import { existsSync } from "node:fs";
import { execSync } from "node:child_process";

const isVercel = process.env.VERCEL === "1";
const skipCoreApiBuild = process.env.SKIP_CORE_API_BUILD === "1";

if (skipCoreApiBuild) {
  console.log("[prebuild] SKIP_CORE_API_BUILD=1, skipping TypeDoc generation.");
  process.exit(0);
}

const hasHoshimiSource = existsSync("hoshimi/src/index.ts");
const hasGeneratedDocs = existsSync("public/core-api/index.html") && existsSync("public/core-api.json");

if (!hasHoshimiSource) {
  if (isVercel && hasGeneratedDocs) {
    console.log("[prebuild] hoshimi submodule not found on Vercel, using committed public/core-api artifacts.");
    process.exit(0);
  }

  console.error("[prebuild] Missing hoshimi sources at hoshimi/src/index.ts.");
  console.error("[prebuild] Run: git submodule update --init --recursive");
  process.exit(1);
}

try {
  console.log("[prebuild] Installing hoshimi submodule dependencies...");
  execSync("pnpm install --cwd hoshimi", {
    stdio: "inherit",
  });

  console.log("[prebuild] Building core API documentation...");
  execSync("pnpm core-api:build", {
    stdio: "inherit",
  });
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error("[prebuild] Failed to run setup:", message);
  process.exit(1);
}

process.exit(0);
