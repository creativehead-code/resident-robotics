"use client";

import Image from "next/image";
import { program } from "@/lib/content";
import Reveal, { RevealWords } from "@/components/ui/Reveal";
import Parallax from "@/components/ui/Parallax";
import Button from "@/components/ui/Button";

export default function Program() {
  return (
    <section id="program" className="section relative">
      <div className="container-rr">
        {/* Authority shot — full technical team */}
        <Reveal className="relative mb-16 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line)]">
          <div className="relative aspect-[16/7] w-full overflow-hidden">
            <Parallax speed={50} className="absolute inset-0">
              <div className="relative h-[125%] w-full">
                <Image
                  src="/assets/images/team.jpg"
                  alt="The Resident Robotics technical team"
                  fill
                  sizes="(max-width: 1280px) 100vw, 1240px"
                  className="object-cover object-[50%_82%]"
                />
              </div>
            </Parallax>
            {/* grade for legibility of the corner label */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(5,6,12,0.5), transparent 45%)" }}
            />
            <span className="absolute bottom-5 left-6 text-xs uppercase tracking-[0.2em] text-white/70">
              The people who actually teach
            </span>
            <span className="absolute left-4 top-4 h-5 w-5 border-l border-t border-white/30" />
            <span className="absolute right-4 top-4 h-5 w-5 border-r border-t border-white/30" />
          </div>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <span className="eyebrow">The Program</span>
            </Reveal>
            <h2 className="h2 mt-4">
              <RevealWords text="A Robotics Residency." />
              <br />
              <span style={{ color: "var(--orange)" }}>
                <RevealWords text="Not a Tutorial Playlist." delay={0.15} />
              </span>
            </h2>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            {program.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.1}>
                <p className="body-text mb-5 text-[1.05rem]">{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <div className="mt-3">
                <Button href={program.cta.href} variant="orange" magnetic>
                  {program.cta.label}
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
