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
            <div className="mt-5 flex flex-wrap gap-2.5">
              {footer.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line-strong)] text-[var(--fg-dim)] transition-colors hover:border-[var(--brand-blue)] hover:text-[var(--fg)]"
                >
                  <SocialIcon name={s.label} />
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

function SocialIcon({ name }: { name: string }) {
  if (name === "Instagram") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === "LinkedIn") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M4.98 3.5a2.5 2.5 0 1 1-.02 5 2.5 2.5 0 0 1 .02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.85V21h-4z" />
      </svg>
    );
  }
  if (name === "YouTube") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M23 12s0-3.4-.43-5.03a2.62 2.62 0 0 0-1.84-1.84C18.9 4.7 12 4.7 12 4.7s-6.9 0-8.73.43a2.62 2.62 0 0 0-1.84 1.84C1 8.6 1 12 1 12s0 3.4.43 5.03c.24.9.94 1.6 1.84 1.84C5.1 19.3 12 19.3 12 19.3s6.9 0 8.73-.43a2.62 2.62 0 0 0 1.84-1.84C23 15.4 23 12 23 12zM9.75 15.5v-7l6 3.5z" />
      </svg>
    );
  }
  return null;
}
