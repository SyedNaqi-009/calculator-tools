import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost, BlogFrontmatter } from "@/types/blog";

const blogDirectory = path.join(process.cwd(), "content", "blog");

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);
  const posts: BlogPost[] = [];

  for (const fileName of fileNames) {
    if (!fileName.endsWith(".mdx") && !fileName.endsWith(".md")) {
      continue;
    }

    const slug = fileName.replace(/\.mdx?$/, "");
    const fullPath = path.join(blogDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const words = content.trim().split(/\s+/).length;
    const readingTime = `${Math.max(1, Math.ceil(words / 200))} min read`;

    posts.push({
      slug,
      frontmatter: data as BlogFrontmatter,
      content,
      readingTime,
    });
  }

  return posts.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const posts = getAllBlogPosts();
  return posts.find((p) => p.slug === slug) || null;
}
