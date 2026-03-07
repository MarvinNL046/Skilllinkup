/**
 * Scraper module for the blog content pipeline.
 *
 * Provides 3-tier URL scraping with graceful fallback:
 *   Tier 1: Jina Reader (best quality, markdown output)
 *   Tier 2: BrightData Web Unlocker (bypasses bot protection)
 *   Tier 3: Direct fetch + plain-text extraction
 *
 * Also provides Jina Search and a combined topic-context helper.
 */

const DELAY_MS = 2000;
const TIMEOUT_READ_MS = 30000;
const TIMEOUT_API_MS = 90000;
const MAX_SCRAPE_CHARS = 8000;
const MAX_SEARCH_CHARS = 6000;
const MAX_CONTEXT_CHARS = 6000;

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(
  url: string,
  opts: RequestInit = {},
  timeoutMs: number = TIMEOUT_READ_MS
): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { ...opts, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Extracts readable text from an HTML string.
 * Strips tags, collapses whitespace, and trims the result.
 */
function extractTextFromHtml(html: string): string {
  // Remove script and style blocks entirely
  let text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ');

  // Replace block-level elements with newlines to preserve paragraph structure
  text = text.replace(/<\/?(p|div|li|h[1-6]|br|tr|td|th|section|article|header|footer)[^>]*>/gi, '\n');

  // Strip all remaining HTML tags
  text = text.replace(/<[^>]+>/g, ' ');

  // Decode common HTML entities
  text = text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ');

  // Collapse whitespace and blank lines
  text = text
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .join('\n');

  return text;
}

// ---------------------------------------------------------------------------
// Tier implementations
// ---------------------------------------------------------------------------

async function jinaReaderFetch(url: string): Promise<string | null> {
  const jinaKey =
    process.env.JINA_READER_API_KEY || process.env.JINA_API_KEY;

  const headers: Record<string, string> = {
    Accept: 'text/markdown',
    'X-Return-Format': 'markdown',
  };
  if (jinaKey) {
    headers['Authorization'] = `Bearer ${jinaKey}`;
  }

  try {
    const res = await fetchWithTimeout(
      `https://r.jina.ai/${url}`,
      { headers },
      TIMEOUT_READ_MS
    );
    if (!res.ok) return null;
    const text = await res.text();
    // Require at least 200 chars to be considered useful
    return text && text.length > 200 ? text.slice(0, MAX_SCRAPE_CHARS) : null;
  } catch {
    return null;
  }
}

async function brightdataFetch(url: string): Promise<string | null> {
  const token = process.env.BRIGHTDATA_API_TOKEN;
  if (!token) return null;

  try {
    const res = await fetchWithTimeout(
      'https://brd.superproxy.io/api/v1/unblock',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url, zone: 'go2_projects' }),
      },
      TIMEOUT_API_MS
    );
    if (!res.ok) return null;
    const text = await res.text();
    return text && text.length > 200 ? text.slice(0, MAX_SCRAPE_CHARS) : null;
  } catch {
    return null;
  }
}

async function directFetch(url: string): Promise<string | null> {
  try {
    const res = await fetchWithTimeout(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (compatible; SkillLinkup-Pipeline/1.0; +https://skilllinkup.com)',
          Accept: 'text/html,application/xhtml+xml',
        },
      },
      TIMEOUT_READ_MS
    );
    if (!res.ok) return null;
    const html = await res.text();
    if (!html || html.length < 200) return null;
    const text = extractTextFromHtml(html);
    return text.length > 200 ? text.slice(0, MAX_SCRAPE_CHARS) : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Scrapes a URL using a 3-tier fallback strategy:
 *   1. Jina Reader  — high-quality markdown extraction
 *   2. BrightData   — bypasses bot protection
 *   3. Direct fetch — plain-text from raw HTML
 *
 * Returns up to 8000 characters, or null if all tiers fail.
 */
export async function scrapeUrl(url: string): Promise<string | null> {
  // Tier 1: Jina Reader
  console.log(`[scraper] Tier 1 (Jina Reader): ${url}`);
  const jinaResult = await jinaReaderFetch(url);
  if (jinaResult) {
    console.log(`[scraper]   -> Jina succeeded (${jinaResult.length} chars)`);
    return jinaResult;
  }
  console.log(`[scraper]   -> Jina failed, trying BrightData...`);

  await sleep(DELAY_MS);

  // Tier 2: BrightData Web Unlocker
  console.log(`[scraper] Tier 2 (BrightData): ${url}`);
  const brightdataResult = await brightdataFetch(url);
  if (brightdataResult) {
    console.log(`[scraper]   -> BrightData succeeded (${brightdataResult.length} chars)`);
    return brightdataResult;
  }
  console.log(`[scraper]   -> BrightData failed, trying direct fetch...`);

  await sleep(DELAY_MS);

  // Tier 3: Direct fetch + HTML text extraction
  console.log(`[scraper] Tier 3 (Direct fetch): ${url}`);
  const directResult = await directFetch(url);
  if (directResult) {
    console.log(`[scraper]   -> Direct fetch succeeded (${directResult.length} chars)`);
  } else {
    console.warn(`[scraper]   -> All 3 tiers failed for: ${url}`);
  }
  return directResult;
}

async function jinaSearch(query: string): Promise<string | null> {
  const jinaKey =
    process.env.JINA_READER_API_KEY || process.env.JINA_API_KEY;

  if (!jinaKey) return null;

  try {
    const res = await fetchWithTimeout(
      `https://s.jina.ai/?q=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `Bearer ${jinaKey}`,
          Accept: 'text/markdown',
        },
      },
      TIMEOUT_READ_MS
    );
    if (!res.ok) return null;
    const text = await res.text();
    return text && text.length > 100 ? text.slice(0, MAX_SEARCH_CHARS) : null;
  } catch {
    return null;
  }
}

async function brightdataSerp(query: string): Promise<string | null> {
  const token = process.env.BRIGHTDATA_API_TOKEN;
  const zone = process.env.BRIGHTDATA_ZONE_SERP || 'go2_projects_serp';
  if (!token) return null;

  try {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&num=5`;
    const res = await fetchWithTimeout(
      'https://brd.superproxy.io/api/v1/unblock',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url: searchUrl, zone }),
      },
      TIMEOUT_API_MS
    );
    if (!res.ok) return null;
    const html = await res.text();
    if (!html || html.length < 200) return null;
    const text = extractTextFromHtml(html);
    return text.length > 100 ? text.slice(0, MAX_SEARCH_CHARS) : null;
  } catch {
    return null;
  }
}

/**
 * Searches the web using Jina Search with BrightData SERP fallback.
 * Returns up to 6000 characters of aggregated results.
 */
export async function searchTopic(query: string): Promise<string | null> {
  // Tier 1: Jina Search
  console.log(`[scraper] Search Tier 1 (Jina Search): "${query}"`);
  const jinaResult = await jinaSearch(query);
  if (jinaResult) {
    console.log(`[scraper]   -> Jina Search succeeded (${jinaResult.length} chars)`);
    return jinaResult;
  }
  console.log(`[scraper]   -> Jina Search failed, trying BrightData SERP...`);

  await sleep(DELAY_MS);

  // Tier 2: BrightData SERP
  console.log(`[scraper] Search Tier 2 (BrightData SERP): "${query}"`);
  const serpResult = await brightdataSerp(query);
  if (serpResult) {
    console.log(`[scraper]   -> BrightData SERP succeeded (${serpResult.length} chars)`);
  } else {
    console.warn(`[scraper]   -> All search tiers failed for: "${query}"`);
  }
  return serpResult;
}

/**
 * Builds a combined context string for an article topic by:
 *   1. Scraping each URL in `sources` (3-tier fallback per URL)
 *   2. Running two Jina Search queries: one for the topic itself,
 *      one for "{topic} 2026 freelancing"
 *
 * All parts are concatenated and truncated to 6000 characters total.
 * Returns an empty string if nothing could be gathered.
 */
export async function scrapeTopicContext(
  topic: string,
  sources: string[]
): Promise<string> {
  const parts: string[] = [];

  // Scrape each source URL
  for (const url of sources) {
    const content = await scrapeUrl(url);
    if (content) {
      parts.push(`### Source: ${url}\n${content}`);
    }
    await sleep(DELAY_MS);
  }

  // Search query 1: the topic itself
  const searchResult1 = await searchTopic(topic);
  if (searchResult1) {
    parts.push(`### Search results: ${topic}\n${searchResult1}`);
  }
  await sleep(DELAY_MS);

  // Search query 2: topic in 2026 freelancing context
  const freelancingQuery = `${topic} 2026 freelancing`;
  const searchResult2 = await searchTopic(freelancingQuery);
  if (searchResult2) {
    parts.push(`### Search results: ${freelancingQuery}\n${searchResult2}`);
  }

  const combined = parts.join('\n\n---\n\n');
  return combined.slice(0, MAX_CONTEXT_CHARS);
}
