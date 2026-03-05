import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import ResourcePricingTemplate from "@/components/resources/ResourcePricingTemplate";
import ResourceComparisonTemplate from "@/components/resources/ResourceComparisonTemplate";
import ResourceGuideTemplate from "@/components/resources/ResourceGuideTemplate";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://skilllinkup.com";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const resource = await fetchQuery(api.resources.getBySlug, { slug, locale: "en" });
    if (!resource) return { title: "Resource | SkillLinkup" };
    return {
      title: resource.metaTitle,
      description: resource.metaDescription,
      openGraph: {
        title: resource.metaTitle,
        description: resource.metaDescription,
        url: `${BASE_URL}/resources/${slug}`,
      },
      alternates: {
        canonical: `${BASE_URL}/resources/${slug}`,
      },
    };
  } catch {
    return { title: "Resource | SkillLinkup" };
  }
}

export default async function ResourcePage({ params }) {
  const { slug } = await params;
  const resource = await fetchQuery(api.resources.getBySlug, { slug, locale: "en" }).catch(() => null);

  if (!resource || resource.status !== "published") notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: resource.metaTitle,
        description: resource.metaDescription,
        url: `${BASE_URL}/resources/${slug}`,
        datePublished: resource.publishedAt ? new Date(resource.publishedAt).toISOString() : undefined,
        dateModified: new Date(resource.updatedAt).toISOString(),
        publisher: { "@type": "Organization", name: "SkillLinkup", url: BASE_URL },
      },
      resource.faqItems?.length > 0 && {
        "@type": "FAQPage",
        mainEntity: resource.faqItems.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Resources", item: `${BASE_URL}/resources` },
          { "@type": "ListItem", position: 3, name: resource.metaTitle, item: `${BASE_URL}/resources/${slug}` },
        ],
      },
    ].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {resource.type === "pricing" && <ResourcePricingTemplate resource={resource} />}
      {resource.type === "comparison" && <ResourceComparisonTemplate resource={resource} />}
      {resource.type === "guide" && <ResourceGuideTemplate resource={resource} />}
    </>
  );
}
