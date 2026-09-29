"use client";

import "./VideoSection.css";

import { useRef, useLayoutEffect, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import homeContent from "@/data/home-content.json";

const { embedUrl, title: videoTitle } = homeContent.video;

const MOBILE_PAD_X = 20;
const MOBILE_VIDEO_RATIO = 16 / 9;
const DESKTOP_START_SCALE = 0.55;

/**
 * Desktop + mobile: inset card scrub-grows to true full viewport.
 * Size is transform scale only (no width/height layout) so pin+scrub stays smooth.
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

      mm.add("(min-width: 1024px)", () => {
        const applyStart = () => {
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
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          });

          gsap.set(tilt, {
            transformStyle: "preserve-3d",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
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
            borderRadius: 44 / DESKTOP_START_SCALE,
            scale: DESKTOP_START_SCALE,
            x: 0,
            y: 0,
            force3D: true,
            transformOrigin: "50% 50%",
            willChange: "transform",
            backfaceVisibility: "hidden",
          });
        };

        applyStart();

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "center center",
            end: "+=260%",
            pin: true,
            pinType: "fixed",
            pinSpacing: true,
            scrub: 0.55,
            anticipatePin: 0,
            invalidateOnRefresh: true,
            onRefresh: () => {
              if (tl.progress() < 0.02) applyStart();
            },
          },
        });

        tl.to(
          frame,
          {
            scale: 1,
            borderRadius: 0,
            ease: "none",
            force3D: true,
            duration: 1,
          },
          0,
        ).to({}, { duration: 0.7 });

        const quickRotY = gsap.quickTo(tilt, "rotateY", {
          duration: 1.05,
          ease: "power3.out",
        });
        const quickRotX = gsap.quickTo(tilt, "rotateX", {
          duration: 1.05,
          ease: "power3.out",
        });

        const onMove = (e: MouseEvent) => {
          const rect = stage.getBoundingClientRect();
          if (rect.width < 1 || rect.height < 1) return;
          const nx = (e.clientX - rect.left) / rect.width - 0.5;
          const ny = (e.clientY - rect.top) / rect.height - 0.5;
          quickRotY(nx * 9);
          quickRotX(-ny * 6.5);
        };

        const onLeave = () => {
          quickRotY(0);
          quickRotX(0);
        };

        stage.addEventListener("mousemove", onMove);
        stage.addEventListener("mouseleave", onLeave);

        const onResize = () => {
          if (tl.progress() < 0.02) applyStart();
          ScrollTrigger.refresh();
        };
        window.addEventListener("resize", onResize);

        return () => {
          stage.removeEventListener("mousemove", onMove);
          stage.removeEventListener("mouseleave", onLeave);
          window.removeEventListener("resize", onResize);
        };
      });

      mm.add("(max-width: 1023px)", () => {
        const measure = () => {
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const startW = Math.max(vw - MOBILE_PAD_X * 2, 280);
          const startH = Math.round(startW / MOBILE_VIDEO_RATIO);
          return { vw, vh, startW, startH };
        };

        const applyStart = () => {
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
            alignItems: "center",
            justifyContent: "center",
            overflow: "visible",
          });

          gsap.set(tilt, {
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
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
            borderRadius: 10.5,
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            force3D: true,
            transformOrigin: "50% 50%",
            willChange: "transform",
            backfaceVisibility: "hidden",
          });
        };

        applyStart();

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "center center",
            end: () => `+=${Math.round(window.innerHeight * 2.4)}`,
            pin: true,
            pinType: "transform",
            pinSpacing: true,
            scrub: 0.45,
            anticipatePin: 0,
            invalidateOnRefresh: true,
            onRefresh: () => {
              if (tl.progress() < 0.02) applyStart();
            },
          },
        });

        tl.to(
          frame,
          {
            scaleX: () => window.innerWidth / measure().startW,
            scaleY: () => window.innerHeight / measure().startH,
            borderRadius: 0,
            ease: "none",
            force3D: true,
            duration: 1,
          },
          0,
        ).to({}, { duration: 0.85 });

        const onResize = () => {
          if (tl.progress() < 0.02) applyStart();
          ScrollTrigger.refresh();
        };
        window.addEventListener("resize", onResize);
        window.addEventListener("orientationchange", onResize);

        return () => {
          window.removeEventListener("resize", onResize);
          window.removeEventListener("orientationchange", onResize);
        };
      });
    }, section);

    requestAnimationFrame(() => ScrollTrigger.refresh());

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
