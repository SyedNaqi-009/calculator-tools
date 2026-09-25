import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PageSEO } from "@/components/seo";

export default function BlogPage() {
  const posts = [
    {
      title: "How to Calculate EMI: A Complete Guide",
      slug: "how-to-calculate-emi",
      description: "Learn everything you need to know about Equated Monthly Installments and how to calculate them.",
      date: "2024-01-15",
      readingTime: "5 min read",
      author: "Finance Expert"
    },
    {
      title: "Understanding Compound Interest",
      slug: "understanding-compound-interest",
      description: "The magic of compounding explained in simple terms with actionable examples.",
      date: "2024-02-10",
      readingTime: "7 min read",
      author: "Investment Guru"
    },
    {
      title: "BMI Chart Guide: What Does Your BMI Mean?",
      slug: "bmi-chart-guide",
      description: "A comprehensive guide to interpreting Body Mass Index and what it means for your health.",
      date: "2024-03-05",
      readingTime: "6 min read",
      author: "Health Professional"
    }
  ];

  return (
    <>
      <PageSEO 
        title="Blog — Tips, Guides & Calculator Tutorials | CalcHub" 
        description="Read our latest articles on finance, health, math, and practical calculation guides."
        url="/blog"
      />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <nav className="text-sm mb-4 text-muted-foreground">
          <Link href="/" className="hover:underline">Home</Link> &gt; 
          <span className="ml-1">Blog</span>
        </nav>

        <h1 className="text-4xl font-bold mb-4">Blog — Tips, Guides &amp; Calculator Tutorials</h1>
        <p className="text-xl text-muted-foreground mb-12">Insights, tutorials, and practical guides to help you calculate better.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <Link href={`/blog/${post.slug}`} key={post.slug}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <p className="text-sm text-muted-foreground mb-2">{post.date} • {post.readingTime}</p>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{post.description}</CardDescription>
                  <p className="text-sm mt-4 text-primary font-medium">Read more &rarr;</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
