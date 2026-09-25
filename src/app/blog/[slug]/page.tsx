import fs from "fs";
import path from "path";
import Link from "next/link";
import { PageSEO } from "@/components/seo";
import { AdInArticle } from "@/components/ads";
// Since we are mocking MDX rendering for this static setup, we'll just output the content directly for now.
// In a full setup, you'd use next-mdx-remote/rsc

export function generateStaticParams() {
  return [
    { slug: 'how-to-calculate-emi' },
    { slug: 'understanding-compound-interest' },
    { slug: 'bmi-chart-guide' }
  ];
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const titles: Record<string, string> = {
    'how-to-calculate-emi': 'How to Calculate EMI: A Complete Guide',
    'understanding-compound-interest': 'Understanding Compound Interest',
    'bmi-chart-guide': 'BMI Chart Guide: What Does Your BMI Mean?'
  };
  return {
    title: `${titles[params.slug] || 'Blog Post'} | CalcHub`,
    description: `Read our comprehensive guide on ${titles[params.slug] || params.slug}`
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const titles: Record<string, string> = {
    'how-to-calculate-emi': 'How to Calculate EMI: A Complete Guide',
    'understanding-compound-interest': 'Understanding Compound Interest',
    'bmi-chart-guide': 'BMI Chart Guide: What Does Your BMI Mean?'
  };

  const title = titles[params.slug] || 'Blog Post';

  return (
    <>
      <PageSEO 
        title={`${title} | CalcHub`}
        description={`Read our comprehensive guide on ${title}`}
        url={`/blog/${params.slug}`}
      />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <nav className="text-sm mb-6 text-muted-foreground">
          <Link href="/" className="hover:underline">Home</Link> &gt; 
          <Link href="/blog" className="hover:underline ml-1">Blog</Link> &gt; 
          <span className="ml-1">{title}</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
          <span>By Expert Author</span>
          <span>•</span>
          <span>Published on 2024-03-01</span>
          <span>•</span>
          <span>5 min read</span>
        </div>

        <div className="prose prose-blue dark:prose-invert max-w-none text-lg leading-relaxed">
          <p>
            Welcome to our comprehensive guide on <strong>{title}</strong>. 
            Understanding the underlying math of everyday financial and health metrics is crucial 
            for making informed decisions.
          </p>
          
          <h2>Introduction</h2>
          <p>
            In this post, we break down the complex formulas into easy-to-understand concepts. 
            Whether you are planning a loan, investing for the future, or tracking your health progress, 
            having a solid grasp on the fundamentals can empower you.
          </p>

          <AdInArticle />

          <h2>The Core Concepts</h2>
          <p>
            The formulas used in these calculations are standard mathematical models. Let's look at why they matter:
            <ul>
              <li><strong>Precision:</strong> Ensures your estimates are exactly what you'll encounter in reality.</li>
              <li><strong>Planning:</strong> Helps forecast long-term outcomes for financial or health goals.</li>
              <li><strong>Comparison:</strong> Allows you to compare different scenarios and pick the best option.</li>
            </ul>
          </p>

          <h2>Conclusion</h2>
          <p>
            By using our calculators and understanding these principles, you take charge of your life's essential metrics.
            Check out our related calculators below to put this knowledge into practice!
          </p>
        </div>

        <div className="mt-12 pt-8 border-t">
          <h3 className="text-2xl font-bold mb-4">Share this article</h3>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Twitter</button>
            <button className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900">Facebook</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">LinkedIn</button>
          </div>
        </div>
      </div>
    </>
  );
}
