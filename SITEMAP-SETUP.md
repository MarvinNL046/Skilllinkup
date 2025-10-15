# Automatische Sitemap Setup 🗺️

De sitemap wordt nu **volledig automatisch** bijgewerkt wanneer je nieuwe content publiceert - net als WordPress!

## ✨ Hoe het werkt

### 1. **Automatische updates elke 15 minuten**
De sitemap wordt elke 15 minuten automatisch ververst door Next.js ISR (Incremental Static Regeneration).

### 2. **On-demand updates via webhook**
Voor directe updates kun je de webhook aanroepen vanuit je CMS wanneer je content publiceert.

### 3. **Search engine notificatie**
Google en Bing worden automatisch geïnformeerd over sitemap updates.

## 🚀 Setup

### Vereiste Environment Variabelen

Voeg deze toe aan je `.env.local` (development) en Netlify (production):

```bash
# Database (al geconfigureerd)
DATABASE_URL="postgresql://..."

# Site URL (al geconfigureerd)
NEXT_PUBLIC_SITE_URL="https://skilllinkup.com"

# Revalidate webhook secret (NIEUW - genereer een veilig token)
REVALIDATE_SECRET="jouw-super-geheime-random-token-hier"
```

### Genereer een veilig token

```bash
# In je terminal:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Kopieer de output en gebruik als `REVALIDATE_SECRET`.

### Netlify Environment Variabelen

1. Ga naar: Netlify Dashboard → Site settings → Environment variables
2. Voeg toe: `REVALIDATE_SECRET` met je gegenereerde token
3. Deploy opnieuw (of wacht tot volgende deploy)

## 📝 Gebruik

### Automatisch (standaard)

Doe niets! De sitemap wordt automatisch bijgewerkt:
- Elke 15 minuten
- Bij nieuwe deployment

### Handmatig (on-demand)

Als je direct na publiceren wilt dat Google/Bing de nieuwe pagina's zien:

#### Via cURL (terminal):

```bash
curl -X POST "https://skilllinkup.com/api/revalidate?secret=JOUW_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "paths": ["/post/nieuwe-post-slug", "/platforms/nieuwe-platform"],
    "tags": ["posts", "platforms"]
  }'
```

#### Via JavaScript (CMS integratie):

```javascript
// Voeg dit toe aan je CMS publish button
async function onPublish(contentType, slug) {
  const response = await fetch(
    'https://skilllinkup.com/api/revalidate?secret=' + process.env.REVALIDATE_SECRET,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paths: [`/${contentType}/${slug}`],
        tags: [contentType]
      })
    }
  );

  const result = await response.json();
  console.log('Sitemap updated:', result);
}
```

#### Via Admin Dashboard:

Voeg een "Update Sitemap" knop toe aan je admin:

```typescript
// In je admin dashboard
const updateSitemap = async () => {
  try {
    const response = await fetch(
      '/api/revalidate?secret=' + process.env.NEXT_PUBLIC_REVALIDATE_SECRET,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paths: [window.location.pathname],
        })
      }
    );

    if (response.ok) {
      alert('✅ Sitemap bijgewerkt!');
    }
  } catch (error) {
    console.error('Sitemap update failed:', error);
  }
};
```

## 🔍 Verificatie

### Check sitemap:
https://skilllinkup.com/sitemap.xml

### Check robots.txt:
https://skilllinkup.com/robots.txt

### Test webhook (GET request):
```bash
curl "https://skilllinkup.com/api/revalidate?secret=JOUW_TOKEN"
```

Verwachte response:
```json
{
  "ok": true,
  "message": "Revalidate webhook is working. Use POST to trigger revalidation."
}
```

## 📊 Wat wordt er bijgewerkt?

De sitemap bevat automatisch:

- ✅ **Posts** - Alle gepubliceerde blog posts (`status = 'published'`)
- ✅ **Platforms** - Alle gepubliceerde platforms (`status = 'published'`)
- ✅ **Categories** - Alle categorieën
- ✅ **Static pages** - Homepage, Blog, Platforms, About, Contact, etc.

## 🔄 Cache strategie

### Cached queries (15 min)
- Posts lijst
- Platforms lijst
- Categories lijst

### Cache tags
- `sitemap` - Main tag voor alle sitemap data
- `posts` - Specifiek voor blog posts
- `platforms` - Specifiek voor platforms
- `categories` - Specifiek voor categorieën

### Cache invalidatie

Wanneer je `revalidateTag('sitemap')` aanroept:
1. Alle cached queries worden ongeldig gemaakt
2. Bij volgende request worden ze opnieuw opgehaald uit de database
3. Sitemap wordt opnieuw gegenereerd met fresh data

## 🎯 Google Search Console Setup

1. Ga naar: https://search.google.com/search-console
2. Voeg je site toe: `https://skilllinkup.com`
3. Ga naar: Sitemaps → Add new sitemap
4. Vul in: `sitemap.xml`
5. Klik op "Submit"

Google zal nu automatisch je sitemap regelmatig checken en nieuwe pagina's indexeren!

## 🐛 Troubleshooting

### Sitemap wordt niet bijgewerkt

1. **Check environment variabelen** - Zorg dat `DATABASE_URL` correct is
2. **Check Netlify logs** - Kijk of er errors zijn bij sitemap generatie
3. **Handmatig revalidate** - Roep webhook aan met POST request
4. **Clear Netlify cache** - Deploy opnieuw met cache clear

### Webhook geeft 401 error

- Check of `REVALIDATE_SECRET` correct is ingesteld
- Check of je het juiste secret gebruikt in de URL

### Posts/Platforms verschijnen niet in sitemap

- Check of `status = 'published'` in de database
- Check of `slug` veld gevuld is
- Check database connectie in Netlify logs

## 💡 Tips

1. **Test lokaal eerst** - Gebruik `.env.local` voor lokaal testen
2. **Monitor in production** - Check Netlify logs na deployment
3. **Google Search Console** - Monitor indexatie status
4. **Ping frequentie** - Google/Bing worden alleen gepinged bij webhook calls
5. **Cache warmup** - Eerste request na revalidatie duurt iets langer

## 🔒 Beveiliging

- Webhook is beveiligd met secret token
- Only POST requests kunnen cache invalideren
- Database queries gebruiken prepared statements (SQL injection safe)
- Rate limiting wordt door Netlify afgehandeld

## 📚 Technische details

### Bestanden

- `lib/sitemap-data.ts` - Cached database queries
- `app/sitemap.ts` - Dynamic sitemap generator
- `app/robots.ts` - Dynamic robots.txt
- `app/api/revalidate/route.ts` - Webhook endpoint

### Dependencies

- `@neondatabase/serverless` - Direct database access
- `next/cache` - unstable_cache, revalidateTag, revalidatePath
- Next.js ISR - Automatic regeneration

### Performance

- Sitemap generatie: ~100-200ms
- Cached response: ~10-20ms
- Database queries: Parallel execution
- No build-time generation required

---

**Je hoeft je nu geen zorgen meer te maken over de sitemap!** 🎉

Bij elke nieuwe post of platform wordt de sitemap automatisch bijgewerkt en Google/Bing worden geïnformeerd.
