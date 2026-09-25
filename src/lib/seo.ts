import { SITE_NAME, SITE_URL } from "./constants";
import { FAQItem } from "@/types/calculator";
import { BlogPost } from "@/types/blog";

export function getCanonicalUrl(path = ""): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

export function generateWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    sameAs: [
      "https://twitter.com/calchub",
      "https://github.com/calchub/calctools",
      "https://linkedin.com/company/calchub",
    ],
  };
}

export function generateWebApplicationJsonLd(
  name: string,
  slug: string,
  description: string,
  category = "CalculatorApplication"
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url: getCanonicalUrl(`/calculators/${slug}`),
    applicationCategory: category,
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function generateFAQPageJsonLd(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : getCanonicalUrl(item.url),
    })),
  };
}

export function generateArticleJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    author: {
      "@type": "Person",
      name: post.frontmatter.author,
    },
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getCanonicalUrl(`/blog/${post.slug}`),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.svg`,
      },
    },
  };
}
