"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ResourceFAQ({ items }) {
  if (!items?.length) return null;

  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-base font-semibold">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-[var(--text-secondary)]">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
