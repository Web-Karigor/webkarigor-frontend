import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import {
  formatBlogDate,
  formatBlogReadTime,
  type BlogBlock,
  type BlogPost,
} from "@/lib/blog-data";
import BlogShare from "./BlogShare";
import "./BlogRelated.css";

function ArticleFigure({
  src,
  alt,
  priority = false,
  className = "mt-8",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`${className} m-0`}>
      <div className="relative aspect-[16/9] overflow-hidden rounded-[18px] bg-[#EFE9DC]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 760px) 100vw, 760px"
          className="object-cover"
        />
      </div>
    </figure>
  );
}

function Block({ block }: { block: BlogBlock }) {
  if (block.type === "heading") {
    return (
      <h2 className="m-0 mt-10 font-montserrat text-[clamp(22px,2.4vw,28px)] font-bold leading-[1.25] tracking-[-0.03em] text-[#1F1E1C] sm:mt-12">
        {block.text}
      </h2>
    );
  }

  if (block.type === "gallery") {
    return (
      <div className="mt-8 grid grid-cols-3 gap-2.5 sm:mt-10 sm:gap-4">
        {block.images.map((image) => (
          <div
            key={image.src}
            className="relative aspect-[4/3] overflow-hidden rounded-[12px] bg-[#EFE9DC] sm:rounded-[16px]"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 760px) 33vw, 240px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  if (block.type === "figure") {
    return <ArticleFigure src={block.image.src} alt={block.image.alt} />;
  }

  return (
    <p className="m-0 mt-4 font-montserrat text-[15px] font-medium leading-[1.8] text-[#3f3e3c] first:mt-0 sm:text-[16px]">
      {block.text}
    </p>
  );
}

function RelatedBlogCard({ post }: { post: BlogPost }) {
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
              {post.excerpt}
            </p>
            <span className="mt-6 inline-flex shrink-0 items-center gap-1.5 self-end font-montserrat text-[14px] font-semibold text-[#111] sm:text-[15px]">
              View Project
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default function BlogArticle({
  post,
  related,
}: {
  post: BlogPost;
  related: BlogPost[];
}) {
  return (
    <article className="bg-[#FFFDF6] pb-16 pt-[112px] sm:pb-20 sm:pt-[132px] lg:pb-24 lg:pt-[156px]">
      <div className="mx-auto w-full max-w-[820px] px-[clamp(16px,4vw,40px)]">
        <header>
          <Link
            href="/blog"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-[#FFE14A] px-4 font-montserrat text-[14px] font-semibold leading-none text-[#111] transition-colors hover:bg-[#f5d63a] sm:h-11 sm:px-5 sm:text-[15px]"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.5} aria-hidden />
            Back to Blogs
          </Link>
          <h1 className="m-0 mt-6 font-montserrat text-[clamp(30px,4.2vw,44px)] font-extrabold leading-[1.12] tracking-[-0.035em] text-[#111] sm:mt-7">
            {post.title}
          </h1>
          <p className="m-0 mt-4 font-montserrat text-[16px] font-medium leading-[1.55] text-[#8d8d8d] sm:mt-5 sm:text-[18px]">
            {post.subtitle ?? post.excerpt}
          </p>
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#E4E0D6] pt-4 sm:mt-7">
            <p className="m-0 font-montserrat text-[13px] font-medium text-[#8d8d8d] sm:text-[15px]">
              {formatBlogReadTime(post.readTime)}
              <span className="px-2 text-[#c4c4c4]" aria-hidden="true">
                |
              </span>
              {formatBlogDate(post.date)}
            </p>
            <BlogShare title={post.title} />
          </div>
        </header>

        <ArticleFigure
          src={post.image}
          alt={post.alt}
          priority
          className="mt-6 sm:mt-8"
        />

        <div className="mt-8 sm:mt-10">
          {post.blocks.map((block, index) => (
            <Block key={`${block.type}-${index}`} block={block} />
          ))}
        </div>

        <div className="mt-12 flex min-h-[154px] items-center gap-4 bg-[#FAF7EC] pl-6 sm:mt-14 sm:gap-5 sm:pl-8">
          <div className="relative h-[84px] w-[84px] shrink-0 overflow-hidden rounded-full bg-[#EFE9DC]">
            <Image
              src={post.author.image}
              alt=""
              fill
              sizes="84px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="m-0 font-montserrat text-[18px] font-bold leading-tight text-[#111] sm:text-[20px]">
              {post.author.name}
            </p>
            <p className="m-0 mt-1 font-montserrat text-[14px] font-medium text-[#9a9a9a] sm:text-[15px]">
              {post.author.role}
            </p>
          </div>
        </div>

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
