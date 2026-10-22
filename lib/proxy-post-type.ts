import { NextResponse } from "next/server";

export async function proxyPostType(slug: string) {
  const base = (process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(/\/$/, "");
  if (!base) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not set");
  }

  const res = await fetch(`${base}/api/v1/post-types/${slug}`, {
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
