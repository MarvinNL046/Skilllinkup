# SEO Implementation Guide - SkillLinkup

## ✅ Geïmplementeerde SEO Features

### 1. **Meta Tags (Basis SEO)**
- ✅ Custom Meta Title (uit admin dashboard)
- ✅ Custom Meta Description (uit admin dashboard)
- ✅ Meta Keywords (uit tags)
- ✅ Author metadata
- ✅ Canonical URLs (duplicate content preventie)

### 2. **Open Graph Tags (Social Media)**
- ✅ Facebook sharing optimization
- ✅ LinkedIn sharing optimization
- ✅ WhatsApp sharing optimization
- ✅ Custom OG title, description, image
- ✅ Article metadata (published time, authors, tags)
- ✅ Locale setting (nl_NL)

### 3. **Twitter Cards**
- ✅ Twitter summary_large_image card
- ✅ Custom Twitter title, description, image
- ✅ Twitter creator/site tags (@SkillLinkup)

### 4. **Schema.org JSON-LD (Rich Results)**
- ✅ BlogPosting structured data
- ✅ Author information
- ✅ Publisher information (SkillLinkup)
- ✅ Article section (category)
- ✅ Word count
- ✅ Reading time (ISO 8601 format: PT5M)
- ✅ Published/Modified dates
- ✅ Keywords from tags

### 5. **Robots & Indexing**
- ✅ Draft posts zijn noindex/nofollow
- ✅ Published posts zijn index/follow
- ✅ Google-specific robot directives

### 6. **Semantic HTML**
- ✅ Proper heading hierarchy (h1 → h2 → h3)
- ✅ Article, header, nav, aside tags
- ✅ Breadcrumb navigation
- ✅ Time elements met datetime attributes
- ✅ Alt text voor alle afbeeldingen

## 🚀 Productie Setup

### Environment Variables
Verander in **Netlify** (of je hosting provider):

```bash
# In Netlify: Site settings → Environment variables
NEXT_PUBLIC_SITE_URL="https://skilllinkup.com"
```

**LET OP:** Geen trailing slash (/) aan het einde!

### Twitter Handle
Als je een Twitter account hebt, pas dit aan in `/app/post/[slug]/page.tsx`:

```typescript
twitter: {
  creator: '@JouwTwitterHandle',  // Vervang @SkillLinkup
  site: '@JouwTwitterHandle',     // Vervang @SkillLinkup
}
```

## 📝 Hoe gebruik je SEO in Admin Dashboard

### Per Blog Post:
1. **Meta Title** (max 60 tekens):
   - Voorbeeld: "Upwork vs Fiverr: Welk Platform is Beter in 2024?"
   - Tip: Zet belangrijkste keyword vooraan
   - Wordt gebruikt voor Google search results en social sharing

2. **Meta Description** (max 160 tekens):
   - Voorbeeld: "Vergelijk Upwork en Fiverr op kosten, bereik en kwaliteit. Ontdek welk freelance platform het beste bij jouw skills past."
   - Tip: Include call-to-action
   - Wordt gebruikt voor Google snippet en social sharing

3. **Samenvatting** (excerpt):
   - 1-2 zinnen die de post samenvatten
   - Wordt gebruikt als fallback als Meta Description leeg is

4. **Featured Image**:
   - Ideale afmetingen: 1200x630px (voor social media)
   - Maximaal 5MB
   - Ondersteunde formaten: JPG, PNG, WebP

5. **Tags**:
   - Voeg relevante keywords toe
   - Gescheiden door komma's: "freelance, upwork, tips"
   - Worden gebruikt voor meta keywords en schema.org

6. **Category**:
   - Kies relevante categorie
   - Wordt gebruikt in schema.org articleSection

## 🔍 SEO Testing Tools

### Testen vóór publicatie:
1. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Test je Schema.org markup

2. **Facebook Sharing Debugger**
   - URL: https://developers.facebook.com/tools/debug/
   - Test Open Graph tags

3. **Twitter Card Validator**
   - URL: https://cards-dev.twitter.com/validator
   - Test Twitter Cards

4. **LinkedIn Post Inspector**
   - URL: https://www.linkedin.com/post-inspector/
   - Test LinkedIn sharing

5. **Screaming Frog SEO Spider** (gratis tot 500 URLs)
   - Desktop tool voor crawling
   - Check broken links, duplicate content, etc.

## 📊 SEO Checklist per Post

### Vóór publicatie:
- [ ] Meta title ingevuld (50-60 tekens)
- [ ] Meta description ingevuld (150-160 tekens)
- [ ] Featured image toegevoegd (1200x630px)
- [ ] Alt text voor alle inline afbeeldingen
- [ ] Minstens 3-5 relevante tags
- [ ] Juiste categorie geselecteerd
- [ ] Internal links naar andere posts
- [ ] Headings correct gebruikt (h2, h3, etc.)
- [ ] Post is minimaal 300 woorden

### Na publicatie:
- [ ] Test met Google Rich Results
- [ ] Test social sharing (Facebook, Twitter, LinkedIn)
- [ ] Submit sitemap naar Google Search Console
- [ ] Monitor in Google Analytics

## 🎯 SEO Best Practices

### Content Optimalisatie:
1. **Keyword Research**:
   - Gebruik tools zoals Ubersuggest, AnswerThePublic
   - Focus op long-tail keywords (3-4 woorden)
   - Check search volume en concurrentie

2. **Content Structuur**:
   - Duidelijke h2/h3 headings met keywords
   - Korte paragrafen (3-4 zinnen max)
   - Bullet points voor leesbaarheid
   - Internal links naar gerelateerde posts

3. **Afbeeldingen**:
   - Compress afbeeldingen (TinyPNG, Squoosh)
   - Beschrijvende bestandsnamen: `upwork-vs-fiverr-vergelijking.jpg`
   - Alt text met keywords (natuurlijk)

4. **URL Slug**:
   - Kort en beschrijvend
   - Gebruik streepjes: `upwork-vs-fiverr-2024`
   - Geen stopwoorden: `de`, `het`, `en`, etc.

### Technical SEO (al geïmplementeerd):
- ✅ Mobile-friendly (responsive design)
- ✅ Fast loading (Next.js Image optimization)
- ✅ SSL certificate (HTTPS)
- ✅ Structured data (Schema.org)
- ✅ Canonical URLs
- ✅ Semantic HTML

## 📈 Google Search Console Setup

### Na deployment:
1. Ga naar: https://search.google.com/search-console
2. Voeg je website toe: `https://skilllinkup.com`
3. Verify ownership (via meta tag of DNS)
4. Submit sitemap: `https://skilllinkup.com/sitemap.xml`
5. Monitor search performance

### Belangrijke metrics:
- **Impressions**: Hoe vaak je URL's verschijnen in search
- **Clicks**: Hoeveel mensen daadwerkelijk klikken
- **CTR** (Click-Through Rate): Clicks / Impressions
- **Average Position**: Gemiddelde ranking in Google

## 🎨 Social Media Sharing Voorbeelden

### Hoe het eruitziet:

**Facebook/LinkedIn:**
```
[Featured Image: 1200x630px]
Meta Title (60 tekens)
Meta Description (160 tekens)
skilllinkup.com
```

**Twitter:**
```
[Featured Image: 1200x630px]
Meta Title (60 tekens)
Meta Description (160 tekens)
```

**WhatsApp:**
```
Meta Title
Meta Description
[Thumbnail]
skilllinkup.com
```

## 🔧 Troubleshooting

### Social sharing image niet zichtbaar?
1. Check of NEXT_PUBLIC_SITE_URL correct is ingesteld
2. Test met Facebook Debugger (zie boven)
3. "Scrape Again" in Facebook Debugger
4. Check of afbeelding minimaal 200x200px is

### Google Rich Results niet werkend?
1. Test met Google Rich Results Test
2. Check of datePublished valid ISO 8601 format is
3. Ensure all required Schema.org fields zijn ingevuld

### Meta title/description niet gebruikt?
1. Check of je de velden in admin dashboard hebt ingevuld
2. Refresh de pagina en inspect de <head> tags
2. Clear Netlify cache en redeploy

## 📚 Extra Resources

- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Schema.org BlogPosting Documentation](https://schema.org/BlogPosting)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Moz SEO Learning Center](https://moz.com/learn/seo)
- [Ahrefs Blog](https://ahrefs.com/blog/)

---

**Gemaakt voor SkillLinkup** | Laatste update: 2025-01-04
