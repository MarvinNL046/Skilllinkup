const EMPLOYMENT_TYPES = new Map([
  ["full-time", "FULL_TIME"],
  ["full_time", "FULL_TIME"],
  ["full time", "FULL_TIME"],
  ["part-time", "PART_TIME"],
  ["part_time", "PART_TIME"],
  ["part time", "PART_TIME"],
  ["contract", "CONTRACTOR"],
  ["contractor", "CONTRACTOR"],
  ["freelance", "CONTRACTOR"],
  ["temporary", "TEMPORARY"],
  ["intern", "INTERN"],
  ["internship", "INTERN"],
  ["volunteer", "VOLUNTEER"],
  ["per-diem", "PER_DIEM"],
  ["per_diem", "PER_DIEM"],
]);

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validDate(value) {
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date : null;
}

export function normalizeEmploymentType(value) {
  return EMPLOYMENT_TYPES.get(clean(value).toLowerCase()) ?? "OTHER";
}

export function getJobPostingEligibility(job, { now = Date.now() } = {}) {
  const reasons = [];
  const expiresAt = job?.expiresAt ? validDate(job.expiresAt) : null;
  const datePosted = validDate(job?.publishedAt || job?.createdAt);
  const company = clean(job?.company || job?.clientName);
  const country = clean(job?.locationCountry);
  const city = clean(job?.locationCity);
  const workType = clean(job?.workType).toLowerCase();

  if (!job || job.status !== "open") reasons.push("job is not open");
  if (job?.expiresAt && (!expiresAt || expiresAt.getTime() <= now))
    reasons.push("job is expired");
  if (!clean(job?.title)) reasons.push("title is missing");
  if (!clean(job?.description)) reasons.push("description is missing");
  if (!datePosted) reasons.push("datePosted is missing or invalid");
  if (!company) reasons.push("hiring organization is missing");
  if (!clean(job?.slug)) reasons.push("canonical slug is missing");
  if (workType === "remote") {
    if (!country) reasons.push("remote applicant country is missing");
  } else {
    if (!country) reasons.push("physical job country is missing");
    if (!city) reasons.push("physical job city is missing");
  }

  return { eligible: reasons.length === 0, reasons };
}

export function buildJobPosting(
  job,
  { baseUrl = "https://skilllinkup.com", now = Date.now() } = {},
) {
  const eligibility = getJobPostingEligibility(job, { now });
  if (!eligibility.eligible) return null;

  const company = clean(job.company || job.clientName);
  const country = clean(job.locationCountry);
  const city = clean(job.locationCity);
  const isRemote = clean(job.workType).toLowerCase() === "remote";
  const canonicalUrl = new URL(`/jobs/job/${job.slug}`, baseUrl).toString();
  const salaryMin = Number(job.salaryMin);
  const salaryMax = Number(job.salaryMax);
  const hasMin = Number.isFinite(salaryMin) && salaryMin > 0;
  const hasMax = Number.isFinite(salaryMax) && salaryMax > 0;

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: clean(job.title),
    description: clean(job.description),
    datePosted: new Date(job.publishedAt || job.createdAt).toISOString(),
    ...(job.expiresAt
      ? { validThrough: new Date(job.expiresAt).toISOString() }
      : {}),
    employmentType: normalizeEmploymentType(job.jobType),
    identifier: {
      "@type": "PropertyValue",
      name: company,
      value: String(job._id || job.slug),
    },
    hiringOrganization: {
      "@type": "Organization",
      name: company,
      ...(clean(job.companyLogo) ? { logo: clean(job.companyLogo) } : {}),
    },
    url: canonicalUrl,
    ...(isRemote
      ? {
          jobLocationType: "TELECOMMUTE",
          applicantLocationRequirements: {
            "@type": "Country",
            name: country,
          },
        }
      : {
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: city,
              addressCountry: country,
            },
          },
        }),
    ...(hasMin || hasMax
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: clean(job.currency) || "EUR",
            value: {
              "@type": "QuantitativeValue",
              ...(hasMin ? { minValue: salaryMin } : {}),
              ...(hasMax ? { maxValue: salaryMax } : {}),
              unitText: "YEAR",
            },
          },
        }
      : {}),
  };
}
