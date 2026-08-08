"use client";

import "./Navbar.css";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ChevronRight, EllipsisVertical, X } from "lucide-react";
import homeContent from "@/data/home-content.json";
import {
  STICKY_NAV_MORE_LINKS,
  STICKY_NAV_PROJECTS,
  STICKY_NAV_SERVICES,
} from "@/lib/sticky-nav-data";

const { brand } = homeContent.navbar;

type NavMenu = "projects" | "services" | "more";

type NavItem =
  | { id: string; label: string; href: string; kind: "link" }
  | { id: string; label: string; menu: NavMenu; kind: "menu"; href?: string };

type PillBox = {
  left: number;
  width: number;
};

const MENU_TO_ACTIVE: Record<NavMenu, string> = {
  projects: "case",
  services: "service",
  more: "more",
};

const NAV_ITEMS: NavItem[] = [
  { id: "case", label: "Projects", menu: "projects", href: "/projects", kind: "menu" },
  { id: "service", label: "Services", menu: "services", href: "/service", kind: "menu" },
  { id: "brand", label: brand, href: "/", kind: "link" },
  { id: "pricing", label: "Pricing", href: "/pricing", kind: "link" },
  { id: "more", label: "More", menu: "more", kind: "menu" },
];

function getActiveIdFromPath(pathname: string | null): string {
  if (!pathname) return "brand";
  if (pathname.startsWith("/pricing")) return "pricing";
  if (pathname.startsWith("/service")) return "service";
  if (pathname.startsWith("/case") || pathname.startsWith("/projects")) {
    return "case";
  }
  if (pathname.startsWith("/about") || pathname.startsWith("/contact")) {
    return "more";
  }
  return "brand";
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const pathname = usePathname();
  const [activeId, setActiveId] = useState(() => getActiveIdFromPath(pathname));
  const [pill, setPill] = useState<PillBox | null>(null);
  const [openMenu, setOpenMenu] = useState<NavMenu | null>(null);

  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});
  const pillLockRef = useRef(false);
  const pillLockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeMenu = useCallback(() => setOpenMenu(null), []);

  const openMenuById = useCallback((menu: NavMenu) => {
    if (hoverCloseTimerRef.current) {
      clearTimeout(hoverCloseTimerRef.current);
      hoverCloseTimerRef.current = null;
    }
    setOpenMenu(menu);
    setActiveId(MENU_TO_ACTIVE[menu]);
  }, []);

  const toggleMenu = useCallback((menu: NavMenu) => {
    setOpenMenu((curr) => {
      const next = curr === menu ? null : menu;
      if (next) setActiveId(MENU_TO_ACTIVE[next]);
      return next;
    });
  }, []);

  const scheduleCloseMenu = useCallback(() => {
    if (hoverCloseTimerRef.current) clearTimeout(hoverCloseTimerRef.current);
    hoverCloseTimerRef.current = setTimeout(() => {
      setOpenMenu(null);
      hoverCloseTimerRef.current = null;
    }, 160);
  }, []);

  const cancelCloseMenu = useCallback(() => {
    if (hoverCloseTimerRef.current) {
      clearTimeout(hoverCloseTimerRef.current);
      hoverCloseTimerRef.current = null;
    }
  }, []);

  const measurePill = useCallback((id: string): PillBox | null => {
    const nav = navRef.current;
    const el = itemRefs.current[id];
    if (!nav || !el) return null;

    const navBox = nav.getBoundingClientRect();
    const linkBox = el.getBoundingClientRect();

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
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);

      if (y <= 12) {
        setNavHidden(false);
        if (scrollIdleTimerRef.current) {
          clearTimeout(scrollIdleTimerRef.current);
          scrollIdleTimerRef.current = null;
        }
        return;
      }

      setNavHidden(true);
      if (scrollIdleTimerRef.current) clearTimeout(scrollIdleTimerRef.current);
      scrollIdleTimerRef.current = setTimeout(() => {
        setNavHidden(false);
        scrollIdleTimerRef.current = null;
      }, 1300);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollIdleTimerRef.current) clearTimeout(scrollIdleTimerRef.current);
    };
  }, []);

  useEffect(() => {
    closeMenu();
    const nextId = getActiveIdFromPath(pathname);
    setActiveId((prev) => (prev === nextId ? prev : nextId));
  }, [pathname, closeMenu]);

  useEffect(() => {
    if (!openMenu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openMenu, closeMenu]);

  useEffect(() => {
    return () => {
      if (hoverCloseTimerRef.current) clearTimeout(hoverCloseTimerRef.current);
    };
  }, []);

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
  }, [activeId, openMenu, updatePill]);

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
      <AnimatePresence>
        {openMenu ? (
          <motion.button
            type="button"
            aria-label="Close menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="navbar-dropdown-backdrop fixed inset-0 z-[9998] bg-black/20 backdrop-blur-[2px]"
            onClick={closeMenu}
            onMouseEnter={scheduleCloseMenu}
          />
        ) : null}
      </AnimatePresence>

      <div
        className={`navbar-glow transition-opacity duration-300 ${scrolled ? "opacity-0" : ""}`}
        aria-hidden
      />

      <div
        className={`navbar-sticky sticky top-4 z-[9999] h-0 overflow-visible sm:top-6 lg:top-[39px]${
          navHidden ? " is-hidden" : ""
        }`}
      >
        <header className="relative left-0 right-0 overflow-visible">
          <div className="relative mx-auto max-w-[1800px] px-4 sm:px-6">
            <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6">
              <div aria-hidden />

              <nav
                className="relative"
                onMouseLeave={scheduleCloseMenu}
                onMouseEnter={cancelCloseMenu}
              >
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

                      {NAV_ITEMS.map((item) => {
                        const isActive = item.id === activeId;

                        if (item.kind === "menu") {
                          const isOpen = openMenu === item.menu;
                          const menuClass = `navbar-link navbar-menu-trigger${
                            isActive || isOpen ? " is-active" : ""
                          }`;
                          const menuLabel = (
                            <span className="inline-flex items-center gap-1.5">
                              <span className="navbar-link-label">{item.label}</span>
                              {item.menu === "more" ? (
                                <EllipsisVertical
                                  className="navbar-more-icon h-[1em] w-[1em] shrink-0"
                                  strokeWidth={2.25}
                                  aria-hidden
                                />
                              ) : null}
                            </span>
                          );

                          /* Projects / Services: click → page, hover → modal */
                          if (item.href) {
                            return (
                              <Link
                                key={item.id}
                                href={item.href}
                                ref={(el) => {
                                  itemRefs.current[item.id] = el;
                                }}
                                className={menuClass}
                                aria-expanded={isOpen}
                                aria-current={isActive ? "page" : undefined}
                                onMouseEnter={() => openMenuById(item.menu)}
                                onFocus={() => openMenuById(item.menu)}
                                onClick={() => {
                                  closeMenu();
                                  setActiveId(item.id);
                                }}
                              >
                                {menuLabel}
                              </Link>
                            );
                          }

                          /* More: click toggles modal only */
                          return (
                            <button
                              key={item.id}
                              type="button"
                              ref={(el) => {
                                itemRefs.current[item.id] = el;
                              }}
                              className={menuClass}
                              aria-expanded={isOpen}
                              onMouseEnter={() => openMenuById(item.menu)}
                              onFocus={() => openMenuById(item.menu)}
                              onClick={() => toggleMenu(item.menu)}
                            >
                              {menuLabel}
                            </button>
                          );
                        }

                        return (
                          <Link
                            key={item.id}
                            href={item.href}
                            ref={(el) => {
                              itemRefs.current[item.id] = el;
                            }}
                            className={`navbar-link${isActive ? " is-active" : ""}`}
                            aria-current={isActive ? "page" : undefined}
                            onMouseEnter={scheduleCloseMenu}
                            onClick={() => {
                              closeMenu();
                              setActiveId(item.id);
                            }}
                          >
                            <span className="navbar-link-label">{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {openMenu === "projects" ? (
                    <NavDropdown key="projects" title="Latest Projects" onClose={closeMenu}>
                      <div className="space-y-1">
                        {STICKY_NAV_PROJECTS.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={closeMenu}
                            className="navbar-dropdown-link"
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
                          onClick={closeMenu}
                          className="navbar-dropdown-link mt-1 border-t border-[#eef0f3] pt-3"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-montserrat text-[15px] font-semibold text-[#0EC47B]">
                              View all projects
                            </span>
                            <ChevronRight className="h-4 w-4 text-[#0EC47B]" />
                          </div>
                        </Link>
                      </div>
                    </NavDropdown>
                  ) : null}

                  {openMenu === "services" ? (
                    <NavDropdown key="services" title="Services" onClose={closeMenu}>
                      <div className="space-y-1">
                        {STICKY_NAV_SERVICES.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={closeMenu}
                            className="navbar-dropdown-link"
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
                    </NavDropdown>
                  ) : null}

                  {openMenu === "more" ? (
                    <NavDropdown key="more" title="More" onClose={closeMenu}>
                      <div className="space-y-1">
                        {STICKY_NAV_MORE_LINKS.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={closeMenu}
                            className="navbar-dropdown-link"
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
                    </NavDropdown>
                  ) : null}
                </AnimatePresence>
              </nav>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

function NavDropdown({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="navbar-dropdown pointer-events-auto absolute left-1/2 top-[calc(100%+14px)] z-[10000] w-[min(100vw-2rem,360px)] -translate-x-1/2 overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.18)]"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="flex items-center justify-between px-4 pt-4">
        <p className="m-0 font-montserrat text-[11px] font-semibold tracking-[0.14em] text-[#0EC47B] uppercase">
          {title}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f3f4f6] text-[#111827]"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="max-h-[min(62vh,480px)] overflow-y-auto px-3 pb-4 pt-2">
        {children}
      </div>
    </motion.div>
  );
}
