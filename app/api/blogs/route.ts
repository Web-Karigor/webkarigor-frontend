import { NextResponse } from "next/server";

const BLOGS_API = "https://admin.webkarigor.com/api/blogs";

export async function GET() {
  const res = await fetch(BLOGS_API, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  const text = await res.text();
  const contentType = res.headers.get("content-type") || "application/json";

  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": contentType },
  });
}
