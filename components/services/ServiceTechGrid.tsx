import Image from "next/image";
import { TECH_STACK } from "@/lib/services-data";

const DARK_ICONS = new Set(["Next.js", "Vercel"]);

export default function ServiceTechGrid() {
  return (
    <section className="service-tech">
      <div className="service-section-wrap">
        <div className="service-section-head service-section-head--center">
          <span className="service-badge">Tech Stack</span>
          <h2 className="service-section-title">Technologies We Use</h2>
          <p className="service-section-desc">
            Modern tools and proven frameworks to build products that perform,
            scale, and stay maintainable.
          </p>
        </div>

        <div className="service-tech-grid">
          {TECH_STACK.map((tech) => (
            <article key={tech.name} className="service-tech-card">
              <Image
                src={tech.icon}
                alt=""
                width={32}
                height={32}
                className={DARK_ICONS.has(tech.name) ? "brightness-0" : ""}
                unoptimized
              />
              <span>{tech.name}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
