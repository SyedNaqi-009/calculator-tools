import Link from "next/link";
import { Calculator, Github, Linkedin, Twitter } from "lucide-react";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border/80 text-card-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Calculator className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">{SITE_NAME}</span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              {SITE_DESCRIPTION}
            </p>
            <div className="pt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                100% Client-Side Engine
              </span>
              <span className="text-[11px] font-mono text-muted-foreground/70">Zero Tracking</span>
            </div>
            <div className="flex items-center gap-1 pt-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" asChild>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" asChild>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-foreground font-semibold mb-3">Popular Calculators</h3>
            <ul className="space-y-2">
              <li><Link href="/calculators/emi-calculator" className="text-xs text-muted-foreground hover:text-primary transition-colors">EMI Calculator</Link></li>
              <li><Link href="/calculators/sip-calculator" className="text-xs text-muted-foreground hover:text-primary transition-colors">SIP Calculator</Link></li>
              <li><Link href="/calculators/compound-interest-calculator" className="text-xs text-muted-foreground hover:text-primary transition-colors">Compound Interest</Link></li>
              <li><Link href="/calculators/scientific-calculator" className="text-xs text-muted-foreground hover:text-primary transition-colors">Scientific Calculator</Link></li>
              <li><Link href="/calculators/currency-converter" className="text-xs text-muted-foreground hover:text-primary transition-colors">Currency Converter</Link></li>
              <li><Link href="/calculators/gst-calculator" className="text-xs text-muted-foreground hover:text-primary transition-colors">GST Tax Tool</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-foreground font-semibold mb-3">Knowledge & Hub</h3>
            <ul className="space-y-2">
              <li><Link href="/calculators" className="text-xs text-muted-foreground hover:text-primary transition-colors">All 20+ Tools</Link></li>
              <li><Link href="/blog" className="text-xs text-muted-foreground hover:text-primary transition-colors">Engineering & Finance Blog</Link></li>
              <li><Link href="/about" className="text-xs text-muted-foreground hover:text-primary transition-colors">About Our Algorithms</Link></li>
              <li><Link href="/contact" className="text-xs text-muted-foreground hover:text-primary transition-colors">Contact Engineering</Link></li>
              <li><Link href="/sitemap.xml" className="text-xs text-muted-foreground hover:text-primary transition-colors">Sitemap XML</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-foreground font-semibold mb-3">Security & Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="text-xs text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="text-xs text-muted-foreground hover:text-primary transition-colors">Financial Disclaimer</Link></li>
              <li><Link href="/cookie-policy" className="text-xs text-muted-foreground hover:text-primary transition-colors">Cookie Policy</Link></li>
              <li><Link href="/dmca" className="text-xs text-muted-foreground hover:text-primary transition-colors">DMCA Compliance</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p className="font-mono text-[11px]">
            &copy; {new Date().getFullYear()} {SITE_NAME} · High-Precision Client-Side Computation Suite
          </p>
          <p className="text-[11px] flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 rounded-full bg-primary/70 inline-block" />
            Designed for Speed & Accuracy
          </p>
        </div>
      </div>
    </footer>
  );
}
