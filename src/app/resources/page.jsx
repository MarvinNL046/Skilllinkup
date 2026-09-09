import { seoPages } from '@/content/seo';
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import Header20 from "@/components/header/Header20";
import Footer14 from "@/components/footer/Footer14";
import { getTranslations } from "next-intl/server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://skilllinkup.com";

const TYPE_COLORS = {
  pricing: "var(--primary-600)",
  comparison: "var(--primary-900)",
  guide: "var(--secondary-600)",
};

export async function generateMetadata() {
  const t = await getTranslations("resources");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: `${BASE_URL}/resources` },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
  };
}

export default async function ResourcesPage() {
  const t = await getTranslations("resources");

  const cmsResources = await fetchQuery(api.resources.list, {
    locale: "en",
    status: "published",
    limit: 100,
  }).catch(() => []);

  const guides = seoPages.filter(p => p.type === "guide" && p.locale !== "nl").map(p => ({ _id: p.path, path: p.path, slug: p.slug, type: p.slug.includes("vs-") ? "comparison" : p.slug.includes("pricing") ? "pricing" : "guide", metaTitle: p.title, metaDescription: p.description }));
  const resources = [...guides, ...cmsResources.filter(r => !guides.some(g => g.slug === r.slug))];
  const byType = {
    comparison: resources.filter((r) => r.type === "comparison"),
    pricing: resources.filter((r) => r.type === "pricing"),
    guide: resources.filter((r) => r.type === "guide"),
  };

  const sectionTitles = {
    comparison: t("platformComparisons"),
    pricing: t("pricingGuides"),
    guide: t("guidesAndHowTos"),
  };

  const typeLabels = {
    pricing: t("pricingGuide"),
    comparison: t("comparison"),
    guide: t("guide"),
  };

  return (
    <>
      <Header20 />
      <main>
        {/* Hero */}
        <section className="pt-20 pb-14 bgc-thm3">
          <div className="container text-center">
            <h1 className="text-4xl font-bold mb-4">{t("heroTitle")}</h1>
            <p className="text-lg text-muted col-lg-6 mx-auto">
              {t("heroDescription")}
            </p>
          </div>
        </section>

        {/* Resource grid */}
        <section className="pt-14 pb-20">
          <div className="container">
            <p className="mb-8"><Link href="/nl/resources">Nederlandstalige gidsen</Link></p>
            {Object.entries(byType).map(([type, items]) =>
              items.length > 0 ? (
                <div key={type} className="mb-14">
                  <h2 className="text-2xl font-bold mb-8">
                    {sectionTitles[type]}
                  </h2>
                  <div className="row g-4">
                    {items.map((resource) => (
                      <div key={resource._id} className="col-md-6 col-lg-4">
                        <Link href={resource.path || `/resources/${resource.slug}`} className="no-underline">
                          <div className="bdr1 bdrs12 p-8 h-full hover-box-shadow" style={{ transition: "box-shadow 0.2s" }}>
                            <span
                              className="badge px-3 py-2 bdrs8 text-xs mb-4 inline-block text-white"
                              style={{ background: TYPE_COLORS[resource.type] }}
                            >
                              {typeLabels[resource.type]}
                            </span>
                            <h3 className="text-lg font-semibold mb-2.5 text-dark">{resource.metaTitle}</h3>
                            <p className="text-sm text-muted mb-0 lh-lg">
                              {resource.metaDescription?.slice(0, 100)}…
                            </p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null
            )}

            {resources.length === 0 && (
              <p className="text-muted text-center pt-10">{t("noResources")}</p>
            )}
          </div>
        </section>
      </main>
      <Footer14 />
    </>
  );
}
