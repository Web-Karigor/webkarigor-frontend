"use client";

import Image from "next/image";

const technologies = [
  [
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg", name: "Laravel" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", name: "Node js" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", name: "Python" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg", name: "Golang" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg", name: "Kotlin" },
  ],
  [
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", name: "React" },
    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-line.svg", name: "Next js" },
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

export default function Technologies() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 px-4">
      {/* background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FDFDFE] via-[#FDFDFE] to-[#EDFBEF]/60" />

      {/* glowing blobs (exact vibe like image) */}
      <div className="absolute -left-24 top-0 w-64 h-64 md:w-80 md:h-80 rounded-full blur-[90px]"
        style={{ background: "linear-gradient(135deg,#38F8AB,#FEED35)" }} />

      <div className="absolute right-[-140px] top-10 w-72 h-72 rounded-full blur-[100px]"
        style={{ background: "linear-gradient(135deg,#38F8AB,#FEED35)" }} />

      <div className="absolute left-[-120px] bottom-[-100px] w-80 h-80 rounded-full blur-[110px]"
        style={{ background: "linear-gradient(135deg,#38F8AB,#FEED35)" }} />

      <div className="absolute right-16 bottom-[-90px] w-40 h-40 rounded-full blur-[80px]"
        style={{ background: "linear-gradient(135deg,#38F8AB,#FEED35)" }} />

      {/* content */}
      <div className="relative z-10 max-w-[1320px] mx-auto">
        {/* heading */}
        <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-6">
          <h2 className="text-3xl md:text-[44px] font-extrabold tracking-tight">
            Technologies Used
          </h2>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 md:mt-16">
          {technologies.map((group, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[#EEF1F4] bg-white/80 backdrop-blur-md px-4 py-4 md:px-5 md:py-6 space-y-2"
              style={{
                boxShadow: "0 12px 35px rgba(200,230,210,0.45)",
              }}
            >
              {group.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg shadow-lg hover:bg-[#F2FBF7] transition"
                >
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    width={26}
                    height={26}
                    className="w-6 h-6"
                    style={{
                      filter:
                        tech.name === "Next js" || tech.name === "Vercel"
                          ? "invert(0.85)"
                          : "none",
                    }}
                    unoptimized
                  />
                  <span className="text-[15px] font-medium text-[#1F2937]">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-end items-start md:items-center gap-6 mt-12 md:mt-16">
          <h2 className="text-3xl md:text-[44px] font-extrabold">
            In <span className="text-[#39B770]">Web</span>karigor
          </h2>
        </div>
      </div>
    </section>
  );
}
