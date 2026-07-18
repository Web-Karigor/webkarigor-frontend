import Image from "next/image";
import Link from "next/link";
import { PR } from "@/lib/pricing-data";

export default function PricingCustomBanner() {
  return (
    <section className="bg-[#FFFDF6] py-8 sm:py-12">
      <div
        className="mx-auto w-full px-[clamp(16px,4vw,40px)]"
        style={{ maxWidth: PR.content + 80 }}
      >
        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-r from-[#0EC47B] via-[#2EEDA0] to-[#FEED35] px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
          <Image
            src="/rr.png"
            alt=""
            fill
            className="pointer-events-none object-cover object-center opacity-25 select-none"
          />
          <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <h2 className="m-0 max-w-[680px] font-montserrat text-[clamp(22px,3vw,36px)] font-bold leading-[1.25] tracking-[-0.02em] text-black">
              Every problem is different. Your pricing should be too.
            </h2>
            <Link
              href="#contact"
              className="inline-flex shrink-0 items-center justify-center rounded-[14px] bg-white px-7 py-3.5 font-montserrat text-[15px] font-bold text-black shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition hover:bg-[#f7f7f7]"
            >
              Talk to our expert
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
