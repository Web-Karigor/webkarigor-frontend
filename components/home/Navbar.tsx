"use client";

import "./Navbar.css";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import homeContent from "@/data/home-content.json";

const { brand, desktopLinks, mobileLinks, aria } = homeContent.navbar;

type NavItem = {
  id: string;
  label: string;
  href: string;
};

type PillBox = {
  left: number;
  width: number;
};

function getActiveIdFromPath(pathname: string | null): string {
  if (!pathname) return "brand";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/contact")) return "contact";
  if (pathname.startsWith("/case") || pathname.startsWith("/projects")) {
    return "case";
  }
  if (pathname.startsWith("/service")) return "service";
  return "brand";
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [activeId, setActiveId] = useState(() => getActiveIdFromPath(pathname));
  const [pill, setPill] = useState<PillBox | null>(null);

  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const pillLockRef = useRef(false);
  const pillLockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [caseLink, serviceLink, contactLink, aboutLink] = desktopLinks;

  const items: NavItem[] = [
    { id: "case", label: caseLink.label, href: caseLink.href },
    { id: "service", label: serviceLink.label, href: serviceLink.href },
    { id: "brand", label: brand, href: "/" },
    { id: "contact", label: contactLink.label, href: contactLink.href },
    { id: "about", label: aboutLink.label, href: aboutLink.href },
  ];

  const measurePill = useCallback((id: string): PillBox | null => {
    const nav = navRef.current;
    const link = linkRefs.current[id];
    if (!nav || !link) return null;

    const navBox = nav.getBoundingClientRect();
    const linkBox = link.getBoundingClientRect();

    return {
      left: linkBox.left - navBox.left,
      width: linkBox.width,
    };
  }, []);

  const updatePill = useCallback(
    (opts?: { force?: boolean }) => {
      if (pillLockRef.current && !opts?.force) return;

      const next = measurePill(activeId);
      if (!next) return;

      setPill((prev) => {
        if (
          prev &&
          Math.abs(prev.left - next.left) < 0.5 &&
          Math.abs(prev.width - next.width) < 0.5
        ) {
          return prev;
        }
        return next;
      });
    },
    [activeId, measurePill],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nextId = getActiveIdFromPath(pathname);
    setActiveId((prev) => (prev === nextId ? prev : nextId));
  }, [pathname]);

  useLayoutEffect(() => {
    pillLockRef.current = true;
    updatePill({ force: true });

    if (pillLockTimerRef.current) clearTimeout(pillLockTimerRef.current);
    pillLockTimerRef.current = setTimeout(() => {
      pillLockRef.current = false;
    }, 500);

    return () => {
      if (pillLockTimerRef.current) clearTimeout(pillLockTimerRef.current);
    };
  }, [activeId, updatePill]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const onResize = () => updatePill();
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(() => updatePill());
    ro.observe(nav);

    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [updatePill]);

  if (pathname?.startsWith("/service")) {
    return null;
  }

  return (
    <>
      <div
        className={`navbar-glow transition-opacity duration-300 ${scrolled ? "opacity-0" : ""}`}
        aria-hidden
      />

      {/* Keep sticky top fixed — scroll only changes blur/bg, never position (no route-arrival jolt) */}
      <div className="sticky top-4 z-[9999] h-0 overflow-visible sm:top-6 lg:top-[39px]">
        <header className="relative left-0 right-0 overflow-visible">
          <div className="relative mx-auto max-w-[1800px] px-4 sm:px-6">
            <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6">
              <div aria-hidden />

              <nav>
                <div className="navbar-border-ring">
                  <div
                    className={`navbar-container flex items-center justify-center box-border ${
                      scrolled ? "navbar-container--scrolled" : ""
                    }`}
                  >
                    <div
                      ref={navRef}
                      className="navbar-content flex items-center justify-center font-semibold"
                    >
                      {pill ? (
                        <motion.span
                          className="navbar-active-pill"
                          initial={false}
                          animate={{
                            left: pill.left,
                            width: pill.width,
                          }}
                          transition={{
                            duration: 0.45,
                            ease: [0.4, 0, 0.2, 1],
                          }}
                          aria-hidden
                        />
                      ) : null}

                      {items.map((item) => {
                        const isActive = item.id === activeId;

                        return (
                          <Link
                            key={item.id}
                            href={item.href}
                            ref={(el) => {
                              linkRefs.current[item.id] = el;
                            }}
                            className={`navbar-link${isActive ? " is-active" : ""}`}
                            aria-current={isActive ? "page" : undefined}
                            onClick={() => setActiveId(item.id)}
                          >
                            <span className="navbar-link-label">{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </nav>
            </div>

            <div className="flex items-center justify-between lg:hidden">
              <div className="navbar-mobile-ring">
                <Link
                  href="/"
                  className={`navbar-mobile-surface block rounded-[11.5px] px-3 py-2 font-bold text-base sm:text-lg ${
                    scrolled ? "navbar-mobile-surface--scrolled" : ""
                  }`}
                >
                  {brand}
                </Link>
              </div>

              <div className="navbar-mobile-ring navbar-mobile-ring--btn">
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  className={`navbar-mobile-surface flex h-10 w-10 items-center justify-center ${
                    scrolled ? "navbar-mobile-surface--scrolled" : ""
                  }`}
                  aria-label={open ? aria.closeMenu : aria.openMenu}
                >
                  <span className="text-2xl">{open ? "✕" : "☰"}</span>
                </button>
              </div>
            </div>

            {open && (
              <div className="mt-4 space-y-5 rounded-2xl border bg-white p-6 shadow-xl lg:hidden">
                {mobileLinks.map((link) => (
                  <Link
                    key={link.href + link.label}
                    onClick={() => setOpen(false)}
                    href={link.href}
                    className="block font-semibold"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </header>
      </div>
    </>
  );
}
