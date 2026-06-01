"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { whyUs } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;
const accents = ["#2f6bff", "#e0a500", "#ff5100", "#2f6bff"];

export default function WhyUs() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const n = whyUs.cycles.length;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const v = videoRef.current;
    if (v && v.duration) {
      const t = Math.min(v.duration - 0.05, Math.max(0, p) * v.duration);
      if (Math.abs(v.currentTime - t) > 0.02) v.currentTime = t;
    }
    setActive(Math.max(0, Math.min(n - 1, Math.floor(p * n))));
  });

  return (
    <section
      id="why"
      ref={ref}
      style={{ height: `${n * 100}vh` }}
      className="light relative"
    >
      <div className="light-bg" />
      <div className="sticky top-0 z-10 flex h-screen items-center overflow-hidden">
        <div className="container-rr grid w-full items-center gap-10 md:grid-cols-2">
          {/* Borderless frame-by-frame robot — blends into the white */}
          <div className="relative hidden md:block">
            <div className="relative mx-auto aspect-[9/16] w-[min(80%,23rem)]">
              <video
                ref={videoRef}
                className="h-full w-full object-contain"
                muted
                playsInline
                preload="auto"
                src="/assets/video/turtlebot-scrub.mp4"
              />
            </div>
            <p className="mt-2 text-center text-xs uppercase tracking-[0.2em] text-[var(--fg-faint)]">
              Scroll to advance · built in-house
            </p>
          </div>

          {/* Cycling content */}
          <div>
            <span className="eyebrow">{whyUs.heading}</span>

            {/* progress rail */}
            <div className="mt-6 flex gap-2">
              {whyUs.cycles.map((_, i) => (
                <div
                  key={i}
                  className="h-1 flex-1 overflow-hidden rounded-full"
                  style={{ background: "rgba(10,18,38,0.1)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: accents[i] }}
                    animate={{ width: i <= active ? "100%" : "0%" }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                </div>
              ))}
            </div>

            <div className="relative mt-8 min-h-[17rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.55, ease: EASE }}
                >
                  <div
                    className="ghost-num mb-3 text-7xl"
                    style={{ color: accents[active], opacity: 0.2 }}
                  >
                    {whyUs.cycles[active].n}
                  </div>
                  <h3 className="h3 max-w-md">{whyUs.cycles[active].title}</h3>
                  <p className="body-text mt-4 max-w-lg text-[1.05rem]">
                    {whyUs.cycles[active].body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
