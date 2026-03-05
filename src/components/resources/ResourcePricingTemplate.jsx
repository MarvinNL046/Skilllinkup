import Header20 from "@/components/header/Header20";
import Footer14 from "@/components/footer/Footer14";
import ResourceFAQ from "./ResourceFAQ";
import ResourceCTA from "./ResourceCTA";

export default function ResourcePricingTemplate({ resource }) {
  return (
    <>
      <Header20 />
      <main>
        {/* Hero */}
        <section className="pt80 pb60 bgc-thm3">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <span className="badge bg-thm text-white px-3 py-2 bdrs8 fz13 mb20">Pricing Guide</span>
                <h1 className="fz40 fw700 mb20">{resource.metaTitle}</h1>
                <p className="fz17 text-muted">{resource.intro}</p>
                {(resource.updatedAt || resource.publishedAt) && (
                  <p className="fz13 text-muted mt15">
                    Last updated: {new Date(resource.updatedAt || resource.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Key takeaways */}
        {resource.keyTakeaways?.length > 0 && (
          <section className="pt60 pb40">
            <div className="container">
              <div className="col-lg-8 mx-auto bdr1 bdrs12 p30" style={{ borderLeft: "4px solid #ef2b70" }}>
                <h2 className="fz20 fw700 mb20">Key Takeaways</h2>
                <ul className="mb-0 ps-0" style={{ listStyle: "none" }}>
                  {resource.keyTakeaways.map((t, i) => (
                    <li key={i} className="d-flex align-items-start gap-2 mb10 fz15">
                      <i className="fas fa-check-circle text-success mt-1" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Pricing table */}
        {resource.pricingData?.length > 0 && (
          <section className="pt40 pb60">
            <div className="container">
              <h2 className="fz28 fw700 mb30 text-center">Pricing Plans</h2>
              <div className="row g-4 justify-content-center">
                {resource.pricingData.map((plan, i) => (
                  <div key={i} className="col-md-4">
                    <div className="bdr1 bdrs12 p30 h-100 text-center hover-box-shadow">
                      <h3 className="fz20 fw700 mb10">{plan.tier}</h3>
                      <div className="fz32 fw700 text-thm mb5">{plan.price}</div>
                      {plan.billingPeriod && <p className="fz13 text-muted mb20">{plan.billingPeriod}</p>}
                      <ul className="text-start ps-0" style={{ listStyle: "none" }}>
                        {plan.features?.map((f, j) => (
                          <li key={j} className="d-flex gap-2 mb8 fz14">
                            <i className="fas fa-check text-success mt-1" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Sections */}
        <section className="pt40 pb60">
          <div className="container">
            <div className="col-lg-8 mx-auto">
              {resource.sections?.map((section, i) => (
                <div key={i} className="mb40">
                  <h2 className="fz24 fw700 mb15">{section.heading}</h2>
                  <div className="fz16 text-dark lh-lg" style={{ whiteSpace: "pre-wrap" }}>
                    {section.body}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ResourceFAQ items={resource.faqItems} />
        <ResourceCTA />
      </main>
      <Footer14 />
    </>
  );
}
