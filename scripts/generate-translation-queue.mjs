import fs from 'fs';

const queue = JSON.parse(fs.readFileSync('data/translation-queue.json', 'utf8'));

const extraLocales = [
  { code: 'de', name: 'German',     prio: 20 },
  { code: 'fr', name: 'French',     prio: 30 },
  { code: 'es', name: 'Spanish',    prio: 40 },
  { code: 'pt', name: 'Portuguese', prio: 50 },
  { code: 'it', name: 'Italian',    prio: 60 },
  { code: 'pl', name: 'Polish',     prio: 70 },
];

// One-time infra items (don't duplicate)
const oneTimeIds = new Set([1, 2, 3, 5, 6]);
// Locale-specific infra (id 4 = messages-nl, gets a variant per locale)
const localeInfraIds = new Set([4]);
// Language switcher / final items (do once)
const switcherIds = new Set([150, 151, 152, 153, 154]);

let nextId = 1000;
const newItems = [];

for (const loc of extraLocales) {
  // 1. Create messages/{locale}.json infra item
  newItems.push({
    id: nextId++,
    type: 'infra',
    target: `messages-${loc.code}`,
    description: `Create messages/${loc.code}.json — full ${loc.name} translation of en.json`,
    locale: loc.code,
    status: 'pending',
    priority: loc.prio,
    phase: 0
  });

  // 2. Duplicate all NL translation items for this locale
  const nlItems = queue.queue.filter(item => {
    if (oneTimeIds.has(item.id)) return false;
    if (localeInfraIds.has(item.id)) return false;
    if (switcherIds.has(item.id)) return false;
    return item.locale === 'nl';
  });

  for (const item of nlItems) {
    newItems.push({
      ...item,
      id: nextId++,
      locale: loc.code,
      priority: loc.prio + item.phase,
      status: 'pending'
    });
  }
}

// Merge into queue
queue.locales = ['nl', 'de', 'fr', 'es', 'pt', 'it', 'pl'];
queue.queue = [...queue.queue, ...newItems];
queue.stats.total = queue.queue.length;

fs.writeFileSync('data/translation-queue.json', JSON.stringify(queue, null, 2));

console.log(`Total items: ${queue.stats.total}`);
console.log('Per locale:');
const counts = {};
for (const item of queue.queue) {
  counts[item.locale] = (counts[item.locale] || 0) + 1;
}
for (const [locale, count] of Object.entries(counts).sort((a, b) => a[1] - b[1])) {
  console.log(`  ${locale}: ${count} items`);
}
console.log(`\nEstimate at 3min intervals: ~${Math.ceil(queue.stats.total * 3 / 60)} hours / ~${(queue.stats.total * 3 / 60 / 24).toFixed(1)} days`);
