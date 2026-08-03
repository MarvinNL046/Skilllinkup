# Skilllinkup private-beta operations runbook

Last updated: 2 August 2026

Scope: free, invite-only beta for Online worldwide, Local in the launch region and Jobs for Dutch/remote-European roles.

Companion operating artifacts:

- `PRIVATE_BETA_KPI_CONTRACT.md` defines metrics, targets and stop conditions.
- `PRIVATE_BETA_COHORT_PLAN.md` defines the supply-first cohort and invitation waves.
- `BETA_OPERATIONS_LOG_TEMPLATE.md` is the required privacy-safe daily record.
- `SUPPORT_RESPONSE_TEMPLATES.md` contains approved draft language; replace every bracketed field and assign the ownership roster before use.
- `PRODUCTION_MONITORING_RUNBOOK.md` defines the scheduled synthetic monitor, notification rehearsal and production triage path.
- `PREVIEW_ROLLBACK_REHEARSAL_2026-08-02.md` records the artifact-specific engineering rollback and restoration proof.
- `/admin/trust` exposes the authenticated 30-day product-health snapshot and trust queues to administrators only.

## Ownership roster

Fill names and contact methods before invitations are sent. One person may hold multiple roles during the first cohort, but no role may remain unassigned.

| Responsibility             | Named owner | Backup | Response target                     |
| -------------------------- | ----------- | ------ | ----------------------------------- |
| Release and rollback       | MarvinNL046 | TBD    | 30 minutes                          |
| Production monitoring      | MarvinNL046 | TBD    | 30 minutes                          |
| Trust and urgent safety    | TBD         | TBD    | acknowledge within 1 hour           |
| Support and account access | TBD         | TBD    | one business day                    |
| Privacy/export/deletion    | TBD         | TBD    | acknowledge within one business day |
| Marketplace matching       | TBD         | TBD    | daily review                        |
| Legal/payment policy       | TBD         | TBD    | before any paid feature             |

## Daily opening checks

1. Verify `/api/health` returns HTTP 200 and `status: ok`, then match its version, full commit SHA and immutable Vercel deployment URL to the current release record.
2. Confirm the latest scheduled `Production monitor` run passed, then review deployment and Convex errors without copying personal data into incident notes.
3. Review open Trust & Safety reports, disputes and support tickets oldest-first.
4. Review unmatched Online projects, unclaimed Local requests and Jobs without candidate activity.
5. Check stalled accepted work: no message, delivery, appointment update or employer action within the agreed target.
6. Record counts and actions in the private-beta operations log.
7. Compare each product with the stop conditions in the KPI contract before sending new invitations.

## Incident levels

- **SEV-1:** data exposure, account takeover, unsafe Local situation, destructive cross-account mutation or payment activation. Disable the affected flow, preserve logs, notify the release and safety owners immediately.
- **SEV-2:** a complete product flow is unavailable, authentication loop, widespread Convex failure or lost uploads. Stop invitations, post an internal status update and prepare rollback.
- **SEV-3:** isolated functional defect, stale content, visual regression or delayed notification. Triage in the next daily review.

Never request passwords, Clerk session tokens, full payment details or identity documents through ordinary support messages.

## Rollback procedure

1. Stop new beta invitations and record the incident start time.
2. Confirm whether the failure is frontend deployment, Clerk, Convex or an external integration.
3. If a new deployment caused the issue, promote the recorded last-known-good deployment.
4. Do not roll back the Convex schema independently when newer data may already exist; deploy a forward-compatible repair.
5. Run anonymous route checks, confirm `/api/health` identifies the promoted or restored artifact, then run authentication and one workflow smoke before reopening.
6. Record cause, affected users, remediation and follow-up owner.

### Preview and promotion procedure

1. Authenticate the local CLI once with `npx vercel@50.5.0 login`, confirm the account with `npx vercel@50.5.0 whoami`, then link only the Skilllinkup project.
2. Keep Preview on isolated Clerk development and Convex development deployments. Production must use Clerk live keys and a Convex `prod:` deployment. Never point Preview at production data.
3. Configure the variables documented in `.env.example` with Vercel environment scoping. The complete Preview contract must exist at the general Preview scope so every release branch inherits it; branch-specific values may override it but must never be the only copy. Store server secrets as sensitive values; never place them in `NEXT_PUBLIC_*` variables.
4. Run `npm run env:verify -- --environment=preview` before building. The check must fail if URLs, key modes, backend modes or server secrets are inconsistent.
5. Deploy a Preview candidate, record its URL and deployment ID in a copy of `docs/RELEASE_RECORD_TEMPLATE.md`, then run `npm run release:verify-hosted -- --base-url=<preview-url>`.
6. Run authenticated acceptance against the isolated Preview identities. Do not seed production.
7. Promote the exact verified artifact; do not rebuild a different artifact for production. Re-run environment validation and the hosted verifier against the production alias.
8. Inspect Vercel runtime errors and Convex logs, record the last-known-good deployment, and only then invite or re-enable the cohort.

### Rollback commands

- Inspect candidates with `npx vercel@50.5.0 ls` and `npx vercel@50.5.0 inspect <deployment-url>`.
- Promote a verified candidate with `npx vercel@50.5.0 promote <deployment-url>`.
- Roll back the production alias with `npx vercel@50.5.0 rollback <last-known-good-deployment>`.
- After any promotion or rollback, run the hosted verifier plus one signed-in workspace smoke before reopening traffic.
- The engineering Preview rehearsal is proven, but a named release owner and backup must still observe or repeat it and approve the production rollback policy before Wave 0.

## Trust, support and privacy queues

- Reports and disputes require an audit event for every admin state change.
- Urgent physical-safety issues take precedence over ordinary marketplace disputes.
- Exports may only be generated for the authenticated account.
- Deletion requests remain pending until legal-retention review and Clerk deletion are both confirmed.
- Do not promise refunds or protected funds during the free beta; Skilllinkup does not process payments.

## Payment kill switch

Checkout, Local credits, Stripe Connect and its callback must continue returning `503 PRIVATE_BETA_FREE`. Any change requires approved commission, protected-funds, refund, VAT/tax, KYC, country and legal-responsibility decisions plus a dedicated release review.

## Beta closeout

At the end of each week review activation, first-response time, committed matches, completion, cancellations/no-shows, reports and repeat use by product. Expand a category or city only when verified supply and response quality are healthy.
