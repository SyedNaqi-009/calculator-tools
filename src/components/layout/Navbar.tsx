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
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <Calculator className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold tracking-tight">CalcHub</span>
              </Link>
              
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/" className={cn("text-sm font-medium transition-colors hover:text-primary", pathname === "/" ? "text-primary" : "text-muted-foreground")}>
                  Home
                </Link>
                
                <div 
                  className="relative group"
                  onMouseEnter={() => setIsMegaMenuOpen(true)}
                  onMouseLeave={() => setIsMegaMenuOpen(false)}
                >
                  <button className={cn("flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary", pathname.startsWith("/calculators") ? "text-primary" : "text-muted-foreground")}>
                    Calculators <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {isMegaMenuOpen && (
                    <div className="absolute top-full left-0 pt-4 w-[600px] z-50">
                      <div className="rounded-2xl border bg-card p-6 shadow-xl grid grid-cols-3 gap-6">
                        {Object.entries(CALCULATOR_CATEGORIES).map(([category, links]) => (
                          <div key={category} className="space-y-3">
                            <h4 className="font-semibold text-sm text-foreground">{category}</h4>
                            <ul className="space-y-2">
                              {links.map((link) => (
                                <li key={link.href}>
                                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors block">
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

                <Link href="/blog" className={cn("text-sm font-medium transition-colors hover:text-primary", pathname.startsWith("/blog") ? "text-primary" : "text-muted-foreground")}>
                  Blog
                </Link>
                <Link href="/about" className={cn("text-sm font-medium transition-colors hover:text-primary", pathname === "/about" ? "text-primary" : "text-muted-foreground")}>
                  About
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} aria-label="Search">
                <Search className="h-5 w-5" />
              </Button>
              <CurrencySelector compact className="w-[85px] hidden sm:flex" />
              <ThemeToggle />
              
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(true)} aria-label="Menu">
                <Menu className="h-5 w-5" />
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
