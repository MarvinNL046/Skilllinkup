const { spawn } = require("node:child_process");
const fs = require("node:fs");
const net = require("node:net");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const url = "http://localhost:3011";

async function main() {
  const listening = await new Promise((resolve) => {
    const socket = net.createConnection({ host: "localhost", port: 3011 });
    const finish = (value) => { socket.destroy(); resolve(value); };
    socket.once("connect", () => finish(true));
    socket.once("error", () => finish(false));
    socket.setTimeout(1000, () => finish(false));
  });
  if (listening) {
    const health = await fetch(url + "/api/health", { signal: AbortSignal.timeout(10000) }).then((response) => response.json());
    if (health.service !== "skilllinkup-web") throw new Error("Port 3011 is in use by another application.");
    console.log("SkillLinkup is already running at " + url);
    return;
  }
  const runtime = path.join(root, ".codex-runtime");
  fs.mkdirSync(runtime, { recursive: true });
  const stdout = fs.openSync(path.join(runtime, "dev-server.stdout.log"), "a");
  const stderr = fs.openSync(path.join(runtime, "dev-server.stderr.log"), "a");
  const child = spawn(process.execPath, [path.join(root, "node_modules/next/dist/bin/next"), "dev", "--hostname", "localhost", "--port", "3011"], {
    cwd: root, detached: true, windowsHide: true, stdio: ["ignore", stdout, stderr],
    env: { ...process.env, NEXT_DIST_DIR: ".next-dev" },
  });
  child.once("error", (error) => { console.error(error.message); process.exitCode = 1; });
  child.unref();
  fs.closeSync(stdout); fs.closeSync(stderr);
  fs.writeFileSync(path.join(runtime, "dev-server.pid"), String(child.pid));
  console.log("Started SkillLinkup at " + url + " (PID " + child.pid + "). Logs: .codex-runtime/dev-server.*.log");
}
main().catch((error) => { console.error(error.message); process.exitCode = 1; });
