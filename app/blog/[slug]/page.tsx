import type { Metadata } from "next";
import BlogArticle from "@/components/blog/BlogArticle";
import { stripHtml } from "@/lib/blog-data";
import type { BlogDetailResponse } from "@/types/blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await fetch(
      `https://admin.webkarigor.com/api/blogs/${encodeURIComponent(slug)}`,
      { headers: { Accept: "application/json" }, next: { revalidate: 300 } },
    );
    if (!res.ok) return { title: "Article — Webkarigor" };
    const json = (await res.json()) as BlogDetailResponse;
    const post = json.data?.[0];
    if (!post) return { title: "Article — Webkarigor" };
    return {
      title: `${post.meta.title ?? post.title} — Webkarigor`,
      description: post.meta.description ?? stripHtml(post.description),
    };
  } catch {
    return { title: "Article — Webkarigor" };
  }
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  return <BlogArticle slug={slug} />;
}
