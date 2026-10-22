import { NextResponse } from "next/server";

export const revalidate = 900;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const res = await fetch(`http://admin.webkarigor.com/api/service/${slug}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 900 },
  });

  const text = await res.text();
  const contentType = res.headers.get("content-type") || "application/json";

  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": contentType },
  });
}
