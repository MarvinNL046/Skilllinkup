import Header20 from "@/components/header/Header20";
import Footer14 from "@/components/footer/Footer14";
import ResourceFAQ from "./ResourceFAQ";
import ResourceCTA from "./ResourceCTA";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export default function ResourceComparisonTemplate({ resource }) {
  const slugParts = resource.slug.split("-vs-");
  const platformA = slugParts[0]
    ? slugParts[0].charAt(0).toUpperCase() + slugParts[0].slice(1)
    : "Platform A";
  const platformB = slugParts[1]
    ? slugParts[1].charAt(0).toUpperCase() + slugParts[1].slice(1)
    : "Platform B";

  return (
    <>
      <Header20 />
      <main>
        {/* Hero */}
        <section className="pt-20 pb-16 bg-primary/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-5">Platform Comparison</Badge>
              <h1 className="text-3xl md:text-5xl font-bold mb-5">
                {resource.metaTitle}
              </h1>
              <p className="text-lg text-[var(--text-secondary)]">{resource.intro}</p>
            </div>
          </div>
        </section>

        {/* Key takeaways */}
        {resource.keyTakeaways?.length > 0 && (
          <section className="pt-16 pb-10">
            <div className="container">
              <div className="max-w-3xl mx-auto rounded-xl border border-[var(--border-subtle)] border-l-4 border-l-primary p-8">
                <h2 className="text-lg font-bold mb-5">Key Takeaways</h2>
                <ul className="space-y-3">
                  {resource.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-2 text-base">
                      <CheckCircle2 className="h-4 w-4 text-success mt-1 flex-shrink-0" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Comparison table */}
        {resource.comparisonData?.length > 0 && (
          <section className="pt-16 pb-10">
            <div className="container">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                Side-by-Side Comparison
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border border-[var(--border-subtle)] rounded-lg overflow-hidden">
                  <thead className="bg-secondary text-secondary-foreground">
                    <tr>
                      <th className="p-5 text-left text-base font-semibold">Category</th>
                      <th className="p-5 text-left text-base font-semibold">
                        {platformA}
                      </th>
                      <th className="p-5 text-left text-base font-semibold">
                        {platformB}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {resource.comparisonData.map((row, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-[var(--surface-2)]/50" : ""}
                      >
                        <td className="p-5 font-semibold text-sm">{row.category}</td>
                        <td className="p-5 text-sm">{row.a}</td>
                        <td className="p-5 text-sm">{row.b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Sections */}
        <section className="pt-10 pb-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              {resource.sections?.map((section, i) => (
                <div key={i} className="mb-10">
                  <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>
                  <div className="text-base text-foreground leading-relaxed whitespace-pre-wrap">
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
