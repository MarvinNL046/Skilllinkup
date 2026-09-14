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
        if (id.endsWith("/rateLimits"))
          return { rateLimiter: { limit: async () => ({ ok: true }) } };
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
const backend = load("convex/marketplace/candidateProfiles.ts");
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
const fields = {
  displayName: "QA Candidate",
  headline: "Frontend developer",
  location: "Remote",
  summary: "Synthetic QA profile",
  skills: ["React", "TypeScript"],
  discoverable: false,
  shareResume: false,
  expectedUpdatedAt: 0,
};
const f = fixture();
let profile = await backend.save.handler(f.ctx, fields);
assert.equal(profile.discoverable, false);
assert.equal(profile.shareResume, false);
assert.equal(profile.resumeUrl, null);
assert.equal(Object.hasOwn(profile, "userId"), false);
assert.equal(Object.hasOwn(profile, "resumeStorageId"), false);
await assert.rejects(() => backend.save.handler(f.ctx, fields), /another tab/);
f.as(null);
await assert.rejects(
  () => backend.getMine.handler(f.ctx, {}),
  /Authentication/,
);
f.as(makeUser("other"));
assert.equal(await backend.getMine.handler(f.ctx, {}), null);
await assert.rejects(
  () =>
    backend.removeResume.handler(f.ctx, {
      expectedUpdatedAt: profile.updatedAt,
    }),
  /changed/,
);
f.as(makeUser("owner"));
await assert.rejects(
  () =>
    backend.save.handler(f.ctx, {
      ...fields,
      expectedUpdatedAt: profile.updatedAt,
      shareResume: true,
    }),
  /discoverable/,
);
f.metadata.set("cv1", { size: 100, contentType: "application/pdf" });
await assert.rejects(
  () =>
    backend.save.handler(f.ctx, {
      ...fields,
      expectedUpdatedAt: profile.updatedAt,
      resumeStorageId: "cv1",
    }),
  /Unauthorized/,
);
profile = await backend.save.handler(f.ctx, {
  ...fields,
  expectedUpdatedAt: profile.updatedAt,
  resumeStorageId: "cv1",
  resumeName: "qa.pdf",
  serverSecret: "fixture-secret",
});
assert.ok(profile.resumeUrl);
assert.equal(profile.shareResume, false);
let result = await backend.getResumeDownload.handler(f.ctx, {
  profileId: profile._id,
  serverSecret: "fixture-secret",
});
assert.ok(result.url);
await assert.rejects(
  () =>
    backend.getResumeDownload.handler(f.ctx, {
      profileId: profile._id,
      serverSecret: "fixture-secret",
      expectedUpdatedAt: profile.updatedAt - 1,
    }),
  /changed/,
);
const paging = { search: "", paginationOpts: { numItems: 1, cursor: null } };
f.as(makeUser("employer", "company"));
assert.equal(
  (await backend.listDiscoverable.handler(f.ctx, paging)).page.length,
  0,
);
await assert.rejects(
  () =>
    backend.getResumeDownload.handler(f.ctx, {
      profileId: profile._id,
      serverSecret: "fixture-secret",
    }),
  /private/,
);
f.as(makeUser("owner"));
profile = await backend.save.handler(f.ctx, {
  ...fields,
  expectedUpdatedAt: profile.updatedAt,
  discoverable: true,
});
f.as(makeUser("employer", "company"));
result = await backend.listDiscoverable.handler(f.ctx, {
  ...paging,
  search: "React",
});
assert.equal(result.page.length, 1);
assert.equal(result.page[0].resumeUrl, null);
assert.equal(Object.hasOwn(result.page[0], "email"), false);
assert.equal(Object.hasOwn(result.page[0], "resumeStorageId"), false);
assert.ok(f.indexes.includes("search_candidates"));
f.as(makeUser("owner"));
profile = await backend.save.handler(f.ctx, {
  ...fields,
  expectedUpdatedAt: profile.updatedAt,
  discoverable: true,
  shareResume: true,
});
f.as(makeUser("employer", "company"));
assert.ok(
  (await backend.listDiscoverable.handler(f.ctx, paging)).page[0].resumeUrl,
);
assert.ok(
  await backend.getResumeDownload.handler(f.ctx, {
    profileId: profile._id,
    serverSecret: "fixture-secret",
  }),
);
for (const actor of [
  makeUser("unverified", "company"),
  makeUser("differentTenant", "company", "otherTenant"),
  makeUser("ordinary"),
]) {
  if (actor._id === "unverified") actor.companyVerificationStatus = "pending";
  f.as(actor);
  await assert.rejects(() =>
    backend.getResumeDownload.handler(f.ctx, {
      profileId: profile._id,
      serverSecret: "fixture-secret",
    }),
  );
  if (actor._id === "differentTenant")
    assert.equal(
      (await backend.listDiscoverable.handler(f.ctx, paging)).page.length,
      0,
    );
  else
    await assert.rejects(() => backend.listDiscoverable.handler(f.ctx, paging));
}
f.as(makeUser("owner"));
profile = await backend.save.handler(f.ctx, {
  ...fields,
  expectedUpdatedAt: profile.updatedAt,
});
f.as(makeUser("employer", "company"));
await assert.rejects(
  () =>
    backend.getResumeDownload.handler(f.ctx, {
      profileId: profile._id,
      serverSecret: "fixture-secret",
    }),
  /private/,
);
assert.equal(
  (await backend.listDiscoverable.handler(f.ctx, paging)).page.length,
  0,
);
f.as(makeUser("owner"));
f.metadata.set("cv2", { size: 150, contentType: "application/pdf" });
profile = await backend.save.handler(f.ctx, {
  ...fields,
  expectedUpdatedAt: profile.updatedAt,
  resumeStorageId: "cv2",
  resumeName: "replacement.pdf",
  serverSecret: "fixture-secret",
});
assert.ok(f.deleted.includes("cv1"));
assert.equal(profile.resumeName, "replacement.pdf");
await backend.discardUnattachedResume.handler(f.ctx, {
  storageId: "cv2",
  serverSecret: "fixture-secret",
});
assert.equal(f.metadata.has("cv2"), true);
f.metadata.set("orphan", { size: 100, contentType: "application/pdf" });
await backend.discardUnattachedResume.handler(f.ctx, {
  storageId: "orphan",
  serverSecret: "fixture-secret",
});
assert.equal(f.metadata.has("orphan"), false);
profile = await backend.removeResume.handler(f.ctx, {
  expectedUpdatedAt: profile.updatedAt,
});
assert.equal(profile.resumeUrl, null);
assert.equal(profile.shareResume, false);
assert.ok(f.deleted.includes("cv2"));
await assert.rejects(() =>
  backend.save.handler(f.ctx, {
    ...fields,
    expectedUpdatedAt: profile.updatedAt,
    skills: Array.from({ length: 13 }, (_, i) => `skill${i}`),
  }),
);
f.as({ ...makeUser("owner"), deletionRequestedAt: Date.now() });
await assert.rejects(
  () =>
    backend.save.handler(f.ctx, {
      ...fields,
      expectedUpdatedAt: profile.updatedAt,
    }),
  /deletion/,
);
console.log(
  "PASS candidate profile ownership, private defaults, CV separation, verified-employer access, tenant boundaries, search, immediate revocation, stale writes, replacement and orphan cleanup",
);
const consentFixture = fixture();
let consentProfile = await backend.save.handler(consentFixture.ctx, {
  ...fields,
  discoverable: true,
  allowInvitations: true,
});
assert.equal(consentProfile.allowInvitations, true);
consentProfile = await backend.save.handler(consentFixture.ctx, {
  ...fields,
  discoverable: true,
  expectedUpdatedAt: consentProfile.updatedAt,
});
assert.equal(consentProfile.allowInvitations, true);
consentProfile = await backend.save.handler(consentFixture.ctx, {
  ...fields,
  allowInvitations: true,
  expectedUpdatedAt: consentProfile.updatedAt,
});
assert.equal(consentProfile.allowInvitations, false);
console.log(
  "PASS invitation preference defaults, legacy saves and discovery opt-out",
);
