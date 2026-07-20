"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

/** Figma Frame 182: Back end → Front end → Design → Tools & Cloud */
const technologyGroups = [
  {
    title: "Back end",
    items: [
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg", name: "Laravel" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", name: "Node js" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", name: "Python" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg", name: "Golang" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg", name: "Kotlin" },
    ],
  },
  {
    title: "Front end",
    items: [
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", name: "React" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", name: "Next js" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", name: "Tailwind" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", name: "Vue" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", name: "Bootstrap" },
    ],
  },
  {
    title: "Design",
    items: [
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", name: "Figma" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg", name: "Sketch" },
      { icon: "https://www.vectorlogo.zone/logos/framer/framer-icon.svg", name: "Framer" },
      { icon: "/technologies/webflow.svg", name: "Webflow" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg", name: "Adobe" },
    ],
  },
  {
    title: "Tools & Cloud",
    items: [
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg", name: "Notion" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", name: "Github" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", name: "Vercel" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg", name: "Google Workspace" },
      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", name: "AWS" },
    ],
  },
];

type Blob = {
  id: string;
  src: string;
  width: number;
  height: number;
  rotate?: boolean;
  className: string;
};

/** Ellipse 2 & 3 — unchanged */
const FIXED_BLOBS: Blob[] = [
  {
    id: "e3-corner",
    src: "/technologies/ellipse-2.png",
    width: 267,
    height: 340,
    rotate: true,
    className:
      "bottom-[120px] left-[-40px] top-auto w-[clamp(160px,18vw,240px)] h-[clamp(200px,22vw,300px)]",
  },
  {
    id: "e2-corner",
    src: "/technologies/ellipse-3.png",
    width: 267,
    height: 340,
    rotate: true,
    className:
      "top-[60px] right-[-40px] left-auto w-[clamp(160px,18vw,240px)] h-[clamp(200px,22vw,300px)]",
  },
];

const USED_BLOB: Blob = {
  id: "used-title",
  src: "/technologies/ellipse-6.png",
  width: 168,
  height: 168,
  className:
    "left-1/2 top-0 z-[-1] size-[clamp(72px,8vw,110px)] -translate-x-[8%] -translate-y-[42%]",
};

const WEB_BLOB: Blob = {
  id: "web-footer",
  src: "/technologies/ellipse-4.png",
  width: 320,
  height: 320,
  className:
    "left-1/2 top-1/2 z-[-1] size-[clamp(88px,10vw,130px)] -translate-x-[38%] -translate-y-[52%]",
};

const CARD_BLOBS: Blob[] = [
  {
    id: "card-2",
    src: "/technologies/ellipse-5.png",
    width: 320,
    height: 320,
    className:
      "hidden sm:block left-[22%] top-[54%] size-[clamp(88px,10vw,130px)] lg:left-[27%] lg:top-[52%]",
  },
  {
    id: "card-3",
    src: "/technologies/ellipse-7.png",
    width: 168,
    height: 168,
    className:
     "hidden sm:block left-[58%] top-[38%] size-[clamp(72px,8vw,110px)] lg:left-[65%] lg:top-[30%]",
  },
];

function BlobLayer({ blob }: { blob: Blob }) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute z-0 block select-none",
        blob.rotate && "rotate-180",
        blob.className
      )}
      aria-hidden
    >
      <Image
        src={blob.src}
        alt=""
        width={blob.width}
        height={blob.height}
        className="block size-full max-w-none object-contain"
        unoptimized
      />
    </span>
  );
}

export default function Technologies() {
  return (
    <section className="relative box-border w-full overflow-hidden bg-[#F2F2F2] px-4 py-12 sm:px-8 md:px-10 lg:flex lg:h-[860px] lg:min-h-[860px] lg:max-h-[860px] lg:flex-col lg:justify-center lg:px-[49px] lg:py-16 min-[1920px]:px-[49px]">
      <div className="pointer-events-none absolute inset-0 bg-[#F2F2F2]" aria-hidden />

      {FIXED_BLOBS.map((blob) => (
        <BlobLayer key={blob.id} blob={blob} />
      ))}

      {CARD_BLOBS.map((blob) => (
        <BlobLayer key={blob.id} blob={blob} />
      ))}

      <div className="relative z-[1] mx-auto flex w-full max-w-[1851px] flex-col lg:h-full lg:max-h-[732px] lg:justify-between">
        <h2 className="relative m-0 font-montserrat text-[clamp(2rem,5.5vw,4.5rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-black">
          Technologies{" "}
          <span className="relative inline-block">
            Used
            <BlobLayer blob={USED_BLOB} />
          </span>
        </h2>

        <div className="mt-9 grid grid-cols-1 justify-items-center gap-7 sm:mt-10 sm:grid-cols-2 sm:justify-items-stretch sm:gap-8 lg:mt-8 lg:mb-6 lg:grid-cols-4 lg:gap-[clamp(20px,1.5vw,31px)]">
          {technologyGroups.map((group) => (
            <article
              key={group.title}
              className="box-border flex w-full max-w-[440px] flex-col gap-3 overflow-visible rounded-[32px] border-none bg-white/40 p-[22px] backdrop-blur-[40px] sm:max-w-none lg:h-[460px] lg:max-w-[440px] lg:justify-start lg:px-[22px] lg:py-[43.5px] max-md:rounded-3xl max-md:p-4"
            >
              {group.items.map((tech) => (
                <div
                  key={tech.name}
                  className="relative box-border flex h-[65px] min-h-[65px] max-h-[65px] w-full shrink-0 flex-row items-center gap-3 rounded-2xl border-none bg-white p-3 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out will-change-transform hover:z-10 hover:scale-110 hover:bg-white hover:shadow-[0px_8px_20px_0px_rgba(0,0,0,0.12)] max-md:h-14 max-md:min-h-14 max-md:max-h-14"
                >
                  <Image
                    src={tech.icon}
                    alt=""
                    width={28}
                    height={28}
                    className="size-7 shrink-0 object-contain"
                    unoptimized
                  />
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap font-montserrat text-lg font-medium leading-[1.2] text-[#1F1E1C] max-md:text-[15px]">
                    {tech.name}
                  </span>
                </div>
              ))}
            </article>
          ))}
        </div>

        <p className="relative mt-10 text-left font-montserrat text-[clamp(2rem,5vw,4.5rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-black sm:mt-12 md:mt-16 md:text-right lg:mt-auto">
          In{" "}
          <span className="relative inline-block">
            Web
            <BlobLayer blob={WEB_BLOB} />
          </span>
          karigor
        </p>
      </div>
    </section>
  );
}
