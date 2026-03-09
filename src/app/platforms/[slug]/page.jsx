import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import PlatformPageClient from "@/components/platforms/PlatformPageClient";
import { getTranslations } from "next-intl/server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://skilllinkup.com";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const t = await getTranslations("platformDetail");
  try {
    const platform = await fetchQuery(api.platforms.getBySlug, {
      slug,
      locale: "en",
    });
    if (!platform) return { title: t("platformReview") };
    return {
      title: t("reviewTitle", { name: platform.name }),
      description: platform.description
        ? platform.description.replace(/<[^>]+>/g, "").slice(0, 155)
        : t("reviewDescription", { name: platform.name }),
      openGraph: {
        title: t("reviewOgTitle", { name: platform.name }),
        description: platform.description
          ? platform.description.replace(/<[^>]+>/g, "").slice(0, 155)
          : undefined,
        images: platform.logoUrl ? [{ url: platform.logoUrl }] : [],
      },
      alternates: { canonical: `${BASE_URL}/platforms/${slug}` },
    };
  } catch {
    return { title: t("platformReview") };
  }
}

export default async function PlatformPage({ params }) {
  const { slug } = await params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Platforms",
        item: `${BASE_URL}/platforms`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: slug,
        item: `${BASE_URL}/platforms/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PlatformPageClient slug={slug} />
    </>
  );
}
