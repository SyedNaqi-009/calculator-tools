import Fuse from "fuse.js";
import { CALCULATORS } from "./constants";

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "calculator" | "blog";
  category?: string;
  tags?: string[];
}

export const STATIC_SEARCH_ITEMS: SearchItem[] = [
  ...CALCULATORS.map((calc) => ({
    id: `calc-${calc.slug}`,
    title: calc.name,
    description: calc.shortDescription,
    url: `/calculators/${calc.slug}/`,
    type: "calculator" as const,
    category: calc.category,
    tags: calc.keywords,
  })),
  {
    id: "blog-how-to-calculate-emi",
    title: "How to Calculate EMI: A Complete Guide to Loan Repayments",
    description: "Learn how Equated Monthly Installments work and the mathematical formula behind them.",
    url: "/blog/how-to-calculate-emi/",
    type: "blog" as const,
    category: "Finance",
    tags: ["EMI", "Loans", "Interest Rates"],
  },
  {
    id: "blog-understanding-compound-interest",
    title: "Understanding Compound Interest: The 8th Wonder of the World",
    description: "Discover why Einstein praised compound interest and how the Rule of 72 works.",
    url: "/blog/understanding-compound-interest/",
    type: "blog" as const,
    category: "Investing",
    tags: ["Compound Interest", "SIP", "Wealth"],
  },
  {
    id: "blog-bmi-chart-guide",
    title: "BMI Chart for Men and Women: What's a Healthy BMI?",
    description: "WHO classifications, how to interpret your BMI number, and clinical caveats.",
    url: "/blog/bmi-chart-guide/",
    type: "blog" as const,
    category: "Health",
    tags: ["BMI", "Fitness", "Weight Loss"],
  },
];

export function createSearchIndex(items: SearchItem[] = STATIC_SEARCH_ITEMS) {
  return new Fuse(items, {
    keys: [
      { name: "title", weight: 0.5 },
      { name: "tags", weight: 0.3 },
      { name: "description", weight: 0.15 },
      { name: "category", weight: 0.05 },
    ],
    threshold: 0.35,
    ignoreLocation: true,
  });
}
