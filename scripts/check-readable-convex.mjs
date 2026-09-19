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
    const source = ts.transpileModule(fs.readFileSync(sourceFile, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
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

async function record(moduleName, sourceFile) {
  const canonical = path.join(root, moduleName);
  const output = {};
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
