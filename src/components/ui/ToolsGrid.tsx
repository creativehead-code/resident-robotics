"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Static logo grid with a soft glow that follows the cursor, and logos
 *  that sit directly on the section (no chips) and colorize on hover. */
export default function ToolsGrid({ logos }: { logos: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 250, damping: 30, mass: 0.5 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative overflow-hidden rounded-2xl py-10"
    >
      {/* cursor-following glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-0 h-48 w-48 rounded-full blur-2xl"
        style={{
          left: sx,
          top: sy,
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle, rgba(47,107,255,0.25), rgba(255,81,0,0.12) 50%, transparent 70%)",
          opacity: hover ? 1 : 0,
          transition: "opacity 0.4s",
        }}
      />
      <div className="relative z-10 grid grid-cols-4 items-center gap-x-8 gap-y-10 md:grid-cols-8">
        {logos.map((src, i) => (
          <div key={i} className="flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="tool-logo max-h-9 max-w-[5rem] object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}
