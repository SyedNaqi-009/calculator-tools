import Link from "next/link";
import { PageSEO } from "@/components/seo";

export default function AboutPage() {
  return (
    <>
      <PageSEO 
        title="About CalcHub - Your Trusted Calculator Platform"
        description="Learn more about CalcHub's mission to provide accurate, easy-to-use, and free calculators for everyone."
        url="/about"
      />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <nav className="text-sm mb-6 text-muted-foreground">
          <Link href="/" className="hover:underline">Home</Link> &gt; 
          <span className="ml-1">About</span>
        </nav>

        <div className="prose prose-blue dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-4">About CalcHub</h1>
          <p className="text-sm text-muted-foreground mb-8">Last Updated: March 2024</p>

          <p className="text-xl">
            Welcome to CalcHub, your ultimate destination for accurate, free, and easy-to-use online calculators.
          </p>

          <h2>Our Mission</h2>
          <p>
            At CalcHub, we believe that complex math shouldn't be a barrier to making informed decisions. Our mission is to simplify calculations for students, professionals, and everyday users. Whether you're trying to figure out your monthly mortgage payments, converting tricky units for a recipe, or determining your health metrics, we are here to provide tools that you can trust.
          </p>

          <h2>What We Offer</h2>
          <p>
            We have developed a comprehensive suite of calculators across various categories:
          </p>
          <ul>
            <li><strong>Financial Calculators:</strong> EMI, SIP, Loan, Compound Interest, Fixed Deposit, and more.</li>
            <li><strong>Health & Fitness:</strong> BMI, Calorie, Age calculators designed to help you stay on track.</li>
            <li><strong>Math & Academic:</strong> Scientific calculators, GPA, CGPA, and Percentage tools for students and professionals.</li>
            <li><strong>Utility Tools:</strong> Unit Converters, Currency Converters, Time Difference, and Days Between dates.</li>
          </ul>

          <h2>Why Trust CalcHub?</h2>
          <p>
            Our calculators are built using standard, universally accepted mathematical formulas. We test our tools rigorously to ensure they return accurate results quickly. Additionally, we are committed to user privacy. Our tools run directly in your browser, meaning your personal data never leaves your device unless explicitly stated (like API calls for real-time currency rates).
          </p>

          <h2>The Team</h2>
          <p>
            CalcHub is developed by a dedicated team of software engineers, financial analysts, and designers who are passionate about creating high-quality, accessible software. We are constantly updating our platform based on user feedback to add new features and improve existing ones.
          </p>

          <h2>Get in Touch</h2>
          <p>
            Have a suggestion for a new calculator or found a bug? We'd love to hear from you! Visit our <Link href="/contact">Contact Page</Link> to drop us a message.
          </p>
        </div>
      </div>
    </>
  );
}
