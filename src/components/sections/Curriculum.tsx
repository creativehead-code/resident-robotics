"use client";

import { curriculum } from "@/lib/content";
import Reveal, { RevealWords } from "@/components/ui/Reveal";
import ToolsGrid from "@/components/ui/ToolsGrid";

const accents = ["#2f6bff", "#facc15", "#ff5100"];
const toolLogos = Array.from({ length: 8 }, (_, i) => `/assets/logos/tools/Software${i + 1}.svg`);

export default function Curriculum() {
  return (
    <section id="curriculum" className="section relative">
      <div className="container-rr">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal>
              <span className="eyebrow">Curriculum</span>
            </Reveal>
            <h2 className="h2 mt-4">
              <RevealWords text={curriculum.heading} />
            </h2>
          </div>
          <Reveal delay={0.1} className="md:col-span-5">
            <p className="body-text">{curriculum.overview}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {curriculum.modules.map((m, i) => (
            <Reveal key={m.n} delay={i * 0.1} y={36}>
              <article
                className="group relative h-full overflow-hidden rounded-[var(--radius-lg)] p-7"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0) 30%), linear-gradient(180deg, var(--bg-3), var(--bg-2))",
                  border: "1px solid var(--line)",
                }}
              >
                {/* diagonal accent wash that grows on hover */}
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-30 blur-2xl transition-all duration-700 group-hover:opacity-70"
                  style={{ background: accents[i] }}
                />
                {/* header: number tile + module tag */}
                <div className="relative flex items-center justify-between">
                  <span
                    className="grid h-14 w-14 place-items-center rounded-xl text-2xl font-extrabold text-white"
                    style={{
                      background: `linear-gradient(140deg, ${accents[i]}, ${accents[i]}aa)`,
                      boxShadow: `0 14px 30px -12px ${accents[i]}`,
                    }}
                  >
                    {m.n}
                  </span>
                  <span className="text-[0.7rem] uppercase tracking-[0.2em] text-[var(--fg-faint)]">
                    Module {m.n}
                  </span>
                </div>

                <h3 className="relative mt-6 text-xl font-semibold leading-snug">
                  {m.title}
                </h3>

                <div
                  className="my-5 h-px w-full"
                  style={{ background: "linear-gradient(90deg, var(--line-strong), transparent)" }}
                />

                <ul className="relative space-y-3.5">
                  {m.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[0.95rem] leading-relaxed text-[var(--fg-dim)]">
                      <svg
                        className="mt-1 shrink-0"
                        width="16" height="16" viewBox="0 0 16 16" fill="none"
                        style={{ color: accents[i] }}
                      >
                        <path d="M3 8.5l3 3 7-7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                {/* bottom accent rule */}
                <span
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: accents[i] }}
                />
              </article>
            </Reveal>
          ))}
        </div>

        {/* Tools you'll master — static, cursor-follow hover, no chips */}
        <Reveal delay={0.15} className="mt-16">
          <p className="mb-2 text-center text-xs uppercase tracking-[0.2em] text-[var(--fg-faint)]">
            Tools you&apos;ll master
          </p>
          <ToolsGrid logos={toolLogos} />
        </Reveal>
      </div>
    </section>
  );
}
