"use client";

import { useContactPageQuery } from "@/hooks/queries/useContactPageQuery";
import {
  contactSectionItem,
  splitContactHeroTitle,
} from "@/lib/contact-page";

export default function ContactHero() {
  const { data } = useContactPageQuery();
  const item = contactSectionItem(data?.data?.sections?.hero);
  const title = item?.title?.trim() ?? "";

  if (!title) return null;

  const { line1, accent } = splitContactHeroTitle(title);

  return (
    <section className="contact-hero" aria-labelledby="contact-hero-heading">
      <div className="contact-hero-orb" aria-hidden />
      <div className="contact-hero-inner">
        <h1 id="contact-hero-heading" className="contact-hero-title">
          <span className="block">{line1}</span>
          {accent ? (
            <span className="contact-hero-title-accent">{accent}</span>
          ) : null}
        </h1>
      </div>
    </section>
  );
}
