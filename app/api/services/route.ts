import { NextResponse } from "next/server";

export const revalidate = 900;

const SERVICES_API = "http://admin.webkarigor.com/api/services";

export async function GET() {
  const res = await fetch(SERVICES_API, {
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
