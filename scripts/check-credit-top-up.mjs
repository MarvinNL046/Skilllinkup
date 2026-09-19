import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { CREDIT_PURCHASE_REJECTED, creditPurchaseFromSession, isRejectedCreditPurchase } from "../src/lib/creditPurchaseEvent.mjs";

// Runs the real credit top-up handlers against in-memory data. Nothing connects
// to Stripe or Convex and no application data is changed.
//
// What this proves: verification, replay safety and the beta gate. What it cannot
// prove is true concurrency, because an in-memory fixture has no transactions.
// That guarantee comes from Convex running a mutation as one serializable
// transaction, and was exercised with parallel calls on the development backend
// (see docs/RELIABLE_CREDIT_TOP_UP_2026-09-19.md).
const require = createRequire(import.meta.url);
const ts = require("typescript");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SECRET = "fixture-secret";

function loader({ livePayments }) {
  const cache = new Map();
  function load(file) {
    file = path.resolve(root, file);
    if (cache.has(file)) return cache.get(file);
    const exports = {};
    cache.set(file, exports);
    const source = ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
    vm.runInNewContext(source, {
      exports, Date, Set, Map, Error, Number, Math, Promise, JSON, RegExp, String,
      process: { env: { INTERNAL_EMAIL_SECRET: SECRET } },
      require(id) {
        if (id.includes("_generated/server")) return Object.fromEntries(["query", "mutation", "internalQuery", "internalMutation"].map((name) => [name, (config) => config]));
        if (livePayments && id.endsWith("/paymentPolicy")) return { PRIVATE_BETA_FREE: false, requireLivePaymentsEnabled: () => {} };
        if (id.endsWith("/rateLimits")) return { rateLimiter: { limit: async () => ({ ok: true }) } };
        if (id === "convex/values" || id === "convex/server") return require(id);
        if (id.startsWith(".")) return load(path.resolve(path.dirname(file), `${id}.ts`));
        throw new Error(`Unexpected import ${id}`);
      },
    }, { filename: file });
    return exports;
  }
  return load;
}

function fixture(rows) {
  const records = new Map(rows.map((row) => [row._id, structuredClone(row)]));
  const writes = [];
  const ctx = {
    auth: { getUserIdentity: async () => null },
    db: {
      get: async (id) => structuredClone(records.get(id) ?? null),
      insert: async (table, fields) => {
        const id = `${table}-${records.size}`;
        records.set(id, { _id: id, _table: table, ...structuredClone(fields) });
        writes.push(["insert", table, fields]);
        return id;
      },
      patch: async (id, fields) => { Object.assign(records.get(id), fields); writes.push(["patch", id, fields]); },
      query: (table) => {
        const conditions = [];
        const q = { eq(key, value) { conditions.push([key, value]); return q; } };
        const rowsFor = () => structuredClone([...records.values()].filter((row) => row._table === table && conditions.every(([key, value]) => row[key] === value)));
        const chain = { withIndex(_name, fn) { fn(q); return chain; }, first: async () => rowsFor()[0] ?? null, unique: async () => rowsFor()[0] ?? null, take: async (count) => rowsFor().slice(0, count) };
        return chain;
      },
    },
  };
  return { ctx, records, writes, table: (name) => [...records.values()].filter((row) => row._table === name) };
}

const world = (balance = 4) => fixture([
  { _id: "plumber", _table: "users", tenantId: "tenant" },
  { _id: "rival", _table: "users", tenantId: "tenant" },
  { _id: "client", _table: "users", tenantId: "tenant" },
  { _id: "profile", _table: "freelancerProfiles", userId: "plumber", providerRole: "local_professional", creditBalance: balance },
  { _id: "rival-profile", _table: "freelancerProfiles", userId: "rival", providerRole: "local_professional", creditBalance: 0 },
]);
const paid = (extra = {}) => ({ freelancerUserId: "plumber", packageId: "popular", stripeSessionId: "cs_test_a1B2c3D4e5", paymentStatus: "paid", amountTotalCents: 4500, currency: "eur", serverSecret: SECRET, ...extra });
const rejectedWith = (pattern) => (error) => {
  assert.equal(error?.data?.code, CREDIT_PURCHASE_REJECTED, `expected a rejection, got: ${error?.message}`);
  assert.match(error.data.reason, pattern);
  assert.equal(isRejectedCreditPurchase(error), true);
  return true;
};

let checks = 0;
async function check(name, run) { await run(); checks++; console.log(`PASS ${name}`); }

await check("credit top-ups stay disabled while live payments are off, and always need the server secret", async () => {
  const leads = loader({ livePayments: false })("convex/marketplace/leads.ts");
  const f = world();
  await assert.rejects(() => leads.addCredits.handler(f.ctx, paid()), /unavailable during the free private beta/);
  await assert.rejects(() => leads.addCredits.handler(f.ctx, paid({ serverSecret: "wrong" })), /Unauthorized/);
  await assert.rejects(() => leads.addCredits.handler(f.ctx, paid({ serverSecret: undefined })), /Unauthorized/);
  assert.equal(f.writes.length, 0);
  assert.equal("credits" in leads.addCredits.args, false, "the caller must not be able to name a credit amount");
});

const leads = loader({ livePayments: true })("convex/marketplace/leads.ts");

await check("a verified purchase credits the package amount once and records the payment facts", async () => {
  const f = world(4);
  const result = await leads.addCredits.handler(f.ctx, paid({ currency: "EUR", stripeSessionId: "  cs_test_a1B2c3D4e5  " }));
  assert.deepEqual({ ...result }, { newBalance: 14, credits: 10, alreadyProcessed: false });
  assert.equal(f.records.get("profile").creditBalance, 14);
  const [ledger] = f.table("creditTransactions");
  assert.equal(ledger.amount, 10); assert.equal(ledger.type, "purchase"); assert.equal(ledger.referenceId, "cs_test_a1B2c3D4e5"); assert.equal(ledger.freelancerId, "plumber");
  const [purchase] = f.table("creditPurchases");
  assert.deepEqual({ session: purchase.stripeSessionId, user: purchase.freelancerUserId, profile: purchase.profileId, pack: purchase.packageId, credits: purchase.credits, cents: purchase.amountCents, currency: purchase.currency, ledger: purchase.creditTransactionId }, { session: "cs_test_a1B2c3D4e5", user: "plumber", profile: "profile", pack: "popular", credits: 10, cents: 4500, currency: "eur", ledger: ledger._id });
  for (const [packageId, cents, credits] of [["starter", 2500, 5], ["pro", 9900, 25]]) {
    const other = world(0);
    assert.equal((await leads.addCredits.handler(other.ctx, paid({ packageId, amountTotalCents: cents }))).credits, credits);
  }
});

await check("replaying a session credits nothing, however often it arrives", async () => {
  const f = world(4);
  await leads.addCredits.handler(f.ctx, paid());
  const writesAfterFirst = f.writes.length;
  for (let attempt = 0; attempt < 5; attempt++) {
    const replay = await leads.addCredits.handler(f.ctx, paid());
    assert.deepEqual({ ...replay }, { newBalance: 14, credits: 10, alreadyProcessed: true });
  }
  assert.equal(f.writes.length, writesAfterFirst);
  assert.equal(f.records.get("profile").creditBalance, 14);
  assert.equal(f.table("creditTransactions").length, 1);
  assert.equal(f.table("creditPurchases").length, 1);
  const second = await leads.addCredits.handler(f.ctx, paid({ stripeSessionId: "cs_test_another01" }));
  assert.equal(second.newBalance, 24);
});

await check("a session already used for another buyer or package is refused", async () => {
  const f = world(4);
  await leads.addCredits.handler(f.ctx, paid());
  const before = f.writes.length;
  await assert.rejects(() => leads.addCredits.handler(f.ctx, paid({ freelancerUserId: "rival" })), rejectedWith(/different purchase/));
  await assert.rejects(() => leads.addCredits.handler(f.ctx, paid({ packageId: "starter", amountTotalCents: 2500 })), rejectedWith(/different purchase/));
  assert.equal(f.writes.length, before);
  assert.equal(f.records.get("rival-profile").creditBalance, 0);
});

await check("unpaid, mispriced, wrong-currency, unknown-package, malformed and buyerless purchases are refused without any write", async () => {
  const cases = [
    [{ paymentStatus: "unpaid" }, /not paid/],
    [{ paymentStatus: "no_payment_required" }, /not paid/],
    [{ paymentStatus: "" }, /not paid/],
    [{ amountTotalCents: 4499 }, /amount does not match/],
    [{ amountTotalCents: 4501 }, /amount does not match/],
    [{ amountTotalCents: 45 }, /amount does not match/],
    [{ amountTotalCents: 4500.5 }, /amount does not match/],
    [{ amountTotalCents: 2500 }, /amount does not match/],
    [{ amountTotalCents: Number.NaN }, /amount does not match/],
    [{ currency: "usd" }, /currency does not match/],
    [{ currency: "" }, /currency does not match/],
    [{ packageId: "enterprise" }, /Unknown credit package/],
    [{ packageId: "" }, /Unknown credit package/],
    [{ stripeSessionId: "" }, /session id/],
    [{ stripeSessionId: "pi_123456789" }, /session id/],
    [{ stripeSessionId: "cs_<script>" }, /session id/],
    [{ freelancerUserId: "client" }, /no Local professional profile/],
    [{ freelancerUserId: "ghost" }, /no Local professional profile/],
  ];
  for (const [change, pattern] of cases) {
    const f = world(4);
    await assert.rejects(() => leads.addCredits.handler(f.ctx, paid(change)), rejectedWith(pattern), JSON.stringify(change));
    assert.equal(f.writes.length, 0, JSON.stringify(change));
    assert.equal(f.records.get("profile").creditBalance, 4);
  }
});

await check("the webhook reads the purchase from Stripe's own fields and never trusts a credit count in metadata", async () => {
  const session = { id: "cs_test_a1B2c3D4e5", mode: "payment", payment_status: "paid", amount_total: 4500, currency: "eur", metadata: { freelancerUserId: "plumber", packageId: "popular", credits: "9999" } };
  const parsed = creditPurchaseFromSession(session);
  assert.equal(parsed.ok, true);
  assert.deepEqual(parsed.purchase, { freelancerUserId: "plumber", packageId: "popular", stripeSessionId: "cs_test_a1B2c3D4e5", paymentStatus: "paid", amountTotalCents: 4500, currency: "eur" });
  assert.equal("credits" in parsed.purchase, false);
  for (const broken of [{ mode: "subscription" }, { id: undefined }, { metadata: {} }, { metadata: { freelancerUserId: "plumber" } }, { amount_total: undefined }, { amount_total: 45.5 }, { currency: undefined }])
    assert.equal(creditPurchaseFromSession({ ...session, ...broken }).ok, false, JSON.stringify(broken));
  assert.equal(creditPurchaseFromSession(null).ok, false);
  assert.equal(isRejectedCreditPurchase(new Error("network")), false);

  // The parsed purchase is exactly what the mutation accepts.
  const f = world(0);
  assert.equal((await leads.addCredits.handler(f.ctx, { ...parsed.purchase, serverSecret: SECRET })).newBalance, 10);

  const webhook = fs.readFileSync(path.join(root, "src/app/api/stripe/webhook/route.js"), "utf8");
  const handler = webhook.slice(webhook.indexOf("async function handleCreditPurchase"), webhook.indexOf("// Handler: account.updated"));
  assert.ok(handler.includes("creditPurchaseFromSession(session)"));
  assert.ok(handler.includes("isRejectedCreditPurchase(err)"));
  assert.ok(/throw err;/.test(handler), "transient failures must be rethrown so Stripe retries");
  assert.equal(/metadata\.credits|parseInt\(/.test(handler), false, "credits must not come from metadata");
});

console.log(`Credit top-up checks passed: ${checks} groups.`);
