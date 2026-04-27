"use client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const SAMPLE_ANSWER =
  "Cras vitae ac nunc orci. Purus amet tortor non at phasellus ultricies hendrerit. Eget a, sit morbi nunc sit id massa. Metus, scelerisque volutpat nec sit vel donec.";

const items = [
  { id: "one", question: "What methods of payments are supported?", answer: SAMPLE_ANSWER },
  { id: "two", question: "Can I cancel at anytime?", answer: SAMPLE_ANSWER },
  { id: "three", question: "How do I get a receipt for my purchase?", answer: SAMPLE_ANSWER },
  { id: "four", question: "Which license do I need?", answer: SAMPLE_ANSWER },
  { id: "five", question: "How do I get access to a theme I purchased?", answer: SAMPLE_ANSWER },
];

export default function Accordion1() {
  return (
    <div className="ui-content">
      <h5 className="title">Accordions</h5>
      <Accordion type="single" collapsible defaultValue="one" className="w-full mb-5">
        {items.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-base font-medium">{item.question}</AccordionTrigger>
            <AccordionContent className="text-[var(--text-secondary)]">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
