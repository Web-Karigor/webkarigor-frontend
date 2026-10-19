"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { scrollAppToTop } from "@/lib/smooth-scroll";
import "./MobileBrand.css";

const brand = "Webkarigor";

export default function MobileBrand() {
  const pathname = usePathname();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      setRevealed(!root.classList.contains("wk-preloader-active"));
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

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
        className={`mobile-brand-word flex h-[1.5em] items-center text-[56px] md:text-[72px]${revealed ? " is-revealed" : ""}`}
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
