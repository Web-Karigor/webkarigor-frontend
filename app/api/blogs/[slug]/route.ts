import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const res = await fetch(
    `https://admin.webkarigor.com/api/blogs/${encodeURIComponent(slug)}`,
    {
      headers: { Accept: "application/json" },
      cache: "no-store",
    },
  );

  const text = await res.text();
  const contentType = res.headers.get("content-type") || "application/json";

  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": contentType },
  });
}
