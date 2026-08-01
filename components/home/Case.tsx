"use client";

import "./Case.css";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, scrollStepsPx } from "@/lib/gsap";
import homeContent from "@/data/home-content.json";

type CaseItem = {
  number: string;
  title: string;
  description: string;
  color: string;
  href: string;
  quote?: string;
  author?: {
    name: string;
    role: string;
    image: string;
  };
  images: string[];
};

const {
  badge: caseBadge,
  headingAccent: caseHeadingAccent,
  headingTitle: caseHeadingTitle,
  description: caseDescription,
  cursorLabel,
} = homeContent.case;

const cases = homeContent.case.items as CaseItem[];

function CaseCursor({
  active,
  x,
  y,
}: {
  active: boolean;
  x: number;
  y: number;
}) {
  return (
    <div
      className="case-cursor"
      aria-hidden
      style={{
        transform: `translate3d(${x}px, ${y}px, 0) scale(${active ? 1 : 0.85})`,
        opacity: active ? 1 : 0,
      }}
    >
      <span className="case-cursor__text">{cursorLabel}</span>
      <span className="case-cursor__icon" aria-hidden>
        <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
          <path
            d="M10 6.2973H2"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.5 8.79742C7.5 8.79742 10 6.9562 10 6.2974C10 5.63861 7.5 3.79742 7.5 3.79742"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}

export default function Case() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cursorRef = useRef({ x: 0, y: 0, active: false });
  const [, forceCursor] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const mm = window.matchMedia("(min-width: 1024px)");
    if (!mm.matches) return;

    const onMove = (event: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      cursorRef.current = {
        x: event.clientX,
        y: event.clientY,
        active: inside,
      };

      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(() => {
          rafRef.current = null;
          forceCursor((value) => value + 1);
        });
      }
    };

    const onLeave = () => {
      cursorRef.current.active = false;
      forceCursor((value) => value + 1);
    };

    window.addEventListener("mousemove", onMove);
    wrapper.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      wrapper.removeEventListener("mouseleave", onLeave);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useLayoutEffect(() => {
    if (!wrapperRef.current || !pinRef.current || !listRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!cards.length) return;

      const getLift = () => {
        const cardHeight = cards[0].offsetHeight || 564;
        return cardHeight * 1.15;
      };

      const getStackY = (stackIndex: number) => `${stackIndex * 10}%`;
      const getStackZ = (stackIndex: number) => -stackIndex * 30;
      const liftDuration = 0.68;
      const revealDuration = 0.32;

      const ctx = gsap.context(() => {
        gsap.set(listRef.current, {
          perspective: 1200,
          transformStyle: "preserve-3d",
        });

        cards.forEach((card, index) => {
          const title = card.querySelector<HTMLElement>(".service-card-title");
          const content = card.querySelector<HTMLElement>(".service-card-content");
          if (!title || !content) return;

          gsap.set(card, {
            zIndex: cards.length - index,
            force3D: true,
            y: index === 0 ? 0 : getStackY(index),
            z: getStackZ(index),
            scale: 1,
            rotateX: 0,
          });

          if (index === 0) {
            gsap.set(title, { y: 0, rotateX: 0, autoAlpha: 1, clearProps: "transform" });
            gsap.set(content, { y: 0, rotateX: 0, autoAlpha: 1, clearProps: "transform" });
          } else {
            gsap.set(title, { y: 0, rotateX: 0, autoAlpha: 0 });
            gsap.set(content, { y: 0, rotateX: 0, autoAlpha: 0 });
          }
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: () => `+=${scrollStepsPx(Math.max(cards.length - 1, 1))}`,
            pin: pinRef.current,
            pinSpacing: true,
            scrub: 0.85,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        cards.forEach((card, index) => {
          if (index === cards.length - 1) return;

          const title = card.querySelector<HTMLElement>(".service-card-title");
          const content = card.querySelector<HTMLElement>(".service-card-content");
          const next = cards[index + 1];
          const nextTitle = next.querySelector<HTMLElement>(".service-card-title");
          const nextContent = next.querySelector<HTMLElement>(".service-card-content");
          if (!title || !content || !nextTitle || !nextContent) return;

          const segment = index;
          const revealAt = segment + liftDuration;

          tl.set(card, { zIndex: 50 }, segment)
            .to(
              card,
              {
                y: () => -getLift(),
                z: 40,
                rotateX: 10,
                transformOrigin: "50% 100%",
                ease: "none",
                duration: liftDuration,
              },
              segment,
            )
            .to(
              title,
              { y: -80, rotateX: 28, ease: "none", duration: liftDuration },
              segment,
            )
            .to(
              content,
              { y: -40, rotateX: 28, ease: "none", duration: liftDuration },
              segment,
            )
            .to(
              next,
              { y: 0, z: 0, rotateX: 0, ease: "none", duration: revealDuration },
              revealAt,
            )
            .to(
              nextTitle,
              { y: 0, rotateX: 0, autoAlpha: 1, ease: "none", duration: 0.22 },
              revealAt + 0.12,
            )
            .to(
              nextContent,
              { y: 0, rotateX: 0, autoAlpha: 1, ease: "none", duration: 0.22 },
              revealAt + 0.12,
            );

          for (let j = index + 2; j < cards.length; j++) {
            const stackPos = j - index - 1;
            tl.to(
              cards[j],
              {
                y: getStackY(stackPos),
                z: getStackZ(stackPos),
                rotateX: 0,
                ease: "none",
                duration: revealDuration,
              },
              revealAt,
            );
          }

          tl.add(() => {
            cards.forEach((stackCard, stackIndex) => {
              if (stackIndex <= index) {
                gsap.set(stackCard, { zIndex: 0 });
                return;
              }

              const stackPos = stackIndex - index - 1;
              gsap.set(stackCard, { zIndex: cards.length - stackPos });
            });
          }, segment + 0.999);
        });
      }, sectionRef.current ?? undefined);

      return () => ctx.revert();
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.set(listRef.current, { clearProps: "all" });

      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.set(card, { clearProps: "all" });
        card
          .querySelectorAll<HTMLElement>(".service-card-title, .service-card-content")
          .forEach((el) => {
            gsap.set(el, { clearProps: "all" });
          });
      });
    });

    return () => mm.revert();
  }, []);

  const cursor = cursorRef.current;

  return (
    <section ref={sectionRef} className="case-section">
      <div className="case-section-inner">
        <div className="case-section-header">
          <span className="case-section-badge">
            <span className="section-badge-text">{caseBadge}</span>
          </span>
          <h2 className="case-section-heading">
            <span className="section-heading-split-accent section-accent-text">{caseHeadingAccent}</span>
            <span className="section-heading-split-title">{caseHeadingTitle}</span>
          </h2>
          <p className="case-section-desc">
            {caseDescription}
          </p>
        </div>

        <div ref={wrapperRef} className="tiles_stack_wrapper case-stack">
          <CaseCursor active={cursor.active} x={cursor.x} y={cursor.y} />

          <div ref={pinRef} className="tiles_stack_pin">
            <div ref={listRef} role="list" className="tiles_stack_list w-dyn-items">
              {cases.map((item, index) => (
                <div
                  key={item.number}
                  role="listitem"
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="tiles_stack_item w-dyn-item"
                >
                  <div
                    className="service-card"
                    style={{ backgroundColor: item.color }}
                  >
                    <Link
                      href={item.href}
                      className="service-card-link u-cover"
                      aria-label={item.title}
                    />

                    <div className="service-card-count text-large">{item.number}</div>

                    <div className="service-card-body">
                      <div className="service-card-title">
                        <div className="service-card-copy">
                          <h3 className="service_card_title">{item.title}</h3>
                          <div className="service-card-desc w-richtext">
                            <p>{item.description}</p>
                          </div>
                        </div>

                        {item.author && (
                          <div className="service-card-author">
                            <div className="author_pic u-rounded is-min">
                              <Image
                                src={item.author.image}
                                alt={item.author.name}
                                width={48}
                                height={48}
                                className="u-fluid author-img"
                                unoptimized
                              />
                            </div>
                            <div className="author-infos">
                              <span className="author_name u-block">{item.author.name}</span>
                              <span className="author_job u-block text-xs">
                                {item.author.role}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="service-card-content">
                        <div className="service-card-media is-rounded">
                          <Image
                            src={item.images[0]}
                            alt=""
                            fill
                            className="service-card-featured-img"
                            sizes="(max-width: 1023px) 100vw, 42vw"
                            unoptimized
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
