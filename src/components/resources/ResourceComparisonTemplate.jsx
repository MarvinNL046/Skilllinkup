import Header20 from "@/components/header/Header20";
import Footer14 from "@/components/footer/Footer14";
import ResourceFAQ from "./ResourceFAQ";
import ResourceCTA from "./ResourceCTA";

export default function ResourceComparisonTemplate({ resource }) {
  // Extract platform names from slug (e.g., "freelancer-vs-guru" → "Freelancer", "Guru")
  const slugParts = resource.slug.split('-vs-');
  const platformA = slugParts[0] ? slugParts[0].charAt(0).toUpperCase() + slugParts[0].slice(1) : 'Platform A';
  const platformB = slugParts[1] ? slugParts[1].charAt(0).toUpperCase() + slugParts[1].slice(1) : 'Platform B';

  return (
    <>
      <Header20 />
      <main>
        {/* Hero */}
        <section className="pt80 pb60 bgc-thm3">
          <div className="container">
            <div className="row justify-center">
              <div className="col-lg-8 text-center">
                <span className="badge bg-thm text-white px-3 py-2 bdrs8 fz13 mb20">Platform Comparison</span>
                <h1 className="fz40 fw700 mb20">{resource.metaTitle}</h1>
                <p className="fz17 text-muted">{resource.intro}</p>
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
                    <li key={i} className="flex items-start gap-2 mb10 fz15">
                      <i className="fas fa-check-circle text-success mt-1" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Comparison table */}
        {resource.comparisonData?.length > 0 && (
          <section className="pt60 pb40">
            <div className="container">
              <h2 className="fz28 fw700 mb30 text-center">Side-by-Side Comparison</h2>
              <div className="table-responsive">
                <table className="table bdr1 bdrs8 overflow-hidden">
                  <thead style={{ background: "#1e1541", color: "#fff" }}>
                    <tr>
                      <th className="p20 fz15">Category</th>
                      <th className="p20 fz15">{platformA}</th>
                      <th className="p20 fz15">{platformB}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resource.comparisonData.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bgc-thm3" : ""}>
                        <td className="p20 fw600 fz14">{row.category}</td>
                        <td className="p20 fz14">{row.a}</td>
                        <td className="p20 fz14">{row.b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
