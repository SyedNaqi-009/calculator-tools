import { CALCULATORS } from "@/lib/constants";
import { CalculatorCard } from "./CalculatorCard";

interface RelatedCalculatorsProps {
  currentSlug: string;
  maxItems?: number;
}

export function RelatedCalculators({ currentSlug, maxItems = 4 }: RelatedCalculatorsProps) {
  const currentCalc = CALCULATORS.find(c => c.slug === currentSlug || c.id === currentSlug);
  
  const related = CALCULATORS
    .filter(c => c.slug !== currentSlug && c.id !== currentSlug)
    .sort((a, b) => {
      if (currentCalc && a.category === currentCalc.category && b.category !== currentCalc.category) return -1;
      if (currentCalc && b.category === currentCalc.category && a.category !== currentCalc.category) return 1;
      return 0;
    })
    .slice(0, maxItems);

  if (related.length === 0) return null;

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
      <div className="flex overflow-x-auto pb-4 gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible">
        {related.map(calc => (
          <div key={calc.slug || calc.id} className="min-w-[280px] md:min-w-0">
            <CalculatorCard calculator={calc} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default RelatedCalculators;
