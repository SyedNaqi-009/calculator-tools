"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Calculator, BookOpen, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createSearchIndex, STATIC_SEARCH_ITEMS, SearchItem } from "@/lib/search";
import { useDebounce } from "@/hooks/useDebounce";
import { Badge } from "@/components/ui/badge";

interface SearchModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function SearchModal({
  open,
  onOpenChange,
  isOpen,
  onClose,
}: SearchModalProps) {
  const isModalOpen = open ?? isOpen ?? false;
  const setModalOpen = (state: boolean) => {
    onOpenChange?.(state);
    if (!state && onClose) {
      onClose();
    }
  };

  const router = useRouter();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const searchIndex = useMemo(() => createSearchIndex(STATIC_SEARCH_ITEMS), []);

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return STATIC_SEARCH_ITEMS.slice(0, 8);
    }
    return searchIndex.search(debouncedQuery).map((res) => res.item);
  }, [debouncedQuery, searchIndex]);

  const calculators = results.filter((item) => item.type === "calculator");
  const blogs = results.filter((item) => item.type === "blog");
  const flattened = [...calculators, ...blogs];

  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setModalOpen(!isModalOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const handleSelect = (item: SearchItem) => {
    setModalOpen(false);
    router.push(item.url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < flattened.length ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : flattened.length - 1));
    } else if (e.key === "Enter" && flattened[selectedIndex]) {
      e.preventDefault();
      handleSelect(flattened[selectedIndex]);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden border-border bg-card">
        <DialogHeader className="p-4 border-b border-border">
          <DialogTitle className="sr-only">Search Calculators and Guides</DialogTitle>
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-muted pointer-events-none" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search 20+ calculators, formulas, guides (e.g. EMI, BMI, GST)..."
              className="pl-10 pr-12 h-12 border-0 bg-transparent shadow-none text-base focus-visible:ring-0"
              autoFocus
            />
            <kbd className="hidden sm:inline-block absolute right-3 px-2 py-0.5 text-[10px] font-medium text-muted bg-secondary rounded border border-border">
              ESC
            </kbd>
          </div>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {flattened.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm text-muted">No calculators or articles matched &ldquo;{query}&rdquo;.</p>
              <p className="mt-1 text-xs text-muted/70">Try searching for keywords like loan, percent, weight, or age.</p>
            </div>
          ) : (
            <>
              {calculators.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                    <Calculator className="h-3.5 w-3.5" />
                    <span>Calculators</span>
                  </div>
                  <div className="space-y-1">
                    {calculators.map((calc) => {
                      const overallIdx = flattened.indexOf(calc);
                      const isSelected = overallIdx === selectedIndex;
                      return (
                        <div
                          key={calc.id}
                          onClick={() => handleSelect(calc)}
                          onMouseEnter={() => setSelectedIndex(overallIdx)}
                          className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                            isSelected
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "hover:bg-secondary text-foreground"
                          }`}
                        >
                          <div className="flex-1 pr-3">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{calc.title}</span>
                              {calc.category && (
                                <Badge
                                  variant="outline"
                                  className={`text-[10px] py-0 px-2 ${
                                    isSelected ? "border-white/30 text-white" : ""
                                  }`}
                                >
                                  {calc.category}
                                </Badge>
                              )}
                            </div>
                            <p
                              className={`text-xs mt-0.5 line-clamp-1 ${
                                isSelected ? "text-primary-foreground/80" : "text-muted"
                              }`}
                            >
                              {calc.description}
                            </p>
                          </div>
                          <ArrowRight
                            className={`h-4 w-4 shrink-0 transition-transform ${
                              isSelected ? "translate-x-1" : "opacity-40"
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {blogs.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>Guides & Articles</span>
                  </div>
                  <div className="space-y-1">
                    {blogs.map((b) => {
                      const overallIdx = flattened.indexOf(b);
                      const isSelected = overallIdx === selectedIndex;
                      return (
                        <div
                          key={b.id}
                          onClick={() => handleSelect(b)}
                          onMouseEnter={() => setSelectedIndex(overallIdx)}
                          className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                            isSelected
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "hover:bg-secondary text-foreground"
                          }`}
                        >
                          <div className="flex-1 pr-3">
                            <span className="font-medium text-sm">{b.title}</span>
                            <p
                              className={`text-xs mt-0.5 line-clamp-1 ${
                                isSelected ? "text-primary-foreground/80" : "text-muted"
                              }`}
                            >
                              {b.description}
                            </p>
                          </div>
                          <ArrowRight
                            className={`h-4 w-4 shrink-0 transition-transform ${
                              isSelected ? "translate-x-1" : "opacity-40"
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-2.5 bg-secondary/40 border-t border-border text-[11px] text-muted">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 bg-card rounded border border-border">↑</kbd>{" "}
              <kbd className="px-1.5 py-0.5 bg-card rounded border border-border">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-card rounded border border-border">↵</kbd> to select
            </span>
          </div>
          <span>Powered by Fuzzy Search</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SearchModal;
