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
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary flex items-center">
          <Home className="w-4 h-4 mr-1" />
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground font-medium">Calculators</span>
      </nav>

      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          All Online Calculators
        </h1>
        <p className="text-xl text-muted-foreground">
          Browse our complete collection of free, easy-to-use calculator tools.
        </p>
      </div>

      <Tabs defaultValue="All" className="mb-12" onValueChange={setActiveCategory}>
        <TabsList className="w-full flex flex-wrap h-auto justify-start gap-2 bg-transparent p-0">
          {categories.map(cat => (
            <TabsTrigger 
              key={cat} 
              value={cat}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6 py-2 h-auto"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
