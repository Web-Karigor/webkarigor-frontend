"use client";

import { PROJECT_CARD_SLUGS } from "@/lib/project-details-data";
import {
  PROJECT_ITEMS,
  PROJECTS_CONTENT_W,
  PROJECTS_GAP,
  PROJECTS_WATERMARK,
} from "@/lib/projects-data";
import ProjectCard from "./ProjectCard";

function projectHref(id: string) {
  const slug = PROJECT_CARD_SLUGS[id];
  return slug ? `/projects/${slug}` : undefined;
}

export default function ProjectsGrid() {
  const featured = PROJECT_ITEMS[0];
  const rest = PROJECT_ITEMS.slice(1);

  // Pair remaining items into rows of 2 for the 640+20+640 layout
  const pairRows = [
    [rest[0], rest[1]], // mobile + desktop
    [rest[2], rest[3]], // travel + lifestyle
    [rest[4], rest[5]], // fashion + retail
  ];

  const ventures = rest[6];
  const brandV = rest[7];
  const health = rest[8];
  const lastRow = [rest[9], rest[10]];

  return (
    <section className="projects-bento relative bg-[#FFFDF6] pb-12 pt-8 sm:pb-20 sm:pt-14 md:pb-28 md:pt-16">
      {/*
        Side watermarks (Figma):
        - top-left PROJECTS
        - left-bottom (slightly up) WEBKARIGOR
        - right-upper WEBKARIGOR
        - right-bottom PROJECTS
      */}
      {PROJECTS_WATERMARK.items.map((item) => (
        <div
          key={item.id}
          aria-hidden
          className={`pointer-events-none absolute z-0 hidden select-none xl:block ${
            item.side === "left" ? "left-0" : "right-0"
          }`}
          style={{
            top: "top" in item ? item.top : undefined,
            bottom: "bottom" in item ? item.bottom : undefined,
            width: PROJECTS_WATERMARK.width,
            height: item.h,
          }}
        >
          <span
            className="flex h-full w-full items-center justify-center font-montserrat font-bold uppercase leading-none tracking-[-0.04em]"
            style={{
              color: PROJECTS_WATERMARK.color,
              fontSize: PROJECTS_WATERMARK.fontSize,
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            {item.text}
          </span>
        </div>
      ))}

      <div
        className="relative z-[1] mx-auto w-full px-[clamp(16px,4vw,40px)]"
        style={{ maxWidth: PROJECTS_CONTENT_W + 80 }}
      >
        <div
          className="mx-auto flex w-full flex-col"
          style={{
            maxWidth: PROJECTS_CONTENT_W,
            gap: PROJECTS_GAP,
          }}
        >
          {/* Featured — Figma Rectangle 110: 1300 × 600 */}
          <ProjectCard
            title={featured.title}
            src={featured.src}
            alt={featured.alt}
            width={featured.w}
            height={featured.h}
            href={projectHref(featured.id)}
            priority
          />

          {pairRows.map((row) => (
            <div
              key={row.map((c) => c.id).join("-")}
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ gap: PROJECTS_GAP }}
            >
              {row.map((item, index) => (
                <ProjectCard
                  key={item.id}
                  title={item.title}
                  src={item.src}
                  alt={item.alt}
                  width={item.w}
                  height={item.h}
                  href={projectHref(item.id)}
                  variant={item.variant}
                  priority={index === 0 && item.id === "p2"}
                />
              ))}
            </div>
          ))}

          {/* Tall ventures + stacked right (V + health) */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 md:items-start"
            style={{ gap: PROJECTS_GAP }}
          >
            <ProjectCard
              title={ventures.title}
              src={ventures.src}
              alt={ventures.alt}
              width={ventures.w}
              height={ventures.h}
              href={projectHref(ventures.id)}
              variant={ventures.variant}
            />
            <div className="flex flex-col" style={{ gap: PROJECTS_GAP }}>
              <ProjectCard
                title={brandV.title}
                src={brandV.src}
                alt={brandV.alt}
                width={brandV.w}
                height={brandV.h}
                href={projectHref(brandV.id)}
                variant={brandV.variant}
              />
              <ProjectCard
                title={health.title}
                src={health.src}
                alt={health.alt}
                width={health.w}
                height={health.h}
                href={projectHref(health.id)}
                variant={health.variant}
              />
            </div>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: PROJECTS_GAP }}
          >
            {lastRow.map((item) => (
              <ProjectCard
                key={item.id}
                title={item.title}
                src={item.src}
                alt={item.alt}
                width={item.w}
                height={item.h}
                href={projectHref(item.id)}
                variant={item.variant}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
