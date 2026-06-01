"use client";

import Image from "next/image";
import { footer } from "@/lib/content";
import Reveal, { RevealWords } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden pt-24">
      {/* glow band */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,var(--brand-blue),transparent)" }}
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(47,107,255,0.18), transparent 70%)" }}
      />

      <div className="container-rr relative">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="eyebrow">Onboarding Team — {footer.city}</div>
            <ul className="mt-4 space-y-3">
              {footer.team.map((t) => (
                <li key={t.name} className="flex items-center justify-between gap-4 border-b border-[var(--line)] pb-3">
                  <span className="font-medium">{t.name}</span>
                  <a
                    href={`tel:${t.phone.replace(/\s/g, "")}`}
                    className="text-[var(--fg-dim)] transition-colors hover:text-[var(--orange)]"
                  >
                    {t.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow">Get in Touch</div>
            <a
              href={`mailto:${footer.email}`}
              className="mt-4 block text-lg font-medium transition-colors hover:text-[var(--brand-blue)]"
            >
              {footer.email}
            </a>
            <div className="mt-5 flex flex-wrap gap-2">
              {footer.socials.map((s) => (
                <a key={s} href="#" className="chip hover:border-[var(--brand-blue)]">
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div className="md:text-right">
            <div className="flex items-center gap-2.5 md:justify-end">
              <Image
                src="/assets/logos/me-logo-white.png"
                alt="My Equation"
                width={140}
                height={36}
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="mt-4 text-sm text-[var(--fg-faint)]">{footer.tagline}</p>
          </div>
        </div>

        <div className="py-10 text-center text-xs text-[var(--fg-faint)]">
          © {"2026"} My Equation · Resident Robotics Program
        </div>
      </div>
    </footer>
  );
}
