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
const backend = load("convex/marketplace/jobInvitations.ts");
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
      normalizeId: (table, id) =>
        records.get(id)?.table === table ? id : null,
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
const company = makeUser("company", "company"),
  candidate = makeUser("candidate");
f.records.set(candidate._id, candidate);
f.records.set("profile", {
  _id: "profile",
  table: "candidateProfiles",
  userId: "candidate",
  tenantId: "tenant",
  displayName: "QA Candidate",
  discoverable: true,
  allowInvitations: false,
  shareResume: false,
});
const baseJob = {
  _id: "job",
  table: "jobs",
  tenantId: "tenant",
  clientId: "company",
  title: "QA Frontend role",
  company: "QA Company",
  slug: "qa-frontend",
  status: "open",
  expiresAt: Date.now() + 86400000,
};
f.records.set("job", baseJob);
const args = {
  profileId: "profile",
  jobId: "job",
  note: "Synthetic invitation: no real vacancy.",
};
const page = { paginationOpts: { cursor: null, numItems: 20 } };
f.as(null);
await assert.rejects(() => backend.send.handler(f.ctx, args), /Authentication/);
f.as(makeUser("unverified", "company"));
f.records.get("unverified").companyVerificationStatus = "pending";
await assert.rejects(() => backend.send.handler(f.ctx, args), /Verify/);
f.as(company);
await assert.rejects(() => backend.send.handler(f.ctx, args), /not available/);
f.records.get("profile").allowInvitations = true;
f.records.get("profile").discoverable = false;
await assert.rejects(() => backend.send.handler(f.ctx, args), /not available/);
f.records.get("profile").discoverable = true;
f.as(makeUser("foreign", "company", "other-tenant"));
await assert.rejects(() => backend.send.handler(f.ctx, args), /not available/);
f.as(company);
f.records.get("job").clientId = "other";
await assert.rejects(() => backend.send.handler(f.ctx, args), /your open/);
f.records.get("job").clientId = "company";
f.records.get("job").expiresAt = Date.now() - 1;
await assert.rejects(() => backend.send.handler(f.ctx, args), /your open/);
f.records.get("job").expiresAt = Date.now() + 86400000;
await assert.rejects(
  () => backend.send.handler(f.ctx, { ...args, note: "x".repeat(601) }),
  /600/,
);
const id = await backend.send.handler(f.ctx, args);
assert.equal(await backend.send.handler(f.ctx, args), id);
assert.equal(
  [...f.records.values()].filter((x) => x.table === "notifications").length,
  1,
);
assert.equal(
  [...f.records.values()].filter((x) => x.table === "jobApplications").length,
  0,
);
assert.equal(f.records.get("profile").shareResume, false);
const options = await backend.options.handler(f.ctx, {
  profileId: "profile",
  ...page,
});
assert.equal(options.page[0].unavailableReason, "Already invited");
let list = await backend.listMine.handler(f.ctx, {
  audience: "company",
  ...page,
});
assert.equal(list.page[0].jobHref, "/jobs/job/qa-frontend");
assert.equal("candidateId" in list.page[0], false);
assert.equal("resumeStorageId" in list.page[0], false);
f.as(makeUser("other-candidate"));
assert.equal(
  (await backend.listMine.handler(f.ctx, { audience: "candidate", ...page }))
    .page.length,
  0,
);
await assert.rejects(
  () =>
    backend.respond.handler(f.ctx, {
      invitationId: id,
      response: "interested",
      expectedUpdatedAt: f.records.get(id).updatedAt,
    }),
  /not available/,
);
f.as(candidate);
await assert.rejects(
  () =>
    backend.respond.handler(f.ctx, {
      invitationId: id,
      response: "interested",
      expectedUpdatedAt: 0,
    }),
  /changed/,
);
const response = {
  invitationId: id,
  response: "interested",
  expectedUpdatedAt: f.records.get(id).updatedAt,
};
await backend.respond.handler(f.ctx, response);
await backend.respond.handler(f.ctx, response);
assert.equal(f.records.get(id).status, "interested");
assert.equal(
  [...f.records.values()].filter((x) => x.table === "notifications").length,
  2,
);
assert.equal(
  [...f.records.values()].filter((x) => x.table === "jobApplications").length,
  0,
);
assert.equal(f.records.get("profile").shareResume, false);
f.as(company);
await assert.rejects(
  () =>
    backend.withdraw.handler(f.ctx, {
      invitationId: id,
      expectedUpdatedAt: f.records.get(id).updatedAt,
    }),
  /changed/,
);
async function fresh(suffix) {
  const jobId = "job-" + suffix;
  f.records.set(jobId, {
    ...baseJob,
    _id: jobId,
    expiresAt: Date.now() + 86400000,
  });
  f.as(company);
  return backend.send.handler(f.ctx, { ...args, jobId });
}
const withdrawn = await fresh("withdraw");
f.as(makeUser("stranger", "company"));
await assert.rejects(
  () =>
    backend.withdraw.handler(f.ctx, {
      invitationId: withdrawn,
      expectedUpdatedAt: f.records.get(withdrawn).updatedAt,
    }),
  /not available/,
);
f.as(company);
await backend.withdraw.handler(f.ctx, {
  invitationId: withdrawn,
  expectedUpdatedAt: f.records.get(withdrawn).updatedAt,
});
f.as(candidate);
await assert.rejects(
  () =>
    backend.respond.handler(f.ctx, {
      invitationId: withdrawn,
      response: "interested",
      expectedUpdatedAt: f.records.get(withdrawn).updatedAt,
    }),
  /changed/,
);
const declined = await fresh("decline");
f.as(candidate);
await backend.respond.handler(f.ctx, {
  invitationId: declined,
  response: "declined",
  expectedUpdatedAt: f.records.get(declined).updatedAt,
});
f.as(company);
assert.equal(
  await backend.send.handler(f.ctx, { ...args, jobId: "job-decline" }),
  declined,
);
assert.equal(f.records.get(declined).status, "declined");
const expired = await fresh("expired");
f.records.get(expired).expiresAt = Date.now() - 1;
f.as(candidate);
await assert.rejects(
  () =>
    backend.respond.handler(f.ctx, {
      invitationId: expired,
      response: "interested",
      expectedUpdatedAt: f.records.get(expired).updatedAt,
    }),
  /no longer/,
);
const closed = await fresh("closed");
f.records.get("job-closed").status = "closed";
f.as(candidate);
await assert.rejects(
  () =>
    backend.respond.handler(f.ctx, {
      invitationId: closed,
      response: "interested",
      expectedUpdatedAt: f.records.get(closed).updatedAt,
    }),
  /no longer/,
);
list = await backend.listMine.handler(f.ctx, {
  audience: "candidate",
  ...page,
});
assert.equal(list.page.find((x) => x._id === closed).jobHref, null);
const unverified = await fresh("verification");
f.records.get("company").companyVerificationStatus = "unverified";
f.as(candidate);
await assert.rejects(
  () =>
    backend.respond.handler(f.ctx, {
      invitationId: unverified,
      response: "interested",
      expectedUpdatedAt: f.records.get(unverified).updatedAt,
    }),
  /no longer/,
);
company.companyVerificationStatus = "verified";
f.as(company);
f.records.get("profile").allowInvitations = false;
assert.equal(
  (await backend.options.handler(f.ctx, { profileId: "profile", ...page })).page
    .length,
  0,
);
await assert.rejects(() => backend.send.handler(f.ctx, args), /not available/);
f.records.get("profile").allowInvitations = true;
candidate.deletionRequestedAt = Date.now();
f.records.set("candidate", candidate);
await assert.rejects(() => backend.send.handler(f.ctx, args), /not available/);
delete candidate.deletionRequestedAt;
f.records.set("candidate", candidate);
f.records.set("applied-job", { ...baseJob, _id: "applied-job" });
f.records.set("application", {
  _id: "application",
  table: "jobApplications",
  jobId: "applied-job",
  candidateId: "candidate",
});
await assert.rejects(
  () => backend.send.handler(f.ctx, { ...args, jobId: "applied-job" }),
  /already applied/,
);
f.records.get("profile").userId = "company";
await assert.rejects(() => backend.send.handler(f.ctx, args), /not available/);
f.records.get("profile").userId = "candidate";
f.as(candidate);
const first = await backend.listMine.handler(f.ctx, {
  audience: "candidate",
  paginationOpts: { cursor: null, numItems: 2 },
});
const next = await backend.listMine.handler(f.ctx, {
  audience: "candidate",
  paginationOpts: { cursor: first.continueCursor, numItems: 2 },
});
assert.equal(first.page.length, 2);
assert.equal(next.page.length, 2);
assert.notEqual(first.page[0]._id, next.page[0]._id);
console.log(
  "PASS invitation opt-in, ownership, verification, tenants, duplicates, responses, privacy, withdrawal, expiry, closed jobs, deletion and pagination",
);

f.as(company);
f.records.set("limited-job", { ...baseJob, _id: "limited-job" });
f.ctx.rateLimited = true;
await assert.rejects(
  () => backend.send.handler(f.ctx, { ...args, jobId: "limited-job" }),
  /Too many invitations/,
);
console.log("PASS rate limiting blocks new invitations");

// Deep links, linked applications and expired responses reuse the fixture above.
f.ctx.rateLimited = false;
f.as(company);
const byType = (type) =>
  [...f.records.values()].find(
    (x) => x.table === "notifications" && x.type === type,
  );
assert.equal(
  byType("job_invitation_received").link,
  `/dashboard/job-invitations?invitation=${id}`,
);
assert.equal(
  byType("job_invitation_response").link,
  `/dashboard/sent-invitations?invitation=${id}`,
);
let focused = await backend.listMine.handler(f.ctx, {
  audience: "company",
  invitationId: id,
  ...page,
});
assert.equal(focused.page.length, 1);
assert.equal(focused.page[0]._id, id);
assert.equal(focused.isDone, true);
assert.equal(focused.page[0].applicationId, null);
assert.equal(focused.page[0].applicationStatus, null);
for (const bad of ["missing", "job", ""])
  assert.equal(
    (
      await backend.listMine.handler(f.ctx, {
        audience: "company",
        invitationId: bad,
        ...page,
      })
    ).page.length,
    0,
  );
f.as(makeUser("stranger-company", "company"));
assert.equal(
  (
    await backend.listMine.handler(f.ctx, {
      audience: "company",
      invitationId: id,
      ...page,
    })
  ).page.length,
  0,
);
f.as(makeUser("other-candidate"));
assert.equal(
  (
    await backend.listMine.handler(f.ctx, {
      audience: "candidate",
      invitationId: id,
      ...page,
    })
  ).page.length,
  0,
);
f.as(candidate);
focused = await backend.listMine.handler(f.ctx, {
  audience: "candidate",
  invitationId: id,
  ...page,
});
assert.equal(focused.page[0]._id, id);
f.records.set("linked-application", {
  _id: "linked-application",
  table: "jobApplications",
  tenantId: "tenant",
  jobId: "job",
  candidateId: "candidate",
  status: "draft",
  coverLetter: "private draft",
});
const linked = async (audience) =>
  (
    await backend.listMine.handler(f.ctx, {
      audience,
      invitationId: id,
      ...page,
    })
  ).page[0];
assert.equal((await linked("candidate")).applicationId, null);
f.records.get("linked-application").status = "screening";
for (const [user, audience] of [
  [candidate, "candidate"],
  [company, "company"],
]) {
  f.as(user);
  const item = await linked(audience);
  assert.equal(item.applicationId, "linked-application");
  assert.equal(item.applicationStatus, "screening");
  assert.equal("coverLetter" in item, false);
}
f.records.get("linked-application").tenantId = "other-tenant";
f.as(candidate);
assert.equal((await linked("candidate")).applicationId, null);
f.records.delete("linked-application");
const notificationCount = () =>
  [...f.records.values()].filter((x) => x.table === "notifications").length;
const beforeDecline = notificationCount();
await assert.rejects(
  () =>
    backend.respond.handler(f.ctx, {
      invitationId: expired,
      response: "declined",
      expectedUpdatedAt: f.records.get(expired).updatedAt,
    }),
  /no longer/,
);
assert.equal(f.records.get(expired).status, "pending");
assert.equal(notificationCount(), beforeDecline);
console.log(
  "PASS invitation deep links, linked applications and expired responses",
);
