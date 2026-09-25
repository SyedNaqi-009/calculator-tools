export type CalculatorCategory = "Finance" | "Health" | "Academic" | "Utility" | "Math";

export interface CalculatorMeta {
  id?: string;
  slug: string;
  name: string;
  shortDescription: string;
  description?: string;
  longDescription: string;
  category: CalculatorCategory;
  icon: string;
  popular?: boolean;
  keywords: string[];
  relatedSlugs: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface AmortizationRow {
  month: number;
  year?: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}
