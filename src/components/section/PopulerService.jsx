"use client";
import useConvexGigs from "@/hook/useConvexGigs";
import PopularServiceSlideCard1 from "../card/PopularServiceSlideCard1";
import PopularServiceCard1 from "../card/PopularServiceCard1";

/**
 * "You might also like" grid at the bottom of the service-detail page.
 * Rebuilt on DS spacing + typography; individual gig cards already use
 * Phase 5 card variants.
 */
export default function PopulerService() {
  const gigs = useConvexGigs();

  return (
    <section style={{ padding: "var(--space-16) 0", borderTop: "1px solid var(--border-subtle)" }}>
      <div className="container">
        <div style={{ marginBottom: "var(--space-10)", maxWidth: 720 }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h2)",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              margin: 0,
              marginBottom: "var(--space-3)",
            }}
          >
            People who viewed this also viewed
          </h2>
          <p
            className="body-md"
            style={{ color: "var(--text-secondary)", margin: 0 }}
          >
            Similar services from freelancers on the marketplace.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "var(--space-8)",
          }}
        >
          {(gigs || []).slice(0, 4).map((item, i) => (
            <div key={i}>
              {item.gallery ? (
                <PopularServiceSlideCard1 style="listing-style1" data={item} />
              ) : (
                <PopularServiceCard1 style="listing-style1" data={item} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
