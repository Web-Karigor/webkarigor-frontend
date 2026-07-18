"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ProjectDetail } from "@/lib/project-details-data";
import { PD } from "@/lib/project-details-layout";

const ease = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.15, margin: "0px 0px -80px 0px" } as const;

export default function ProjectDetailsBody({ project }: { project: ProjectDetail }) {
  const metaRows = [
    { label: "Execution", value: project.meta.execution },
    { label: "Client Name", value: project.meta.clientName },
    { label: "Project Area", value: project.meta.projectArea },
    { label: "Status", value: project.meta.status },
    { label: "Technologies", value: project.meta.technologies },
  ];

  return (
    <section className="bg-[#FFFDF6]" style={{ paddingTop: PD.sectionGap, paddingBottom: 40 }}>
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
            className="m-0 text-left font-montserrat font-bold text-black"
            style={{
              fontSize: `clamp(28px, 3.2vw, ${PD.hero.titleSize}px)`,
              lineHeight: PD.hero.titleLeading,
              letterSpacing: PD.hero.titleTracking,
              maxWidth: 1100,
            }}
          >
            {project.titleLines ? (
              <>
                {project.titleLines[0]}
                <br />
                {project.titleLines[1]}
              </>
            ) : (
              project.title
            )}
          </motion.h1>
          <div className="mt-8 h-px w-full bg-[#E5E1D8] sm:mt-10" />

          {/* About row */}
          <div
            className="mt-10 grid grid-cols-1 lg:grid-cols-[400px_1fr]"
            style={{ gap: PD.body.colGap }}
          >
            <div
              className="flex flex-col lg:sticky lg:top-[120px] lg:self-start"
              style={{ gap: PD.body.boxGap }}
            >
              <motion.aside
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 1, ease }}
                className="bg-[#FFF8DC]"
                style={{
                  borderRadius: PD.body.boxRadius,
                  padding: PD.body.boxPad,
                }}
              >
                <h2 className="m-0 font-montserrat text-[20px] font-bold leading-[140%] tracking-[-0.02em] text-[#0A0A0A]">
                  Project Details
                </h2>
                <dl className="mt-6 space-y-4">
                  {metaRows.map((row) => (
                    <div
                      key={row.label}
                      className="grid items-baseline gap-3"
                      style={{ gridTemplateColumns: `${PD.body.metaLabelW}px 1fr` }}
                    >
                      <dt className="m-0 font-montserrat text-[14px] font-bold leading-[150%] text-[#0A0A0A]">
                        {row.label}
                      </dt>
                      <dd className="m-0 font-montserrat text-[14px] font-medium leading-[150%] text-[#4b5563]">
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
                className="bg-[#FFF8DC]"
                style={{
                  borderRadius: PD.body.boxRadius,
                  padding: PD.body.boxPad,
                }}
              >
                <h2 className="m-0 font-montserrat text-[20px] font-bold leading-[140%] tracking-[-0.02em] text-[#0A0A0A]">
                  Clients Voice
                </h2>
                <p className="mt-5 m-0 font-montserrat text-[15px] font-medium leading-[170%] text-[#4b5563]">
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
                <h2 className="m-0 font-montserrat text-[32px] font-bold leading-[140%] tracking-[-0.02em] text-[#0A0A0A]">
                  {project.about.eyebrow}
                </h2>
                <h3 className="mt-4 m-0 max-w-[864px] font-montserrat text-[22px] font-medium leading-[145%] tracking-[-0.02em] text-[#0A0A0A]">
                  {project.about.headline}
                </h3>
                <p className="mt-5 m-0 max-w-[865px] font-montserrat text-[16px] font-medium leading-[170%] text-[#4b5563]">
                  {project.about.body}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 1.05, ease }}
                className="relative mt-10 h-[320px] w-full overflow-hidden bg-[#f3f1ea] sm:h-[480px] lg:h-[692px]"
                style={{
                  borderRadius: PD.mockup.radius,
                }}
              >
                <Image
                  src={project.mockupImage}
                  alt="Project desktop mockup"
                  fill
                  className="object-cover"
                  sizes="840px"
                />
              </motion.div>

              {/* Problem → Solution staggered (Figma) */}
              <div className="mt-14 flex flex-col gap-12 sm:mt-16 sm:gap-14">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ duration: 1, ease }}
                  className="w-full max-w-[865px]"
                >
                  <h3 className="m-0 font-montserrat text-[24px] font-bold leading-[140%] tracking-[-0.02em] text-[#0A0A0A] sm:text-[28px]">
                    Problem
                  </h3>
                  <p className="mt-4 m-0 font-montserrat text-[15px] font-medium leading-[170%] text-[#4b5563] sm:text-[16px]">
                    {project.problem}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ duration: 1, delay: 0.06, ease }}
                  className="w-full max-w-[620px] sm:ml-[28%] sm:max-w-[734px] lg:ml-[100px]"
                >
                  <h3 className="m-0 font-montserrat text-[24px] font-bold leading-[140%] tracking-[-0.02em] text-[#0A0A0A] sm:text-[28px]">
                    Solution
                  </h3>
                  <p className="mt-4 m-0 font-montserrat text-[15px] font-medium leading-[170%] text-[#4b5563] sm:text-[16px]">
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
