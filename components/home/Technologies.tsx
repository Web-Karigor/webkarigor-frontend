"use client";

import Image from "next/image";

const technologyGroups = [
  {
    title: "Front end",
    items: [
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", name: "React" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-line.svg", name: "Next js" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg", name: "Tailwind" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", name: "Vue" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", name: "Bootstrap" },
    ],
  },
  {
    title: "Back end",
    items: [
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg", name: "Laravel" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", name: "Node js" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", name: "Python" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg", name: "Golang" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg", name: "Kotlin" },
    ],
  },
  {
    title: "Design",
    items: [
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", name: "Figma" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg", name: "Sketch" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framer/framer-original.svg", name: "Framer" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webflow/webflow-original.svg", name: "Webflow" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/adobeillustrator/adobeillustrator-plain.svg", name: "Adobe" },
    ],
  },
  {
    title: "Tools & Cloud",
    items: [
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg", name: "Notion" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", name: "Github" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", name: "Vercel" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg", name: "Google Workspace" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg", name: "AWS" },
    ],
  },
];

const darkIcons = new Set(["Next js", "Vercel"]);

export default function Technologies() {
  return (
    <section className="technologies-section">
      <div className="technologies-section__bg" aria-hidden />

      <div className="technologies-section__blob technologies-section__blob--heading" aria-hidden />
      <div className="technologies-section__blob technologies-section__blob--left" aria-hidden />
      <div className="technologies-section__blob technologies-section__blob--mid" aria-hidden />
      <div className="technologies-section__blob technologies-section__blob--design" aria-hidden />
      <div className="technologies-section__blob technologies-section__blob--top-right" aria-hidden />
      <div className="technologies-section__blob technologies-section__blob--footer" aria-hidden />

      <div className="technologies-section__inner">
        <h2 className="technologies-section__title">Technologies Used</h2>

        <div className="technologies-section__grid">
          {technologyGroups.map((group) => (
            <div key={group.title} className="technologies-column">
              <h3 className="technologies-column__title">{group.title}</h3>
              <article className="technologies-card">
                {group.items.map((tech, rowIndex) => (
                  <div
                    key={tech.name}
                    className={`technologies-card__row${
                      rowIndex === group.items.length - 1 ? " is-last" : ""
                    }`}
                  >
                    <Image
                      src={tech.icon}
                      alt=""
                      width={24}
                      height={24}
                      className="technologies-card__icon"
                      style={{
                        filter: darkIcons.has(tech.name) ? "invert(0.85)" : "none",
                      }}
                      unoptimized
                    />
                    <span className="technologies-card__label">{tech.name}</span>
                  </div>
                ))}
              </article>
            </div>
          ))}
        </div>

        <p className="technologies-section__footer">
          In <span className="technologies-section__footer-accent">Web</span>karigor
        </p>
      </div>
    </section>
  );
}
