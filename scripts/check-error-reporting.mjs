import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { formatErrorLog, maskPersonalData, safePath, sanitizeErrorReport } from "../src/lib/errorReport.mjs";

// Exercises the real sanitiser and the real route handler. Nothing is sent
// anywhere; log output is captured in memory.
const require = createRequire(import.meta.url);
const ts = require("typescript");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
let checks = 0;
async function check(name, run) {
  await run();
  checks++;
  console.log(`PASS ${name}`);
}

await check("reports are bounded and never carry query strings, emails, tokens or phone numbers", async () => {
  const report = sanitizeErrorReport({
    message: `Failed for jane.doe@example.invalid with key ${"k".repeat(40)} call +31 6 1234 5678 ${"x".repeat(900)}`,
    stack: "s".repeat(9000),
    path: "https://skilllinkup.com/dashboard/applications?application=abc123&email=jane@example.invalid#top",
    source: "route-boundary",
    cookies: "session=secret",
  });
  assert.equal(report.path, "/dashboard/applications");
  assert.ok(report.message.length <= 501);
  assert.ok(report.stack.length <= 4001);
  for (const leaked of ["jane.doe", "example.invalid", "kkkkkkkk", "1234 5678", "abc123"]) assert.equal(JSON.stringify(report).includes(leaked), false, leaked);
  assert.equal("cookies" in report, false);
  assert.equal(maskPersonalData("mail a@b.co now"), "mail [email] now");
  assert.equal(safePath("/orders/123?x=1"), "/orders/123");
  assert.equal(sanitizeErrorReport(null).message, "Unknown error");
  const line = formatErrorLog("client", report, { VERCEL_GIT_COMMIT_SHA: "0123456789abcdef", VERCEL_ENV: "production" });
  assert.ok(line.startsWith("[skilllinkup-error] "));
  const parsed = JSON.parse(line.slice("[skilllinkup-error] ".length));
  assert.equal(parsed.commit, "0123456789ab");
  assert.equal(parsed.environment, "production");
  assert.equal(parsed.kind, "client");
});

function loadRoute(logs) {
  const file = path.join(root, "src/app/api/monitoring/client-error/route.js");
  const source = ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {};
  vm.runInNewContext(source, {
    exports, Response, URL, Map, Number, JSON, Date,
    console: { error: (line) => logs.push(line) },
    process: { env: { VERCEL_ENV: "preview" } },
    require: (id) => {
      if (id === "@/lib/errorReport.mjs") return { formatErrorLog, sanitizeErrorReport };
      throw new Error(`Unexpected import ${id}`);
    },
  }, { filename: file });
  return exports;
}
const post = (route, body, headers = {}) =>
  route.POST(new Request("https://skilllinkup.com/api/monitoring/client-error", { method: "POST", headers: { "content-type": "application/json", ...headers }, body }));

await check("the reporting endpoint accepts same-origin reports and rejects foreign, oversized, malformed and flooding requests", async () => {
  const logs = [];
  const route = loadRoute(logs);
  const ok = await post(route, JSON.stringify({ message: "Boom for a@b.co", path: "/jobs?x=1" }), { origin: "https://skilllinkup.com", "x-forwarded-for": "203.0.113.1" });
  assert.equal(ok.status, 204);
  assert.equal(logs.length, 1);
  assert.equal(logs[0].includes("a@b.co"), false);
  assert.ok(logs[0].includes('"path":"/jobs"'));
  assert.equal((await post(route, "{}", { origin: "https://evil.invalid" })).status, 403);
  assert.equal((await post(route, "not json", { "x-forwarded-for": "203.0.113.2" })).status, 400);
  assert.equal((await post(route, JSON.stringify({ message: "x".repeat(9000) }), { "x-forwarded-for": "203.0.113.3" })).status, 413);
  assert.equal(logs.length, 1);
  let last;
  for (let i = 0; i < 35; i++) last = await post(route, JSON.stringify({ message: `flood ${i}` }), { "x-forwarded-for": "203.0.113.9" });
  assert.equal(last.status, 429);
  assert.ok(logs.length <= 31);
});

await check("every error boundary and both instrumentation hooks report through the shared helpers", async () => {
  for (const file of ["src/app/error.jsx", "src/app/global-error.jsx", "src/app/(dashboard)/error.jsx", "src/instrumentation-client.js"])
    assert.ok(fs.readFileSync(path.join(root, file), "utf8").includes("reportClientError("), file);
  const server = fs.readFileSync(path.join(root, "src/instrumentation.js"), "utf8");
  assert.ok(server.includes("export async function onRequestError"));
  assert.equal(/headers|cookie/i.test(server.replace(/\/\/.*$/gm, "")), false);
});

console.log(`Error reporting checks passed: ${checks} groups.`);
