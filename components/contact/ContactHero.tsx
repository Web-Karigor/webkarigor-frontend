import Link from "next/link";
import contactContent from "@/data/contact-content.json";

const { breadcrumbHome, breadcrumbHomeHref, breadcrumbCurrent, headingLine1, headingAccent } =
  contactContent.hero;

export default function ContactHero() {
  return (
    <section className="contact-hero" aria-labelledby="contact-hero-heading">
      <div className="contact-hero-orb" aria-hidden />
      <div className="contact-hero-inner">
        

        <h1 id="contact-hero-heading" className="contact-hero-title">
          <span className="block">{headingLine1}</span>
          <span className="contact-hero-title-accent">{headingAccent}</span>
        </h1>
      </div>
    </section>
  );
}
