import { NextResponse } from "next/server";

export const revalidate = 900;

function crmPageApiUrl() {
  const base = (process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(/\/$/, "");
  if (!base) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not set");
  }
  return `${base}/api/v1/pages/crm`;
}

export async function GET() {
  const res = await fetch(crmPageApiUrl(), {
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
