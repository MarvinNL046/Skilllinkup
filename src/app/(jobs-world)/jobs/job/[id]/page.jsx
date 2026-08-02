import { fetchQuery } from "convex/nextjs";
import { getTranslations } from "next-intl/server";
import { api } from "../../../../../../convex/_generated/api";
import TabSection1 from "@/components/section/TabSection1";
import Breadcumb10 from "@/components/breadcumb/Breadcumb10";
import Breadcumb13 from "@/components/breadcumb/Breadcumb13";
import JobDetail1 from "@/components/section/JobDetail1";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const t = await getTranslations("jobsHub");
  try {
    const job = await fetchQuery(api.marketplace.jobs.getBySlug, {
      slug: id,
      locale: "en",
    });
    if (job) {
      const isOpen =
        job.status === "open" && (!job.expiresAt || job.expiresAt > Date.now());
      const salary =
        job.salaryMin && job.salaryMax
          ? ` — €${job.salaryMin.toLocaleString()}–€${job.salaryMax.toLocaleString()}`
          : "";
      const titleSuffix = job.company
        ? ` ${t("atCompany", { company: job.company })}`
        : "";
      return {
        title: `${job.title}${titleSuffix}`,
        description: job.description
          ? job.description.slice(0, 155)
          : `${job.title}${salary}. ${t("applyOnSkillLinkup")}`,
        openGraph: {
          title: `${job.title}${titleSuffix}`,
          description: job.description?.slice(0, 155) || job.title,
        },
        alternates: {
          canonical: `/jobs/job/${job.slug}`,
        },
        robots: isOpen
          ? { index: true, follow: true }
          : { index: false, follow: false, nocache: true },
      };
    }
  } catch {}
  return {
    title: t("jobOpeningFallback"),
    description: t("jobOpeningDescription"),
  };
}

export default async function page({ params }) {
  const { id } = await params;
  const t = await getTranslations("jobsHub");
  let job = null;
  try {
    job = await fetchQuery(api.marketplace.jobs.getBySlug, {
      slug: id,
      locale: "en",
    });
  } catch {}

  const isOpen =
    job?.status === "open" && (!job.expiresAt || job.expiresAt > Date.now());
  const employmentType =
    {
      full_time: "FULL_TIME",
      part_time: "PART_TIME",
      contract: "CONTRACTOR",
      temporary: "TEMPORARY",
      internship: "INTERN",
    }[job?.jobType] || "OTHER";
  const jobPosting = isOpen
    ? {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: job.title,
        description: job.description,
        datePosted: new Date(job.publishedAt || job.createdAt).toISOString(),
        ...(job.expiresAt
          ? { validThrough: new Date(job.expiresAt).toISOString() }
          : {}),
        employmentType,
        hiringOrganization: {
          "@type": "Organization",
          name: job.company || job.clientName || "Skilllinkup employer",
          ...(job.companyLogo ? { logo: job.companyLogo } : {}),
        },
        ...(job.workType === "remote"
          ? { jobLocationType: "TELECOMMUTE" }
          : job.locationCity || job.locationCountry
            ? {
                jobLocation: {
                  "@type": "Place",
                  address: {
                    "@type": "PostalAddress",
                    ...(job.locationCity
                      ? { addressLocality: job.locationCity }
                      : {}),
                    ...(job.locationCountry
                      ? { addressCountry: job.locationCountry }
                      : {}),
                  },
                },
              }
            : {}),
        ...(job.salaryMin || job.salaryMax
          ? {
              baseSalary: {
                "@type": "MonetaryAmount",
                currency: job.currency || "EUR",
                value: {
                  "@type": "QuantitativeValue",
                  ...(job.salaryMin ? { minValue: job.salaryMin } : {}),
                  ...(job.salaryMax ? { maxValue: job.salaryMax } : {}),
                  unitText: "YEAR",
                },
              },
            }
          : {}),
      }
    : null;

  return (
    <>
      {jobPosting ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jobPosting).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}
      <TabSection1 />
      <Breadcumb10
        path={[t("breadcrumbHome"), t("breadcrumbJobs"), t("breadcrumbDetail")]}
      />
      <Breadcumb13 />
      <JobDetail1 />
    </>
  );
}
