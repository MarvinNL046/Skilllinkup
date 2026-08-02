# Skilllinkup canonical route map

Status: approved implementation baseline for Sprint 1.

## Principles

- English is the default and canonical language.
- The three product worlds remain visible at `/online`, `/local`, and `/jobs`.
- Overview pages use short, human-readable URLs where a polished page already exists.
- Product prefixes are used for entity detail pages when they prevent ambiguity.
- Legacy template routes remain reachable only through permanent redirects.
- Canonical metadata and sitemap entries must point to the destination below, never to an alias.

## Public routes

| Product | Page type | Canonical URL | Legacy aliases to redirect |
| --- | --- | --- | --- |
| Platform | Homepage | `/` | none |
| Online | Product landing | `/online` | none |
| Online | Services overview | `/services` | `/online/services`, `/service` |
| Online | Service category | `/services/[slug]` | `/online/services/[slug]` |
| Online | Service detail | `/online/service/[id]` | `/service/[id]` |
| Online | Freelancer directory | `/online/freelancers` | `/freelancers`, `/employees` |
| Online | Freelancer detail | `/online/freelancer/[id]` | `/freelancer/[id]`, `/employee-single/[id]` |
| Online | Project directory | `/projects` | `/online/projects`, `/project` |
| Online | Project detail | `/online/project/[id]` | `/project/[id]` |
| Local | Product landing | `/local` | none |
| Local | Professional directory | `/local/craftsmen` | none |
| Local | Professional detail | `/local/craftsman/[id]` | none |
| Local | Quote requests | `/local/quote-requests` | none |
| Local | Quote request detail | `/local/quote-request/[id]` | none |
| Jobs | Product landing | `/jobs` | `/job` |
| Jobs | Vacancy directory | `/jobs/browse` | none |
| Jobs | Vacancy detail | `/jobs/job/[id]` | `/job/[id]` |
| Jobs | Company experience | `/jobs/companies` | none |

## Account routes

| Page type | Canonical URL | Alias |
| --- | --- | --- |
| Sign in | `/login` | `/sign-in` |
| Register | `/register` | `/sign-up` |
| Onboarding | `/onboarding` | none |
| Dashboard | `/dashboard` | none |

Dashboard feature routes remain top-level during the private beta (`/orders`, `/message`, `/manage-projects`, and related routes). A later information-architecture sprint may move these below `/dashboard/*`; that should happen as a single migration with redirects, not incrementally.

## Removal order

1. Add and verify redirects for every alias.
2. Update internal links, metadata, sitemap, and structured data.
3. Run route smoke tests for sources and destinations.
4. Remove the obsolete route component only after no source imports or links remain.
5. Keep permanent redirects for at least one release cycle.

## Explicit non-goals for Sprint 1

- No locale-prefixed duplication for English pages.
- No destructive removal of existing routes before redirect coverage exists.
- No merge of Local quote requests, Online projects, and Jobs vacancies into one generic entity. They share UI primitives but keep separate domain rules.
