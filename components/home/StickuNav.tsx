"use client";

import "./StickuNav.css";

import Image from "next/image";
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

const SERVICES = [
  {
    href: "/service",
    title: "All Services",
    desc: "Full-stack product design & development.",
  },
  {
    href: "/service/ecommerce",
    title: "E-commerce",
    desc: "Stores built to convert and scale.",
  },
  {
    href: "/service/erp",
    title: "ERP",
    desc: "Custom systems for operations.",
  },
  {
    href: "/service/manpower",
    title: "Manpower",
    desc: "Specialist talent for your team.",
  },
] as const;

const MORE_LINKS = [
  { href: "/", title: "Home", desc: "Back to Webkarigor home" },
  { href: "/about-us", title: "About us", desc: "Who we are and how we work" },
  { href: "/projects", title: "Case studies", desc: "Selected work & results" },
  { href: "/pricing", title: "Pricing", desc: "Plans that fit your stage" },
  { href: "/contact-us", title: "Contact us", desc: "Say hello — we reply fast" },
] as const;

type Sheet = "services" | "more" | null;

export default function StickyNav() {
  const pathname = usePathname();
  const [sheet, setSheet] = useState<Sheet>(null);

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
            {sheet === "services" ? (
              <MobileSheet key="services" onClose={close}>
                <p className="mb-3 px-1 font-montserrat text-[11px] font-semibold tracking-[0.14em] text-[#0EC47B] uppercase">
                  Services
                </p>
                <div className="space-y-1">
                  {SERVICES.map((item) => (
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
              <MobileSheet key="more" onClose={close}>
                <p className="mb-3 px-1 font-montserrat text-[11px] font-semibold tracking-[0.14em] text-[#0EC47B] uppercase">
                  More
                </p>
                <div className="space-y-1">
                  {MORE_LINKS.map((item) => (
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

                <Link
                  href="/projects"
                  onClick={close}
                  className="mt-4 block overflow-hidden rounded-xl border border-[#eef0f3]"
                >
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-montserrat text-[15px] font-bold text-[#111827]">
                        Our latest work
                      </h3>
                      <ChevronRight className="h-4 w-4 text-[#9ca3af]" />
                    </div>
                    <p className="mt-1 font-montserrat text-[12px] font-medium leading-snug text-[#6b7280]">
                      Browse case studies and see how we grow products.
                    </p>
                  </div>
                  <figure className="relative h-28 w-full bg-[#f3f4f6]">
                    <Image
                      src="/sm2.jpg"
                      alt="Latest work"
                      fill
                      className="object-cover"
                      sizes="400px"
                    />
                  </figure>
                </Link>
              </MobileSheet>
            ) : null}
          </AnimatePresence>

          <div className="pointer-events-auto sticky-nav-ring mt-2">
            <nav className="sticky-nav-bar" aria-label="Mobile sticky navigation">
              <Link
                href="/projects"
                className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-2 font-montserrat text-[10px] font-semibold transition ${
                  pathname?.startsWith("/projects") ||
                  pathname?.startsWith("/case")
                    ? "text-[#0EC47B]"
                    : "text-[#1f1e1c]/70 active:text-[#1f1e1c]"
                }`}
              >
                <FolderKanban className="h-4 w-4" />
                <span>Case</span>
              </Link>

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
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
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
      <div className="flex items-center justify-end px-3 pt-3">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f3f4f6] text-[#111827]"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="max-h-[min(62vh,480px)] overflow-y-auto px-3 pb-4">
        {children}
      </div>
    </motion.div>
  );
}
