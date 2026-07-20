"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Services page uses its own Figma header inside ServiceHero
  if (pathname?.startsWith("/service")) {
    return null;
  }

  return (
    <>
      <div className="navbar-glow" aria-hidden />

      <div className="sticky top-4 sm:top-6 lg:top-[39px] z-[9999] h-0 overflow-visible">
      <header className="relative left-0 right-0 overflow-x-hidden">
      <div className="max-w-[1800px] mx-auto relative px-4 sm:px-6">
        {/* ================= DESKTOP NAVBAR ================= */}
        <nav className="hidden lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:block">
          <div className="navbar-container flex items-center justify-center box-border rounded-[24px]">
            <div className="navbar-content flex items-center justify-center font-semibold">
              <Link href="/" className="navbar-link">Home</Link>
              <Link href="/service" className="navbar-link">Service</Link>

              <Link
                href="/"
                className="webkarigor-button relative inline-flex items-center justify-center shrink-0"
              >
                <span className="webkarigor-inner w-full h-full flex items-center justify-center">
                  <span className="webkarigor-text">Webkarigor</span>
                </span>
              </Link>

              <Link href="/case" className="navbar-link">Case</Link>
              <Link href="/about-us" className="navbar-link">About us</Link>
            </div>
          </div>
        </nav>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center justify-between lg:justify-end">
          {/* MOBILE LOGO / BRAND */}
          <Link href="/" className="lg:hidden font-bold text-base sm:text-lg">
            Webkarigor
          </Link>

          {/* CTA BUTTON (DESKTOP) */}
          <button
            className="
              hidden lg:inline-flex
              items-center gap-[10px]
              px-[24px] py-[20px] lg:py-[18px] 2xl:py-[20px]
              border border-black
              rounded-[12px]
              font-bold text-[18px] xl:text-[20px]
              hover:bg-black hover:text-white
              transition
            "
          >
            Let’s get started
          </button>

          {/* HAMBURGER */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 flex items-center justify-center border rounded-lg"
          >
            <span className="text-2xl">{open ? "✕" : "☰"}</span>
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {open && (
          <div className="lg:hidden mt-4 rounded-2xl border bg-white shadow-xl p-6 space-y-5">
            <Link onClick={() => setOpen(false)} href="/" className="block font-semibold">
              Home
            </Link>
            <Link onClick={() => setOpen(false)} href="/service" className="block font-semibold">
              Service
            </Link>
            <Link onClick={() => setOpen(false)} href="/projects" className="block font-semibold">
              Projects
            </Link>
            <Link onClick={() => setOpen(false)} href="/pricing" className="block font-semibold">
              Pricing
            </Link>
            <Link onClick={() => setOpen(false)} href="/about-us" className="block font-semibold">
              About us
            </Link>

            <button
              className="
                w-full mt-4
                px-6 py-4
                border border-black
                rounded-xl
                font-bold
                hover:bg-black hover:text-white
                transition
              "
            >
              Let’s get started
            </button>
          </div>
        )}
      </div>
      </header>
    </div>
    </>
  );
}
