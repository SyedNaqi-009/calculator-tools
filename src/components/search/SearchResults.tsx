"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Calculator, BookOpen, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { createSearchIndex, STATIC_SEARCH_ITEMS, SearchItem } from "@/lib/search";

export function SearchResults({
  initialQuery = "",
  query: externalQuery,
}: {
  initialQuery?: string;
  query?: string;
}) {
  const [query, setQuery] = useState(externalQuery ?? initialQuery);
  const [filterType, setFilterType] = useState<"all" | "calculator" | "blog">("all");

  const searchIndex = useMemo(() => createSearchIndex(STATIC_SEARCH_ITEMS), []);

  const results = useMemo(() => {
    let items: SearchItem[] = [];
    if (!query.trim()) {
      items = STATIC_SEARCH_ITEMS;
    } else {
      items = searchIndex.search(query).map((res) => res.item);
    }

    if (filterType !== "all") {
      items = items.filter((item) => item.type === filterType);
    }
    return items;
  }, [query, filterType, searchIndex]);

  return (
    <div className="space-y-8">
      {/* Search Input Bar */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted pointer-events-none" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, category, or keyword..."
          className="pl-12 pr-4 h-14 rounded-2xl bg-card border-border shadow-sm text-base"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          variant={filterType === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterType("all")}
          className="rounded-full"
        >
          All Results ({STATIC_SEARCH_ITEMS.length})
        </Button>
        <Button
          variant={filterType === "calculator" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterType("calculator")}
          className="rounded-full"
        >
          <Calculator className="mr-1.5 h-3.5 w-3.5" />
          Calculators (20)
        </Button>
        <Button
          variant={filterType === "blog" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterType("blog")}
          className="rounded-full"
        >
          <BookOpen className="mr-1.5 h-3.5 w-3.5" />
          Articles & Guides (3)
        </Button>
      </div>

      {/* Result Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {results.length === 0 ? (
          <div className="col-span-full py-16 text-center">
            <h3 className="text-lg font-semibold">No results found</h3>
            <p className="text-muted text-sm mt-1">
              Try adjusting your query or resetting the filters.
            </p>
          </div>
        ) : (
          results.map((item) => (
            <Link key={item.id} href={item.url} className="group block focus:outline-none">
              <Card className="h-full rounded-2xl hover:border-primary/50 hover:shadow-md transition-all duration-200">
                <CardHeader className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-muted uppercase tracking-wider">
                      {item.type === "calculator" ? (
                        <>
                          <Calculator className="h-3.5 w-3.5 text-primary" />
                          <span>Calculator</span>
                        </>
                      ) : (
                        <>
                          <BookOpen className="h-3.5 w-3.5 text-violet-500" />
                          <span>Guide</span>
                        </>
                      )}
                    </span>
                    {item.category && (
                      <Badge variant={item.category as any} className="text-[10px]">
                        {item.category}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors flex items-center justify-between">
                    <span>{item.title}</span>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary shrink-0" />
                  </CardTitle>
                  <CardDescription className="text-xs line-clamp-2 mt-2 leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
