import { cpSync, existsSync, mkdirSync, rmSync } from "fs";
import { join } from "path";

const root = process.cwd();
const standalone = join(root, ".next", "standalone");
const staticDir = join(root, ".next", "static");
const publicDir = join(root, "public");
const deployDir = join(root, "deploy");

if (!existsSync(standalone) || !existsSync(staticDir)) {
  console.error("Run npm run build first");
  process.exit(1);
}

mkdirSync(join(standalone, ".next"), { recursive: true });
cpSync(staticDir, join(standalone, ".next", "static"), { recursive: true });
if (existsSync(publicDir)) {
  cpSync(publicDir, join(standalone, "public"), { recursive: true });
}

rmSync(deployDir, { recursive: true, force: true });
cpSync(standalone, deployDir, { recursive: true });
console.log("deploy/ ready — zip this folder only (~50MB)");
