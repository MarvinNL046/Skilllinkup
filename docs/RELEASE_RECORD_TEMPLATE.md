# Skilllinkup release record

Copy this file for every preview candidate and production promotion. A release is not approved while a required field is blank.

## Candidate

- Target: preview / production
- Commit SHA:
- Deployment ID and URL:
- Vercel project and team:
- Convex deployment:
- Clerk instance mode: development / live
- Started by:
- Started at (UTC):
- Last-known-good deployment:

## Automated evidence

- `npm ci`:
- `npm run env:verify -- --environment=<target>`:
- `npm run lint`:
- `npx tsc --noEmit`:
- `npm run build`:
- `npm run release:verify-hosted -- --base-url=<url>`:
- `/api/health` version, full commit SHA and immutable `*.vercel.app` deployment URL match this candidate:
- Authenticated 37-scenario acceptance run, or approved reason for using the latest unchanged backend evidence:
- Vercel runtime error scan:
- Convex error scan:

## Human gates

- Product scope/cohort owner:
- Release/rollback owner:
- Support and safety owner:
- Privacy/legal owner:
- Payment quarantine confirmed:
- Go / no-go decision:
- Decision timestamp (UTC):

## Rollback rehearsal or incident

- Rollback command/deployment promoted:
- Health verification after rollback:
- Anonymous and authenticated smoke result:
- Data/schema compatibility confirmed:
- Incident notes and follow-up owner:
