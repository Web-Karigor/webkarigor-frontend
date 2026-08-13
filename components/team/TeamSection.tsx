"use client";

import "./TeamSection.css";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import teamContent from "@/data/team-content.json";

const { headline, intro, members, join } = teamContent;

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

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
    >
      <path
        d="M2.65863 0.643284C2.94197 0.701846 3.16762 0.892216 3.30782 1.14373L3.75442 1.94496C3.91893 2.24006 4.05737 2.4884 4.14777 2.70428C4.24367 2.93329 4.30063 3.15912 4.27459 3.4088C4.24856 3.65848 4.14623 3.8677 4.00514 4.072C3.87214 4.26458 3.68544 4.47902 3.46359 4.73383L3.223 5.0097C3.06766 5.18856 3.06766 5.31144 3.223 5.4903L6.5097 8.777C6.68856 8.93234 6.81144 8.93234 6.9903 8.777L7.26617 8.53641C7.52098 8.31456 7.73542 8.12786 7.928 7.99486C8.1323 7.85377 8.34152 7.75144 8.5912 7.72541C8.84088 7.69937 9.06671 7.75633 9.29572 7.85223C9.5116 7.94263 9.75994 8.08107 10.055 8.24558L10.8563 8.69218C11.1078 8.83238 11.2982 9.05803 11.3567 9.34137C11.418 9.63804 11.3275 9.9339 11.1275 10.1637L10.3055 11.1085C10.0938 11.3519 9.8055 11.521 9.4765 11.5805C9.1625 11.6373 8.703 11.625 7.955 11.35C6.347 10.758 4.62 9.42 3.18 7.98C1.74 6.54 0.402 4.813 0.15 3.205C-0.125 2.457 -0.137 1.9975 -0.0805 1.6835C-0.021 1.3545 0.1481 1.0662 0.3915 0.8545L1.3363 0.0325C1.5661 -0.1675 1.86196 -0.258 2.15863 -0.196716L2.65863 0.643284Z"
        fill="currentColor"
        transform="translate(0.5 0.5) scale(0.9)"
      />
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

      <section className="team_join u-section" aria-label="Join our team">
        <div className="team_join_container">
          <h3 className="team_join_eyebrow">{join.eyebrow}</h3>

          <div className="team_join_content">
            <p className="team_join_lead">{join.lead}</p>
            <p className="team_join_sub">
              {join.sub.split("\n").map((line, i, arr) => (
                <span key={`${line}-${i}`}>
                  {line}
                  {i < arr.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
            <Link href={join.ctaHref} className="team_join_cta">
              <span className="team_join_cta_label">{join.ctaLabel}</span>
              <span className="team_join_cta_icon" aria-hidden>
                <PhoneIcon />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}
