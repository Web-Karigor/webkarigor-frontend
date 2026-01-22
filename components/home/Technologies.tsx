import React from "react";

const technologies = [
  [
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg", name: "Laravel" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", name: "Node.js" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", name: "Python" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", name: "Coding" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg", name: "Kotlin" },
  ],
  [
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", name: "React" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-line.svg", name: "Next.js" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg", name: "Tailwind" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", name: "Vue" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", name: "Bootstrap" },
  ],
  [
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", name: "Figma" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg", name: "Sketch" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framer/framer-original.svg", name: "Framer" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webflow/webflow-original.svg", name: "Webflow" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/adobeillustrator/adobeillustrator-plain.svg", name: "Adobe" },
  ],
  [
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg", name: "Notion" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", name: "Github" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", name: "Vercel" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg", name: "Google Workspace" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg", name: "AWS" },
  ],
];

const Technologies = () => {
  return (
    <section className="relative overflow-hidden py-16 md:py-28 px-4">
      {/* background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FDFDFE] via-[#FDFDFE] to-[#EDFBEF]/60" />

      {/* blobs – Figma matched & responsive */}
      <div className="absolute -left-24 top-0 w-[220px] h-[220px] md:w-[300px] md:h-[300px] rounded-full blur-[80px]"
        style={{ background: "linear-gradient(135deg,#38F8AB,#FEED35)" }} />

      <div className="absolute right-[-120px] top-[40px] w-[260px] h-[260px] rounded-full blur-[90px]"
        style={{ background: "linear-gradient(135deg,#38F8AB,#FEED35)" }} />

      <div className="absolute left-[-120px] bottom-[-80px] w-[300px] h-[300px] rounded-full blur-[100px]"
        style={{ background: "linear-gradient(135deg,#38F8AB,#FEED35)" }} />

      <div className="absolute right-[40px] bottom-[-90px] w-[120px] h-[120px] rounded-full blur-[70px]"
        style={{ background: "linear-gradient(135deg,#38F8AB,#FEED35)" }} />

      {/* content */}
      <div className="relative z-10 max-w-[1320px] mx-auto">
        {/* heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-[2rem] md:text-[2.6rem] lg:text-[2.9rem] font-black tracking-tight">
            Technologies Used
          </h2>
          <h2 className="text-[2rem] md:text-[2.6rem] lg:text-[2.9rem] font-black leading-none">
            In <span className="text-[#39B770]">Web</span>karigor
          </h2>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 md:mt-16">
          {technologies.map((group, colIdx) => (
            <div
              key={colIdx}
              className="rounded-xl border border-[#F0F0F3] bg-white/80 backdrop-blur-sm px-4 py-4 md:px-5 md:py-6"
              style={{ boxShadow: "0 10px 32px rgba(234,245,235,.45)" }}
            >
              {group.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-[#f3faf8] transition"
                >
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="w-6 h-6"
                    style={{
                      filter:
                        tech.name === "Next.js" || tech.name === "Vercel"
                          ? "invert(0.85)"
                          : "none",
                    }}
                    draggable={false}
                  />
                  <span className="text-[15px] font-medium tracking-tight text-[#222]">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
