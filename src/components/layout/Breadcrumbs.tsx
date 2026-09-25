import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { generateBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export interface BreadcrumbItem {
  label?: string;
  name?: string;
  href?: string;
  url?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const formattedItems = items.map((item) => ({
    name: item.name || item.label || "",
    url: item.url || item.href || "/",
  }));

  return (
    <>
      <JsonLd data={generateBreadcrumbJsonLd(formattedItems)} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="flex items-center hover:text-primary transition-colors">
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </Link>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const label = item.label || item.name || "";
            const href = item.href || item.url || "/";

            return (
              <li key={`${href}-${index}`} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4" />
                {isLast ? (
                  <span className="font-medium text-foreground" aria-current="page">
                    {label}
                  </span>
                ) : (
                  <Link href={href} className="hover:text-primary transition-colors">
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

export default Breadcrumbs;
