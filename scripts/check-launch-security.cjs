const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');

// Execute the real handlers and auth helper against an in-memory database double.
// Runtime validators and deployment compatibility still require Convex verification.
function load(file) {
  const exports = {};
  const validator = new Proxy({}, { get: () => () => ({}) });
  const code = ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  vm.runInNewContext(code, { exports, process: { env: {} }, Date, require: (id) => {
    if (id === 'convex/values') return { v: validator };
    if (id.includes('_generated/server')) return { mutation: (x) => x, query: (x) => x };
    if (id === './lib/authHelpers') return load('convex/lib/authHelpers.ts');
    if (id === './lib/publicData') return load('convex/lib/publicData.ts');
    if (id === './marketplaceState' || id === './lib/marketplaceState') return load('convex/lib/marketplaceState.ts');
    throw new Error(`Unexpected import ${id}`);
  } });
  return exports;
}

async function main() {
  const seo = load('convex/seoPages.ts');
  const args = { tenantId: 'tenant-a', slug: 'test', locale: 'en', title: 'Test', content: 'Test' };
  function context(user, existing = null) {
    const writes = [];
    return { writes, auth: { getUserIdentity: async () => user ? { subject: 'qa' } : null }, db: {
      query: (table) => ({ withIndex: () => ({ first: async () => table === 'users' ? user : existing }) }),
      patch: async (...data) => writes.push(data),
      insert: async (...data) => { writes.push(data); return 'new-page'; },
    } };
  }
  for (const [user, existing] of [
    [null, null], [{ role: 'author', tenantId: 'tenant-a' }, null],
    [{ role: 'admin', tenantId: 'tenant-b' }, null],
    [{ role: 'admin', tenantId: 'tenant-a' }, { _id: 'foreign-page', tenantId: 'tenant-b' }],
  ]) {
    const ctx = context(user, existing);
    await assert.rejects(() => seo.insert.handler(ctx, args));
    assert.equal(ctx.writes.length, 0);
  }
  for (const existing of [null, { _id: 'own-page', tenantId: 'tenant-a' }]) {
    const ctx = context({ role: 'admin', tenantId: 'tenant-a' }, existing);
    await seo.insert.handler(ctx, args);
    assert.equal(ctx.writes.length, 1);
  }
  const comments = load('convex/comments.ts');
  const result = await comments.getByPost.handler({ db: { query: () => ({ withIndex: () => ({ take: async () => [
    { _id: 'comment', postId: 'post', authorName: 'QA', authorEmail: 'private@example.invalid', ipAddress: 'private', tenantId: 'tenant', content: 'Hello', status: 'approved', createdAt: 1 },
  ] }) }) } }, { postId: 'post' });
  assert.deepEqual(Object.keys(result[0]).sort(), ['_id', 'postId', 'authorName', 'authorWebsite', 'content', 'parentId', 'createdAt'].sort());
  const safe = load('convex/lib/publicData.ts').toSafeUser({ deletionRequestedAt: 123 });
  assert.equal(safe.deletionRequestedAt, 123);
  const { requireMarketplaceContext } = load('convex/lib/authHelpers.ts');
  const complete = { accountRoles: ['freelancer'], activeRole: 'freelancer', preferredWorld: 'online', onboardingContexts: [{ role: 'freelancer', world: 'online', version: 1 }] };
  requireMarketplaceContext(complete, 'freelancer', 'online', 'testing');
  for (const user of [{ role: 'admin' }, { userType: 'freelancer' }, { ...complete, onboardingContexts: [] }, { ...complete, onboardingContexts: [{ role: 'freelancer', world: 'online', version: 2 }] }, { ...complete, preferredWorld: 'local' }]) {
    assert.throws(() => requireMarketplaceContext(user, 'freelancer', 'online', 'testing'));
  }
  const { syncUser } = load('convex/users.ts');
  for (const [identity, existing, byEmail] of [
    [{ subject: 'qa' }, null, null],
    [{ subject: 'qa', email: 'qa@example.invalid', emailVerified: false }, null, { _id: 'legacy' }],
    [{ subject: 'qa', email: 'qa@example.invalid', emailVerified: true }, null, { _id: 'other', stackAuthId: 'someone-else' }],
    [{ subject: 'qa', email: 'qa@example.invalid', emailVerified: false }, { _id: 'qa', email: 'old@example.invalid' }, null],
  ]) {
    let writes = 0;
    const ctx = { auth: { getUserIdentity: async () => identity }, db: { query: () => ({ withIndex: (name) => ({ first: async () => name === 'by_stackAuthId' ? existing : byEmail }) }), patch: async () => writes++, insert: async () => writes++ } };
    await assert.rejects(() => syncUser.handler(ctx, { clerkId: 'qa', email: 'qa@example.invalid', name: 'QA' }));
    assert.equal(writes, 0);
  }
  console.log('Account security checks passed: completed context required, no admin bypass, verified email linking and identity ownership.');
  console.log('Launch security checks passed: anonymous/role/tenant denials, authorized writes, public comment allowlist, deletion status.');
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
