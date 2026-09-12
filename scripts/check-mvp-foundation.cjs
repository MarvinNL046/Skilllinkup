const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const root = path.resolve(__dirname, "..");
const mods = new Map();
const validator = new Proxy({}, { get: () => () => ({}) });
const internal = new Proxy({}, { get: () => internal });
let allowContact = true;
function load(file) {
  let absolute = path.resolve(root, file);
  if (!fs.existsSync(absolute)) absolute += ".ts";
  if (mods.has(absolute)) return mods.get(absolute);
  const exports = {}; mods.set(absolute, exports);
  const code = ts.transpileModule(fs.readFileSync(absolute, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(code, { exports, Date, Math, Map, Set, Number, Object, JSON, console, process: { env: {} }, require: (id) => {
    if (id === "convex/values") return { v: validator, ConvexError: class extends Error {} };
    if (id === "convex/server") return { paginationOptsValidator: {}, paginationResultValidator: () => ({}) };
    if (id.includes("_generated/server")) return { query: (x) => x, mutation: (x) => x, internalQuery: (x) => x };
    if (id.includes("_generated/api")) return { internal };
    if (id.endsWith("/rateLimits")) return { rateLimiter: { limit: async () => ({ ok: allowContact }) } };
    if (id.startsWith(".")) return load(path.resolve(path.dirname(absolute), id));
    throw Error("Unexpected dependency " + id);
  } });
  return exports;
}
const copy = (x) => x == null ? x : structuredClone(x);
function fixture(rows, actor = "buyer") {
  const state = new Map(rows.map((row) => [row._id, copy(row)]));
  let seq = 0; const writes = []; const scheduled = [];
  return { state, writes, scheduled, auth: { getUserIdentity: async () => actor ? { subject: actor } : null }, db: {
    get: async (...ids) => copy(state.get(ids.at(-1)) ?? null),
    query(table) {
      const filters = []; let desc = false; let sortField = "_creationTime";
      const index = { eq(k, value) { filters.push((x) => x[k] === value); return index; },
        gt(k, value) { filters.push((x) => x[k] > value); return index; } };
      const all = () => [...state.values()].filter((x) => x._table === table && filters.every((fn) => fn(x))).sort((a, b) =>
        (desc ? -1 : 1) * ((a[sortField] ?? a._creationTime ?? 0) - (b[sortField] ?? b._creationTime ?? 0)));
      const q = { withIndex(name, fn) { if (fn) fn(index);
        sortField = name.endsWith("_salary") ? "salaryMax" : name.endsWith("_budget") ? "budgetMax" : name.endsWith("_rating") ? "ratingAverage" : name.endsWith("_rate") ? "hourlyRate" : name.endsWith("_activity") ? "lastMessageAt" : "_creationTime"; return q; },
        order(direction) { desc = direction === "desc"; return q; },
        take: async (n) => copy(all().slice(0, n)), first: async () => copy(all()[0] ?? null),
        unique: async () => { const items = all(); assert.ok(items.length <= 1); return copy(items[0] ?? null); },
        paginate: async ({ cursor, numItems }) => { const items = all(); const start = Number(cursor ?? 0); return { page: copy(items.slice(start, start + numItems)), isDone: start + numItems >= items.length, continueCursor: String(start + numItems) }; },
      }; return q;
    },
    insert: async (table, value) => { const id = table + "-" + ++seq; state.set(id, { ...copy(value), _id: id, _table: table, _creationTime: Date.now() }); writes.push(id); return id; },
    patch: async (id, value) => { assert.ok(state.has(id)); Object.assign(state.get(id), copy(value)); writes.push(id); },
  }, scheduler: { runAfter: async (...args) => { scheduled.push(args); return "schedule-" + scheduled.length; } } };
}
const user = (id = "buyer", extra = {}) => ({ _id: id, _table: "users", tenantId: "tenant", stackAuthId: id, name: id, email: id + "@example.invalid",
  activeRole: "client", preferredWorld: "online", accountRoles: ["client"], onboardingContexts: [{ role: "client", world: "online", version: 1, completedAt: 1 }], ...extra });
const conversation = (id = "conversation", extra = {}) => ({ _id: id, _table: "conversations", participant1: "buyer", participant2: "seller", createdAt: 1, unreadCount1: 0, unreadCount2: 0, ...extra });
const messages = load("convex/chat/messages.ts");
const contact = load("convex/contact.ts");
const discovery = load("convex/marketplace/discovery.ts");
const metrics = load("convex/marketplace/dashboardMetrics.ts");
const policy = load("src/lib/messagePolicy.mjs");
const cases = [];
async function check(name, fn) { await fn(); cases.push(name); }
async function drain(fn, ctx, args) {
  const rows = []; let cursor = null; let iterations = 0;
  do { const result = await fn.handler(ctx, { ...args, paginationOpts: { cursor, numItems: 24 } }); rows.push(...result.page); cursor = result.isDone ? null : result.continueCursor; assert.ok(++iterations < 100); } while (cursor);
  return rows;
}
async function main() {
  await check("policy allows ordinary product names and budgets but blocks actionable contact", async () => {
    for (const text of ["Design Instagram banners", "I know Teams and Loom.", "The budget is 2500 and delivery takes 7 days.", "A 2026-09-12 launch date."]) assert.equal(policy.getMessagePolicyError(text), null);
    for (const text of ["Email me user@example.invalid", "Visit https://example.invalid", "WhatsApp: +31 612345678", "Instagram handle: @example"]) assert.ok(policy.getMessagePolicyError(text));
    assert.ok(policy.getMessagePolicyError("x".repeat(3001)));
  });
  await check("chat pagination preserves all 625 messages and rejects outsiders", async () => {
    const ctx = fixture([user(), user("seller"), user("outsider"), conversation(), ...Array.from({ length: 625 }, (_, i) => ({
      _id: "msg" + i, _table: "messages", _creationTime: i + 1, createdAt: i + 1, conversationId: "conversation", senderId: "seller", content: "Message " + i, isRead: false,
    }))]);
    const history = await drain(messages.list, ctx, { conversationId: "conversation" });
    assert.equal(history.length, 625); assert.equal(new Set(history.map((x) => x._id)).size, 625); assert.equal(history[0].content, "Message 624");
    await assert.rejects(() => messages.list.handler(fixture([...ctx.state.values()], "outsider"), { conversationId: "conversation", paginationOpts: { cursor: null, numItems: 50 } }), /Unauthorized/);
    ctx.state.get("conversation").unreadCount1 = 625;
    const read = await messages.markRead.handler(ctx, { conversationId: "conversation" });
    assert.equal(read.markedCount, 625); assert.equal(ctx.writes.length, 1);
    assert.ok((await drain(messages.list, ctx, { conversationId: "conversation" })).every((message) => message.isRead));
    ctx.state.set("new", { _id: "new", _table: "messages", _creationTime: 626, createdAt: 626, conversationId: "conversation", senderId: "seller", isRead: false });
    assert.equal((await messages.list.handler(ctx, { conversationId: "conversation", paginationOpts: { cursor: null, numItems: 1 } })).page[0].isRead, false);
  });
  await check("contact is durable and idempotent, with validation and private admin access", async () => {
    const ctx = fixture([]);
    const request = { requestId: "contact-intent-123456", name: "QA Visitor", email: "VISITOR@example.invalid", subject: "bug", message: "This is an isolated contract test message." };
    await contact.submit.handler(ctx, request); await contact.submit.handler(ctx, request);
    assert.equal(ctx.state.size, 1); assert.equal(ctx.scheduled.length, 1);
    assert.equal([...ctx.state.values()][0].email, "visitor@example.invalid");
    await assert.rejects(() => contact.submit.handler(ctx, { ...request, message: "Another long and different message." }), /already been used/);
    for (const changed of [{ email: "bad" }, { subject: "invalid" }, { message: "tiny" }, { requestId: "tiny" }]) await assert.rejects(() => contact.submit.handler(ctx, { ...request, ...changed }));
    const bot = fixture([]); await contact.submit.handler(bot, { ...request, website: "spam" }); assert.equal(bot.state.size, 0);
    allowContact = false; await assert.rejects(() => contact.submit.handler(fixture([]), request), /Too many/); allowContact = true;
    await assert.rejects(() => contact.listForAdmin.handler(fixture([user()]), { paginationOpts: { cursor: null, numItems: 25 } }), /admin|Admin|Unauthorized/i);
  });
  await check("job discovery reaches matches beyond 100 and globally sorts salary", async () => {
    const rows = [user("company", { companyVerificationStatus: "verified" }), ...Array.from({ length: 140 }, (_, i) => ({
      _id: "job" + i, _table: "jobs", _creationTime: i, clientId: "company", status: "open", locale: "en", title: i === 0 ? "Rare engineer" : "General vacancy",
      jobType: "full_time", salaryMin: 100 + i, salaryMax: 200 + i, tenantId: "private", currency: "EUR",
    }))];
    const ctx = fixture(rows);
    const rare = await drain(discovery.jobs, ctx, { locale: "en", query: "Rare" });
    assert.equal(rare.length, 1); assert.equal(rare[0]._id, "job0"); assert.equal(rare[0].tenantId, undefined);
    const sorted = await drain(discovery.jobs, ctx, { locale: "en", sort: "salary" });
    assert.equal(sorted.length, 140); assert.equal(sorted[0].salaryMax, 339);
    ctx.state.get("company").companyVerificationStatus = "pending";
    assert.equal((await drain(discovery.jobs, ctx, { locale: "en" })).length, 0);
  });
  await check("project discovery excludes private fields and local world", async () => {
    const base = { _table: "projects", clientId: "buyer", status: "open", locale: "en", title: "Website brief", budgetMin: 500, budgetMax: 1000, workType: "remote", tenantId: "secret", attachments: ["private"], locationPostcode: "private", selectedFreelancerId: "secret" };
    const ctx = fixture([user(), { ...base, _id: "online" }, { ...base, _id: "local", workType: "local" }]);
    const items = await drain(discovery.projects, ctx, { locale: "en" }); assert.equal(items.length, 1);
    for (const field of ["tenantId", "attachments", "locationPostcode", "selectedFreelancerId"]) assert.equal(items[0][field], undefined);
  });
  await check("dashboard totals cover more than preview limits and 100 orders", async () => {
    const rows = [user(), ...Array.from({ length: 165 }, (_, i) => ({ _id: "order" + i, _table: "orders", _creationTime: i, clientId: "buyer", amount: 5, status: "active", orderType: "gig" })),
      ...Array.from({ length: 16 }, (_, i) => ({ _id: "project" + i, _table: "projects", _creationTime: i + 1, clientId: "buyer" })),
      ...Array.from({ length: 9 }, (_, i) => ({ _id: "bid" + i, _table: "bids", _creationTime: i, projectId: "project15", status: "pending" })),
      ...Array.from({ length: 6 }, (_, i) => conversation("convo" + i, { _creationTime: i, unreadCount1: 2 }))];
    const ctx = fixture(rows); let cursor = null; const sums = { activeProjects: 0, newProposals: 0, unreadMessages: 0 }; let pages = 0;
    do { const result = await metrics.chunk.handler(ctx, { cursor, contextKey: "buyer:client:online" });
      for (const key of Object.keys(sums)) sums[key] += result.counts[key]; cursor = result.nextCursor; assert.ok(++pages < 40);
    } while (cursor);
    assert.deepEqual(sums, { activeProjects: 165, newProposals: 9, unreadMessages: 12 });
    const stale = await metrics.chunk.handler(ctx, { cursor: null, contextKey: "someone-else:client:online" });
    assert.equal(stale.counts.activeProjects, 0);
    await assert.rejects(() => metrics.chunk.handler(ctx, { cursor: "malformed", contextKey: "buyer:client:online" }), /Invalid dashboard cursor/);
  });
  console.log("PASS " + cases.length + " foundation suites (actual handlers, isolated in-memory data; no email or real writes).");
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
