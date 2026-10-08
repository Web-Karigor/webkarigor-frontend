"use client";

import "./VideoSection.css";

import { useRef, useLayoutEffect, useEffect, useState } from "react";
import { gsap, ScrollTrigger, isTouchToolbarResize, refreshScrollTriggers } from "@/lib/gsap";
import homeContent from "@/data/home-content.json";

const { embedUrl, title: videoTitle } = homeContent.video;

const MOBILE_PAD_X = 20;
const MOBILE_VIDEO_RATIO = 16 / 9;
const DESKTOP_START_SCALE = 0.48;
const GROW_PORTION = 0.9;
const DESKTOP_LERP = 0.055;
const MOBILE_LERP = 0.07;

function lerpToward(current: number, target: number, dt: number, smoothing: number) {
  return current + (target - current) * (1 - Math.pow(1 - smoothing, dt));
}

/**
 * Pin stays layout-stable (scale only). Visual progress is lerped on the ticker
 * so grow/shrink has inertia instead of 1:1 scroll stepping.
 */
const VideoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLoadVideo(true);
          io.disconnect();
        }
      },
      { rootMargin: "280px 0px" },
    );

    io.observe(section);
    return () => io.disconnect();
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const tilt = tiltRef.current;
    const frame = frameRef.current;
    if (!section || !stage || !tilt || !frame) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const easeGrow = gsap.parseEase("power2.out");

      mm.add("(min-width: 1024px)", () => {
        const state = { target: 0, current: 0 };
        const startRadius = 44 / DESKTOP_START_SCALE;

        const applyLayout = () => {
          const vw = window.innerWidth;
          const vh = window.innerHeight;

          gsap.set(section, {
            padding: 0,
            margin: 0,
            width: "100%",
            maxWidth: "none",
          });

          gsap.set(stage, {
            perspective: 1400,
            transformStyle: "preserve-3d",
            width: vw,
            height: vh,
            maxWidth: "none",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            overflow: "hidden",
          });

          gsap.set(tilt, {
            transformStyle: "preserve-3d",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            force3D: true,
            willChange: "transform",
            backfaceVisibility: "hidden",
          });

          gsap.set(frame, {
            width: vw,
            height: vh,
            maxWidth: "none",
            maxHeight: "none",
            x: 0,
            y: 0,
            force3D: true,
            transformOrigin: "50% 100%",
            willChange: "transform",
            backfaceVisibility: "hidden",
          });
        };

        const applyVisual = (progress: number) => {
          const t = easeGrow(gsap.utils.clamp(0, 1, progress / GROW_PORTION));
          gsap.set(frame, {
            scale: DESKTOP_START_SCALE + (1 - DESKTOP_START_SCALE) * t,
            borderRadius: startRadius * (1 - t),
            transformOrigin: "50% 100%",
            force3D: true,
          });
        };

        applyLayout();
        applyVisual(0);

        const st = ScrollTrigger.create({
          trigger: stage,
          start: "bottom bottom",
          end: "+=280%",
          pin: true,
          pinType: "fixed",
          pinSpacing: true,
          anticipatePin: 0,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            state.target = self.progress;
          },
          onRefresh: (self) => {
            applyLayout();
            state.target = self.progress;
            if (self.progress < 0.02) {
              state.current = 0;
              applyVisual(0);
            }
          },
        });

        const onTick = () => {
          const dt = gsap.ticker.deltaRatio(60);
          const next = lerpToward(state.current, state.target, dt, DESKTOP_LERP);
          if (
            Math.abs(next - state.current) < 0.00006 &&
            Math.abs(state.target - state.current) < 0.00006
          ) {
            return;
          }
          state.current = next;
          applyVisual(state.current);
        };

        gsap.ticker.add(onTick);

        const quickRotY = gsap.quickTo(tilt, "rotateY", {
          duration: 1.2,
          ease: "power3.out",
        });
        const quickRotX = gsap.quickTo(tilt, "rotateX", {
          duration: 1.2,
          ease: "power3.out",
        });

        const onMove = (e: MouseEvent) => {
          const rect = stage.getBoundingClientRect();
          if (rect.width < 1 || rect.height < 1) return;
          const nx = (e.clientX - rect.left) / rect.width - 0.5;
          const ny = (e.clientY - rect.top) / rect.height - 0.5;
          const rest = 1 - Math.min(state.current / GROW_PORTION, 1);
          quickRotY(nx * 9 * rest);
          quickRotX(-ny * 6.5 * rest);
        };

        const onLeave = () => {
          quickRotY(0);
          quickRotX(0);
        };

        stage.addEventListener("mousemove", onMove);
        stage.addEventListener("mouseleave", onLeave);

        let viewportWidth = window.innerWidth;
        const onResize = () => {
          if (isTouchToolbarResize(viewportWidth)) return;
          viewportWidth = window.innerWidth;
          applyLayout();
          applyVisual(state.current);
          refreshScrollTriggers();
        };
        window.addEventListener("resize", onResize);

        return () => {
          gsap.ticker.remove(onTick);
          st.kill();
          stage.removeEventListener("mousemove", onMove);
          stage.removeEventListener("mouseleave", onLeave);
          window.removeEventListener("resize", onResize);
        };
      });

      mm.add("(max-width: 1023px)", () => {
        const state = { target: 0, current: 0 };

        const measure = () => {
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const startW = Math.max(vw - MOBILE_PAD_X * 2, 280);
          const startH = Math.round(startW / MOBILE_VIDEO_RATIO);
          return { vw, vh, startW, startH };
        };

        const applyLayout = () => {
          const { startW, startH } = measure();

          gsap.set(section, {
            paddingLeft: MOBILE_PAD_X,
            paddingRight: MOBILE_PAD_X,
            paddingTop: 40,
            paddingBottom: 40,
            overflow: "visible",
          });

          gsap.set(stage, {
            width: "100%",
            height: startH,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            overflow: "visible",
          });

          gsap.set(tilt, {
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            x: 0,
            y: 0,
            force3D: true,
            backfaceVisibility: "hidden",
          });

          gsap.set(frame, {
            width: startW,
            height: startH,
            maxWidth: "none",
            aspectRatio: "none",
            x: 0,
            y: 0,
            force3D: true,
            transformOrigin: "50% 100%",
            willChange: "transform",
            backfaceVisibility: "hidden",
          });
        };

        const applyVisual = (progress: number) => {
          const { startW, startH } = measure();
          const t = easeGrow(gsap.utils.clamp(0, 1, progress / GROW_PORTION));
          gsap.set(frame, {
            scaleX: 1 + (window.innerWidth / startW - 1) * t,
            scaleY: 1 + (window.innerHeight / startH - 1) * t,
            borderRadius: 10.5 * (1 - t),
            transformOrigin: "50% 100%",
            force3D: true,
          });
        };

        applyLayout();
        applyVisual(0);

        const st = ScrollTrigger.create({
          trigger: stage,
          start: "bottom bottom",
          end: () => `+=${Math.round(window.innerHeight * 2.6)}`,
          pin: true,
          pinType: "transform",
          pinSpacing: true,
          anticipatePin: 0,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            state.target = self.progress;
          },
          onRefresh: (self) => {
            applyLayout();
            state.target = self.progress;
            if (self.progress < 0.02) {
              state.current = 0;
              applyVisual(0);
            }
          },
        });

        const onTick = () => {
          const dt = gsap.ticker.deltaRatio(60);
          const next = lerpToward(state.current, state.target, dt, MOBILE_LERP);
          if (
            Math.abs(next - state.current) < 0.00006 &&
            Math.abs(state.target - state.current) < 0.00006
          ) {
            return;
          }
          state.current = next;
          applyVisual(state.current);
        };

        gsap.ticker.add(onTick);

        let viewportWidth = window.innerWidth;
        const onResize = () => {
          if (isTouchToolbarResize(viewportWidth)) return;
          viewportWidth = window.innerWidth;
          applyLayout();
          applyVisual(state.current);
          refreshScrollTriggers();
        };
        window.addEventListener("resize", onResize);
        window.addEventListener("orientationchange", onResize);

        return () => {
          gsap.ticker.remove(onTick);
          st.kill();
          window.removeEventListener("resize", onResize);
          window.removeEventListener("orientationchange", onResize);
        };
      });
    }, section);

    requestAnimationFrame(() => refreshScrollTriggers());

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="video-section">
      <div className="video-section-shell">
        <div ref={stageRef} className="video-section-stage">
          <div ref={tiltRef} className="video-section-tilt">
            <div ref={frameRef} className="video-section-frame">
              {loadVideo ? (
                <iframe
                  src={embedUrl}
                  className="video-section-iframe absolute border-0"
                  title={videoTitle}
                  frameBorder="0"
                  allow="autoplay; picture-in-picture"
                  allowFullScreen
                  sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox"
                />
              ) : (
                <div
                  className="video-section-iframe pointer-events-none absolute border-0 bg-[#111]"
                  aria-hidden
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
