"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import contactContent from "@/data/contact-content.json";

function CtaArrow() {
  return (
    <svg
      className="contact-story-cta-icon"
      viewBox="0 0 36 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M1 6h28.5M24.5 2.25 33 6l-8.5 3.75"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const {
  badge,
  headingLine1,
  headingAccent1,
  headingLine2,
  headingAccent2,
  ctaLabel,
  ctaHref,
  categories,
} = contactContent.stories;

export default function ContactStories() {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");
  const active = categories.find((item) => item.id === activeId) ?? categories[0];

  if (!active) return null;

  return (
    <section className="contact-stories" aria-labelledby="contact-stories-heading">
      <div className="contact-stories-inner">
        <header className="contact-stories-header">
          <span className="contact-section-badge">{badge}</span>
          <h2 id="contact-stories-heading" className="contact-stories-title">
            {headingLine1}{" "}
            <span className="contact-title-accent">{headingAccent1}</span> {headingLine2}{" "}
            <span className="contact-title-accent">{headingAccent2}</span>
          </h2>
        </header>

        <div className="contact-story-tabs" role="tablist" aria-label="Story categories">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={activeId === category.id}
              className={`contact-story-tab${activeId === category.id ? " is-active" : ""}`}
              onClick={() => setActiveId(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <article className="contact-story-card">
          <div className="contact-story-media">
            <Image
              src={active.image}
              alt={active.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 900px) 100vw, 60vw"
              priority={false}
            />
          </div>

          <div className="contact-story-quote">
            <div className="contact-story-author">
              <div className="contact-story-avatar">
                <Image
                  src={active.avatar}
                  alt={active.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div>
                <p className="contact-story-name">{active.name}</p>
                <p className="contact-story-role">{active.role}</p>
              </div>
            </div>

            <p className="contact-story-quote-text">{active.quote}</p>

            <Link href={ctaHref} className="contact-story-cta">
              {ctaLabel}
              <CtaArrow />
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
