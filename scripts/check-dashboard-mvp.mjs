import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { validateProjectFields } from "../src/lib/projectValidation.mjs";
import { EMPTY_JOB_FORM, jobDraftKey, restoreJobDraft } from "../src/lib/jobDraft.mjs";
import { collectAccountExport, ACCOUNT_EXPORT_SECTIONS } from "../src/lib/accountExport.mjs";
import { getOrderActionContext, getWorkspaceNextStep, orderNeedsAction } from "../src/lib/orderWorkspace.mjs";
import * as onboardingRedirects from "../src/lib/onboardingRedirect.mjs";
import * as messagePolicy from "../src/lib/messagePolicy.mjs";
import { upcomingAppointments } from "../src/lib/upcomingAppointments.mjs";
import { validatePublishingForm } from "../src/lib/publishingValidation.mjs";
import * as onboardingDraft from "../src/lib/onboardingDraft.mjs";
import * as authRedirects from "../src/lib/authRedirect.mjs";
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
      exports, process: { env: {} }, Date, Math, Number, Set, Map, Error, console, crypto, ...globals,
      require(id) {
        if (Object.hasOwn(overrides, id)) return overrides[id];
        if (id === "sonner") return { toast: { success() {}, error() {} } };
        if (id === "convex/values" || id === "convex/server" || id === "react/jsx-runtime") return require(id);
        if (id.includes("_generated/server")) return Object.fromEntries(["query", "mutation", "internalQuery", "internalMutation", "action", "internalAction"].map((name) => [name, (config) => config]));
        if (id.includes("_generated/api")) return { api, internal: api };
        if (id.endsWith("/rateLimits")) return { rateLimiter: { limit: async () => ({ ok: true }) } };
        if (id.endsWith("/notifications")) return { notifyUser: async () => undefined };
        if (id === "@/lib/accountDisplayName.mjs") return load("src/lib/accountDisplayName.mjs");
        if (id === "@/lib/profileRate.mjs") return load("src/lib/profileRate.mjs");
        if (id === "@/lib/messageDraft.mjs") return load("src/lib/messageDraft.mjs");
        if (id === "@/lib/uploadWorkspaceFile.mjs") return load("src/lib/uploadWorkspaceFile.mjs");
        if (id.startsWith("@/components/ui/")) return new Proxy({}, { get: (_, name) => String(name) });
        if (id === "@/components/element/ReviewForm") return { default: "ReviewForm" };
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

await (async () => {
  const Card = loader({
    "next-intl": { useTranslations: () => key => key },
    "next/link": { default: "Link" },
    "react-tooltip": { Tooltip: "Tooltip" },
    "lucide-react": new Proxy({}, { get: (_, name) => String(name) }),
  })("src/components/dashboard/card/ManageJobCard.jsx").default;
  const job = { _id: "qa-job", title: "QA vacancy", slug: "qa-vacancy", status: "open" };
  const nodes = tree => !tree || typeof tree !== "object" ? [] : [tree, ...[tree.props?.children].flat(Infinity).flatMap(nodes)];
  for (const [fields, verified, visible] of [[{}, true, true], [{ status: "closed" }, true, false], [{ status: "filled" }, true, false], [{ expiresAt: 1 }, true, false], [{}, false, false]]) {
    let edited = null;
    const rendered = nodes(Card({ job: { ...job, ...fields }, canViewPublic: verified, onEdit: value => { edited = value._id; } }));
    assert.equal(rendered.some(n => n.props?.href === "/jobs/job/qa-vacancy"), visible);
    assert.ok(rendered.some(n => n.props?.href === "/manage-jobs/qa-job/applications"));
    const edit = rendered.find(n => n.props?.["aria-label"] === "edit");
    edit.props.onClick();
    assert.equal(edited, "qa-job");
  }
  console.log("PASS vacancy actions keep hiring review available and hide unavailable public links");
})();

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

function composerFixture(isMobile = false, navigator = { onLine: true }, connection = { isWebSocketConnected: true, hasEverConnected: true }, window) {
  const runner = hookRunner();
  const sends = [];
  let settle;
  const props = { isMobile, hasConversation: true, currentUserId: "qa", messages: [], onSend: (text) => { sends.push(text); return new Promise((resolve, reject) => { settle = { resolve, reject }; }); } };
  const Box = loader({
    "convex/react": { useConvexConnectionState: () => connection },
    react: runner.react,
    "next-intl": { useTranslations: () => (key) => key },
    "next/image": { default: "img" },
    "next/link": { default: "a" },
    "lucide-react": new Proxy({}, { get: (_, name) => String(name) }),
    "@/lib/messagePolicy.mjs": messagePolicy,
  }, { window, navigator, requestAnimationFrame: (callback) => callback() })("src/components/dashboard/element/MessageBox.jsx").default;
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

await check("Workspace uploads distinguish unreadable Android files from failed network requests", async () => {
  let reads = 0, urls = 0, offline = false, requests = 0;
  const bytes = new Uint8Array([1,2,3]).buffer;
  const file = { size: 3, type: "application/pdf", arrayBuffer: async () => { reads++; return bytes; } };
  const { uploadWorkspaceFile } = loader({}, { fetch: async (_url, options) => { requests++; if (offline) throw new TypeError("Failed to fetch"); assert.equal(options.body,bytes); assert.equal(options.headers["Content-Type"],"application/pdf"); return { ok: true, json: async () => ({ storageId: "stored" }) }; } })("src/lib/uploadWorkspaceFile.mjs");
  const getUrl = async () => { urls++; return "https://fixture.invalid"; };
  await assert.rejects(uploadWorkspaceFile({ ...file, size: 26 * 1024 * 1024 },getUrl),/25 MB/);
  await assert.rejects(uploadWorkspaceFile({ ...file, arrayBuffer: async () => { throw Error("NotReadableError"); } },getUrl),/Downloads/);
  assert.equal(urls,0); assert.equal(requests,0);
  offline=true; await assert.rejects(uploadWorkspaceFile(file,getUrl),/connection failed/);
  offline=false; assert.equal(await uploadWorkspaceFile(file,getUrl),"stored");
  assert.equal(reads,2);
});

await check("Deliverable download preserves filenames and denies unauthenticated, foreign and missing files", async () => {
  let signedIn = false, allowed = true, missing = false, fetched = 0;
  let url = "https://fixture.convex.cloud/api/storage/qa";
  const Route = loader({
    "@clerk/nextjs/server": { auth: async () => ({ userId: signedIn ? "qa" : null, getToken: async () => "qa-token" }) },
    "convex/browser": { ConvexHttpClient: class { setAuth() {} async query() { if (!allowed) throw Error("Unauthorized"); return missing ? null : { url, fileName: 'résumé "final".txt' }; } } },
  }, { Response, AbortSignal, URL, process: { env: { NEXT_PUBLIC_CONVEX_URL: "https://fixture.convex.cloud" } }, fetch: async () => { fetched++; return new Response("QA file"); } })("src/app/api/deliverables/[deliverableId]/download/route.js");
  const get = () => Route.GET(null, { params: Promise.resolve({ deliverableId: "qa" }) });
  assert.equal((await get()).status, 401);
  signedIn = true; allowed = false; assert.equal((await get()).status, 403);
  allowed = true; missing = true; assert.equal((await get()).status, 404);
  assert.equal(fetched, 0); missing = false;
  const response = await get();
  assert.equal(await response.text(), "QA file");
  assert.equal(response.headers.get("cache-control"), "private, no-store");
  assert.equal(response.headers.get("content-type"), "application/octet-stream");
  assert.match(response.headers.get("content-disposition"), /attachment;.*filename\*=UTF-8''r%C3%A9sum%C3%A9%20%22final%22.txt/);
  url = "https://other.example.invalid/api/storage/qa";
  assert.equal((await get()).status, 502); assert.equal(fetched, 1);
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





await check("Onboarding drafts survive remount, isolate accounts and clear only after successful setup", async () => {
  const stored = new Map(); let actor = "account-a"; let failSave = true; let storageFails = false;
  const storage = { get length() { return stored.size; }, key: index => [...stored.keys()][index], getItem: key => { if (storageFails) throw Error("Blocked"); return stored.get(key) ?? null; }, setItem: (key, value) => { if (storageFails) throw Error("Blocked"); stored.set(key, value); }, removeItem: key => stored.delete(key) };
  function mount() {
    const runner = hookRunner();
    const Page = loader({ react: runner.react, "next/image": { default: "img" }, "next/link": { default: "a" },
      "next/navigation": { useRouter: () => ({ replace() {} }), useSearchParams: () => new URLSearchParams("role=company") },
      "@clerk/nextjs": { useClerk: () => ({ signOut: async () => {} }) },
      "convex/react": { useMutation: () => async () => { if (failSave) throw Error("Temporary failure"); } },
      "lucide-react": new Proxy({}, { get: (_, name) => String(name) }),
      "@/hook/useConvexUser": { default: () => ({ convexUser: { _id: actor, accountRoles: [] }, isLoaded: true, isClerkSignedIn: true }) },
      "@/lib/onboardingRedirect.mjs": onboardingRedirects, "@/lib/onboardingDraft.mjs": onboardingDraft, "./OnboardingExperience.module.css": { default: {} },
    }, { URLSearchParams, window: { sessionStorage: storage } })("src/components/onboarding/OnboardingExperience.jsx").default;
    return () => runner.render(() => Page());
  }
  let render = mount(); let tree = render();
  findElement(tree, e => e.props?.placeholder === "Your organisation").props.onChange({ target: { value: "Saved QA draft" } }); render();
  render = mount(); tree = render(); assert.equal(findElement(tree, e => e.props?.placeholder === "Your organisation").props.value, "Saved QA draft");
  actor = "account-b"; tree = render(); assert.equal(findElement(tree, e => e.props?.placeholder === "Your organisation").props.value, "");
  actor = "account-a"; tree = render(); assert.equal(findElement(tree, e => e.props?.placeholder === "Your organisation").props.value, "Saved QA draft");
  const key = onboardingDraft.onboardingDraftKey(actor, "company", null);
  await findElement(tree, e => e.type === "form").props.onSubmit({ preventDefault() {} }); tree = render(); assert.ok(stored.has(key));
  failSave = false; await findElement(tree, e => e.type === "form").props.onSubmit({ preventDefault() {} }); assert.equal(stored.has(key), false);
  render = mount(); tree = render();
  stored.set(onboardingDraft.onboardingDraftKey(actor, "candidate", null), "other-entry");
  const otherAccountKey = onboardingDraft.onboardingDraftKey("account-b", "company", null);
  stored.set(otherAccountKey, "other-account");
  await findElement(tree, e => e.props?.children === "Log out").props.onClick();
  assert.equal(stored.has(key), false); assert.equal(stored.has(onboardingDraft.onboardingDraftKey(actor, "candidate", null)), false); assert.equal(stored.get(otherAccountKey), "other-account");
  storageFails = true; tree = mount()(); assert.ok(findElement(tree, e => e.props?.role === "status" && e.props.children.includes("cannot save")));
  assert.equal(onboardingDraft.restoreOnboardingDraft('{broken'), null);
  assert.equal(onboardingDraft.restoreOnboardingDraft(JSON.stringify({ version: 1, role: "admin" })), null);
});

await check("Onboarding exits preserve drafts on failure and suppress the login redirect during logout", async () => {
  const runner = hookRunner(); const navigations = []; const calls = []; let settle; let signedIn = true; let userReady = true;
  const Page = loader({
    react: runner.react, "next/image": { default: "img" }, "next/link": { default: "a" },
    "next/navigation": { useRouter: () => ({ replace: url => navigations.push(url) }), useSearchParams: () => new URLSearchParams("role=company") },
    "@clerk/nextjs": { useClerk: () => ({ signOut: args => { calls.push(args); return new Promise((resolve, reject) => { settle = {resolve, reject}; }); } }) },
    "convex/react": { useMutation: () => async () => { throw new Error("Should not save"); } },
    "lucide-react": new Proxy({}, { get: (_, name) => String(name) }),
    "@/hook/useConvexUser": { default: () => ({ convexUser: userReady ? { accountRoles: [] } : null, isLoaded: true, isClerkSignedIn: signedIn }) },
    "@/lib/onboardingRedirect.mjs": onboardingRedirects, "@/lib/onboardingDraft.mjs": onboardingDraft, "./OnboardingExperience.module.css": { default: {} },
  }, { URLSearchParams })("src/components/onboarding/OnboardingExperience.jsx").default;
  const render = () => runner.render(() => Page()); let tree = render();
  findElement(tree, e => e.props?.placeholder === "Your organisation").props.onChange({ target: { value: "QA retained company" } });
  tree = render(); findElement(tree, e => e.props?.children === "Change").props.onClick();
  tree = render(); findElement(tree, e => e.type === "button" && findElement(e, x => x.type === "strong" && x.props.children === "Hire for a company")).props.onClick();
  tree = render(); assert.equal(findElement(tree, e => e.props?.placeholder === "Your organisation").props.value, "QA retained company");
  const logout = findElement(tree, e => e.props?.children === "Log out").props.onClick;
  const first = logout(); await logout(); assert.equal(calls.length, 1);
  settle.reject(new Error("Temporary failure")); await first; tree = render();
  assert.equal(findElement(tree, e => e.props?.placeholder === "Your organisation").props.value, "QA retained company");
  assert.ok(findElement(tree, e => e.props?.role === "alert"));
  const retry = findElement(tree, e => e.props?.children === "Log out").props.onClick();
  signedIn = false; render(); assert.deepEqual(navigations, []);
  settle.resolve(); await retry; assert.equal(calls[1].redirectUrl, "/");
  signedIn = true; userReady = false; tree = render();
  assert.ok(findElement(tree, e => e.type === "a" && e.props.href === "/"));
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
      "./HiringOverview": { default: "HiringOverview" },
    })("src/components/dashboard/section/" + mode + "Applications.jsx").default;
    const render = () => runner.render(() => Page({ jobId: "job" }));
    let tree = render(); const more = findElement(tree, e => e.props?.children === "Load more");
    assert.ok(more); assert.equal(more.props.disabled, false); more.props.onClick(); assert.deepEqual(loads, [25]);
    if (mode === "Employer") { findElement(tree, e => e.type === "select" && e.props.value === "all").props.onChange({ target: { value: "screening" } }); render(); assert.equal(queryArgs.status, "screening"); assert.equal(queryArgs.jobId, "job"); }
    if (mode === "Employer") { const overview = () => findElement(render(), e => e.type === "HiringOverview"); overview().props.onApplication("linked-application"); render(); assert.equal(queryArgs.applicationId, "linked-application"); assert.equal(queryArgs.status, undefined); overview().props.onView("invitations"); render(); assert.equal(queryArgs, "skip"); overview().props.onView("applications"); render(); assert.equal(queryArgs.applicationId, undefined); }
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
      "./HiringOverview": { default: "HiringOverview" },
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
  const scrolledSections = [];
  const visit = { _id: "visit", status: "confirmed", updatedAt: 7, timezone: "Europe/Amsterdam" };
  const order = { _id: "order", status: "active", amount: 150, escrowStatus: "beta_no_payment" };
  const Workspace = loader({
    react: runner.react, "next/link": { default: "a" },
    "convex/react": { useQuery: () => [order, [], null, visit][queryIndex++], useMutation: () => args => { calls.push(args); return new Promise((resolve, reject) => { settle = { resolve, reject }; }); } },
    "lucide-react": new Proxy({}, { get: (_, name) => String(name) }),
    sonner: { toast: { success() {}, error() {} } },
    "@/hook/useConvexUser": { default: () => ({ isAuthenticated: true, convexUser: { _id: "buyer" } }) },
    "@/components/dashboard/header/DashboardNavigation": { default: "nav" },
    "@/hook/useIsMobile": { default: () => true },
    "@/hook/useConversationMessages": { default: () => ({}) },
    "@/components/dashboard/element/MessageBox": { default: "MessageBox" },
    "@/lib/orderWorkspace.mjs": { getWorkspaceNextStep, getOrderActionContext: () => ({ isClient: true, isLocal: true, matchesContext: true }) },
    "./OrderWorkspace.module.css": { default: {} },
  }, { window: { location: { hash: "#workspace-files" } }, document: { getElementById: id => ({ scrollIntoView: () => scrolledSections.push(id) }) }, requestAnimationFrame: fn => { fn(); return 1; }, cancelAnimationFrame() {} })("src/components/dashboard/section/OrderWorkspace.jsx").default;
  const render = () => runner.render(() => { queryIndex = 0; return Workspace({ orderId: "order" }); });
  let tree = render();
  assert.deepEqual(scrolledSections, ["workspace-files"]);
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

await check("Delivery review requires confirmation, preserves failed feedback and blocks duplicate requests", async () => {
  for (const mode of ["delivery", "approval", "revision"]) {
    const runner = hookRunner(); let queryIndex = 0, settle;
    const calls = [];
    const order = { _id: "order", title: "Synthetic mobile delivery", status: mode === "delivery" ? "active" : "delivered", amount: 1, escrowStatus: "beta_no_payment" };
    const Workspace = loader({
      react: runner.react, "next/link": { default: "a" },
      "convex/react": { useQuery: () => [order, [], null, null][queryIndex++], useMutation: () => args => { calls.push(args); return new Promise((resolve, reject) => { settle = { resolve, reject }; }); } },
      "lucide-react": new Proxy({}, { get: (_, name) => String(name) }),
      "@/hook/useConvexUser": { default: () => ({ isAuthenticated: true, convexUser: { _id: "qa" } }) },
      "@/components/dashboard/header/DashboardNavigation": { default: "nav" },
      "@/hook/useIsMobile": { default: () => true },
      "@/hook/useConversationMessages": { default: () => ({}) },
      "@/components/dashboard/element/MessageBox": { default: "MessageBox" },
      "@/lib/orderWorkspace.mjs": { getWorkspaceNextStep, getOrderActionContext: () => ({ isClient: mode !== "delivery", isLocal: false, matchesContext: true }) },
      "./OrderWorkspace.module.css": { default: {} },
    }, { window: { location: { hash: "" } } })("src/components/dashboard/section/OrderWorkspace.jsx").default;
    const render = () => runner.render(() => { queryIndex = 0; return Workspace({ orderId: "order" }); });
    const button = (tree, label) => findElement(tree, e => e.type === "Button" && [e.props.children].flat().includes(label));
    const field = (tree, label) => findElement(tree, e => e.props?.["aria-label"] === label);
    let tree = render();
    if (mode === "delivery") {
      field(tree, "Delivery note").props.onChange({ target: { value: "Unsaved work" } });
      tree = render();
      assert.equal(button(tree, "Submit work for review").props.disabled, true);
      await button(tree, "Submit work for review").props.onClick();
      assert.equal(calls.length, 0);
      field(tree, "Delivery note").props.onChange({ target: { value: "" } });
    } else if (mode === "approval") {
      button(tree, "Approve delivery").props.onClick();
      assert.equal(calls.length, 0);
      tree = render();
      assert.equal(findElement(tree, e => e.type === "Dialog").props.open, true);
      button(tree, "Keep reviewing").props.onClick();
      assert.equal(findElement(render(), e => e.type === "Dialog").props.open, false);
      button(render(), "Approve delivery").props.onClick();
    } else {
      field(tree, "Revision request").props.onChange({ target: { value: "Please add a clear version heading." } });
    }
    const action = tree => mode === "revision"
      ? () => findElement(tree, e => e.type === "form" && field(e, "Revision request")).props.onSubmit({ preventDefault() {} })
      : button(tree, mode === "approval" ? "Confirm completion" : "Submit work for review").props.onClick;
    const click = action(render()); const first = click(); await click();
    assert.equal(calls.length, 1);
    settle.reject(new Error("Connection interrupted")); await first;
    tree = render();
    if (mode === "approval") {
      assert.equal(findElement(tree, e => e.type === "Dialog").props.open, true);
      assert.match(findElement(tree, e => e.props?.role === "alert").props.children, /Connection interrupted/);
    }
    if (mode === "revision") assert.equal(field(tree, "Revision request").props.value, "Please add a clear version heading.");
    const retry = action(tree)(); settle.resolve({ success: true }); await retry;
    assert.equal(calls.length, 2);
    if (mode === "approval") assert.equal(findElement(render(), e => e.type === "Dialog").props.open, false);
    if (mode === "revision") assert.equal(field(render(), "Revision request").props.value, "");
  }
});

await check("Order reviews retain failed drafts, block duplicate taps and show the saved review after remount", async () => {
  let saved = [], settle;
  const calls = [];
  function mount() {
    const runner = hookRunner();
    const Form = loader({
      react: { ...runner.react, useId: () => "review-input" },
      "next-intl": { useTranslations: () => key => key },
      "convex/react": { useQuery: () => saved, useMutation: () => args => { calls.push(args); return new Promise((resolve, reject) => { settle = { resolve, reject }; }); } },
      "@/components/ui/StarRating": { default: "StarRating" },
      "@/hook/useConvexUser": { default: () => ({ convexUser: { _id: "client" } }) },
      "lucide-react": new Proxy({}, { get: (_, name) => String(name) }),
    })("src/components/element/ReviewForm.jsx").default;
    return () => runner.render(() => Form({ orderId: "order", revieweeId: "provider", reviewerRole: "client" }));
  }
  let render = mount();
  const form = tree => findElement(tree, e => e.type === "form");
  const rating = tree => findElement(tree, e => e.type === "StarRating" && e.props.label === "overallRating");
  const content = tree => findElement(tree, e => e.type === "Textarea");
  rating(render()).props.onChange(4);
  content(render()).props.onChange({ target: { value: "short" } });
  await form(render()).props.onSubmit({ preventDefault() {} });
  assert.equal(calls.length, 0);
  content(render()).props.onChange({ target: { value: "QA ONLY saved review text." } });
  const submit = form(render()).props.onSubmit;
  const first = submit({ preventDefault() {} }); await submit({ preventDefault() {} });
  assert.equal(calls.length, 1);
  settle.reject(new Error("Connection interrupted")); await first;
  assert.equal(rating(render()).props.value, 4);
  assert.equal(content(render()).props.value, "QA ONLY saved review text.");
  const retry = form(render()).props.onSubmit({ preventDefault() {} });
  settle.resolve("review"); await retry;
  assert.equal(calls[1].orderId, "order"); assert.equal(calls[1].revieweeId, "provider");
  saved = [{ reviewerId: "client", overallRating: 4, content: "QA ONLY saved review text.", isPublic: false }];
  render = mount();
  assert.equal(form(render()), null);
  assert.ok(findElement(render(), e => e.props?.children === "QA ONLY saved review text."));
  assert.equal(findElement(render(), e => e.props?.role === "status").props.children[1], "blindVisibilityNote");
  saved = [{ ...saved[0], isPublic: true }, { reviewerId: "provider", overallRating: 5, content: "QA ONLY received review.", isPublic: true }];
  assert.ok(findElement(render(), e => e.props?.children === "QA ONLY received review."));
  assert.equal(findElement(render(), e => e.props?.role === "status").props.children[1], "Both reviews are now visible.");
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
    "@/lib/onboardingRedirect.mjs": onboardingRedirects, "@/lib/onboardingDraft.mjs": onboardingDraft,
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
    "@/lib/onboardingRedirect.mjs": onboardingRedirects, "@/lib/onboardingDraft.mjs": onboardingDraft,
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

await check("Composer reports connection and acknowledgement states without premature success", async () => {
  const connection = { isWebSocketConnected: false, hasEverConnected: false };
  const network = { onLine: true };
  const events = new Map();
  const f = composerFixture(false, network, connection, {
    addEventListener: (name, callback) => events.set(name, callback),
    removeEventListener: name => events.delete(name),
  });
  let tree = f.render();
  const status = () => findElement(tree, e => e.props?.id === "message-connection-status").props.children;
  const input = () => findElement(tree, e => e.type === "textarea");
  const submit = () => findElement(tree, e => e.type === "form").props.onSubmit({ preventDefault() {} });
  assert.match(status(), /Connecting/);
  input().props.onChange({ target: { value: "QA connection status" } });
  tree = f.render();
  await submit();
  assert.equal(f.sends.length, 0);
  assert.equal(input().props.disabled, false);
  connection.hasEverConnected = true;
  tree = f.render();
  assert.match(status(), /Reconnecting/);
  network.onLine = false; events.get("offline")(); tree = f.render();
  assert.match(status(), /offline/);
  network.onLine = true; events.get("online")();
  connection.isWebSocketConnected = true; tree = f.render();
  const sending = submit(); tree = f.render();
  assert.match(status(), /Waiting for confirmation/);
  connection.isWebSocketConnected = false; tree = f.render();
  assert.match(status(), /retry automatically/);
  await submit(); assert.equal(f.sends.length, 1);
  f.settle().reject(new Error("Delivery failed")); await sending;
  connection.isWebSocketConnected = true; tree = f.render();
  assert.notEqual(status(), "Message sent.");
  assert.equal(input().props.value, "QA connection status");
  const retry = submit(); f.settle().resolve(); await retry; tree = f.render();
  assert.equal(status(), "Message sent.");
  assert.equal(input().props.value, "");
});

await check("Existing proposals show persisted status and block a fresh submission", async () => {
  const runner = hookRunner(); let existing; let writes = 0;
  const Form = loader({ react: runner.react, "next/link": { default: "a" },
    "@/hook/useMyProjectProposal": { default: () => existing },
    "next-intl": { useTranslations: () => key => key },
    "convex/react": { useMutation: () => async () => { writes++; } },
    "lucide-react": new Proxy({}, { get: (_, key) => String(key) }),
  })("src/components/element/BidForm.jsx").default;
  let tree = runner.render(() => Form({ projectId: "qa" }));
  assert.equal(findElement(tree, e => e.type === "form"), null);
  for (const status of ["pending", "accepted", "rejected", "withdrawn"]) {
    existing = { status, amount: 125, currency: "EUR", pitch: "QA saved proposal", deliveryDays: 3, orderId: status === "accepted" ? "order" : null };
    tree = runner.render();
    assert.equal(findElement(tree, e => e.type === "form"), null);
    assert.ok(findElement(tree, e => e.props?.children === "QA saved proposal"));
    assert.ok(findElement(tree, e => e.props?.href === (status === "accepted" ? "/orders/order" : "/proposal")));
  }
  existing = null; tree = runner.render();
  assert.ok(findElement(tree, e => e.type === "form"));
  assert.equal(writes, 0);
});

await check("Category search filters groups, keeps selected value and reports no results", async () => {
  const runner = hookRunner(); let chosen = "web";
  const options = [{ _id: "web", label: "Programming / Web Development" }, { _id: "logo", label: "Design / Logo Design" }];
  const Select = loader({ react: { ...runner.react, useId: () => "category-test" } })("src/components/ui/SearchableCategorySelect.jsx").default;
  let tree = runner.render(() => Select({ options, value: chosen, onChange: value => { chosen = value; } }));
  const search = value => { findElement(tree, e => e.type === "input").props.onChange({ target: { value } }); tree = runner.render(); };
  search("logo");
  assert.ok(findElement(tree, e => e.type === "optgroup" && e.props.label === "Current selection"));
  assert.equal(findElement(tree, e => e.type === "select").props.value, "web");
  findElement(tree, e => e.type === "select").props.onChange({ target: { value: "logo" } }); tree = runner.render();
  assert.equal(chosen, "logo");
  search("no-match");
  assert.match(String(findElement(tree, e => e.props?.role === "status").props.children), /No matching/);
  findElement(tree, e => e.props?.children === "Clear").props.onClick(); tree = runner.render();
  assert.ok(findElement(tree, e => e.type === "option" && e.props.value === "web"));
  assert.equal(chosen, "logo");
});

await check("Offline composer retains text and allows sending after reconnecting", async () => {
  const connection = { onLine: false };
  const f = composerFixture(false, connection);
  let tree = f.render();
  findElement(tree, e => e.type === "textarea").props.onChange({ target: { value: "QA offline draft" } });
  tree = f.render();
  await findElement(tree, e => e.type === "form").props.onSubmit({ preventDefault() {} });
  tree = f.render();
  assert.equal(f.sends.length, 0);
  assert.equal(findElement(tree, e => e.type === "textarea").props.value, "QA offline draft");
  assert.match(findElement(tree, e => e.props?.role === "alert").props.children, /offline/);
  connection.onLine = true;
  const retry = findElement(tree, e => e.type === "form").props.onSubmit({ preventDefault() {} });
  f.settle().resolve();
  await retry;
  assert.deepEqual(f.sends, ["QA offline draft"]);
  assert.equal(findElement(f.render(), e => e.type === "textarea").props.value, "");
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
    const navigations = [], writes = [], confirmations = [];
    let fail = true;
    const destination = "/message?conversation=qa-conversation#latest";
    const params = new URLSearchParams({ role, redirect_url: destination });
    if (entry === "client-local") params.set("world", "local");
    const Page = loader({
      react: runner.react,
      sonner: { toast: { success: (message) => {
        assert.equal(writes.length, 1, "Confirm only after persistence succeeds");
        assert.equal(navigations.length, 0, "Confirm before redirecting");
        confirmations.push(message);
      } } },
      "next/image": { default: "img" },
      "next/navigation": { useRouter: () => ({ replace: (url) => navigations.push(url) }), useSearchParams: () => params },
      "convex/react": { useMutation: () => async (value) => { if (fail) throw new Error("Temporary failure"); writes.push(value); } },
      "lucide-react": new Proxy({}, { get: (_, name) => String(name) }),
      "@/hook/useConvexUser": { default: () => ({ convexUser: { accountRoles: ["client"] }, isLoaded: true, isClerkSignedIn: true }) },
      "@/lib/onboardingRedirect.mjs": onboardingRedirects, "@/lib/onboardingDraft.mjs": onboardingDraft,
      "./OnboardingExperience.module.css": { default: {} },
      "next/link": { default: "a" }, "@clerk/nextjs": { useClerk: () => ({ signOut: async () => {} }) },
    }, { URLSearchParams })("src/components/onboarding/OnboardingExperience.jsx").default;
    let tree = runner.render(() => Page());
    const input = (placeholder, value) => {
      findElement(tree, (e) => e.type === "input" && e.props.placeholder === placeholder).props.onChange({ target: { value } });
      tree = runner.render();
    };
    if (role === "freelancer") {
      input("65", "90");
      input("e.g. Web designer for small businesses", "QA online headline");
      findElement(tree, (e) => e.props?.children === "Change").props.onClick();
      tree = runner.render();
      findElement(tree, (e) => e.type === "button" && findElement(e, (child) => child.type === "strong" && child.props.children === "Find a job")).props.onClick();
      tree = runner.render();
      assert.equal(findElement(tree, (e) => e.type === "input" && e.props.placeholder === "e.g. Web designer for small businesses").props.value, "");
      findElement(tree, (e) => e.props?.children === "Change").props.onClick();
      tree = runner.render();
      findElement(tree, (e) => e.type === "button" && findElement(e, (child) => child.type === "strong" && child.props.children === "Offer online services")).props.onClick();
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
    assert.equal(confirmations.length, 0, "Failed setup must not show a success toast");
    fail = false;
    await findElement(tree, (e) => e.type === "form").props.onSubmit({ preventDefault() {} });
    assert.equal(writes.length, 1);
    assert.equal(writes[0].activeRole, role);
    assert.equal(writes[0].preferredWorld, role === "local_professional" || entry === "client-local" ? "local" : ["candidate", "company"].includes(role) ? "jobs" : "online");
    assert.deepEqual(navigations, [destination]);
    assert.deepEqual(confirmations, ["Your account setup is saved."]);
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
  assert.deepEqual(total(), { ...counts(1, 2, 3), orderValues: {} });
  pages.get(null).orderValues = [{ currency: "EUR", cents: 1050, orders: 1 }];
  pages.get("a").orderValues = [{ currency: "EUR", cents: 2050, orders: 1 }, { currency: "USD", cents: 999, orders: 1 }];
  assert.deepEqual(total().orderValues, { EUR: { cents: 3100, orders: 2 }, USD: { cents: 999, orders: 1 } });
  // A reactive insertion changes the first boundary; the previous trailing
  // query is now invalid. The hook must drop it before surfacing its error.
  pages = new Map([[null, page("inserted", counts(1))], ["inserted", page("a", counts(4))], ["a", page("new-end", counts(0, 2))], ["new-end", page(null, counts(0, 0, 3))], ["b", new Error("Stale trailing page after insert")]]);
  assert.deepEqual(total(), { ...counts(5, 2, 3), orderValues: {} });
  pages = new Map([[null, page("new-end", counts(1))], ["inserted", new Error("Deleted project")], ["a", undefined], ["new-end", page(null, counts(0, 0, 3))]]);
  assert.deepEqual(total(), { ...counts(1, 0, 3), orderValues: {} });
  // If a predecessor is still loading, a trailing error may also be obsolete.
  pages.set(null, undefined); pages.set("new-end", new Error("Unvalidated trailing page"));
  assert.equal(runner.render(), undefined);
  pages = new Map([[null, page(null, counts(7))]]);
  assert.deepEqual(total(), { ...counts(7), orderValues: {} });
  actor = { ...user, activeRole: "freelancer" };
  pages = new Map([[null, page(null, counts(9, 8, 7))]]);
  assert.deepEqual(total(), { ...counts(9, 8, 7), orderValues: {} });
  assert.equal(requested.at(-1).length, 1);
  assert.match(requested.at(-1)[0].contextKey, /:freelancer:online$/);
  actor = { ...user, _id: "different-account" };
  assert.deepEqual(total(), { ...counts(9, 8, 7), orderValues: {} });
  assert.match(requested.at(-1)[0].contextKey, /^different-account:/);
  enabled = false;
  assert.equal(runner.render(), undefined); assert.equal(requested.at(-1).length, 0);
  enabled = true; pages = new Map([[null, new Error("Current authenticated query failed")]]);
  assert.throws(() => runner.render(), /Current authenticated query failed/);
});
await check("Order value keeps currencies separate and excludes cancelled and local work", async () => {
  const metrics = backend("convex/marketplace/dashboardMetrics.ts");
  const ctx = fixture(user, null).ctx;
  const originalQuery = ctx.db.query;
  ctx.db.query = (table) => table !== "orders" ? originalQuery(table) : {
    withIndex(index, select) {
      assert.equal(index, "by_client");
      select({ eq(field, value) { assert.equal(field, "clientId"); assert.equal(value, user._id); } });
      return { paginate: async ({ numItems }) => {
        assert.equal(numItems, 100);
        return { isDone: true, continueCursor: "end", page: [
          { orderType: "project", status: "active", amount: 10.25, currency: "EUR" },
          { orderType: "gig", status: "completed", amount: 20.50, currency: "EUR" },
          { orderType: "project", status: "completed", amount: 30, currency: "USD" },
          { orderType: "project", status: "cancelled", amount: 999, currency: "EUR" },
          { orderType: "local", status: "active", amount: 999, currency: "EUR" },
        ] };
      } };
    },
  };
  const result = await metrics.chunk.handler(ctx, { cursor: null, contextKey: `${user._id}:client:online` });
  assert.deepEqual(JSON.parse(JSON.stringify(result.orderValues)), [
    { currency: "EUR", cents: 3075, orders: 2 }, { currency: "USD", cents: 3000, orders: 1 },
  ]);
  assert.equal(result.counts.activeProjects, 1);
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

await check("Notification actions report failure, retry and block duplicate writes while preserving destinations", async () => {
  const runner = hookRunner(), errors = [], calls = [], queryArgs = [];
  let authenticated = true, rejectRead = true, settleAll, queryIndex = 0, mutationIndex = 0;
  const items = [
    { _id: "message", link: "/message?conversation=abc#latest", isRead: false },
    { _id: "company", link: "/manage-jobs/job-id/applications", isRead: false },
    { _id: "candidate", link: "/dashboard/applications" },
    { _id: "local", link: "/dashboard/my-leads" },
    { _id: "order", link: "/orders/order-id" },
    { _id: "unsafe", link: "javascript:alert(1)" },
    { _id: "external", link: "//external.example" },
    { _id: "plain" },
  ];
  const hook = loader({ react: runner.react, sonner: { toast: { error: text => errors.push(text) } },
    "./useConvexUser": { default: () => ({ convexUser: { _id: "viewer" }, isAuthenticated: authenticated }) },
    "@/lib/authRedirect.mjs": authRedirects,
    "convex/react": {
      useQuery: (_, args) => { queryArgs.push(args); return queryIndex++ % 2 === 0 ? items : 8; },
      useMutation: () => mutationIndex++ % 2 === 0 ? async args => { calls.push(args); if (rejectRead) throw Error("offline"); return { success: true }; }
        : args => { calls.push(args); return new Promise((resolve, reject) => { settleAll = { resolve, reject }; }); },
    },
  })("src/hook/useConvexNotifications.js").default;
  const render = () => runner.render(() => hook(50));
  let result = render();
  assert.equal(result.notifications[0].link, items[0].link);
  for (let i = 0; i < 5; i++) {
    const destination = result.notifications[i].link;
    const afterLogin = new URLSearchParams(new URLSearchParams({ redirect_url: destination }).toString()).get("redirect_url");
    assert.equal(authRedirects.safeAuthRedirect(afterLogin), destination);
  }
  assert.equal(result.notifications[5].link, "/dashboard");
  assert.equal(result.notifications[6].link, "/dashboard");
  assert.equal(result.notifications[7].link, undefined);
  const first = result.markRead({ notificationId: "message" });
  await result.markRead({ notificationId: "message" });
  await first;
  assert.equal(calls.length, 1); assert.equal(errors.length, 1);
  rejectRead = false;
  assert.equal((await result.markRead({ notificationId: "message" })).success, true);
  const all = result.markAllRead();
  assert.equal(render().markingAll, true);
  await result.markAllRead();
  assert.equal(calls.length, 3);
  settleAll.reject(Error("offline")); await all;
  assert.equal(render().markingAll, false); assert.equal(errors.length, 2);
  const retry = render().markAllRead(); settleAll.resolve({ success: true, markedCount: 8 });
  assert.equal((await retry).markedCount, 8);
  authenticated = false;
  result = render();
  assert.equal(result.notifications, undefined); assert.equal(result.unreadCount, 0);
  assert.deepEqual(queryArgs.slice(-2), ["skip", "skip"]);
  const count = calls.length; await result.markRead({ notificationId: "message" }); await result.markAllRead(); assert.equal(calls.length, count);
});

await check("Workspace guidance respects participant, context and terminal states", async () => {
  const client = { isClient: true, isLocal: false, matchesContext: true };
  const provider = { ...client, isClient: false };
  assert.equal(getWorkspaceNextStep({ status: "delivered" }, client).label, "Review delivery");
  assert.equal(getWorkspaceNextStep({ status: "delivered" }, provider).href, "#workspace-conversation");
  assert.equal(getWorkspaceNextStep({ status: "active" }, { ...client, matchesContext: false, requiredContext: "client · online" }).href, undefined);
  for (const context of [client, provider]) {
    assert.equal(getWorkspaceNextStep({ status: "disputed" }, context).href, "/dashboard/support");
    assert.equal(getWorkspaceNextStep({ status: "completed" }, context).label, "View files");
    assert.equal(getWorkspaceNextStep({ status: "cancelled" }, context).label, "View conversation");
  }
  assert.equal(getWorkspaceNextStep({ status: "active" }, { ...provider, isLocal: true }).href, "#workspace-work");
  assert.equal(getWorkspaceNextStep({ status: "revision_requested" }, provider).label, "View feedback");
});

console.log(`Dashboard MVP regression checks passed: ${checks} scenario groups.`);

{
 const buyer = {_id:"buyer",activeRole:"client",accountRoles:["client"],preferredWorld:"online"};
 const seller = {_id:"seller",activeRole:"freelancer",accountRoles:["freelancer"],preferredWorld:"online"};
 const row = {clientId:"buyer",orderType:"project",status:"delivered"};
 assert.equal(orderNeedsAction(row,buyer),true);
 assert.equal(orderNeedsAction(row,seller),false);
 assert.equal(orderNeedsAction({...row,status:"revision_requested"},seller),true);
 for (const status of ["completed","cancelled","disputed","active","pending"]) assert.equal(orderNeedsAction({...row,status},buyer),false);
 assert.equal(orderNeedsAction({...row,orderType:"local_quote"},buyer),false);
 assert.equal(orderNeedsAction(row,{...buyer,preferredWorld:"local"}),false);
 console.log("PASS Order attention respects delivery, participant context and terminal states");
}

{
 const runner=hookRunner(); const timers=new Map(); let timerId=0, calls=0;
 const data={orders:[],isLoading:false,profiles:[],canLoadMore:true,loadingMore:false,loadMore:()=>{calls++;}};
 const List=loader({react:runner.react,"next-intl":{useTranslations:()=>key=>key},"next/link":{default:"a"},"lucide-react":{Receipt:"Receipt"},"@/lib/utils":{cn:(...parts)=>parts.join(" ")},"@/lib/accountContext.mjs":{getActiveRole:()=>"client"},"@/lib/orderWorkspace.mjs":{orderNeedsAction},"@/hook/useConvexUser":{default:()=>({convexUser:{_id:"buyer",activeRole:"client",preferredWorld:"online"}})},"@/hook/useConvexOrders":{default:()=>data},"@/components/card/OrderCard":{default:"OrderCard"}}, {setTimeout:fn=>{timers.set(++timerId,fn);return timerId;},clearTimeout:id=>timers.delete(id)})("src/components/section/OrderList.jsx").default;
 let tree=runner.render(()=>List()); assert.equal(timers.size,0);
 const search=()=>findElement(tree,e=>e.type==="input" && e.props.type==="search");
 search().props.onChange({target:{value:"older-order"}});tree=runner.render();assert.equal(timers.size,1);
 [...timers.values()][0]();timers.clear();assert.equal(calls,1);
 data.loadingMore=true;data.canLoadMore=false;tree=runner.render();assert.equal(timers.size,0);
 data.loadingMore=false;data.canLoadMore=true;tree=runner.render();assert.equal(timers.size,1);
 search().props.onChange({target:{value:""}});tree=runner.render();assert.equal(timers.size,0);
 search().props.onChange({target:{value:"older-order"}});tree=runner.render();data.canLoadMore=false;tree=runner.render();assert.equal(timers.size,0);
 console.log("PASS History search advances sequentially, stops on clear and stops at exhaustion");
}

await check("Message drafts isolate accounts and conversations, survive reload and share pending sends", async () => {
  const records = new Map();
  const storage = {getItem:key=>records.get(key)||null,setItem:(key,value)=>records.set(key,value),removeItem:key=>records.delete(key)};
  const globals = {window:{sessionStorage:storage}};
  const drafts = loader({},globals)("src/lib/messageDraft.mjs");
  const key = drafts.messageDraftKey("qa-one","conversation-one");
  drafts.writeMessageDraft(key,"First line\nSecond line");
  assert.equal(drafts.readMessageDraft(drafts.messageDraftKey("qa-two","conversation-one")),"");
  assert.equal(drafts.readMessageDraft(drafts.messageDraftKey("qa-one","conversation-two")),"");
  assert.equal(loader({},globals)("src/lib/messageDraft.mjs").readMessageDraft(key),"First line\nSecond line");
  let calls=0, settle;
  const send=()=>{calls++;return new Promise((resolve,reject)=>{settle={resolve,reject};});};
  const first=drafts.sendMessageDraft(key,drafts.readMessageDraft(key),send);
  const duplicate=drafts.sendMessageDraft(key,drafts.readMessageDraft(key),send);
  assert.equal(first,duplicate);assert.equal(calls,1);assert.equal(drafts.isMessagePending(key),true);
  settle.reject(new Error("Connection interrupted"));
  await assert.rejects(first,/Connection interrupted/);
  assert.equal(drafts.isMessagePending(key),false);
  assert.equal(drafts.readMessageDraft(key),"First line\nSecond line");
  const retry=drafts.sendMessageDraft(key,drafts.readMessageDraft(key),send);
  settle.resolve();await retry;
  assert.equal(drafts.readMessageDraft(key),"");assert.equal(records.has(key),false);
  drafts.writeMessageDraft(key,"Older draft");
  const older=drafts.sendMessageDraft(key,"Older draft",send);
  drafts.writeMessageDraft(key,"Newer draft from another mounted view");
  settle.resolve();await older;
  assert.equal(drafts.readMessageDraft(key),"Newer draft from another mounted view");
  const blocked=loader({},{window:{sessionStorage:{getItem(){throw Error("blocked");},setItem(){throw Error("blocked");}}}})("src/lib/messageDraft.mjs");
  assert.equal(blocked.writeMessageDraft(key,"Keep in memory"),false);
  assert.equal(blocked.readMessageDraft(key),"Keep in memory");
});

await check("LAN HTTP message sends work without randomUUID and retain retry IDs", async () => {
  const values = new Map();
  const globals = { crypto: { getRandomValues: bytes => crypto.getRandomValues(bytes) }, window: { sessionStorage: { getItem: k => values.get(k) ?? null, setItem: (k,v) => values.set(k,v), removeItem: k => values.delete(k) } } };
  const draft = loader({}, globals)("src/lib/messageDraft.mjs");
  const key = draft.messageDraftKey("client", "conversation");
  draft.writeMessageDraft(key, "QA mobile message");
  let firstId;
  await assert.rejects(draft.sendMessageDraft(key, "QA mobile message", async (_content,id) => { firstId=id; throw Error("offline"); }));
  assert.match(firstId, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  const restored = loader({}, globals)("src/lib/messageDraft.mjs");
  await restored.sendMessageDraft(key, "QA mobile message", async (_content,id) => { assert.equal(id,firstId); });
  assert.equal(restored.readMessageDraft(key), "");
});

await check("Lost message acknowledgement reuses persisted request after reload", async () => {
  const records = new Map();
  const globals = { window: { sessionStorage: {
    getItem: key => records.get(key) || null,
    setItem: (key, value) => records.set(key, value),
    removeItem: key => records.delete(key),
  } } };
  const first = loader({}, globals)("src/lib/messageDraft.mjs");
  const key = first.messageDraftKey("qa", "conversation");
  first.writeMessageDraft(key, "QA retry check");
  let originalId;
  await assert.rejects(first.sendMessageDraft(key, "QA retry check", async (_, id) => {
    originalId = id;
    assert.equal(JSON.parse(records.get(`${key}:attempt`)).id, id);
    throw Error("Acknowledgement lost after commit");
  }));
  const reloaded = loader({}, globals)("src/lib/messageDraft.mjs");
  await reloaded.sendMessageDraft(key, reloaded.readMessageDraft(key), async (_, id) => assert.equal(id, originalId));
  assert.equal(records.has(`${key}:attempt`), false);
  reloaded.writeMessageDraft(key, "QA retry check");
  await reloaded.sendMessageDraft(key, "QA retry check", async (_, id) => assert.notEqual(id, originalId));
});

await check("Proposal cards keep closed projects unlinked and show saved pitch and order action", async () => {
  const Card = loader({
    "next/link": { default: "a" },
    "next-intl": { useTranslations: () => key => key },
    "@/hook/useMyProjectProposal": { default: () => ({ orderId: "qa-order" }) },
  })("src/components/dashboard/card/ProposalCard1.jsx").default;
  const bid = { _id: "qa-bid", projectId: "qa-project", projectTitle: "QA project", projectSlug: "qa-project", projectStatus: "completed", status: "accepted", amount: 125, currency: "EUR", deliveryDays: 3, createdAt: 1789319054078, pitch: "Saved QA pitch" };
  let tree = Card({ bid });
  assert.equal(findElement(tree, e => e.props?.href === "/online/project/qa-project"), null);
  assert.ok(findElement(tree, e => e.props?.children === "Saved QA pitch"));
  const action = findElement(tree, e => typeof e.type === "function" && e.props?.projectId === "qa-project");
  assert.ok(findElement(action.type(action.props), e => e.props?.href === "/orders/qa-order"));
  tree = Card({ bid: { ...bid, status: "pending", projectStatus: "open" } });
  assert.ok(findElement(tree, e => e.props?.href === "/online/project/qa-project"));
});


await check("Proposal pagination reaches beyond 50, preserves cursors and rejects other owners", async () => {
  const rows = Array.from({ length: 55 }, (_, i) => ({ _id: `bid-${i}`, _creationTime: i, freelancerId: "provider", projectId: "project", amount: 125, deliveryDays: 3, pitch: "QA", status: "pending", createdAt: i, updatedAt: i }));
  const actor = { _id: "owner", tenantId: "tenant" };
  const query = loader({ "../lib/authHelpers": { requireAuthUser: async () => actor } })("convex/marketplace/projects.ts").getMyBidsPage;
  let indexed = false;
  const ctx = { db: {
    get: async id => id === "provider" ? { userId: "owner" } : id === "other" ? { userId: "outsider" } : { _id: "project", tenantId: "tenant", title: "QA", slug: "qa", status: "open", currency: "EUR" },
    query: table => { assert.equal(table, "bids"); return { withIndex: (name, select) => {
      assert.equal(name, "by_freelancer"); select({ eq: (field, value) => { assert.equal(field, "freelancerId"); assert.equal(value, "provider"); indexed = true; } });
      return { order: direction => { assert.equal(direction, "desc"); return { paginate: async opts => {
        const start = Number(opts.cursor || 0); const end = Math.min(rows.length, start + opts.numItems);
        return { page: rows.slice(start, end), isDone: end === rows.length, continueCursor: String(end) };
      } }; } };
    } }; },
  } };
  const seen = []; let cursor = null; let done = false;
  while (!done) { const result = await query.handler(ctx, { freelancerId: "provider", paginationOpts: { numItems: 20, cursor } }); seen.push(...result.page); cursor = result.continueCursor; done = result.isDone; }
  assert.equal(indexed, true); assert.equal(seen.length, 55); assert.equal(new Set(seen.map(row => row._id)).size, 55);
  assert.equal(seen[54].projectTitle, "QA");
  await assert.rejects(() => query.handler(ctx, { freelancerId: "other", paginationOpts: { numItems: 20, cursor: null } }), /Unauthorized/);
});

await check("Proposal load-more remains available under an empty filter and disables during loading", async () => {
  const runner = hookRunner(); let status = "CanLoadMore"; const requests = [];
  const Page = loader({ react: runner.react, "next/link": { default: "a" },
    "next-intl": { useTranslations: () => key => key },
    "../card/ProposalCard1": { default: "ProposalCard" }, "../header/DashboardNavigation": { default: "Navigation" },
    "@/hook/useConvexUser": { default: () => ({ convexUser: { _id: "owner" }, isLoaded: true, isAuthenticated: true }) },
    "@/hook/useConvexProfile": { default: () => ({ profile: { _id: "provider" } }) },
    "convex/react": { usePaginatedQuery: () => ({ results: [{ _id: "bid", status: "pending" }], status, loadMore: count => requests.push(count) }) },
  })("src/components/dashboard/section/ProposalInfo.jsx").default;
  let tree = runner.render(Page);
  const rejected = findElement(tree, e => e.props?.['aria-pressed'] !== undefined && JSON.stringify(e.props.children).includes("Not selected"));
  rejected.props.onClick(); tree = runner.render();
  const more = findElement(tree, e => e.props?.children === "Load more proposals"); assert.ok(more); more.props.onClick(); assert.deepEqual(requests, [20]);
  status = "LoadingMore"; tree = runner.render(); assert.equal(findElement(tree, e => e.props?.children === "Loading more…").props.disabled, true);
  status = "Exhausted"; tree = runner.render(); assert.equal(findElement(tree, e => e.props?.children === "Load more proposals"), null);
});

await check("Proposal status query selects the full indexed history before pagination", async () => {
  const handler = loader({ "../lib/authHelpers": { requireAuthUser: async () => ({ _id: "owner", tenantId: "tenant" }) } })("convex/marketplace/projects.ts").getMyBidsPage.handler;
  const rows = Array.from({length: 61}, (_, i) => ({_id: `bid-${i}`, projectId: "project", status: i < 60 ? "accepted" : "pending", amount: 125, currency: "EUR"}));
  const ctx = { db: {
    get: async id => id === "provider" ? {userId: "owner"} : {_id:"project",tenantId:"tenant",title:"QA",slug:"qa",status:"open"},
    query: () => ({ withIndex: (name, select) => {
      assert.equal(name, "by_freelancer_status"); const fields = {}; const range = { eq: (field, value) => { fields[field] = value; return range; } }; select(range);
      assert.equal(fields.freelancerId, "provider");
      return { order: () => ({ paginate: async () => ({page: rows.filter(row => row.status === fields.status), isDone:true,continueCursor:"done"}) }) };
    } }),
  } };
  const result = await handler(ctx,{freelancerId:"provider",status:"pending",paginationOpts:{numItems:20,cursor:null}});
  assert.equal(result.page.length,1); assert.equal(result.page[0]._id,"bid-60");
});

await check("Client choice requires review, prevents duplicate acceptance and retains failed choice", async () => {
  const runner = hookRunner(); const calls = []; const routes = []; let settle;
  const bids = Array.from({length:4},(_,i)=>({_id:`bid-${i}`,freelancerName:`QA ${i}`,status:"pending",amount:125+i,deliveryDays:3,currency:"EUR",pitch:"QA scope",createdAt:i}));
  const List = loader({"@/hook/useProposalComparison":{default:()=>{const [ids,setIds]=runner.react.useState([]);return {ids,change:(op,id)=>setIds(old=>op==="add"?[...old,id]:op==="clear"?[]:old.filter(x=>x!==id))};}},react:runner.react,"next/link":{default:"a"},"next/image":{default:"img"},
    "next-intl":{useTranslations:()=>key=>key},"next/navigation":{useRouter:()=>({push:url=>routes.push(url)})},
    "@/lib/utils":{cn:(...x)=>x.filter(Boolean).join(" ")},"lucide-react":new Proxy({},{get:(_,key)=>String(key)}),
    "convex/react":{useQuery:()=>bids,useMutation:()=>args=>{calls.push(args);return new Promise((resolve,reject)=>{settle={resolve,reject};});}},
  })("src/components/element/BidList.jsx").default;
  let tree=runner.render(()=>List({projectId:"project",isOwner:true,projectStatus:"open"}));
  for(let i=0;i<3;i++){ const input=findElement(tree,e=>e.type==="input"&&e.props.type==="checkbox"&&!e.props.checked); input.props.onChange({target:{checked:true}});tree=runner.render(); }
  assert.equal(findElement(tree,e=>e.type==="input"&&!e.props.checked).props.disabled,true);
  findElement(tree,e=>e.props?.children==="Review choice").props.onClick(); tree=runner.render(); assert.equal(calls.length,0);
  let confirm=findElement(tree,e=>e.props?.children==="Confirm and open workspace"); const first=confirm.props.onClick();const second=confirm.props.onClick();assert.equal(calls.length,1);
  settle.reject(new Error("QA temporary failure"));await Promise.all([first,second]);tree=runner.render();assert.ok(findElement(tree,e=>e.props?.children==="QA temporary failure"));
  confirm=findElement(tree,e=>e.props?.children==="Confirm and open workspace");const retry=confirm.props.onClick();settle.resolve({orderId:"qa-order"});await retry;assert.deepEqual(routes,["/orders/qa-order"]);
});


await check("Saved comparisons persist, isolate owners/projects and enforce the three-bid limit", async () => {
  let actor = { _id:"owner", tenantId:"tenant" };
  const state = new Map([["project",{_id:"project",clientId:"owner",tenantId:"tenant"}],...Array.from({length:4},(_,i)=>[`b${i}`,{_id:`b${i}`,projectId:"project"}]),["foreign",{_id:"foreign",projectId:"another"}]]);
  const ctx={db:{get:async id=>state.get(id),patch:async(id,fields)=>state.set(id,{...state.get(id),...fields})}};
  const api=loader({"../lib/authHelpers":{requireAuthUser:async()=>actor}})("convex/marketplace/proposalComparison.ts");
  const change=(operation,bidId)=>api.update.handler(ctx,{projectId:"project",operation,bidId});
  await change("add","b0");await change("add","b1");await change("add","b2");await change("add","b0");
  assert.equal((await api.get.handler(ctx,{projectId:"project"})).length,3);
  await assert.rejects(()=>change("add","b3"),/three/);await assert.rejects(()=>change("add","foreign"),/belong/);
  actor={_id:"outsider",tenantId:"tenant"};await assert.rejects(()=>change("clear"),/Unauthorized/);await assert.rejects(()=>api.get.handler(ctx,{projectId:"project"}),/Unauthorized/);
  actor={_id:"owner",tenantId:"other"};await assert.rejects(()=>change("clear"),/Unauthorized/);
  actor={_id:"owner",tenantId:"tenant"};state.delete("b0");await change("add","b3");assert.equal((await api.get.handler(ctx,{projectId:"project"})).length,3);
  await change("remove","b1");await change("clear");assert.equal((await api.get.handler(ctx,{projectId:"project"})).length,0);
});

await check("Comparison saving blocks duplicate requests and retains server state on failure", async () => {
  const runner=hookRunner();const calls=[];let settle;let stored=[];
  const useComparison=loader({react:runner.react,"convex/react":{useQuery:()=>stored,useMutation:()=>args=>{calls.push(args);return new Promise((resolve,reject)=>{settle={resolve,reject};});}}})("src/hook/useProposalComparison.js").default;
  let model=runner.render(()=>useComparison("project",true));const first=model.change("add","bid");await model.change("add","other");assert.equal(calls.length,1);
  settle.reject(new Error("QA failed save"));await first;model=runner.render();assert.equal(model.ids.length,0);assert.equal(model.error,"QA failed save");assert.equal(model.saving,false);
  const retry=model.change("add","bid");stored=["bid"];settle.resolve(null);await retry;model=runner.render();assert.equal(model.ids[0],"bid");assert.equal(model.error,"");
});
