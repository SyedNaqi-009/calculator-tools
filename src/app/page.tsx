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
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6 text-primary">
            <Calculator className="w-6 h-6" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto">
            Free Online Calculator Tools
          </h1>
          <p className="text-xl text-muted mb-10 max-w-2xl mx-auto">
            Quick, accurate, and easy-to-use calculators for finance, health, math, and everyday utility.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
            <Link href="/search" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full">
                <Search className="w-5 h-5 mr-2" />
                Find a Calculator
              </Button>
            </Link>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto h-14 px-8 text-lg rounded-full">
              <Link href="/calculators">Browse All</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 space-y-24">
        {/* Popular Calculators */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Most Popular Calculators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCalcs.map(calc => (
              <CalculatorCard key={calc.slug} calculator={calc} />
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-muted/30 rounded-3xl p-8 md:p-12 text-center border border-border">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Choose</h3>
              <p className="text-muted">Select the calculator you need from our extensive collection.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Calculate</h3>
              <p className="text-muted">Enter your values. All calculations are done instantly in your browser.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Analyze</h3>
              <p className="text-muted">View detailed results, charts, and schedules based on your inputs.</p>
            </div>
          </div>
        </section>

        {/* All Calculators Preview */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold">All Calculators</h2>
            <Button variant="ghost" asChild>
              <Link href="/calculators">View All →</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
