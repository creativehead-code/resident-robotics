"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { hero } from "@/lib/content";
import Button from "@/components/ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;
const INTER = "var(--font-inter), ui-sans-serif, system-ui, sans-serif";

export default function Hero() {
  // Window scroll (px) — reliably 0 at the top, unlike target-based progress.
  const { scrollY } = useScroll();
  // Premium parallax: photo drifts down slower than scroll; copy lifts faster.
  const imgY = useTransform(scrollY, [0, 900], ["0%", "11%"]);
  const imgScale = useTransform(scrollY, [0, 900], [1.08, 1.16]);
  const copyY = useTransform(scrollY, [0, 900], [0, -240]);
  const btnY = useTransform(scrollY, [0, 900], [0, -110]);

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Hero photo with parallax */}
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 z-0">
        <Image
          src="/assets/images/hero.jpg"
          alt="The Resident Robotics line-up — built in-house"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </motion.div>
      {/* 30% black wash (matches Figma) + grading */}
      <div className="absolute inset-0 z-[1] bg-black/30" />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(42% 36% at 50% 18%, rgba(5,6,12,0.6) 0%, transparent 70%), linear-gradient(to bottom, rgba(5,6,12,0.45) 0%, transparent 26%, transparent 72%, rgba(5,6,12,0.8) 96%, var(--bg) 100%)",
        }}
      />

      {/* Upper copy block — chip + title + sub */}
      <motion.div
        style={{ y: copyY }}
        className="container-rr absolute inset-x-0 top-0 z-10 flex flex-col items-center pt-[clamp(5rem,13.5vh,8.5rem)] text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="chip"
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--orange)" }} />
          My Equation · Offline Robotics Residency
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.35 }}
          className="mt-[clamp(1.25rem,3vh,2.25rem)] text-white"
          style={{ fontFamily: INTER, fontWeight: 800, lineHeight: 1.089, letterSpacing: "-0.02em" }}
        >
          <span style={{ fontSize: "clamp(2.5rem, 4.74vw, 5.4rem)" }}>Build </span>
          <span style={{ fontSize: "clamp(2.5rem, 4.74vw, 5.4rem)", color: "var(--orange)" }}>
            Real Robots.
          </span>
          <br />
          <span style={{ fontSize: "clamp(1.95rem, 3.73vw, 4.3rem)" }}>Not Slideshows.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
          className="mt-[clamp(1rem,2.2vh,1.6rem)] text-white/85"
          style={{ fontFamily: INTER, fontWeight: 300, fontSize: "clamp(0.95rem, 1.27vw, 1.4rem)" }}
        >
          {hero.microSub}
        </motion.p>
      </motion.div>

      {/* Buttons pinned near the bottom — reveal slow, top-to-bottom */}
      <motion.div
        style={{ y: btnY }}
        className="container-rr absolute inset-x-0 bottom-[clamp(2.5rem,11vh,7rem)] z-10 flex justify-center"
      >
        <motion.div
          initial={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0, y: -22 }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1, y: 0 }}
          transition={{ duration: 1.25, ease: EASE, delay: 0.9 }}
          className="grid w-full max-w-[clamp(32rem,53vw,57rem)] grid-cols-2 gap-[clamp(0.75rem,1.6vw,1.6rem)]"
        >
          <Button
            href={hero.ctaPrimary.href}
            variant="orange"
            size="lg"
            className="w-full justify-center !py-[1.05rem]"
          >
            {hero.ctaPrimary.label}
          </Button>
          <Button
            href={hero.ctaSecondary.href}
            variant="light"
            size="lg"
            arrow={false}
            className="w-full justify-center !py-[1.05rem]"
          >
            {hero.ctaSecondary.label}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
