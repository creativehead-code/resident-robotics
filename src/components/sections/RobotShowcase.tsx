"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { robots } from "@/lib/content";

const files = [
  "/assets/robots/01-campus-robot.png",
  "/assets/robots/02-t-bot.png",
  "/assets/robots/03-q-bot.png",
  "/assets/robots/04-so-arm.png",
];
const accents = ["#2f6bff", "#facc15", "#ff5100", "#2f6bff"];
const n = robots.items.length;

export default function RobotShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(n - 1) * 100}vw`]);
  const railWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setIdx(Math.max(0, Math.min(n - 1, Math.round(p * (n - 1)))));
  });

  return (
    <section id="robots" ref={ref} style={{ height: `${n * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* constant-moving background (drifting grid + roaming glows) */}
        <div className="rnd-bg">
          <span className="rnd-glow rnd-glow-1" />
          <span className="rnd-glow rnd-glow-2" />
        </div>

        {/* column layout: header / track / rail — no overlap possible */}
        <div className="relative z-10 flex h-full flex-col">
          {/* header */}
        <div className="container-rr flex shrink-0 items-end justify-between pb-4 pt-24 md:pt-28">
          <div>
            <span className="eyebrow">In-House R&amp;D</span>
            <h2 className="h2 mt-2 text-[clamp(1.5rem,3vw,2.4rem)]">
              Four Robots. All Built In-House.
            </h2>
          </div>
          <div className="hidden items-baseline gap-2 md:flex">
            <span className="text-2xl font-bold" style={{ color: accents[idx] }}>
              0{idx + 1}
            </span>
            <span className="text-sm text-[var(--fg-faint)]">/ 0{n}</span>
          </div>
        </div>

        {/* track fills remaining height */}
        <div className="relative min-h-0 flex-1">
          <motion.div style={{ x }} className="flex h-full">
            {robots.items.map((r, i) => (
              <div key={r.n} className="flex h-full w-screen shrink-0 items-center">
                <div className="container-rr grid w-full items-center gap-8 md:grid-cols-2 md:gap-12">
                  {/* WHITE stage holding the product shot */}
                  <div className="relative">
                    <div
                      className="relative mx-auto flex aspect-square w-[min(76%,26rem)] items-center justify-center overflow-hidden rounded-[1.75rem]"
                      style={{
                        background:
                          "radial-gradient(75% 70% at 50% 45%, #ffffff 0%, #ffffff 72%, #f4f6fb 100%)",
                        boxShadow: `0 50px 120px -50px ${accents[i]}88, inset 0 1px 0 #fff`,
                      }}
                    >
                      <motion.div
                        className="relative h-[80%] w-[80%]"
                        initial={{ scale: 0.92, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Image
                          src={files[i]}
                          alt={r.name}
                          fill
                          sizes="(max-width: 768px) 76vw, 26rem"
                          className="object-contain"
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <span
                      className="ghost-num pointer-events-none absolute -top-20 right-0 hidden text-[9rem] leading-none md:block"
                      style={{ color: accents[i], opacity: 0.08 }}
                    >
                      {r.n}
                    </span>
                    <div className="relative flex items-center gap-3">
                      <span className="text-sm font-bold" style={{ color: accents[i] }}>
                        {r.n}
                      </span>
                      <span className="h-px w-8" style={{ background: accents[i] }} />
                      <span
                        className="rounded-full border px-3 py-1 text-xs font-medium"
                        style={{ borderColor: `${accents[i]}66`, color: accents[i] }}
                      >
                        {r.tag}
                      </span>
                    </div>
                    <h3 className="relative mt-4 text-[clamp(1.5rem,2.8vw,2.2rem)] font-bold leading-tight">
                      {r.name}
                    </h3>
                    <p className="relative mt-2 text-lg font-medium" style={{ color: accents[i] }}>
                      {r.headline}
                    </p>
                    <p className="body-text relative mt-3 max-w-md">{r.description}</p>

                    <div className="relative mt-6 grid max-w-md grid-cols-2 gap-3">
                      {r.specs.map(([k, v]) => (
                        <div
                          key={k}
                          className="relative overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--bg-2)] p-4"
                        >
                          <span
                            className="absolute left-0 top-0 h-full w-[3px]"
                            style={{ background: accents[i] }}
                          />
                          <div className="text-[0.7rem] uppercase tracking-wider text-[var(--fg-faint)]">
                            {k}
                          </div>
                          <div className="mt-1 font-semibold">{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* progress rail */}
        <div className="container-rr shrink-0 pb-8 pt-2">
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full"
              style={{ width: railWidth, background: accents[idx] }}
            />
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
