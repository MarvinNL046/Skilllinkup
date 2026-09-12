const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { pathToFileURL } = require("node:url");
const ts = require("typescript");
const root = path.resolve(__dirname, "..");
const modules = new Map();
function ref(parts = []) { return new Proxy({}, { get: (_target, key) => key === "path" ? parts.join(".") : ref([...parts, key]) }); }
const validator = new Proxy({}, { get: () => () => ({}) });
function load(file) {
  file = path.resolve(root, file);
  if (modules.has(file)) return modules.get(file);
  const exports = {}; modules.set(file, exports);
  const source = ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(source, { exports, Date, Set, Map, URL, process: { env: {} }, require: (id) => {
    if (id === "convex/values") return { v: validator };
    if (id === "convex/server") return {
      paginationOptsValidator: {}, paginationResultValidator: () => ({}), defineSchema: (tables) => tables,
      defineTable: () => { const table = { indexes: {}, index(name, fields) { this.indexes[name] = [...fields, "_creationTime"]; return this; }, searchIndex() { return this; } }; return table; },
    };
    if (id.includes("_generated/server")) return Object.fromEntries(["query", "mutation", "action", "internalQuery", "internalMutation", "internalAction"].map((kind) => [kind, (definition) => definition]));
    if (id.includes("_generated/api")) return { api: ref(), internal: ref(), components: ref() };
    if (id.endsWith("/rateLimits")) return { rateLimiter: { limit: async () => {} } };
    if (id.startsWith(".")) return load(path.resolve(path.dirname(file), id + (path.extname(id) ? "" : ".ts")));
    throw Error("Unexpected import: " + id);
  }});
  return exports;
}
const schema = load("convex/schema.ts").default;
const discovery = load("convex/marketplace/discovery.ts");
function fixture(rows) {
  // Fixtures represent records after the declared discovery-key migration.
  rows = rows.map((record) => record._table === "jobs" ? { ...record, salarySortValue: record.salaryMax ?? record.salaryMin } : record._table === "projects" ? { ...record, budgetSortValue: record.budgetMax ?? record.budgetMin } : record);
  let pages = 0;
  const clone = (value) => value == null ? value : structuredClone(value);
  return { get pages() { return pages; }, db: {
    get: async (id) => clone(rows.find((row) => row._id === id) ?? null),
    query(table) {
      const filters = []; let indexFields = ["_creationTime"], direction = 1;
      const index = { eq(key, value) { filters.push((row) => row[key] === value); return index; } };
      const ordered = () => rows.filter((row) => row._table === table && filters.every((matches) => matches(row))).sort((a, b) => {
        for (const key of indexFields) {
          if (a[key] === b[key]) continue;
          if (a[key] == null) return -direction;
          if (b[key] == null) return direction;
          return (a[key] < b[key] ? -1 : 1) * direction;
        }
        return 0;
      });
      const query = {
        withIndex(name, callback) { assert.ok(schema[table].indexes[name], `${table}.${name} exists in actual schema`); indexFields = schema[table].indexes[name]; callback?.(index); return query; },
        order(value) { direction = value === "desc" ? -1 : 1; return query; },
        async take(count) { assert.ok(count <= 50, "enrichment reads stay bounded"); return clone(ordered().slice(0, count)); },
        async paginate({ cursor, numItems }) { pages++; assert.ok(numItems <= 50); const start = Number(cursor ?? 0), all = ordered(); return { page: clone(all.slice(start, start + numItems)), isDone: start + numItems >= all.length, continueCursor: String(start + numItems) }; },
      };
      return query;
    },
  }};
}
const row = (table, id, extra = {}) => ({ _table: table, _id: id, _creationTime: 1, createdAt: 1, updatedAt: 1, locale: "en", ...extra });
const profile = (id, extra = {}) => row("freelancerProfiles", id, { userId: "owner", tenantId: "tenant", providerRole: "freelancer", displayName: "Hélène Smith", status: "active", workType: "remote", tagline: "Web designer", skills: ["Web design", "React"], languages: ["Dutch", "English"], locationCity: "Rotterdam", locationCountry: "Netherlands", hourlyRate: 75, ratingAverage: 4.5, ratingCount: 3, isAvailable: true, stripeAccountId: "never-public", creditBalance: 100, ...extra });
const job = (id, extra = {}) => row("jobs", id, { title: "React engineer", description: "Develop applications", company: "Acme", clientId: "client", status: "open", jobType: "full-time", experienceLevel: "senior", workType: "local", locationCity: "Rotterdam", locationCountry: "Netherlands", salaryMin: 50000, salaryMax: 70000, currency: "EUR", tenantId: "private", ...extra });
const project = (id, extra = {}) => row("projects", id, { title: "Website redesign", description: "React design", clientId: "client", status: "open", workType: "remote", budgetMin: 1000, budgetMax: 2500, currency: "EUR", locationCity: "Rotterdam", tenantId: "private", locationPostcode: "private", attachments: ["private"], ...extra });
const gig = (id, extra = {}) => row("gigs", id, { title: "Build a website", slug: id, description: "Responsive web design", status: "active", tenantId: "tenant", workType: "remote", freelancerId: "pro", categoryId: "child", ...extra });
const args = (extra = {}) => ({ locale: "en", paginationOpts: { numItems: 24, cursor: null }, ...extra });
const ids = (result) => Array.from(result.page, (item) => item._id);
const client = row("users", "client", { name: "Acme", companyVerificationStatus: "verified", emailVerified: true, email: "private@example.invalid" });
const tests = [];
async function test(name, fn) { await fn(); tests.push(name); }
async function allPages(endpoint, ctx, options) {
  const records = []; let cursor = null, result;
  do { result = await endpoint.handler(ctx, args({ ...options, paginationOpts: { numItems: 24, cursor } })); records.push(...result.page); cursor = result.continueCursor; assert.ok(ctx.pages < 50, "cursor progresses"); } while (!result.isDone);
  return records;
}
async function main() {
  const helpers = await import(pathToFileURL(path.join(root, "src/lib/marketplaceDiscovery.mjs")));
  await test("home and header search preserve selected world and location", () => {
    assert.equal(helpers.discoveryHref({ scope: "jobs", query: " React ", location: "New York" }), "/jobs/browse?q=React&location=New+York");
    assert.equal(helpers.discoveryHref({ scope: "local", query: "plumbing" }), "/local/craftsmen?q=plumbing");
    assert.equal(helpers.discoveryHref(), "/services?q=");
  });
  await test("consecutive filter edits preserve each other before router search params update", () => {
    const hookExports = {}, snapshots = [], effects = [];
    const browser = { location: { search: "?q=React&page=3" }, history: { replaceState(_state, _title, url) { browser.location.search = new URL(url, "https://example.invalid").search; } } };
    const staleParams = new URLSearchParams(browser.location.search);
    const hookSource = ts.transpileModule(fs.readFileSync(path.join(root, "src/hook/useDiscoveryFilters.js"), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
    vm.runInNewContext(hookSource, { exports: hookExports, window: browser, URLSearchParams, require: (id) => {
      if (id === "next/navigation") return { usePathname: () => "/jobs/browse", useSearchParams: () => staleParams };
      if (id === "react") return { useRef: (current) => ({ current }), useState: (initial) => [initial(), (value) => snapshots.push(value)], useEffect: (effect) => effects.push(effect) };
      throw Error("Unexpected hook import " + id);
    }});
    const hook = hookExports.default();
    hook.update({ verified: "1" }); hook.update({ available: "1" }); hook.update({ minSalary: "7" }); hook.update({ minSalary: "75" });
    const current = new URLSearchParams(browser.location.search);
    assert.equal(current.get("verified"), "1"); assert.equal(current.get("available"), "1"); assert.equal(current.get("minSalary"), "75"); assert.equal(current.get("q"), "React"); assert.equal(current.has("page"), false);
    assert.equal(snapshots.at(-1).minSalary, "75"); assert.equal(snapshots.at(-1).verified, "1");
    effects[0](); assert.equal(snapshots.at(-1).available, "1", "an older router render cannot roll back current URL filters");
    browser.location.search = "?q=Previous"; effects[0](); assert.equal(snapshots.at(-1).q, "Previous", "Back/Forward restores URL filters");
    hook.reset(); assert.equal(browser.location.search, "");
  });
  await test("job mapper preserves real fields, both salary bounds and currency", () => {
    const mapped = helpers.mapJob(job("job", { currency: "USD", categoryName: "Technology" }));
    assert.equal(mapped.jobType, "full-time"); assert.equal(mapped.level, "senior"); assert.equal(mapped.salaryMax, 70000);
    assert.match(mapped.benefits[0], /\$50,000.*\$70,000/); assert.equal(mapped.category, "Technology");
    assert.equal(helpers.mapJob(job("unknown", { salaryMin: undefined, salaryMax: undefined })).salary, null);
  });
  await test("project mapper retains numeric budgets for comparison and unknown timing", () => {
    const mapped = helpers.mapProject(project("p", { currency: "USD" }));
    assert.equal(mapped.budgetMin, 1000); assert.equal(mapped.budgetMax, 2500); assert.match(mapped.budget, /US\$/); assert.equal(mapped.duration, "Timing to agree");
    assert.equal(helpers.mapProject(project("p", { budgetMin: undefined, budgetMax: undefined })).budget, "Budget to agree");
  });
  await test("professional mapper does not invent rate, level, language or availability", () => {
    const mapped = helpers.mapProfessional(profile("p", { hourlyRate: undefined, level: "rising", languages: ["Dutch", "English"], isAvailable: false }));
    assert.equal(mapped.price, null); assert.equal(mapped.level, "rising"); assert.deepEqual(mapped.languages, ["Dutch", "English"]); assert.equal(mapped.isAvailable, false);
  });
  await test("package pricing uses cheapest actual package currency and package unit", () => {
    assert.equal(helpers.servicePriceLabel({ hourlyRate: 99 }), "Price on request");
    assert.match(helpers.servicePriceLabel({ packages: [{ price: 200, currency: "USD" }, { price: 50, currency: "USD" }] }), /US\$50\.00 \/ package/);
    assert.match(helpers.servicePriceLabel({ packages: [{ price: 0, currency: "EUR" }] }), /€0\.00/);
  });
  await test("job filters use employment type, work model, experience, salary overlap and currency", async () => {
    const ctx = fixture([client, job("yes"), job("contract", { jobType: "contract" }), job("remote", { workType: "remote" }), job("junior", { experienceLevel: "junior" }), job("dollars", { currency: "USD" }), job("low", { salaryMax: 40000, salaryMin: 30000 })]);
    const result = await discovery.jobs.handler(ctx, args({ jobType: "full-time", workType: "local", experienceLevel: "senior", salaryMin: 60000, salaryMax: 80000, currency: "EUR" }));
    assert.deepEqual(ids(result), ["yes"]); assert.equal(result.page[0].tenantId, undefined);
  });
  await test("jobs hide expired listings and unverified companies", async () => {
    const ctx = fixture([client, row("users", "unverified", { companyVerificationStatus: "pending" }), job("yes"), job("expired", { expiresAt: Date.now() - 100 }), job("unverified", { clientId: "unverified" })]);
    assert.deepEqual(ids(await discovery.jobs.handler(ctx, args())), ["yes"]);
  });
  await test("Other category matches uncategorized jobs and projects", async () => {
    for (const [endpoint, record] of [["jobs", job("other")], ["projects", project("other")]]) {
      assert.deepEqual(ids(await discovery[endpoint].handler(fixture([client, record]), args({ category: "Other" }))), ["other"]);
    }
  });
  await test("salary sort follows actual schema index across cursor pages", async () => {
    const ctx = fixture([client, ...Array.from({ length: 55 }, (_, i) => job("job" + i, { salaryMax: 10000 + i * 1000, _creationTime: 55 - i }))]);
    const records = await allPages(discovery.jobs, ctx, { sort: "salary" });
    assert.equal(records.length, 55); assert.equal(records[0].salaryMax, 64000); assert.equal(records.at(-1).salaryMax, 10000);
  });
  await test("min-only budgets and salaries sort by their actual value above smaller ranges", async () => {
    for (const [endpoint, records, sort] of [["projects", [project("range", { budgetMin: 500, budgetMax: 1000 }), project("minimum", { budgetMin: 5000, budgetMax: undefined })], "budget"], ["jobs", [job("range", { salaryMin: 500, salaryMax: 1000 }), job("minimum", { salaryMin: 5000, salaryMax: undefined })], "salary"]]) {
      assert.deepEqual(ids(await discovery[endpoint].handler(fixture([client, ...records]), args({ sort }))), ["minimum", "range"]);
    }
  });
  await test("sparse search advances beyond old 100 row ceiling without duplicate results", async () => {
    const rows = [client, ...Array.from({ length: 125 }, (_, i) => job("job" + i, { title: i < 3 ? "Rare skill" : "Other role", _creationTime: i }))];
    const first = await discovery.jobs.handler(fixture(rows), args({ query: "rare" }));
    assert.equal(first.page.length, 0); assert.equal(first.isDone, false);
    const records = await allPages(discovery.jobs, fixture(rows), { query: "rare" });
    assert.equal(records.length, 3); assert.equal(new Set(records.map((item) => item._id)).size, 3);
  });
  await test("projects apply actual budget/deadline/verification filters and strip private fields", async () => {
    const deadline = Date.now() + 7 * 86400000;
    const ctx = fixture([client, project("yes", { deadline }), project("tooLate", { deadline: deadline + 90 * 86400000 }), project("dollars", { deadline, currency: "USD" }), project("local", { deadline, workType: "local" }), project("hybrid", { deadline, workType: "hybrid" }), project("missingDeadline")]);
    const result = await discovery.projects.handler(ctx, args({ budgetMin: 2000, budgetMax: 3000, currency: "EUR", deadlineDays: 30, verifiedOnly: true }));
    assert.deepEqual(ids(result), ["yes"]); for (const key of ["tenantId", "locationPostcode", "attachments"]) assert.equal(result.page[0][key], undefined);
  });
  await test("local discovery respects separate role, accent-insensitive search, any spoken language and real rate", async () => {
    const local = profile("local", { providerRole: "local_professional", workType: "local", locationPostcode: "3011 AB" });
    const ctx = fixture([local, profile("online"), { ...local, _id: "private", profileVisibility: "private" }, { ...local, _id: "unknownRate", hourlyRate: undefined }, { ...local, _id: "expensive", hourlyRate: 200 }]);
    const result = await discovery.localProfessionals.handler(ctx, args({ query: "Helene design", location: "3011", language: "English", skill: "React", maxRate: 100 }));
    assert.deepEqual(ids(result), ["local"]); for (const key of ["locationPostcode", "stripeAccountId", "creditBalance", "tenantId"]) assert.equal(result.page[0][key], undefined);
  });
  await test("online discovery includes eligible legacy profiles but excludes private/local and uses actual level", async () => {
    const ctx = fixture([profile("live", { level: "rising" }), profile("legacy", { providerRole: undefined, level: "rising" }), profile("local", { providerRole: "local_professional", workType: "local", level: "rising" }), profile("private", { profileVisibility: "private", level: "rising" }), profile("new", { level: "new" })]);
    const result = await discovery.onlineProfessionals.handler(ctx, args({ level: "rising", minRating: 4, language: "English" }));
    assert.deepEqual(ids(result).sort(), ["legacy", "live"]); assert.equal(result.page[0].stripeAccountId, undefined);
  });
  await test("services use eligible online sellers, category ancestry and package prices without private data", async () => {
    const categories = [row("marketplaceCategories", "parent", { name: "Design", slug: "design" }), row("marketplaceCategories", "child", { name: "Web design", slug: "web-design", parentId: "parent" })];
    const ctx = fixture([...categories, profile("pro"), profile("private", { profileVisibility: "private" }), profile("legacy", { providerRole: undefined }), profile("foreign", { tenantId: "another" }), gig("yes"), gig("private", { freelancerId: "private" }), gig("legacy", { freelancerId: "legacy" }), gig("foreign", { freelancerId: "foreign" }), gig("local", { workType: "local" }), gig("hybrid", { workType: "hybrid" }), gig("unspecified", { workType: undefined }), row("gigPackages", "pkg1", { gigId: "yes", price: 500, currency: "USD" }), row("gigPackages", "pkg2", { gigId: "yes", price: 200, currency: "USD" })]);
    const result = await discovery.services.handler(ctx, args({ category: "design", query: "website" }));
    assert.deepEqual(ids(result), ["yes"]); assert.equal(result.page[0].packages[0].price, 200); assert.equal(result.page[0].packages[0].currency, "USD");
    assert.equal(result.page[0].tenantId, undefined); assert.equal(result.page[0].freelancerProfile.stripeAccountId, undefined);
  });
  await test("each discovery endpoint returns every result over multiple pages", async () => {
    for (const [endpoint, records] of [
      ["projects", Array.from({ length: 125 }, (_, i) => project("p" + i))],
      ["onlineProfessionals", Array.from({ length: 125 }, (_, i) => profile("p" + i))],
      ["localProfessionals", Array.from({ length: 125 }, (_, i) => profile("p" + i, { providerRole: "local_professional", workType: "local" }))],
      ["services", Array.from({ length: 125 }, (_, i) => gig("g" + i))],
    ]) {
      const rows = await allPages(discovery[endpoint], fixture([client, profile("pro"), ...records]), {});
      const expected = endpoint === "onlineProfessionals" ? 126 : 125;
      assert.equal(rows.length, expected, endpoint); assert.equal(new Set(rows.map((record) => record._id)).size, expected, endpoint);
    }
  });
  await test("oversized cursor request is bounded to 50 source rows", async () => {
    const result = await discovery.jobs.handler(fixture([client, ...Array.from({ length: 60 }, (_, i) => job("j" + i))]), args({ paginationOpts: { cursor: null, numItems: 1000 } }));
    assert.equal(result.page.length, 50); assert.equal(result.isDone, false);
  });
  console.log(`PASS ${tests.length} MVP discovery cases (actual query handlers, schema indexes and production mappers; in-memory read-only database).`);
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
