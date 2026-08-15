"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PROJECT_CARD_OVERLAY_LABELS } from "@/lib/projects-data";

type ProjectCardProps = {
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
  href?: string;
  priority?: boolean;
  variant?: "image" | "brand-v" | "ventures";
};

export default function ProjectCard({
  src,
  alt,
  title,
  width,
  height,
  href,
  priority = false,
  variant = "image",
}: ProjectCardProps) {
  const card = (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }}
      className="group relative w-full max-w-full overflow-hidden rounded-2xl bg-[#f3f1ea] md:rounded-[32px]"
      style={{
        width: `min(100%, ${width}px)`,
        aspectRatio: `${width} / ${height}`,
      }}
    >
      {variant === "brand-v" ? (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, #ff8a3d 0%, #ff4d2e 45%, #c41e0a 100%)",
          }}
        >
          <span className="projects-brand-v font-montserrat text-[clamp(56px,14vw,140px)] font-bold leading-none text-white/95">
            V
          </span>
        </div>
      ) : variant === "ventures" ? (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 sm:bottom-5 sm:left-5 sm:right-5">
            <p className="m-0 font-montserrat text-[10px] font-semibold tracking-[0.18em] text-white/90 uppercase sm:text-[11px]">
              {PROJECT_CARD_OVERLAY_LABELS.ventures}
            </p>
            <p className="m-0 font-montserrat text-[10px] font-semibold tracking-[0.18em] text-white/70 uppercase sm:text-[11px]">
              {PROJECT_CARD_OVERLAY_LABELS.venturesPartner}
            </p>
          </div>
        </>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
        />
      )}

      <span className="sr-only">{title}</span>
    </motion.article>
  );

  if (!href) return card;

  return (
    <Link
      href={href}
      data-project-cursor
      className="block w-full max-w-full outline-none"
      aria-label={title}
    >
      {card}
    </Link>
  );
}
