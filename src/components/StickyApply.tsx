"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { footer } from "@/lib/content";

/** Sticky Apply CTA on mobile — appears after the hero, hides at the footer. */
export default function StickyApply() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom =
        window.innerHeight + y > document.body.scrollHeight - 700;
      setShow(y > window.innerHeight * 0.9 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-50 p-3 md:hidden"
        >
          <a
            href="#apply"
            className="btn btn-orange w-full justify-center text-base"
            style={{ boxShadow: "0 -8px 40px -10px rgba(5,6,12,0.9)" }}
          >
            {footer.cta.label}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
