import type { Metadata } from "next";
import BlogArticle from "@/components/blog/BlogArticle";
import { findBlogBySlug, stripHtml } from "@/lib/blog-data";
import type { BlogPostsResponse } from "@/types/blog";

export const revalidate = 900;

type PageProps = {
  params: Promise<{ slug: string }>;
};

function blogApiUrl() {
  const base = (process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(/\/$/, "");
  if (!base) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not set");
  }
  return `${base}/api/v1/post-types/blog`;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await fetch(blogApiUrl(), {
      headers: { Accept: "application/json" },
      next: { revalidate: 900 },
    });
    if (!res.ok) return { title: "Article — Webkarigor" };
    const json = (await res.json()) as BlogPostsResponse;
    const post = findBlogBySlug(json.data?.posts, slug);
    if (!post) return { title: "Article — Webkarigor" };
    return {
      title: `${post.title} — Webkarigor`,
      description:
        post.subtitle ||
        (post.details ? stripHtml(post.details).slice(0, 160) : undefined),
    };
  } catch {
    return { title: "Article — Webkarigor" };
  }
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  return <BlogArticle slug={slug} />;
}
