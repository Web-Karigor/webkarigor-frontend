"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useContactPageQuery } from "@/hooks/queries/useContactPageQuery";
import {
  contactSectionItem,
  splitContactDeckTitle,
} from "@/lib/contact-page";

/** Section chrome — not provided by pages/contact-us. */
const CHROME = {
  badge: "Company Deck",
  ctaLabel: "Check Company Deck",
  ctaHref: "/about-us",
} as const;

export default function ContactCompanyDeck() {
  const { data } = useContactPageQuery();
  const item = contactSectionItem(data?.data?.sections?.company_desk);

  const title = item?.title?.trim() ?? "";
  const description = item?.subtitle?.trim() ?? "";
  const image = item?.left_image?.url?.trim() ?? "";
  const imageAlt =
    item?.left_image?.alt_text?.trim() ||
    item?.left_image?.name?.trim() ||
    title;

  if (!title || !description || !image) return null;

  const { line1, accent } = splitContactDeckTitle(title);

  return (
    <section className="contact-deck" aria-labelledby="contact-deck-heading">
      <div className="contact-deck-panel">
        <div className="contact-deck-media">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 900px) 100vw, 55vw"
            loading="lazy"
          />
        </div>

        <div className="contact-deck-copy">
          <span className="contact-section-badge">
            <span className="contact-section-badge-text">{CHROME.badge}</span>
          </span>
          <h2 id="contact-deck-heading" className="contact-deck-title">
            {line1}{" "}
            <span className="contact-title-accent">{accent}</span>
          </h2>
          <p className="contact-deck-desc">{description}</p>
          <Link href={CHROME.ctaHref} className="contact-deck-cta">
            {CHROME.ctaLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
