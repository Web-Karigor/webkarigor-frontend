"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import homeContent from "@/data/home-content.json";
import { scrollAppToTop } from "@/lib/smooth-scroll";
import "./MobileBrand.css";

const { brand } = homeContent.navbar;

export default function MobileBrand() {
  const pathname = usePathname();

  return (
    <div
      className="pointer-events-none inset-x-0 top-0 z-[70] flex justify-center lg:hidden"
      style={{ paddingTop: "max(14px, env(safe-area-inset-top))" }}
    >
      <Link
        href="/"
        aria-label="Webkarigor home"
        onClick={() => {
          if (pathname === "/") scrollAppToTop({ immediate: true });
        }}
        className="mobile-brand-word flex h-[1.5em] items-center text-[56px] md:text-[72px]"
      >
        <Image
          src="/logo.svg"
          alt={brand}
          width={484}
          height={65}
          unoptimized
          priority
          className="block h-auto w-[5.93em]"
        />
      </Link>
    </div>
  );
}
