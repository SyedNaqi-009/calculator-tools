"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Github, Linkedin, Search, Twitter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Record<string, { name: string; href: string }[]>;
}

export default function MobileMenu({ isOpen, onClose, categories }: MobileMenuProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l bg-background shadow-xl overflow-y-auto flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <Link href="/" className="flex items-center gap-2" onClick={onClose}>
                <Calculator className="h-6 w-6 text-primary" />
                <span className="font-bold">CalcHub</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search calculators..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 p-4">
              <nav className="space-y-4">
                <Link href="/" className="block text-lg font-medium">Home</Link>
                
                <div className="space-y-2">
                  <span className="text-lg font-medium block">Calculators</span>
                  <Accordion type="single" collapsible className="w-full pl-4">
                    {Object.entries(categories).map(([category, links]) => (
                      <AccordionItem key={category} value={category} className="border-none">
                        <AccordionTrigger className="py-2 hover:no-underline font-medium text-muted-foreground">
                          {category}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col space-y-2 pb-2">
                            {links.map((link) => (
                              <Link 
                                key={link.href} 
                                href={link.href}
                                className="text-sm text-muted-foreground hover:text-primary transition-colors py-1 block"
                              >
                                {link.name}
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
                
                <Link href="/blog" className="block text-lg font-medium">Blog</Link>
                <Link href="/about" className="block text-lg font-medium">About</Link>
                <Link href="/contact" className="block text-lg font-medium">Contact</Link>
              </nav>
            </div>

            <div className="p-4 border-t mt-auto">
              <div className="flex items-center gap-4 justify-center">
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
