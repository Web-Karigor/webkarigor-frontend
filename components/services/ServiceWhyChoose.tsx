import Image from "next/image";
import { WHY_CHOOSE_FEATURES } from "@/lib/services-data";

export default function ServiceWhyChoose() {
  return (
    <section className="service-why">
      <div className="service-section-wrap service-why-grid">
        <div className="service-why-visual">
          <div className="service-why-image service-why-image--main">
            <Image
              src="/sm1.png"
              alt="Team collaboration"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 420px"
            />
          </div>
          <div className="service-why-image service-why-image--secondary">
            <Image
              src="/sm3.jpg"
              alt="Design review session"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 60vw, 280px"
            />
          </div>
          <div className="service-why-badge">
            <span>Since</span>
            <strong>2012</strong>
          </div>
        </div>

        <div className="service-why-content">
          <span className="service-badge">Why Choose Us</span>
          <h2 className="service-section-title service-section-title--left">
            Built for Results, Not Just Deliverables
          </h2>
          <p className="service-why-intro">
            We combine strategy, design, and engineering into one focused team —
            so you ship faster with fewer handoffs and clearer outcomes.
          </p>

          <ul className="service-why-list">
            {WHY_CHOOSE_FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <li key={feature.title} className="service-why-item">
                  <div className="service-why-item-icon">
                    <Icon strokeWidth={1.75} aria-hidden />
                  </div>
                  <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
