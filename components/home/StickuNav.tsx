"use client";

import "./StickuNav.css";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  DollarSign,
  FolderKanban,
  Menu,
  MessageCircle,
  Settings,
  X,
} from "lucide-react";
import {
  STICKY_NAV_MORE_LINKS,
  STICKY_NAV_PROJECTS,
  STICKY_NAV_SERVICES,
} from "@/lib/sticky-nav-data";

type Sheet = "projects" | "services" | "more" | null;

export default function StickyNav() {
  const pathname = usePathname();
  const [sheet, setSheet] = useState<Sheet>(null);
  const [mounted, setMounted] = useState(false);

  // Client-only mount avoids hydration mismatches (e.g. browser tooling
  // mutating the DOM, or env(safe-area) differences).
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setSheet(null);
  }, [pathname]);

  useEffect(() => {
    if (!sheet) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sheet]);

  if (!mounted) return null;

  const close = () => setSheet(null);
  const toggle = (next: Sheet) =>
    setSheet((curr) => (curr === next ? null : next));

  return (
    <div className="lg:hidden">
      <AnimatePresence>
        {sheet ? (
          <motion.button
            type="button"
            aria-label="Close menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[9998] bg-black/35 backdrop-blur-md"
            onClick={close}
          />
        ) : null}
      </AnimatePresence>

      <header className="pointer-events-none fixed inset-x-0 bottom-0 z-[9999]">
        <div
          className="mx-auto max-w-lg px-3"
          style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
        >
          <AnimatePresence mode="wait">
            {sheet === "projects" ? (
              <MobileSheet key="projects">
                <p className="mb-3 px-1 font-montserrat text-[11px] font-semibold tracking-[0.14em] text-[#0EC47B] uppercase">
                  Latest Projects
                </p>
                <div className="space-y-1">
                  {STICKY_NAV_PROJECTS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={close}
                      className="block rounded-xl p-3 transition active:bg-[#f3f4f6]"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-montserrat text-[15px] font-semibold text-[#111827]">
                          {item.title}
                        </span>
                        <ChevronRight className="h-4 w-4 text-[#9ca3af]" />
                      </div>
                      <p className="mt-0.5 font-montserrat text-[12px] font-medium text-[#6b7280]">
                        {item.desc}
                      </p>
                    </Link>
                  ))}
                  <Link
                    href="/projects"
                    onClick={close}
                    className="mt-1 block rounded-xl border-t border-[#eef0f3] p-3 pt-4 transition active:bg-[#f3f4f6]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-montserrat text-[15px] font-semibold text-[#0EC47B]">
                        View all projects
                      </span>
                      <ChevronRight className="h-4 w-4 text-[#0EC47B]" />
                    </div>
                  </Link>
                </div>
              </MobileSheet>
            ) : null}

            {sheet === "services" ? (
              <MobileSheet key="services">
                <p className="mb-3 px-1 font-montserrat text-[11px] font-semibold tracking-[0.14em] text-[#0EC47B] uppercase">
                  Services
                </p>
                <div className="space-y-1">
                  {STICKY_NAV_SERVICES.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={close}
                      className="block rounded-xl p-3 transition active:bg-[#f3f4f6]"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-montserrat text-[15px] font-semibold text-[#111827]">
                          {item.title}
                        </span>
                        <ChevronRight className="h-4 w-4 text-[#9ca3af]" />
                      </div>
                      <p className="mt-0.5 font-montserrat text-[12px] font-medium text-[#6b7280]">
                        {item.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              </MobileSheet>
            ) : null}

            {sheet === "more" ? (
              <MobileSheet key="more">
                <p className="mb-3 px-1 font-montserrat text-[11px] font-semibold tracking-[0.14em] text-[#0EC47B] uppercase">
                  More
                </p>
                <div className="space-y-1">
                  {STICKY_NAV_MORE_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={close}
                      className="block rounded-xl p-3 transition active:bg-[#f3f4f6]"
                    >
                      <div className="font-montserrat text-[15px] font-semibold text-[#111827]">
                        {item.title}
                      </div>
                      <p className="mt-0.5 font-montserrat text-[12px] font-medium text-[#6b7280]">
                        {item.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              </MobileSheet>
            ) : null}
          </AnimatePresence>

          <div className="pointer-events-auto sticky-nav-ring mt-2">
            <nav className="sticky-nav-bar" aria-label="Mobile sticky navigation">
              <button
                type="button"
                aria-expanded={sheet === "projects"}
                onClick={() => toggle("projects")}
                className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-2 font-montserrat text-[10px] font-semibold transition ${
                  sheet === "projects" ||
                  pathname?.startsWith("/projects") ||
                  pathname?.startsWith("/case")
                    ? "text-[#0EC47B]"
                    : "text-[#1f1e1c]/70 active:text-[#1f1e1c]"
                }`}
              >
                <FolderKanban className="h-4 w-4" />
                <span>Projects</span>
              </button>

              <button
                type="button"
                aria-expanded={sheet === "services"}
                onClick={() => toggle("services")}
                className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-2 font-montserrat text-[10px] font-semibold transition ${
                  sheet === "services" || pathname?.startsWith("/service")
                    ? "text-[#0EC47B]"
                    : "text-[#1f1e1c]/70 active:text-[#1f1e1c]"
                }`}
              >
                <Settings className="h-4 w-4" />
                <span>Services</span>
              </button>

              <Link href="/contact-us" className="sticky-nav-cta">
                <MessageCircle className="relative z-10 h-3.5 w-3.5" />
                <span className="relative z-10 whitespace-nowrap">Start</span>
              </Link>

              <Link
                href="/pricing"
                className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-2 font-montserrat text-[10px] font-semibold transition ${
                  pathname?.startsWith("/pricing")
                    ? "text-[#0EC47B]"
                    : "text-[#1f1e1c]/70 active:text-[#1f1e1c]"
                }`}
              >
                <DollarSign className="h-4 w-4" />
                <span>Pricing</span>
              </Link>

              <button
                type="button"
                aria-expanded={sheet === "more"}
                onClick={() => toggle("more")}
                className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-2 font-montserrat text-[10px] font-semibold transition ${
                  sheet === "more"
                    ? "text-[#0EC47B]"
                    : "text-[#1f1e1c]/70 active:text-[#1f1e1c]"
                }`}
              >
                {sheet === "more" ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
                <span>More</span>
              </button>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
}

function MobileSheet({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-auto mb-2 overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.22)]"
      role="dialog"
      aria-modal="true"
    >
      <div className="max-h-[min(62vh,480px)] overflow-y-auto px-3 pb-4 pt-3">
        {children}
      </div>
    </motion.div>
  );
}
