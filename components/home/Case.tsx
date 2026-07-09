"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, scrollStepsPx } from "@/lib/gsap";

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

const cases: CaseItem[] = [
  {
    number: "(01)",
    title: "Branding that drives conversion & funding.",
    description:
      "We clarify your positioning, define a distinctive tone of voice, and build a visual system that works across acquisition and product. Each sprint ships a robust logo, pragmatic brand guidelines, and a social kit so you can launch fast. The goal is simple: perceived value up.",
    color: "hsla(246.88524590163937, 56.48%, 42.35%, 1)",
    href: "/works",
    quote:
      "Working with Brand Appart has been an absolute pleasure. Beyond their creativity and professionalism, there's a real sense of kindness and care in everything they do. The team is always open, generous, and never gets stuck on small details, they never say no. I was truly impressed by their reliability, flexibility, and collaborative spirit. I couldn't recommend them more!",
    author: {
      name: "Jérémy Bendayan",
      role: "Co-founder & COO @Jaws Group",
      image:
        "https://cdn.prod.website-files.com/67f7891166d9b83b9231109e/68403ea61d62eda6b245af20_1738708560978.avif",
    },
    images: [
      "https://cdn.prod.website-files.com/67f7891166d9b83b9231109e/68e622e1f900620069168863_branding-01.avif",
      "https://cdn.prod.website-files.com/67f7891166d9b83b9231109e/68e622e11dd5b6cd8f6f8560_branding-02.avif",
      "https://cdn.prod.website-files.com/67f7891166d9b83b9231109e/68e622e1186f7124847bd445_branding-03.avif",
      "https://cdn.prod.website-files.com/67f7891166d9b83b9231109e/68e622e0f43b55dc529e97b9_branding-04.avif",
      "https://cdn.prod.website-files.com/67f7891166d9b83b9231109e/68e622e103809778f67dd98c_branding-05.avif",
    ],
  },
  {
    number: "(02)",
    title: "Product experiences users adopt & keep using",
    description:
      "We start from business goals, map the critical journeys, and prototype what actually moves the needle. Every sprint ships clear flows, a reusable UI library, and a dev-ready. Expect time-to-value down, UX friction down, retention/NPS up.",
    color: "#f72",
    href: "/works",
    quote:
      "A huge thank you to the entire Brand Appart team for your outstanding work on our rebranding! We're thrilled to have you as an integral part of the Incard team, and we can't wait to reveal what's coming next.",
    author: {
      name: "Théo Cesarini",
      role: "CEO & Co-Founder @Incard & @Fundree",
      image:
        "https://cdn.prod.website-files.com/67f7891166d9b83b9231109e/683df0223365b8119da39098_1722618592452.avif",
    },
    images: [
      "https://cdn.prod.website-files.com/67f7891166d9b83b9231109e/68e633760e1dd0f55c0e7c0a_product-01.avif",
      "https://cdn.prod.website-files.com/67f7891166d9b83b9231109e/68e63376f869c68f5cea9df4_product-02.avif",
      "https://cdn.prod.website-files.com/67f7891166d9b83b9231109e/68e6337695e0b1cfdaefcf26_product-03.avif",
      "https://cdn.prod.website-files.com/67f7891166d9b83b9231109e/68e6337619312f05f66e3d5f_product-04.avif",
      "https://cdn.prod.website-files.com/67f7891166d9b83b9231109e/68e6337651246334ea0392df_product-05.avif",
    ],
  },
  {
    number: "(03)",
    title: "Web Design for growing teams & business.",
    description:
      "We align messaging, page architecture, and UI. You get clear structure, sections. The site loads fast, tells the right story, and pushes to action without dev firefighting. Your team gets a scalable base they can evolve without calling us for every change.",
    color: "#ff3c34",
    href: "/works",
    quote:
      "I've worked with Brand Appart on multiple projects website development, landing pages for branding, and PowerPoint presentations. I love how flexible, fast, and professional the team is. That speed and agility are exactly what we needed at Ircam Amplify.",
    author: {
      name: "Alexis Botaya",
      role: "Managing director @Sound Experience",
      image:
        "https://cdn.prod.website-files.com/67f7891166d9b83b9231109e/683df55bfbee02637c53da16_1664138677695.avif",
    },
    images: [
      "https://cdn.prod.website-files.com/67f7891166d9b83b9231109e/68e63541167dd0ff79e0f7c6_webdesign-01.avif",
      "https://cdn.prod.website-files.com/67f7891166d9b83b9231109e/68e63541b8dc1bbd7e988323_webdesign-02.avif",
      "https://cdn.prod.website-files.com/67f7891166d9b83b9231109e/68e6354120e45d0ecfb10fb4_webdesign-03.avif",
      "https://cdn.prod.website-files.com/67f7891166d9b83b9231109e/68e6354124be687757a781ef_webdesign-04.avif",
      "https://cdn.prod.website-files.com/67f7891166d9b83b9231109e/68e63541ae1384d40a6368a5_webdesign-05.avif",
    ],
  },
  {
    number: "(04)",
    title: "Investor-proof decks that raise faster.",
    description:
      "We craft the narrative that gets meetings and a precise ask. Design serves the story: readable numbers, rhythm across slides, and versions for teaser/one-pager. Your deck can be pitched in 5 minutes, read solo, and generates faster responses.",
    color: "#785f47",
    href: "/works",
    images: [
      "https://cdn.prod.website-files.com/67f7891166d9b83b9231109e/68e635aa0286520b44dea001_pitch-01.avif",
    ],
  },
];

export default function Case() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!wrapperRef.current || !pinRef.current || !listRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!cards.length) return;

      const getLift = () => {
        const vh = window.innerHeight;
        const cardHeight = cards[0].offsetHeight || 564;
        return Math.min(cardHeight * 1.68, vh * 0.95);
      };

      const ctx = gsap.context(() => {
        const lift = getLift();

        gsap.set(listRef.current, {
          perspective: 1200,
          transformStyle: "preserve-3d",
        });

        cards.forEach((card, index) => {
          const title = card.querySelector<HTMLElement>(".service-card-title");
          const content = card.querySelector<HTMLElement>(".service-card-content");

          gsap.set(card, {
            zIndex: cards.length - index,
            transformOrigin: "50% 100%",
            force3D: true,
          });

          if (index > 0) {
            gsap.set(card, { y: -42, rotateX: 14, scale: 0.992 });
            gsap.set(title, {
              y: -100,
              rotateX: 40,
              transformOrigin: "50% 100%",
              force3D: true,
            });
            gsap.set(content, {
              y: -50,
              rotateX: 40,
              transformOrigin: "50% 100%",
              force3D: true,
            });
          } else {
            gsap.set(title, { y: 0, rotateX: 0 });
            gsap.set(content, { y: 0, rotateX: 0 });
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

          const next = cards[index + 1];
          const title = card.querySelector<HTMLElement>(".service-card-title");
          const content = card.querySelector<HTMLElement>(".service-card-content");
          const nextTitle = next.querySelector<HTMLElement>(".service-card-title");
          const nextContent = next.querySelector<HTMLElement>(".service-card-content");

          tl.to(
            card,
            { y: () => -getLift(), rotateX: 15, scale: 0.965, ease: "none", duration: 1 },
            index,
          )
            .to(
              title,
              { y: -100, rotateX: 40, ease: "none", duration: 1 },
              index,
            )
            .to(
              content,
              { y: -50, rotateX: 40, ease: "none", duration: 1 },
              index,
            )
            .to(
              next,
              { y: 0, rotateX: 0, scale: 1, ease: "none", duration: 1 },
              index,
            )
            .to(
              nextTitle,
              { y: 0, rotateX: 0, ease: "none", duration: 1 },
              index,
            )
            .to(
              nextContent,
              { y: 0, rotateX: 0, ease: "none", duration: 1 },
              index,
            );
        });
      }, sectionRef);

      const onRefresh = () => {
        getLift();
      };
      ScrollTrigger.addEventListener("refreshInit", onRefresh);

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", onRefresh);
        ctx.revert();
      };
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

  return (
    <section ref={sectionRef} className="case-section">
      <div className="case-section-inner">
        <div className="case-section-header text-center">
          <span className="inline-block rounded-full border border-[#38F8AB] px-5 py-2 text-sm font-medium text-[#15D286]">
            Success Across Industries
          </span>

          <h2 className="section-heading">
            <span className="section-heading-split-accent section-accent-text">
              Delivering
            </span>
            <span className="section-heading-split-title">
              Success
            </span>
          </h2>

          <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base text-gray-600 px-2">
            Helping businesses achieve measurable growth and lasting impact
            across diverse industries
          </p>
        </div>

        <div ref={wrapperRef} className="tiles_stack_wrapper w-dyn-list">
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

                    <div className="service-card-title">
                      <div className="service-card-count text-large">{item.number}</div>
                      <h3 className="service_card_title">{item.title}</h3>
                      <div className="service-card-desc w-richtext">
                        <p>{item.description}</p>
                      </div>
                    </div>

                    <div className="service-card-content">
                      {item.quote && item.author && (
                        <div className="service-card-quote">
                          <blockquote className="text-xs">{item.quote}</blockquote>
                          <div className="author u-flex">
                            <div className="author_pic u-rounded is-min">
                              <Image
                                src={item.author.image}
                                alt={item.author.name}
                                width={40}
                                height={40}
                                className="u-fluid author-img"
                                unoptimized
                              />
                            </div>
                            <div className="author-infos">
                              <span className="author_name u-block">{item.author.name}</span>
                              <span className="author_job u-block text-xs">{item.author.role}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="service-gallery-wrapper w-dyn-list">
                        <div role="list" className="service-gallery w-dyn-items">
                          {item.images.map((image, imageIndex) => (
                            <div
                              key={imageIndex}
                              role="listitem"
                              className="service-gallery-item is-rounded w-dyn-item"
                            >
                              <Image
                                src={image}
                                alt=""
                                width={600}
                                height={600}
                                className="service-card-img"
                                unoptimized
                              />
                            </div>
                          ))}
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
