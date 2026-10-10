import { execFileSync, execSync } from "child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "fs";
import { join } from "path";

const root = process.cwd();
const standalone = join(root, ".next", "standalone");
const staticDir = join(root, ".next", "static");
const publicDir = join(root, "public");
const deployDir = join(root, "deploy");
const zipFile = join(root, "deploy.zip");

if (!existsSync(standalone) || !existsSync(staticDir)) {
  console.error("Run npm run build first");
  process.exit(1);
}

rmSync(deployDir, { recursive: true, force: true });
cpSync(standalone, deployDir, { recursive: true });

mkdirSync(join(deployDir, ".next"), { recursive: true });
cpSync(staticDir, join(deployDir, ".next", "static"), { recursive: true });
if (existsSync(publicDir)) {
  cpSync(publicDir, join(deployDir, "public"), { recursive: true });
}

// Never ship local secrets or build caches
for (const name of readdirSync(deployDir)) {
  if (name.startsWith(".env")) rmSync(join(deployDir, name), { force: true });
}
rmSync(join(deployDir, ".next", "cache"), { recursive: true, force: true });

// next/image needs sharp. Output tracing copies only the .node file (not its libvips DLLs/.so),
// and only for the build machine's OS — ship the full local binaries plus Linux x64 for the server.
const imgDir = join(deployDir, "node_modules", "@img");
if (existsSync(join(root, "node_modules", "@img"))) {
  cpSync(join(root, "node_modules", "@img"), imgDir, { recursive: true });
}
const sharpVersion = JSON.parse(
  readFileSync(join(root, "node_modules", "sharp", "package.json"), "utf8"),
).version;
const linuxSharp = join(root, ".next", "cache", `sharp-linux-x64-${sharpVersion}`);
try {
  if (!existsSync(join(linuxSharp, "node_modules", "@img"))) {
    mkdirSync(linuxSharp, { recursive: true });
    execSync(
      `npm install --no-save --no-package-lock --no-audit --no-fund --os=linux --cpu=x64 --libc=glibc --prefix "${linuxSharp}" sharp@${sharpVersion}`,
      { stdio: "inherit" },
    );
  }
  cpSync(join(linuxSharp, "node_modules", "@img"), imgDir, { recursive: true });
} catch {
  console.warn("Could not add Linux sharp binaries — image optimization may not work on a Linux server");
}

// Hosts (cPanel, Git Bash) often set HOSTNAME to the machine name, which makes server.js
// listen only on that name — localhost / reverse proxies then can't connect.
const serverFile = join(deployDir, "server.js");
const hostLine = "const hostname = process.env.HOSTNAME || '0.0.0.0'";
const serverSrc = readFileSync(serverFile, "utf8");
if (!serverSrc.includes(hostLine)) {
  console.error("server.js format changed — update the HOSTNAME patch in pack-standalone.mjs");
  process.exit(1);
}
writeFileSync(serverFile, serverSrc.replace(hostLine, "const hostname = '0.0.0.0'"));

rmSync(zipFile, { force: true });
const entries = readdirSync(deployDir);
if (process.platform === "win32") {
  // Windows' built-in bsdtar writes real zips with forward-slash paths (safe to unzip on Linux)
  const tar = join(process.env.SystemRoot ?? "C:\\Windows", "System32", "tar.exe");
  // Windows sharp binaries stay in deploy/ for local testing only; the zip targets a Linux server
  execFileSync(tar, ["-a", "-c", "-f", zipFile, "--exclude", "node_modules/@img/sharp-win32-*", ...entries], {
    cwd: deployDir,
    stdio: "inherit",
  });
} else {
  execFileSync("zip", ["-r", "-q", zipFile, ...entries], { cwd: deployDir, stdio: "inherit" });
}

const mb = (statSync(zipFile).size / 1024 / 1024).toFixed(1);
console.log(`deploy.zip ready (${mb} MB) — upload, unzip, startup file: server.js`);
