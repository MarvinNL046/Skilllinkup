import Header20 from "@/components/header/Header20";
import Footer14 from "@/components/footer/Footer14";
import ResourceFAQ from "./ResourceFAQ";
import ResourceCTA from "./ResourceCTA";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export default function ResourceGuideTemplate({ resource }) {
  const dateLabel = resource.updatedAt || resource.publishedAt;

  return (
    <>
      <Header20 />
      <main>
        {/* Hero */}
        <section className="pt-20 pb-16 bg-primary/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-5">Guide</Badge>
              <h1 className="text-3xl md:text-5xl font-bold mb-5">
                {resource.metaTitle}
              </h1>
              <p className="text-lg text-[var(--text-secondary)]">{resource.intro}</p>
              {dateLabel && (
                <p className="text-xs text-[var(--text-tertiary)] mt-4">
                  Last updated:{" "}
                  {new Date(dateLabel).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Key takeaways */}
        {resource.keyTakeaways?.length > 0 && (
          <section className="pt-16 pb-5">
            <div className="container">
              <div className="max-w-3xl mx-auto rounded-xl border border-[var(--border-subtle)] border-l-4 border-l-primary p-8">
                <h2 className="text-lg font-bold mb-5">What You&apos;ll Learn</h2>
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

        {/* Sections */}
        <section className="pt-10 pb-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              {resource.sections?.map((section, i) => (
                <div key={i} className="mb-10">
                  <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>
                  <div
                    className="text-base text-foreground leading-relaxed whitespace-pre-wrap"
                  >
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
