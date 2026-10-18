"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useContactPageQuery } from "@/hooks/queries/useContactPageQuery";
import { useContactUsSuccessStoriesQuery } from "@/hooks/queries/useContactUsSuccessStoriesQuery";
import {
  contactSectionItem,
  mapContactStoryPosts,
  splitContactStoriesTitle,
} from "@/lib/contact-page";

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

/** Section chrome — not provided by CMS story posts. */
const CHROME = {
  badge: "Client Stories",
  ctaLabel: "Book a call",
  ctaHref: "#contact",
} as const;

export default function ContactStories() {
  const { data: pageData } = useContactPageQuery();
  const { data: storiesData } = useContactUsSuccessStoriesQuery();

  const sectionTitle =
    contactSectionItem(pageData?.data?.sections?.success_stories)?.title?.trim() ??
    "";
  const heading = useMemo(
    () => splitContactStoriesTitle(sectionTitle),
    [sectionTitle],
  );

  const categories = useMemo(
    () => mapContactStoryPosts(storiesData?.data?.posts),
    [storiesData],
  );

  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!categories.length) return;
    if (!activeId || !categories.some((item) => item.id === activeId)) {
      setActiveId(categories[0]!.id);
    }
  }, [categories, activeId]);

  const active =
    categories.find((item) => item.id === activeId) ?? categories[0];

  if (!sectionTitle || !active) return null;

  return (
    <section className="contact-stories" aria-labelledby="contact-stories-heading">
      <div className="contact-stories-inner">
        <header className="contact-stories-header">
          <span className="contact-section-badge">{CHROME.badge}</span>
          <h2 id="contact-stories-heading" className="contact-stories-title">
            {heading.line1}{" "}
            <span className="contact-title-accent">{heading.accent1}</span>{" "}
            {heading.line2}{" "}
            <span className="contact-title-accent">{heading.accent2}</span>
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
              className="object-cover object-center"
              sizes="(max-width: 900px) 100vw, 60vw"
              loading="lazy"
            />
          </div>

          <div className="contact-story-quote">
            <div className="contact-story-author">
              {active.avatar ? (
                <div className="contact-story-avatar">
                  <Image
                    src={active.avatar}
                    alt={active.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                    loading="lazy"
                  />
                </div>
              ) : null}
              <div>
                <p className="contact-story-name">{active.name}</p>
                <p className="contact-story-role">{active.role}</p>
              </div>
            </div>

            <p className="contact-story-quote-text">{active.quote}</p>

            <Link href={CHROME.ctaHref} className="contact-story-cta">
              {CHROME.ctaLabel}
              <CtaArrow />
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
