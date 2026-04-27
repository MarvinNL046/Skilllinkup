import Header20 from "@/components/header/Header20";
import Footer14 from "@/components/footer/Footer14";
import ResourceFAQ from "./ResourceFAQ";
import ResourceCTA from "./ResourceCTA";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, CheckCircle2 } from "lucide-react";

export default function ResourcePricingTemplate({ resource }) {
  const dateLabel = resource.updatedAt || resource.publishedAt;

  return (
    <>
      <Header20 />
      <main>
        {/* Hero */}
        <section className="pt-20 pb-16 bg-primary/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-5">Pricing Guide</Badge>
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

        {/* Pricing table */}
        {resource.pricingData?.length > 0 && (
          <section className="pt-10 pb-16">
            <div className="container">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                Pricing Plans
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                {resource.pricingData.map((plan, i) => (
                  <Card key={i} className="h-full">
                    <CardContent className="p-8 text-center">
                      <h3 className="text-xl font-bold mb-3">{plan.tier}</h3>
                      <div className="text-4xl font-bold text-primary mb-1">
                        {plan.price}
                      </div>
                      {plan.billingPeriod && (
                        <p className="text-xs text-[var(--text-secondary)] mb-5">
                          {plan.billingPeriod}
                        </p>
                      )}
                      <ul className="text-left space-y-2 mt-6">
                        {plan.features?.map((feature, j) => (
                          <li key={j} className="flex gap-2 text-sm">
                            <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
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
