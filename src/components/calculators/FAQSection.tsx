import { FAQItem } from "@/types/calculator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateFAQPageJsonLd } from "@/lib/seo";

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
}

export function FAQSection({ faqs, title = "Frequently Asked Questions" }: FAQSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  const faqSchema = generateFAQPageJsonLd(faqs);

  return (
    <section className="py-8">
      <JsonLd data={faqSchema} />
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-semibold text-base">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
