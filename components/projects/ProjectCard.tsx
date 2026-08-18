"use client";

import "./ProjectCard.css";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
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
  description?: string;
  keyPoints?: string[];
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
  description,
  keyPoints = [],
}: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.96", "start 0.12"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 26,
    damping: 32,
    mass: 1.15,
    restDelta: 0.001,
  });
  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const y = useTransform(progress, [0, 1], [72, 0]);

  const overlay = description ? (
    <div className="project-card-overlay" aria-hidden>
      <div className="project-card-overlay-shade" />
      <div className="project-card-overlay-copy">
        <h3 className="project-card-overlay-title">{title}</h3>
        <p className="project-card-overlay-desc">{description}</p>
        {keyPoints.length > 0 ? (
          <ul className="project-card-overlay-points">
            {keyPoints.map((point) => (
              <li key={point}>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  ) : null;

  const card = (
    <motion.article
      ref={ref}
      style={{
        opacity,
        y,
        width: `min(100%, ${width}px)`,
        aspectRatio: `${width} / ${height}`,
      }}
      className="project-card group relative w-full max-w-full overflow-hidden rounded-2xl bg-[#f3f1ea] md:rounded-[32px]"
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
            sizes="(max-width: 768px) 100vw, min(100vw, 1300px)"
          />
          <div className="project-card-default-labels">
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 sm:bottom-5 sm:left-5 sm:right-5">
              <p className="m-0 font-montserrat text-[10px] font-semibold tracking-[0.18em] text-white/90 uppercase sm:text-[11px]">
                {PROJECT_CARD_OVERLAY_LABELS.ventures}
              </p>
              <p className="m-0 font-montserrat text-[10px] font-semibold tracking-[0.18em] text-white/70 uppercase sm:text-[11px]">
                {PROJECT_CARD_OVERLAY_LABELS.venturesPartner}
              </p>
            </div>
          </div>
        </>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, min(100vw, 1300px)"
        />
      )}

      {overlay}
      <span className="sr-only">{title}</span>
    </motion.article>
  );

  if (!href) return card;

  return (
    <Link
      href={href}
      data-project-cursor
      className="group block w-full max-w-full outline-none"
      aria-label={title}
    >
      {card}
    </Link>
  );
}
