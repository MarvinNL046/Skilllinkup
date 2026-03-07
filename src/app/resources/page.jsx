import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import Header20 from "@/components/header/Header20";
import Footer14 from "@/components/footer/Footer14";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://skilllinkup.com";

export const metadata = {
  title: "Freelance Platform Resources 2026: Guides, Pricing & Comparisons",
  description: "In-depth guides on freelance platform pricing, comparisons, and strategies. Upwork, Toptal, 99designs, Guru and more — all the info you need to pick the right platform.",
  alternates: { canonical: `${BASE_URL}/resources` },
  openGraph: {
    title: "Freelance Platform Resources 2026: Guides, Pricing & Comparisons",
    description: "In-depth guides on freelance platform pricing, comparisons, and strategies. Upwork, Toptal, 99designs, Guru and more — all the info you need to pick the right platform.",
  },
};

const TYPE_LABELS = {
  pricing: "Pricing Guide",
  comparison: "Comparison",
  guide: "Guide",
};

const TYPE_COLORS = {
  pricing: "#ef2b70",
  comparison: "#1e1541",
  guide: "#22c55e",
};

export default async function ResourcesPage() {
  const resources = await fetchQuery(api.resources.list, {
    locale: "en",
    status: "published",
    limit: 100,
  }).catch(() => []);

  const byType = {
    comparison: resources.filter((r) => r.type === "comparison"),
    pricing: resources.filter((r) => r.type === "pricing"),
    guide: resources.filter((r) => r.type === "guide"),
  };

  return (
    <>
      <Header20 />
      <main>
        {/* Hero */}
        <section className="pt80 pb60 bgc-thm3">
          <div className="container text-center">
            <h1 className="fz40 fw700 mb15">Freelance Platform Resources</h1>
            <p className="fz17 text-muted col-lg-6 mx-auto">
              Honest guides, pricing breakdowns, and platform comparisons — everything you need to choose and use the right freelance platform.
            </p>
          </div>
        </section>

        {/* Resource grid */}
        <section className="pt60 pb80">
          <div className="container">
            {Object.entries(byType).map(([type, items]) =>
              items.length > 0 ? (
                <div key={type} className="mb60">
                  <h2 className="fz24 fw700 mb30 text-capitalize">
                    {type === "comparison" ? "Platform Comparisons" : type === "pricing" ? "Pricing Guides" : "Guides & How-Tos"}
                  </h2>
                  <div className="row g-4">
                    {items.map((resource) => (
                      <div key={resource._id} className="col-md-6 col-lg-4">
                        <Link href={`/resources/${resource.slug}`} className="text-decoration-none">
                          <div className="bdr1 bdrs12 p30 h-100 hover-box-shadow" style={{ transition: "box-shadow 0.2s" }}>
                            <span
                              className="badge px-3 py-2 bdrs8 fz12 mb15 d-inline-block text-white"
                              style={{ background: TYPE_COLORS[resource.type] }}
                            >
                              {TYPE_LABELS[resource.type]}
                            </span>
                            <h3 className="fz18 fw600 mb10 text-dark">{resource.metaTitle}</h3>
                            <p className="fz14 text-muted mb-0 lh-lg">
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
              <p className="text-muted text-center pt40">No resources available yet.</p>
            )}
          </div>
        </section>
      </main>
      <Footer14 />
    </>
  );
}
