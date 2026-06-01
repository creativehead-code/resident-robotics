"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** Translates its child on the Y axis as the element scrolls through the
 *  viewport. `speed` > 0 moves it down (slower than scroll = depth). */
export default function Parallax({
  children,
  speed = 60,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
