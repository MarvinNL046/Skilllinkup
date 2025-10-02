# Netlify Setup Guide voor SkillLinkup

## Vereiste Environment Variables

Ga naar: **Netlify Dashboard → Site Settings → Environment Variables**

### 1. Database URL (Automatisch via Neon Integration)

Als je de Neon database via Netlify dashboard hebt toegevoegd, wordt deze automatisch ingesteld:
- `NETLIFY_DATABASE_URL` - Automatisch aangemaakt door Netlify

**OF** voeg handmatig toe:
- `DATABASE_URL` - Je Neon PostgreSQL connection string

### 2. Site URL (Vereist voor Sitemap)

```
NEXT_PUBLIC_SITE_URL=https://skilllinkup.com
```

## Stappen om Neon Database te Koppelen

### Optie A: Via Netlify Dashboard (Aanbevolen)

1. Ga naar je site in Netlify Dashboard
2. Klik op **Integrations** → **Add Integration**
3. Zoek naar **Neon** en installeer
4. Autoriseer Netlify toegang tot je Neon account
5. Selecteer je bestaande database of maak een nieuwe aan
6. Netlify configureert automatisch `NETLIFY_DATABASE_URL`

### Optie B: Handmatige Configuratie

Als je al een Neon database hebt:

1. Ga naar [console.neon.tech](https://console.neon.tech)
2. Kopieer je connection string
3. Voeg toe aan Netlify Environment Variables:
   ```
   DATABASE_URL=postgresql://user:password@host/database?sslmode=require
   ```

## Database Migraties Uitvoeren

Na het koppelen van de database, moet je de tabellen aanmaken:

1. Clone de repository lokaal
2. Installeer dependencies: `npm install`
3. Voeg `.env.local` toe met je DATABASE_URL
4. Run migrations: `node scripts/migrate.js`
5. Seed initial data: `node scripts/seed.js`

## Troubleshooting

### Error 500 op Homepage

**Mogelijke oorzaken:**

1. **DATABASE_URL niet ingesteld**
   - Controleer Environment Variables in Netlify Dashboard
   - Zorg dat `NETLIFY_DATABASE_URL` of `DATABASE_URL` bestaat

2. **Database tabellen bestaan niet**
   - Run `node scripts/migrate.js` om tabellen aan te maken
   - Run `node scripts/seed.js` om initial data toe te voegen

3. **Verkeerde connection string**
   - Check of connection string eindigt met `?sslmode=require`
   - Controleer username, password en hostname

### Logs Bekijken

In Netlify Dashboard:
1. Ga naar **Deploys** → Selecteer laatste deployment
2. Klik op **Deploy log** voor build logs
3. Klik op **Function log** voor runtime errors

Of via CLI:
```bash
netlify logs:function --name page
```

## Deploy Checklist

- [ ] Neon database gekoppeld (via Integration of handmatig)
- [ ] `NETLIFY_DATABASE_URL` of `DATABASE_URL` ingesteld
- [ ] `NEXT_PUBLIC_SITE_URL` ingesteld
- [ ] Database migraties uitgevoerd
- [ ] Initial data geseeded
- [ ] Test deployment succesvol
- [ ] Homepage laadt zonder errors
- [ ] Sitemap toegankelijk op `/sitemap.xml`

## Handige Commands

```bash
# Check Netlify status
netlify status

# View environment variables
netlify env:list

# Trigger new deployment
git push origin main

# View site
netlify open:site
```

## Support

Als je errors blijft zien:
1. Check Netlify Function logs
2. Verifieer database connection string
3. Test database queries in Neon console
4. Check of alle environment variables zijn ingesteld
