import { NextResponse } from "next/server";
import { findBlogBySlug } from "@/lib/blog-data";
import type { BlogPostsResponse } from "@/types/blog";

export const revalidate = 900;

function apiUrl() {
  const base = (process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(/\/$/, "");
  if (!base) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not set");
  }
  return `${base}/api/v1/post-types/blog`;
}

/** Resolves a single blog from the post-types/blog listing by slug. */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const res = await fetch(apiUrl(), {
    headers: { Accept: "application/json" },
    next: { revalidate: 900 },
  });

  if (!res.ok) {
    const text = await res.text();
    const contentType = res.headers.get("content-type") || "application/json";
    return new NextResponse(text, {
      status: res.status,
      headers: { "Content-Type": contentType },
    });
  }

  const json = (await res.json()) as BlogPostsResponse;
  const post = findBlogBySlug(json.data?.posts, slug);

  if (!post) {
    return NextResponse.json(
      { success: false, data: [] },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true, data: [post] });
}
