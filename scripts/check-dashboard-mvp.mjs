import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { validateProjectFields } from "../src/lib/projectValidation.mjs";
import { EMPTY_JOB_FORM, jobDraftKey, restoreJobDraft } from "../src/lib/jobDraft.mjs";
import { collectAccountExport, ACCOUNT_EXPORT_SECTIONS } from "../src/lib/accountExport.mjs";
import { getOrderActionContext } from "../src/lib/orderWorkspace.mjs";

// Runs actual handlers and client helpers with in-memory adapters; never connects
// to Convex, Clerk or browser storage and does not mutate application data.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const ts = require("typescript");
const api = new Proxy({}, { get: () => api });
function loader(overrides = {}, globals = {}) {
  const cache = new Map();
  function load(relative) {
    const file = path.resolve(root, relative);
    if (cache.has(file)) return cache.get(file);
    const exports = {};
    cache.set(file, exports);
    const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
      fileName: file.replace(/\.mjs$/, ".js"),
    }).outputText;
    vm.runInNewContext(code, {
      exports, process: { env: {} }, Date, Math, Number, Set, Map, Error, console, ...globals,
      require(id) {
        if (Object.hasOwn(overrides, id)) return overrides[id];
        if (id === "convex/values" || id === "react/jsx-runtime") return require(id);
        if (id.includes("_generated/server")) return Object.fromEntries(["query", "mutation", "internalQuery", "internalMutation", "action", "internalAction"].map((name) => [name, (config) => config]));
        if (id.includes("_generated/api")) return { api, internal: api };
        if (id.endsWith("/rateLimits")) return { rateLimiter: { limit: async () => ({ ok: true }) } };
        if (id.endsWith("/notifications")) return { notifyUser: async () => undefined };
        if (id.startsWith("@/components/ui/")) return new Proxy({}, { get: (_, name) => String(name) });
        if (id.startsWith(".")) {
          const candidate = path.resolve(path.dirname(file), id);
          return load(fs.existsSync(candidate) ? candidate : `${candidate}.ts`);
        }
        throw new Error(`Unexpected fixture import: ${id}`);
      },
    }, { filename: file });
    return exports;
  }
  return load;
}

function fixture(user, record) {
  const writes = [];
  return {
    writes,
    ctx: {
      auth: { getUserIdentity: async () => ({ subject: "fixture-subject" }) },
      db: {
        get: async () => record,
        query: (table) => ({ withIndex: () => ({ first: async () => table === "users" ? user : null }) }),
        patch: async (id, fields) => writes.push({ id, fields }),
        insert: async (table, fields) => { writes.push({ table, fields }); return "created-fixture"; },
      },
    },
  };
}
const user = { _id: "client-fixture", tenantId: "tenant-fixture", accountRoles: ["client", "company"], activeRole: "client", preferredWorld: "online", onboardingContexts: [{ role: "client", world: "online", version: 1 }, { role: "company", world: "jobs", version: 1 }] };
const project = { _id: "project-fixture", clientId: user._id, tenantId: user.tenantId, title: "A useful project title", description: "A detailed project brief describing the deliverables, milestones and required skills. ".repeat(2), status: "open", workType: "remote", locale: "en", budgetMin: 100, budgetMax: 500 };
const backend = loader();
const projects = backend("convex/marketplace/projects.ts");
const jobs = backend("convex/marketplace/jobs.ts");
let checks = 0;
async function check(name, run) { await run(); checks++; console.log(`PASS ${name}`); }

await check("Project wizard and both real handlers reject the same invalid content and budgets", async () => {
  for (const invalid of [{ title: "Short" }, { title: " " }, { description: "Too brief" }, { description: "x".repeat(10001) }, { budgetMin: -1 }, { budgetMax: 0 }, { budgetMin: Infinity }, { budgetMin: NaN }, { budgetMin: 600, budgetMax: 500 }]) {
    const values = { ...project, ...invalid };
    assert.ok(Object.keys(validateProjectFields(values)).length > 0);
    const f = fixture(user, project);
    await assert.rejects(() => projects.create.handler(f.ctx, { ...values, slug: "fixture" }));
    await assert.rejects(() => projects.update.handler(f.ctx, { ...invalid, projectId: project._id }));
    assert.equal(f.writes.length, 0);
  }
});
await check("Project create and update preserve valid scope and normalize whitespace", async () => {
  const f = fixture(user, project);
  assert.equal(await projects.create.handler(f.ctx, { ...project, title: `  ${project.title}  `, slug: "fixture" }), "created-fixture");
  assert.equal(f.writes[0].fields.title, project.title);
  await projects.update.handler(f.ctx, { projectId: project._id, title: "  Improved project title  ", budgetMin: 125 });
  assert.equal(f.writes[1].fields.title, "Improved project title");
  assert.equal(f.writes[1].fields.budgetMin, 125);
  await assert.rejects(() => projects.update.handler(fixture({ ...user, _id: "other-user" }, project).ctx, { projectId: project._id, title: "Another valid title" }), /Unauthorized/);
  await assert.rejects(() => projects.update.handler(f.ctx, { projectId: project._id, workType: "hybrid" }), /Online work type/);
});

// Minimal deterministic hook adapter exercises event handlers and effect state;
// Radix browser focus behavior is verified separately in browser QA.
function hookRunner() {
  const state = [], deps = [], cleanups = [];
  let index = 0, dirty = false, effects = [], renderFn;
  const same = (a, b) => a && b && a.length === b.length && a.every((v, i) => Object.is(v, b[i]));
  const react = {
    useState(initial) {
      const slot = index++;
      if (!(slot in state)) state[slot] = typeof initial === "function" ? initial() : initial;
      return [state[slot], (value) => { const next = typeof value === "function" ? value(state[slot]) : value; if (!Object.is(next, state[slot])) { state[slot] = next; dirty = true; } }];
    },
    useEffect(effect, nextDeps) {
      const slot = index++;
      if (!same(deps[slot], nextDeps)) { deps[slot] = nextDeps; effects.push(() => { cleanups[slot]?.(); cleanups[slot] = effect(); }); }
    },
    useMemo(compute) { index++; return compute(); },
  };
  function render(fn = renderFn) {
    renderFn = fn;
    let output;
    for (let pass = 0; pass < 20; pass++) {
      dirty = false; index = 0; effects = []; output = fn();
      effects.forEach((effect) => effect());
      if (!dirty) return output;
    }
    throw new Error("Fixture did not settle");
  }
  return { react, render };
}
function findElement(tree, predicate) {
  if (!tree || typeof tree !== "object") return null;
  if (predicate(tree)) return tree;
  const children = Array.isArray(tree) ? tree : [tree.props?.children];
  for (const child of children) { const found = findElement(child, predicate); if (found) return found; }
  return null;
}
await check("Real vacancy editor sends jobId, persists edits and clears an optional deadline", async () => {
  const runner = hookRunner();
  const Editor = loader({ react: runner.react })("src/components/dashboard/modal/JobEditModal.jsx").default;
  const job = { ...project, _id: "job-fixture", expiresAt: Date.now() + 86400000 };
  const f = fixture({ ...user, activeRole: "company", preferredWorld: "jobs" }, job);
  let closed = 0, payload;
  const props = { job, isOpen: true, onClose: () => closed++, onUpdate: async (args) => { payload = args; await jobs.update.handler(f.ctx, args); } };
  let tree = runner.render(() => Editor(props));
  findElement(tree, (e) => e.props?.id === "job-edit-title").props.onChange({ target: { value: "Updated engineering vacancy" } });
  findElement(tree, (e) => e.props?.id === "job-edit-deadline").props.onChange({ target: { value: "" } });
  tree = runner.render();
  await findElement(tree, (e) => e.type === "form").props.onSubmit({ preventDefault() {} });
  assert.equal(closed, 1);
  assert.equal(payload.jobId, job._id);
  assert.equal(payload.projectId, undefined);
  assert.equal(payload.workType, undefined);
  assert.equal(payload.expiresAt, null);
  assert.equal(f.writes[0].fields.title, "Updated engineering vacancy");
  assert.equal(f.writes[0].fields.expiresAt, undefined);
  await assert.rejects(() => jobs.update.handler(f.ctx, { jobId: job._id, description: "Short" }), /80/);
  await assert.rejects(() => jobs.update.handler(f.ctx, { jobId: job._id, expiresAt: Date.now() - 1000 }), /future/);
});
await check("Vacancy drafts restore only safe fields and stay scoped to each account", () => {
  assert.notEqual(jobDraftKey("first-account"), jobDraftKey("second-account"));
  assert.equal(jobDraftKey(null), null);
  const fields = { ...EMPTY_JOB_FORM, title: "Saved vacancy", description: project.description, arbitraryField: "discard me", salaryMin: 100 };
  const restored = restoreJobDraft(JSON.stringify({ version: 1, form: fields }));
  assert.equal(restored.title, "Saved vacancy");
  assert.equal(restored.salaryMin, EMPTY_JOB_FORM.salaryMin);
  assert.equal(restored.arbitraryField, undefined);
  assert.equal(restoreJobDraft("broken JSON"), null);
  assert.equal(restoreJobDraft(JSON.stringify({ version: 2, form: fields })), null);
  assert.equal(restoreJobDraft(null), null);
  assert.equal(EMPTY_JOB_FORM.title, "");
});
await check("Order action context follows actual buyer/provider role and local order type", () => {
  for (const [orderType, activeRole, preferredWorld, callerId] of [["gig", "client", "online", user._id], ["project", "freelancer", "online", "provider"], ["local_quote", "client", "local", user._id], ["local", "local_professional", "local", "provider"]]) {
    const order = { ...project, orderType };
    const actor = { ...user, _id: callerId, activeRole, preferredWorld };
    assert.equal(getOrderActionContext(order, actor).matchesContext, true);
    assert.equal(getOrderActionContext(order, { ...actor, preferredWorld: "jobs" }).matchesContext, false);
    assert.equal(getOrderActionContext(order, { ...actor, activeRole: "candidate" }).matchesContext, false);
  }
  assert.equal(getOrderActionContext(undefined, user).matchesContext, false);
});
await check("Conversation history reverses pages and only marks visible incoming messages read", async () => {
  const runner = hookRunner();
  let results = [{ _id: "new", senderId: "other", isRead: false }, { _id: "old", senderId: user._id, isRead: false }];
  const events = new Map(), reads = [], loads = [];
  let fail = false, active = false;
  const markRead = async (args) => { reads.push(args); if (fail) throw new Error("offline"); };
  const document = { visibilityState: "hidden", addEventListener: (name, callback) => events.set(name, callback), removeEventListener: (name) => events.delete(name) };
  const hook = loader({ react: runner.react, "convex/react": { useMutation: () => markRead, usePaginatedQuery: () => ({ results, status: "CanLoadMore", loadMore: (size) => loads.push(size) }) } }, { document })("src/hook/useConversationMessages.js").default;
  let history = runner.render(() => hook("conversation", user._id, active));
  assert.deepEqual(Array.from(history.messages, (message) => message._id), ["old", "new"]);
  assert.equal(reads.length, 0);
  active = true; runner.render(); assert.equal(reads.length, 0);
  document.visibilityState = "visible"; events.get("visibilitychange")();
  history = runner.render(); assert.equal(reads.length, 1);
  history.loadOlder(); assert.deepEqual(loads, [50]);
  results = [{ _id: "incoming", senderId: "other", isRead: false }, ...results];
  fail = true; runner.render(); await Promise.resolve();
  history = runner.render(); assert.match(history.readError, /could not be updated/);
  fail = false; history.retryRead(); history = runner.render();
  assert.equal(reads.length, 3); assert.equal(history.readError, "");
  document.visibilityState = "hidden"; events.get("visibilitychange")();
  results = [{ _id: "hidden-message", senderId: "other", isRead: false }, ...results];
  runner.render(); assert.equal(reads.length, 3);
});
await check("Full account export follows all pages and discovered profiles/conversations without truncation", async () => {
  const calls = [], progress = [];
  const exported = await collectAccountExport(async (args) => {
    calls.push(args);
    const items = [], nextSections = [];
    let page = 0, isDone = true;
    if (args.section === "savedItems") { page = Number(args.cursor || 0); for (let i = 0; i < 100; i++) items.push({ _id: `saved-${page * 100 + i}` }); isDone = page === 3; }
    if (args.section === "providerProfiles") { nextSections.push({ section: "sellerOrders", scopeId: "online-profile" }, { section: "sellerOrders", scopeId: "local-profile" }); }
    if (args.section.startsWith("participant")) nextSections.push({ section: "messages", scopeId: "conversation" });
    if (args.section === "sellerOrders") items.push({ _id: args.scopeId });
    if (args.section === "messages") items.push({ _id: "message" }, { _id: "message" });
    return { section: args.section, itemsJson: JSON.stringify(items), nextSections, isDone, continueCursor: isDone ? null : String(page + 1) };
  }, (value) => progress.push(value));
  assert.equal(exported.exportVersion, 2);
  assert.equal(exported.data.savedItems.length, 400);
  assert.equal(exported.data.sellerOrders.length, 2);
  assert.equal(exported.data.messages.length, 1);
  assert.equal(calls.filter((item) => item.section === "messages").length, 1);
  assert.equal(progress.at(-1).records, 403);
  for (const section of ACCOUNT_EXPORT_SECTIONS) assert.ok(Array.isArray(exported.data[section]));
});
await check("Incomplete exports fail visibly on cursor loops, invalid responses and cancellation", async () => {
  await assert.rejects(() => collectAccountExport(async () => ({ itemsJson: "[]", isDone: false, continueCursor: "same" })), /paging/);
  await assert.rejects(() => collectAccountExport(async () => ({ itemsJson: "{}", isDone: true })), /invalid data/);
  const controller = new AbortController(); let calls = 0;
  await assert.rejects(() => collectAccountExport(async () => { calls++; controller.abort(); return { itemsJson: "[]", isDone: true }; }, undefined, controller.signal), { name: "AbortError" });
  assert.equal(calls, 1);
});
await check("Dashboard metrics repair insert/delete cursor chains before considering obsolete page errors", () => {
  const runner = hookRunner();
  const counts = (activeProjects = 0, newProposals = 0, unreadMessages = 0) => ({ activeProjects, newProposals, unreadMessages });
  const page = (nextCursor, values = counts()) => ({ nextCursor, counts: values });
  let actor = user, enabled = true;
  let pages = new Map([[null, page("a", counts(1))], ["a", page("b", counts(0, 2))], ["b", page(null, counts(0, 0, 3))]]);
  const requested = [];
  const hook = loader({ react: runner.react, "./useConvexUser": { default: () => ({ convexUser: actor }) }, "convex/react": {
    useQueries(queries) {
      requested.push(Object.values(queries).map((query) => ({ ...query.args })));
      return Object.fromEntries(Object.entries(queries).map(([key, query]) => [key, pages.get(query.args.cursor)]));
    },
  } })("src/hook/useDashboardMetrics.js").default;
  const total = () => JSON.parse(JSON.stringify(runner.render(() => hook(enabled))));
  assert.deepEqual(total(), counts(1, 2, 3));
  // A reactive insertion changes the first boundary; the previous trailing
  // query is now invalid. The hook must drop it before surfacing its error.
  pages = new Map([[null, page("inserted", counts(1))], ["inserted", page("a", counts(4))], ["a", page("new-end", counts(0, 2))], ["new-end", page(null, counts(0, 0, 3))], ["b", new Error("Stale trailing page after insert")]]);
  assert.deepEqual(total(), counts(5, 2, 3));
  pages = new Map([[null, page("new-end", counts(1))], ["inserted", new Error("Deleted project")], ["a", undefined], ["new-end", page(null, counts(0, 0, 3))]]);
  assert.deepEqual(total(), counts(1, 0, 3));
  // If a predecessor is still loading, a trailing error may also be obsolete.
  pages.set(null, undefined); pages.set("new-end", new Error("Unvalidated trailing page"));
  assert.equal(runner.render(), undefined);
  pages = new Map([[null, page(null, counts(7))]]);
  assert.deepEqual(total(), counts(7));
  actor = { ...user, activeRole: "freelancer" };
  pages = new Map([[null, page(null, counts(9, 8, 7))]]);
  assert.deepEqual(total(), counts(9, 8, 7));
  assert.equal(requested.at(-1).length, 1);
  assert.match(requested.at(-1)[0].contextKey, /:freelancer:online$/);
  actor = { ...user, _id: "different-account" };
  assert.deepEqual(total(), counts(9, 8, 7));
  assert.match(requested.at(-1)[0].contextKey, /^different-account:/);
  enabled = false;
  assert.equal(runner.render(), undefined); assert.equal(requested.at(-1).length, 0);
  enabled = true; pages = new Map([[null, new Error("Current authenticated query failed")]]);
  assert.throws(() => runner.render(), /Current authenticated query failed/);
});
await check("Metrics cursor skips a deleted project but still rejects another client's project", async () => {
  const metrics = backend("convex/marketplace/dashboardMetrics.ts");
  const args = { contextKey: `${user._id}:client:online`, cursor: JSON.stringify({ phase: 4, page: null, projectId: project._id, projectCursor: "next-project", projectDone: false }) };
  const result = await metrics.chunk.handler(fixture(user, null).ctx, args);
  assert.equal(result.counts.newProposals, 0);
  assert.deepEqual(JSON.parse(result.nextCursor), { phase: 3, page: "next-project" });
  assert.equal((await metrics.chunk.handler(fixture(user, null).ctx, { ...args, cursor: JSON.stringify({ ...JSON.parse(args.cursor), projectDone: true }) })).nextCursor, null);
  await assert.rejects(() => metrics.chunk.handler(fixture(user, { ...project, clientId: "another-owner" }).ctx, args), /scope is not available/);
});
console.log(`Dashboard MVP regression checks passed: ${checks} scenario groups.`);
