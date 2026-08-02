# Technical SEO and Jobs rich-result gate

Last verified: 2 August 2026

## Automated contract

Run the local structured-data fixtures:

```bash
npm run seo:verify-contract
```

Verify a hosted deployment:

```bash
npm run seo:verify-hosted -- --base-url=https://skilllinkup.com
```

The hosted verifier proves that:

- `robots.txt` exposes the canonical sitemap and blocks protected route families;
- Preview deployments disallow crawling entirely and do not advertise a sitemap;
- the sitemap contains unique, absolute URLs on the expected origin and excludes protected routes;
- core public pages return 200, expose a self-referencing canonical and remain indexable in production;
- job overview pages contain no `JobPosting` objects;
- each open job URL in the sitemap contains exactly one non-expired `JobPosting` object;
- fully remote jobs declare `TELECOMMUTE` plus an applicant country;
- physical and hybrid roles declare a city and country;
- title, description, original posting date, employment type and hiring organization are present;
- structured-data URL and page canonical agree.

Use `--require-job` once the first genuine vacancy is published. Until then, zero
eligible job URLs is reported as an inventory notice instead of being hidden by
fabricated production data.

The release-readiness workflow runs the full contract. The production monitor
checks up to five live job pages every fifteen minutes alongside the existing
release, payment-quarantine and secret-boundary checks.

## Publishing rules

- Only `open`, non-expired vacancies are added to the sitemap.
- Closed or expired detail pages are `noindex` and do not emit `JobPosting`.
- Remote vacancies require the country from which applicants may work.
- Hybrid and on-site vacancies require both city and country.
- Static sitemap entries omit `lastmod`; a false current timestamp is less useful
  than no timestamp. Dynamic records use their actual persisted update time.
- Never publish a fake vacancy merely to satisfy the rich-result gate.

These rules follow Google's current [JobPosting documentation](https://developers.google.com/search/docs/appearance/structured-data/job-posting), [canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) and [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

## External launch gate

Engineering can prepare and continuously verify the public output, but the
following steps require the verified domain owner in Google Search Console:

1. Verify ownership of `skilllinkup.com`.
2. Submit `https://skilllinkup.com/sitemap.xml`.
3. Inspect the first genuine open vacancy URL and run the Rich Results Test.
4. Enable `--require-job` in the production release command after that URL passes.
5. Monitor Job postings enhancement reports and remove/close expired vacancies.

Search Console ownership and the first genuine vacancy therefore remain explicit
launch gates; the code must not claim them complete before external evidence exists.
