const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const now = 1800000000000;
function load(file) {
  const exports = {};
  const v = new Proxy({}, { get: () => () => ({}) });
  const code = ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  vm.runInNewContext(code, { exports, Date: { now: () => now }, require(id) {
    if (id === 'convex/values') return { v };
    if (id.endsWith('_generated/server')) return { internalMutation: x => x };
    if (id.endsWith('_generated/api')) return { internal: { marketplace: { imageCleanup: { removeUnused: 'cleanup' } } } };
    throw new Error(id);
  } });
  return exports;
}
const { removeUnused } = load('convex/marketplace/imageCleanup.ts');
const { trackGalleryImage, scheduleImageCleanup, IMAGE_RETENTION_MS } = load('convex/lib/imageRetention.ts');
function context(overrides = {}) {
  const state = { asset: { _id: 'asset', ownerId: 'owner', storageId: 'storage', publicUrl: 'https://files.test/image', purpose: 'gig_image', cleanupAfter: now }, reference: null, profiles: [], portfolio: [], owner: {}, deleted: [], scheduled: [], ...overrides };
  const ctx = { db: {
    get: async id => id === 'asset' ? state.asset : state.owner,
    patch: async (id, values) => Object.assign(state.asset, values),
    delete: async id => state.deleted.push(id),
    query(table) { return { withIndex() { return this; }, first: async () => state.reference, unique: async () => state.asset, take: async () => table === 'freelancerProfiles' ? state.profiles : state.portfolio }; },
  }, storage: { delete: async id => state.deleted.push(id) }, scheduler: { runAt: async (...args) => state.scheduled.push(args) } };
  return { state, ctx };
}
async function main() {
  let count = 0;
  async function retained(name, overrides, timestamp = now) {
    const { state, ctx } = context(overrides);
    assert.equal(await removeUnused.handler(ctx, { assetId: 'asset', cleanupAfter: timestamp }), false, name);
    assert.equal(state.deleted.length, 0, name); count++;
  }
  await retained('Deleted asset is idempotent', { asset: null });
  await retained('A gallery reference protects shared images', { reference: { gigId: 'another-service' } });
  await retained('An owner profile reference protects images', { profiles: [{ avatarUrl: 'https://files.test/image' }] });
  await retained('A portfolio reference protects images', { portfolio: [{ images: ['https://files.test/image'] }] });
  await retained('An owner avatar protects images', { owner: { image: 'https://files.test/image' } });
  await retained('An incomplete profile scan fails safely', { profiles: Array.from({ length: 10 }, () => ({})) });
  await retained('An incomplete portfolio scan fails safely', { portfolio: Array.from({ length: 100 }, () => ({})) });
  for (const [name, patch, timestamp] of [
    ['Old scheduled task cannot delete a reused image', { cleanupAfter: undefined }, now],
    ['Re-scheduled uploads keep their full grace period', { cleanupAfter: now + 1 }, now],
    ['A future deadline does not delete early', { cleanupAfter: now + 1 }, now + 1],
    ['Other attachment purposes are never removed', { purpose: 'cv' }, now],
  ]) { const { state } = context(); await retained(name, { asset: { ...state.asset, ...patch } }, timestamp); }
  const unused = context();
  assert.equal(await removeUnused.handler(unused.ctx, { assetId: 'asset', cleanupAfter: now }), true);
  assert.deepEqual(unused.state.deleted, ['storage', 'asset']); count++;
  const scheduled = context(); await scheduleImageCleanup(scheduled.ctx, 'asset');
  assert.equal(scheduled.state.asset.cleanupAfter, now + 7 * 24 * 60 * 60 * 1000);
  assert.equal(scheduled.state.scheduled[0][0], now + IMAGE_RETENTION_MS); count++;
  const attached = context({ reference: {} }); await trackGalleryImage(attached.ctx, 'https://files.test/image');
  assert.equal(attached.state.asset.cleanupAfter, undefined); assert.equal(attached.state.scheduled.length, 0); count++;
  const detached = context(); await trackGalleryImage(detached.ctx, 'https://files.test/image');
  assert.equal(detached.state.scheduled.length, 1); count++;
  console.log(`PASS ${count} image-retention cases (real handlers, controlled clock/database)`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
