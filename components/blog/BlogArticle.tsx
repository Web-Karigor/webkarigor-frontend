import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogBlock, BlogPost } from "@/lib/blog-data";

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

function RelatedImageCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-[22px] bg-white p-3 shadow-[0_10px_40px_rgba(17,17,17,0.06)]"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-[16px] bg-[#F4F1E8]">
        <Image
          src={post.image}
          alt={post.alt}
          fill
          sizes="(max-width: 768px) 100vw, 340px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
    </Link>
  );
}

function RelatedTextCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex h-full min-h-[280px] flex-col rounded-[22px] bg-white p-6 shadow-[0_10px_40px_rgba(17,17,17,0.06)] sm:p-7"
    >
      <p className="m-0 font-montserrat text-[14px] font-medium leading-[1.75] text-[#6d6d6d] sm:text-[15px]">
        {post.excerpt}
      </p>
      <span className="mt-auto inline-flex items-center justify-end gap-1.5 pt-8 font-montserrat text-[14px] font-semibold text-[#111] sm:text-[15px]">
        View Project
        <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden />
      </span>
    </Link>
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
      <div className="mx-auto w-full max-w-[760px] px-[clamp(16px,4vw,40px)]">
        <header>
          <h1 className="m-0 font-montserrat text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.15] tracking-[-0.035em] text-[#1F1E1C]">
            {post.title}
          </h1>
          <p className="m-0 mt-4 font-montserrat text-[13px] font-medium text-[#8a847c] sm:text-[14px]">
            {post.date}
            <span aria-hidden="true"> · </span>
            {post.readTime}
          </p>
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
        <section className="mx-auto mt-10 w-full max-w-[1120px] px-[clamp(16px,4vw,40px)] sm:mt-12">
          <p className="m-0 text-center font-montserrat text-[13px] font-medium uppercase tracking-[0.16em] text-[#b5b5b5] sm:text-[14px]">
            Read next blog <span aria-hidden="true">→</span>
          </p>
          <h2 className="m-0 mt-8 font-montserrat text-[22px] font-bold tracking-[-0.03em] text-[#111] sm:mt-10 sm:text-[26px]">
            Related Blogs
          </h2>
          <div className="mt-5 grid grid-cols-1 items-stretch gap-4 sm:mt-6 md:grid-cols-3 md:gap-5">
            {related[0] ? <RelatedImageCard post={related[0]} /> : null}
            {related[1] ? <RelatedTextCard post={related[1]} /> : null}
            {related[2] ? <RelatedImageCard post={related[2]} /> : null}
          </div>
        </section>
      ) : null}
    </article>
  );
}
