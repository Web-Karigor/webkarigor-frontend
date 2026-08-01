"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  PROJECT_DETAILS_UI,
  type ProjectDetail,
} from "@/lib/project-details-data";
import { PD } from "@/lib/project-details-layout";

const ease = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.15, margin: "0px 0px -80px 0px" } as const;

export default function ProjectDetailsBody({ project }: { project: ProjectDetail }) {
  const metaRows = [
    { label: PROJECT_DETAILS_UI.metaLabels.execution, value: project.meta.execution },
    { label: PROJECT_DETAILS_UI.metaLabels.clientName, value: project.meta.clientName },
    { label: PROJECT_DETAILS_UI.metaLabels.projectArea, value: project.meta.projectArea },
    { label: PROJECT_DETAILS_UI.metaLabels.status, value: project.meta.status },
    { label: PROJECT_DETAILS_UI.metaLabels.technologies, value: project.meta.technologies },
  ];

  return (
    <section className="bg-[#FFFDF6] pt-12 pb-8 sm:pt-16 sm:pb-10 md:pt-20 lg:pt-[100px] lg:pb-10">
      <div
        className="mx-auto w-full px-[clamp(16px,4vw,40px)]"
        style={{ maxWidth: PD.content + 80 }}
      >
        <div className="mx-auto w-full" style={{ maxWidth: PD.content }}>
          {/* Figma title — left aligned + full-width divider */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.9, ease }}
            className="m-0 max-w-[1100px] text-left font-montserrat text-[clamp(24px,6vw,48px)] font-bold leading-[1.3] tracking-[-0.04em] text-black"
          >
            {project.titleLines ? (
              <>
                <span className="md:hidden">{project.title}</span>
                <span className="hidden md:inline">
                  {project.titleLines[0]}
                  <br />
                  {project.titleLines[1]}
                </span>
              </>
            ) : (
              project.title
            )}
          </motion.h1>
          <div className="mt-6 h-px w-full bg-[#E5E1D8] sm:mt-8 md:mt-10" />

          {/* About row */}
          <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-10 lg:grid-cols-[minmax(0,400px)_1fr] lg:gap-[60px]">
            <div className="flex flex-col gap-5 sm:gap-6 lg:sticky lg:top-[120px] lg:self-start">
              <motion.aside
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 1, ease }}
                className="rounded-2xl bg-[#FFF8DC] p-5 sm:rounded-[24px] sm:p-6 lg:p-8"
              >
                <h2 className="m-0 font-montserrat text-[clamp(17px,4vw,20px)] font-bold leading-[140%] tracking-[-0.02em] text-[#0A0A0A]">
                  {PROJECT_DETAILS_UI.projectDetails}
                </h2>
                <dl className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
                  {metaRows.map((row) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-1 items-baseline gap-1 sm:grid-cols-[minmax(0,140px)_1fr] sm:gap-3"
                    >
                      <dt className="m-0 font-montserrat text-[13px] font-bold leading-[150%] text-[#0A0A0A] sm:text-[14px]">
                        {row.label}
                      </dt>
                      <dd className="m-0 min-w-0 break-words font-montserrat text-[13px] font-medium leading-[150%] text-[#4b5563] sm:text-[14px]">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </motion.aside>

              <motion.aside
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 1, delay: 0.08, ease }}
                className="rounded-2xl bg-[#FFF8DC] p-5 sm:rounded-[24px] sm:p-6 lg:p-8"
              >
                <h2 className="m-0 font-montserrat text-[clamp(17px,4vw,20px)] font-bold leading-[140%] tracking-[-0.02em] text-[#0A0A0A]">
                  {PROJECT_DETAILS_UI.clientsVoice}
                </h2>
                <p className="mt-4 m-0 font-montserrat text-[clamp(14px,3.5vw,15px)] font-medium leading-[170%] text-[#4b5563] sm:mt-5">
                  {project.clientVoice}
                </p>
              </motion.aside>
            </div>

            <div className="min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 1, ease }}
              >
                <h2 className="m-0 font-montserrat text-[clamp(22px,5.5vw,32px)] font-bold leading-[140%] tracking-[-0.02em] text-[#0A0A0A]">
                  {project.about.eyebrow}
                </h2>
                <h3 className="mt-3 m-0 max-w-[864px] font-montserrat text-[clamp(17px,4vw,22px)] font-medium leading-[145%] tracking-[-0.02em] text-[#0A0A0A] sm:mt-4">
                  {project.about.headline}
                </h3>
                <p className="mt-4 m-0 max-w-[865px] font-montserrat text-[clamp(14px,3.5vw,16px)] font-medium leading-[170%] text-[#4b5563] sm:mt-5">
                  {project.about.body}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 1.05, ease }}
                data-project-cursor
                className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#f3f1ea] sm:mt-10 sm:aspect-[16/10] sm:rounded-3xl lg:aspect-auto lg:h-[692px] lg:rounded-[40px]"
              >
                <Image
                  src={project.mockupImage}
                  alt={PROJECT_DETAILS_UI.mockupAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 840px"
                />
              </motion.div>

              {/* Problem → Solution staggered (Figma) */}
              <div className="mt-10 flex flex-col gap-8 sm:mt-14 sm:gap-12 md:mt-16 md:gap-14">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ duration: 1, ease }}
                  className="w-full max-w-[865px]"
                >
                  <h3 className="m-0 font-montserrat text-[clamp(20px,5vw,28px)] font-bold leading-[140%] tracking-[-0.02em] text-[#0A0A0A]">
                    {PROJECT_DETAILS_UI.problem}
                  </h3>
                  <p className="mt-3 m-0 font-montserrat text-[clamp(14px,3.5vw,16px)] font-medium leading-[170%] text-[#4b5563] sm:mt-4">
                    {project.problem}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ duration: 1, delay: 0.06, ease }}
                  className="w-full max-w-[734px] ml-0 sm:ml-8 md:ml-12 lg:ml-[100px]"
                >
                  <h3 className="m-0 font-montserrat text-[clamp(20px,5vw,28px)] font-bold leading-[140%] tracking-[-0.02em] text-[#0A0A0A]">
                    {PROJECT_DETAILS_UI.solution}
                  </h3>
                  <p className="mt-3 m-0 font-montserrat text-[clamp(14px,3.5vw,16px)] font-medium leading-[170%] text-[#4b5563] sm:mt-4">
                    {project.solution}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
