"use client";

import Image from "next/image";
import { FormEvent } from "react";
import ServiceMarquee from "@/components/services/ServiceMarquee";

export default function ServiceContact() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section className="service-contact-section">
      <ServiceMarquee />

      <div className="service-section-wrap service-contact">
        <div className="service-contact-copy">
          <h2 className="service-contact-title">
            Let&apos;s Build Something Users Will Love
          </h2>
          <div className="service-contact-founder">
            <div className="service-contact-avatar">
              <Image
                src="/sm4.png"
                alt="Founder"
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <blockquote>
              &ldquo;Great products start with listening. Tell us your vision —
              we&apos;ll help you shape it into something real.&rdquo;
              <cite>— Webkarigor Team</cite>
            </blockquote>
          </div>
        </div>

        <form className="service-contact-form" onSubmit={handleSubmit}>
          <div className="service-contact-fields">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              className="service-contact-input"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="service-contact-input"
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="service-contact-input"
            />
            <textarea
              name="message"
              placeholder="Tell us about your project..."
              className="service-contact-textarea"
              rows={5}
              required
            />
          </div>
          <button type="submit" className="service-contact-submit">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
