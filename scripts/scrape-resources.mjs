#!/usr/bin/env node
/**
 * Scrapes real pricing/comparison data for SkillLinkup resource pages.
 * Uses Jina Reader + Jina Search to get real data, Claude to structure it,
 * then upserts into Convex via npx convex run.
 *
 * Usage:
 *   node scripts/scrape-resources.mjs                    # all resources
 *   node scripts/scrape-resources.mjs --slug upwork-pricing  # single resource
 *   node scripts/scrape-resources.mjs --dry-run          # print JSON, don't save
 */

import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { readFileSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env.local manually (dotenv not installed)
try {
  const envPath = path.join(__dirname, '..', '.env.local');
  const envContent = readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
    if (!(key in process.env)) process.env[key] = val;
  }
} catch (_) {
  // .env.local not found — rely on environment variables already set
}

const JINA_API_KEY = process.env.JINA_READER_API_KEY || process.env.JINA_API_KEY;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const DELAY_MS = 2000;
const TIMEOUT_MS = 30000;

// ---------------------------------------------------------------------------
// Resource definitions
// ---------------------------------------------------------------------------
const RESOURCES = [
  {
    slug: 'upwork-pricing',
    locale: 'en',
    type: 'pricing',
    sources: [
      'https://www.upwork.com/pricing',
      'https://support.upwork.com/hc/en-us/articles/211063538',
    ],
    searchQuery: 'Upwork pricing fees service fee 2026',
  },
  {
    slug: '99designs-pricing',
    locale: 'en',
    type: 'pricing',
    sources: [
      'https://99designs.com/pricing',
      'https://en.99designs.com.au/how-it-works',
    ],
    searchQuery: '99designs pricing plans fees 2026',
  },
  {
    slug: 'freelancer-vs-guru',
    locale: 'en',
    type: 'comparison',
    sources: [
      'https://www.freelancer.com/about',
      'https://www.guru.com/d/account/employer/memberships/',
    ],
    searchQuery: 'Freelancer.com vs Guru comparison fees talent 2026',
  },
  {
    slug: 'mastering-freelance-platform-algorithms',
    locale: 'en',
    type: 'guide',
    sources: [
      'https://www.upwork.com/resources/boosting-upwork-profile',
      'https://www.fiverr.com/resources/guides/freelancing/fiverr-algorithm',
    ],
    searchQuery: 'how freelance platform algorithms work ranking tips 2026',
  },
  {
    slug: 'upwork-pricing-tactics',
    locale: 'en',
    type: 'guide',
    sources: [
      'https://www.upwork.com/pricing',
      'https://support.upwork.com/hc/en-us/articles/211063538',
    ],
    searchQuery: 'Upwork pricing tactics reduce fees save money freelancer 2026',
  },
  {
    slug: 'toptal-for-beginners',
    locale: 'en',
    type: 'guide',
    sources: [
      'https://www.toptal.com/faq',
      'https://www.toptal.com/how-it-works',
    ],
    searchQuery: 'Toptal how it works beginners guide requirements 2026',
  },
  {
    slug: 'freelance-profile-templates',
    locale: 'en',
    type: 'guide',
    sources: [
      'https://www.upwork.com/resources/freelancer-profile',
      'https://www.fiverr.com/resources/guides/freelancing/create-a-gig',
    ],
    searchQuery: 'freelance profile template examples Upwork Fiverr 2026',
  },
  {
    slug: 'is-toptal-legit',
    locale: 'en',
    type: 'guide',
    sources: [
      'https://www.toptal.com/faq',
      'https://www.toptal.com/how-it-works',
    ],
    searchQuery: 'Is Toptal legit trustworthy review scam or real 2026',
  },
  {
    slug: 'freelance-beginners-guide',
    locale: 'en',
    type: 'guide',
    sources: [
      'https://www.upwork.com/resources/beginners-guide-to-freelancing',
      'https://www.fiverr.com/resources/guides/freelancing/how-to-become-a-freelancer',
    ],
    searchQuery: 'how to start freelancing beginners guide 2026 tips',
  },
  {
    slug: 'project-management-tools-freelancers',
    locale: 'en',
    type: 'guide',
    sources: [
      'https://trello.com/tour',
      'https://asana.com/uses/freelancers',
    ],
    searchQuery: 'best project management tools for freelancers 2026',
  },
  {
    slug: 'platforms-for-copywriters',
    locale: 'nl',
    type: 'guide',
    sources: [
      'https://www.textbroker.nl/copywriters',
      'https://www.malt.nl/profil/copywriter',
    ],
    searchQuery: 'beste freelance platforms voor copywriters Nederland 2026',
  },
  {
    slug: 'fiverr-vs-upwork',
    locale: 'en',
    type: 'comparison',
    sources: [
      'https://www.fiverr.com/resources/guides/freelancing/fiverr-vs-upwork',
      'https://www.upwork.com/pricing',
    ],
    searchQuery: 'Fiverr vs Upwork comparison fees talent quality 2026',
  },
  {
    slug: 'is-upwork-free',
    locale: 'en',
    type: 'guide',
    sources: [
      'https://www.upwork.com/pricing',
      'https://support.upwork.com/hc/en-us/articles/211063538',
    ],
    searchQuery: 'is Upwork free to use for freelancers clients costs 2026',
  },
  {
    slug: 'what-is-upwork',
    locale: 'en',
    type: 'guide',
    sources: [
      'https://www.upwork.com/about',
      'https://www.upwork.com/resources/beginners-guide-to-freelancing',
    ],
    searchQuery: 'what is Upwork how does it work beginners 2026',
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchWithTimeout(url, opts = {}, timeoutMs = TIMEOUT_MS) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { ...opts, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

async function jinaRead(url) {
  const headers = { Accept: 'text/markdown', 'X-Return-Format': 'markdown' };
  if (JINA_API_KEY) headers['Authorization'] = `Bearer ${JINA_API_KEY}`;
  const res = await fetchWithTimeout(`https://r.jina.ai/${url}`, { headers });
  if (!res.ok) return null;
  const text = await res.text();
  return text?.length > 200 ? text.slice(0, 8000) : null;
}

async function jinaSearch(query) {
  if (!JINA_API_KEY) throw new Error('JINA_READER_API_KEY required');
  const res = await fetchWithTimeout(
    `https://s.jina.ai/?q=${encodeURIComponent(query)}`,
    { headers: { Authorization: `Bearer ${JINA_API_KEY}` } }
  );
  if (!res.ok) return null;
  const text = await res.text();
  return text?.slice(0, 6000);
}

async function claudeStructure(resourceDef, scrapedContent) {
  const typeInstructions = {
    pricing: `Extract and structure pricing information. Create a pricing table with tiers/plans (pricingData as array of {tier, price, billingPeriod, features[]}). Include how fees work, what's included, and money-saving tips in sections.`,
    comparison: `Compare the two platforms objectively. Create comparisonData as array of {category, a, b} rows covering: fees, talent pool quality, ease of use, support, payment protection. Give a clear verdict.`,
    guide: `Structure as a practical guide with clear sections. Include actionable tips, numbered steps where relevant. No pricingData or comparisonData needed.`,
  };

  const prompt = `You are an expert SEO content writer. Structure the following scraped web content into a resource article for SkillLinkup (a freelance marketplace platform).

Resource: "${resourceDef.slug}" (type: ${resourceDef.type})

SCRAPED CONTENT:
${scrapedContent}

INSTRUCTIONS:
${typeInstructions[resourceDef.type]}

Return ONLY valid JSON matching this exact schema:
{
  "metaTitle": "string (max 60 chars, include year 2026, numbers if possible, power words)",
  "metaDescription": "string (max 155 chars, include key stat or benefit, no fluff)",
  "intro": "string (2-3 sentences, hook the reader, include the main value proposition)",
  "sections": [{"heading": "string", "body": "string (2-4 paragraphs of real useful content)"}],
  "pricingData": null or [{"tier": "string", "price": "string", "billingPeriod": "string", "features": ["string"]}],
  "comparisonData": null or [{"category": "string", "a": "string", "b": "string"}],
  "faqItems": [{"question": "string", "answer": "string"}] (5-7 real questions people ask),
  "keyTakeaways": ["string"] (3-5 bullet points, the most important things to remember)
}

Rules:
- Use ONLY real data from the scraped content — never invent prices or statistics
- If you cannot find specific pricing, say "Check current pricing at [platform]"
- metaTitle must be compelling for CTR (e.g. "Upwork Fees 2026: Full Breakdown (+ How to Pay Less)")
- Write in clear English, no jargon
- Sections should have 2-4 concrete paragraphs each`;

  const res = await fetchWithTimeout('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4096,
      temperature: 0.2,
      messages: [{ role: 'user', content: prompt }],
    }),
  }, 90000);

  if (!res.ok) throw new Error(`Claude API ${res.status}: ${await res.text()}`);
  const result = await res.json();
  let raw = result.content[0].text;

  // Strip markdown code fences if present
  raw = raw.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim();

  // Extract the first complete JSON object (handles trailing text after closing })
  const firstBrace = raw.indexOf('{');
  if (firstBrace === -1) throw new Error('No JSON object found in Claude response');
  let depth = 0;
  let end = -1;
  for (let i = firstBrace; i < raw.length; i++) {
    if (raw[i] === '{') depth++;
    else if (raw[i] === '}') {
      depth--;
      if (depth === 0) { end = i; break; }
    }
  }
  if (end === -1) throw new Error('Incomplete JSON object in Claude response');
  raw = raw.slice(firstBrace, end + 1);

  return JSON.parse(raw);
}

async function upsertToConvex(resource, structured, dryRun) {
  const payload = {
    slug: resource.slug,
    locale: resource.locale,
    type: resource.type,
    status: 'published',
    publishedAt: Date.now(),
    ...structured,
    // Ensure arrays are never null (Convex rejects null for required array fields)
    faqItems: structured.faqItems ?? [],
    sections: structured.sections ?? [],
  };

  // Remove null values for optional fields (Convex expects undefined, not null)
  if (payload.pricingData === null) delete payload.pricingData;
  if (payload.comparisonData === null) delete payload.comparisonData;

  if (dryRun) {
    console.log('DRY RUN — would upsert:', JSON.stringify(payload, null, 2));
    return;
  }

  // Use Convex HTTP API directly to avoid npx convex run .env.local parsing issues
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) throw new Error('NEXT_PUBLIC_CONVEX_URL missing in .env.local');

  const res = await fetchWithTimeout(`${convexUrl}/api/mutation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path: 'resources:upsert', format: 'json', args: [payload] }),
  }, 30000);

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Convex mutation failed ${res.status}: ${body}`);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2);
  const slugFilter = args.includes('--slug') ? args[args.indexOf('--slug') + 1] : null;
  const dryRun = args.includes('--dry-run');

  if (!ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY missing in .env.local');

  const targets = slugFilter
    ? RESOURCES.filter((r) => r.slug === slugFilter)
    : RESOURCES;

  if (targets.length === 0) {
    console.error(`No resource found for slug: ${slugFilter}`);
    process.exit(1);
  }

  for (const resource of targets) {
    console.log(`\n=== ${resource.slug} (${resource.type}) ===`);

    // 1. Scrape sources
    const contentParts = [];
    for (const url of resource.sources) {
      console.log(`  Jina Reader: ${url}`);
      try {
        const content = await jinaRead(url);
        if (content) contentParts.push(`### Source: ${url}\n${content}`);
        else console.log(`    → empty/blocked`);
      } catch (err) {
        console.log(`    → failed: ${err.message}`);
      }
      await sleep(DELAY_MS);
    }

    // 2. Search for additional context
    console.log(`  Jina Search: ${resource.searchQuery}`);
    try {
      const searchContent = await jinaSearch(resource.searchQuery);
      if (searchContent) contentParts.push(`### Search results\n${searchContent}`);
    } catch (err) {
      console.log(`    → search failed: ${err.message}`);
    }
    await sleep(DELAY_MS);

    if (contentParts.length === 0) {
      console.log(`  ⚠ No content scraped — skipping`);
      continue;
    }

    // 3. Structure with Claude
    console.log(`  Claude: structuring content...`);
    let structured;
    try {
      structured = await claudeStructure(resource, contentParts.join('\n\n---\n\n'));
    } catch (err) {
      console.error(`  ✗ Claude failed: ${err.message}`);
      continue;
    }

    // 4. Save to Convex
    console.log(`  Saving to Convex...`);
    try {
      await upsertToConvex(resource, structured, dryRun);
      console.log(`  ✓ Done: "${structured.metaTitle}"`);
    } catch (err) {
      console.error(`  ✗ Convex upsert failed: ${err.message}`);
    }

    await sleep(DELAY_MS);
  }

  console.log('\n✓ All resources processed');
}

main().catch((err) => { console.error(err); process.exit(1); });
