"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type SmartVideoProps = {
  src: string;
  title?: string;
  playing?: boolean;
  muted?: boolean;
  className?: string;
};

type Embed =
  | { kind: "file"; src: string }
  | { kind: "youtube"; id: string }
  | { kind: "vimeo"; id: string };

function parseEmbed(src: string): Embed {
  const youtube = src.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/,
  );
  if (youtube?.[1]) return { kind: "youtube", id: youtube[1] };

  const vimeo = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo?.[1]) return { kind: "vimeo", id: vimeo[1] };

  return { kind: "file", src };
}

export function SmartVideo({
  src,
  title = "",
  playing = false,
  muted = true,
  className,
}: SmartVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const embed = parseEmbed(src);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || embed.kind !== "file") return;

    video.muted = muted;
    if (!playing) {
      video.pause();
      return;
    }

    const attempt = video.play();
    if (attempt) attempt.catch(() => {});
  }, [embed.kind, muted, playing, src]);

  useEffect(() => {
    if (embed.kind !== "vimeo" && embed.kind !== "youtube") return;
    const frame = iframeRef.current;
    if (!frame) return;

    const method = playing ? "play" : "pause";
    const send = () => {
      frame.contentWindow?.postMessage(JSON.stringify({ method }), "*");
    };

    send();
    frame.addEventListener("load", send);
    const retry = window.setTimeout(send, 400);
    return () => {
      frame.removeEventListener("load", send);
      window.clearTimeout(retry);
    };
  }, [embed.kind, playing]);

  if (!src.trim()) return null;

  if (embed.kind === "youtube") {
    const params = new URLSearchParams({
      autoplay: playing ? "1" : "0",
      mute: muted ? "1" : "0",
      controls: "0",
      loop: "1",
      playlist: embed.id,
      playsinline: "1",
      rel: "0",
      modestbranding: "1",
    });
    return (
      <iframe
        ref={iframeRef}
        key={`${embed.id}-${muted}`}
        title={title}
        src={`https://www.youtube.com/embed/${embed.id}?${params}`}
        className={cn("h-full w-full border-0", className)}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        loading="eager"
      />
    );
  }

  if (embed.kind === "vimeo") {
    const params = new URLSearchParams({
      autoplay: "1",
      muted: muted ? "1" : "0",
      loop: "1",
      autopause: "0",
      background: muted ? "1" : "0",
      title: "0",
      byline: "0",
      portrait: "0",
      playsinline: "1",
    });
    return (
      <iframe
        ref={iframeRef}
        key={`${embed.id}-${muted}`}
        title={title}
        src={`https://player.vimeo.com/video/${embed.id}?${params}`}
        className={cn("h-full w-full border-0", className)}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        loading="eager"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={embed.src}
      title={title}
      className={cn("h-full w-full object-cover", className)}
      muted={muted}
      loop
      playsInline
      controls={false}
      disablePictureInPicture
      preload="metadata"
    />
  );
}
