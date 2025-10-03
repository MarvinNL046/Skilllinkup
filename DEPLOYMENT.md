# SkillLinkup Admin - Netlify Deployment Guide

## Deployment Architectuur

**Admin Dashboard**: Aparte deployment op **admin.skilllinkup.com** subdomain

### Waarom Subdomain?
- ✅ Volledig gescheiden beveiliging
- ✅ Onafhankelijke deployments
- ✅ Betere isolatie van admin functionaliteit
- ✅ Gedeelde Neon database met main app
- ✅ Stack Auth voor authenticatie

## Netlify Setup Stappen

### 1. Nieuw Netlify Site Aanmaken

```bash
# Push code naar GitHub (if not done)
cd /home/marvin/Documenten/skillLinkup-admin
git init
git add .
git commit -m "Initial admin dashboard setup"
git remote add origin https://github.com/MarvinNL046/skilllinkup-admin.git
git push -u origin main
```

### 2. Netlify Dashboard Configuratie

1. **Log in op Netlify**: https://app.netlify.com
2. **Add new site** → **Import from Git**
3. **Connect to GitHub** → Selecteer `skilllinkup-admin` repository
4. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Base directory: (leeg laten)

### 3. Environment Variables Instellen

Ga naar **Site settings** → **Environment variables** en voeg toe:

```bash
# Database (shared met main app)
DATABASE_URL=postgresql://[your-neon-connection-string]

# Stack Auth
NEXT_PUBLIC_STACK_PROJECT_ID=[your-stack-project-id]
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=[your-stack-key]
STACK_SECRET_SERVER_KEY=[your-stack-secret]

# Admin URLs
NEXT_PUBLIC_ADMIN_URL=https://admin.skilllinkup.com
NEXT_PUBLIC_MAIN_APP_URL=https://skilllinkup.com

# CORS
CORS_ALLOWED_ORIGINS=https://skilllinkup.com,https://www.skilllinkup.com
```

### 4. Custom Domain Setup

1. **Netlify Dashboard** → **Domain settings**
2. **Add custom domain** → `admin.skilllinkup.com`
3. **DNS Configuration** (bij je domain provider):
   ```
   Type: CNAME
   Name: admin
   Value: [your-netlify-subdomain].netlify.app
   ```
4. **SSL Certificate**: Netlify genereert automatisch via Let's Encrypt

### 5. Deploy

1. **Trigger deploy** → Netlify bouwt automatisch
2. **Wacht op green check** ✅
3. **Test**: https://admin.skilllinkup.com

## Shared Database Configuration

Beide apps gebruiken **dezelfde Neon PostgreSQL database**:

```typescript
// lib/db.ts (both apps)
import { neon } from '@neondatabase/serverless';

export const sql = neon(process.env.DATABASE_URL!);
```

**Voordelen**:
- Single source of truth
- Real-time synchronisatie
- Geen dubbele data
- Lagere kosten

## CORS Setup (als nodig)

Als de admin API's vanaf main app moet aanroepen:

```typescript
// middleware.ts in admin app
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin');
  const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',') || [];

  if (origin && allowedOrigins.includes(origin)) {
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
```

## Stack Auth Integration

**Admin heeft Stack Auth al geïnstalleerd** (`@stackframe/stack`):

1. **Create Stack Account**: https://stack-auth.com
2. **Create Project** → Copy credentials
3. **Setup in admin**:
   ```typescript
   // stack/client.ts
   import { StackClient } from "@stackframe/stack";

   export const stackClient = new StackClient({
     projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID!,
     publishableClientKey: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY!,
   });
   ```

4. **Protected Routes**:
   ```typescript
   // app/dashboard/page.tsx
   import { useUser } from '@stackframe/stack';

   export default function Dashboard() {
     const user = useUser({ or: 'redirect' });

     if (!user) return null;

     return <div>Admin Dashboard</div>;
   }
   ```

## Deployment Checklist

- [ ] GitHub repository aangemaakt voor admin
- [ ] Netlify site connected to repo
- [ ] Environment variables ingesteld
- [ ] Custom domain `admin.skilllinkup.com` toegevoegd
- [ ] DNS CNAME record geconfigureerd
- [ ] SSL certificaat actief
- [ ] Database connection getest
- [ ] Stack Auth geconfigureerd
- [ ] First deploy succesvol
- [ ] Admin login werkt

## Troubleshooting

### Build Errors
```bash
# Local build test
cd /home/marvin/Documenten/skillLinkup-admin
npm run build
```

### Database Connection
```bash
# Test connection
npm run db:studio
```

### Clear Netlify Cache
```bash
# Netlify Dashboard → Deploys
# "Trigger deploy" → "Clear cache and deploy site"
```

## Cost Considerations

- **Netlify**: Free tier (100GB bandwidth, 300 build minutes/maand)
- **Neon**: Shared database (geen extra kosten)
- **Stack Auth**: Free tier (tot 1000 users)

**Total extra cost for admin subdomain**: €0/maand (within free tiers)

## Next Steps

1. Deploy admin naar Netlify
2. Configure Stack Auth
3. Test login flow
4. Setup admin user roles
5. Configure CORS if needed
