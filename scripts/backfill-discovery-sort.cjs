const { execFileSync } = require("node:child_process");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const deployment = process.argv[2];
if (!deployment || !/^[a-zA-Z0-9_-]+$/.test(deployment)) {
  throw new Error("Usage: node scripts/backfill-discovery-sort.cjs <explicit-deployment-name>");
}
const result = { deployment, tables: [] };
for (const table of ["projects", "jobs"]) {
  let cursor = null, changed = 0, pages = 0;
  const seen = new Set();
  while (true) {
    const output = execFileSync(process.execPath, [
      path.join(root, "node_modules/convex/bin/main.js"), "run", "marketplace/discoveryBackfill:run",
      JSON.stringify({ table, cursor }), "--deployment", deployment,
    ], { cwd: root, encoding: "utf8", windowsHide: true, stdio: ["ignore", "pipe", "pipe"] });
    const page = JSON.parse(output);
    changed += page.changed; pages++;
    if (page.isDone) break;
    if (!page.continueCursor || seen.has(page.continueCursor)) throw new Error("Migration cursor did not advance.");
    cursor = page.continueCursor; seen.add(cursor);
  }
  result.tables.push({ table, changed, pages, complete: true });
}
console.log(JSON.stringify(result, null, 2));
