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

function loadModule(entryFile, canonicalFile, log, options = {}) {
  const cache = new Map();
  const anyPath = (trail) => new Proxy(function () {}, { get: (_, key) => (key === "toJSON" ? () => trail : anyPath(`${trail}.${String(key)}`)) });
  // A fixed clock and a fixed random source make order numbers and timestamps reproducible.
  class FixedDate extends Date {
    constructor(...args) { super(...(args.length ? args : [NOW])); }
    static now() { return NOW; }
  }
  const fixedMath = Object.create(Math, { random: { value: () => 0.123456789 } });
  const recordingConsole = { error: (...parts) => log.push(["console.error", parts.join(" ")]), warn: () => {}, log: () => {} };
  function load(file, sourceFile = file) {
    if (cache.has(file)) return cache.get(file);
    const exports = {};
    cache.set(file, exports);
    let text = fs.readFileSync(sourceFile, "utf8");
    if (options.paidLeads && file.endsWith("leadPricing.ts")) {
      if (!text.includes("PRIVATE_BETA_FREE = true")) throw new Error("leadPricing beta flag not found");
      text = text.replace("PRIVATE_BETA_FREE = true", "PRIVATE_BETA_FREE = false");
    }
    const source = ts.transpileModule(text, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
    vm.runInNewContext(source, {
      exports, Date: FixedDate, Math: fixedMath, console: recordingConsole, Set, Map, Error, Number, Promise, JSON, Object, Array, String, Boolean, RegExp,
      process: { env: { INTERNAL_EMAIL_SECRET: SECRET } },
      require(id) {
        if (id.includes("_generated/server")) return Object.fromEntries(["query", "mutation", "internalQuery", "internalMutation", "action", "internalAction"].map((name) => [name, (config) => config]));
        if (id.includes("_generated/api")) return { api: anyPath("api"), internal: anyPath("internal"), components: anyPath("components") };
        // Paid paths are unreachable while the beta gate throws. Scenarios flagged
        // "livePayments" open the gate inside the harness only, so that code is pinned too.
        if (options.livePayments && id.endsWith("/paymentPolicy")) return { PRIVATE_BETA_FREE: false, requireLivePaymentsEnabled: () => {} };
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
    storage: {
      generateUploadUrl: async () => { log.push(["uploadUrl"]); return "https://fixture.invalid/upload"; },
      getUrl: async (id) => (records.get(id)?._table === "_storage" && !records.get(id).withoutUrl ? `https://fixture.invalid/storage/${id}` : null),
      delete: async (id) => { records.delete(id); log.push(["deleteFile", id]); },
    },
    db: {
      system: { get: async (_table, id) => { const row = records.get(id); return row?._table === "_storage" ? structuredClone(row) : null; } },
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
        let searchTerm = null;
        const q = { eq(key, value) { conditions.push([key, value]); return q; }, search(field, text) { searchTerm = [field, String(text).toLowerCase()]; return q; } };
        const rowsFor = () => structuredClone([...records.values()].filter((row) => (table === "users" ? Boolean(row.stackAuthId) : row._table === table) && conditions.every(([key, value]) => row[key] === value) && (!searchTerm || String(row[searchTerm[0]] ?? "").toLowerCase().includes(searchTerm[1]))));
        const chain = { withIndex(_name, fn) { fn(q); return chain; }, withSearchIndex(_name, fn) { fn(q); return chain; }, order: () => chain, first: async () => rowsFor()[0] ?? null, unique: async () => rowsFor()[0] ?? null, take: async (count) => rowsFor().slice(0, count), collect: async () => rowsFor() };
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

const member = (id, role, world, extra = {}) => user(id, { accountRoles: [role], activeRole: role, preferredWorld: world, onboardingContexts: [{ role, world, version: 1, completedAt: 1 }], ...extra });

suites["convex/marketplace/orders.ts"] = () => {
  const people = () => [member("buyer", "client", "online"), member("seller", "freelancer", "online"), member("outsider", "client", "online"), member("foreign", "client", "online", { tenantId: "tenant-b" })];
  const catalogue = (change = {}) => [
    { _id: "profile", _table: "freelancerProfiles", userId: "seller", tenantId: "tenant-a", providerRole: "freelancer", workType: "remote", status: "active", displayName: "Seller", ...change.profile },
    { _id: "gig", _table: "gigs", freelancerId: "profile", tenantId: "tenant-a", status: "active", workType: "remote", title: "Website design", locale: "en", ...change.gig },
    { _id: "package", _table: "gigPackages", gigId: "gig", title: "Basic", description: "Website design", price: 100, deliveryDays: 3, revisionCount: 1, ...change.pack },
  ];
  const rows = (change = {}, extra = []) => [...people(), ...catalogue(change), ...extra];
  const order = (extra = {}) => ({ _id: "order", _table: "orders", tenantId: "tenant-a", clientId: "buyer", freelancerId: "profile", orderType: "gig", gigId: "gig", gigPackageId: "package", status: "active", escrowStatus: "beta_no_payment", title: "Website design - Basic", orderNumber: "BETA-TEST", amount: 100, freelancerEarnings: 100, currency: "EUR", revisionCount: 1, revisionsUsed: 0, createdAt: 5, ...extra });
  const deliverable = { _id: "file", _table: "orderDeliverables", orderId: "order" };
  const conversation = (extra = {}) => ({ _id: "conversation", _table: "conversations", orderId: "order", participant1: "buyer", participant2: "seller", unreadCount1: 0, unreadCount2: 2, ...extra });
  const intent = "purchase-intent-0001";
  const buy = { gigId: "gig", packageId: "package", requestId: intent };
  const paid = { orderType: "gig", title: "T", amount: 100, deliveryDays: 3, clientId: "buyer", freelancerId: "profile", gigId: "gig", gigPackageId: "package" };
  const feedback = "Please adjust the header spacing and the footer links.";
  return [
    ["create wrong secret", rows(), null, "create", { ...paid, serverSecret: "wrong" }],
    ["create blocked during beta", rows(), null, "create", { ...paid, serverSecret: SECRET }],
    ["beta order success", rows(), "buyer", "createBetaGigOrder", buy],
    ["beta order with package currency and no revisions", rows({ pack: { currency: "USD", revisionCount: undefined } }), "buyer", "createBetaGigOrder", buy],
    ["beta order invalid request id", rows(), "buyer", "createBetaGigOrder", { ...buy, requestId: "short" }],
    ["beta order anonymous", rows(), null, "createBetaGigOrder", buy],
    ["beta order wrong context", [member("buyer", "client", "local"), ...people().slice(1), ...catalogue()], "buyer", "createBetaGigOrder", buy],
    ["beta order inactive service", rows({ gig: { status: "paused" } }), "buyer", "createBetaGigOrder", buy],
    ["beta order foreign package", rows({ pack: { gigId: "other-gig" } }), "buyer", "createBetaGigOrder", buy],
    ["beta order inactive profile", rows({ profile: { status: "paused" } }), "buyer", "createBetaGigOrder", buy],
    ["beta order private profile", rows({ profile: { profileVisibility: "private" } }), "buyer", "createBetaGigOrder", buy],
    ["beta order unavailable profile", rows({ profile: { isAvailable: false } }), "buyer", "createBetaGigOrder", buy],
    ["beta order seller in other workspace", [member("buyer", "client", "online"), member("seller", "freelancer", "online", { tenantId: "tenant-b" }), ...catalogue()], "buyer", "createBetaGigOrder", buy],
    ["beta order bad currency", rows({ pack: { currency: "euro" } }), "buyer", "createBetaGigOrder", buy],
    ["beta order bad price", rows({ pack: { price: -1 } }), "buyer", "createBetaGigOrder", buy],
    ["beta order bad delivery days", rows({ pack: { deliveryDays: 0 } }), "buyer", "createBetaGigOrder", buy],
    ["beta order retry returns existing", rows({}, [order({ clientRequestId: intent })]), "buyer", "createBetaGigOrder", buy],
    ["beta order request id reused for other package", rows({}, [order({ clientRequestId: intent, gigPackageId: "other" })]), "buyer", "createBetaGigOrder", buy],
    ["beta order legacy caller reuses active order", rows({}, [order()]), "buyer", "createBetaGigOrder", { gigId: "gig", packageId: "package" }],
    ["beta order legacy caller after completion", rows({}, [order({ status: "completed" })]), "buyer", "createBetaGigOrder", { gigId: "gig", packageId: "package" }],
    ["payment intent lookup found", rows({}, [order({ stripePaymentIntentId: "pi_1" })]), null, "getByStripePaymentIntentId", { stripePaymentIntentId: "pi_1", serverSecret: SECRET }],
    ["payment intent lookup missing", rows({}, [order()]), null, "getByStripePaymentIntentId", { stripePaymentIntentId: "pi_2", serverSecret: SECRET }],
    ["payment intent lookup without secret", rows({}, [order()]), "buyer", "getByStripePaymentIntentId", { stripePaymentIntentId: "pi_1" }],
    ["stripe payment update blocked", rows({}, [order()]), null, "updateStripePayment", { orderId: "order", stripePaymentIntentId: "pi_1", serverSecret: SECRET }],
    ["stripe payment update wrong secret", rows({}, [order()]), null, "updateStripePayment", { orderId: "order", stripePaymentIntentId: "pi_1", serverSecret: "wrong" }],
    ["ledger entry blocked", rows({}, [order()]), null, "createTransaction", { orderId: "order", amount: 100, currency: "EUR", serverSecret: SECRET }],
    ["orders for client", rows({}, [order(), order({ _id: "order-2", createdAt: 9, revisionsUsed: 1, deliveryVersion: 2 })]), "buyer", "getByUser", { userId: "buyer", role: "client" }],
    ["orders for provider with limit", rows({}, [order(), order({ _id: "order-2", createdAt: 9 })]), "seller", "getByUser", { userId: "seller", role: "freelancer", limit: 1 }],
    ["orders limit clamps", rows({}, [order()]), "buyer", "getByUser", { userId: "buyer", role: "client", limit: -5.5 }],
    ["orders for someone else", rows({}, [order()]), "outsider", "getByUser", { userId: "buyer", role: "client" }],
    ["order for client", rows({}, [order()]), "buyer", "getById", { orderId: "order" }],
    ["order for provider", rows({}, [order()]), "seller", "getById", { orderId: "order" }],
    ["order for outsider", rows({}, [order()]), "outsider", "getById", { orderId: "order" }],
    ["order in other workspace", rows({}, [order({ clientId: "foreign" })]), "foreign", "getById", { orderId: "order" }],
    ["order missing", rows(), "buyer", "getById", { orderId: "order" }],
    ["order anonymous", rows({}, [order()]), null, "getById", { orderId: "order" }],
    ["deliver success", rows({}, [order(), deliverable]), "seller", "deliver", { orderId: "order" }],
    ["deliver second version", rows({}, [order({ status: "revision_requested", deliveryVersion: 1 }), deliverable]), "seller", "deliver", { orderId: "order" }],
    ["deliver without files", rows({}, [order()]), "seller", "deliver", { orderId: "order" }],
    ["deliver as client", rows({}, [order(), deliverable]), "buyer", "deliver", { orderId: "order" }],
    ["deliver already delivered", rows({}, [order({ status: "delivered" }), deliverable]), "seller", "deliver", { orderId: "order" }],
    ["deliver completed order", rows({}, [order({ status: "completed" }), deliverable]), "seller", "deliver", { orderId: "order" }],
    ["deliver local order", rows({}, [order({ orderType: "local_quote" }), deliverable]), "seller", "deliver", { orderId: "order" }],
    ["deliver paid order", rows({}, [order({ escrowStatus: "held" }), deliverable]), "seller", "deliver", { orderId: "order" }],
    ["deliver disputed order", rows({}, [order({ status: "disputed" }), deliverable, { _id: "dispute", _table: "disputes", orderId: "order", status: "open" }]), "seller", "deliver", { orderId: "order" }],
    ["deliver missing order", rows(), "seller", "deliver", { orderId: "order" }],
    ["approve success", rows({}, [order({ status: "delivered", autoReleaseJobId: "release-job" })]), "buyer", "approve", { orderId: "order" }],
    ["approve with linked project", rows({}, [order({ status: "delivered", orderType: "project", projectId: "project", gigId: undefined, gigPackageId: undefined }), { _id: "project", _table: "projects", tenantId: "tenant-a", clientId: "buyer", selectedFreelancerId: "profile", status: "in_progress" }]), "buyer", "approve", { orderId: "order" }],
    ["approve already completed", rows({}, [order({ status: "completed" })]), "buyer", "approve", { orderId: "order" }],
    ["approve before delivery", rows({}, [order()]), "buyer", "approve", { orderId: "order" }],
    ["approve as provider", rows({}, [order({ status: "delivered" })]), "seller", "approve", { orderId: "order" }],
    ["approve local order", rows({}, [order({ status: "delivered", orderType: "local" })]), "buyer", "approve", { orderId: "order" }],
    ["approve paid order", rows({}, [order({ status: "delivered", escrowStatus: "held" })]), "buyer", "approve", { orderId: "order" }],
    ["revision success as participant one", rows({}, [order({ status: "delivered" }), conversation()]), "buyer", "requestRevision", { orderId: "order", message: `  ${feedback}  ` }],
    ["revision success as participant two", rows({}, [order({ status: "delivered" }), conversation({ participant1: "seller", participant2: "buyer" })]), "buyer", "requestRevision", { orderId: "order", message: feedback }],
    ["revision without conversation", rows({}, [order({ status: "delivered" })]), "buyer", "requestRevision", { orderId: "order", message: feedback }],
    ["revision long preview", rows({}, [order({ status: "delivered" }), conversation()]), "buyer", "requestRevision", { orderId: "order", message: "x".repeat(300) }],
    ["revision already requested", rows({}, [order({ status: "revision_requested" })]), "buyer", "requestRevision", { orderId: "order", message: feedback }],
    ["revision none remaining", rows({}, [order({ status: "delivered", revisionsUsed: 1 })]), "buyer", "requestRevision", { orderId: "order", message: feedback }],
    ["revision short feedback", rows({}, [order({ status: "delivered" })]), "buyer", "requestRevision", { orderId: "order", message: " short " }],
    ["revision before delivery", rows({}, [order()]), "buyer", "requestRevision", { orderId: "order", message: feedback }],
    ["revision as provider", rows({}, [order({ status: "delivered" })]), "seller", "requestRevision", { orderId: "order", message: feedback }],
    ["revision local order", rows({}, [order({ status: "delivered", orderType: "local" })]), "buyer", "requestRevision", { orderId: "order", message: feedback }],
    ...[["deliver", "seller", {}], ["approve", "buyer", {}], ["requestRevision", "buyer", { message: feedback }]].map(([fn, actor, extra]) => [
      `${fn} local order in the local context`,
      [member("buyer", "client", "local"), member("seller", "local_professional", "local"), ...catalogue({ profile: { providerRole: "local_professional", workType: "local" } }), order({ status: "delivered", orderType: "local_quote" }), deliverable],
      actor, fn, { orderId: "order", ...extra },
    ]),
    ...(() => {
      const live = { livePayments: true };
      const held = (extra = {}) => order({ status: "active", escrowStatus: "held", platformFee: 12, freelancerEarnings: 88, ...extra });
      const project = (extra = {}) => ({ _id: "project", _table: "projects", tenantId: "tenant-a", clientId: "buyer", selectedFreelancerId: "profile", status: "in_progress", title: "Brand site", currency: "USD", ...extra });
      const projectOrder = { orderType: "project", title: "T", amount: 40, deliveryDays: 5, clientId: "buyer", freelancerId: "profile", projectId: "project", serverSecret: SECRET };
      const paidGig = { ...paid, serverSecret: SECRET };
      return [
        ["paid: gig order uses package price and tiered fee", rows(), null, "create", paidGig, live],
        ...[49.99, 50, 500, 500.01, 33.33].map((price) => [`paid: fee tier boundary at ${price}`, rows({ pack: { price } }), null, "create", paidGig, live]),
        ["paid: large gig order fee tier", rows({ pack: { price: 900, currency: "GBP" } }), null, "create", paidGig, live],
        ["paid: project order small fee tier", rows({}, [project()]), null, "create", projectOrder, live],
        ["paid: unsupported order type", rows(), null, "create", { ...paidGig, orderType: "local" }, live],
        ["paid: gig and project together", rows({}, [project()]), null, "create", { ...paidGig, projectId: "project" }, live],
        ["paid: gig order without package", rows(), null, "create", { ...paidGig, gigPackageId: undefined }, live],
        ["paid: project order without project", rows(), null, "create", { ...projectOrder, projectId: undefined }, live],
        ["paid: client missing", rows(), null, "create", { ...paidGig, clientId: "ghost" }, live],
        ["paid: provider missing", rows(), null, "create", { ...paidGig, freelancerId: "ghost" }, live],
        ["paid: other workspace", rows(), null, "create", { ...paidGig, clientId: "foreign" }, live],
        ["paid: ordering from yourself", rows(), null, "create", { ...paidGig, clientId: "seller" }, live],
        ["paid: gig of another provider", rows({ gig: { freelancerId: "other" } }), null, "create", paidGig, live],
        ["paid: package of another gig", rows({ pack: { gigId: "other" } }), null, "create", paidGig, live],
        ["paid: project of another client", rows({}, [project({ clientId: "outsider" })]), null, "create", projectOrder, live],
        ["paid: project without selected provider", rows({}, [project({ selectedFreelancerId: undefined })]), null, "create", projectOrder, live],
        ["paid: project with another provider", rows({}, [project({ selectedFreelancerId: "other" })]), null, "create", projectOrder, live],
        ["paid: payment reconciled from pending", rows({}, [held({ status: "pending" })]), null, "updateStripePayment", { orderId: "order", stripePaymentIntentId: "pi_1", requirements: "Logo files", serverSecret: SECRET }, live],
        ["paid: payment reconciled when already active", rows({}, [held()]), null, "updateStripePayment", { orderId: "order", stripePaymentIntentId: "pi_1", serverSecret: SECRET }, live],
        ["paid: payment for completed order", rows({}, [held({ status: "completed" })]), null, "updateStripePayment", { orderId: "order", stripePaymentIntentId: "pi_1", serverSecret: SECRET }, live],
        ["paid: payment for missing order", rows(), null, "updateStripePayment", { orderId: "order", stripePaymentIntentId: "pi_1", serverSecret: SECRET }, live],
        ["paid: ledger entry", rows({}, [held()]), null, "createTransaction", { orderId: "order", payerId: "buyer", payeeId: "seller", amount: 100, platformFee: 12, currency: "EUR", stripePaymentIntentId: "pi_1", description: "Order payment", serverSecret: SECRET }, live],
        ["paid: ledger entry for missing order", rows(), null, "createTransaction", { orderId: "order", amount: 100, currency: "EUR", serverSecret: SECRET }, live],
        ["paid: delivery schedules auto release", rows({}, [held(), deliverable]), "seller", "deliver", { orderId: "order" }, live],
        ["paid: approval releases and rewards", rows({}, [held({ status: "delivered", autoReleaseJobId: "release-job" })]), "buyer", "approve", { orderId: "order" }, live],
        ["paid: transfer recorded", rows({}, [held({ status: "delivered" })]), null, "markReleased", { orderId: "order", stripeTransferId: "tr_1" }, live],
        ["paid: transfer recorded twice with same id", rows({}, [held({ escrowStatus: "released", stripeTransferId: "tr_1" })]), null, "markReleased", { orderId: "order", stripeTransferId: "tr_1" }, live],
        ["paid: transfer conflicts with earlier transfer", rows({}, [held({ escrowStatus: "released", stripeTransferId: "tr_0" })]), null, "markReleased", { orderId: "order", stripeTransferId: "tr_1" }, live],
        ["paid: transfer completes linked project", rows({}, [held({ orderType: "project", projectId: "project" }), project()]), null, "markReleased", { orderId: "order", stripeTransferId: "tr_1" }, live],
        ["paid: transfer with cancelled project", rows({}, [held({ orderType: "project", projectId: "project" }), project({ status: "cancelled" })]), null, "markReleased", { orderId: "order", stripeTransferId: "tr_1" }, live],
        ["paid: transfer with mismatching project is logged", rows({}, [held({ orderType: "project", projectId: "project" }), project({ clientId: "outsider" })]), null, "markReleased", { orderId: "order", stripeTransferId: "tr_1" }, live],
        ["paid: transfer with missing project is logged", rows({}, [held({ orderType: "project", projectId: "project" })]), null, "markReleased", { orderId: "order", stripeTransferId: "tr_1" }, live],
        ["paid: transfer with open project is logged", rows({}, [held({ orderType: "project", projectId: "project" }), project({ status: "open" })]), null, "markReleased", { orderId: "order", stripeTransferId: "tr_1" }, live],
        ["paid: transfer for missing order", rows(), null, "markReleased", { orderId: "order", stripeTransferId: "tr_1" }, live],
        ["paid: refund recorded", rows({}, [held()]), null, "markRefunded", { orderId: "order" }, live],
      ];
    })(),
    ["internal order lookup", rows({}, [order()]), null, "getByIdInternal", { orderId: "order" }],
    ["transfer reconciliation blocked", rows({}, [order()]), null, "markReleased", { orderId: "order", stripeTransferId: "tr_1" }],
    ["refund reconciliation blocked", rows({}, [order()]), null, "markRefunded", { orderId: "order" }],
  ];
};

suites["convex/marketplace/freelancers.ts"] = () => {
  const online = (id, extra = {}) => ({ _id: id, _table: "freelancerProfiles", _creationTime: 1, userId: "seller", tenantId: "tenant-a", providerRole: "freelancer", workType: "remote", status: "active", profileVisibility: "public", displayName: "Ada Writer", slug: "ada-writer", bio: "Technical writer for developer tools", skills: ["Docs", "API"], locale: "en", ratingAverage: 4.5, createdAt: 1, updatedAt: 1, stripeAccountId: "acct_private", creditBalance: 7, totalEarnings: 900, ...extra });
  const local = (id, extra = {}) => online(id, { userId: "plumber", providerRole: "local_professional", workType: "local", displayName: "Rotterdam Plumbing", slug: "rotterdam-plumbing", tagline: "Leaks and boilers", bio: "Emergency plumbing", skills: ["Plumbing"], locationCity: "Rotterdam", locationPostcode: "3011 AB", locationCountry: "Netherlands", isVerified: true, verificationDate: 5, serviceRadiusKm: 25, ...extra });
  const people = () => [member("seller", "freelancer", "online"), member("plumber", "local_professional", "local"), member("outsider", "client", "online"), member("admin", "client", "online", { role: "admin" }), member("reviewer", "client", "online", { avatar: "/a.png" })];
  const directory = () => [
    ...people(),
    online("p-top", { isVerified: true, ratingAverage: 4.1, displayName: "Top Verified", slug: "top-verified" }),
    online("p-high", { ratingAverage: 4.9, displayName: "High Rated", slug: "high-rated" }),
    online("p-private", { profileVisibility: "private", ratingAverage: 5, displayName: "Hidden", slug: "hidden" }),
    online("p-nl", { locale: "nl", displayName: "Dutch Writer", slug: "dutch-writer" }),
    online("p-paused", { status: "paused", displayName: "Paused", slug: "paused" }),
    local("l-featured", { featured: true, isVerified: false, ratingAverage: 3 }),
    local("l-verified", { displayName: "Den Haag Électricien", slug: "den-haag-electricien", tagline: "Wiring", bio: "Electrical work", skills: ["Electrician"], locationCity: "Den Haag", locationPostcode: "2511 CV", ratingAverage: 4 }),
    local("l-private", { profileVisibility: "private", displayName: "Hidden Local", slug: "hidden-local" }),
  ];
  const review = (id, extra = {}) => ({ _id: id, _table: "marketplaceReviews", _creationTime: 2, revieweeId: "seller", reviewerId: "reviewer", reviewerRole: "client", overallRating: 5, qualityRating: 5, content: "Great work", isPublic: true, createdAt: 3, updatedAt: 3, privateNote: "internal", ...extra });
  const image = (id, extra = {}) => ({ _id: id, _table: "_storage", contentType: "image/png", size: 2048, ...extra });
  const one = (profile, extra = []) => [...people(), profile, ...extra];
  return [
    ["list default", directory(), null, "list", {}],
    ["list by locale", directory(), null, "list", { locale: "nl" }],
    ["list limit cuts before the privacy filter", directory(), null, "list", { limit: 1 }],
    ["list limit clamps", directory(), null, "list", { limit: 0 }],
    ["local list default", directory(), null, "listLocal", {}],
    ["local list by query with accents", directory(), null, "listLocal", { query: "  ELECTRICIEN wiring " }],
    ["local list by postcode without space", directory(), null, "listLocal", { location: "3011ab" }],
    ["local list by short location", directory(), null, "listLocal", { location: "ha" }],
    ["local list two-character compact location does not match", directory(), null, "listLocal", { location: "1a" }],
    ["local list three-character compact location matches", directory(), null, "listLocal", { location: "11a" }],
    ["local list no match", directory(), null, "listLocal", { query: "roofing" }],
    ["local list by locale and limit", directory(), null, "listLocal", { locale: "en", limit: 1 }],
    ["own profile", one(online("p1")), "seller", "getByUserId", { userId: "seller" }],
    ["own local profile by active role", one(local("l1")), "plumber", "getByUserId", { userId: "plumber" }],
    ["own profile explicit role without match", one(online("p1")), "seller", "getByUserId", { userId: "seller", providerRole: "local_professional" }],
    ["someone else's profile", one(online("p1")), "outsider", "getByUserId", { userId: "seller" }],
    ["public profile by id", one(online("p1")), null, "getById", { profileId: "p1" }],
    ["private profile by id", one(online("p1", { profileVisibility: "private" })), null, "getById", { profileId: "p1" }],
    ["local profile through online lookup", one(local("l1")), null, "getById", { profileId: "l1" }],
    ["missing profile by id", people(), null, "getById", { profileId: "p1" }],
    ["public profile by slug", one(online("p1")), null, "getBySlug", { slug: "ada-writer" }],
    ["unknown slug", one(online("p1")), null, "getBySlug", { slug: "nobody" }],
    ["local profile by id", one(local("l1")), null, "getLocalById", { profileId: "l1" }],
    ["online profile through local lookup", one(online("p1")), null, "getLocalById", { profileId: "p1" }],
    ["local profile by slug", one(local("l1")), null, "getLocalBySlug", { slug: "rotterdam-plumbing" }],
    ["search by bio", directory(), null, "search", { query: "technical" }],
    ["update text fields keeps slug", one(online("p1")), "seller", "updateProfile", { profileId: "p1", tagline: "Docs that ship", hourlyRate: 80, skills: ["Docs"] }],
    ["update display name regenerates slug", one(online("p1")), "seller", "updateProfile", { profileId: "p1", displayName: "Ada L. Writer!" }],
    ["update display name with taken slug", one(online("p1"), [online("p2", { userId: "outsider", slug: "grace-hopper", displayName: "Grace Hopper" })]), "seller", "updateProfile", { profileId: "p1", displayName: "Grace Hopper" }],
    ["update symbols-only name falls back", one(online("p1")), "seller", "updateProfile", { profileId: "p1", displayName: "***" }],
    ["update adds missing slug", one(online("p1", { slug: undefined })), "seller", "updateProfile", { profileId: "p1", bio: "New bio" }],
    ["update local location resets verification", one(local("l1")), "plumber", "updateProfile", { profileId: "l1", locationCity: "Delft" }],
    ["update local same location keeps verification", one(local("l1")), "plumber", "updateProfile", { profileId: "l1", locationCity: "Rotterdam", tagline: "Boilers" }],
    ["update local unverified location", one(local("l1", { isVerified: false })), "plumber", "updateProfile", { profileId: "l1", serviceRadiusKm: 40 }],
    ["update local location when verification was never set", one(local("l1", { isVerified: undefined, verificationDate: undefined })), "plumber", "updateProfile", { profileId: "l1", locationCity: "Delft" }],
    ["update legacy local profile without provider role resets verification", one(local("l1", { providerRole: undefined })), "plumber", "updateProfile", { profileId: "l1", latitude: 52.01 }],
    ["update online location keeps verification", one(online("p1", { isVerified: true, verificationDate: 5 })), "seller", "updateProfile", { profileId: "p1", locationCity: "Utrecht" }],
    ["update bad radius", one(local("l1")), "plumber", "updateProfile", { profileId: "l1", serviceRadiusKm: 0 }],
    ["update fractional radius", one(local("l1")), "plumber", "updateProfile", { profileId: "l1", serviceRadiusKm: 2.5 }],
    ["update bad latitude", one(local("l1")), "plumber", "updateProfile", { profileId: "l1", latitude: 91 }],
    ["update bad longitude", one(local("l1")), "plumber", "updateProfile", { profileId: "l1", longitude: -181 }],
    ["update someone else's profile", one(online("p1")), "outsider", "updateProfile", { profileId: "p1", bio: "x" }],
    ["update in the wrong account mode", [member("seller", "client", "online"), online("p1")], "seller", "updateProfile", { profileId: "p1", bio: "x" }],
    ["update missing profile", people(), "seller", "updateProfile", { profileId: "p1", bio: "x" }],
    ["update anonymous", one(online("p1")), null, "updateProfile", { profileId: "p1", bio: "x" }],
    ["avatar upload url", people(), "seller", "generateAvatarUploadUrl", {}],
    ["avatar upload url anonymous", people(), null, "generateAvatarUploadUrl", {}],
    ["cover upload url", people(), "seller", "generateCoverUploadUrl", {}],
    ["cover upload url anonymous", people(), null, "generateCoverUploadUrl", {}],
    ["save avatar", one(online("p1"), [image("file")]), "seller", "saveAvatarStorageId", { profileId: "p1", storageId: "file" }],
    ["save avatar wrong type", one(online("p1"), [image("file", { contentType: "application/pdf" })]), "seller", "saveAvatarStorageId", { profileId: "p1", storageId: "file" }],
    ["save avatar too large", one(online("p1"), [image("file", { size: 6 * 1024 * 1024 })]), "seller", "saveAvatarStorageId", { profileId: "p1", storageId: "file" }],
    ["save avatar already attached", one(online("p1"), [image("file"), { _id: "asset", _table: "fileAssets", storageId: "file", ownerId: "seller" }]), "seller", "saveAvatarStorageId", { profileId: "p1", storageId: "file" }],
    ["save avatar of another account", one(online("p1"), [image("file"), { _id: "asset", _table: "fileAssets", storageId: "file", ownerId: "outsider" }]), "seller", "saveAvatarStorageId", { profileId: "p1", storageId: "file" }],
    ["save avatar without url", one(online("p1"), [image("file", { withoutUrl: true })]), "seller", "saveAvatarStorageId", { profileId: "p1", storageId: "file" }],
    ["save avatar on someone else's profile", one(online("p1"), [image("file")]), "outsider", "saveAvatarStorageId", { profileId: "p1", storageId: "file" }],
    ["save avatar missing profile", [...people(), image("file")], "seller", "saveAvatarStorageId", { profileId: "p1", storageId: "file" }],
    ["save cover", one(local("l1"), [image("file", { size: 8 * 1024 * 1024 })]), "plumber", "saveCoverStorageId", { profileId: "l1", storageId: "file" }],
    ["save cover too large", one(local("l1"), [image("file", { size: 11 * 1024 * 1024 })]), "plumber", "saveCoverStorageId", { profileId: "l1", storageId: "file" }],
    ["save cover wrong account mode", [member("plumber", "client", "local"), local("l1"), image("file")], "plumber", "saveCoverStorageId", { profileId: "l1", storageId: "file" }],
    ["payout account by server", one(online("p1")), null, "updateStripeAccount", { userId: "seller", stripeAccountId: "acct_new", serverSecret: SECRET }],
    ["payout account picks the first of two profiles", one(online("p1"), [local("l-second", { userId: "seller" })]), null, "updateStripeAccount", { userId: "seller", stripeAccountId: "acct_new", serverSecret: SECRET }],
    ["payout account by signed-in owner", one(online("p1")), "seller", "updateStripeAccount", { userId: "seller", stripeAccountId: "acct_new" }],
    ["payout account wrong secret", one(online("p1")), null, "updateStripeAccount", { userId: "seller", stripeAccountId: "acct_new", serverSecret: "wrong" }],
    ["payout account without profile", people(), null, "updateStripeAccount", { userId: "outsider", stripeAccountId: "acct_new", serverSecret: SECRET }],
    ["onboarding complete by server", one(online("p1")), null, "setOnboardingComplete", { userId: "seller", serverSecret: SECRET }],
    ["onboarding complete without secret", one(online("p1")), "seller", "setOnboardingComplete", { userId: "seller" }],
    ["onboarding complete without profile", people(), null, "setOnboardingComplete", { userId: "outsider", serverSecret: SECRET }],
    ["reviews public only", one(online("p1"), [review("r1"), review("r2", { isPublic: false }), review("r3", { reviewerId: undefined, overallRating: 3 })]), null, "getReviews", { freelancerId: "p1" }],
    ["reviews limit", one(online("p1"), [review("r1"), review("r2"), review("r3")]), null, "getReviews", { freelancerId: "p1", limit: 2 }],
    ["reviews limit clamps", one(online("p1"), [review("r1"), review("r2")]), null, "getReviews", { freelancerId: "p1", limit: 0 }],
    ["reviews of a private profile", one(online("p1", { profileVisibility: "private" }), [review("r1")]), null, "getReviews", { freelancerId: "p1" }],
    ["internal profile lookup", one(online("p1")), null, "getProfileById", { profileId: "p1" }],
    ["backfill slugs as admin", [...people(), online("p1", { slug: undefined }), online("p2", { slug: undefined, displayName: "Ada Writer" }), online("p3")], "admin", "backfillSlugs", {}],
    ["backfill slugs by server", [...people(), online("p1", { slug: undefined, displayName: "Ünïcode Näme" })], null, "backfillSlugs", { serverSecret: SECRET }],
    ["backfill slugs as member", one(online("p1", { slug: undefined })), "seller", "backfillSlugs", {}],
    ["backfill slugs wrong secret", one(online("p1", { slug: undefined })), null, "backfillSlugs", { serverSecret: "wrong" }],
  ];
};

const localPeople = () => [
  member("buyer", "client", "local"), member("plumber", "local_professional", "local"), member("rival", "local_professional", "local"),
  member("stranger", "client", "local"), member("admin", "local_professional", "local", { role: "admin" }), member("foreign", "local_professional", "local", { tenantId: "tenant-b" }),
];
const localProfile = (id, userId, extra = {}) => ({ _id: id, _table: "freelancerProfiles", userId, tenantId: "tenant-a", providerRole: "local_professional", workType: "local", status: "active", isVerified: true, displayName: `${userId} services`, locationCity: "Rotterdam", locationPostcode: "3011 AB", locationCountry: "Nederland", creditBalance: 10, ratingAverage: 4.5, ratingCount: 8, ...extra });
const localRequest = (extra = {}) => ({ _id: "request", _table: "quoteRequests", tenantId: "tenant-a", clientId: "buyer", categoryId: "category", title: "Fix a leaking kitchen tap", description: "The kitchen mixer tap drips constantly and the cabinet below is getting wet.", locationCity: "Rotterdam", locationPostcode: "3011AB", locationCountry: "Netherlands", budgetIndication: "< €500", preferredDate: 1_800_100_000_000, status: "open", quoteCount: 0, createdAt: 10, updatedAt: 10, ...extra });
const localCategory = (extra = {}) => ({ _id: "category", _table: "marketplaceCategories", tenantId: "tenant-a", name: "Plumbing", serviceType: "local", ...extra });

suites["convex/marketplace/leads.ts"] = () => {
  const world = (change = {}, extra = []) => [...localPeople(), localCategory(), localProfile("profile", "plumber", change.profile), localProfile("rival-profile", "rival"), localRequest(change.request), ...extra];
  const claim = (id, freelancerId, extra = {}) => ({ _id: id, _table: "leadClaims", quoteRequestId: "request", freelancerId, creditsSpent: 0, claimType: "shared", claimedAt: 20, ...extra });
  const shared = { quoteRequestId: "request", claimType: "shared" };
  const exclusive = { quoteRequestId: "request", claimType: "exclusive" };
  const paid = { paidLeads: true };
  const budgets = [undefined, "< €500", "€500 - €2,000", "€500-2000", "> €2,000", "€2,000+", "Not sure yet", "€250"];
  return [
    ["credits for professional", world(), "plumber", "getMyCredits", {}],
    ["credits without profile", localPeople(), "stranger", "getMyCredits", {}],
    ["credits anonymous", world(), null, "getMyCredits", {}],
    ["credit history", world({}, [{ _id: "t1", _table: "creditTransactions", freelancerId: "plumber", amount: 5, type: "purchase" }, { _id: "t2", _table: "creditTransactions", freelancerId: "rival", amount: 9, type: "purchase" }]), "plumber", "getMyTransactions", {}],
    ["credit history limit clamps", world({}, [{ _id: "t1", _table: "creditTransactions", freelancerId: "plumber", amount: 5 }, { _id: "t2", _table: "creditTransactions", freelancerId: "plumber", amount: -2 }]), "plumber", "getMyTransactions", { limit: 0 }],
    ["credit history anonymous", world(), null, "getMyTransactions", {}],
    ["claims with request, client contact and category", world({}, [claim("c1", "profile")]), "plumber", "getMyClaims", {}],
    ["claims with deleted request", [...localPeople(), localProfile("profile", "plumber"), claim("c1", "profile")], "plumber", "getMyClaims", {}],
    ["claims with deleted client and category", [member("plumber", "local_professional", "local"), localProfile("profile", "plumber"), localRequest(), claim("c1", "profile")], "plumber", "getMyClaims", {}],
    ["claims without profile", localPeople(), "stranger", "getMyClaims", {}],
    ["claims anonymous", world(), null, "getMyClaims", {}],
    ["lead status for eligible professional", world(), "plumber", "getLeadStatus", { quoteRequestId: "request" }],
    ["lead status anonymous", world(), null, "getLeadStatus", { quoteRequestId: "request" }],
    ["lead status missing request", localPeople(), "plumber", "getLeadStatus", { quoteRequestId: "request" }],
    ["lead status already claimed", world({ request: { claimedSlots: 1 } }, [claim("c1", "profile")]), "plumber", "getLeadStatus", { quoteRequestId: "request" }],
    ["lead status exclusive", world({ request: { isExclusive: true, claimedSlots: 1, maxSlots: 1 } }, [claim("c1", "rival-profile", { claimType: "exclusive" })]), "plumber", "getLeadStatus", { quoteRequestId: "request" }],
    ["lead status custom slots", world({ request: { maxSlots: 5, claimedSlots: 2 } }), "plumber", "getLeadStatus", { quoteRequestId: "request" }],
    ["lead status for admin", world({}, [localProfile("admin-profile", "admin")]), "admin", "getLeadStatus", { quoteRequestId: "request" }],
    ["lead status for client", world(), "buyer", "getLeadStatus", { quoteRequestId: "request" }],
    ["lead status unverified", world({ profile: { isVerified: false } }), "plumber", "getLeadStatus", { quoteRequestId: "request" }],
    ["lead status when verification was never set", world({ profile: { isVerified: undefined } }), "plumber", "getLeadStatus", { quoteRequestId: "request" }],
    ["lead status inactive profile", world({ profile: { status: "paused" } }), "plumber", "getLeadStatus", { quoteRequestId: "request" }],
    ["lead status remote work type", world({ profile: { workType: "remote" } }), "plumber", "getLeadStatus", { quoteRequestId: "request" }],
    ["lead status hybrid work type", world({ profile: { workType: "hybrid" } }), "plumber", "getLeadStatus", { quoteRequestId: "request" }],
    ["lead status outside area by city", world({ profile: { locationCity: "Groningen", locationPostcode: "9711 AA" } }), "plumber", "getLeadStatus", { quoteRequestId: "request" }],
    ["lead status matched by postcode only", world({ profile: { locationCity: "Schiedam", locationPostcode: "3011-ab" } }), "plumber", "getLeadStatus", { quoteRequestId: "request" }],
    ["lead status other country", world({ profile: { locationCountry: "Belgique" } }), "plumber", "getLeadStatus", { quoteRequestId: "request" }],
    ["lead status missing country", world({ profile: { locationCountry: undefined } }), "plumber", "getLeadStatus", { quoteRequestId: "request" }],
    ["lead status inside radius", world({ profile: { latitude: 51.92, longitude: 4.48, serviceRadiusKm: 15, locationCity: "Elsewhere", locationPostcode: "0000" }, request: { latitude: 51.95, longitude: 4.55 } }), "plumber", "getLeadStatus", { quoteRequestId: "request" }],
    ["lead status outside radius", world({ profile: { latitude: 51.92, longitude: 4.48, serviceRadiusKm: 5 }, request: { latitude: 52.37, longitude: 4.9 } }), "plumber", "getLeadStatus", { quoteRequestId: "request" }],
    ["lead status zero radius falls back to city", world({ profile: { latitude: 51.92, longitude: 4.48, serviceRadiusKm: 0 }, request: { latitude: 52.37, longitude: 4.9 } }), "plumber", "getLeadStatus", { quoteRequestId: "request" }],
    ["lead status request in other workspace", world({ request: { tenantId: "tenant-b" } }), "plumber", "getLeadStatus", { quoteRequestId: "request" }],
    ...budgets.map((budget) => [`paid lead prices for budget ${budget ?? "none"}`, world({ request: { budgetIndication: budget } }), "plumber", "getLeadStatus", { quoteRequestId: "request" }, paid]),
    ["shared claim during beta", world(), "plumber", "claimLead", shared],
    ["exclusive claim during beta", world(), "plumber", "claimLead", exclusive],
    ["second shared claim", world({ request: { claimedSlots: 1 } }, [claim("c1", "rival-profile")]), "plumber", "claimLead", shared],
    ["shared claim with all slots taken", world({ request: { claimedSlots: 3 } }), "plumber", "claimLead", shared],
    ["shared claim with custom slots", world({ request: { claimedSlots: 3, maxSlots: 4 } }), "plumber", "claimLead", shared],
    ["shared claim on exclusive lead", world({ request: { isExclusive: true, claimedSlots: 1, maxSlots: 1 } }), "plumber", "claimLead", shared],
    ["exclusive claim after another claim", world({ request: { claimedSlots: 1 } }, [claim("c1", "rival-profile")]), "plumber", "claimLead", exclusive],
    ["claim twice", world({ request: { claimedSlots: 1 } }, [claim("c1", "profile")]), "plumber", "claimLead", shared],
    ["claim closed request", world({ request: { status: "accepted" } }), "plumber", "claimLead", shared],
    ["claim missing request", localPeople(), "plumber", "claimLead", shared],
    ["claim as admin", world({}, [localProfile("admin-profile", "admin")]), "admin", "claimLead", shared],
    ["claim as client", world(), "buyer", "claimLead", shared],
    ["claim anonymous", world(), null, "claimLead", shared],
    ["claim unverified", world({ profile: { isVerified: false } }), "plumber", "claimLead", shared],
    ["claim when verification was never set", world({ profile: { isVerified: undefined } }), "plumber", "claimLead", shared],
    ["claim outside area", world({ profile: { locationCity: "Groningen", locationPostcode: "9711 AA" } }), "plumber", "claimLead", shared],
    ["claim without profile", [...localPeople(), localCategory(), localRequest()], "plumber", "claimLead", shared],
    ["claim from another workspace", [...localPeople(), localCategory(), localProfile("foreign-profile", "foreign", { tenantId: "tenant-b" }), localRequest()], "foreign", "claimLead", shared],
    ["paid shared claim spends credits", world(), "plumber", "claimLead", shared, paid],
    ["paid exclusive claim costs double", world({ request: { budgetIndication: "> €2,000" } }, []), "plumber", "claimLead", exclusive, { paidLeads: true }],
    ["paid claim with too few credits", world({ profile: { creditBalance: 1 } }), "plumber", "claimLead", shared, paid],
    ["paid claim with missing balance", world({ profile: { creditBalance: undefined } }), "plumber", "claimLead", shared, paid],
    // Credit top-up was deliberately changed on 2026-09-19 (verified, idempotent,
    // gated). These scenarios were re-recorded from the new implementation.
    ["top-up blocked during beta", world(), null, "addCredits", { freelancerUserId: "plumber", packageId: "popular", stripeSessionId: "cs_test_a1B2c3D4e5", paymentStatus: "paid", amountTotalCents: 4500, currency: "eur", serverSecret: SECRET }],
    ["top-up wrong secret", world(), null, "addCredits", { ...{ freelancerUserId: "plumber", packageId: "popular", stripeSessionId: "cs_test_a1B2c3D4e5", paymentStatus: "paid", amountTotalCents: 4500, currency: "eur", serverSecret: SECRET }, serverSecret: "wrong" }],
    ["top-up by signed-in user", world(), "plumber", "addCredits", { ...{ freelancerUserId: "plumber", packageId: "popular", stripeSessionId: "cs_test_a1B2c3D4e5", paymentStatus: "paid", amountTotalCents: 4500, currency: "eur", serverSecret: SECRET }, serverSecret: undefined }],
    ["paid: top-up credits the package", world(), null, "addCredits", { freelancerUserId: "plumber", packageId: "popular", stripeSessionId: "cs_test_a1B2c3D4e5", paymentStatus: "paid", amountTotalCents: 4500, currency: "eur", serverSecret: SECRET }, { livePayments: true }],
    ["paid: top-up replay credits nothing", world({}, [{ _id: "purchase", _table: "creditPurchases", stripeSessionId: "cs_test_a1B2c3D4e5", freelancerUserId: "plumber", packageId: "popular", credits: 10 }]), null, "addCredits", { freelancerUserId: "plumber", packageId: "popular", stripeSessionId: "cs_test_a1B2c3D4e5", paymentStatus: "paid", amountTotalCents: 4500, currency: "eur", serverSecret: SECRET }, { livePayments: true }],
    ["paid: top-up with wrong amount", world(), null, "addCredits", { ...{ freelancerUserId: "plumber", packageId: "popular", stripeSessionId: "cs_test_a1B2c3D4e5", paymentStatus: "paid", amountTotalCents: 4500, currency: "eur", serverSecret: SECRET }, amountTotalCents: 4499 }, { livePayments: true }],
    ["paid: top-up unpaid", world(), null, "addCredits", { ...{ freelancerUserId: "plumber", packageId: "popular", stripeSessionId: "cs_test_a1B2c3D4e5", paymentStatus: "paid", amountTotalCents: 4500, currency: "eur", serverSecret: SECRET }, paymentStatus: "unpaid" }, { livePayments: true }],
    ["paid: top-up without profile", localPeople(), null, "addCredits", { ...{ freelancerUserId: "plumber", packageId: "popular", stripeSessionId: "cs_test_a1B2c3D4e5", paymentStatus: "paid", amountTotalCents: 4500, currency: "eur", serverSecret: SECRET }, freelancerUserId: "stranger" }, { livePayments: true }],
  ];
};

suites["convex/marketplace/quotes.ts"] = () => {
  const claim = (freelancerId) => ({ _id: `claim-${freelancerId}`, _table: "leadClaims", quoteRequestId: "request", freelancerId, claimType: "shared", claimedAt: 20 });
  const quote = (id, freelancerId, extra = {}) => ({ _id: id, _table: "quotes", quoteRequestId: "request", freelancerId, amount: 180, currency: "EUR", description: "Replace the cartridge and reseal the tap base.", estimatedDays: 1, status: "pending", createdAt: 30, updatedAt: 30, ...extra });
  const world = (change = {}, extra = []) => [...localPeople(), localCategory(change.category), localProfile("profile", "plumber", change.profile), localProfile("rival-profile", "rival", { avatarUrl: "/rival.png", tagline: "Fast" }), localRequest(change.request), ...extra];
  const newRequest = { categoryId: "category", title: "  Replace bathroom extractor fan  ", description: "  The extractor fan in the bathroom stopped working and needs to be replaced this month.  ", locationCity: " Rotterdam ", locationPostcode: " 3011 AB ", budgetIndication: "< €500", preferredDate: 1_800_200_000_000, photos: [{ id: "p1" }] };
  const newQuote = { quoteRequestId: "request", amount: 180, currency: "EUR", description: "  Replace the cartridge and reseal the tap base.  ", estimatedDays: 1, validUntil: 1_800_300_000_000 };
  const accepted = (extra = []) => world({ request: { status: "accepted" } }, [quote("q1", "profile", { status: "accepted" }), { _id: "order", _table: "orders", tenantId: "tenant-a", clientId: "buyer", quoteRequestId: "request", quoteId: "q1", freelancerId: "profile", orderType: "local_quote" }, ...extra]);
  return [
    ["open requests", world({}, [localRequest({ _id: "request-2", status: "accepted" }), localRequest({ _id: "request-3", categoryId: "gone", title: "Paint a hallway" })]), null, "listRequests", {}],
    ["open requests limit clamps", world({}, [localRequest({ _id: "request-3", title: "Paint a hallway" })]), null, "listRequests", { limit: 0 }],
    ["public request", world(), null, "getRequestById", { requestId: "request" }],
    ["public request closed", world({ request: { status: "accepted" } }), null, "getRequestById", { requestId: "request" }],
    ["public request missing", localPeople(), null, "getRequestById", { requestId: "request" }],
    ["participant view for owner with quotes", world({}, [claim("profile"), quote("q1", "profile"), quote("q2", "rival-profile"), quote("q3", "ghost-profile")]), "buyer", "getParticipantRequestById", { requestId: "request" }],
    ["participant view for claimer with own quote", world({}, [claim("profile"), quote("q1", "profile"), quote("q2", "rival-profile")]), "plumber", "getParticipantRequestById", { requestId: "request" }],
    ["participant view for claimer without quote", world({}, [claim("profile")]), "plumber", "getParticipantRequestById", { requestId: "request" }],
    ["participant view for professional without claim", world(), "plumber", "getParticipantRequestById", { requestId: "request" }],
    ["participant view for stranger", world(), "stranger", "getParticipantRequestById", { requestId: "request" }],
    ["participant view missing request", localPeople(), "buyer", "getParticipantRequestById", { requestId: "request" }],
    ["participant view anonymous", world(), null, "getParticipantRequestById", { requestId: "request" }],
    ["create request", world(), "buyer", "createRequest", newRequest],
    ["create request by postcode only with coordinates", world(), "buyer", "createRequest", { ...newRequest, locationCity: undefined, latitude: 51.92, longitude: 4.48, locationCountry: "nl" }],
    ["create request in hybrid category", world({ category: { serviceType: "hybrid" } }), "buyer", "createRequest", newRequest],
    ["create request in category without service type", world({ category: { serviceType: undefined } }), "buyer", "createRequest", newRequest],
    ...[[7, 40], [8, 40], [120, 40], [121, 40], [8, 39], [8, 5000], [8, 5001]].map(([titleLength, descriptionLength]) => [`create request with title ${titleLength} and description ${descriptionLength} characters`, world(), "buyer", "createRequest", { ...newRequest, title: "t".repeat(titleLength), description: "d".repeat(descriptionLength) }]),
    ...[[2, 20], [100, 20], [101, 20]].map(([cityLength, postcodeLength]) => [`create request with city ${cityLength} and postcode ${postcodeLength} characters`, world(), "buyer", "createRequest", { ...newRequest, locationCity: "c".repeat(cityLength), locationPostcode: "9".repeat(postcodeLength) }]),
    ["create request short title", world(), "buyer", "createRequest", { ...newRequest, title: " Fan " }],
    ["create request short description", world(), "buyer", "createRequest", { ...newRequest, description: "Too short" }],
    ["create request without location", world(), "buyer", "createRequest", { ...newRequest, locationCity: "  ", locationPostcode: undefined }],
    ["create request short city", world(), "buyer", "createRequest", { ...newRequest, locationCity: "R" }],
    ["create request long postcode", world(), "buyer", "createRequest", { ...newRequest, locationPostcode: "1".repeat(21) }],
    ["create request outside the Netherlands", world(), "buyer", "createRequest", { ...newRequest, locationCountry: "Belgium" }],
    ["create request bad latitude", world(), "buyer", "createRequest", { ...newRequest, latitude: -91 }],
    ["create request bad longitude", world(), "buyer", "createRequest", { ...newRequest, longitude: 181 }],
    ["create request online category", world({ category: { serviceType: "online" } }), "buyer", "createRequest", newRequest],
    ["create request category in other workspace", world({ category: { tenantId: "tenant-b" } }), "buyer", "createRequest", newRequest],
    ["create request missing category", [...localPeople()], "buyer", "createRequest", newRequest],
    ["create request as professional", world(), "plumber", "createRequest", newRequest],
    ["create request anonymous", world(), null, "createRequest", newRequest],
    ["submit quote", world({}, [claim("profile")]), "plumber", "submitQuote", newQuote],
    ["submit quote increments existing count", world({ request: { quoteCount: 2 } }, [claim("profile")]), "plumber", "submitQuote", { ...newQuote, currency: undefined }],
    ["submit quote without claim", world(), "plumber", "submitQuote", newQuote],
    ["submit quote twice", world({}, [claim("profile"), quote("q1", "profile")]), "plumber", "submitQuote", newQuote],
    ["submit quote closed request", world({ request: { status: "accepted" } }, [claim("profile")]), "plumber", "submitQuote", newQuote],
    ["submit quote missing request", [...localPeople(), localProfile("profile", "plumber")], "plumber", "submitQuote", newQuote],
    ["submit quote own request", world({ request: { clientId: "plumber" } }, [claim("profile")]), "plumber", "submitQuote", newQuote],
    ["submit quote zero amount", world({}, [claim("profile")]), "plumber", "submitQuote", { ...newQuote, amount: 0 }],
    ["submit quote huge amount", world({}, [claim("profile")]), "plumber", "submitQuote", { ...newQuote, amount: 1_000_001 }],
    ...[19, 20, 5000, 5001].map((length) => [`submit quote with description of ${length} characters`, world({}, [claim("profile")]), "plumber", "submitQuote", { ...newQuote, description: "q".repeat(length) }]),
    ...[0.01, 1_000_000].map((amount) => [`submit quote with amount ${amount}`, world({}, [claim("profile")]), "plumber", "submitQuote", { ...newQuote, amount }]),
    ["submit quote short description", world({}, [claim("profile")]), "plumber", "submitQuote", { ...newQuote, description: "Will fix it" }],
    ["submit quote without profile", [...localPeople(), localCategory(), localRequest()], "plumber", "submitQuote", newQuote],
    ["submit quote as client", world(), "buyer", "submitQuote", newQuote],
    ["accept quote", world({ request: { quoteCount: 2 } }, [quote("q1", "profile"), quote("q2", "rival-profile"), quote("q3", "rival-profile", { status: "withdrawn" })]), "buyer", "acceptQuote", { quoteId: "q1" }],
    ["accept quote without currency, date or city", world({ request: { preferredDate: undefined, locationCity: undefined, locationPostcode: undefined, locationCountry: undefined } }, [quote("q1", "profile", { currency: undefined })]), "buyer", "acceptQuote", { quoteId: "q1" }],
    ["accept quote on matched request", world({ request: { status: "matched" } }, [quote("q1", "profile")]), "buyer", "acceptQuote", { quoteId: "q1" }],
    ["accept quote retry returns existing workspace", accepted([{ _id: "appointment", _table: "localAppointments", orderId: "order" }]), "buyer", "acceptQuote", { quoteId: "q1" }],
    ["accept quote retry without appointment", accepted(), "buyer", "acceptQuote", { quoteId: "q1" }],
    ["accept quote with mismatching order", world({ request: { status: "accepted" } }, [quote("q1", "profile", { status: "accepted" }), { _id: "order", _table: "orders", tenantId: "tenant-a", clientId: "buyer", quoteRequestId: "request", quoteId: "q1", freelancerId: "rival-profile", orderType: "local_quote" }]), "buyer", "acceptQuote", { quoteId: "q1" }],
    ["accept quote on closed request", world({ request: { status: "cancelled" } }, [quote("q1", "profile")]), "buyer", "acceptQuote", { quoteId: "q1" }],
    ["accept rejected quote", world({}, [quote("q1", "profile", { status: "rejected" })]), "buyer", "acceptQuote", { quoteId: "q1" }],
    ["accept quote as another client", world({}, [quote("q1", "profile")]), "stranger", "acceptQuote", { quoteId: "q1" }],
    ["accept quote in other workspace", world({ request: { tenantId: "tenant-b" } }, [quote("q1", "profile")]), "buyer", "acceptQuote", { quoteId: "q1" }],
    ["accept quote missing quote", world(), "buyer", "acceptQuote", { quoteId: "q1" }],
    ["accept quote missing request", [...localPeople(), quote("q1", "profile")], "buyer", "acceptQuote", { quoteId: "q1" }],
    ["accept quote missing profile", world({}, [quote("q1", "ghost-profile")]), "buyer", "acceptQuote", { quoteId: "q1" }],
    ["accept quote missing professional account", [...localPeople().filter((p) => p._id !== "plumber"), localCategory(), localProfile("profile", "plumber"), localRequest(), quote("q1", "profile")], "buyer", "acceptQuote", { quoteId: "q1" }],
    ["accept quote as professional", world({}, [quote("q1", "profile")]), "plumber", "acceptQuote", { quoteId: "q1" }],
    ["my requests", world({}, [localRequest({ _id: "request-2", categoryId: "gone", locationCity: undefined, budgetIndication: undefined, preferredDate: undefined, quoteCount: undefined }), localRequest({ _id: "request-3", clientId: "stranger" })]), "buyer", "listMyRequests", {}],
    ["my requests as professional", world(), "plumber", "listMyRequests", {}],
    ["my requests anonymous", world(), null, "listMyRequests", {}],
  ];
};

async function record(moduleName, sourceFile) {
  const canonical = path.join(root, moduleName);
  const output = {};
  const names = suites[moduleName]().map(([name]) => name);
  const duplicate = names.find((name, index) => names.indexOf(name) !== index);
  if (duplicate) throw new Error(`${moduleName}: duplicate scenario name "${duplicate}"`);
  for (const [name, rows, actor, fn, args, options] of suites[moduleName]()) {
    const log = [];
    const mod = loadModule(sourceFile, canonical, log, options);
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
