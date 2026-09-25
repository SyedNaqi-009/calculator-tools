import Link from "next/link";
import { Calculator, Github, Linkedin, Twitter } from "lucide-react";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-card border-t text-card-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Calculator className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold tracking-tight">{SITE_NAME}</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {SITE_DESCRIPTION}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Calculators</h3>
            <ul className="space-y-3">
              <li><Link href="/calculators/emi-calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">EMI Calculator</Link></li>
              <li><Link href="/calculators/sip-calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">SIP Calculator</Link></li>
              <li><Link href="/calculators/bmi-calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">BMI Calculator</Link></li>
              <li><Link href="/calculators/age-calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">Age Calculator</Link></li>
              <li><Link href="/calculators/percentage-calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">Percentage Calculator</Link></li>
              <li><Link href="/calculators/compound-interest-calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">Compound Interest</Link></li>
              <li><Link href="/calculators/scientific-calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">Scientific Calculator</Link></li>
              <li><Link href="/calculators/currency-converter" className="text-sm text-muted-foreground hover:text-primary transition-colors">Currency Converter</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/sitemap.xml" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sitemap</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/disclaimer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Disclaimer</Link></li>
              <li><Link href="/cookie-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookie Policy</Link></li>
              <li><Link href="/dmca" className="text-sm text-muted-foreground hover:text-primary transition-colors">DMCA</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <span className="text-destructive">❤️</span> for you
          </p>
        </div>
      </div>
    </footer>
  );
}
