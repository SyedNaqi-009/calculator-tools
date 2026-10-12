"use client";

import { useState } from "react";
import { CALCULATORS } from "@/lib/constants";
import { CalculatorCard } from "@/components/calculators/CalculatorCard";
import { CalculatorCategory } from "@/types/calculator";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export function CalculatorsClient() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Finance", "Health", "Academic", "Utility", "Math"];

  const filteredCalculators = activeCategory === "All"
    ? CALCULATORS
    : CALCULATORS.filter(calc => calc.category === activeCategory as CalculatorCategory);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-muted-foreground mb-6 font-mono">
        <Link href="/" className="hover:text-primary flex items-center transition-colors">
          <Home className="w-3.5 h-3.5 mr-1" />
          OVERVIEW
        </Link>
        <ChevronRight className="w-3.5 h-3.5 opacity-50" />
        <span className="text-foreground font-semibold">ALL CALCULATORS</span>
      </nav>

      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[11px] font-mono mb-3">
          <span>CATALOG INDEX · {CALCULATORS.length} ACTIVE ENGINES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-3">
          Computational Tools Directory
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Filter through our complete suite of client-side financial, health, academic, and mathematical calculators.
        </p>
      </div>

      {/* Segmented Filter Control */}
      <div className="mb-10 pb-6 border-b border-border/80">
        <Tabs defaultValue="All" onValueChange={setActiveCategory}>
          <TabsList className="w-full flex flex-wrap h-auto justify-start gap-1.5 bg-transparent p-0">
            {categories.map(cat => {
              const count = cat === "All" ? CALCULATORS.length : CALCULATORS.filter(c => c.category === cat).length;
              return (
                <TabsTrigger 
                  key={cat} 
                  value={cat}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary border border-border/80 bg-card rounded-lg px-3.5 py-1.5 text-xs font-semibold h-auto transition-all flex items-center gap-2"
                >
                  <span>{cat}</span>
                  <span className="font-mono text-[10px] opacity-70 px-1 py-0.2 rounded bg-black/10 dark:bg-white/10">
                    {count}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        <AnimatePresence>
          {filteredCalculators.map((calc, index) => (
            <motion.div
              key={calc.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <CalculatorCard calculator={calc} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
