# Resident Robotics Program — Website

A side program for the My Equation website. Single-page, 9-section, application-driving landing page with a live three.js hero and cinematic scroll motion.

## Stack
- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **three.js** via **@react-three/fiber** + **@react-three/drei** — the live hero robot
- **GSAP + ScrollTrigger** & **Lenis** — synced smooth scrolling
- **Framer Motion** — reveals, transitions, micro-interactions
- **Tailwind CSS v4** + a custom design-token layer (`src/app/globals.css`)

## Run
```bash
npm run dev      # dev server (http://localhost:3000)
npm run build    # production build
npm start        # serve production build
```

## Structure
```
src/
  app/
    layout.tsx        Poppins, metadata, SmoothScroll provider
    page.tsx          assembles the 9 sections
    globals.css       design system (colors, type, buttons, atmosphere)
  lib/content.ts      ALL copy + data (edit here, sourced from Brief.md)
  components/
    Nav.tsx · StickyApply.tsx · SmoothScroll.tsx
    ui/               Reveal · RevealWords · Magnetic · CountUp
    three/HeroScene.tsx   procedural placeholder robot (swap for GLB)
    sections/         Hero · Program · VideoSection · WhyUs ·
                      RobotShowcase · Curriculum · Experience · Legacy · Footer
```

## Assets
See `ASSETS.md` for the full manifest. Drop files into `public/assets/...`.
Every placeholder is tagged with a `data-asset` attribute naming the file it expects.

### Swapping in the real hero robot
1. Export a `.glb` and save to `public/assets/models/hero-robot.glb`.
2. In `src/components/three/HeroScene.tsx`, replace `<PlaceholderRobot/>` with
   drei's `<Gltf src="/assets/models/hero-robot.glb" />` (lighting/rig stay).

## Design system
Brand Blue `#2F6BFF` · Blue Deep `#081B45` · Signature Yellow `#FACC15` ·
CTA Orange `#FF5100` · Ink `#0C0C0C`. Type: Poppins (400–800).
Theme: dark lab / tech. Motion: maximal cinematic.
