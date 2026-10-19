"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { SmartVideo } from "@/components/ui/smart-video";
import { useHomePageQuery } from "@/hooks/queries/useHomePageQuery";
import { homeSectionItem } from "@/lib/home-page";

const SHOWREEL_FALLBACK =
  "https://designmonks.b-cdn.net/DM%20Others/DM%20Showreel%202026.mp4";

const CLIP_SMALL = "inset(18% 20% 18% 20% round 28px)";
const CLIP_FULL = "inset(0% 0% 0% 0% round 0px)";

/** Desktop-only. Stays false on phones so the extra blurred player never starts loading. */
function useDesktopBlur() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return desktop;
}

/** Grows to full screen as it scrolls in, holds, then shrinks away as it scrolls out. Click toggles sound. */
function ScrollExpandVideo({ src, reduceMotion }: { src: string; reduceMotion: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const desktopBlur = useDesktopBlur();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.4, restDelta: 0.0005 });
  // clip-path + transform only: the video box never changes size, so there is no relayout per frame.
  const clipPath = useTransform(progress, [0.1, 0.4, 0.62, 0.92], [CLIP_SMALL, CLIP_FULL, CLIP_FULL, CLIP_SMALL]);
  const innerScale = useTransform(progress, [0.1, 0.4, 0.62, 0.92], [1.16, 1, 1, 1.16]);
  const inView = useInView(ref, { margin: "600px 0px" });
  const [soundOn, setSoundOn] = useState(false);
  const audible = soundOn && inView;

  const toggleSound = () => setSoundOn((on) => !on);

  return (
    <div ref={ref} aria-label="Product showreel" className="relative h-[260svh] bg-[#FFFDF6]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div
          onClick={toggleSound}
          className="group absolute inset-0 cursor-pointer bg-[#FFFDF6]"
          style={reduceMotion ? undefined : { clipPath, willChange: "clip-path" }}
        >
          <motion.div
            className="relative size-full overflow-hidden"
            style={reduceMotion ? undefined : { scale: innerScale, willChange: "transform" }}
          >
            {desktopBlur && src ? (
              <>
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[72vw] min-h-[128%] w-[228vh] min-w-[128%] -translate-x-1/2 -translate-y-1/2 blur-[56px] saturate-150">
                  <SmartVideo
                    src={src}
                    title=""
                    playing={inView}
                    muted
                    className="pointer-events-none"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-[#FFFDF6]/45" />
              </>
            ) : null}
            <div className="absolute left-1/2 top-1/2 h-[56.25vw] max-h-full w-full max-w-[177.78vh] -translate-x-1/2 -translate-y-1/2 max-lg:h-[56.25vw] max-lg:max-h-none max-lg:min-h-full max-lg:w-[177.78vh] max-lg:min-w-full max-lg:max-w-none">
              {src ? (
                <SmartVideo
                  src={src}
                  title="SalesMama showreel"
                  playing={inView}
                  muted={!audible}
                  className="pointer-events-none"
                />
              ) : null}
            </div>
          </motion.div>

          <AnimatePresence initial={false}>
            {audible ? (
              <motion.button
                key="mute"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSound();
                }}
                aria-label="Mute showreel"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute bottom-[calc(18%+1rem)] right-[calc(20%+1rem)] flex size-11 items-center justify-center rounded-full bg-black/40 text-white ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-black/60"
              >
                <VolumeX className="size-5" aria-hidden />
              </motion.button>
            ) : (
              <motion.button
                key="unmute"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSound();
                }}
                aria-label="Play showreel with sound"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-full bg-white/15 py-2 pl-2 pr-5 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur-md transition-transform group-hover:scale-105"
              >
                <span className="relative flex size-10 items-center justify-center rounded-full bg-white text-slate-900">
                  <span className="absolute inset-0 animate-ping rounded-full bg-white/60 [animation-duration:2s]" />
                  <Volume2 className="relative size-5" aria-hidden />
                </span>
                Click for sound
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default function VideoSection() {
  const reduceMotion = Boolean(useReducedMotion());
  const { data, isFetched } = useHomePageQuery();
  const fromApi = homeSectionItem(data?.data?.sections?.video)?.video_link?.trim() ?? "";
  const showreel = fromApi || (isFetched ? SHOWREEL_FALLBACK : "");

  return (
    <section id="product-film" className="relative scroll-mt-20">
      <ScrollExpandVideo src={showreel} reduceMotion={reduceMotion} />
    </section>
  );
}
