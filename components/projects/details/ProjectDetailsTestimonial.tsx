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
    <section className="bg-[#FFFDF6] pt-8 pb-12 sm:pt-10 sm:pb-16 md:pb-20 lg:pb-[100px]">
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
            className="rounded-2xl px-[clamp(20px,4vw,64px)] py-8 text-white sm:rounded-3xl sm:py-10 md:rounded-[32px] md:py-12 lg:py-14"
            style={{
              backgroundColor: PD.testimonial.bg,
            }}
          >
            <p className="m-0 font-montserrat text-[12px] font-semibold tracking-[0.16em] uppercase sm:text-[13px]">
              Testimonial
            </p>
            <p className="mt-5 m-0 max-w-[980px] font-montserrat text-[clamp(16px,4vw,28px)] font-medium leading-[155%] tracking-[-0.01em] sm:mt-6">
              {testimonial.quote}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white/20 sm:h-14 sm:w-14">
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
                      className="h-3.5 w-3.5 fill-[#FFF68F] text-[#FFF68F] sm:h-4 sm:w-4"
                    />
                  ))}
                </div>
                <p className="m-0 font-montserrat text-[15px] font-bold leading-[140%] sm:text-[16px]">
                  {testimonial.name}
                </p>
                <p className="mt-1 m-0 font-montserrat text-[12px] font-medium leading-[140%] text-white/85 sm:text-[13px]">
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
