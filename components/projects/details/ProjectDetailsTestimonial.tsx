"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { ProjectDetail } from "@/lib/project-details-data";
import { PD } from "@/lib/project-details-layout";

const ease = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.15, margin: "0px 0px -80px 0px" } as const;

export default function ProjectDetailsTestimonial({
  project,
}: {
  project: ProjectDetail;
}) {
  const { testimonial } = project;

  return (
    <section className="bg-[#FFFDF6]" style={{ paddingTop: 40, paddingBottom: PD.sectionGap }}>
      <div
        className="mx-auto w-full px-[clamp(16px,4vw,40px)]"
        style={{ maxWidth: PD.content + 80 }}
      >
        <div className="mx-auto w-full" style={{ maxWidth: PD.content }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 1.05, ease }}
            className="text-white"
            style={{
              borderRadius: PD.testimonial.radius,
              backgroundColor: PD.testimonial.bg,
              padding: `${PD.testimonial.padY}px clamp(24px, 4vw, ${PD.testimonial.padX}px)`,
            }}
          >
            <p className="m-0 font-montserrat text-[13px] font-semibold tracking-[0.16em] uppercase">
              Testimonial
            </p>
            <p className="mt-6 m-0 max-w-[980px] font-montserrat text-[clamp(18px,2.1vw,28px)] font-medium leading-[155%] tracking-[-0.01em]">
              {testimonial.quote}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-full bg-white/20">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div>
                <div className="mb-1.5 flex items-center gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-[#FFF68F] text-[#FFF68F]"
                    />
                  ))}
                </div>
                <p className="m-0 font-montserrat text-[16px] font-bold leading-[140%]">
                  {testimonial.name}
                </p>
                <p className="mt-1 m-0 font-montserrat text-[13px] font-medium leading-[140%] text-white/85">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
