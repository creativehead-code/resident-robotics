"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { nav } from "@/lib/content";
import Button from "@/components/ui/Button";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4"
      style={{ paddingTop: scrolled ? "0.9rem" : "0.75rem" }}
    >
      {/* container collapses into a centered pill on scroll */}
      <div
        className="flex w-full items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          maxWidth: scrolled ? "60rem" : "var(--maxw)",
          paddingInline: scrolled ? "1rem" : "1.5rem",
          paddingBlock: scrolled ? "0.6rem" : "0.85rem",
          borderRadius: scrolled ? "999px" : "16px",
          background: scrolled ? "rgba(8,11,24,0.7)" : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(1.3)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px) saturate(1.3)" : "none",
          border: `1px solid ${scrolled ? "var(--line)" : "transparent"}`,
          boxShadow: scrolled ? "0 18px 50px -24px rgba(0,0,0,0.8)" : "none",
        }}
      >
        {/* brand */}
        <a href="#top" className="flex shrink-0 items-center gap-3 leading-none">
          <Image
            src="/assets/logos/me-logo-white.png"
            alt="My Equation"
            width={120}
            height={32}
            priority
            className="h-7 w-auto object-contain"
          />
          <span className="hidden text-sm font-medium leading-none text-[var(--fg-dim)] lg:inline">
            Resident Robotics
          </span>
        </a>

        {/* links */}
        <nav
          className="hidden items-center md:flex"
          style={{ gap: scrolled ? "1.5rem" : "2rem" }}
        >
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm leading-none text-[var(--fg-dim)] transition-colors hover:text-[var(--fg)]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* cta + mobile toggle */}
        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden sm:inline-flex">
            <Button href={nav.cta.href} variant="orange" size="sm">
              {nav.cta.label}
            </Button>
          </span>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--line-strong)] md:hidden"
          >
            <span className="text-lg leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-4 right-4 top-full mt-2 md:hidden"
          >
            <div className="card flex flex-col gap-1 p-3">
              {nav.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm text-[var(--fg-dim)] hover:bg-white/5"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
