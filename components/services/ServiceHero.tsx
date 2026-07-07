"use client";

import Image from "next/image";
import { FormEvent } from "react";

const HERO_STATS = [
  { value: "10+", label: "Years" },
  { value: "300+", label: "Projects" },
  { value: "200+", label: "Clients" },
] as const;

export default function ServiceHero() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section className="service-hero">
      <div className="service-hero-inner">
        <div className="service-hero-copy">
          <span className="service-badge">Services</span>

          <h1 className="service-hero-title">
            To Deliver a 360
            <span className="service-hero-accent"> Project Approach</span>
          </h1>

          <p className="service-hero-desc">
            Your vision deserves to grow. We create the brand identity, digital
            experience, and investor-ready story that help businesses move faster
            with confidence.
          </p>

          <form className="service-hero-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="service-hero-input"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              className="service-hero-input"
            />
            <button type="submit" className="service-hero-submit">
              Get started
            </button>
          </form>
        </div>

        <div className="service-hero-visual">
          <div className="service-hero-image-wrap">
            <Image
              src="/sm2.jpg"
              alt="Team member working on a project"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 520px"
              priority
            />
          </div>
          <div className="service-hero-experience">
            <span className="service-hero-experience-value">15+</span>
            <span className="service-hero-experience-label">Years Experience</span>
          </div>
        </div>
      </div>

      <div className="service-hero-stats">
        {HERO_STATS.map((stat) => (
          <div key={stat.label} className="service-hero-stat">
            <span className="service-hero-stat-value">{stat.value}</span>
            <span className="service-hero-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
