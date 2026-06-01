"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li" | "p" | "h2" | "h3";
  once?: boolean;
};

const EASE = [0.16, 1, 0.3, 1] as const;

/** Staggered fade-up reveal on scroll-into-view. */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
  once = true,
}: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-12% 0px -12% 0px" });
  const MotionTag = motion[as];

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Splits a heading into words that rise in sequence — premium hero feel. */
export function RevealWords({
  text,
  className,
  delay = 0,
  stagger = 0.08,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className} style={{ display: "inline-block" }}>
      {words.map((w, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: 0.85,
              ease: EASE,
              delay: delay + i * stagger,
            }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
