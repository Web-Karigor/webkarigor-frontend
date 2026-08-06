import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import "./ProjectDetailsRelated.css";
import {
  PROJECT_DETAILS_UI,
  type ProjectDetail,
} from "@/lib/project-details-data";
import { PD } from "@/lib/project-details-layout";

export default function ProjectDetailsCTA({ project }: { project: ProjectDetail }) {
  return (
    <section className="bg-[#FFFDF6] py-12 sm:py-16 md:py-20 lg:py-24">
      <div
        className="mx-auto flex w-full flex-col items-center gap-6 px-[clamp(16px,4vw,40px)] text-center sm:gap-8 lg:gap-10"
        style={{ maxWidth: PD.cta.w }}
      >
        <h2 className="m-0 font-montserrat text-[clamp(24px,5.5vw,42px)] font-bold leading-[130%] tracking-[-0.03em] text-black">
          {PROJECT_DETAILS_UI.ctaTitle}
        </h2>
        <p className="m-0 max-w-[780px] font-montserrat text-[clamp(14px,3.5vw,16px)] font-medium leading-[170%] text-black">
          {project.ctaBody}
        </p>
        <Link
          href="/#contact"
          className="inline-flex h-11 items-center justify-center rounded-[10px] border border-black bg-transparent px-6 font-montserrat text-[14px] font-bold capitalize leading-none text-black transition hover:bg-black hover:text-white sm:h-[48px] sm:px-8 sm:text-[15px]"
        >
          {PROJECT_DETAILS_UI.ctaButton}
        </Link>
      </div>

      <div
        className="mx-auto mt-12 w-full px-[clamp(16px,4vw,40px)] sm:mt-16 md:mt-20"
        style={{ maxWidth: PD.cta.w + 80 }}
      >
        <Link
          href={`/projects/${project.nextSlug}`}
          className="mx-auto flex w-full items-center justify-center gap-2 border-y border-[#8E8874]/50 px-4 py-5 font-montserrat text-[11px] font-medium tracking-[0.08em] text-[#8E8874] uppercase transition hover:text-[#0A0A0A] sm:gap-3 sm:px-8 sm:py-6 sm:text-[13px] sm:tracking-[0.14em]"
          style={{ maxWidth: PD.cta.w }}
        >
          {PROJECT_DETAILS_UI.nextProject}
          <ArrowRight className="h-[15px] w-[15px]" strokeWidth={1.75} />
        </Link>
      </div>
    </section>
  );
}

export function ProjectDetailsRelated({ project }: { project: ProjectDetail }) {
  return (
    <section className="bg-[#FFFDF6] pb-12 sm:pb-16 md:pb-20 lg:pb-[120px]">
      <div
        className="mx-auto w-full px-[clamp(16px,4vw,40px)]"
        style={{ maxWidth: PD.related.w + 80 }}
      >
        <div className="mx-auto w-full" style={{ maxWidth: PD.related.w }}>
          <h2 className="m-0 font-montserrat text-[clamp(22px,5.5vw,40px)] font-bold leading-[130%] tracking-[-0.03em] text-[#0A0A0A]">
            {PROJECT_DETAILS_UI.relatedProjects}
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-5 md:mt-10 md:grid-cols-3 md:gap-5">
            {project.related.map((item, index) => (
              <article
                key={`${item.slug}-${index}`}
                className="related-project-flip relative aspect-[4/5] md:aspect-auto md:h-[420px]"
              >
                <Link
                  href={`/projects/${item.slug}`}
                  data-project-cursor
                  className="related-project-flip-link group block h-full w-full outline-none"
                  aria-label={item.title}
                >
                  <div className="related-project-flip-inner">
                    <div className="related-project-flip-face related-project-flip-front">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 420px"
                      />
                    </div>

                    <div className="related-project-flip-face related-project-flip-back">
                      <p className="m-0 font-montserrat text-[clamp(14px,3.5vw,15px)] font-medium leading-[170%] text-[#6B7280]">
                        {item.description}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-1.5 self-end font-montserrat text-[14px] font-bold leading-none text-[#0A0A0A] underline underline-offset-4">
                        {PROJECT_DETAILS_UI.viewProject}
                        <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
