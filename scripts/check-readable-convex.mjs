import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

// Behaviour pin for Convex modules whose minified sources were rewritten into
// readable code. Each scenario runs the real handlers against in-memory data
// with a fixed clock and records every read result, write, scheduled job,
// notification and error. The recording made from the ORIGINAL minified file is
// stored in scripts/data/readable-convex-golden.json; the readable file must
// reproduce it exactly.
//
//   node scripts/check-readable-convex.mjs                      verify
//   node scripts/check-readable-convex.mjs --record <module>=<file>   re-record
//     from a copy of the original source (only when behaviour is meant to change)
const require = createRequire(import.meta.url);
const ts = require("typescript");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const goldenFile = path.join(root, "scripts/data/readable-convex-golden.json");
const NOW = 1_800_000_000_000;
const SECRET = "fixture-secret";

function loadModule(entryFile, canonicalFile, log) {
  const cache = new Map();
  const anyPath = (trail) => new Proxy(function () {}, { get: (_, key) => (key === "toJSON" ? () => trail : anyPath(`${trail}.${String(key)}`)) });
  class FixedDate extends Date {
    static now() { return NOW; }
  }
  function load(file, sourceFile = file) {
    if (cache.has(file)) return cache.get(file);
    const exports = {};
    cache.set(file, exports);
    const source = ts.transpileModule(fs.readFileSync(sourceFile, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
    vm.runInNewContext(source, {
      exports, Date: FixedDate, Set, Map, Error, Number, Math, Promise, JSON, Object, Array, String, Boolean,
      process: { env: { INTERNAL_EMAIL_SECRET: SECRET } },
      require(id) {
        if (id.includes("_generated/server")) return Object.fromEntries(["query", "mutation", "internalQuery", "internalMutation", "action", "internalAction"].map((name) => [name, (config) => config]));
        if (id.includes("_generated/api")) return { api: anyPath("api"), internal: anyPath("internal"), components: anyPath("components") };
        if (id.endsWith("/notifications")) return { notifyUser: async (_ctx, args) => { log.push(["notify", args]); } };
        if (id.endsWith("/rateLimits")) return { rateLimiter: { limit: async (_ctx, name, options) => { log.push(["rateLimit", name, options?.key]); return { ok: true }; } } };
        if (id === "convex/values" || id === "convex/server") return require(id);
        if (id.startsWith(".")) return load(path.resolve(path.dirname(file), `${id}.ts`));
        throw new Error(`Unexpected import ${id}`);
      },
    }, { filename: file });
    return exports;
  }
  // The original copy lives elsewhere but must resolve imports like the real file.
  return load(canonicalFile, entryFile);
}

function fixture(rows, log) {
  const records = new Map(rows.map((row) => [row._id, structuredClone(row)]));
  let actor = null;
  const ctx = {
    auth: { getUserIdentity: async () => (actor ? { subject: actor } : null) },
    scheduler: {
      runAfter: async (delay, fn, args) => { log.push(["schedule", delay, JSON.parse(JSON.stringify(fn)), args]); return "job"; },
      cancel: async (id) => { log.push(["cancelJob", id]); },
    },
    db: {
      get: async (id) => structuredClone(records.get(id) ?? null),
      insert: async (table, fields) => {
        const id = `${table}-new-${[...records.values()].filter((r) => r._table === table).length}`;
        records.set(id, { _id: id, _table: table, ...structuredClone(fields) });
        log.push(["insert", table, fields]);
        return id;
      },
      patch: async (id, fields) => {
        const row = records.get(id);
        for (const [key, value] of Object.entries(fields)) if (value === undefined) delete row[key]; else row[key] = value;
        log.push(["patch", id, Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, v === undefined ? "__undefined__" : v]))]);
      },
      delete: async (id) => { records.delete(id); log.push(["delete", id]); },
      query: (table) => {
        const conditions = [];
        const q = { eq(key, value) { conditions.push([key, value]); return q; } };
        const rowsFor = () => structuredClone([...records.values()].filter((row) => (table === "users" ? Boolean(row.stackAuthId) : row._table === table) && conditions.every(([key, value]) => row[key] === value)));
        const chain = { withIndex(_name, fn) { fn(q); return chain; }, order: () => chain, first: async () => rowsFor()[0] ?? null, unique: async () => rowsFor()[0] ?? null, take: async (count) => rowsFor().slice(0, count), collect: async () => rowsFor() };
        return chain;
      },
    },
  };
  return { ctx, as: (id) => { actor = id; } };
}

const user = (id, extra = {}) => ({ _id: id, _table: "users", tenantId: "tenant-a", stackAuthId: id, name: id, email: `${id}@example.invalid`, accountRoles: ["client"], activeRole: "client", preferredWorld: "online", onboardingContexts: [{ role: "client", world: "online", version: 1 }], ...extra });

const suites = {
  "convex/marketplace/disputes.ts": () => {
    const base = (order = {}, extra = []) => [
      user("buyer"), user("seller"), user("outsider"), user("admin", { role: "admin" }), user("foreign-admin", { role: "admin", tenantId: "tenant-b" }),
      { _id: "profile", _table: "freelancerProfiles", tenantId: "tenant-a", userId: "seller" },
      { _id: "order", _table: "orders", tenantId: "tenant-a", clientId: "buyer", freelancerId: "profile", title: "QA order", status: "in_progress", escrowStatus: "beta_no_payment", orderType: "gig", ...order },
      ...extra,
    ];
    const dispute = (extra = {}) => ({ _id: "dispute", _table: "disputes", tenantId: "tenant-a", orderId: "order", status: "open", ...extra });
    const description = "The delivered work does not match the agreed scope at all.";
    const note = "Reviewed the supplied evidence.";
    return [
      ["list as admin", base({}, [dispute(), dispute({ _id: "d2", status: "resolved" })]), "admin", "list", {}],
      ["list by status", base({}, [dispute(), dispute({ _id: "d2", status: "resolved" })]), "admin", "list", { status: "resolved" }],
      ["list as non-admin", base(), "buyer", "list", {}],
      ["getByOrder as client", base({}, [dispute()]), "buyer", "getByOrder", { orderId: "order" }],
      ["getByOrder as provider", base({}, [dispute()]), "seller", "getByOrder", { orderId: "order" }],
      ["getByOrder as outsider", base({}, [dispute()]), "outsider", "getByOrder", { orderId: "order" }],
      ["getByOrder as admin without dispute", base(), "admin", "getByOrder", { orderId: "order" }],
      ["getByOrder missing order", base(), "buyer", "getByOrder", { orderId: "missing" }],
      ["open missing order", base(), "buyer", "open", { orderId: "missing", reason: "quality", description }],
      ["open wrong status", base({ status: "cancelled" }), "buyer", "open", { orderId: "order", reason: "quality", description }],
      ["open short description", base(), "buyer", "open", { orderId: "order", reason: "quality", description: "  too short  " }],
      ["open as outsider", base(), "outsider", "open", { orderId: "order", reason: "quality", description }],
      ["open unauthenticated", base(), null, "open", { orderId: "order", reason: "quality", description }],
      ["open as client with auto release", base({ autoReleaseJobId: "release-job" }), "buyer", "open", { orderId: "order", reason: "quality", description: `  ${description}  `, evidence: [{ note: "screenshot" }] }],
      ["open as provider on paid order", base({ escrowStatus: "held", status: "delivered" }), "seller", "open", { orderId: "order", reason: "non_delivery", description }],
      ["open duplicate", base({}, [dispute()]), "buyer", "open", { orderId: "order", reason: "quality", description }],
      ["open via server for provider", base(), null, "open", { orderId: "order", reason: "quality", description, serverSecret: SECRET, openedByUserId: "seller" }],
      ["open via server default client", base(), null, "open", { orderId: "order", reason: "quality", description, serverSecret: SECRET }],
      ["open via server for outsider", base(), null, "open", { orderId: "order", reason: "quality", description, serverSecret: SECRET, openedByUserId: "outsider" }],
      ["open via server wrong secret", base(), null, "open", { orderId: "order", reason: "quality", description, serverSecret: "wrong" }],
      ["open without tenant", base({ tenantId: undefined }, [{ _id: "tenant-a", _table: "tenants" }]), "buyer", "open", { orderId: "order", reason: "quality", description }],
      ["open without any tenant", base({ tenantId: undefined }), "buyer", "open", { orderId: "order", reason: "quality", description }],
      ["resolve as non-admin", base({ status: "disputed" }, [dispute()]), "buyer", "resolve", { disputeId: "dispute", resolution: "client_wins", resolutionNote: note }],
      ["resolve missing", base({ status: "disputed" }), "admin", "resolve", { disputeId: "dispute", resolution: "client_wins", resolutionNote: note }],
      ["resolve other workspace", base({ status: "disputed" }, [dispute()]), "foreign-admin", "resolve", { disputeId: "dispute", resolution: "client_wins", resolutionNote: note }],
      ["resolve already resolved", base({ status: "disputed" }, [dispute({ status: "resolved" })]), "admin", "resolve", { disputeId: "dispute", resolution: "client_wins", resolutionNote: note }],
      ["resolve short note", base({ status: "disputed" }, [dispute()]), "admin", "resolve", { disputeId: "dispute", resolution: "client_wins", resolutionNote: " short " }],
      ["resolve unlinked", base({ status: "disputed" }, [dispute({ orderId: undefined })]), "admin", "resolve", { disputeId: "dispute", resolution: "client_wins", resolutionNote: note }],
      ["resolve inconsistent order", base({ status: "in_progress" }, [dispute()]), "admin", "resolve", { disputeId: "dispute", resolution: "client_wins", resolutionNote: note }],
      ["resolve beta for professional", base({ status: "disputed" }, [dispute()]), "admin", "resolve", { disputeId: "dispute", resolution: "freelancer_wins", resolutionNote: `  ${note}  ` }],
      ["resolve beta for client", base({ status: "disputed" }, [dispute()]), "admin", "resolve", { disputeId: "dispute", resolution: "client_wins", resolutionNote: note }],
      ["resolve paid order stays blocked", base({ status: "disputed", escrowStatus: "held" }, [dispute()]), "admin", "resolve", { disputeId: "dispute", resolution: "freelancer_wins", resolutionNote: note }],
    ];
  },
};

async function record(moduleName, sourceFile) {
  const canonical = path.join(root, moduleName);
  const output = {};
  for (const [name, rows, actor, fn, args] of suites[moduleName]()) {
    const log = [];
    const mod = loadModule(sourceFile, canonical, log);
    const f = fixture(rows, log);
    f.as(actor);
    let outcome;
    try {
      outcome = { result: await mod[fn].handler(f.ctx, args) };
    } catch (error) {
      outcome = { error: error?.message ?? String(error) };
    }
    output[name] = JSON.parse(JSON.stringify({ ...outcome, log }));
  }
  return output;
}

const recordArg = process.argv.indexOf("--record");
const golden = fs.existsSync(goldenFile) ? JSON.parse(fs.readFileSync(goldenFile, "utf8")) : {};
if (recordArg > -1) {
  const [moduleName, sourceFile] = process.argv[recordArg + 1].split("=");
  golden[moduleName] = await record(moduleName, path.resolve(sourceFile));
  fs.mkdirSync(path.dirname(goldenFile), { recursive: true });
  fs.writeFileSync(goldenFile, `${JSON.stringify(golden, null, 1)}\n`);
  console.log(`Recorded ${Object.keys(golden[moduleName]).length} scenarios for ${moduleName}.`);
} else {
  let scenarios = 0;
  for (const moduleName of Object.keys(suites)) {
    assert.ok(golden[moduleName], `No recording for ${moduleName}`);
    const actual = await record(moduleName, path.join(root, moduleName));
    assert.deepEqual(Object.keys(actual), Object.keys(golden[moduleName]), `${moduleName}: scenario list changed`);
    for (const [name, expected] of Object.entries(golden[moduleName])) {
      assert.deepEqual(actual[name], expected, `${moduleName}: "${name}" behaves differently from the original`);
      scenarios++;
    }
    const source = fs.readFileSync(path.join(root, moduleName), "utf8");
    assert.equal(/\bvar [a-z]\b|\blet [a-z] = await\b/.test(source), false, `${moduleName} still contains minified single-letter bindings`);
    console.log(`PASS ${moduleName} reproduces the original in ${Object.keys(golden[moduleName]).length} scenarios`);
  }
  console.log(`Readable Convex checks passed: ${scenarios} scenarios.`);
}
