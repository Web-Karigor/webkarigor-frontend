"use client";

import "./Case.css";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useLayoutEffect, useRef } from "react";
import { gsap, scrollStepsPx } from "@/lib/gsap";
import homeContent from "@/data/home-content.json";

type CaseItem = {
  number: string;
  tags?: string[];
  title: string;
  titleOneLine?: boolean;
  description: string;
  platforms?: string[];
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
      const cardHeight = cards[0].offsetHeight || 694;
      const pinHeight = pinRef.current?.offsetHeight || window.innerHeight;
      // Card is vertically centered in the pin — clear top gap + full card + buffer
      const topGap = Math.max(0, (pinHeight - cardHeight) / 2);
      return topGap + cardHeight + 48;
    };

    const getStackY = (stackIndex: number) => `${stackIndex * 10}%`;
    const getStackZ = (stackIndex: number) => -stackIndex * 28;
    /** Lift + next reveal run together so content never goes blank. */
    const stepDuration = 1;

    const ctx = gsap.context(() => {
      gsap.set(listRef.current, {
        perspective: 1400,
        transformStyle: "preserve-3d",
        force3D: true,
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
          transformOrigin: "50% 100%",
        });

        gsap.set([title, content], {
          y: 0,
          rotateX: 0,
          autoAlpha: 1,
          force3D: true,
          transformOrigin: "50% 100%",
        });
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: () => `+=${scrollStepsPx(Math.max(cards.length - 1, 1))}`,
          pin: pinRef.current,
          pinSpacing: true,
          pinType: "fixed",
          scrub: true,
          anticipatePin: 0,
          fastScrollEnd: false,
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

        tl.set(card, { zIndex: 60 }, segment)
          .to(
            card,
            {
              y: () => -getLift(),
              z: 36,
              rotateX: 8,
              duration: stepDuration,
            },
            segment,
          )
          .to(
            title,
            { y: -64, rotateX: 18, duration: stepDuration },
            segment,
          )
          .to(
            content,
            { y: -32, rotateX: 18, duration: stepDuration },
            segment,
          )
          .to(
            next,
            {
              y: 0,
              z: 0,
              rotateX: 0,
              duration: stepDuration,
            },
            segment,
          )
          .set(card, { zIndex: 0 }, segment + stepDuration);

        for (let j = index + 2; j < cards.length; j++) {
          const stackPos = j - index - 1;
          tl.to(
            cards[j],
            {
              y: getStackY(stackPos),
              z: getStackZ(stackPos),
              rotateX: 0,
              duration: stepDuration,
            },
            segment,
          ).set(cards[j], { zIndex: cards.length - stackPos }, segment);
        }
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
      </div>

      {/* Full-bleed pin shell — keeps cards centered before & during pin (no left→middle jump) */}
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
                          {item.tags?.length ? (
                            <p className="service-card-tags">
                              {item.tags.map((tag, i) => (
                                <span key={`${tag}-${i}`} className="service-card-tags-item">
                                  {i > 0 ? (
                                    <span className="service-card-sep" aria-hidden>
                                      •
                                    </span>
                                  ) : null}
                                  {tag}
                                </span>
                              ))}
                            </p>
                          ) : null}

                        <h3
                          className={`service_card_title${
                            item.titleOneLine ? " is-one-line" : ""
                          }`}
                        >
                          {item.title}
                        </h3>

                        <div className="service-card-desc w-richtext">
                          <p>{item.description}</p>
                        </div>

                        {item.platforms?.length ? (
                          <div className="service-card-platforms">
                            <span className="service-card-platforms-label">
                              Platforms
                            </span>
                              <p className="service-card-platforms-list">
                                {item.platforms.map((platform, i) => (
                                  <Fragment key={`${platform}-${i}`}>
                                    {i > 0 ? (
                                      <span
                                        className="service-card-platforms-sep"
                                        aria-hidden
                                      >
                                        •
                                      </span>
                                    ) : null}
                                    <span className="service-card-platforms-item">
                                      {platform}
                                    </span>
                                  </Fragment>
                                ))}
                              </p>
                          </div>
                        ) : null}
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
                            <span className="author_job">
                              {item.author.role
                                .split(/\s*•\s*/)
                                .map((part, i) => (
                                  <Fragment key={`${part}-${i}`}>
                                    {i > 0 ? (
                                      <span
                                        className="author_job-sep"
                                        aria-hidden
                                      >
                                        •
                                      </span>
                                    ) : null}
                                    <span className="author_job-part">
                                      {part}
                                    </span>
                                  </Fragment>
                                ))}
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
                          sizes="(max-width: 1023px) 100vw, 493px"
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
    </section>
  );
}
