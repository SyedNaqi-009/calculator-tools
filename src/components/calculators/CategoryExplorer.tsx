"use client";

import { useState } from "react";
import Link from "next/link";
import { CALCULATORS } from "@/lib/constants";
import { CalculatorMeta, CalculatorCategory } from "@/types/calculator";
import { 
  BadgePercent, TrendingUp, Activity, Percent, Calendar, 
  Receipt, CreditCard, Landmark, Coins, DollarSign, Tag, PieChart, 
  Flame, CalendarRange, GraduationCap, Award, Scale, RefreshCw, Clock,
  Calculator, LucideIcon, ArrowUpRight, Sparkles, Filter, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  BadgePercent, TrendingUp, Activity, Percent, Calendar,
  Receipt, CreditCard, Landmark, Coins, DollarSign, Tag, PieChart,
  Flame, CalendarRange, GraduationCap, Award, Scale, RefreshCw, Clock,
  Calculator
};

interface CategoryTab {
  id: "All" | CalculatorCategory;
  label: string;
  count: number;
  badge: string;
  accent: string;
}

export function CategoryExplorer() {
  const [activeCategory, setActiveCategory] = useState<"All" | CalculatorCategory>("All");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const categories: CategoryTab[] = [
    { id: "All", label: "Complete Suite", count: CALCULATORS.length, badge: "20 Tools", accent: "primary" },
    { id: "Finance", label: "Financial Amortization", count: CALCULATORS.filter(c => c.category === "Finance").length, badge: "8 Models", accent: "blue" },
    { id: "Math", label: "Mathematics & Ratios", count: CALCULATORS.filter(c => c.category === "Math").length, badge: "3 Engines", accent: "cyan" },
    { id: "Health", label: "Health & Metabolism", count: CALCULATORS.filter(c => c.category === "Health").length, badge: "2 Indices", accent: "emerald" },
    { id: "Utility", label: "Time & Conversions", count: CALCULATORS.filter(c => c.category === "Utility").length, badge: "5 Modules", accent: "amber" },
    { id: "Academic", label: "Academic Grading", count: CALCULATORS.filter(c => c.category === "Academic").length, badge: "2 Systems", accent: "purple" },
  ];

  const displayedCalculators = activeCategory === "All"
    ? CALCULATORS
    : CALCULATORS.filter(c => c.category === activeCategory);

  return (
    <section className="relative my-4" aria-labelledby="catalog-explorer-heading">
      {/* Section Header with Technical Telemetry */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-6 border-b border-border/80">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-[11px] uppercase tracking-wider text-primary">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span>Interactive Catalog Architecture</span>
            <span className="text-muted-foreground/40">/</span>
            <span className="text-muted-foreground font-normal">Deterministic V8 Engine</span>
          </div>
          <h2 id="catalog-explorer-heading" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Modular Calculation Navigator
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
            Filter mathematical instruments by functional category or inspect all modules in the interactive index.
          </p>
        </div>

        {/* Global Stats Tag */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/80 bg-card/60 font-mono text-xs">
            <Filter className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">Showing:</span>
            <span className="font-semibold text-foreground">{displayedCalculators.length} Modules</span>
          </div>
          <Link
            href="/calculators"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <span>Full Directory</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Split Navigation Architecture: Left Category Rail + Right Interactive Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Category Rail (4 Cols) */}
        <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none" role="tablist">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "group relative flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-150 min-w-[200px] lg:min-w-0 w-full",
                  isActive
                    ? "bg-card border-primary/60 shadow-[0_4px_16px_-4px_rgba(37,75,208,0.15)] dark:shadow-[0_4px_20px_-4px_rgba(59,102,255,0.2)] text-foreground"
                    : "bg-card/40 border-border/60 hover:border-border hover:bg-card text-muted-foreground hover:text-foreground"
                )}
              >
                {/* Active Indicator Bar on desktop */}
                <div 
                  className={cn(
                    "hidden lg:block absolute left-0 top-2 bottom-2 w-1 rounded-r transition-all",
                    isActive ? "bg-primary opacity-100" : "opacity-0 group-hover:opacity-40 bg-muted-foreground"
                  )} 
                />

                <div className="flex flex-col pl-0 lg:pl-2.5">
                  <span className="text-xs sm:text-sm font-bold tracking-tight text-foreground flex items-center gap-2">
                    {cat.label}
                    {cat.id === "Finance" && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-primary/10 text-primary font-mono font-medium">HOT</span>
                    )}
                  </span>
                  <span className="text-[11px] font-mono text-muted-foreground mt-0.5">
                    {cat.badge}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={cn(
                    "font-mono text-xs font-semibold px-2 py-0.5 rounded-md tabular-nums transition-colors",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-muted-foreground group-hover:text-foreground"
                  )}>
                    {cat.count}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Tools Deck (8 Cols) - Tabular Grid Layout */}
        <div className="lg:col-span-8 bg-card/40 border border-border/80 rounded-xl p-4 sm:p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/60">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-muted-foreground uppercase tracking-wider text-[11px]">ACTIVE SECTION:</span>
              <span className="font-bold text-foreground">
                {categories.find(c => c.id === activeCategory)?.label}
              </span>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground/70 hidden sm:inline-block">
              CLICK MODULE TO LAUNCH ENGINE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {displayedCalculators.map((calc, idx) => {
              const Icon = ICON_MAP[calc.icon] || Calculator;
              const isHovered = hoveredSlug === calc.slug;

              return (
                <Link
                  key={calc.slug}
                  href={`/calculators/${calc.slug}`}
                  onMouseEnter={() => setHoveredSlug(calc.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                  className="group relative flex flex-col justify-between p-4 rounded-lg border border-border/60 bg-card hover:border-primary/50 hover:bg-card hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_16px_-4px_rgba(59,102,255,0.12)] transition-all duration-150"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="p-2 rounded-md bg-secondary text-primary border border-border/50 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-150">
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] text-muted-foreground/60">
                          #{String(idx + 1).padStart(2, "0")}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150" />
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors tracking-tight mb-1">
                      {calc.name}
                    </h3>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {calc.shortDescription}
                    </p>
                  </div>

                  <div className="mt-3.5 pt-2.5 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-muted-foreground/80">
                    <span className="text-[10px] uppercase tracking-wider">
                      {calc.category}
                    </span>
                    <span className="font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      EXECUTE →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategoryExplorer;
