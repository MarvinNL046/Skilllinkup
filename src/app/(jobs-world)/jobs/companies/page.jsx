import Image from "next/image";
import EmptyState from "@/components/ui/EmptyState";

export const metadata = {
  title: "Companies — SkillLinkup",
  description: "Browse companies hiring on SkillLinkup. Find employers looking for talent.",
};

export default function CompaniesPage() {
  return (
    <>
      <section className="breadcumb-section pt-0">
        <div className="cta-job-v1 cta-banner mx-auto maxw1700 pt120 pb120 bdrs16 position-relative overflow-hidden d-flex align-items-center mx20-lg px30-lg">
          <Image
            height={226}
            width={198}
            className="left-top-img wow zoomIn"
            src="/images/vector-img/left-top.png"
            alt="left-top"
          />
          <Image
            height={181}
            width={255}
            className="right-bottom-img wow zoomIn"
            src="/images/vector-img/right-bottom.png"
            alt="right-bottom"
          />
          <div className="container">
            <div className="row wow fadeInUp">
              <div className="col-xl-7">
                <div className="position-relative">
                  <h2>Companies</h2>
                  <p className="text">
                    Discover companies hiring on SkillLinkup and find your next opportunity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt30 pb90">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 mx-auto">
              <EmptyState
                icon="🏢"
                title="Company directory coming soon"
                description="We're building a company directory so you can discover employers on SkillLinkup. Soon you'll be able to browse company profiles, see open positions, and learn about company culture."
                actionLabel="Browse Jobs"
                actionHref="/jobs/browse"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
