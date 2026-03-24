import type { GeneratedPost, PostCategory, TopicQueue } from "./types";

// ---------------------------------------------------------------------------
// Topic bank
// ---------------------------------------------------------------------------
export const TOPIC_BANK: Record<PostCategory, string[]> = {
  "platform-reviews": [
    "Fiverr Review",
    "Upwork Review",
    "Toptal Review",
    "99designs Review",
    "Guru Review",
    "PeoplePerHour Review",
    "Malt Review",
    "Freelancer.com Review",
  ],
  "freelancing-tips": [
    "How to Get Your First Freelance Client",
    "Building a Winning Freelance Portfolio",
    "Setting Your Freelance Rates",
    "Time Management for Freelancers",
    "Client Communication Best Practices",
    "Freelance Contract Essentials",
  ],
  "hiring-guide": [
    "Writing Effective Project Briefs",
    "Evaluating Freelancer Portfolios",
    "Managing Remote Freelancers",
    "Choosing the Right Freelance Platform",
  ],
  "industry-trends": [
    "AI Impact on Freelancing",
    "Remote Work Statistics 2026",
    "Gig Economy Growth Trends",
    "Platform Consolidation Trends",
  ],
  "tool-reviews": [
    "Best Project Management Tools for Freelancers",
    "Invoice Tools Comparison",
    "Time Tracking Apps Review",
    "Design Tools for Freelancers",
    "AI Writing Tools for Freelancers",
  ],
  "career-development": [
    "From Freelancer to Agency Owner",
    "Building Passive Income as a Freelancer",
    "Personal Branding for Freelancers",
    "LinkedIn for Freelancers",
  ],
  "pricing-guides": [
    "Hourly vs Fixed-Price Projects",
    "Value-Based Pricing Guide",
    "Rate Negotiation Strategies",
    "Retainer Agreements Guide",
  ],
  "remote-work": [
    "Home Office Setup Guide",
    "Work-Life Balance for Remote Workers",
    "Digital Nomad Lifestyle Guide",
    "Managing Time Zones in Remote Teams",
  ],
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const STOP_WORDS = new Set([
  "in", "the", "a", "an", "of", "for", "to", "and", "or", "is", "vs",
  "at", "on", "per", "your", "you", "best", "top", "guide", "complete",
  "ultimate", "2026", "2025", "how", "which", "what", "why", "when",
]);

function extractSignificantWords(text: string, minLength = 2): string[] {
  return text
    .toLowerCase()
    .split(/[\s:—\-,?.!'"]+/)
    .filter((w) => !STOP_WORDS.has(w) && w.length >= minLength);
}

function stemWord(word: string): string {
  let w = word.replace(/[()]/g, "").replace(/'s$/i, "");
  if (w.endsWith("ies") && w.length > 4) w = w.slice(0, -3) + "y";
  else if (w.endsWith("ers") && w.length > 4) w = w.slice(0, -1); // freelancers → freelancer
  else if (w.endsWith("ing") && w.length > 5) w = w.slice(0, -3);
  else if (w.endsWith("es") && w.length > 4) w = w.slice(0, -2);
  else if (w.endsWith("s") && !w.endsWith("ss") && w.length > 3) w = w.slice(0, -1);
  return w;
}

function isSlugMatch(topicWords: string[], slug: string): boolean {
  if (topicWords.length === 0) return false;

  // Stem topic words for better matching (e.g. "freelancers" → "freelancer")
  const stemmedTopicWords = topicWords.map(stemWord);
  const slugParts = slug.split("-");

  const matchCount = stemmedTopicWords.filter((word) =>
    // Check both: word contained in slug, OR slug part starts with word stem
    slug.includes(word) || slugParts.some((part) => part.startsWith(word) || word.startsWith(part))
  ).length;

  // All significant words match = definite duplicate
  if (matchCount === stemmedTopicWords.length) return true;

  // Relaxed fuzzy: 2+ matches AND 40%+ ratio (lowered from 50% to catch more dupes)
  const matchRatio = matchCount / stemmedTopicWords.length;
  return matchCount >= 2 && matchRatio >= 0.4;
}

// ---------------------------------------------------------------------------
// Topic selection (fuzzy dedup — prevents overwrites)
// ---------------------------------------------------------------------------
export function selectTopic(
  existingSlugs: string[],
  topicQueue: TopicQueue | null
): { topic: string; category: PostCategory; sources?: string[]; searchQueries?: string[] } | null {

  // 1. Check the priority queue first (priority 1 = highest)
  if (topicQueue && topicQueue.queue.length > 0) {
    const sorted = [...topicQueue.queue].sort((a, b) => a.priority - b.priority);
    const completedSet = new Set(topicQueue.completed ?? []);

    for (const item of sorted) {
      // Skip if explicitly in completed list
      if (completedSet.has(slugify(item.topic))) {
        console.log(`[content-generator] Queue: "${item.topic}" in completed list`);
        continue;
      }

      // Fuzzy match against existing Convex slugs
      const topicWords = extractSignificantWords(item.topic, 3);
      const alreadyPublished = existingSlugs.some((slug) => isSlugMatch(topicWords, slug));

      if (!alreadyPublished) {
        console.log(`[content-generator] Queue: "${item.topic}" not yet published (words: ${topicWords.join(",")})`);
        return {
          topic: item.topic,
          category: item.category,
          sources: item.sources,
          searchQueries: item.searchQueries,
        };
      } else {
        console.log(`[content-generator] Queue: "${item.topic}" already published (words: ${topicWords.join(",")})`);
      }
    }
  }

  // 2. Fall back to random selection from TOPIC_BANK (also fuzzy)
  const categories = Object.keys(TOPIC_BANK) as PostCategory[];
  const shuffledCategories = [...categories].sort(() => Math.random() - 0.5);

  for (const category of shuffledCategories) {
    const topics = TOPIC_BANK[category];
    const available = topics.filter((t) => {
      const topicWords = extractSignificantWords(t, 3);
      return !existingSlugs.some((slug) => isSlugMatch(topicWords, slug));
    });
    if (available.length > 0) {
      const topic = available[Math.floor(Math.random() * available.length)];
      console.log(`[content-generator] TOPIC_BANK fallback: "${topic}" (${category})`);
      return { topic, category };
    }
  }

  // Graceful exhaustion — return null instead of throwing
  console.log("[content-generator] All topics exhausted — nothing to generate");
  return null;
}

// ---------------------------------------------------------------------------
// Category-specific prompt instructions
// ---------------------------------------------------------------------------
function getCategoryInstructions(category: PostCategory): string {
  switch (category) {
    case "platform-reviews":
      return `This is a PLATFORM REVIEW. Structure it as an in-depth, balanced review covering:
- Who the platform is best for (target audience)
- Fee structure and pricing (ONLY use data from REFERENCE DATA — never invent fees)
- Pros and cons based on reference data
- How it compares to 1-2 direct competitors
- Verdict and recommendation
Include a comparison table of key metrics if reference data supports it.
Use star ratings (e.g. ★★★★☆) where appropriate.`;

    case "freelancing-tips":
      return `This is a PRACTICAL TIPS ARTICLE. Structure it with:
- An actionable, numbered or scannable format
- Real-world advice freelancers can apply immediately
- Common mistakes to avoid
- Quick wins vs. long-term strategies clearly separated
Focus on practical, implementable advice. Use numbered lists for step-by-step guidance.`;

    case "hiring-guide":
      return `This is a HIRING GUIDE for clients and businesses. Structure it with:
- Clear step-by-step process
- Decision criteria and checklists
- Red flags to watch out for
- Budget considerations (use hedging language if no hard data)
- Templates or example language where applicable
Write from the perspective of a business owner or hiring manager.`;

    case "industry-trends":
      return `This is an INDUSTRY TRENDS article. Structure it with:
- Data-backed trends (ONLY from REFERENCE DATA — never invent statistics)
- What these trends mean for freelancers and clients practically
- Historical context where available
- Forward-looking implications (clearly labeled as analysis/opinion)
Use hedging language: "data suggests", "trends indicate", "analysts expect".`;

    case "tool-reviews":
      return `This is a TOOL REVIEW or TOOL COMPARISON. Structure it with:
- Feature comparison table (only compare features confirmed in reference data)
- Pricing overview (only from reference data — never invent prices)
- Best use cases for each tool
- Who each tool is best for
- Our pick / recommendation
Be specific about integrations, platform compatibility, and pricing tiers.`;

    case "career-development":
      return `This is a CAREER DEVELOPMENT article. Structure it with:
- Mindset shifts required
- Concrete, actionable steps
- Timeline expectations (realistic, not overpromising)
- Common pitfalls and how to avoid them
- Success metrics to track progress
Write in an encouraging, mentor-like tone.`;

    case "pricing-guides":
      return `This is a PRICING GUIDE. Structure it with:
- Clear explanation of the pricing model or strategy
- When to use each approach
- How to calculate and justify rates
- Negotiation tactics and scripts
- Example scenarios (clearly labeled as illustrative, not real cases)
Use formulas, tables, and concrete examples to make pricing tangible.`;

    case "remote-work":
      return `This is a REMOTE WORK article. Structure it with:
- Practical setup advice (tools, environment, routines)
- Productivity strategies backed by widely accepted best practices
- Common remote work challenges and solutions
- Recommendations for tools and workflows (only endorse if in reference data)
Write from lived experience perspective — practical over theoretical.`;

    default:
      return `Write a comprehensive, well-structured article with clear H2 sections, practical advice, and actionable takeaways.`;
  }
}

// ---------------------------------------------------------------------------
// Prompt builder
// ---------------------------------------------------------------------------
function buildPrompt(
  topic: string,
  category: PostCategory,
  scrapedContext: string,
  existingSlugs: string[],
  locale: "en" | "nl"
): string {
  const internalLinkSlugs = existingSlugs.slice(0, 20); // Keep prompt size reasonable
  const internalLinksExample = internalLinkSlugs
    .slice(0, 5)
    .map((s) => `<a href="/resources/${s}">${s.replace(/-/g, " ")}</a>`)
    .join(", ");

  const localeInstruction =
    locale === "nl"
      ? `Write the ENTIRE article in Dutch (Nederlands). Use formal but approachable Dutch. Translate all headings, body text, and JSON field values to Dutch.`
      : `Write the ENTIRE article in English.`;

  const currentDate = new Date().toISOString().split("T")[0]; // e.g. 2026-03-07

  return `## ROLE
You are a senior freelance industry writer for SkillLinkup.com — a platform that helps freelancers and clients find the best freelance platforms and tools. Your writing style is authoritative, conversational, and data-driven, inspired by Adam Enfroy: short punchy paragraphs, bold key statistics, rhetorical questions to engage readers, and a no-fluff approach.

You write from FIRST-HAND EXPERIENCE — the SkillLinkup editorial team has actually tested and used these platforms and tools. This is critical for E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness).

## TASK
Write an SEO-optimized blog post about: "${topic}"
Category: ${category}
Locale: ${locale}
${localeInstruction}

## REFERENCE DATA (use ONLY this for facts, statistics, prices)
${scrapedContext || "No reference data provided. Use only well-established, publicly known facts. Apply anti-hallucination rules strictly."}

## CATEGORY-SPECIFIC INSTRUCTIONS
${getCategoryInstructions(category)}

## E-E-A-T COMPLIANCE (Google ranking critical — follow ALL of these)

### Experience (the "first E")
- Write from a first-person perspective where natural: "In our testing...", "When we signed up...", "Our team evaluated..."
- Include specific observations that only someone who used the platform would know (e.g., "The onboarding wizard takes about 5 minutes" — but ONLY if in reference data)
- Mention practical friction points: slow verification, unclear dashboard, confusing fee breakdowns — based on reference data
- DO NOT fabricate personal experiences. If reference data doesn't support a personal observation, use "users report that..." instead

### Expertise
- Demonstrate domain knowledge naturally — reference industry terms correctly (service fee, connects, gig packages, escrow)
- Compare against industry standards when reference data allows: "This is above/below the typical platform commission of..."
- Include expert context: why certain fee structures exist, how platforms make money, what business model they use

### Authoritativeness
- Always cite the SOURCE of data: "According to [Platform]'s pricing page...", "As listed on [Platform]'s FAQ..."
- Link to official sources using real URLs from reference data
- Position SkillLinkup as a knowledgeable comparison hub, not a random blog
- Include a "Methodology" note at the end: "<p><em>This article was researched on ${currentDate} by the SkillLinkup editorial team. Pricing and features were verified against official platform sources. We update our reviews regularly — <a href=\\"/blog\\">check our blog</a> for the latest information.</em></p>"

### Trustworthiness
- ALWAYS include a "Last updated: ${currentDate}" mention near the top of the article
- When data could be outdated, add: "Pricing as of ${currentDate} — always verify on the official platform website"
- Be transparent about limitations: "We haven't tested [X feature] extensively" rather than making claims
- Include balanced pros AND cons — never write a purely positive or purely negative review
- If the article mentions affiliate relationships or monetization, add appropriate context

## CONTENT STRUCTURE (follow this order)
1. **Hook paragraph** — Open with a compelling question or surprising fact. Include: "Last updated: ${currentDate}" as italic text after the hook.
2. **Key Takeaways** — An HTML table with 3-5 bullet-style takeaways (use <table> with two columns: "Takeaway" and "Detail"). This serves as a quick-reference for readers and improves dwell time.
3. **6-8 H2 sections** — Each section should be 150-300 words with a clear, keyword-rich heading. Use H3 subheadings where needed. Include bullet lists and numbered lists where they improve readability. Cite sources inline: "According to [source]..."
4. **Comparison table** — If the topic involves comparing platforms, tools, or strategies, include an HTML <table> with relevant columns. Only include data from REFERENCE DATA. Add a footnote: "Data sourced from official platform websites, ${currentDate}"
5. **FAQ section** — Include 4-6 frequently asked questions using schema-friendly HTML. Use <h3> for questions and <p> for answers. Match real search intent (People Also Ask style).
6. **Methodology note** — Brief italicized paragraph explaining how this article was researched.
7. **Conclusion with CTA** — Summarize key points and include a call-to-action linking to SkillLinkup's platform comparison page.

## INTERNAL LINKS
Where contextually relevant, link to these existing SkillLinkup resources:
- Blog overview: <a href="/blog">SkillLinkup Blog</a>
- Platform comparisons: <a href="/platforms">Compare Freelance Platforms</a>
${internalLinksExample ? `- Specific resources: ${internalLinksExample}` : ""}
Available resource slugs for linking: ${internalLinkSlugs.join(", ")}
Only link to slugs that exist in the list above. Do NOT invent new slugs.

## ANTI-HALLUCINATION RULES (CRITICAL — violating these will cause the post to be rejected)
1. ALL prices, statistics, and percentages MUST come from the REFERENCE DATA section above. If not in reference data, do not state them as fact.
2. Platform names ARE allowed (they are the subject of the article).
3. NEVER invent testimonials, user quotes, or success stories. Do not attribute quotes to unnamed freelancers.
4. If fee data is missing from reference data, write: "check [Platform]'s current pricing page for the latest fees."
5. NEVER fabricate comparison data — only compare metrics that appear in the reference data.
6. Every "Did You Know" or surprising claim MUST have a verifiable source URL in the reference data.
7. Platform website links MUST use real URLs that appear in the reference data. Do not invent URLs.
8. Do NOT invent market share percentages or user counts unless they are in the reference data.
9. Use hedging language when certainty is not established: "approximately", "typically", "many freelancers report", "data suggests".
10. NEVER create fake reviews or attribute quotes to unnamed or invented freelancers.
11. Year-specific claims (e.g. "In 2026...") MUST be verifiable from the reference data or be a known published date.
12. NEVER output meta-instructions, strategy notes, or commentary about the writing process — only the blog post content itself.
13. When writing from first-person experience ("we tested", "in our experience"), ONLY describe observations supported by the reference data. Never fabricate platform interactions.
14. Always attribute data: "According to [Platform]'s website..." or "Based on [Platform]'s pricing page..." — never present scraped data as your own original research.

## TARGET LENGTH
1500–2200 words of actual content (not counting JSON structure overhead).

## OUTPUT FORMAT
Return ONLY a single valid JSON object. No markdown code fences. No text before or after the JSON. The JSON must match this exact schema:

{
  "title": "string — compelling H1 title, include year 2026 if relevant, power words welcome",
  "slug": "string — URL-friendly slug, e.g. 'fiverr-review-2026'",
  "content": "string — FULL blog post as valid HTML. Use <h2>, <h3>, <p>, <ul>, <ol>, <li>, <table>, <thead>, <tbody>, <tr>, <th>, <td>, <strong>, <em>, <a href='...'> tags. NO markdown. NO backticks.",
  "excerpt": "string — 1-2 sentence summary for blog listings, 120-160 chars",
  "metaTitle": "string — SEO title tag, max 60 chars, include primary keyword",
  "metaDescription": "string — SEO meta description, max 155 chars, include a benefit or stat, end with mild CTA",
  "tags": ["string"] — array of 5-8 relevant tags as lowercase strings,
  "categorySlug": "${category}",
  "readTime": number — estimated read time in minutes (word count / 200, rounded up),
  "authorName": "SkillLinkup Editorial Team",
  "locale": "${locale}"
}`;
}

// ---------------------------------------------------------------------------
// AI provider with retry + fallback (Claude Haiku primary, OpenAI fallback)
// ---------------------------------------------------------------------------
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1000;
const AI_TIMEOUT_MS = 120_000;

function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs = AI_TIMEOUT_MS
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal }).finally(() =>
    clearTimeout(timer)
  );
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function callClaude(prompt: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set");

  const res = await fetchWithTimeout("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 8192,
      temperature: 0.3,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Claude API error ${res.status}: ${body}`);
  }

  const result = (await res.json()) as {
    content: Array<{ type: string; text: string }>;
  };

  const textBlock = result.content?.find((b) => b.type === "text");
  if (!textBlock?.text) throw new Error("No text content in Claude response");
  return textBlock.text;
}

async function callOpenAI(prompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not set");

  const res = await fetchWithTimeout(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_completion_tokens: 8192,
        messages: [{ role: "user", content: prompt }],
      }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenAI API error ${res.status}: ${body}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("No content in OpenAI response");
  return content;
}

async function generateAIContent(prompt: string): Promise<string> {
  const hasClaude = !!process.env.ANTHROPIC_API_KEY;
  const hasOpenAI = !!process.env.OPENAI_API_KEY;

  if (!hasClaude && !hasOpenAI) {
    throw new Error("No AI API key configured. Set ANTHROPIC_API_KEY or OPENAI_API_KEY.");
  }

  let lastError: Error | null = null;

  // Try Claude Haiku with retries
  if (hasClaude) {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        return await callClaude(prompt);
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        console.error(`[content-generator] Claude attempt ${attempt}/${MAX_RETRIES} failed:`, lastError.message);
        if (attempt < MAX_RETRIES) await sleep(RETRY_DELAY_MS * attempt);
      }
    }
  }

  // Fallback to OpenAI
  if (hasOpenAI) {
    console.log("[content-generator] Falling back to OpenAI GPT-4o-mini");
    try {
      return await callOpenAI(prompt);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error("[content-generator] OpenAI fallback also failed:", lastError.message);
    }
  }

  throw new Error(`AI generation failed after retries + fallback: ${lastError?.message}`);
}

// ---------------------------------------------------------------------------
// JSON extraction (mirrors scrape-resources.mjs lines 279-299)
// ---------------------------------------------------------------------------
function extractJson(raw: string): GeneratedPost {
  // Strip markdown code fences if present
  raw = raw.replace(/```json?\n?/g, "").replace(/```\n?/g, "").trim();

  // Find the first complete JSON object using brace depth counting
  const firstBrace = raw.indexOf("{");
  if (firstBrace === -1) {
    throw new Error("No JSON object found in AI response");
  }

  let depth = 0;
  let end = -1;
  for (let i = firstBrace; i < raw.length; i++) {
    if (raw[i] === "{") depth++;
    else if (raw[i] === "}") {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }

  if (end === -1) {
    throw new Error("Incomplete JSON object in AI response");
  }

  const jsonStr = raw.slice(firstBrace, end + 1);
  return JSON.parse(jsonStr) as GeneratedPost;
}

// ---------------------------------------------------------------------------
// Public API: generatePost
// ---------------------------------------------------------------------------
export async function generatePost(
  topic: string,
  category: PostCategory,
  scrapedContext: string,
  existingSlugs: string[],
  locale: "en" | "nl"
): Promise<GeneratedPost> {
  const prompt = buildPrompt(topic, category, scrapedContext, existingSlugs, locale);
  const rawResponse = await generateAIContent(prompt);
  const parsed = extractJson(rawResponse);

  // Ensure required fields
  if (!parsed.title) throw new Error("AI response missing 'title' field");
  if (!parsed.slug) throw new Error("AI response missing 'slug' field");
  if (!parsed.content) throw new Error("AI response missing 'content' field");

  // Normalise fields that Claude might get wrong
  parsed.locale = locale;
  parsed.categorySlug = category;
  parsed.authorName = parsed.authorName || "SkillLinkup Editorial Team";
  parsed.tags = Array.isArray(parsed.tags) ? parsed.tags : [];
  parsed.readTime =
    typeof parsed.readTime === "number" && parsed.readTime > 0
      ? parsed.readTime
      : Math.ceil(parsed.content.replace(/<[^>]+>/g, "").split(/\s+/).length / 200);

  return parsed;
}
