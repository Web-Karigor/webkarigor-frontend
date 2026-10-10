"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useBlogsQuery } from "@/hooks/queries/useBlogsQuery";
import { BLOG_PAGE } from "@/lib/blog-data";

const PAGE_SIZE = 4;

export default function BlogList() {
  const { data, isLoading, isError } = useBlogsQuery();
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const posts = useMemo(() => {
    const all = data?.data ?? [];
    const needle = query.trim().toLowerCase();
    if (!needle) return all;
    return all.filter((post) => post.title.toLowerCase().includes(needle));
  }, [data, query]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query]);

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <section className="relative overflow-hidden bg-[#FFFDF6] pb-16 pt-[112px] sm:pb-20 sm:pt-[132px] lg:pb-28 lg:pt-[156px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[320px]"
        style={{
          background:
            "radial-gradient(ellipse 52% 100% at 50% 0%, #F3FDE6 0%, rgba(255,253,246,0) 72%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-[clamp(16px,4vw,40px)]">
        <header className="mx-auto max-w-[760px] text-center">
          <p className="m-0 font-montserrat text-[clamp(18px,2vw,22px)] font-medium italic leading-none text-[#3EE49F]">
            {BLOG_PAGE.eyebrow}
          </p>
          <h1 className="m-0 mt-4 font-montserrat text-[clamp(34px,4.6vw,58px)] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#1F1E1C] sm:mt-5">
            {BLOG_PAGE.titleLead}
            <br />
            {BLOG_PAGE.titleRest}
          </h1>

          <form
            role="search"
            className="mx-auto mt-7 w-full max-w-[420px] sm:mt-9"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="flex h-12 items-center gap-2.5 rounded-full bg-[#FFFAE9] px-5 sm:h-[52px]">
              <Search
                className="h-[18px] w-[18px] shrink-0 text-[#A3A2A0]"
                strokeWidth={2}
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search"
                aria-label="Search articles"
                className="h-full w-full bg-transparent font-montserrat text-[15px] font-medium text-[#1F1E1C] outline-none placeholder:text-[#A3A2A0] [&::-webkit-search-cancel-button]:cursor-pointer"
              />
            </label>
          </form>
        </header>

        {isLoading ? (
          <ul
            aria-busy="true"
            className="m-0 mt-10 grid list-none grid-cols-1 gap-x-6 gap-y-8 p-0 sm:mt-12 md:grid-cols-2 md:gap-x-7 md:gap-y-10"
          >
            {Array.from({ length: 2 }).map((_, index) => (
              <li key={index}>
                <div className="aspect-[5/3] animate-pulse rounded-[18px] bg-[#EFE9DC]" />
                <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-[#EFE9DC]" />
              </li>
            ))}
          </ul>
        ) : isError ? (
          <p className="mx-auto mt-16 max-w-md text-center font-montserrat text-[15px] font-medium text-[#6b7280]">
            Articles could not be loaded. Please try again shortly.
          </p>
        ) : visiblePosts.length > 0 ? (
          <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-x-6 gap-y-8 p-0 sm:mt-12 md:grid-cols-2 md:gap-x-7 md:gap-y-10">
            {visiblePosts.map((post, index) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="relative aspect-[5/3] overflow-hidden rounded-[18px] bg-[#EFE9DC]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 768px) 100vw, 520px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <h2 className="m-0 mt-3 font-montserrat text-[15px] font-bold leading-[1.35] text-[#1F1E1C] sm:text-[16px]">
                    {post.title}
                  </h2>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mx-auto mt-16 max-w-md text-center font-montserrat text-[15px] font-medium text-[#6b7280]">
            {query.trim() ? "No articles match that search." : "No articles yet."}
          </p>
        )}

        {hasMore ? (
          <div className="mt-12 flex justify-center sm:mt-16">
            <button
              type="button"
              onClick={() =>
                setVisibleCount((count) =>
                  Math.min(count + PAGE_SIZE, posts.length),
                )
              }
              className="rounded-[16px] border-[1.5px] border-[#111] bg-transparent px-12 py-3.5 font-montserrat text-[17px] font-bold leading-none text-[#111] transition-colors hover:bg-[#111]/[0.04] sm:px-14 sm:py-4 sm:text-[18px]"
            >
              Load More Blogs
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
