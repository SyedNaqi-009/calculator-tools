import Link from "next/link";
import { BlogPost } from "@/types/blog";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const { title, description, date, category } = post.frontmatter;
  const slug = post.slug || post.frontmatter.slug || "";
  const readingTime = post.readingTime || post.frontmatter.readingTime || "5 min read";

  return (
    <Link href={`/blog/${slug}`}>
      <div className="flex flex-col h-full bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 w-full flex items-center justify-center p-6 text-center">
          <span className="text-sm font-medium text-primary/80">CalcHub Insights</span>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-3 mb-3 text-xs text-muted">
            <Badge variant="secondary">{category}</Badge>
            <span>{new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span>•</span>
            <span>{readingTime}</span>
          </div>
          <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>
          <p className="text-muted text-sm line-clamp-3 mb-4 flex-grow">
            {description}
          </p>
          <div className="mt-auto text-primary text-sm font-medium">
            Read more →
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
