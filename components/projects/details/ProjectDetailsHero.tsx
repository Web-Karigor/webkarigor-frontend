import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  PROJECT_DETAILS_UI,
  type ProjectDetail,
} from "@/lib/project-details-data";
import { PD } from "@/lib/project-details-layout";

export default function ProjectDetailsHero({ project }: { project: ProjectDetail }) {
  const { hero } = PD;
  const galleryW = hero.cardW * 3 + hero.gap * 2;

  return (
    <section className="relative bg-[#FFFDF6] pt-[88px] sm:pt-[110px] lg:pt-[132px]">
      <div
        className="mx-auto w-full px-[clamp(16px,4vw,40px)]"
        style={{ maxWidth: PD.content + 80 }}
      >
        <div className="mx-auto w-full" style={{ maxWidth: PD.content }}>
          <div className="mt-6 sm:mt-8 lg:mt-10">
            <Link
              href="/projects"
              className="inline-flex h-9 items-center gap-2 rounded-full bg-[#FFF68F] px-4 font-montserrat text-[13px] font-semibold leading-none text-[#0A0A0A] transition hover:bg-[#f5e96a] sm:h-10 sm:px-5 sm:text-[14px]"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
              {PROJECT_DETAILS_UI.backToProjects}
            </Link>
          </div>
        </div>
      </div>

      <div
        className="mx-auto mt-6 w-full px-[clamp(16px,2.5vw,60px)] sm:mt-8"
        style={{ maxWidth: PD.heroContent + 120 }}
      >
        <div
          className="mx-auto grid w-full grid-cols-1 justify-items-center gap-4 sm:gap-5 md:grid-cols-3 md:gap-6"
          style={{ maxWidth: galleryW }}
        >
          {project.heroImages.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="relative w-full max-w-[562px] overflow-hidden rounded-2xl bg-[rgba(221,227,235,0.16)] p-2.5 shadow-[0_0_25px_rgba(0,0,0,0.12)] backdrop-blur-[40px] sm:rounded-[28px] sm:p-3.5 md:rounded-[32px] md:p-4"
              style={{
                aspectRatio: `${hero.cardW} / ${hero.cardH}`,
              }}
            >
              <div
                data-project-cursor
                className="relative h-full w-full overflow-hidden rounded-xl sm:rounded-2xl md:rounded-[16px]"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  priority={index < 2}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 562px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
