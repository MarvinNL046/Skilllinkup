#!/usr/bin/env node

import assert from "node:assert/strict";
import {
  buildJobPosting,
  getJobPostingEligibility,
  normalizeEmploymentType,
} from "../src/lib/seo/jobPosting.mjs";

const now = Date.UTC(2026, 7, 2, 12);
const baseJob = {
  _id: "job_fixture_1",
  status: "open",
  slug: "senior-product-designer",
  title: "Senior Product Designer",
  description:
    "Lead product discovery, interaction design and research for an international software team.",
  company: "Northwind Labs",
  jobType: "full-time",
  workType: "remote",
  locationCountry: "Netherlands",
  salaryMin: 70000,
  salaryMax: 85000,
  currency: "EUR",
  publishedAt: now - 86_400_000,
  expiresAt: now + 30 * 86_400_000,
};

const remote = buildJobPosting(baseJob, { now });
assert.equal(remote?.["@type"], "JobPosting");
assert.equal(remote?.employmentType, "FULL_TIME");
assert.equal(remote?.jobLocationType, "TELECOMMUTE");
assert.equal(
  remote?.applicantLocationRequirements?.name,
  "Netherlands",
);
assert.equal(remote?.jobLocation, undefined);
assert.equal(remote?.baseSalary?.value?.unitText, "YEAR");

const hybrid = buildJobPosting(
  {
    ...baseJob,
    workType: "hybrid",
    locationCity: "Rotterdam",
    jobType: "contract",
  },
  { now },
);
assert.equal(hybrid?.employmentType, "CONTRACTOR");
assert.equal(hybrid?.jobLocationType, undefined);
assert.equal(hybrid?.jobLocation?.address?.addressLocality, "Rotterdam");
assert.equal(hybrid?.jobLocation?.address?.addressCountry, "Netherlands");

assert.equal(buildJobPosting({ ...baseJob, status: "closed" }, { now }), null);
assert.equal(
  buildJobPosting({ ...baseJob, expiresAt: now - 1 }, { now }),
  null,
);
assert.equal(
  getJobPostingEligibility(
    { ...baseJob, locationCountry: undefined },
    { now },
  ).eligible,
  false,
);
assert.equal(normalizeEmploymentType("part-time"), "PART_TIME");
assert.equal(normalizeEmploymentType("internship"), "INTERN");
assert.equal(normalizeEmploymentType("unknown"), "OTHER");

console.log("JobPosting contract fixtures passed.");
