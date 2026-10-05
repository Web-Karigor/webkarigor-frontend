import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticle from "@/components/blog/BlogArticle";
import { getAllBlogSlugs, getBlogPost, getRelatedPosts } from "@/lib/blog-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Article — Webkarigor" };
  return {
    title: `${post.title} — Webkarigor`,
    description: post.excerpt,
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return <BlogArticle post={post} related={getRelatedPosts(slug)} />;
}
