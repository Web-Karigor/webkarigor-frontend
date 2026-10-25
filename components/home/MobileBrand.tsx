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
  const isMintServiceHero =
    pathname?.startsWith("/service/software-development") ||
    pathname?.startsWith("/service/manpower");
  const isServicePage = pathname === "/service" || pathname?.startsWith("/service/");
  const pageHeroBackground = isServicePage
    ? isMintServiceHero
      ? {
          backgroundColor: "#F4FFFB",
          backgroundImage: [
            "radial-gradient(ellipse 46% 62% at 66% 46%, rgba(210,255,120,0.58) 0%, rgba(190,255,170,0.28) 42%, transparent 70%)",
            "radial-gradient(ellipse 40% 55% at 84% 52%, rgba(110,230,240,0.52) 0%, rgba(150,240,250,0.22) 45%, transparent 72%)",
            "radial-gradient(ellipse 55% 70% at 74% 48%, rgba(180,255,210,0.32) 0%, transparent 68%)",
            "linear-gradient(180deg, #F4FFFB 0%, #F4FFFB 100%)",
          ].join(", "),
        }
      : {
          backgroundColor:
            pathname.startsWith("/service/ecommerce")
              ? "#F7F9FB"
              : pathname.startsWith("/service/erp") ||
                  pathname.startsWith("/service/hrm") ||
                  pathname.startsWith("/service/website-design-development")
                ? "#FFFFFF"
                : "#F5F5F5",
        }
    : pathname?.startsWith("/contact-us")
      ? {
          backgroundColor: "#FFFEFB",
          backgroundImage:
            "radial-gradient(ellipse 65% 55% at 12% 30%, rgba(14, 196, 123, 0.14), transparent 55%), radial-gradient(ellipse 50% 40% at 90% 20%, rgba(56, 248, 171, 0.1), transparent 50%)",
        }
      : pathname?.startsWith("/about-us")
        ? { backgroundColor: "#FFFEFB" }
        : pathname?.startsWith("/pricing")
          ? { backgroundColor: "#F8F6EF" }
          : pathname?.startsWith("/team")
            ? { backgroundColor: "#FBF9EF" }
            : pathname?.startsWith("/blog")
              ? {
                  backgroundColor: "#FFFDF6",
                  backgroundImage:
                    "radial-gradient(ellipse 52% 100% at 50% 0%, #F3FDE6 0%, rgba(255,253,246,0) 72%)",
                }
              : { backgroundColor: "#FFFDF6" };
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
      style={{
        paddingTop: "max(14px, env(safe-area-inset-top))",
        ...pageHeroBackground,
      }}
    >
      <Link
        href="/"
        aria-label="Webkarigor home"
        onClick={() => {
          if (pathname === "/") scrollAppToTop({ immediate: true });
        }}
        className={`mobile-brand-word pointer-events-auto flex h-[1.5em] items-center text-[56px] md:text-[72px]${revealed ? " is-revealed" : ""}`}
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
