# Adam Enfroy Blog Post Analyse
**URL:** https://www.adamenfroy.com/best-high-paying-affiliate-programs
**Performance:** $500K+ in affiliate sales
**Datum analyse:** 15 oktober 2025

---

## 📊 Statistieken

### Pagina Metrics
- **Totaal aantal images:** 438
- **Totaal aantal affiliate links:** 361 (rel="nofollow")
- **Totaal aantal programma's:** 74 (H3 headings)
- **Hoofd categorieën:** 7 (H2 headings)

### Categorieën Structuur
1. **Online Services** (~15 programma's)
2. **Fashion Affiliate Programs** (~12 programma's)
3. **Fishing Affiliate Programs**
4. **Fitness Affiliate Programs**
5. **Travel Affiliate Programs**
6. **Music Affiliate Programs**
7. **Cooking Affiliate Programs**

### Berekening
- **Gemiddeld 5.9 images per programma** (438 ÷ 74)
- **Gemiddeld 4.9 affiliate links per programma** (361 ÷ 74)
- **~10 programma's per categorie**

---

## 🏗️ HTML Structuur Analyse

### ⚠️ WordPress vs Next.js/Tailwind

**Adam Enfroy:** WordPress + Gutenberg blocks + ThirstyAffiliates
**SkillLinkup:** Next.js 15 + Tailwind CSS + TipTap RichTextEditor

**Verschillen:**
- Adam output: HTML met WordPress classes (`wp-block-heading`, `wp-image-xxx`)
- SkillLinkup output: **MARKDOWN** → TipTap converteert naar Tailwind HTML
- Adam gebruikt: ThirstyAffiliates plugin voor link tracking
- SkillLinkup gebruikt: **short.io** (go.skilllinkup.com)
- Adam styling: WordPress theme CSS
- SkillLinkup styling: **Tailwind utility classes** (automatisch via TipTap)

**Waarom Markdown?**
- RichTextEditor (TipTap) accepteert Markdown input
- Automatische conversie naar Tailwind-styled HTML
- Jouw design system blijft consistent
- Geen hardcoded WordPress classes

### Page Template (WordPress - Ter referentie)
```html
<article class="post">
  <!-- Table of Contents (TOC) -->
  <div class="ez-toc-container">
    <!-- Auto-generated jump links -->
  </div>

  <!-- Main Content -->
  <div class="entry-content">

    <!-- Intro Section -->
    <p>Introductie tekst...</p>

    <!-- Category Section (H2) -->
    <h2 class="wp-block-heading" id="h-online-services">
      <span class="ez-toc-section" id="online-services"></span>
      Online Services
      <span class="ez-toc-section-end"></span>
    </h2>

    <!-- Program Listing (H3) -->
    <h3 class="wp-block-heading" id="h-1-learnworlds">
      1. LearnWorlds
    </h3>

    <!-- Program Screenshot -->
    <figure class="wp-block-image size-large">
      <img
        width="1024"
        height="479"
        src="image-31-1024x479.png"
        alt="LearnWorlds"
        class="wp-image-1228769 lazyload"
        srcset="...responsive sizes..."
      >
    </figure>

    <!-- Program Description -->
    <p>
      <a
        class="thirstylink"
        rel="nofollow"
        target="_blank"
        href="affiliate-link"
      >
        LearnWorlds
      </a>
      is a comprehensive platform...
    </p>

    <!-- Commission Details -->
    <p>They offer up to 30% recurring commission...</p>
    <p>On average, affiliates are pulling in about $1,076 per year...</p>

    <!-- Cookie Duration -->
    <p>They've also got these 90-day cookies...</p>

    <!-- Support/Benefits -->
    <p>LearnWorlds also hook you up with your own account manager...</p>

    <!-- Next Program -->
    <h3 class="wp-block-heading" id="h-2-thinkific">
      2. Thinkific
    </h3>
    ...
  </div>
</article>
```

---

## 📝 Content Pattern Per Program

### 1. Program Title (H3)
```html
<h3 class="wp-block-heading" id="h-1-learnworlds">
  1. LearnWorlds
</h3>
```
**Pattern:** Nummer + Programma naam

---

### 2. Screenshot (Figure)
```html
<figure class="wp-block-image size-large">
  <img
    width="1024"
    height="479"
    src="image-url"
    alt="Program Name"
    class="wp-image-xxx lazyload"
  >
</figure>
```

**Key Details:**
- **Lazy loading** enabled (lazyload class)
- **Responsive srcset** voor verschillende schermgroottes
- **Alt text** = Program naam
- **Aspect ratio:** ~2:1 (1024x479)
- **Type screenshot:** Homepage of product screenshot

---

### 3. Program Description (1-2 zinnen)
```html
<p>
  <a class="thirstylink" rel="nofollow" target="_blank" href="affiliate-link">
    LearnWorlds
  </a>
  is a comprehensive platform that empowers entrepreneurs...
</p>
```

**Pattern:**
- Eerste zin bevat **inline affiliate link** (thirstylink plugin)
- `rel="nofollow"` voor SEO
- `target="_blank"` opens in nieuwe tab
- **Korte definitie** wat het platform doet

---

### 4. Commission Structure (2-3 paragrafen)
```html
<p>LearnWorlds doesn't mess around with their commission structure.</p>

<p>They offer up to <strong>30% recurring commission for life</strong> when you're part of the Partners Club.</p>

<p>On average, affiliates are pulling in about <strong>$1,076 per year</strong> for every customer they refer.</p>
```

**Pattern:**
- **Conversational tone** ("doesn't mess around", "Yeah, you heard that right")
- **Bold** op belangrijke cijfers (30%, $1,076)
- **Specifieke getallen** (niet "hoge commissie" maar "30%")
- **Lifetime value** benadrukken

---

### 5. Cookie Duration
```html
<p>They've also got these <strong>90-day cookies</strong>.</p>

<p>This means even if someone clicks your link and doesn't sign up right away, you've still got a good chance of getting credit when they do.</p>
```

**Pattern:**
- **Highlight cookie lengte** (belangrijk voor conversie)
- **Leg uit waarom dit belangrijk is** (educatief)

---

### 6. Extra Benefits
```html
<p>LearnWorlds also hook you up with your very own <strong>account manager</strong>.</p>

<p>Need help growing your affiliate business? Got a question?</p>

<p>They've got your back.</p>
```

**Pattern:**
- **Unique selling points** (account manager, support)
- **Rhetorical questions** om engagement te verhogen
- **Conversational afsluiting** ("They've got your back")

---

## 🎨 Visual Design Patterns

### Screenshot Types (gebaseerd op analyse)
1. **Homepage screenshots** (meest voorkomend)
   - Full width product homepage
   - Clean, professional look
   - Logo zichtbaar
   - Aspect ratio: ~2:1

2. **Pricing page screenshots**
   - Pricing tiers zichtbaar
   - Comparison tables

3. **Dashboard screenshots**
   - Product interface
   - Feature highlights

### Image Optimization
- **Lazy loading** (data-src attribute)
- **Responsive srcset** (300w, 768w, 1024w)
- **WebP format** (modern browsers)
- **CDN delivery** (wp-content/uploads)

---

## 📊 Content Formula (Adam Enfroy Style)

### Per Program Template (200-300 woorden)

```markdown
### [Number]. [Program Name]

![Program Screenshot](image-url)

**What it is (1-2 sentences):**
[Program Name](affiliate-link) is a [type of platform] that helps [target audience] to [main benefit].

**Why it's great (conversational tone):**
[Program Name] doesn't mess around with their [key feature].

**Commission details:**
They offer [X%] commission / [$X per sale] / [recurring payment structure].

On average, affiliates earn about [$X per year/month] per customer.

**Cookie duration:**
They've got [X-day] cookies, which means [explain benefit].

**Extra perks:**
- [Unique benefit 1] (e.g., account manager)
- [Unique benefit 2] (e.g., marketing materials)
- [Unique benefit 3] (e.g., high conversion rate)

**My take:**
[Personal opinion in 1-2 sentences with conversational tone]

[Affiliate CTA button]
```

---

## 🔧 Technical Implementation voor SkillLinkup

### Database Schema Updates
```sql
-- Add fields to platforms table
ALTER TABLE platforms ADD COLUMN cookie_duration INT; -- in days
ALTER TABLE platforms ADD COLUMN avg_affiliate_earnings DECIMAL(10,2);
ALTER TABLE platforms ADD COLUMN commission_type VARCHAR(50); -- 'percentage', 'fixed', 'recurring'
ALTER TABLE platforms ADD COLUMN commission_value VARCHAR(100); -- '30%', '$150', '20% recurring'
ALTER TABLE platforms ADD COLUMN unique_benefits TEXT[]; -- Array of benefits
```

### Google Sheets Input Columns
```
| affiliate_link | program_name | description | commission_type | commission_value | cookie_duration | avg_earnings | unique_benefits | category |
|----------------|--------------|-------------|-----------------|------------------|-----------------|--------------|-----------------|----------|
| go.skilllinkup.com/upwork | Upwork | Freelance platform for developers | fixed | $150 per signup | 90 | $1200/year | Account manager, Marketing materials | Freelance Platforms |
```

---

## 🤖 Automated Content Generation Prompt

### Claude API Prompt Template (Voor SkillLinkup - Next.js/Tailwind)

**BELANGRIJK:** Adam gebruikt WordPress, maar SkillLinkup is Next.js + Tailwind. Daarom outputten we **MARKDOWN** in plaats van HTML.

```
Write a blog post section for {program_name} in Adam Enfroy's conversational style.

Input data:
- Program: {program_name}
- Description: {description}
- Commission: {commission_value} ({commission_type})
- Cookie Duration: {cookie_duration} days
- Avg Earnings: {avg_earnings}
- Unique Benefits: {unique_benefits}
- Affiliate Link: {affiliate_link} (gebruik go.skilllinkup.com short link)

Style requirements:
1. Conversational tone (use "they've got", "doesn't mess around")
2. Short paragraphs (2-3 sentences max)
3. **Bold** important numbers and features (markdown syntax)
4. Include rhetorical questions for engagement
5. Personal touch ("Yeah, you heard that right")
6. Length: 200-300 words
7. Write in ENGLISH (SkillLinkup is an English-language site)

Structure:
1. Opening: Inline affiliate link + 1-sentence description
2. Commission: Highlight the money (be specific)
3. Earnings: Include average affiliate earnings
4. Cookies: Explain cookie duration benefit
5. Perks: List 2-3 unique benefits
6. Closing: Personal take (1-2 sentences)

Output format: MARKDOWN (for Next.js RichTextEditor)
- Use ### for heading
- Use **bold** for emphasis
- Use [text](url) for links (with rel="nofollow" target="_blank")
- Add image reference: ![{program_name}](/images/platforms/{slug}/{slug}-homepage.png)
- Output will be pasted into TipTap editor which converts to Tailwind-styled HTML

Example output:
```markdown
### 1. Upwork

![Upwork Homepage](/images/platforms/upwork/upwork-homepage.png)

[Upwork](https://go.skilllinkup.com/upwork) is a freelance platform that connects businesses with talented developers and designers.

Upwork doesn't mess around with their affiliate program.

They offer **$150 per signup** when someone you refer creates an account and makes their first hire.

On average, affiliates earn about **$1,200 per year** per customer referred.

They've got **90-day cookies**, which means even if someone clicks your link today and signs up next month, you still get credit.

Plus, Upwork provides dedicated affiliate support and marketing materials to help you succeed.

If you're targeting freelancers or businesses looking for talent, this is a no-brainer.
```
```

---

## 📸 Screenshot Automation met Playwright

### Playwright Script voor Screenshots
```javascript
// n8n Code Node

const { chromium } = require('playwright');

async function captureProductScreenshot(url, programName) {
  const browser = await chromium.launch({
    headless: true,
    viewport: { width: 1920, height: 1080 }
  });

  const page = await browser.newPage();

  // Ga naar homepage
  await page.goto(url, { waitUntil: 'networkidle' });

  // Wacht op images
  await page.waitForTimeout(2000);

  // Verberg cookie banners (common patterns)
  await page.evaluate(() => {
    const selectors = [
      '#cookie-banner',
      '.cookie-notice',
      '[class*="cookie"]',
      '[id*="gdpr"]'
    ];

    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => el.remove());
    });
  });

  // Screenshot above the fold (Adam Enfroy style)
  const screenshot = await page.screenshot({
    type: 'png',
    fullPage: false, // Only above the fold
    clip: {
      x: 0,
      y: 0,
      width: 1920,
      height: 900 // Aspect ratio ~2:1
    }
  });

  await browser.close();

  return screenshot;
}

// Usage in n8n workflow
const baseUrl = $json.base_url; // From short.io API
const programName = $json.program_name;

const screenshot = await captureProductScreenshot(baseUrl, programName);

// Upload to admin
const formData = new FormData();
formData.append('image', screenshot, `${programName}-homepage.png`);

return { screenshot, filename: `${programName}-homepage.png` };
```

---

## 💡 Key Takeaways voor SkillLinkup

### 1. Volume Over Perfectie
- Adam heeft **74 programma's** in één post
- Elk programma slechts **200-300 woorden**
- Focus op **veel posts** met goede SEO coverage

### 2. Screenshot = Trust Signal
- **438 images** voor 74 programma's = ~6 per program
- Screenshots zijn **geen perfecte product tours**
- Simpele **homepage screenshot** is genoeg
- **Lazy loading** voor performance

### 3. Conversational Tone
- Geen corporate taal
- Gebruik contracties ("they've", "doesn't")
- Rhetorical questions
- Personal touch ("Yeah, you heard that right")

### 4. Data-Driven Content
- **Specifieke cijfers** (30%, $1,076, 90 dagen)
- **Gemiddelde earnings** (important voor conversie)
- **Cookie duration** (technical detail maar belangrijk)

### 5. Inline Affiliate Links
- Eerste vermelding = affiliate link
- **rel="nofollow"** voor SEO
- **target="_blank"** voor gebruikerservaring
- ThirstyAffiliates plugin voor link management

---

## 🚀 Implementation Roadmap

### Phase 1: Content Template
- [ ] Update database schema (commissie fields)
- [ ] Create Claude prompt template
- [ ] Test met 5 platforms manual
- [ ] Validate tone & structure

### Phase 2: Screenshot Automation
- [ ] Setup Playwright in n8n
- [ ] Test screenshot quality
- [ ] Implement cookie banner removal
- [ ] Add image upload to admin

### Phase 3: Full Workflow
- [ ] Google Sheets → n8n trigger
- [ ] short.io API voor base URL
- [ ] Screenshot capture
- [ ] Content generation
- [ ] Draft creation in admin
- [ ] Notification email

### Phase 4: Quality Control
- [ ] Marvin review process
- [ ] A/B testing CTA placements
- [ ] Analytics tracking (conversions)
- [ ] Quarterly screenshot refresh

---

## 📋 Checklist: Adam Enfroy Style Post

Voor elk programma review:

**Content:**
- [ ] H3 heading met nummer + naam
- [ ] 1 screenshot (homepage of product)
- [ ] Inline affiliate link in eerste zin
- [ ] 1-2 zinnen product beschrijving
- [ ] Specifieke commissie details (%, $, recurring)
- [ ] Gemiddelde affiliate earnings vermeld
- [ ] Cookie duration + waarom dat belangrijk is
- [ ] 2-3 unique benefits/perks
- [ ] Conversational tone (geen corporate taal)
- [ ] Bold op belangrijke cijfers

**Technical:**
- [ ] rel="nofollow" op affiliate links
- [ ] target="_blank" voor externe links
- [ ] Lazy loading op images
- [ ] Responsive srcset voor images
- [ ] Alt text = program naam
- [ ] ID anchors voor jump links (optional)

**SEO:**
- [ ] H3 met keyword (program naam)
- [ ] Natural keyword usage in tekst
- [ ] Image alt tags
- [ ] Internal links naar related posts (optional)

---

## 🎯 Success Metrics

**Adam Enfroy benchmark:**
- **$500K+ affiliate sales**
- **74 programs** in één mega-post
- **438 screenshots** (6 per program gemiddeld)
- **361 affiliate links**

**SkillLinkup target (conservatief):**
- Start met **20-30 programs** per post
- Genereer **5-10 posts/week** automated
- Marvin doet **2-4 in-depth guides/maand** manual
- Target: **$1K-$5K/maand** affiliate revenue binnen 6 maanden

---

## 📖 Conclusion

Adam Enfroy's succes komt door:
1. **Volume** (74 programs = veel SEO coverage)
2. **Eenvoud** (korte reviews, 1 screenshot)
3. **Data** (specifieke cijfers, earnings, cookies)
4. **Tone** (conversational, personal, vertrouwd)
5. **Technical SEO** (lazy loading, nofollow, responsive)

**Voor SkillLinkup:**
- **Automatisering is 100% mogelijk**
- Playwright kan screenshots maken
- Claude kan Adam's style nabootsen
- Google Sheets + n8n = perfect workflow
- Marvin blijft overseer voor kwaliteit

**Next Step:** Start MVP met 10 platforms manual om template te valideren, dan schalen naar full automation.
