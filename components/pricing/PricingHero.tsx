"use client";

import { motion } from "framer-motion";
import {
  Layers,
  UserRound,
  ShieldCheck,
  Scale,
  type LucideIcon,
} from "lucide-react";
import { PRICING_HERO_FEATURES, PR } from "@/lib/pricing-data";

const ease = [0.16, 1, 0.3, 1] as const;
const vp = { once: true, amount: 0.2 } as const;

const ICONS: Record<(typeof PRICING_HERO_FEATURES)[number]["icon"], LucideIcon> = {
  stack: Layers,
  user: UserRound,
  shield: ShieldCheck,
  scale: Scale,
};

export default function PricingHero() {
  return (
    <section className="relative overflow-hidden bg-[#FFFDF6] pt-[120px] pb-12 sm:pt-[140px] sm:pb-16 lg:pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,248,171,0.12),_transparent_55%)]" />

      <div
        className="relative mx-auto w-full px-[clamp(16px,4vw,40px)]"
        style={{ maxWidth: PR.content + 80 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="mx-auto max-w-[920px] text-center"
        >
          <span className="inline-flex items-center rounded-full border border-[#38F8AB]/60 bg-[#38F8AB]/15 px-4 py-1.5 font-montserrat text-[13px] font-semibold text-[#0EC47B]">
            From Idea to Launch
          </span>

          <h1 className="mt-6 m-0 font-montserrat text-[clamp(32px,5vw,56px)] font-bold leading-[1.15] tracking-[-0.03em] text-[#0A0A0A]">
            Transparent Pricing for{" "}
            <span className="font-museoModerno italic font-semibold text-[#0EC47B]">
              Supports
            </span>{" "}
            Your Growth
          </h1>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {PRICING_HERO_FEATURES.map((item, index) => {
            const Icon = ICONS[item.icon];
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.8, delay: index * 0.06, ease }}
                className="rounded-[20px] border border-[#E8E4DC] bg-white p-6 shadow-[0_8px_28px_rgba(0,0,0,0.04)]"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#38F8AB]/20 text-[#0EC47B]">
                  <Icon className="h-5 w-5" strokeWidth={2.25} aria-hidden />
                </span>
                <h3 className="mt-4 m-0 font-montserrat text-[16px] font-bold leading-[1.3] text-[#0A0A0A]">
                  {item.title}
                </h3>
                <p className="mt-2 m-0 font-montserrat text-[14px] font-medium leading-[1.55] text-[#6B7280]">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
