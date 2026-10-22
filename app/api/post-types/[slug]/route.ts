import { NextResponse } from "next/server";
import { proxyPostType } from "@/lib/proxy-post-type";

export const revalidate = 900;

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  if (!/^[a-z0-9-]+$/i.test(slug)) {
    return NextResponse.json(
      { success: false, message: "Invalid post type slug" },
      { status: 400 },
    );
  }

  return proxyPostType(slug);
}
