"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SearchResults } from "@/components/search/SearchResults";
import { PageSEO } from "@/components/seo";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <>
      <PageSEO 
        title={query ? `Search Results for "${query}" | CalcHub` : "Search Calculators | CalcHub"}
        description="Find calculators and guides on CalcHub."
        url={`/search${query ? `?q=${encodeURIComponent(query)}` : ""}`}
      />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <nav className="text-sm mb-6 text-muted">
          <Link href="/" className="hover:underline">Home</Link> &gt; 
          <span className="ml-1">Search</span>
        </nav>

        <h1 className="text-3xl font-bold mb-8">
          {query ? `Search Results for "${query}"` : "Search All Calculators"}
        </h1>
        
        <div className="bg-background rounded-xl">
          <SearchResults query={query} />
        </div>
      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-16 text-center">Loading search...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
