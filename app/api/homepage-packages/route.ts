import { NextResponse } from "next/server";

const HOMEPAGE_PACKAGES_API = "http://admin.webkarigor.com/api/homepage-packages";

export async function GET() {
  const res = await fetch(HOMEPAGE_PACKAGES_API, {
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
