"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SCROLLED_SURFACE =
  "bg-[#fffdf6] shadow-[0_8px_24px_rgba(0,0,0,0.08)]";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/service")) {
    return null;
  }

  return (
    <>
      <div
        className={`navbar-glow transition-opacity duration-300 ${scrolled ? "opacity-0" : ""}`}
        aria-hidden
      />

      <div
        className={`sticky z-[9999] h-0 overflow-visible transition-[top] duration-300 ${
          scrolled ? "top-0" : "top-4 sm:top-6 lg:top-[39px]"
        }`}
      >
        <header className="relative left-0 right-0 overflow-x-hidden">
          <div
            className={`relative mx-auto max-w-[1800px] px-4 sm:px-6 ${
              scrolled ? "py-2 lg:py-3" : ""
            }`}
          >
            {/* Desktop — nav + CTA share one row, aligned center */}
            <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6">
              <div aria-hidden />

              <nav>
                <div
                  className={`navbar-container flex items-center justify-center box-border rounded-[24px] transition-[background-color,box-shadow] duration-300 ${
                    scrolled ? SCROLLED_SURFACE : ""
                  }`}
                >
                  <div className="navbar-content flex items-center justify-center font-semibold">
                    <Link href="/" className="navbar-link">
                      Home
                    </Link>
                    <Link href="/service" className="navbar-link">
                      Service
                    </Link>

                    <Link
                      href="/"
                      className="webkarigor-button relative inline-flex shrink-0 items-center justify-center"
                    >
                      <span className="webkarigor-inner flex h-full w-full items-center justify-center">
                        <span className="webkarigor-text">Webkarigor</span>
                      </span>
                    </Link>

                    <Link href="/case" className="navbar-link">
                      Case
                    </Link>
                    <Link href="/about-us" className="navbar-link">
                      About us
                    </Link>
                  </div>
                </div>
              </nav>

              <div className="flex justify-end">
                <button
                  type="button"
                  className={`inline-flex items-center gap-[10px] rounded-[12px] border border-black px-6 py-[18px] font-bold text-[18px] transition-[background-color,box-shadow,color,transform] duration-300 hover:bg-black hover:text-white xl:px-[24px] xl:py-5 xl:text-[20px] ${
                    scrolled
                      ? SCROLLED_SURFACE
                      : "border-black/70 bg-transparent shadow-none"
                  }`}
                >
                  Let&apos;s get started
                </button>
              </div>
            </div>

            {/* Mobile */}
            <div className="flex items-center justify-between lg:hidden">
              <Link
                href="/"
                className={`rounded-xl px-3 py-2 font-bold text-base transition-[background-color,box-shadow] duration-300 sm:text-lg ${
                  scrolled ? SCROLLED_SURFACE : ""
                }`}
              >
                Webkarigor
              </Link>

              <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-[background-color,box-shadow] duration-300 ${
                  scrolled ? SCROLLED_SURFACE : ""
                }`}
                aria-label={open ? "Close menu" : "Open menu"}
              >
                <span className="text-2xl">{open ? "✕" : "☰"}</span>
              </button>
            </div>

            {open && (
              <div className="mt-4 space-y-5 rounded-2xl border bg-white p-6 shadow-xl lg:hidden">
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
                  type="button"
                  className="mt-4 w-full rounded-xl border border-black px-6 py-4 font-bold transition hover:bg-black hover:text-white"
                >
                  Let&apos;s get started
                </button>
              </div>
            )}
          </div>
        </header>
      </div>
    </>
  );
}
