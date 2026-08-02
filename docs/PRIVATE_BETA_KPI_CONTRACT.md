# Skilllinkup private-beta KPI contract

Status: measurement contract ready; targets are provisional until the first two cohort weeks create a real baseline.

Cadence: daily operational scan, weekly product review.

Decision: expand, hold or shrink each product cohort without hiding trust or quality problems behind top-line activity.

## Primary metrics

| Metric                                  | Definition                                                    | Calculation                                                                                                                                                                                                               | Convex source                                                                      | Weekly decision                                                            |
| --------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Committed match rate                    | Demand records that reach a meaningful two-sided commitment   | Online: projects with an accepted bid/order ÷ published projects. Local: requests with an accepted quote ÷ open/matched requests. Jobs: vacancies with at least one application moved beyond `submitted` ÷ open vacancies | `projects`, `bids`, `orders`; `quoteRequests`, `quotes`; `jobs`, `jobApplications` | Expand demand only when supply can repeatedly create commitments           |
| Median time to first qualified response | Hours from demand creation to the first valid supply response | Median of first bid, quote or submitted application timestamp minus project, request or vacancy creation timestamp                                                                                                        | `createdAt` on the same tables                                                     | Recruit or activate supply when response time misses the product threshold |
| Completion quality rate                 | Committed work that reaches its intended positive outcome     | Online/Local: completed orders ÷ terminal completed + cancelled orders. Jobs: hired applications ÷ hired + rejected + withdrawn applications that moved beyond submission                                                 | `orders`, `localAppointments`, `jobApplications`                                   | Do not expand a segment whose commitments fail downstream                  |

## Drivers and guardrails

| Type      | Metric                      | Definition and action                                                                                                                                                                                     |
| --------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Driver    | Qualified response coverage | Percentage of new demand receiving at least one valid bid, quote or application within the target window. Recruit supply before adding demand when this falls short.                                      |
| Driver    | Activated supply            | Verified supply accounts that publish an eligible offer/profile and respond at least once in the review window. Remove dormant supply from capacity claims.                                               |
| Guardrail | Cancellation/no-show rate   | Cancelled Online/Local commitments plus Local `no_show` appointments divided by terminal commitments. Pause the affected category or professional when the absolute count or rate breaches the stop rule. |
| Guardrail | Trust incident rate         | New moderation reports and urgent support tickets divided by committed matches. Every SEV-1 is reviewed as an absolute event; a low denominator may never dilute it.                                      |
| Guardrail | Support SLA attainment      | Tickets first handled within the priority target divided by tickets due in the window. Stop invitations when urgent queues do not have named coverage.                                                    |
| Guardrail | Repeat use                  | Users creating another demand record or supply response within 30 days. Directional during the small beta; do not optimise it by encouraging duplicate or low-quality activity.                           |

## Provisional cohort thresholds

These are operating thresholds, not market benchmarks. Recalculate them after two weeks and at least 20 eligible demand records per product; until then always show the numerator and denominator beside a percentage.

| Product | Response coverage                                                     | First-response target | Commitment target                                               | Stop condition                                                                                                                      |
| ------- | --------------------------------------------------------------------- | --------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Online  | At least 70% of published projects receive a qualified proposal       | median ≤ 72 hours     | at least 40% committed within 7 days                            | pause demand when 3 consecutive eligible projects receive no response                                                               |
| Local   | At least 80% of requests receive a quote from a verified professional | median ≤ 24 hours     | at least 50% accepted within 72 hours                           | immediately pause a trade/location after any unresolved urgent safety report; otherwise pause after 2 consecutive unquoted requests |
| Jobs    | At least 80% of vacancies receive an eligible application             | median ≤ 7 days       | at least 30% have a candidate moved to screening within 14 days | pause company invitations after 2 stale vacancies or any unresolved fraudulent-vacancy report                                       |

Cross-product launch guardrails:

- zero unresolved SEV-1 incidents;
- 100% of urgent tickets acknowledged within one hour while invitations are active;
- no live payment, credit purchase, payout or escrow movement during the free beta;
- no expansion while a product has fewer than three verified active supply participants in the relevant category/location;
- percentages with fewer than 20 eligible records are labelled directional and never used alone for expansion.

## Measurement rules

1. Use UTC for stored timestamps and report the cohort timezone separately.
2. Exclude drafts, QA/smoke fixtures, deleted test records and internal staff exercises.
3. Deduplicate by demand record; ten responses to one project do not count as ten successful projects.
4. Freeze the weekly window and definitions before calculating. Never change a definition to improve the result.
5. Report numerator, denominator, median and p90 where practical; never publish a percentage without its sample size.
6. Segment by product, category, city/remote status, role and acquisition cohort. Do not expose personal data in the operating report.
7. Record data gaps as `unknown`, not zero.

## Ownership required before invitations

The product owner owns the committed-match decision; the marketplace operator owns response coverage; the support/safety owner owns guardrails; engineering owns data correctness and uptime. Named people and backups must be recorded in `PRIVATE_BETA_OPERATIONS_RUNBOOK.md` before Wave 1.

## Current data limitations

The Convex schema contains the authoritative status and timestamp fields needed for the initial metrics. First-handled support timestamps, acquisition source and durable analytics events are not yet complete sources of truth. Support SLA is therefore manual in the operations log, and funnel analytics remains off until consent, provider and production configuration are approved.
