import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import ResourcePricingTemplate from "@/components/resources/ResourcePricingTemplate";
import ResourceComparisonTemplate from "@/components/resources/ResourceComparisonTemplate";
import ResourceGuideTemplate from "@/components/resources/ResourceGuideTemplate";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://skilllinkup.com";

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  try {
    const resource = await fetchQuery(api.resources.getBySlug, { slug, locale });
    if (!resource || resource.status !== "published") return { title: "Resource | SkillLinkup" };
    return {
      title: resource.metaTitle,
      description: resource.metaDescription,
      openGraph: { title: resource.metaTitle, description: resource.metaDescription },
      alternates: {
        canonical: `${BASE_URL}/${locale}/resources/${slug}`,
        languages: { en: `${BASE_URL}/resources/${slug}` },
      },
    };
  } catch {
    return { title: "Resource | SkillLinkup" };
  }
}

export default async function LocaleResourcePage({ params }) {
  const { slug, locale } = await params;
  const resource = await fetchQuery(api.resources.getBySlug, { slug, locale }).catch(() => null);

  if (!resource || resource.status !== "published") notFound();
  if (!["pricing", "comparison", "guide"].includes(resource.type)) notFound();

  return (
    <>
      {resource.type === "pricing" && <ResourcePricingTemplate resource={resource} />}
      {resource.type === "comparison" && <ResourceComparisonTemplate resource={resource} />}
      {resource.type === "guide" && <ResourceGuideTemplate resource={resource} />}
    </>
  );
}
