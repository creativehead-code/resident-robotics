"use client";

import { useEffect, useRef, useState } from "react";
import { video } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

function fmt(t: number) {
  if (!Number.isFinite(t) || t < 0) return "00:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setCurrent(v.currentTime);
    const onMeta = () => setDuration(v.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    if (v.readyState >= 1) setDuration(v.duration);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  // Autoplay when the video scrolls into view; pause when it leaves.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 }
    );
    observer.observe(v);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };
  const restart = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    setCurrent(0);
    v.play().catch(() => {});
  };
  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };
  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - r.left) / r.width) * duration;
  };

  const progress = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <section className="section relative">
      <div className="container-rr">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Inside the Lab</span>
          <h2 className="h2 mt-4">{video.heading}</h2>
        </Reveal>

        <Reveal delay={0.1} className="relative mt-12">
          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line)] bg-black shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
            <video
              ref={videoRef}
              loop
              muted
              playsInline
              preload="metadata"
              poster="/assets/images/video-poster.jpg"
              aria-label="Resident Robotics — 60 hours in the lab"
              className="block aspect-video w-full object-cover"
            >
              <source src="/assets/video/Explainer-web.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Control bar */}
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--bg-2)] px-4 py-3 sm:gap-4">
            <button
              type="button"
              onClick={restart}
              aria-label="Restart from the beginning"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--line-strong)] text-[var(--fg-dim)] transition-colors hover:border-[var(--orange)] hover:text-[var(--orange)]"
            >
              <RestartIcon />
            </button>
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Pause" : "Play"}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white transition-transform hover:scale-105 active:scale-95"
              style={{ background: "var(--orange)" }}
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>

            <div
              className="shrink-0 text-xs tabular-nums text-[var(--fg-dim)] sm:text-sm"
              style={{ fontFamily: MONO }}
              suppressHydrationWarning
            >
              {fmt(current)} / {fmt(duration)}
            </div>

            <div
              onClick={seek}
              className="group relative h-1.5 flex-1 cursor-pointer overflow-hidden rounded-full bg-white/10"
              role="progressbar"
              aria-label="Playback progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
            >
              <div
                className="absolute inset-y-0 left-0 transition-[width] duration-150"
                style={{ width: `${progress}%`, background: "var(--orange)" }}
              />
            </div>

            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              aria-pressed={!muted}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--line-strong)] text-[var(--fg-dim)] transition-colors hover:text-[var(--fg)]"
            >
              {muted ? <MuteIcon /> : <UnmuteIcon />}
            </button>
          </div>

          <p className="lead mt-6 text-center">{video.sub}</p>
        </Reveal>
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}
function RestartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <polyline points="3 4 3 10 9 10" />
    </svg>
  );
}
function MuteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}
function UnmuteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <path d="M15.54 8.46a5 5 0 010 7.07" />
      <path d="M19.07 4.93a10 10 0 010 14.14" />
    </svg>
  );
}
