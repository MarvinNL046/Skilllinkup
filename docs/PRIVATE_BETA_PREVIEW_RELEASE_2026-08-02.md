# Skilllinkup private-beta Preview release record

## Candidate

- Target: Preview, branch-scoped to `agent/private-beta-foundation`
- Commit SHA: `1e7918851d6a458eb4894dcb50411bd55495179a`
- Deployment: `dpl_7zPMbERgWe9WN2AZh7W3d3L5KLNr`
- URL: `https://skilllinkup-docpt4j2a-marvinnl046s-projects.vercel.app`
- Stable branch alias: `https://skilllinkup-git-agent-private-beta-260037-marvinnl046s-projects.vercel.app`
- Vercel project/team: `prj_1my2oAYphsi3R5SUcL2KB3ca7iJb` / `team_7Vpqlkzfz83Hrfz4GuMw6YTt`
- Convex deployment: `dev:accurate-anaconda-993`
- Clerk instance mode: development
- Started by: repository owner through the GitHub integration
- Started at: 2026-08-02 16:30:47 UTC
- Last-known-good production deployment: `dpl_ESHSSYEhU8NSUsH29qCVTaFYAenC` (unchanged by this candidate)

## Automated evidence

- Dependency/build baseline: clean private-beta foundation commit `c954e33d7602b6c7b5264a70a4e16f206e5100d0`; the candidate changes only the hosted verifier.
- Environment contract: `/api/health` returned HTTP 200 through the hosted verifier with Convex, Clerk and the Preview environment contract healthy.
- `npm run lint`: passed on the foundation candidate with zero warnings.
- `npx tsc --noEmit`: passed on the foundation candidate.
- `npx convex dev --once`: passed against `accurate-anaconda-993` on 2 August 2026.
- `npm run build`: passed on the foundation candidate with 71 routes; Vercel rebuilt candidate `1e79188` successfully in 55 seconds.
- `npm run release:verify-hosted -- --base-url=https://skilllinkup-docpt4j2a-marvinnl046s-projects.vercel.app`: passed on 2 August 2026. Public routes, health, payment quarantine and internal-secret boundaries passed.
- Authenticated acceptance: latest unchanged-backend evidence is the 37-scenario Clerk/Convex run on 2 August 2026. The verifier-only commit does not modify application or backend behavior.
- Vercel build error scan: zero errors; build completed successfully.
- Vercel runtime scan: zero error groups for this deployment. One earlier error belonged to superseded deployment `dpl_36sC3DNiCfA4kkR4MRRUZ8EdhqaS` before Preview secrets were configured.
- Runtime status distribution for the verifier run: HTTP 200 for public/health checks; the observed HTTP 401 and 503 responses are the expected forged-secret rejection and `PRIVATE_BETA_FREE` payment quarantine.
- Convex evidence: deployment validation and 37-scenario acceptance passed; no new Convex code or data was introduced by this candidate.

## Human gates

- Product scope/cohort owner: repository owner; explicit cohort approval still required.
- Release/rollback owner: repository owner; named operational backup still required.
- Support and safety owner: not assigned — launch blocker for invitations.
- Privacy/legal owner: not assigned — launch blocker for invitations.
- Payment quarantine: confirmed technically and intentionally retained.
- Go/no-go decision: no-go for invitations until the named human gates, legal review and initial supply verification are complete.
- Decision timestamp: 2026-08-02 UTC.

## Rollback

- Production was not changed; no production rollback was required.
- Preview rollback target: deployment `dpl_36sC3DNiCfA4kkR4MRRUZ8EdhqaS` at commit `c954e33d7602b6c7b5264a70a4e16f206e5100d0`.
- Schema compatibility: candidate contains no schema changes relative to its immediately preceding Preview.
- Follow-up: repeat hosted verification on the exact artifact after any further commit and before promotion.
