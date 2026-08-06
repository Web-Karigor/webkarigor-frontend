import Image from "next/image";

/** Exact original collage — classes stay in TSX for Tailwind JIT */
const TEAM_PHOTOS = [
  {
    src: "/sm1.png",
    alt: "Team member — middle left",
    className:
      "absolute left-0 top-[22%] z-[2] h-[clamp(124px,15vw,168px)] w-[clamp(124px,15vw,168px)]",
  },
  {
    src: "/h2.png",
    alt: "Team member — center small",
    className:
      "absolute left-[40%] top-[44%] z-[4] h-[clamp(68px,8.5vw,92px)] w-[clamp(68px,8.5vw,92px)] rounded-[20px] max-sm:rounded-[14px]",
  },
  {
    src: "/sm3.jpg",
    alt: "Team member — bottom left",
    className:
      "absolute bottom-0 left-[4%] z-[3] h-[clamp(148px,18vw,200px)] w-[clamp(148px,18vw,200px)]",
  },
  {
    src: "/sm4.png",
    alt: "Team member — bottom right",
    className:
      "absolute bottom-[10%] right-[4%] z-[2] h-[clamp(112px,14vw,152px)] w-[clamp(112px,14vw,152px)]",
  },
] as const;

const SHOT_BASE =
  "overflow-hidden rounded-[28px] bg-[#e8eef6] shadow-[0_18px_44px_rgba(24,59,86,0.13)] max-sm:rounded-[20px]";

export default function ServiceTeamSection() {
  return (
    <section className="relative flex w-full items-center overflow-hidden bg-[#f7f8fa] max-lg:min-h-0 lg:min-h-[clamp(560px,70vw,944px)]">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-[42%] z-0 h-[min(1400px,160vw)] w-[min(1400px,160vw)] -translate-x-[10%] -translate-y-1/2 rounded-full bg-gradient-to-b from-[#c4d5f3] to-transparent opacity-[0.15] max-lg:left-1/2 max-lg:-translate-x-[35%] max-lg:-translate-y-[48%]"
      />

      <div className="relative z-[1] mx-auto flex w-full max-w-[1680px] items-center justify-between gap-[clamp(32px,5vw,64px)] px-[clamp(16px,4.4vw,85px)] py-[clamp(48px,6vw,85px)] max-lg:flex-col max-lg:items-start max-lg:justify-start max-lg:gap-[clamp(20px,4vw,32px)] max-lg:py-[clamp(40px,6vw,64px)]">
        <h2 className="m-0 max-w-[696px] shrink-0 font-montserrat text-[clamp(40px,6.5vw,100px)] font-bold leading-[150%] text-[#183b56] max-lg:max-w-full max-lg:flex-none max-lg:text-[clamp(36px,8vw,56px)] max-lg:leading-[1.25]">
          Expert Team
          <br />
          Big Result
        </h2>

        <div className="relative isolate h-[clamp(400px,46vw,560px)] w-[min(100%,620px)] shrink-0 max-lg:mx-auto max-lg:h-[clamp(360px,88vw,480px)] max-lg:max-w-[520px]">
          <div
            aria-hidden
            className="absolute bottom-[18%] left-[42%] z-0 h-[112px] w-[72px] bg-[radial-gradient(circle,#c5cdd8_1.7px,transparent_1.8px)] bg-[length:16px_16px] opacity-70 max-sm:h-[88px] max-sm:w-[56px] max-sm:bg-[length:13px_13px]"
          />

          <div className="absolute right-0 top-0 z-[3] h-[clamp(176px,21vw,240px)] w-[clamp(176px,21vw,240px)] overflow-visible bg-transparent shadow-none">
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-0 right-0 z-0 h-[clamp(42px,5vw,56px)] w-[clamp(42px,5vw,56px)] translate-x-[30%] translate-y-[30%] rounded-full bg-[#2f80ed]"
            />
            <div className={`relative z-[1] h-full w-full ${SHOT_BASE}`}>
              <Image
                src="/sm2.jpg"
                alt="Team member — top right"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 180px, 240px"
              />
            </div>
          </div>

          {TEAM_PHOTOS.map((photo) => (
            <div key={photo.src} className={`${photo.className} ${SHOT_BASE}`}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 160px, 240px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
