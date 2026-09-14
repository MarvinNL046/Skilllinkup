import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
const require = createRequire(import.meta.url),
  ts = require("typescript");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
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
      process: { env: { INTERNAL_EMAIL_SECRET: "fixture-secret" } },
      require(id) {
        if (id.includes("_generated/server"))
          return { mutation: (x) => x, query: (x) => x };
        if (id.endsWith("/notifications"))
          return {
            notifyUser: async (ctx, args) =>
              ctx.db.insert("notifications", args),
          };
        if (id.endsWith("/rateLimits"))
          return {
            rateLimiter: {
              limit: async (ctx) => {
                if (ctx.rateLimited) throw new Error("Too many invitations");
                return { ok: true };
              },
            },
          };
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
const backend = load("convex/marketplace/hiringPipeline.ts");
const applicationsBackend = load("convex/marketplace/jobApplications.ts");
const makeUser = (id, role = "candidate", tenantId = "tenant") => ({
  _id: id,
  tenantId,
  stackAuthId: id,
  name: id,
  accountRoles: [role],
  activeRole: role,
  preferredWorld: "jobs",
  onboardingContexts: [{ role, world: "jobs", version: 1 }],
  companyVerificationStatus: role === "company" ? "verified" : undefined,
});
function fixture() {
  const records = new Map(),
    metadata = new Map(),
    deleted = [],
    indexes = [];
  let actor = makeUser("owner");
  records.set(actor._id, actor);
  const ctx = {
    auth: {
      getUserIdentity: async () => (actor ? { subject: actor._id } : null),
    },
    storage: {
      getUrl: async (id) =>
        metadata.has(id)
          ? `https://fixture.convex.cloud/api/storage/${id}`
          : null,
      delete: async (id) => {
        deleted.push(id);
        metadata.delete(id);
      },
      generateUploadUrl: async () => "fixture-upload",
    },
    db: {
      get: async (id) => structuredClone(records.get(id) || null),
      system: { get: async (_table, id) => metadata.get(id) || null },
      insert: async (table, fields) => {
        const id = `${table}-${records.size}`;
        records.set(id, {
          _id: id,
          _creationTime: Date.now(),
          table,
          ...fields,
        });
        return id;
      },
      patch: async (id, fields) => {
        const row = records.get(id);
        for (const [key, value] of Object.entries(fields))
          if (value === undefined) delete row[key];
          else row[key] = value;
      },
      delete: async (id) => records.delete(id),
      query: (table) => {
        let conditions = [],
          phrase = "";
        const q = {
          eq(key, value) {
            conditions.push([key, value]);
            return q;
          },
          search(_key, value) {
            phrase = value.toLowerCase();
            return q;
          },
        };
        const rows = () =>
          structuredClone(
            [...records.values()].filter(
              (row) =>
                (table === "users"
                  ? Boolean(row.stackAuthId)
                  : row.table === table) &&
                conditions.every(([key, value]) => row[key] === value) &&
                (!phrase || row.searchText?.toLowerCase().includes(phrase)),
            ),
          );
        const chain = {
          withIndex(name, fn) {
            indexes.push(name);
            fn(q);
            return chain;
          },
          withSearchIndex(name, fn) {
            indexes.push(name);
            fn(q);
            return chain;
          },
          take: async (n) => rows().slice(0, n),
          first: async () => rows()[0] || null,
          unique: async () => rows()[0] || null,
          order: () => chain,
          paginate: async (opts) => {
            const start = Number(opts.cursor || 0),
              all = rows();
            return {
              page: all.slice(start, start + opts.numItems),
              isDone: start + opts.numItems >= all.length,
              continueCursor: String(start + opts.numItems),
            };
          },
        };
        return chain;
      },
    },
  };
  return {
    ctx,
    records,
    metadata,
    deleted,
    indexes,
    as(user) {
      actor = user;
      if (user) records.set(user._id, user);
    },
  };
}
const f = fixture();
const company = makeUser("company", "company");
f.as(company);
f.records.set("job", {
  _id: "job",
  table: "jobs",
  tenantId: "tenant",
  clientId: "company",
  title: "QA vacancy",
  status: "open",
});
f.records.set("other-job", {
  _id: "other-job",
  table: "jobs",
  tenantId: "tenant",
  clientId: "other-company",
  title: "Other vacancy",
  status: "open",
});
const baseInvite = {
  table: "jobInvitations",
  jobId: "job",
  tenantId: "tenant",
  employerId: "company",
  candidateName: "QA Candidate",
  note: "Synthetic",
  status: "pending",
  createdAt: 1,
  expiresAt: Date.now() + 10000,
};
for (let i = 0; i < 3; i++)
  f.records.set("i" + i, {
    ...baseInvite,
    _id: "i" + i,
    candidateId: "c" + i,
    status: i === 1 ? "interested" : "pending",
  });
for (let i = 0; i < 3; i++)
  f.records.set("c" + i, { ...makeUser("c" + i), email: "qa@example.invalid" });
const app = {
  table: "jobApplications",
  jobId: "job",
  tenantId: "tenant",
  candidateId: "c1",
  status: "submitted",
  coverLetter: "QA application",
  createdAt: 1,
  updatedAt: 1,
};
f.records.set("a1", { ...app, _id: "a1" });
f.records.set("draft", {
  ...app,
  _id: "draft",
  candidateId: "c0",
  status: "draft",
});
f.records.set("other-app", {
  ...app,
  _id: "other-app",
  jobId: "other-job",
  candidateId: "c2",
});
let summary = await backend.summary.handler(f.ctx, { jobId: "job" });
assert.equal(summary.invited.value, 3);
assert.equal(summary.interested.value, 1);
assert.equal(summary.applications.value, 1);
const page = { paginationOpts: { cursor: null, numItems: 2 } };
let invites = await backend.invitations.handler(f.ctx, {
  jobId: "job",
  ...page,
});
assert.equal(invites.page.length, 2);
assert.equal(invites.page[0].applicationId, null);
assert.equal(invites.page[1].applicationId, "a1");
assert.equal("candidateId" in invites.page[1], false);
assert.equal("email" in invites.page[1], false);
assert.equal("resumeUrl" in invites.page[1], false);
let second = await backend.invitations.handler(f.ctx, {
  jobId: "job",
  paginationOpts: { cursor: invites.continueCursor, numItems: 2 },
});
assert.equal(second.page.length, 1);
assert.equal(second.page[0].applicationId, null);
let selected = await applicationsBackend.listForJobPage.handler(f.ctx, {
  jobId: "job",
  applicationId: "a1",
  ...page,
});
assert.equal(selected.page[0].application._id, "a1");
assert.equal(
  (
    await applicationsBackend.listForJobPage.handler(f.ctx, {
      jobId: "job",
      applicationId: "other-app",
      ...page,
    })
  ).page.length,
  0,
);
assert.equal(
  (
    await applicationsBackend.listForJobPage.handler(f.ctx, {
      jobId: "job",
      applicationId: "draft",
      ...page,
    })
  ).page.length,
  0,
);
f.records.get("a1").status = "withdrawn";
invites = await backend.invitations.handler(f.ctx, {
  jobId: "job",
  status: "interested",
  ...page,
});
assert.equal(invites.page.length, 1);
assert.equal(invites.page[0].applicationStatus, "withdrawn");
f.records.delete("c1");
selected = await applicationsBackend.listForJobPage.handler(f.ctx, {
  jobId: "job",
  applicationId: "a1",
  ...page,
});
assert.equal(selected.page[0].candidate.name, "Former candidate");
assert.equal(selected.page[0].candidate.email, "");
f.records.delete("a1");
invites = await backend.invitations.handler(f.ctx, {
  jobId: "job",
  status: "interested",
  ...page,
});
assert.equal(invites.page[0].applicationId, null);
f.as(null);
await assert.rejects(
  () => backend.summary.handler(f.ctx, { jobId: "job" }),
  /Authentication/,
);
f.as(makeUser("outsider", "company"));
await assert.rejects(
  () => backend.summary.handler(f.ctx, { jobId: "job" }),
  /not available/,
);
await assert.rejects(
  () => backend.invitations.handler(f.ctx, { jobId: "job", ...page }),
  /not available/,
);
f.as({ ...company, tenantId: "foreign" });
await assert.rejects(
  () => backend.summary.handler(f.ctx, { jobId: "job" }),
  /not available/,
);
await assert.rejects(
  () =>
    applicationsBackend.listForJobPage.handler(f.ctx, {
      jobId: "job",
      applicationId: "a1",
      ...page,
    }),
  /not available/,
);
f.as(company);
for (let i = 0; i < 505; i++) {
  f.records.set("many" + i, {
    ...baseInvite,
    _id: "many" + i,
    candidateId: "many" + i,
    status: "interested",
  });
  f.records.set("app" + i, {
    ...app,
    _id: "app" + i,
    candidateId: "many" + i,
    status: "hired",
  });
}
summary = await backend.summary.handler(f.ctx, { jobId: "job" });
for (const key of ["invited", "interested", "applications"]) {
  assert.equal(summary[key].value, 500);
  assert.equal(summary[key].capped, true);
}
console.log(
  "PASS hiring overview counts, cap, invitation/application join, draft exclusion, direct application selection, tenant/owner isolation, missing candidates, status changes and pagination",
);
