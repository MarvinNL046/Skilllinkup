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
import * as onboardingRedirects from "../src/lib/onboardingRedirect.mjs";
import * as messagePolicy from "../src/lib/messagePolicy.mjs";
import { upcomingAppointments } from "../src/lib/upcomingAppointments.mjs";
import { validatePublishingForm } from "../src/lib/publishingValidation.mjs";
import * as quoteDraft from "../src/lib/quoteRequestDraft.mjs";

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
    useRef(initial) { const slot = index++; state[slot] ??= { current: initial }; return state[slot]; },
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

function composerFixture(isMobile = false) {
  const runner = hookRunner();
  const sends = [];
  let settle;
  const props = { isMobile, hasConversation: true, currentUserId: "qa", messages: [], onSend: (text) => { sends.push(text); return new Promise((resolve, reject) => { settle = { resolve, reject }; }); } };
  const Box = loader({
    react: runner.react,
    "next-intl": { useTranslations: () => (key) => key },
    "next/image": { default: "img" },
    "next/link": { default: "a" },
    "lucide-react": new Proxy({}, { get: (_, name) => String(name) }),
    "@/lib/messagePolicy.mjs": messagePolicy,
  }, { requestAnimationFrame: (callback) => callback() })("src/components/dashboard/element/MessageBox.jsx").default;
  const render = () => runner.render(() => Box(props));
  return { props, sends, render, settle: () => settle };
}

await check("Local review queue loads more profiles, prevents duplicate decisions and preserves failed evidence", async () => {
  const runner = hookRunner();
  const calls = [], loads = [];
  let settle;
  const Queue = loader({
    react: runner.react,
    "convex/react": {
      usePaginatedQuery: () => ({ results: [{ id: "qa-profile", name: "QA Local", city: "Rotterdam", country: "Netherlands", verified: false, updatedAt: 1 }], status: "CanLoadMore", loadMore: size => loads.push(size) }),
      useMutation: () => args => { calls.push(args); return new Promise((resolve, reject) => { settle = { resolve, reject }; }); },
    },
    sonner: { toast: { success() {} } },
  })("src/components/admin/LocalVerificationQueue.jsx").default;
  const render = () => runner.render(() => Queue());
  let tree = render();
  findElement(tree, e => e.props?.children === "Load more profiles").props.onClick();
  assert.deepEqual(loads, [20]);
  const note = "Checked identity, business evidence and the service area.";
  findElement(tree, e => e.type === "textarea").props.onChange({ target: { value: note } });
  tree = render();
  const button = findElement(tree, e => e.props?.children === "Verify professional");
  const first = button.props.onClick();
  await button.props.onClick();
  assert.equal(calls.length, 1);
  settle.reject(new Error("The profile changed. Review current details.")); await first;
  tree = render();
  assert.equal(findElement(tree, e => e.type === "textarea").props.value, note);
  assert.match(findElement(tree, e => e.props?.role === "alert").props.children, /profile changed/);
  const retry = findElement(tree, e => e.props?.children === "Verify professional").props.onClick();
  settle.resolve(null); await retry;
  assert.equal(calls.length, 2);
  tree = render();
  assert.equal(findElement(tree, e => e.type === "textarea").props.value, "");
});

await check("CV download authenticates each request and streams a non-cacheable attachment", async () => {
  let signedIn = false, allowed = true, unavailable = false;
  let queries = 0, downloads = 0;
  const Route = loader({
    "@clerk/nextjs/server": { auth: async () => ({ userId: signedIn ? "qa" : null, getToken: async () => "qa-token" }) },
    "convex/browser": { ConvexHttpClient: class { setAuth() {} async query() { queries++; if (!allowed) throw Error("Unauthorized"); return unavailable ? null : { url: "https://storage.example.invalid/private", contentType: "application/pdf" }; } } },
  }, { Response, AbortSignal, process: { env: { INTERNAL_EMAIL_SECRET: "fixture-secret", NEXT_PUBLIC_CONVEX_URL: "https://fixture.convex.cloud" } }, fetch: async () => { downloads++; return new Response("%PDF synthetic QA document"); } })("src/app/api/applications/[applicationId]/resume/route.js");
  const get = () => Route.GET(null, { params: Promise.resolve({ applicationId: "application" }) });
  assert.equal((await get()).status, 401); assert.equal(queries, 0);
  signedIn = true; allowed = false;
  assert.equal((await get()).status, 403); assert.equal(downloads, 0);
  allowed = true; unavailable = true;
  assert.equal((await get()).status, 404);
  unavailable = false;
  const response = await get();
  assert.equal(response.status, 200); assert.equal(await response.text(), "%PDF synthetic QA document");
  assert.equal(response.headers.get("cache-control"), "private, no-store");
  assert.match(response.headers.get("content-disposition"), /attachment.*resume.pdf/);
  assert.equal(response.headers.get("location"), null); assert.equal(response.headers.get("x-content-type-options"), "nosniff");
});

await check("Application retry reuses the uploaded CV and preserves the draft after failure", async () => {
  const runner = hookRunner(); let mutationIndex = 0, submits = 0, uploads = 0;
  const messages = [];
  const Panel = loader({
    react: runner.react, "next/link": { default: "a" }, "next/navigation": { usePathname: () => "/jobs/job/qa" },
    "convex/react": { useQuery: () => null, useMutation: () => [async () => "https://upload.example.invalid", async args => { submits++; assert.equal(args.resumeStorageId, "qa-storage"); if (submits === 1) throw Error("Temporary failure"); return "application"; }, async () => {}][mutationIndex++] },
    "lucide-react": new Proxy({}, { get: (_, name) => String(name) }),
    sonner: { toast: { success() {}, error: message => messages.push(message) } },
    "@/hook/useConvexUser": { default: () => ({ isLoaded: true, isAuthenticated: true, convexUser: { _id: "candidate", accountRoles: ["candidate"], activeRole: "candidate", preferredWorld: "jobs" } }) },
    "./JobApplicationPanel.module.css": { default: {} },
  }, { fetch: async () => { uploads++; return { ok: true, json: async () => ({ storageId: "qa-storage" }) }; } })("src/components/jobs/JobApplicationPanel.jsx").default;
  const render = () => runner.render(() => { mutationIndex = 0; return Panel({ jobId: "job", ownerId: "employer" }); });
  let tree = render();
  const cover = "Synthetic application for QA only. Testing upload retries with a sample document without personal details.";
  findElement(tree, e => e.type === "textarea").props.onChange({ target: { value: cover } });
  findElement(tree, e => e.props?.type === "file").props.onChange({ target: { files: [{ name: "qa.pdf", size: 100, type: "application/pdf" }] } });
  tree = render(); await findElement(tree, e => e.type === "form").props.onSubmit({ preventDefault() {} });
  tree = render(); assert.equal(findElement(tree, e => e.type === "textarea").props.value, cover); assert.equal(messages.length, 1);
  await findElement(tree, e => e.type === "form").props.onSubmit({ preventDefault() {} });
  assert.equal(uploads, 1); assert.equal(submits, 2);
  assert.equal(findElement(render(), e => e.type === "textarea").props.value, "");
});



await check("Unavailable jobs stop rendering instead of showing an empty application page", async () => {
  let result = null; let fail = false;
  const Page = loader({
    "convex/nextjs": { fetchQuery: async () => { if (fail) throw new Error("Backend unavailable"); return result; } },
    "next-intl/server": { getTranslations: async () => key => key },
    "next/navigation": { notFound: () => { throw new Error("NOT_FOUND"); } },
    "@/lib/seo/jobPosting.mjs": { buildJobPosting: () => null },
    "@/components/breadcumb/Breadcumb10": { default: "nav" }, "@/components/breadcumb/Breadcumb13": { default: "header" }, "@/components/section/JobDetail1": { default: "section" },
  })("src/app/(jobs-world)/jobs/job/[id]/page.jsx").default;
  await assert.rejects(() => Page({ params: Promise.resolve({ id: "closed-job" }) }), /NOT_FOUND/);
  fail = true;
  await assert.rejects(() => Page({ params: Promise.resolve({ id: "job" }) }), /Backend unavailable/);
  fail = false; result = { status: "open" };
  assert.ok(await Page({ params: Promise.resolve({ id: "job" }) }));
});

await check("Application lists expose loading controls and send stage filters to paginated queries", async () => {
  for (const mode of ["Candidate", "Employer"]) {
    const runner = hookRunner(); let state = "CanLoadMore"; let queryArgs; const loads = [];
    const Page = loader({
      react: runner.react, "next/link": { default: "a" }, "next/image": { default: "img" },
      "convex/react": { usePaginatedQuery: (_query, args, options) => { queryArgs = args; assert.equal(options.initialNumItems, 25); return { results: [], status: state, loadMore: n => loads.push(n) }; }, useMutation: () => async () => {} },
      "lucide-react": new Proxy({}, { get: (_, name) => String(name) }), sonner: { toast: { success() {}, error() {} } },
      "@/hook/useConvexUser": { default: () => ({ isAuthenticated: true }) },
      "@/components/dashboard/header/DashboardNavigation": { default: "nav" },
      ["./" + mode + "Applications.module.css"]: { default: {} },
    })("src/components/dashboard/section/" + mode + "Applications.jsx").default;
    const render = () => runner.render(() => Page({ jobId: "job" }));
    let tree = render(); const more = findElement(tree, e => e.props?.children === "Load more");
    assert.ok(more); assert.equal(more.props.disabled, false); more.props.onClick(); assert.deepEqual(loads, [25]);
    if (mode === "Employer") { findElement(tree, e => e.type === "select" && e.props.value === "all").props.onChange({ target: { value: "screening" } }); render(); assert.equal(queryArgs.status, "screening"); assert.equal(queryArgs.jobId, "job"); }
    state = "LoadingMore"; assert.equal(findElement(render(), e => e.props?.children === "Loading…").props.disabled, true);
    state = "Exhausted"; assert.ok(!findElement(render(), e => e.props?.children === "Load more"));
    state = "LoadingFirstPage"; assert.ok(!findElement(render(), e => e.props?.children === "Load more"));
  }
});

await check("Candidate withdrawal and employer stages block duplicate actions and retry with the current version", async () => {
  for (const mode of ["Candidate", "Employer"]) {
    const runner = hookRunner(); const calls = [];
    let settle;
    const application = { _id: "application", status: "submitted", updatedAt: 1, statusUpdatedAt: 1 };
    const Page = loader({
      react: runner.react, "next/link": { default: "a" }, "next/image": { default: "img" },
      "convex/react": { usePaginatedQuery: () => ({ results: [{ application, job: { slug: "qa", title: "QA vacancy" }, candidate: { name: "QA Candidate", email: "qa@example.invalid" } }], status: "Exhausted", loadMore() {} }), useMutation: () => args => { calls.push(args); return new Promise((resolve, reject) => { settle = { resolve, reject }; }); } },
      "lucide-react": new Proxy({}, { get: (_, name) => String(name) }),
      sonner: { toast: { success() {}, error() {} } },
      "@/hook/useConvexUser": { default: () => ({ isAuthenticated: true }) },
      "@/components/dashboard/header/DashboardNavigation": { default: "nav" },
      [`./${mode}Applications.module.css`]: { default: {} },
    })(`src/components/dashboard/section/${mode}Applications.jsx`).default;
    const render = () => runner.render(() => Page({ jobId: "job" }));
    const action = tree => mode === "Candidate"
      ? () => findElement(tree, e => e.props?.children === "Withdraw").props.onClick()
      : () => findElement(tree, e => e.type === "select" && e.props.value === "").props.onChange({ target: { value: "screening" } });
    const click = action(render()); const first = click(); await click();
    assert.equal(calls.length, 1); assert.equal(calls[0].expectedUpdatedAt, 1);
    settle.reject(new Error("Temporary failure")); await first;
    application.updatedAt = 2;
    const retry = action(render())(); settle.resolve("application"); await retry;
    assert.equal(calls.length, 2); assert.equal(calls[1].expectedUpdatedAt, 2);
  }
});

await check("Appointment form preserves failed dates, blocks overlapping actions and sends the viewed version", async () => {
  const runner = hookRunner();
  let queryIndex = 0, settle;
  const calls = [];
  const visit = { _id: "visit", status: "confirmed", updatedAt: 7, timezone: "Europe/Amsterdam" };
  const order = { _id: "order", status: "active", amount: 150, escrowStatus: "beta_no_payment" };
  const Workspace = loader({
    react: runner.react, "next/link": { default: "a" },
    "convex/react": { useQuery: () => [order, [], null, visit][queryIndex++], useMutation: () => args => { calls.push(args); return new Promise((resolve, reject) => { settle = { resolve, reject }; }); } },
    "lucide-react": new Proxy({}, { get: (_, name) => String(name) }),
    sonner: { toast: { success() {}, error() {} } },
    "@/hook/useConvexUser": { default: () => ({ isAuthenticated: true, convexUser: { _id: "buyer" } }) },
    "@/components/dashboard/header/DashboardNavigation": { default: "nav" },
    "@/hook/useConversationMessages": { default: () => ({}) },
    "@/components/dashboard/element/MessageBox": { default: "MessageBox" },
    "@/lib/orderWorkspace.mjs": { getOrderActionContext: () => ({ isClient: true, isLocal: true, matchesContext: true }) },
    "./OrderWorkspace.module.css": { default: {} },
  })("src/components/dashboard/section/OrderWorkspace.jsx").default;
  const render = () => runner.render(() => { queryIndex = 0; return Workspace({ orderId: "order" }); });
  let tree = render();
  const dateInput = t => findElement(t, e => e.props?.type === "datetime-local");
  dateInput(tree).props.onChange({ target: { value: "2030-10-12T14:30" } });
  tree = render();
  const form = findElement(tree, e => e.type === "form" && dateInput(e));
  const first = form.props.onSubmit({ preventDefault() {} });
  await findElement(tree, e => e.props?.children === "Cancel appointment").props.onClick();
  assert.equal(calls.length, 1); assert.equal(calls[0].expectedUpdatedAt, 7);
  settle.reject(new Error("The appointment changed.")); await first;
  tree = render();
  assert.equal(dateInput(tree).props.value, "2030-10-12T14:30");
  assert.match(findElement(tree, e => e.props?.role === "alert").props.children, /appointment changed/);
  visit.updatedAt = 8;
  tree = render();
  const retry = findElement(tree, e => e.type === "form" && dateInput(e)).props.onSubmit({ preventDefault() {} });
  settle.resolve({ success: true }); await retry;
  assert.equal(calls[1].expectedUpdatedAt, 8);
  assert.equal(dateInput(render()).props.value, "");
  visit.status = "in_progress";
  assert.equal(dateInput(render()), null);
});

await check("Account mode recovery preserves the form destination and switches in place after retry", async () => {
  const runner = hookRunner();
  let account = null, settle;
  const routes = [], mutations = [];
  const destination = "/local/request-quote?category=plumbing#details";
  const Guard = loader({
    react: runner.react,
    "next/navigation": {useRouter:()=>({push:url=>routes.push(url)})},
    "convex/react": {useMutation:()=>args=>{mutations.push(args);return new Promise((resolve,reject)=>{settle={resolve,reject};});}},
    "lucide-react": new Proxy({}, {get:(_,name)=>String(name)}),
    "@/hook/useConvexUser": {default:()=>({convexUser:account,isLoaded:true})},
    "@/lib/onboardingRedirect.mjs": onboardingRedirects,
  },{window:{location:{pathname:"/local/request-quote",search:"?category=plumbing",hash:"#details"}},URLSearchParams})("src/components/dashboard/AccountModeGuard.jsx").default;
  const render=()=>runner.render(()=>Guard({role:"client",world:"local",children:"Protected form"}));
  const button=tree=>findElement(tree,e=>e.type==="Button");
  let tree=render();
  await button(tree).props.onClick();
  assert.equal(new URL(routes.pop(),"https://internal.invalid").searchParams.get("redirect_url"),destination);
  for(const roles of [[],["client"]]) {
    account={accountRoles:roles,activeRole:"client",preferredWorld:"online",onboardingContexts:[]};
    tree=render(); await button(tree).props.onClick();
    const url=new URL(routes.pop(),"https://internal.invalid");
    assert.equal(url.pathname,"/onboarding");
    assert.equal(url.searchParams.get("role"),"client");
    assert.equal(url.searchParams.get("world"),"local");
    assert.equal(url.searchParams.get("redirect_url"),destination);
  }
  assert.equal(mutations.length,0);
  account.onboardingContexts=[{role:"client",world:"local",version:1}];
  tree=render();const first=button(tree).props.onClick();await button(tree).props.onClick();
  assert.equal(mutations.length,1);
  settle.reject(new Error("Offline"));await first;tree=render();
  assert.match(findElement(tree,e=>e.props?.role==="alert").props.children,/try again/);
  const retry=button(tree).props.onClick();settle.resolve({success:true});await retry;
  assert.equal(routes.length,0);
  account={...account,preferredWorld:"local"};
  assert.equal(render(),"Protected form");
});

await check("Local drafts restore only allowed fields and keep different accounts separate", async () => {
  assert.notEqual(quoteDraft.quoteRequestDraftKey("a"), quoteDraft.quoteRequestDraftKey("b"));
  assert.equal(quoteDraft.quoteRequestDraftKey(null), null);
  for (const raw of ["broken", "null", '{"version":2,"form":{}}', '{"version":1,"form":[]}']) assert.equal(quoteDraft.restoreQuoteRequestDraft(raw), null);
  const restored = quoteDraft.restoreQuoteRequestDraft(JSON.stringify({version:1, form:{title:"Saved request", description:"a".repeat(6000),city:17,admin:true}}));
  assert.equal(restored.description.length,5000);
  assert.equal(restored.city,"");
  assert.equal(restored.admin,undefined);
});

await check("Local Save for later survives remount, isolates accounts and reports storage failure", async () => {
  const storage = new Map();
  const routes = [];
  let userId = "qa-one", blocked = false;
  const globals = { localStorage: { getItem: key => storage.get(key) || null, setItem: (key,value) => { if(blocked) throw Error("Storage blocked"); storage.set(key,value); }, removeItem: key => storage.delete(key) } };
  function mount() {
    const runner = hookRunner();
    const Page = loader({
      react: runner.react,
      "next/navigation": { useRouter: () => ({push: url => routes.push(url),back(){}}) },
      "convex/react": {useQuery:()=>[],useMutation:()=>async()=>{throw Error("Drafts must not publish");}},
      "lucide-react": new Proxy({}, {get:(_,name)=>String(name)}),
      "sonner": {toast:{success(){},error(){}}},
      "@/hook/useConvexUser": {default:()=>({convexUser:{_id:userId}})},
      "@/lib/marketplaceCategories": {flattenLeafMarketplaceCategories:()=>[]},
      "@/lib/publishingValidation.mjs": {validatePublishingForm},
      "@/lib/quoteRequestDraft.mjs": quoteDraft,
      "./CreateQuoteRequestInfo.module.css": {default:{}},
    },globals)("src/components/dashboard/section/CreateQuoteRequestInfo.jsx").default;
    return () => runner.render(()=>Page());
  }
  let render = mount(), tree = render();
  const title = tree => findElement(tree,e=>e.props?.placeholder === "Annual air-conditioning maintenance");
  title(tree).props.onChange({target:{value:"Unfinished local request"}});
  tree=render();
  findElement(tree,e=>e.props?.children === "Save for later").props.onClick();
  assert.deepEqual(routes,["/dashboard/quote-requests"]);
  render=mount(); tree=render();
  assert.equal(title(tree).props.value,"Unfinished local request");
  userId="qa-two";tree=render();
  assert.equal(title(tree).props.value,"");
  title(tree).props.onChange({target:{value:"Second account request"}});
  tree=render();blocked=true;
  findElement(tree,e=>e.props?.children === "Save for later").props.onClick();
  tree=render();
  assert.equal(title(tree).props.value,"Second account request");
  assert.match(findElement(tree,e=>e.props?.role === "alert").props.children,/could not save/);
  assert.equal(routes.length,1);
  assert.equal(storage.has(quoteDraft.quoteRequestDraftKey("qa-two")),false);
  assert.equal(quoteDraft.restoreQuoteRequestDraft(storage.get(quoteDraft.quoteRequestDraftKey("qa-one"))).title,"Unfinished local request");
});

await check("Publishing forms reject whitespace, invalid salaries and expired deadlines", async () => {
  const valid = { ...EMPTY_JOB_FORM, title: "QA engineer vacancy", company: "QA Company", description: "Responsibilities and expectations for a qualified engineer. ".repeat(3) };
  assert.equal(validatePublishingForm(valid, "job"), null);
  for (const change of [{ title: "        " }, { description: " ".repeat(100) }, { salaryMin: "200", salaryMax: "100" }, { salaryMin: "Infinity" }, { salaryMax: "-1" }, { expiresAt: "2000-01-01" }, { workType: "local" }]) assert.ok(validatePublishingForm({ ...valid, ...change }, "job"));
});

await check("Actual vacancy and quote forms retain failed drafts, block duplicate submits and navigate on success", async () => {
  for (const kind of ["job", "quote"]) {
    const runner = hookRunner();
    const writes = [], routes = [], removed = [];
    let settle;
    const validJob = { ...EMPTY_JOB_FORM, title: "QA engineer vacancy", company: "QA Company", description: "Responsibilities and expectations for a qualified engineer. ".repeat(3) };
    const component = kind === "job" ? "CreateJobInfo" : "CreateQuoteRequestInfo";
    const Page = loader({
      react: runner.react,
      "next/navigation": { useRouter: () => ({ push: (url) => routes.push(url), back() {} }) },
      "convex/react": { useQuery: () => [], useMutation: () => (args) => { writes.push(args); return new Promise((resolve, reject) => { settle = { resolve, reject }; }); } },
      "lucide-react": new Proxy({}, { get: (_, name) => String(name) }),
      "sonner": { toast: { success() {}, error() {} } },
      "@/hook/useConvexUser": { default: () => ({ convexUser: { _id: "qa", role: "admin", name: "QA" }, isLoaded: true, isAuthenticated: true }) },
      "@/lib/marketplaceCategories": { flattenLeafMarketplaceCategories: () => [{ _id: "qa-category", label: "Plumbing" }] },
      "@/lib/publishingValidation.mjs": { validatePublishingForm },
      "@/lib/quoteRequestDraft.mjs": quoteDraft,
      "@/lib/jobDraft.mjs": { EMPTY_JOB_FORM, jobDraftKey, restoreJobDraft },
      [`./${component}.module.css`]: { default: {} },
    }, { localStorage: { getItem: () => JSON.stringify({ version: 1, form: validJob }), removeItem: (key) => removed.push(key) } })(`src/components/dashboard/section/${component}.jsx`).default;
    let tree = runner.render(() => Page());
    if (kind === "quote") {
      for (const [label, value] of [["Service category", "qa-category"], ["Short title", "QA plumbing request"], ["Description", "Please inspect and repair the leaking kitchen tap with replacement parts."], ["City", "Delft"], ["Postcode", "2611 AA"]]) {
        const field = findElement(tree, (e) => e.type === "label" && findElement(e, (child) => child.type === "span" && child.props.children === label));
        const input = findElement(field, (e) => ["input", "select", "textarea"].includes(e.type));
        if (label === "City") assert.equal(input.props.value, "");
        input.props.onChange({ target: { value } });
        tree = runner.render();
      }
    }
    const form = findElement(tree, (e) => e.type === "form");
    const event = { preventDefault() {} };
    const first = form.props.onSubmit(event);
    await form.props.onSubmit(event);
    assert.equal(writes.length, 1);
    settle.reject(new Error("Temporary connection failure"));
    await first;
    tree = runner.render();
    assert.equal(findElement(tree, (e) => e.props?.role === "alert").props.children, "Temporary connection failure");
    assert.equal(routes.length, 0);
    assert.equal(removed.length, 0);
    const retry = findElement(tree, (e) => e.type === "form").props.onSubmit(event);
    assert.equal(writes[1].title, writes[0].title);
    assert.equal(writes[1].description, writes[0].description);
    settle.resolve("qa-created");
    await retry;
    assert.deepEqual(routes, [kind === "job" ? "/manage-jobs/qa-created/applications" : "/local/quote-request/qa-created"]);
    assert.equal(removed.length, 1);
  }
});

await check("Role dashboards link View all to owned records and keep creation actions separate", async () => {
  const Page = loader({
    "next/link": { default: "a" },
    "convex/react": { useQuery: () => [] },
    "lucide-react": new Proxy({}, { get: (_, name) => String(name) }),
    "@/hook/useConvexUser": { default: () => ({ convexUser: { _id: "qa", name: "QA" }, isAuthenticated: true }) },
    "@/lib/upcomingAppointments.mjs": { upcomingAppointments },
    "./RoleDashboardInfo.module.css": { default: {} },
  })("src/components/dashboard/section/RoleDashboardInfo.jsx").default;
  for (const [role, world, destination, action] of [
    ["client", "local", "/dashboard/quote-requests", "/local/request-quote"],
    ["local_professional", "local", "/dashboard/my-leads", "/local/quote-requests"],
    ["candidate", "jobs", "/dashboard/applications", "/jobs/browse"],
    ["company", "jobs", "/manage-jobs", "/create-job"],
  ]) {
    const tree = Page({ role, world });
    assert.equal(findElement(tree, (e) => e.type === "a" && e.props.children?.[0] === "View all ").props.href, destination);
    assert.ok(findElement(tree, (e) => e.type === "a" && e.props.href === action));
    const empty = findElement(tree, (e) => e.type?.name === "EmptyState");
    assert.equal(findElement(empty.type(empty.props), (e) => e.type === "a").props.href, action);
  }
});

await check("Upcoming visits exclude closed and past appointments and sort the nearest first", async () => {
  const visit = (id, status, scheduledStart) => ({ appointment: { _id: id, status, scheduledStart } });
  const visits = [visit("later", "confirmed", 300), visit("closed", "completed", 400), visit("past", "confirmed", 50), visit("undated", "requested"), visit("next", "requested", 200), visit("cancelled", "cancelled", 250)];
  assert.deepEqual(upcomingAppointments(visits, 100).map(v => v.appointment._id), ["next", "later", "undated"]);
  assert.equal(visits[0].appointment._id, "later");
});

await check("Workspace switch opens missing setup and navigates only after a successful switch", async () => {
  const runner = hookRunner();
  const routes = [], writes = [], errors = [];
  let settle;
  const Switcher = loader({
    react: runner.react,
    "next/link": { default: "a" },
    "next/navigation": { useRouter: () => ({ push: (url) => routes.push(url), replace: (url) => routes.push(url) }) },
    "@/lib/onboardingRedirect.mjs": onboardingRedirects,
    "convex/react": { useMutation: () => (args) => { writes.push(args); return new Promise((resolve, reject) => { settle = { resolve, reject }; }); } },
    "lucide-react": new Proxy({}, { get: (_, name) => String(name) }),
    "sonner": { toast: { error: (error) => errors.push(error) } },
    "@/hook/useConvexUser": { default: () => ({ convexUser: { activeRole: "client", preferredWorld: "online", accountRoles: ["client", "freelancer"], onboardingContexts: [{ role: "client", world: "online", version: 1 }, { role: "freelancer", world: "online", version: 1 }] } }) },
    "./AccountContextSwitcher.module.css": { default: {} },
  })("src/components/dashboard/AccountContextSwitcher.jsx").default;
  const tree = runner.render(() => Switcher({}));
  const change = findElement(tree, (e) => e.type === "Select").props.onValueChange;
  await change("client:local");
  const params = new URL(routes[0], "https://internal.invalid").searchParams;
  assert.equal(params.get("role"), "client");
  assert.equal(params.get("world"), "local");
  assert.equal(writes.length, 0);
  const first = change("freelancer:online");
  await change("freelancer:online");
  assert.equal(writes.length, 1);
  settle.reject(new Error("Offline"));
  await first;
  assert.deepEqual(errors, ["Offline"]);
  assert.equal(routes.length, 1);
  const retry = change("freelancer:online");
  settle.resolve({ success: true });
  await retry;
  assert.equal(routes.at(-1), "/dashboard");
});

await check("Composer preserves multiline drafts, skips IME and prevents duplicate sends", async () => {
  const f = composerFixture();
  let tree = f.render();
  let input = findElement(tree, (e) => e.type === "textarea");
  input.props.onChange({ target: { value: "First line\nSecond line" } });
  tree = f.render();
  input = findElement(tree, (e) => e.type === "textarea");
  for (const extra of [{ shiftKey: true }, { nativeEvent: { isComposing: true } }, { keyCode: 229 }]) {
    await input.props.onKeyDown({ key: "Enter", preventDefault() { throw Error("Must not intercept composition/newline"); }, ...extra });
  }
  assert.equal(f.sends.length, 0);
  const event = { key: "Enter", preventDefault() {} };
  const first = input.props.onKeyDown(event);
  await input.props.onKeyDown(event);
  assert.deepEqual(f.sends, ["First line\nSecond line"]);
  f.settle().reject(new Error("Connection interrupted"));
  await first;
  tree = f.render();
  assert.equal(findElement(tree, (e) => e.type === "textarea").props.value, "First line\nSecond line");
  assert.equal(findElement(tree, (e) => e.props?.role === "alert").props.children, "Connection interrupted");
  const retry = findElement(tree, (e) => e.type === "form").props.onSubmit(event);
  f.settle().resolve();
  await retry;
  tree = f.render();
  assert.equal(findElement(tree, (e) => e.type === "textarea").props.value, "");
});

await check("Mobile Enter adds lines; submit sends, and bubbles retain line breaks", async () => {
  const f = composerFixture(true);
  f.props.messages = [{ _id: "qa-message", content: "One\nTwo", senderId: "qa" }];
  let tree = f.render();
  assert.equal(findElement(tree, (e) => e.type === "p" && e.props.children === "One\nTwo").props.style.whiteSpace, "pre-wrap");
  findElement(tree, (e) => e.type === "textarea").props.onChange({ target: { value: "One\nTwo" } });
  tree = f.render();
  await findElement(tree, (e) => e.type === "textarea").props.onKeyDown({ key: "Enter", preventDefault() { throw Error("Mobile Enter should add a line"); } });
  assert.equal(f.sends.length, 0);
  const send = findElement(tree, (e) => e.type === "form").props.onSubmit({ preventDefault() {} });
  assert.deepEqual(f.sends, ["One\nTwo"]);
  f.settle().resolve();
  await send;
});

await check("Conversation scrolling preserves older history and follows successful outgoing sends", async () => {
  const f = composerFixture();
  let tree = f.render();
  const scroller = findElement(tree, (e) => e.props?.onScroll);
  const element = { scrollHeight: 1000, scrollTop: 100, clientHeight: 400 };
  scroller.props.ref.current = element;
  scroller.props.onScroll({ currentTarget: element });
  f.props.messages = [{ _id: "incoming", content: "New", senderId: "other" }];
  tree = f.render();
  assert.equal(element.scrollTop, 100);
  f.props.messageStatus = "CanLoadMore";
  f.props.onLoadOlder = () => {};
  tree = f.render();
  findElement(tree, (e) => e.props?.children === "Load earlier messages").props.onClick();
  element.scrollHeight = 1500;
  f.props.messages = [{ _id: "older", content: "Old", senderId: "other" }, ...f.props.messages];
  tree = f.render();
  assert.equal(element.scrollTop, 600);
  findElement(tree, (e) => e.type === "textarea").props.onChange({ target: { value: "Reply" } });
  tree = f.render();
  const send = findElement(tree, (e) => e.type === "form").props.onSubmit({ preventDefault() {} });
  f.settle().resolve();
  await send;
  assert.equal(element.scrollTop, 1500);
});

await check("Onboarding retains conversation destinations and rejects external or looping returns", async () => {
  const destination = "/message?conversation=older-message&filter=unread#latest";
  const setup = onboardingRedirects.onboardingUrl(destination);
  const fromLogin = new URLSearchParams(new URLSearchParams({ redirect_url: setup }).toString()).get("redirect_url");
  assert.equal(onboardingRedirects.safeOnboardingRedirect(new URL(fromLogin, "https://internal.invalid").searchParams.get("redirect_url")), destination);
  for (const invalid of [undefined, "https://evil.example", "//evil.example", "javascript:alert(1)", "/login", "/onboarding", "/onboarding?redirect_url=/onboarding", "/%6fnboarding", "/%256fnboarding", "/en/onboarding", "/foo/../onboarding"]) {
    assert.equal(onboardingRedirects.safeOnboardingRedirect(invalid), "/dashboard");
  }
});

await check("All five onboarding roles save before returning, and failures preserve the form", async () => {
  for (const entry of ["client", "client-local", "freelancer", "local_professional", "candidate", "company"]) {
    const role = entry === "client-local" ? "client" : entry;
    const runner = hookRunner();
    const navigations = [], writes = [];
    let fail = true;
    const destination = "/message?conversation=qa-conversation#latest";
    const params = new URLSearchParams({ role, redirect_url: destination });
    if (entry === "client-local") params.set("world", "local");
    const Page = loader({
      react: runner.react,
      "next/image": { default: "img" },
      "next/navigation": { useRouter: () => ({ replace: (url) => navigations.push(url) }), useSearchParams: () => params },
      "convex/react": { useMutation: () => async (value) => { if (fail) throw new Error("Temporary failure"); writes.push(value); } },
      "lucide-react": new Proxy({}, { get: (_, name) => String(name) }),
      "@/hook/useConvexUser": { default: () => ({ convexUser: { accountRoles: ["client"] }, isLoaded: true, isClerkSignedIn: true }) },
      "@/lib/onboardingRedirect.mjs": onboardingRedirects,
      "./OnboardingExperience.module.css": { default: {} },
    }, { URLSearchParams })("src/components/onboarding/OnboardingExperience.jsx").default;
    let tree = runner.render(() => Page());
    const input = (placeholder, value) => {
      findElement(tree, (e) => e.type === "input" && e.props.placeholder === placeholder).props.onChange({ target: { value } });
      tree = runner.render();
    };
    if (role === "freelancer") {
      input("65", "90");
      input("What do you do best?", "QA online headline");
      findElement(tree, (e) => e.props?.children === "Change").props.onClick();
      tree = runner.render();
      findElement(tree, (e) => e.type === "button" && findElement(e, (child) => child.type === "strong" && child.props.children === "I am looking for a job")).props.onClick();
      tree = runner.render();
      assert.equal(findElement(tree, (e) => e.type === "input" && e.props.placeholder === "What do you do best?").props.value, "");
      findElement(tree, (e) => e.props?.children === "Change").props.onClick();
      tree = runner.render();
      findElement(tree, (e) => e.type === "button" && findElement(e, (child) => child.type === "strong" && child.props.children === "I work online")).props.onClick();
      tree = runner.render();
      assert.equal(findElement(tree, (e) => e.type === "input" && e.props.placeholder === "65").props.value, "");
    }
    if (role === "local_professional") {
      assert.equal(findElement(tree, (e) => e.type === "input" && e.props.placeholder === "Rotterdam").props.value, "");
      input("Rotterdam", "Delft");
    }
    if (role === "company") input("Your organisation", "QA Company");
    else {
      findElement(tree, (e) => e.type === "button" && e.props["aria-pressed"] === false && Array.isArray(e.props.children) && typeof e.props.children.at(-1) === "string").props.onClick();
      tree = runner.render();
    }
    await findElement(tree, (e) => e.type === "form").props.onSubmit({ preventDefault() {} });
    tree = runner.render();
    assert.equal(navigations.length, 0);
    assert.equal(findElement(tree, (e) => e.props?.role === "alert").props.children, "Temporary failure");
    fail = false;
    await findElement(tree, (e) => e.type === "form").props.onSubmit({ preventDefault() {} });
    assert.equal(writes.length, 1);
    assert.equal(writes[0].activeRole, role);
    assert.equal(writes[0].preferredWorld, role === "local_professional" || entry === "client-local" ? "local" : ["candidate", "company"].includes(role) ? "jobs" : "online");
    assert.deepEqual(navigations, [destination]);
  }
});
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
await check("Contact button preserves the full login return path and opens the profile context", async () => {
  const runner = hookRunner();
  const routes = [], opened = [];
  let auth = { isLoaded: false, isSignedIn: false }, currentUser = null;
  const Contact = loader({
    react: runner.react,
    "convex/react": { useMutation: () => async (args) => { opened.push(args); return "conversation-fixture"; } },
    "@clerk/nextjs": { useUser: () => auth },
    "next/navigation": { useRouter: () => ({ push: (route) => routes.push(route) }) },
    "next-intl": { useTranslations: () => (key) => key },
    "lucide-react": { Mail: "Mail" },
    "sonner": { toast: { error: () => {} } },
    "@/hook/useConvexUser": { default: () => ({ convexUser: currentUser }) },
  }, { window: { location: { pathname: "/online/freelancer/example", search: "?tab=services", hash: "#contact" } } })("src/components/ui/ContactButton.jsx").default;
  const render = () => runner.render(() => Contact({ recipientId: "seller", profileId: "profile" }));
  assert.equal(render().props.disabled, true);
  auth = { isLoaded: true, isSignedIn: false };
  assert.equal(render().props.type, "button");
  await render().props.onClick();
  assert.equal(routes[0], "/login?redirect_url=%2Fonline%2Ffreelancer%2Fexample%3Ftab%3Dservices%23contact");
  assert.equal(opened.length, 0);
  auth = { isLoaded: true, isSignedIn: true };
  assert.equal(render().props.disabled, true);
  currentUser = { _id: "buyer" };
  await render().props.onClick();
  assert.equal(opened[0].context.type, "profile_inquiry");
  assert.equal(opened[0].context.freelancerProfileId, "profile");
  assert.equal(routes[1], "/message?conversation=conversation-fixture");
  currentUser = { _id: "seller" };
  assert.equal(render(), null);
});
function queryWatcher() {
  const pending = [];
  const client = { watchQuery: (_api, args) => {
    let value, error, callback;
    const item = { args, cancelled: false,
      resolve(next) { value = next; error = undefined; callback?.(); },
      reject(next) { error = next; callback?.(); },
    };
    pending.push(item);
    return {
      onUpdate(next) { callback = next; return () => { item.cancelled = true; callback = null; }; },
      localQueryResult() { if (error) throw error; return value; },
    };
  } };
  return { pending, client };
}
await check("Older conversation links resolve outside the bounded inbox and remain reactive", async () => {
  const runner = hookRunner();
  const { pending, client } = queryWatcher();
  const hook = loader({ react: runner.react, "convex/react": { useConvex: () => client } })("src/hook/useRequestedConversation.js").default;
  let recent = [], loading = true;
  const render = () => runner.render(() => hook("buyer", "old-conversation", recent, loading));
  assert.equal(render().requestedLoading, true);
  assert.equal(pending.length, 0);
  loading = false;
  assert.equal(render().requestedLoading, true);
  assert.equal(pending[0].args.conversationId, "old-conversation");
  pending[0].resolve({ _id: "old-conversation", participant1: "buyer", participant2: "seller", participant2User: { _id: "seller", name: "Seller" }, unreadCount1: 3 });
  await Promise.resolve();
  const result = render();
  assert.equal(result.requestedLoading, false);
  assert.equal(result.conversations[0].otherParticipant._id, "seller");
  assert.equal(result.conversations[0].unreadCount, 3);
  pending[0].resolve({ _id: "old-conversation", participant1: "buyer", participant2: "seller", unreadCount1: 0 });
  assert.equal(render().conversations[0].unreadCount, 0);
  recent = [{ _id: "old-conversation", unreadCount: 0 }];
  assert.equal(render().conversations.length, 1);
  assert.equal(render().conversations[0].unreadCount, 0);
  assert.equal(pending.length, 1);
  assert.equal(pending[0].cancelled, true);
});
await check("Conversation link failures retry safely and stale account responses are discarded", async () => {
  const runner = hookRunner();
  const { pending, client } = queryWatcher();
  const hook = loader({ react: runner.react, "convex/react": { useConvex: () => client } })("src/hook/useRequestedConversation.js").default;
  let actor = "buyer", id = "private-conversation";
  const render = () => runner.render(() => hook(actor, id, [], false));
  render();
  pending[0].reject(new Error("Unauthorized"));
  await Promise.resolve();
  assert.equal(render().requestedError, true);
  assert.equal(render().conversations.length, 0);
  render().retryRequested();
  assert.equal(render().requestedLoading, true);
  assert.equal(pending.length, 2);
  actor = "another-account";
  render();
  pending[1].resolve({ _id: id, participant1: "buyer", participant2: "seller" });
  await Promise.resolve();
  assert.equal(render().conversations.length, 0);
  pending[2].resolve(null);
  await Promise.resolve();
  assert.equal(render().requestedError, true);
  id = null;
  assert.equal(render().requestedError, false);
  assert.equal(render().requestedLoading, false);
});
console.log(`Dashboard MVP regression checks passed: ${checks} scenario groups.`);
