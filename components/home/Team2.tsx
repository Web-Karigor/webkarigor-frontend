"use client";

import "./Team2.css";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import homeContent from "@/data/home-content.json";

/** Full ring — Brand Appart uses 14 */
const RING_COUNT = 14;
/** Continuous spin (deg / second) */
const DEG_PER_SEC = 11;

const BASE_MEMBERS = homeContent.team.members;

const members = Array.from({ length: RING_COUNT }, (_, i) => {
  const m = BASE_MEMBERS[i % BASE_MEMBERS.length];
  return { ...m, key: `${i}-${m.src}` };
});

const PIC_Y = ["-25%", "0%", "25%"] as const;

/**
 * Full 360° 3D circle of team cards (Brand Appart tornado).
 * @see https://www.brandappart.com/
 */
export default function Team2() {
  const stageRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const picRefs = useRef<(HTMLDivElement | null)[]>([]);
  const angleRef = useRef(0);
  const rafRef = useRef(0);
  const radiusRef = useRef(480);
  const visibleRef = useRef(true);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const list = listRef.current;
    if (!stage || !list) return;

    const measure = () => {
      // Full viewport width for a wider section ring
      const w = window.innerWidth;
      const h = stage.clientHeight || window.innerHeight;
      // Mobile: larger radius so cards don't stack on top of each other
      const radiusFactor = w < 768 ? 0.64 : 0.5;
      radiusRef.current = Math.min(w * radiusFactor, h * 0.68, 820);
    };

    measure();

    const items = itemRefs.current.filter(Boolean) as HTMLLIElement[];
    const pics = picRefs.current;
    const step = 360 / items.length;
    let last = performance.now();

    const render = (baseDeg: number) => {
      const R = radiusRef.current;
      items.forEach((el, i) => {
        const θ = baseDeg + i * step;
        const rad = (θ * Math.PI) / 180;

        // Full circle in XZ — Brand Appart formula (front at θ≈0 → z≈0)
        const x = R * Math.sin(rad);
        const z = R * (Math.cos(rad) - 1);

        // Depth scale: front ≈ 1, back ≈ 0.72
        const depth = (z + 2 * R) / (2 * R); // 0 at back … 1 at front
        const scale = 0.72 + depth * 0.28;
        // Keep back cards visible but softer
        const opacity = 0.35 + depth * 0.65;

        el.style.transform = `translate(-50%, -50%) translate3d(${x}px, 0px, ${z}px) rotateY(${θ}deg) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(Math.round(1000 + z));

        const pic = pics[i];
        if (pic) {
          pic.style.transform = `translateY(${PIC_Y[i % PIC_Y.length]})`;
        }
      });
    };

    render(0);

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      if (visibleRef.current) {
        angleRef.current += (DEG_PER_SEC * dt) / 1000;
        render(angleRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const onResize = () => {
      measure();
      render(angleRef.current);
    };
    window.addEventListener("resize", onResize);

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    io.observe(stage);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      io.disconnect();
    };
  }, []);

  return (
    <section className="team2" aria-label="Team">
      <div className="team2-container">
        <div className="team2-headline">
          <h2 className="team2-title-small">Small team,</h2>
          <h2 className="team2-title-big" aria-hidden>
            <span className="team2-word-big">
              b
              <span className="team2-i">
                <span className="team2-big-circle" />
                <span className="team2-i-stem">ı</span>
              </span>
              g
            </span>
            <span className="team2-word-results">results</span>
          </h2>
        </div>

        <div ref={stageRef} className="team2-tornado">
          <div className="team2-tornado-wrapper">
            <ul ref={listRef} className="team2-tornado-list" role="list">
              {members.map((member, i) => (
                <li
                  key={member.key}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  className="team2-tornado-item"
                  role="listitem"
                >
                  <div className="team2-card">
                    <div
                      ref={(el) => {
                        picRefs.current[i] = el;
                      }}
                      className="team2-pic"
                    >
                      <Image
                        src={member.src}
                        alt=""
                        fill
                        sizes="200px"
                        className="team2-pic-img"
                        draggable={false}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="team2-actions">
          <Link href="/about-us" className="team2-link">
            <span className="team2-link-title">know more about us</span>
            <span className="team2-link-icon" aria-hidden>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.625 5.96973C0.625 3.0012 3.03147 0.594727 6 0.594727C8.96853 0.594727 11.375 3.0012 11.375 5.96973C11.375 8.93826 8.96853 11.3447 6 11.3447C3.03147 11.3447 0.625 8.93826 0.625 5.96973ZM4.67109 5.28974C4.7705 5.10805 4.99838 5.04135 5.18007 5.14076C5.41375 5.26862 5.69471 5.34474 6.00007 5.34474C6.30543 5.34474 6.58639 5.26862 6.82007 5.14076C7.00176 5.04135 7.22964 5.10805 7.32905 5.28974C7.42846 5.47143 7.36176 5.6993 7.18007 5.79871C6.83492 5.98756 6.43001 6.09474 6.00007 6.09474C5.57014 6.09474 5.16522 5.98756 4.82007 5.79871C4.63838 5.6993 4.57168 5.47143 4.67109 5.28974ZM4.5 2.84473C4.15482 2.84473 3.875 3.12455 3.875 3.46973C3.875 3.81491 4.15482 4.09473 4.5 4.09473H4.50336C4.84854 4.09473 5.12836 3.81491 5.12836 3.46973C5.12836 3.12455 4.84854 2.84473 4.50336 2.84473H4.5ZM7.49664 2.84473C7.15146 2.84473 6.87164 3.12455 6.87164 3.46973C6.87164 3.81491 7.15146 4.09473 7.49664 4.09473H7.5C7.84518 4.09473 8.125 3.81491 8.125 3.46973C8.125 3.12455 7.84518 2.84473 7.5 2.84473H7.49664Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
