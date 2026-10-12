import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { CalculatorCard } from "@/components/calculators/CalculatorCard";
import { BlogCard } from "@/components/blog/BlogCard";
import { FAQSection } from "@/components/calculators/FAQSection";
import { NewsletterSignup } from "@/components/shared/NewsletterSignup";
import { CALCULATORS, SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";
import { generateWebSiteJsonLd, generateOrganizationJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Calculator, Search } from "lucide-react";
import Link from "next/link";
import { BlogPost } from "@/types/blog";

export const metadata: Metadata = {
  title: `${SITE_NAME} | ${SITE_DESCRIPTION}`,
  description: "Free online calculators for finance, health, math, and more. Easy to use, accurate, and instant results.",
  alternates: {
    canonical: SITE_URL,
  }
};

const popularCalculators = [
  "emi-calculator",
  "sip-calculator",
  "bmi-calculator",
  "percentage-calculator",
  "age-calculator",
  "gst-calculator"
];
const popularCalcs = CALCULATORS.filter(c => popularCalculators.includes(c.slug));

const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-calculate-emi",
    content: "",
    readingTime: "5 min read",
    frontmatter: {
      title: "How to Calculate EMI: A Complete Guide to Loan Repayments",
      description: "Learn how Equated Monthly Installments work and the mathematical formula behind them.",
      date: "2026-09-20",
      author: "CalcHub Financial Team",
      category: "Finance",
      tags: ["EMI", "Loans"],
      slug: "how-to-calculate-emi",
    }
  },
  {
    slug: "understanding-compound-interest",
    content: "",
    readingTime: "5 min read",
    frontmatter: {
      title: "Understanding Compound Interest: The 8th Wonder of the World",
      description: "Discover why Einstein praised compound interest and how the Rule of 72 works.",
      date: "2026-09-18",
      author: "CalcHub Wealth Advisors",
      category: "Investing",
      tags: ["Compound Interest", "SIP"],
      slug: "understanding-compound-interest",
    }
  },
  {
    slug: "bmi-chart-guide",
    content: "",
    readingTime: "5 min read",
    frontmatter: {
      title: "BMI Chart for Men and Women: What's a Healthy BMI?",
      description: "WHO classifications, how to interpret your BMI number, and clinical caveats.",
      date: "2026-09-15",
      author: "CalcHub Health Editorial",
      category: "Health",
      tags: ["BMI", "Health"],
      slug: "bmi-chart-guide",
    }
  }
];

const homeFaqs = [
  {
    question: "Are all calculators on CalcHub free to use?",
    answer: "Yes, all our calculators are completely free to use with no hidden charges or subscriptions required."
  },
  {
    question: "Do I need to create an account to save my results?",
    answer: "No account is needed! We don't store your personal data. You can easily copy your results or print the page."
  },
  {
    question: "How accurate are the financial calculators?",
    answer: "Our calculators use standard industry formulas. However, they should be used for estimation purposes. Please consult a financial advisor for actual financial planning."
  },
  {
    question: "Can I use CalcHub on my mobile phone?",
    answer: "Yes, CalcHub is fully responsive and works perfectly on smartphones, tablets, and desktop computers."
  },
  {
    question: "How often are new calculators added?",
    answer: "We regularly update our site with new tools based on user feedback. Check our blog for announcements about new calculators."
  },
  {
    question: "Is my data private?",
    answer: "Absolutely. All calculations are performed in your browser. We do not collect or send your calculation inputs to our servers."
  }
];

export default function Home() {
  const websiteSchema = generateWebSiteJsonLd();
  const orgSchema = generateOrganizationJsonLd();

  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={orgSchema} />
      
      {/* Bespoke Fintech Architectural Hero */}
      <section className="relative overflow-hidden border-b border-border/80 bg-background pt-16 pb-16 md:pt-24 md:pb-20">
        <div className="absolute inset-0 tech-grid-pattern opacity-60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background pointer-events-none" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-5xl">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono font-medium mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>FINTECH GRADE COMPUTATION ENGINE</span>
            <span className="text-muted-foreground/60">|</span>
            <span className="text-muted-foreground">ZERO SERVER LATENCY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6 max-w-4xl mx-auto leading-[1.12]">
            High-Precision Calculators for <span className="text-primary underline decoration-primary/30 decoration-wavy decoration-2">Finance, Health & Math</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Execute complex loan amortizations, SIP forecasting, Body Mass Index metrics, and scientific expressions with instant client-side execution.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <Link href="/search" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-11 px-6 text-sm font-semibold rounded-lg shadow-sm gap-2">
                <Search className="w-4 h-4" />
                Find Calculator (⌘K)
              </Button>
            </Link>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto h-11 px-6 text-sm font-semibold rounded-lg">
              <Link href="/calculators">Explore All 20+ Tools</Link>
            </Button>
          </div>

          {/* Metric Bar Ribbon */}
          <div className="mt-14 pt-8 border-t border-border/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="p-3.5 rounded-lg bg-card/60 border border-border/60">
              <div className="font-mono text-xl sm:text-2xl font-bold text-foreground tabular-nums">20+</div>
              <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5">Specialized Tools</div>
            </div>
            <div className="p-3.5 rounded-lg bg-card/60 border border-border/60">
              <div className="font-mono text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">0 ms</div>
              <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5">Server Overhead</div>
            </div>
            <div className="p-3.5 rounded-lg bg-card/60 border border-border/60">
              <div className="font-mono text-xl sm:text-2xl font-bold text-foreground tabular-nums">150+</div>
              <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5">Currencies Supported</div>
            </div>
            <div className="p-3.5 rounded-lg bg-card/60 border border-border/60">
              <div className="font-mono text-xl sm:text-2xl font-bold text-primary tabular-nums">100%</div>
              <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5">Private In-Browser</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Popular Calculators Grid */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">Curated Essentials</span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">Most Utilized Calculators</h2>
            </div>
            <Link href="/calculators" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
              Browse Complete Directory →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {popularCalcs.map(calc => (
              <CalculatorCard key={calc.slug} calculator={calc} />
            ))}
          </div>
        </section>

        {/* Technical Architecture Feature */}
        <section className="relative overflow-hidden rounded-xl border border-border/80 bg-card p-6 sm:p-10">
          <div className="max-w-2xl mb-8">
            <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">Engineered Architecture</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">How Our Computation Works</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              CalcHub is designed from the ground up for strict privacy, zero computational latency, and mathematical precision.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-lg bg-background border border-border/70 space-y-2">
              <div className="w-8 h-8 rounded-md bg-primary/10 text-primary font-mono font-bold flex items-center justify-center text-sm border border-primary/20">01</div>
              <h3 className="text-sm font-bold text-foreground">Client-Side Calculation</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">No inputs leave your device. All mathematical evaluations run directly via local V8 engine pipelines.</p>
            </div>
            <div className="p-5 rounded-lg bg-background border border-border/70 space-y-2">
              <div className="w-8 h-8 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold flex items-center justify-center text-sm border border-emerald-500/20">02</div>
              <h3 className="text-sm font-bold text-foreground">Global Localization</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Automatic currency detection adapts monetary tables to PKR, INR, USD, EUR, GBP or any currency code instantly.</p>
            </div>
            <div className="p-5 rounded-lg bg-background border border-border/70 space-y-2">
              <div className="w-8 h-8 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono font-bold flex items-center justify-center text-sm border border-indigo-500/20">03</div>
              <h3 className="text-sm font-bold text-foreground">High Precision Formulas</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Validated against standard actuarial amortization schedules, WHO body indices, and standard algebraic models.</p>
            </div>
          </div>
        </section>

        {/* Complete Suite Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold">Comprehensive Directory</span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">Full Calculator Suite</h2>
            </div>
            <Button variant="outline" size="sm" asChild className="text-xs">
              <Link href="/calculators">Filter by Category</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CALCULATORS.map(calc => (
              <CalculatorCard key={calc.slug} calculator={calc} />
            ))}
          </div>
        </section>

        {/* Blog Posts */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Latest from the Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_BLOG_POSTS.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/blog">Read More Articles</Link>
            </Button>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection faqs={homeFaqs} />

        {/* Newsletter CTA */}
        <NewsletterSignup />
      </div>
    </>
  );
}
