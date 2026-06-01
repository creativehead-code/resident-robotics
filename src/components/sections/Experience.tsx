"use client";

import Image from "next/image";
import { experience } from "@/lib/content";
import Reveal, { RevealWords } from "@/components/ui/Reveal";

// Curated from the 20 supplied photos — mix of build, team, action, detail.
const gallery: { src: string; span: string }[] = [
  { src: "Image11", span: "md:col-span-2 md:row-span-2" }, // feature
  { src: "Image19", span: "" }, // macro electronics
  { src: "Image15", span: "md:row-span-2" }, // action portrait
  { src: "Image4", span: "md:col-span-2" }, // team on hardware
  { src: "Image1", span: "" }, // hands building
  { src: "Image12", span: "md:row-span-2" }, // holding robot dog
  { src: "Image8", span: "md:col-span-2" }, // group showcase
  { src: "Image17", span: "" }, // bench build
  { src: "Image13", span: "" }, // quadrupeds on table
];

export default function Experience() {
  return (
    <section className="section relative">
      <div className="container-rr">
        <Reveal className="mb-12 max-w-3xl">
          <span className="eyebrow">The Experience</span>
          <h2 className="h2 mt-4">
            <RevealWords text={experience.heading} />
          </h2>
          <p className="lead mt-5">{experience.sub}</p>
        </Reveal>

        <div className="grid auto-rows-[clamp(8rem,15vw,11rem)] grid-flow-row-dense grid-cols-2 gap-3 md:grid-cols-4">
          {gallery.map((g, i) => (
            <Reveal
              key={g.src}
              delay={(i % 4) * 0.06}
              y={28}
              className={`${g.span} min-h-0`}
            >
              <div className="group relative h-full w-full overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--bg-2)]">
                <Image
                  src={`/assets/images/${g.src}.JPG`}
                  alt="Resident Robotics — students at work"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-20" />
                <div
                  className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/0 transition-all duration-500 group-hover:ring-[var(--brand-blue)]/40"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
