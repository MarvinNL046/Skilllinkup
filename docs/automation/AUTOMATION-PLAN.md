# Blog Automation Plan - SkillLinkup

## Doel
Marvin kan zich focussen op:
- ✅ Affiliate partners zoeken en onderhandelen
- ✅ Short links aanmaken (go.skilllinkup.com)
- ✅ In-depth guides schrijven (met hands-on testing)

**Automatisering zorgt voor:** Quick-win blogposts zoals Adam Enfroy's model ($500K+ sales)

---

## Workflow Overview

```
Google Sheets → n8n → AI Content → Playwright Screenshots → Draft Post → Marvin Reviews → Publish
```

---

## Stap-voor-Stap Architectuur

### 1. Google Sheets als Input
**Kolommen:**
- `affiliate_link` (go.skilllinkup.com/upwork)
- `program_name` (Upwork)
- `description` (Freelance platform voor developers en designers)
- `category` (Freelance Platforms)
- `commission_rate` ($150 per signup)
- `status` (pending / in-progress / published)
- `priority` (high / medium / low)

**Trigger:** Nieuwe rij toegevoegd met status "pending"

---

### 2. n8n Workflow

#### Node 1: Google Sheets Trigger
- Polling: Elke 15 minuten
- Filter: Alleen rows met `status = "pending"`

#### Node 2: Data Enrichment
- Extraheer base URL uit short link via short.io API
- Check of platform al bestaat in database (avoid duplicates)
- Haal extra metadata op (indien beschikbaar)

#### Node 3: Screenshot Generator (Playwright MCP)
**Playwright Actions:**
```javascript
// Homepage screenshot
await page.goto(baseUrl);
await page.screenshot({
  path: `${program_name}-homepage.png`,
  fullPage: false
});

// Pricing page (if exists)
await page.goto(baseUrl + '/pricing');
await page.screenshot({
  path: `${program_name}-pricing.png`
});

// Sign-up flow screenshot
await page.goto(baseUrl + '/signup');
await page.screenshot({
  path: `${program_name}-signup.png`
});
```

**Opslag:** Upload naar `/public/images/platforms/${slug}/`

#### Node 4: AI Content Generation (Claude API)
**Prompt Template:**
```
Write a comprehensive review blog post for {program_name}.

Context:
- Affiliate link: {affiliate_link}
- Description: {description}
- Commission: {commission_rate}
- Category: {category}

Structure (Adam Enfroy style):
1. Quick intro (2-3 sentences)
2. What is {program_name}? (1 paragraph)
3. Key Features (bullet list with emojis)
4. Pricing Overview (screenshot reference)
5. Who Is It For? (2-3 paragraphs)
6. Pros & Cons (table format)
7. My Verdict (personal touch, 1 paragraph)
8. CTA with affiliate link

Tone: Conversational, helpful, honest
Length: 800-1200 words
SEO: Include keywords naturally
```

**Output:** Markdown content met screenshot references

#### Node 5: Create Draft in Admin Dashboard
**API Call:** `POST /api/posts`
```json
{
  "title": "Upwork Review 2025: Is It Worth It? ($150 Bonus)",
  "slug": "upwork-review",
  "content": "{generated_markdown}",
  "status": "draft",
  "category_id": "{auto_mapped_category}",
  "feature_img": "/images/platforms/upwork/upwork-homepage.png",
  "meta_description": "{auto_generated_seo}"
}
```

#### Node 6: Update Google Sheets
- Set `status = "in-progress"`
- Add `draft_url = "http://localhost:3002/posts/{id}/edit"`
- Add `created_at = "{timestamp}"`

#### Node 7: Notification
**Email naar Marvin:**
```
Subject: 🤖 New Blog Draft Ready: Upwork Review

Hi Marvin,

Er staat een nieuwe blogpost klaar voor review:

Platform: Upwork
Draft URL: http://localhost:3002/posts/123/edit
Screenshots: 3 uploaded
Word count: 1,047

Action needed:
1. Review content for accuracy
2. Check affiliate links
3. Approve or request changes
4. Publish when ready

- SkillLinkup Bot
```

---

## 3. Marvin's Oversight Role

### Quick Review Checklist
- [ ] Screenshots correct geladen?
- [ ] Affiliate link werkt (test go.skilllinkup.com/xxx)?
- [ ] Content is accurate (geen hallucinations)?
- [ ] Tone past bij SkillLinkup brand?
- [ ] SEO title + meta description OK?

**Acties:**
- ✅ **Approve:** Zet status op "published" → auto-publish
- ✏️ **Edit:** Kleine aanpassingen in RichTextEditor
- ❌ **Reject:** Add feedback in Google Sheets → n8n regenereert

---

## 4. Verschil: Automated vs. In-Depth Guides

### Automated Posts (Adam Enfroy Style)
**Kenmerken:**
- ✅ Korte reviews (800-1200 woorden)
- ✅ Screenshots van homepage/pricing/signup
- ✅ Geen account nodig
- ✅ Focus op features + affiliate link
- ✅ Volume: 10-20 posts per week mogelijk

**Use Case:** Quick wins, SEO coverage, affiliate conversions

### In-Depth Guides (Marvin Handmatig)
**Kenmerken:**
- 📝 Lange guides (2500-5000 woorden)
- 📝 Account aanmaken + hands-on testing
- 📝 Screen recordings / walkthrough video's
- 📝 Comparison tables met andere platforms
- 📝 Personal experience + screenshots van dashboard
- 📝 Volume: 2-4 posts per maand

**Use Case:** Authority building, user trust, detailed comparisons

---

## 5. Technische Implementatie

### n8n Workflow Nodes
```
1. Google Sheets Trigger (polling)
2. Set Variables (data cleanup)
3. HTTP Request (short.io API - get base URL)
4. Database Query (check if platform exists)
5. IF Node (platform exists? skip : continue)
6. Code Node (Playwright screenshot logic)
7. HTTP Request (Claude API - content generation)
8. HTTP Request (Admin API - create draft)
9. Google Sheets Update (set status)
10. Gmail Node (send notification)
```

### Playwright MCP Integration
**MCP Server:** `@playwright/mcp-server`

**n8n Code Node:**
```javascript
const { chromium } = require('playwright');

async function captureScreenshots(url, programName) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Homepage
  await page.goto(url);
  await page.waitForLoadState('networkidle');
  const homepage = await page.screenshot({ fullPage: false });

  // Pricing (try common paths)
  const pricingPaths = ['/pricing', '/plans', '/purchase'];
  let pricingScreenshot = null;

  for (const path of pricingPaths) {
    try {
      await page.goto(url + path, { timeout: 5000 });
      pricingScreenshot = await page.screenshot();
      break;
    } catch (e) {
      continue; // Path doesn't exist, try next
    }
  }

  await browser.close();

  return {
    homepage,
    pricing: pricingScreenshot
  };
}

// Usage in n8n
const screenshots = await captureScreenshots(
  $json.base_url,
  $json.program_name
);

return { screenshots };
```

---

## 6. Kosten Analyse

### Per Automated Post
- **Playwright screenshots:** ~$0.01 (compute)
- **Claude API (1000 woorden):** ~$0.10
- **n8n cloud (of self-hosted):** ~$0.02
- **Short.io API calls:** $0.00 (included in plan)

**Total per post:** ~$0.13

### ROI Berekening
**Scenario:** 100 posts/maand
- **Kosten:** $13/maand
- **Adam Enfroy benchmark:** $500K+ sales met ~200 posts
- **SkillLinkup target:** $1K-$5K/maand affiliate revenue

**Time Saved:**
- Marvin schrijft nu 2-3 posts/dag manually = 6-8 uur
- Met automatisering: 30 minuten review per dag = 90% time saving

---

## 7. Limitations & Waarschuwingen

### Wat NIET automatisch kan:
❌ Account aanmaken op platforms (CAPTCHA, email verification)
❌ Diep product testen (hands-on experience)
❌ Persoonlijke anekdotes / storytelling
❌ Comparison screenshots tussen platforms (side-by-side)
❌ Video content / screen recordings

### Quality Control Risks
⚠️ AI kan "hallucinate" features die niet bestaan
⚠️ Screenshots kunnen verouderd raken (platform redesigns)
⚠️ Affiliate links kunnen breken (tracking check nodig)
⚠️ SEO duplicate content risk (bij te veel vergelijkbare posts)

**Mitigatie:**
1. Marvin blijft overseer (approve/reject)
2. Quarterly screenshot refresh (n8n scheduled job)
3. Monthly affiliate link health check
4. Google Search Console monitoring (duplicate content alerts)

---

## 8. Roadmap

### Phase 1: MVP (Week 1-2)
- [ ] Google Sheets setup met kolommen
- [ ] n8n workflow: Sheets → Draft creation (zonder screenshots)
- [ ] Test met 5 platforms manually
- [ ] Validate content quality

### Phase 2: Playwright Integration (Week 3)
- [ ] Add Playwright screenshot nodes
- [ ] Upload screenshots to admin `/public/images/`
- [ ] Embed screenshots in markdown content
- [ ] Test end-to-end flow

### Phase 3: Optimization (Week 4)
- [ ] Add error handling (retry logic)
- [ ] Implement screenshot caching
- [ ] Add Gmail notifications
- [ ] Google Sheets status updates

### Phase 4: Scale (Month 2)
- [ ] Batch processing (10 posts at once)
- [ ] SEO optimization (keyword research integration)
- [ ] A/B testing affiliate link placements
- [ ] Analytics dashboard (which posts convert best?)

---

## 9. Alternative: Semi-Automated Approach

Als volledige automatisering te complex is:

### Option A: AI-Assisted Manual
1. Marvin vult Google Sheet in
2. n8n genereert content draft in Google Docs
3. Marvin reviewed + editeert in Google Docs
4. Marvin maakt screenshots zelf (Playwright aside)
5. Marvin copy-paste naar Admin Dashboard
6. Publish

**Time saving:** ~50% (vs. volledig manual)

### Option B: Template-Based
1. Marvin vult template in Admin Dashboard
2. RichTextEditor heeft "Generate with AI" button
3. Claude API vult sections in (inline generation)
4. Marvin editeert direct in admin
5. Playwright screenshot tool in sidebar (on-demand)

**Time saving:** ~60%

---

## 10. Conclusion & Recommendation

### ✅ Feasible
- Playwright screenshots: **100% mogelijk**
- AI content generation: **100% mogelijk**
- n8n orchestration: **100% mogelijk**
- Draft creation in admin: **100% mogelijk**

### ⚠️ Challenges
- Content quality control (AI hallucinations)
- Screenshot freshness (platform changes)
- SEO duplicate risk (te veel similar posts)

### 🎯 Aanbeveling
**Start met Phase 1-2 (MVP + Playwright)**
- Valideer of Adam Enfroy style werkt voor jouw niche
- Test met 20-30 posts
- Meet conversions (welke posts converteren?)
- Scale als ROI positief is

**Focus verdeling:**
- 70% automated posts (volume, SEO, quick wins)
- 30% in-depth guides (authority, trust, conversions)

**Verwachting:**
- Time saving: 80-90% op content productie
- Marvin kan 5-10x meer affiliate partners onboarden
- In-depth guides blijven quality differentiator

---

## Next Steps

1. **Besluit:** Wil je MVP bouwen? (Google Sheets + n8n + Claude)
2. **Setup n8n:** Self-hosted of cloud? (self-hosted = $0, cloud = $20/maand)
3. **Playwright MCP:** Testen of screenshots werken voor top 5 platforms
4. **Pilot:** 10 posts genereren, Marvin reviewed, meet conversions

Wil je dat ik begin met de n8n workflow setup?
