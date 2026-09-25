import { JsonLd } from "./JsonLd";
import { FAQItem } from "@/types/calculator";
import {
  generateWebApplicationJsonLd,
  generateFAQPageJsonLd,
  generateBreadcrumbJsonLd,
} from "@/lib/seo";

export interface PageSEOProps {
  name?: string;
  title?: string;
  slug?: string;
  url?: string;
  description: string;
  category?: string;
  breadcrumbs?: { name: string; url: string }[];
  faqs?: FAQItem[];
}

export function PageSEO({
  name,
  title,
  slug,
  url,
  description,
  category = "CalculatorApplication",
  breadcrumbs,
  faqs,
}: PageSEOProps) {
  const pageName = name || title || "Calculator";
  const pageSlug = slug || (url ? url.replace(/^\//, "") : "");

  const schemas: Record<string, unknown>[] = [];

  if (pageSlug) {
    schemas.push(generateWebApplicationJsonLd(pageName, pageSlug, description, category));
  }

  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push(generateBreadcrumbJsonLd(breadcrumbs));
  }

  if (faqs && faqs.length > 0) {
    schemas.push(generateFAQPageJsonLd(faqs));
  }

  return <JsonLd data={schemas} />;
}

export default PageSEO;
