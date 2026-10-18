import { NextResponse } from "next/server";
import type { TeamsPost, TeamsResponse } from "@/types/teams";

function apiUrl(page = 1) {
  const base = (process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(/\/$/, "");
  if (!base) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not set");
  }
  return `${base}/api/v1/post-types/teams?page=${page}`;
}

export async function GET() {
  const firstRes = await fetch(apiUrl(1), {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  const contentType = firstRes.headers.get("content-type") || "application/json";
  if (!firstRes.ok) {
    const text = await firstRes.text();
    return new NextResponse(text, {
      status: firstRes.status,
      headers: { "Content-Type": contentType },
    });
  }

  const first = (await firstRes.json()) as TeamsResponse;
  const lastPage = first.meta?.pagination?.last_page ?? 1;
  const posts: TeamsPost[] = [...(first.data?.posts ?? [])];

  for (let page = 2; page <= lastPage; page += 1) {
    const res = await fetch(apiUrl(page), {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) continue;
    const json = (await res.json()) as TeamsResponse;
    posts.push(...(json.data?.posts ?? []));
  }

  const body: TeamsResponse = {
    ...first,
    data: {
      ...first.data,
      posts,
    },
    meta: {
      pagination: {
        current_page: 1,
        per_page: posts.length,
        total: posts.length,
        last_page: 1,
        next_page_url: null,
        prev_page_url: null,
      },
    },
  };

  return NextResponse.json(body);
}
