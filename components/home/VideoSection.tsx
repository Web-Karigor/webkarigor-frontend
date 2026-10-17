"use client";

import "./VideoSection.css";

import { useRef, useLayoutEffect, useEffect, useState } from "react";
import { gsap, ScrollTrigger, isTouchToolbarResize, refreshScrollTriggers } from "@/lib/gsap";
import { useHomePageQuery } from "@/hooks/queries/useHomePageQuery";
import { homeSectionItem } from "@/lib/home-page";

/**
 * Sync defaults = pre-dynamic first paint. Section always mounts so pin spacing
 * (and Case below) stay identical; API URL swaps in without remounting GSAP.
 */
const DEFAULT_EMBED_URL =
  "https://player.vimeo.com/video/1227251373?background=1";
const DEFAULT_VIDEO_TITLE = "About Video";

const MOBILE_PAD_X = 20;
const MOBILE_VIDEO_RATIO = 16 / 9;
const DESKTOP_START_SCALE = 0.48;
const GROW_PORTION = 0.9;
const DESKTOP_LERP = 0.055;
const MOBILE_LERP = 0.07;

function lerpToward(current: number, target: number, dt: number, smoothing: number) {
  return current + (target - current) * (1 - Math.pow(1 - smoothing, dt));
}

/** Viewport height with the mobile URL bar hidden — stays constant while the bar slides. */
function largeViewportHeight() {
  const probe = document.createElement("div");
  probe.style.cssText =
    "position:fixed;top:0;left:0;width:0;height:100lvh;visibility:hidden;pointer-events:none";
  document.body.appendChild(probe);
  const h = probe.offsetHeight;
  probe.remove();
  return h > 0 ? Math.max(h, window.innerHeight) : window.innerHeight;
}

/** Layout width (excludes scrollbar) — avoids a sudden right-edge gap while pinned. */
function layoutViewportWidth() {
  return Math.round(document.documentElement.clientWidth || window.innerWidth);
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
  const fitMediaRef = useRef<((w: number, h: number) => void) | null>(null);
  const [loadVideo, setLoadVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { data } = useHomePageQuery();
  const videoItem = homeSectionItem(data?.data?.sections?.video);
  const embedUrl = videoItem?.video_link || DEFAULT_EMBED_URL;
  const videoTitle = DEFAULT_VIDEO_TITLE;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let done = false;
    const load = () => {
      if (done) return;
      done = true;
      setLoadVideo(true);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          load();
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );

    io.observe(section);
    // Fallback: some embedded browsers skip the initial IO callback
    const fallback = window.setTimeout(load, 1200);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  // When iframes mount, re-apply cover/contain sizes without rebuilding ScrollTrigger
  useLayoutEffect(() => {
    if (!loadVideo || !frameRef.current || !fitMediaRef.current) return;
    const frame = frameRef.current;
    const r = frame.getBoundingClientRect();
    fitMediaRef.current(r.width, r.height);
  }, [loadVideo, isMobile]);

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
        fitMediaRef.current = null;

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
        let stableVh = largeViewportHeight();

        const measure = () => {
          // clientWidth = layout width (no scrollbar strip) so pin never leaves a right gap
          const vw = layoutViewportWidth();
          const startW = Math.max(vw - MOBILE_PAD_X * 2, 280);
          const startH = Math.round(startW / MOBILE_VIDEO_RATIO);
          return { vw, vh: stableVh, startW, startH };
        };

        /**
         * SalesMama-style fill: sharp video stays 16:9 contain (no crop),
         * ambient layer covers the full frame with a heavy blur of the same feed.
         */
        const fitMedia = (frameW: number, frameH: number) => {
          const main = frame.querySelector(".video-section-iframe--main") as HTMLElement | null;
          const ambient = frame.querySelector(
            ".video-section-iframe--ambient",
          ) as HTMLElement | null;

          let mainW = frameW;
          let mainH = frameW / MOBILE_VIDEO_RATIO;
          if (mainH > frameH) {
            mainH = frameH;
            mainW = frameH * MOBILE_VIDEO_RATIO;
          }
          if (main) {
            gsap.set(main, {
              width: mainW,
              height: mainH,
              x: 0,
              y: 0,
              scale: 1,
              force3D: false,
            });
          }

          if (ambient) {
            let ambW = frameW;
            let ambH = frameW / MOBILE_VIDEO_RATIO;
            if (ambH < frameH) {
              ambH = frameH;
              ambW = frameH * MOBILE_VIDEO_RATIO;
            }
            ambW *= 1.28;
            ambH *= 1.28;
            gsap.set(ambient, {
              width: ambW,
              height: ambH,
              x: 0,
              y: 0,
              scale: 1,
              force3D: false,
            });
          }
        };

        fitMediaRef.current = fitMedia;

        const applyLayout = () => {
          stableVh = largeViewportHeight();
          const { vw, startW, startH } = measure();

          // Full-bleed stage from the start — never animate horizontal section
          // padding during pin (that locked a narrower fixed width → right gap).
          gsap.set(section, {
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 40,
            paddingBottom: 40,
            width: "100%",
            maxWidth: "none",
            overflowX: "clip",
            overflowY: "visible",
            backgroundColor: "transparent",
          });

          gsap.set(stage, {
            width: vw,
            maxWidth: "none",
            height: startH,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            overflow: "visible",
            backgroundColor: "transparent",
            x: 0,
            left: 0,
          });

          gsap.set(tilt, {
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            x: 0,
            y: 0,
            force3D: false,
            backfaceVisibility: "hidden",
          });

          gsap.set(frame, {
            width: startW,
            height: startH,
            maxWidth: "none",
            flexShrink: 0,
            aspectRatio: "none",
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            force3D: false,
            transformOrigin: "50% 100%",
            willChange: "width, height",
            backfaceVisibility: "hidden",
            backgroundColor: "#0a0a0a",
          });
          fitMedia(startW, startH);
        };

        const applyVisual = (progress: number) => {
          const { vw, vh, startW, startH } = measure();
          const t = easeGrow(gsap.utils.clamp(0, 1, progress / GROW_PORTION));
          const frameW = startW + (vw - startW) * t;
          const frameH = startH + (vh - startH) * t;
          const padY = 40 * (1 - t);

          // Only collapse vertical inset — keep width locked to layout vw
          gsap.set(section, {
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: padY,
            paddingBottom: padY,
          });

          // Keep pinned stage glued to the left edge at full layout width
          gsap.set(stage, {
            width: vw,
            maxWidth: "none",
            left: 0,
            x: 0,
            marginLeft: 0,
            marginRight: 0,
          });

          gsap.set(frame, {
            width: frameW,
            height: frameH,
            flexShrink: 0,
            scaleX: 1,
            scaleY: 1,
            borderRadius: 10.5 * (1 - t),
            transformOrigin: "50% 100%",
            force3D: false,
            backgroundColor: "#0a0a0a",
          });
          fitMedia(frameW, frameH);
        };

        applyLayout();
        applyVisual(0);

        const st = ScrollTrigger.create({
          trigger: stage,
          start: "bottom bottom",
          end: () => `+=${Math.round(stableVh * 2.6)}`,
          pin: true,
          pinType: "fixed",
          pinSpacing: true,
          anticipatePin: 0,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            state.target = self.progress;
            if (self.isActive) {
              // ST can re-apply a stale left/width from pin-start — keep full-bleed
              gsap.set(stage, {
                left: 0,
                width: layoutViewportWidth(),
                x: 0,
              });
            }
          },
          onRefresh: (self) => {
            applyLayout();
            state.target = self.progress;
            if (self.progress < 0.02) {
              state.current = 0;
            }
            // Always restore current visual — don't leave start padding/width mid-pin
            applyVisual(state.current);
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

        let viewportWidth = layoutViewportWidth();
        const onResize = () => {
          if (isTouchToolbarResize(viewportWidth)) return;
          viewportWidth = layoutViewportWidth();
          applyLayout();
          applyVisual(state.current);
          refreshScrollTriggers();
        };
        window.addEventListener("resize", onResize);
        window.addEventListener("orientationchange", onResize);

        return () => {
          if (fitMediaRef.current === fitMedia) fitMediaRef.current = null;
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
                <>
                  {isMobile ? (
                    <iframe
                      src={embedUrl}
                      className="video-section-iframe video-section-iframe--ambient absolute border-0"
                      title=""
                      aria-hidden
                      tabIndex={-1}
                      frameBorder="0"
                      allow="autoplay; picture-in-picture"
                      sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox"
                    />
                  ) : null}
                  <iframe
                    src={embedUrl}
                    className="video-section-iframe video-section-iframe--main absolute border-0"
                    title={videoTitle}
                    frameBorder="0"
                    allow="autoplay; picture-in-picture"
                    allowFullScreen
                    sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox"
                  />
                </>
              ) : (
                <div
                  className="video-section-iframe video-section-iframe--main pointer-events-none absolute border-0 bg-[#111]"
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
