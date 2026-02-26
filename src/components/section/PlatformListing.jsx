"use client";
import useConvexPlatforms from "@/hook/useConvexPlatforms";
import PlatformCard from "@/components/card/PlatformCard";
import EmptyState from "@/components/ui/EmptyState";

export default function PlatformListing() {
  const platforms = useConvexPlatforms("en");

  return (
    <section className="pt30 pb90">
      <div className="container">
        {/* Section header */}
        <div className="row mb40">
          <div className="col-12">
            <h2 className="title mb5">Freelance Platforms</h2>
            <p className="body-color">
              Compare the best freelance platforms to find the right fit for your career.
            </p>
          </div>
        </div>

        {/* Loading state */}
        {platforms === undefined && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="body-color mt-3">Loading platforms...</p>
          </div>
        )}

        {/* Empty state */}
        {platforms !== undefined && platforms.length === 0 && (
          <EmptyState
            title="No platforms yet"
            description="Check back soon for freelance platform reviews"
          />
        )}

        {/* Platform grid */}
        {platforms !== undefined && platforms.length > 0 && (
          <div className="row">
            {platforms.map((platform) => (
              <div key={platform._id} className="col-md-6 col-xl-4 mb25">
                <PlatformCard data={platform} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
