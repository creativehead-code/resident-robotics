"use client";

import { legacy } from "@/lib/content";
import Reveal, { RevealWords } from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";

const accents = ["#2f6bff", "#facc15", "#ff5100", "#2f6bff", "#facc15", "#ff5100"];
const partners = Array.from({ length: 19 }, (_, i) =>
  `/assets/logos/partners-white/company-${String(i + 1).padStart(2, "0")}.png`
);

export default function Legacy() {
  return (
    <section className="section relative">
      <div className="container-rr">
        <Reveal className="mb-14 max-w-2xl">
          <span className="eyebrow">The My Equation Legacy</span>
          <h2 className="h2 mt-4">
            <RevealWords text={legacy.heading} />
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {legacy.stats.map((s, i) => (
            <Reveal key={s.label} delay={(i % 3) * 0.08}>
              <div
                className="group relative h-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line)] p-7 md:p-9"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0) 40%), linear-gradient(180deg, var(--bg-3), var(--bg-2))",
                }}
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
                  style={{ background: accents[i] }}
                />
                <div
                  className="relative text-[clamp(2.6rem,5vw,4rem)] font-extrabold leading-none"
                  style={{ color: accents[i] }}
                >
                  {s.value !== null ? (
                    <>
                      <CountUp value={Number(s.value)} />
                      {s.suffix}
                    </>
                  ) : (
                    <span className="text-[var(--fg-faint)]">—{s.suffix}</span>
                  )}
                </div>
                <div className="relative mt-3 text-sm text-[var(--fg-dim)]">{s.label}</div>
                {!s.locked && (
                  <span className="absolute right-5 top-5 rounded-full border border-[var(--line-strong)] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[var(--fg-faint)]">
                    fill in
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Hiring partners marquee */}
        <Reveal delay={0.15} className="mt-16">
          <p className="mb-6 text-center text-xs uppercase tracking-[0.2em] text-[var(--fg-faint)]">
            Mentors coming from
          </p>
          <div className="mentor-wall marquee-mask overflow-hidden">
            <div className="marquee-track items-center gap-12 sm:gap-16">
              {[...partners, ...partners].map((src, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="mentor-logo h-9 w-auto max-w-[8.5rem] shrink-0 object-contain"
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
