"use client";

import "./Case.css";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap, scrollStepsPx } from "@/lib/gsap";
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
} = homeContent.case;

const cases = homeContent.case.items as CaseItem[];

export default function Case() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!wrapperRef.current || !pinRef.current || !listRef.current) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    const getLift = () => {
      const cardHeight = cards[0].offsetHeight || 564;
      return cardHeight * 1.05;
    };

    const getStackY = (stackIndex: number) => `${stackIndex * 10}%`;
    const getStackZ = (stackIndex: number) => -stackIndex * 30;
    /** Lift + next reveal run together so content never goes blank. */
    const stepDuration = 1;

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

        // Always visible — no empty flash between cards
        gsap.set(title, { y: 0, rotateX: 0, autoAlpha: 1 });
        gsap.set(content, { y: 0, rotateX: 0, autoAlpha: 1 });
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
        if (!title || !content || !next) return;

        const segment = index;

        tl.set(card, { zIndex: 50 }, segment)
          .to(
            card,
            {
              y: () => -getLift(),
              z: 40,
              rotateX: 10,
              transformOrigin: "50% 100%",
              ease: "none",
              duration: stepDuration,
            },
            segment,
          )
          .to(
            title,
            { y: -80, rotateX: 28, ease: "none", duration: stepDuration },
            segment,
          )
          .to(
            content,
            { y: -40, rotateX: 28, ease: "none", duration: stepDuration },
            segment,
          )
          // Next card rises in parallel — stays fully visible underneath
          .to(
            next,
            {
              y: 0,
              z: 0,
              rotateX: 0,
              ease: "none",
              duration: stepDuration,
            },
            segment,
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
              duration: stepDuration,
            },
            segment,
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
  }, []);

  return (
    <section ref={sectionRef} className="case-section">
      <div className="case-section-inner">
        <div className="case-section-header">
          <span className="case-section-badge">
            <span className="section-badge-text">{caseBadge}</span>
          </span>
          <h2 className="case-section-heading">
            <span className="section-heading-split-accent section-accent-text">
              {caseHeadingAccent}
            </span>
            <span className="section-heading-split-title">{caseHeadingTitle}</span>
          </h2>
          <p className="case-section-desc">{caseDescription}</p>
        </div>

        <div ref={wrapperRef} className="tiles_stack_wrapper case-stack">
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
                              <span className="author_name u-block">
                                {item.author.name}
                              </span>
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
