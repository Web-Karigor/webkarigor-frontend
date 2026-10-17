"use client";

import { useMemo } from "react";
import {
  PROJECTS_CONTENT_W,
  PROJECTS_GAP,
  PROJECTS_WATERMARK,
} from "@/lib/projects-data";
import { useProjectsQuery } from "@/hooks/queries/useProjectsQuery";
import { mapPostsToGridItems } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid() {
  const { data } = useProjectsQuery();
  const items = useMemo(
    () => mapPostsToGridItems(data?.data?.posts),
    [data],
  );

  const featured = items[0];

  return (
    <section className="projects-bento relative bg-[#FFFDF6] pb-12 pt-8 sm:pb-20 sm:pt-14 md:pb-28 md:pt-16">
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
              opacity: PROJECTS_WATERMARK.opacity,
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
          {items.map((item) => (
            <ProjectCard
              key={item.id}
              title={item.title}
              src={item.src}
              alt={item.alt}
              width={featured?.w ?? item.w}
              height={featured?.h ?? item.h}
              href={`/projects/${item.slug}`}
              description={item.description}
              keyPoints={item.keyPoints}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
