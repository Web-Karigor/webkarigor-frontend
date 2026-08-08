import Link from "next/link";
import { ArrowRight } from "lucide-react";
import contactContent from "@/data/contact-content.json";

const { badge, headingLine1, headingAccent, description, ctaLabel, ctaHref } =
  contactContent.bottomCta;

export default function ContactBottomCta() {
  return (
    <section className="contact-bottom-cta" aria-labelledby="contact-bottom-cta-heading">
      <div className="contact-bottom-cta-inner">
        <span className="contact-section-badge">{badge}</span>
        <h2 id="contact-bottom-cta-heading" className="contact-cta-title">
          {headingLine1}{" "}
          <span className="contact-title-accent">{headingAccent}</span>
        </h2>
        <p className="contact-cta-desc">{description}</p>
        <Link href={ctaHref} className="contact-cta-btn">
          {ctaLabel}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
