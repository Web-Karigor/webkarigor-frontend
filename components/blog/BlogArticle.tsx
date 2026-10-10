"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useBlogQuery } from "@/hooks/queries/useBlogQuery";
import { useBlogsQuery } from "@/hooks/queries/useBlogsQuery";
import { formatBlogDate, stripHtml } from "@/lib/blog-data";
import type { Blog } from "@/types/blog";
import BlogShare from "./BlogShare";
import "./BlogRelated.css";

const RELATED_COUNT = 3;

function BackLink() {
  return (
    <Link
      href="/blog"
      className="inline-flex h-10 items-center gap-2 rounded-full bg-[#FFE14A] px-4 font-montserrat text-[14px] font-semibold leading-none text-[#111] transition-colors hover:bg-[#f5d63a] sm:h-11 sm:px-5 sm:text-[15px]"
    >
      <ArrowLeft className="h-4 w-4" strokeWidth={2.5} aria-hidden />
      Back to Blogs
    </Link>
  );
}

function RelatedBlogCard({ post }: { post: Blog }) {
  return (
    <article className="related-blog-flip relative aspect-[3/4]">
      <Link
        href={`/blog/${post.slug}`}
        className="related-blog-flip-link block h-full w-full outline-none"
        aria-label={post.title}
      >
        <div className="related-blog-flip-inner">
          <div className="related-blog-flip-face related-blog-flip-front">
            <div className="relative h-full w-full overflow-hidden rounded-[16px] bg-[#F4F1E8]">
              <Image
                src={post.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 340px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="related-blog-flip-face related-blog-flip-back">
            <p className="m-0 min-h-0 overflow-y-auto font-montserrat text-[14px] font-medium leading-[1.75] text-[#6d6d6d] sm:text-[15px]">
              {stripHtml(post.description)}
            </p>
            <span className="mt-6 inline-flex shrink-0 items-center gap-1.5 self-end font-montserrat text-[14px] font-semibold text-[#111] sm:text-[15px]">
              Read Blog
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function ArticleSkeleton() {
  return (
    <div aria-busy="true" className="mt-6 sm:mt-7">
      <div className="h-10 w-full animate-pulse rounded bg-[#EFE9DC]" />
      <div className="mt-3 h-10 w-2/3 animate-pulse rounded bg-[#EFE9DC]" />
      <div className="mt-6 h-5 w-1/2 animate-pulse rounded bg-[#EFE9DC]" />
      <div className="mt-8 aspect-[16/9] animate-pulse rounded-[18px] bg-[#EFE9DC]" />
    </div>
  );
}

export default function BlogArticle({ slug }: { slug: string }) {
  const { data, isLoading, isError } = useBlogQuery(slug);
  const { data: listData } = useBlogsQuery();

  const post = data?.data?.[0];
  const related = (listData?.data ?? [])
    .filter((item) => item.slug !== slug)
    .slice(0, RELATED_COUNT);

  return (
    <article className="bg-[#FFFDF6] pb-16 pt-[112px] sm:pb-20 sm:pt-[132px] lg:pb-24 lg:pt-[156px]">
      <div className="mx-auto w-full max-w-[820px] px-[clamp(16px,4vw,40px)]">
        <header>
          <BackLink />

          {isLoading ? (
            <ArticleSkeleton />
          ) : isError || !post ? (
            <p className="m-0 mt-10 font-montserrat text-[16px] font-medium text-[#6b7280]">
              This article could not be found.
            </p>
          ) : (
            <>
              <h1 className="m-0 mt-6 font-montserrat text-[clamp(30px,4.2vw,44px)] font-extrabold leading-[1.12] tracking-[-0.035em] text-[#111] sm:mt-7">
                {post.title}
              </h1>
              <div
                className="mt-4 font-montserrat text-[16px] font-medium leading-[1.55] text-[#8d8d8d] sm:mt-5 sm:text-[18px] [&_a]:underline [&_p]:m-0 [&_p+p]:mt-3"
                dangerouslySetInnerHTML={{ __html: post.description }}
              />
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#E4E0D6] pt-4 sm:mt-7">
                <p className="m-0 font-montserrat text-[13px] font-medium text-[#8d8d8d] sm:text-[15px]">
                  {post.author}
                  <span className="px-2 text-[#c4c4c4]" aria-hidden="true">
                    |
                  </span>
                  <time dateTime={post.published_at}>
                    {formatBlogDate(post.published_at)}
                  </time>
                </p>
                <BlogShare title={post.title} />
              </div>
            </>
          )}
        </header>

        {post ? (
          <figure className="m-0 mt-6 sm:mt-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[18px] bg-[#EFE9DC]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 760px) 100vw, 760px"
                className="object-cover"
              />
            </div>
          </figure>
        ) : null}
      </div>

      {related.length > 0 ? (
        <section className="mx-auto mt-12 w-full max-w-[1120px] px-[clamp(16px,4vw,40px)] sm:mt-16 md:mt-20">
          <Link
            href={`/blog/${related[0].slug}`}
            className="blog-next mx-auto flex w-full items-center justify-center gap-2 px-4 py-5 font-montserrat text-[11px] font-medium tracking-[0.08em] text-[#3F3C34] uppercase sm:gap-3 sm:px-8 sm:py-6 sm:text-[13px] sm:tracking-[0.14em]"
          >
            <span className="blog-next-text inline-flex items-center gap-2 sm:gap-3">
              <span className="blog-next-label">Read next blog</span>
              <ArrowRight className="blog-next-icon h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={2} />
            </span>
          </Link>
          <h2 className="m-0 mt-10 font-montserrat text-[22px] font-bold tracking-[-0.03em] text-[#111] sm:mt-14 sm:text-[26px] md:mt-16">
            Related Blogs
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:mt-6 md:grid-cols-3 md:gap-5">
            {related.map((item) => (
              <RelatedBlogCard key={item.slug} post={item} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
