import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import contactContent from "@/data/contact-content.json";

const {
  badge,
  headingLine1,
  headingAccent,
  description,
  ctaLabel,
  ctaHref,
  image,
  imageAlt,
} = contactContent.companyDeck;

export default function ContactCompanyDeck() {
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
          />
        </div>

        <div className="contact-deck-copy">
          <span className="contact-section-badge">{badge}</span>
          <h2 id="contact-deck-heading" className="contact-deck-title">
            {headingLine1}{" "}
            <span className="contact-title-accent">{headingAccent}</span>
          </h2>
          <p className="contact-deck-desc">{description}</p>
          <Link href={ctaHref} className="contact-deck-cta">
            {ctaLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
