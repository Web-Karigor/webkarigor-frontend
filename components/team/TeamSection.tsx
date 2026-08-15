"use client";

import "./TeamSection.css";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import teamContent from "@/data/team-content.json";

const { headline, intro, members } = teamContent;

/** Brand Appart 3-col stagger: 1-2 → 1-3 → 2-3 (repeats) */
const COL_PATTERN = [1, 2, 1, 3, 2, 3] as const;

function firstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0] ?? fullName;
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  /** Multiple cards can stay open at once */
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());

  const toggleMember = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  useLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const items = root.querySelectorAll(".team_grid_item");
      gsap.from(items, {
        autoAlpha: 0,
        y: 28,
        duration: 0.75,
        stagger: 0.05,
        ease: "power2.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: root.querySelector(".team_grid"),
          start: "top 85%",
          once: true,
        },
      });

      root.querySelectorAll<HTMLElement>(".teammate_card_thumbnail").forEach((thumb) => {
        const enter = () => {
          if (thumb.classList.contains("is-open")) return;
          gsap.to(thumb, { y: -6, duration: 0.45, ease: "power2.out" });
        };
        const leave = () =>
          gsap.to(thumb, { y: 0, duration: 0.5, ease: "power2.out" });
        thumb.addEventListener("mouseenter", enter);
        thumb.addEventListener("mouseleave", leave);
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="team-section" aria-label="Our team">
      <div className="team-container">
        <div className="team_headline">
          <div className="team_section_title">
            <h2>
              <div className="team-line team-line--split">
                <span>{headline.line1Left}</span>
                <span>{headline.line1Right}</span>
              </div>
              <div className="team-line team-line--center">
                <span>{headline.line2}</span>
              </div>
              <div className="team-line team-line--end">
                <span>{headline.line3}</span>
              </div>
            </h2>
          </div>

          <div className="team_section_intro">
            <p>{intro}</p>
          </div>
        </div>

        <div className="team_grid_wrapper">
          <div role="list" className="team_grid">
            {members.map((member, index) => {
              const isOpen = openIds.has(member.id);
              return (
                <div
                  key={member.id}
                  role="listitem"
                  className="team_grid_item"
                  style={{ gridColumn: COL_PATTERN[index % COL_PATTERN.length] }}
                >
                  <article className="teammate_card">
                    <div
                      className={`teammate_card_thumbnail${isOpen ? " is-open" : ""}`}
                      data-member-id={member.id}
                    >
                      <div className="teammate_card_media">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="(max-width: 720px) 50vw, (max-width: 1200px) 33vw, 360px"
                          className="u-cover"
                        />
                      </div>

                      <div className="teammate_popup" aria-hidden={!isOpen}>
                        <div className="teammate_popup_content">
                          <div className="teammate_popup_heading">{member.name}</div>
                          <p className="teammate_popup_bio">{member.bio}</p>
                        </div>
                      </div>

                      <div className="teammate_card_chrome">
                        <div className="badge u-frost">{firstName(member.name)}</div>
                        <button
                          type="button"
                          className="modal_trigger u-frost"
                          aria-label={`About ${member.name}`}
                          aria-expanded={isOpen}
                          onClick={() => toggleMember(member.id)}
                        >
                          <span className="icon-svg">
                            <PlusIcon />
                          </span>
                        </button>
                      </div>

                      <div className="teammate_card_chrome is-bottom">
                        <div className="badge u-frost">{member.role}</div>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
