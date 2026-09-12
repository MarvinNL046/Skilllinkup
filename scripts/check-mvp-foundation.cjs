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
const conversations = load("convex/chat/conversations.ts");
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
  await check("applications notify both parties, preserve private notes and reject stale or unauthorized decisions", async () => {
    const apps = load("convex/marketplace/jobApplications.ts");
    const jobUser = (id, role) => user(id, { activeRole: role, accountRoles: [role], preferredWorld: "jobs", onboardingContexts: [{ role, world: "jobs", version: 1, completedAt: 1 }] });
    for (const finalStatus of ["withdrawn", "hired"]) {
      const ctx = fixture([jobUser("candidate", "candidate"), jobUser("employer", "company"), jobUser("outsider", "company"),
        { _id: "job", _table: "jobs", tenantId: "tenant", clientId: "employer", title: "QA vacancy", slug: "qa-vacancy", status: "open", applicationCount: 0 },
      ], "candidate");
      const actAs = id => { ctx.auth.getUserIdentity = async () => ({ subject: id }); };
      const args = { jobId: "job", coverLetter: "QA application only: I have relevant experience and would like to discuss the responsibilities and working arrangements." };
      const id = await apps.submit.handler(ctx, args);
      assert.equal(ctx.state.get("job").applicationCount, 1);
      await assert.rejects(() => apps.submit.handler(ctx, args), /already applied/);
      assert.equal(ctx.state.get("job").applicationCount, 1);
      actAs("outsider");
      await assert.rejects(() => apps.listForJob.handler(ctx, { jobId: "job" }), /Unauthorized/);
      await assert.rejects(() => apps.updateStatus.handler(ctx, { applicationId: id, status: "screening" }), /Unauthorized/);
      actAs("employer");
      await apps.updateStatus.handler(ctx, { applicationId: id, status: "screening", employerNote: "Private internal evaluation" });
      let version = ctx.state.get(id).updatedAt;
      await apps.updateStatus.handler(ctx, { applicationId: id, status: "interview", expectedUpdatedAt: version });
      assert.equal(ctx.state.get(id).employerNote, "Private internal evaluation");
      const writes = ctx.writes.length;
      await apps.updateStatus.handler(ctx, { applicationId: id, status: "interview", expectedUpdatedAt: version });
      assert.equal(ctx.writes.length, writes);
      await assert.rejects(() => apps.updateStatus.handler(ctx, { applicationId: id, status: "offer", expectedUpdatedAt: version }), /application changed/);
      actAs("candidate");
      const safe = await apps.getMineForJob.handler(ctx, { jobId: "job" });
      assert.equal(safe.status, "interview"); assert.ok(!("employerNote" in safe));
      assert.ok(!JSON.stringify(await apps.listMine.handler(ctx, {})).includes("Private internal"));
      if (finalStatus === "withdrawn") {
        await assert.rejects(() => apps.withdraw.handler(ctx, { applicationId: id, expectedUpdatedAt: version }), /application changed/);
        version = ctx.state.get(id).updatedAt;
        await apps.withdraw.handler(ctx, { applicationId: id, expectedUpdatedAt: version });
        const count = ctx.writes.length;
        await apps.withdraw.handler(ctx, { applicationId: id, expectedUpdatedAt: version });
        assert.equal(ctx.writes.length, count);
        const notice = [...ctx.state.values()].find(r => r.type === "job_application_withdrawn");
        assert.equal(notice.userId, "employer"); assert.equal(ctx.scheduled.at(-1)[2].eventKey, `job-application-withdrawn:${id}`);
        actAs("employer");
        assert.equal((await apps.listForJob.handler(ctx, { jobId: "job" }))[0].application.status, "withdrawn");
        await assert.rejects(() => apps.updateStatus.handler(ctx, { applicationId: id, status: "offer" }));
      } else {
        actAs("employer");
        for (const status of ["offer", "hired"]) await apps.updateStatus.handler(ctx, { applicationId: id, status });
        actAs("candidate");
        await assert.rejects(() => apps.withdraw.handler(ctx, { applicationId: id }));
        assert.equal((await apps.getMineForJob.handler(ctx, { jobId: "job" })).status, "hired");
      }
      assert.ok(!JSON.stringify([...ctx.state.values()].filter(r => r._table === "notifications")).includes("Private internal"));
    }
  });
  await check("rescheduling notifies the other party, rejects stale changes and cancellation is safe to retry", async () => {
    const appointments = load("convex/marketplace/localAppointments.ts");
    for (const actor of ["buyer", "seller"]) {
      const localUser = (id, role) => user(id, { activeRole: role, accountRoles: [role], preferredWorld: "local", onboardingContexts: [{ role, world: "local", version: 1, completedAt: 1 }] });
      const ctx = fixture([localUser("buyer", "client"), localUser("seller", "local_professional"), localUser("outsider", "client"),
        { _id: "profile", _table: "freelancerProfiles", userId: "seller", tenantId: "tenant" },
        { _id: "request", _table: "quoteRequests", tenantId: "tenant", clientId: "buyer", status: "accepted" },
        { _id: "order", _table: "orders", tenantId: "tenant", clientId: "buyer", freelancerId: "profile", quoteRequestId: "request", orderType: "local_quote", escrowStatus: "beta_no_payment", status: "active" },
        { _id: "visit", _table: "localAppointments", tenantId: "tenant", clientId: "buyer", professionalId: "profile", quoteRequestId: "request", orderId: "order", status: "confirmed", confirmedAt: 1, updatedAt: 1, clientNote: "Keep client note", professionalNote: "Keep professional note" },
      ], actor);
      const args = { appointmentId: "visit", scheduledStart: Date.now() + 86400000, expectedUpdatedAt: 1 };
      await assert.rejects(() => appointments.reschedule.handler(ctx, { ...args, expectedUpdatedAt: 0 }), /appointment changed/);
      await assert.rejects(() => appointments.reschedule.handler(ctx, { ...args, scheduledEnd: args.scheduledStart - 1 }), /end time/);
      await appointments.reschedule.handler(ctx, args);
      assert.equal(ctx.state.get("visit").status, "requested");
      assert.equal(ctx.state.get("visit").confirmedAt, undefined);
      assert.equal(ctx.state.get("visit").clientNote, "Keep client note");
      assert.equal(ctx.state.get("visit").professionalNote, "Keep professional note");
      assert.equal(ctx.scheduled.length, 1);
      const notices = () => [...ctx.state.values()].filter(r => r._table === "notifications");
      assert.equal(notices()[0].userId, actor === "buyer" ? "seller" : "buyer");
      assert.equal(notices()[0].type, "local_appointment_rescheduled");
      const writes = ctx.writes.length;
      await appointments.reschedule.handler(ctx, args);
      assert.equal(ctx.writes.length, writes); assert.equal(ctx.scheduled.length, 1);
      await assert.rejects(() => appointments.updateStatus.handler(ctx, { appointmentId: "visit", status: "cancelled", expectedUpdatedAt: 1 }), /appointment changed/);
      ctx.auth.getUserIdentity = async () => ({ subject: "seller" });
      await appointments.updateStatus.handler(ctx, { appointmentId: "visit", status: "confirmed" });
      const firstConfirmationKey = ctx.scheduled.at(-1)[2].eventKey;
      await appointments.reschedule.handler(ctx, { appointmentId: "visit", scheduledStart: args.scheduledStart + 86400000 });
      await appointments.updateStatus.handler(ctx, { appointmentId: "visit", status: "confirmed" });
      assert.notEqual(ctx.scheduled.at(-1)[2].eventKey, firstConfirmationKey);
      await appointments.updateStatus.handler(ctx, { appointmentId: "visit", status: "in_progress" });
      await assert.rejects(() => appointments.reschedule.handler(ctx, { appointmentId: "visit", scheduledStart: args.scheduledStart }), /Only a requested or confirmed/);
      ctx.auth.getUserIdentity = async () => ({ subject: actor });
      await appointments.updateStatus.handler(ctx, { appointmentId: "visit", status: "cancelled" });
      for (const id of ["visit", "order", "request"]) assert.equal(ctx.state.get(id).status, "cancelled");
      assert.equal(notices().at(-1).userId, actor === "buyer" ? "seller" : "buyer");
      const count = ctx.writes.length;
      await appointments.updateStatus.handler(ctx, { appointmentId: "visit", status: "cancelled", expectedUpdatedAt: 1 });
      assert.equal(ctx.writes.length, count);
      ctx.auth.getUserIdentity = async () => ({ subject: "outsider" });
      await assert.rejects(() => appointments.updateStatus.handler(ctx, { appointmentId: "visit", status: "cancelled" }), /Unauthorized/);
    }
  });
  await check("Local review pagination includes older profiles and enforces reviewed ownership", async () => {
    const verification = load("convex/marketplace/localVerifications.ts");
    const ctx = fixture([user("admin", { role: "admin" }), user("seller"), user("outsider"),
      ...Array.from({ length: 125 }, (_, i) => ({ _id: "local-" + i, _table: "freelancerProfiles", _creationTime: i, tenantId: "tenant", providerRole: "local_professional", status: "active", displayName: "QA " + i, userId: "seller", workType: "local", locationCity: "Rotterdam", locationCountry: "Netherlands", updatedAt: 1 })),
      ...Array.from({ length: 150 }, (_, i) => ({ _id: "online-" + i, _table: "freelancerProfiles", _creationTime: i + 200, tenantId: "tenant", providerRole: "freelancer", status: "active" })),
      { _id: "foreign", _table: "freelancerProfiles", tenantId: "other", providerRole: "local_professional", status: "active", updatedAt: 1 },
    ], "admin");
    const all = await drain(verification.listPage, ctx, {});
    assert.equal(all.length, 125);
    assert.equal(new Set(all.map(p => p.id)).size, 125);
    const review = { profileId: "local-0", verified: true, expectedUpdatedAt: 1, note: "QA fixture only: identity and service area checks recorded." };
    await assert.rejects(() => verification.review.handler(ctx, { ...review, profileId: "foreign" }), /not available/);
    await assert.rejects(() => verification.review.handler(ctx, { ...review, expectedUpdatedAt: 0 }), /profile changed/);
    await assert.rejects(() => verification.review.handler(ctx, { ...review, note: "ok" }), /20/);
    ctx.auth.getUserIdentity = async () => ({ subject: "outsider" });
    await assert.rejects(() => verification.review.handler(ctx, review), /Admin/);
    await assert.rejects(() => verification.listPage.handler(ctx, { paginationOpts: { cursor: null, numItems: 20 } }), /Admin/);
    ctx.auth.getUserIdentity = async () => ({ subject: "admin" });
    await verification.review.handler(ctx, review);
    assert.equal(ctx.state.get("local-0").isVerified, true);
    const audit = [...ctx.state.values()].filter(r => r._table === "moderationAuditEvents");
    assert.equal(audit.length, 1); assert.equal(audit[0].actorId, "admin");
    const notification = [...ctx.state.values()].find(r => r._table === "notifications");
    assert.equal(notification.userId, "seller");
    assert.ok(!JSON.stringify(notification).includes(review.note), "Private evidence leaked into notification");
    await assert.rejects(() => verification.review.handler(ctx, review), /profile changed/);
    await verification.review.handler(ctx, { ...review, verified: false, expectedUpdatedAt: ctx.state.get("local-0").updatedAt });
    assert.equal(ctx.state.get("local-0").isVerified, false);
  });
  await check("local request lifecycle creates one workspace and safely retries acceptance", async () => {
    const quotes = load("convex/marketplace/quotes.ts");
    const leads = load("convex/marketplace/leads.ts");
    const appointments = load("convex/marketplace/localAppointments.ts");
    const localUser = (id, role) => user(id, { activeRole: role, accountRoles: [role], preferredWorld: "local", onboardingContexts: [{ role, world: "local", version: 1, completedAt: 1 }] });
    const ctx = fixture([localUser("buyer", "client"), localUser("seller", "local_professional"), localUser("outsider", "client"),
      { _id: "category", _table: "marketplaceCategories", tenantId: "tenant", name: "Plumbing", serviceType: "local" },
      { _id: "profile", _table: "freelancerProfiles", tenantId: "tenant", userId: "seller", providerRole: "local_professional", status: "active", workType: "local", isVerified: false, creditBalance: 100, locationCity: "Rotterdam", locationCountry: "Netherlands" },
    ]);
    const actAs = (id) => { ctx.auth.getUserIdentity = async () => ({ subject: id }); };
    const rows = (table) => [...ctx.state.values()].filter((row) => row._table === table);
    const requestId = await quotes.createRequest.handler(ctx, { categoryId: "category", title: "QA repair a leaking tap", description: "Isolated QA request: inspect and repair a leaking kitchen tap.", locationCity: "Rotterdam", locationCountry: "Netherlands", preferredDate: Date.now() + 86400000 });
    assert.equal((await quotes.listMyRequests.handler(ctx, {}))[0]._id, requestId);
    actAs("seller");
    assert.match((await leads.getLeadStatus.handler(ctx, { quoteRequestId: requestId })).claimBlockReason, /verified/);
    await assert.rejects(() => leads.claimLead.handler(ctx, { quoteRequestId: requestId, claimType: "shared" }), /not eligible/);
    assert.equal(rows("leadClaims").length, 0);
    // Eligibility is a fixture only: no real profile is verified by this test.
    ctx.state.get("profile").isVerified = true;
    ctx.state.get("profile").locationCity = "Maastricht";
    assert.match((await leads.getLeadStatus.handler(ctx, { quoteRequestId: requestId })).claimBlockReason, /outside/);
    await assert.rejects(() => leads.claimLead.handler(ctx, { quoteRequestId: requestId, claimType: "shared" }), /outside/);
    ctx.state.get("profile").locationCity = "Rotterdam";
    assert.equal((await leads.getLeadStatus.handler(ctx, { quoteRequestId: requestId })).claimBlockReason, null);
    const claim = await leads.claimLead.handler(ctx, { quoteRequestId: requestId, claimType: "shared" });
    assert.equal(ctx.state.get("profile").creditBalance, 100 - claim.creditsSpent);
    await assert.rejects(() => leads.claimLead.handler(ctx, { quoteRequestId: requestId, claimType: "shared" }), /already claimed/);
    const quoteId = await quotes.submitQuote.handler(ctx, { quoteRequestId: requestId, amount: 150, currency: "EUR", description: "Inspect and repair the kitchen tap, including materials." });
    actAs("outsider");
    await assert.rejects(() => quotes.acceptQuote.handler(ctx, { quoteId }), /Only the client/);
    actAs("buyer");
    ctx.state.set("competing-quote", { _id: "competing-quote", _table: "quotes", quoteRequestId: requestId, freelancerId: "other-profile", status: "pending" });
    const accepted = await quotes.acceptQuote.handler(ctx, { quoteId });
    assert.equal(ctx.state.get("competing-quote").status, "rejected");
    await assert.rejects(() => quotes.acceptQuote.handler(ctx, { quoteId: "competing-quote" }), /no longer be awarded/);
    const beforeRetry = { writes: ctx.writes.length, scheduled: ctx.scheduled.length };
    assert.deepEqual(await quotes.acceptQuote.handler(ctx, { quoteId }), accepted);
    assert.equal(ctx.writes.length, beforeRetry.writes);
    assert.equal(ctx.scheduled.length, beforeRetry.scheduled);
    ctx.state.get("buyer").tenantId = "other-tenant";
    await assert.rejects(() => quotes.acceptQuote.handler(ctx, { quoteId }), /another workspace/);
    ctx.state.get("buyer").tenantId = "tenant";
    ctx.state.get(accepted.orderId).clientId = "outsider";
    await assert.rejects(() => quotes.acceptQuote.handler(ctx, { quoteId }), /do not match/);
    ctx.state.get(accepted.orderId).clientId = "buyer";
    for (const table of ["orders", "conversations", "localAppointments"]) assert.equal(rows(table).length, 1);
    assert.equal(rows("orders")[0].escrowStatus, "beta_no_payment");
    assert.equal(rows("conversations")[0].localAppointmentId, accepted.appointmentId);
    assert.equal((await appointments.getByOrder.handler(ctx, { orderId: accepted.orderId })).status, "requested");
    await assert.rejects(() => appointments.updateStatus.handler(ctx, { appointmentId: accepted.appointmentId, status: "confirmed" }), /professional confirms/);
    actAs("outsider");
    await assert.rejects(() => quotes.acceptQuote.handler(ctx, { quoteId }), /Only the client/);
    await assert.rejects(() => appointments.getByOrder.handler(ctx, { orderId: accepted.orderId }), /Unauthorized/);
    actAs("seller");
    for (const status of ["confirmed", "in_progress", "completed"]) await appointments.updateStatus.handler(ctx, { appointmentId: accepted.appointmentId, status });
    assert.equal(ctx.state.get(requestId).status, "completed");
    assert.equal(ctx.state.get(accepted.orderId).status, "completed");
    actAs("buyer");
    assert.equal((await appointments.getByOrder.handler(ctx, { orderId: accepted.orderId })).status, "completed");
    assert.deepEqual(await quotes.acceptQuote.handler(ctx, { quoteId }), accepted);
  });
  await check("profile and service enquiries share privacy checks and remain idempotent", async () => {
    for (const permission of ["everyone", "clients_only", "nobody"]) {
      const rows = [user(), user("seller"),
        { _id: "profile", _table: "freelancerProfiles", userId: "seller", providerRole: "freelancer", status: "active", displayName: "QA professional", contactPermission: permission },
        { _id: "gig", _table: "gigs", freelancerId: "profile", status: "active", title: "QA service" }];
      const ctx = fixture(rows);
      for (const context of [{ type: "profile_inquiry", freelancerProfileId: "profile" }, { type: "gig_inquiry", gigId: "gig" }]) {
        if (permission === "nobody") {
          await assert.rejects(() => conversations.openForContext.handler(ctx, { context }), /not accepting new enquiries/);
          assert.equal(ctx.writes.length, 0);
        } else {
          const id = await conversations.openForContext.handler(ctx, { context });
          assert.equal(await conversations.openForContext.handler(ctx, { context }), id);
          const stranger = fixture([...ctx.state.values(), user("stranger")], "stranger");
          await assert.rejects(() => conversations.getById.handler(stranger, { conversationId: id }), /Unauthorized/);
        }
      }
    }
  });
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
  await check("sending persists content, recipient unread status, notification and email intent", async () => {
    const ctx = fixture([user(), user("seller"), conversation()]);
    const id = await messages.send.handler(ctx, { conversationId: "conversation", content: "  Please confirm the project scope.  " });
    assert.equal(ctx.state.get(id).content, "Please confirm the project scope.");
    assert.equal(ctx.state.get(id).senderId, "buyer");
    assert.equal(ctx.state.get("conversation").unreadCount1, 0);
    assert.equal(ctx.state.get("conversation").unreadCount2, 1);
    const notifications = [...ctx.state.values()].filter((row) => row._table === "notifications");
    assert.equal(notifications.length, 1);
    assert.equal(notifications[0].userId, "seller");
    assert.equal(notifications[0].link, "/message?conversation=conversation");
    assert.equal(ctx.scheduled.length, 1);
    assert.equal(ctx.scheduled[0][2].messageId, id);
    assert.equal(ctx.scheduled[0][2].recipientEmail, "seller@example.invalid");
    const recipient = fixture([...ctx.state.values()], "seller");
    const saved = await messages.getByConversation.handler(recipient, { conversationId: "conversation" });
    assert.equal(saved[0]._id, id);
    await messages.markRead.handler(recipient, { conversationId: "conversation" });
    assert.equal(recipient.state.get("conversation").unreadCount2, 0);
    for (const actor of ["outsider", null]) {
      const rejected = fixture([user(), user("seller"), user("outsider"), conversation()], actor);
      await assert.rejects(() => messages.send.handler(rejected, { conversationId: "conversation", content: "Must not be delivered." }));
      assert.equal(rejected.writes.length, 0);
      assert.equal(rejected.scheduled.length, 0);
    }
    for (const content of [" ", "x".repeat(3001), "Visit https://example.invalid"]) {
      const rejected = fixture([user(), user("seller"), conversation()]);
      await assert.rejects(() => messages.send.handler(rejected, { conversationId: "conversation", content }));
      assert.equal(rejected.writes.length, 0);
    }
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
