import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { serializeJsonLd } from "../src/lib/jsonLd.mjs";

// Runs the real Convex handlers against in-memory data. Nothing connects to
// Convex, Clerk or email, and no application data is changed.
const require = createRequire(import.meta.url),
  ts = require("typescript");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SECRET = "fixture-secret";
const anyPath = new Proxy({}, { get: () => anyPath });

function loader(env) {
  const cache = new Map();
  function load(file) {
    file = path.resolve(root, file);
    if (cache.has(file)) return cache.get(file);
    const exports = {};
    cache.set(file, exports);
    const source = ts.transpileModule(fs.readFileSync(file, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    }).outputText;
    vm.runInNewContext(
      source,
      {
        exports,
        Date,
        Set,
        Map,
        Error,
        Number,
        Math,
        Promise,
        process: { env },
        require(id) {
          if (id.includes("_generated/server"))
            return Object.fromEntries(
              ["query", "mutation", "internalQuery", "internalMutation"].map(
                (name) => [name, (config) => config],
              ),
            );
          if (id.includes("_generated/api"))
            return { api: anyPath, internal: anyPath, components: anyPath };
          if (id.endsWith("/notifications"))
            return { notifyUser: async () => undefined };
          if (id.endsWith("/rateLimits"))
            return { rateLimiter: { limit: async () => ({ ok: true }) } };
          if (id.endsWith("messagePolicy.mjs"))
            return { getMessagePolicyError: () => null };
          if (id === "convex/values" || id === "convex/server")
            return require(id);
          if (id.startsWith("."))
            return load(path.resolve(path.dirname(file), `${id}.ts`));
          throw new Error(`Unexpected import ${id}`);
        },
      },
      { filename: file },
    );
    return exports;
  }
  return load;
}

const makeUser = (id, role = "candidate", world = "jobs") => ({
  _id: id,
  table: "users",
  tenantId: "tenant",
  stackAuthId: id,
  name: id,
  email: `${id}@example.invalid`,
  accountRoles: [role],
  activeRole: role,
  preferredWorld: world,
  onboardingContexts: [{ role, world, version: 1 }],
});

function fixture(rows) {
  const records = new Map(rows.map((row) => [row._id, row]));
  let actor = null;
  const writes = [];
  const ctx = {
    auth: {
      getUserIdentity: async () => (actor ? { subject: actor } : null),
    },
    scheduler: { runAfter: async () => undefined },
    storage: {
      getUrl: async (id) => `https://fixture.convex.cloud/api/storage/${id}`,
      generateUploadUrl: async () => "fixture-upload",
    },
    db: {
      get: async (id) => structuredClone(records.get(id) || null),
      normalizeId: (table, id) => (records.get(id)?.table === table ? id : null),
      system: {
        get: async () => ({ contentType: "application/pdf", size: 10 }),
      },
      insert: async (table, fields) => {
        const id = `${table}-${records.size}`;
        records.set(id, { _id: id, table, ...fields });
        writes.push({ table, fields });
        return id;
      },
      patch: async (id, fields) => {
        Object.assign(records.get(id), fields);
        writes.push({ id, fields });
      },
      delete: async (id) => records.delete(id),
      query: (table) => {
        const conditions = [];
        const q = {
          eq(key, value) {
            conditions.push([key, value]);
            return q;
          },
        };
        const rowsFor = () =>
          structuredClone(
            [...records.values()].filter(
              (row) =>
                row.table === table &&
                conditions.every(([key, value]) => row[key] === value),
            ),
          );
        const chain = {
          withIndex(_name, fn) {
            fn(q);
            return chain;
          },
          order: () => chain,
          first: async () => rowsFor()[0] || null,
          unique: async () => rowsFor()[0] || null,
          take: async (count) => rowsFor().slice(0, count),
          collect: async () => rowsFor(),
        };
        return chain;
      },
    },
  };
  return {
    ctx,
    records,
    writes,
    as(id) {
      actor = id;
    },
  };
}

let checks = 0;
async function check(name, run) {
  await run();
  checks++;
  console.log(`PASS ${name}`);
}

const load = loader({ INTERNAL_EMAIL_SECRET: SECRET });

await check("work history, education, certificates and portfolio stay private unless the owner has a public provider profile", async () => {
  const experience = load("convex/marketplace/experience.ts");
  const portfolio = load("convex/marketplace/portfolio.ts");
  const f = fixture([
    makeUser("candidate"),
    makeUser("provider", "freelancer", "online"),
    makeUser("hidden", "freelancer", "online"),
    { _id: "p1", table: "freelancerProfiles", userId: "provider", status: "active", profileVisibility: "public" },
    { _id: "p2", table: "freelancerProfiles", userId: "hidden", status: "active", profileVisibility: "private" },
    ...["candidate", "provider", "hidden"].flatMap((userId) => [
      { _id: `w-${userId}`, table: "workExperience", userId },
      { _id: `e-${userId}`, table: "education", userId },
      { _id: `c-${userId}`, table: "userCertifications", userId },
      { _id: `f-${userId}`, table: "portfolioProjects", userId },
    ]),
  ]);
  const queries = [
    experience.getWorkExperience,
    experience.getEducation,
    experience.getCertifications,
    portfolio.getByUser,
  ];
  for (const query of queries) {
    f.as(null);
    assert.equal((await query.handler(f.ctx, { userId: "candidate" })).length, 0);
    assert.equal((await query.handler(f.ctx, { userId: "hidden" })).length, 0);
    assert.equal((await query.handler(f.ctx, { userId: "provider" })).length, 1);
    f.as("provider");
    assert.equal((await query.handler(f.ctx, { userId: "candidate" })).length, 0);
    f.as("candidate");
    assert.equal((await query.handler(f.ctx, { userId: "candidate" })).length, 1);
    f.as("hidden");
    assert.equal((await query.handler(f.ctx, { userId: "hidden" })).length, 1);
  }
});

await check("employers lose CV and email access once an application is withdrawn, rejected or still a draft", async () => {
  const applications = load("convex/marketplace/jobApplications.ts");
  const f = fixture([
    makeUser("candidate"),
    makeUser("company", "company"),
    makeUser("foreign", "company"),
    { _id: "job", table: "jobs", tenantId: "tenant", clientId: "company", title: "QA", status: "open" },
    { _id: "app", table: "jobApplications", tenantId: "tenant", jobId: "job", candidateId: "candidate", resumeStorageId: "cv", status: "screening" },
  ]);
  const download = (who) => {
    f.as(who);
    return applications.getResumeDownload.handler(f.ctx, { applicationId: "app", serverSecret: SECRET });
  };
  assert.ok((await download("company")).url);
  await assert.rejects(() => download("foreign"), /Unauthorized/);
  for (const status of ["withdrawn", "rejected", "draft"]) {
    f.records.get("app").status = status;
    assert.equal(await download("company"), null);
    assert.ok((await download("candidate")).url);
  }
  f.records.get("app").status = "hired";
  assert.ok((await download("company")).url);
  f.as("company");
  const page = { paginationOpts: { cursor: null, numItems: 25 } };
  const list = async () =>
    (await applications.listForJobPage.handler(f.ctx, { jobId: "job", applicationId: "app", ...page })).page[0];
  assert.equal((await list()).candidate.email, "candidate@example.invalid");
  assert.ok((await list()).resumeUrl);
  f.records.get("app").status = "withdrawn";
  assert.equal((await list()).candidate.email, "");
  assert.equal((await list()).resumeUrl, null);
  f.as(null);
  await assert.rejects(() => applications.generateResumeUploadUrl.handler(f.ctx, {}), /Authentication|Unauthorized|sign/i);
});

await check("smoke fixtures stay disabled unless a deployment opts in and only elevate dedicated QA accounts", async () => {
  const args = {
    serverSecret: SECRET,
    tag: "qa",
    clientEmail: "a@example.invalid",
    freelancerEmail: "b@example.invalid",
    localProfessionalEmail: "c@example.invalid",
    candidateEmail: "d@example.invalid",
    adminEmail: "real.person@example.invalid",
    localClientEmail: "e@example.invalid",
    companyEmail: "skilllinkup.qa+company@skilllinkup.com",
  };
  const disabled = loader({ INTERNAL_EMAIL_SECRET: SECRET })("convex/marketplace/smoke.ts");
  const f = fixture([]);
  await assert.rejects(() => disabled.seed.handler(f.ctx, args), /disabled on this deployment/);
  await assert.rejects(() => disabled.cleanup.handler(f.ctx, { serverSecret: SECRET }), /disabled on this deployment/);
  await assert.rejects(() => disabled.verifyCleanup.handler(f.ctx, { serverSecret: SECRET, fixtureIds: [] }), /disabled on this deployment/);
  await assert.rejects(() => disabled.seed.handler(f.ctx, { ...args, serverSecret: "wrong" }), /Unauthorized/);
  const enabled = loader({ INTERNAL_EMAIL_SECRET: SECRET, SMOKE_FIXTURES_ENABLED: "true" })("convex/marketplace/smoke.ts");
  await assert.rejects(() => enabled.seed.handler(f.ctx, args), /only elevate dedicated QA accounts/);
  assert.equal(f.writes.length, 0);
});

await check("content tables and payout accounts accept writes only with the server secret", async () => {
  const tools = load("convex/tools.ts");
  const skills = load("convex/skills.ts");
  const freelancers = load("convex/marketplace/freelancers.ts");
  const f = fixture([
    makeUser("seller", "freelancer", "online"),
    { _id: "profile", table: "freelancerProfiles", userId: "seller", status: "active" },
  ]);
  f.as("seller");
  const tool = { ownerId: "x", name: "T", slug: "t", category: "c", locale: "en" };
  await assert.rejects(() => tools.insert.handler(f.ctx, { ...tool, serverSecret: "wrong" }), /Unauthorized/);
  await assert.rejects(() => skills.insert.handler(f.ctx, { name: "S", slug: "s", locale: "en", serverSecret: "wrong" }), /Unauthorized/);
  await assert.rejects(() => freelancers.updateStripeAccount.handler(f.ctx, { userId: "seller", stripeAccountId: "acct_x" }), /Unauthorized/);
  assert.equal(f.writes.length, 0);
  await tools.insert.handler(f.ctx, { ...tool, serverSecret: SECRET });
  assert.equal("serverSecret" in f.writes[0].fields, false);
  await freelancers.updateStripeAccount.handler(f.ctx, { userId: "seller", stripeAccountId: "acct_x", serverSecret: SECRET });
  assert.equal(f.records.get("profile").stripeAccountId, "acct_x");
});

await check("anonymous comment and platform-review creation no longer exists and feedback needs a signed-in, bounded submission", async () => {
  assert.equal("create" in load("convex/comments.ts"), false);
  assert.equal("create" in load("convex/platformReviews.ts"), false);
  const feedback = load("convex/feedback.ts");
  const f = fixture([makeUser("member", "client", "online")]);
  const send = (fields) => feedback.submit.handler(f.ctx, { type: "feedback", message: "A useful remark.", ...fields });
  await assert.rejects(() => send({}), /Authentication|Unauthorized|sign/i);
  f.as("member");
  await assert.rejects(() => send({ message: "x".repeat(4001) }), /4,000/);
  await assert.rejects(() => send({ message: "  hi " }), /between 5/);
  await assert.rejects(() => send({ rating: 9 }), /1 to 5/);
  await assert.rejects(() => send({ pageUrl: "x".repeat(501) }), /too long/);
  assert.equal(f.writes.length, 0);
  await send({ rating: 4 });
  assert.equal(f.writes[0].fields.userId, "member");
});

await check("conversations tied to a closed application or proposal become read-only", async () => {
  const messages = load("convex/chat/messages.ts");
  const f = fixture([
    makeUser("candidate"),
    makeUser("company", "company"),
    { _id: "app", table: "jobApplications", status: "screening" },
    { _id: "bid", table: "bids", status: "pending" },
    { _id: "c-app", table: "conversations", contextType: "job_application", jobApplicationId: "app", participant1: "candidate", participant2: "company", status: "active" },
    { _id: "c-bid", table: "conversations", contextType: "project_bid", bidId: "bid", participant1: "candidate", participant2: "company", status: "active" },
  ]);
  f.as("company");
  const send = (conversationId) => messages.send.handler(f.ctx, { conversationId, content: "Hello there" });
  assert.ok(await send("c-app"));
  assert.ok(await send("c-bid"));
  for (const status of ["rejected", "withdrawn"]) {
    f.records.get("app").status = status;
    await assert.rejects(() => send("c-app"), /application is closed/);
    f.records.get("bid").status = status;
    await assert.rejects(() => send("c-bid"), /proposal is closed/);
  }
  f.records.get("app").status = "hired";
  assert.ok(await send("c-app"));
});

await check("structured data cannot close its script tag", async () => {
  const output = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
  assert.equal(output.includes("<"), false);
  assert.equal(JSON.parse(output).name, "</script><script>alert(1)</script>");
  for (const file of [
    "src/app/platforms/[slug]/page.jsx",
    "src/app/resources/[slug]/page.jsx",
    "src/app/[locale]/resources/[slug]/page.jsx",
  ]) {
    const source = fs.readFileSync(path.join(root, file), "utf8");
    assert.equal(/__html:\s*JSON\.stringify\(/.test(source), false, file);
  }
});

console.log(`Security hardening checks passed: ${checks} groups.`);
