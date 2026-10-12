"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Calculator, ChevronDown, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { CurrencySelector } from "@/components/shared/CurrencySelector";
import SearchModal from "@/components/search/SearchModal";
import MobileMenu from "@/components/layout/MobileMenu";
import { cn } from "@/lib/utils";

const CALCULATOR_CATEGORIES = {
  Finance: [
    { name: "EMI Calculator", href: "/calculators/emi-calculator" },
    { name: "Loan Calculator", href: "/calculators/loan-calculator" },
    { name: "SIP Calculator", href: "/calculators/sip-calculator" },
    { name: "FD Calculator", href: "/calculators/fd-calculator" },
    { name: "Compound Interest", href: "/calculators/compound-interest-calculator" },
    { name: "Simple Interest", href: "/calculators/simple-interest-calculator" },
    { name: "GST Calculator", href: "/calculators/gst-calculator" },
    { name: "Profit Margin", href: "/calculators/profit-margin-calculator" },
  ],
  Health: [
    { name: "BMI Calculator", href: "/calculators/bmi-calculator" },
    { name: "Calorie Calculator", href: "/calculators/calorie-calculator" },
  ],
  Academic: [
    { name: "GPA Calculator", href: "/calculators/gpa-calculator" },
    { name: "CGPA Calculator", href: "/calculators/cgpa-calculator" },
  ],
  Utility: [
    { name: "Age Calculator", href: "/calculators/age-calculator" },
    { name: "Days Between Dates", href: "/calculators/days-between-dates-calculator" },
    { name: "Unit Converter", href: "/calculators/unit-converter" },
    { name: "Currency Converter", href: "/calculators/currency-converter" },
    { name: "Time Calculator", href: "/calculators/time-calculator" },
  ],
  Math: [
    { name: "Percentage Calculator", href: "/calculators/percentage-calculator" },
    { name: "Discount Calculator", href: "/calculators/discount-calculator" },
    { name: "Scientific Calculator", href: "/calculators/scientific-calculator" },
  ],
};

export default function Navbar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/90 backdrop-blur-md transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="h-9 w-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
                  <Calculator className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold tracking-tight text-foreground flex items-center gap-1.5 leading-none">
                    CalcHub
                    <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 rounded bg-primary/10 text-primary border border-primary/20">v2.0</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground tracking-wider uppercase font-mono mt-0.5">Precision Suite</span>
                </div>
              </Link>
              
              <nav className="hidden md:flex items-center gap-1">
                <Link 
                  href="/" 
                  className={cn(
                    "text-xs font-semibold px-3 py-1.5 rounded-md transition-colors", 
                    pathname === "/" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  )}
                >
                  Overview
                </Link>
                
                <div 
                  className="relative group"
                  onMouseEnter={() => setIsMegaMenuOpen(true)}
                  onMouseLeave={() => setIsMegaMenuOpen(false)}
                >
                  <button 
                    className={cn(
                      "flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-md transition-colors", 
                      pathname.startsWith("/calculators") ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                    )}
                  >
                    Calculators <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                  </button>
                  
                  {isMegaMenuOpen && (
                    <div className="absolute top-full left-0 pt-2 w-[640px] z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                      <div className="rounded-xl border border-border bg-card p-6 shadow-xl grid grid-cols-3 gap-6">
                        {Object.entries(CALCULATOR_CATEGORIES).map(([category, links]) => (
                          <div key={category} className="space-y-2.5">
                            <h4 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                              {category}
                            </h4>
                            <ul className="space-y-1.5">
                              {links.map((link) => (
                                <li key={link.href}>
                                  <Link 
                                    href={link.href} 
                                    className="text-xs text-foreground/80 hover:text-primary transition-colors block py-0.5 hover:translate-x-0.5 transform duration-100"
                                  >
                                    {link.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Link 
                  href="/blog" 
                  className={cn(
                    "text-xs font-semibold px-3 py-1.5 rounded-md transition-colors", 
                    pathname.startsWith("/blog") ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  )}
                >
                  Insights & Guides
                </Link>
                <Link 
                  href="/about" 
                  className={cn(
                    "text-xs font-semibold px-3 py-1.5 rounded-md transition-colors", 
                    pathname === "/about" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  )}
                >
                  About
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsSearchOpen(true)} 
                className="h-8 px-2.5 text-xs text-muted-foreground hidden sm:flex items-center gap-2 border-border/80 bg-background/50 hover:bg-secondary"
                aria-label="Search calculators"
              >
                <Search className="h-3.5 w-3.5" />
                <span>Search tools...</span>
                <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1 font-mono text-[9px] font-medium text-muted-foreground">⌘K</kbd>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSearchOpen(true)} 
                className="sm:hidden h-8 w-8"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </Button>
              <CurrencySelector compact className="w-[82px] h-8 text-[11px]" />
              <ThemeToggle />
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden h-8 w-8" 
                onClick={() => setIsMobileMenuOpen(true)} 
                aria-label="Menu"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      {isMobileMenuOpen && (
        <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} categories={CALCULATOR_CATEGORIES} />
      )}
    </>
  );
}
