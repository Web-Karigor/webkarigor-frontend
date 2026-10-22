import { NextResponse } from "next/server";

export const revalidate = 900;

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  if (!/^[a-z0-9-]+$/i.test(slug)) {
    return NextResponse.json(
      { success: false, message: "Invalid page slug" },
      { status: 400 },
    );
  }

  const base = (process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(/\/$/, "");
  if (!base) {
    return NextResponse.json(
      { success: false, message: "NEXT_PUBLIC_BASE_URL is not set" },
      { status: 500 },
    );
  }

  const res = await fetch(`${base}/api/v1/pages/${slug}`, {
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
