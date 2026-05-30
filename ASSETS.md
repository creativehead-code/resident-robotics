# Resident Robotics — Asset Manifest

Everything the site needs from you. Until a real file lands, I use a **placeholder** so the build stays unblocked. Drop files into the matching `public/assets/...` folder and tell me the filename (or just keep the names below and I'll wire them automatically).

Legend: 🔴 blocks the "wow" of a section · 🟡 important · 🟢 nice-to-have / can ship with placeholder

---

## Section 1 — Hero
- 🔴 **Hero robot** — the star of the page. Ideal: a **GLB/GLTF 3D model** (so three.js can rotate/light it live). If no 3D model, a high-res transparent **PNG** (≥2500px, alpha) of the flagship robot.
  - `public/assets/models/hero-robot.glb`  *or*  `public/assets/images/hero-robot.png`

## Section 2 — The Program
- 🔴 **Full technical team photo** — the "authority shot." Landscape, high-res.
  - `public/assets/images/team.jpg`

## Section 3 — Video
- 🔴 **Explainer film** (the "60 hours in the lab" cut). MP4 (H.264) + WebM if you have it. Autoplay-muted with a poster frame.
  - `public/assets/video/explainer.mp4` · poster → `public/assets/images/video-poster.jpg`

## Section 4 — Why Learn From Us
- 🔴 **Pinned robot visual** — the robot that stays fixed while 4 panels cycle. Best as the **same GLB** as hero (reused) or a clean transparent PNG.
- 🟡 4 partner/credibility logos referenced in copy: **NASSCOM IT-ITeS SSC**, **Nvidia Inception**, **IBM startup program**, GTU.
  - `public/assets/logos/{nasscom,nvidia-inception,ibm,gtu}.svg`

## Section 5 — Robot Showcase (4 robots)
- 🔴 One strong image **per robot** (transparent PNG or clean studio shot). Names fixed by brief:
  - `public/assets/robots/01-campus-robot.png`
  - `public/assets/robots/02-t-bot.png`
  - `public/assets/robots/03-q-bot.png`
  - `public/assets/robots/04-so-arm.png`
  - *(Specs are already in the brief — no asset needed, they're text.)*

## Section 6 — Curriculum
- 🟢 Optional tool logos: SolidWorks, ANSYS, KiCad, ROS2, Gazebo, OpenCV. I can render styled text badges as placeholders.
  - `public/assets/logos/tools/*.svg`

## Section 7 — The Experience (gallery)
- 🔴 **6–7 photos** of students building/breaking/shipping. Mixed orientation is fine — collage handles it.
  - `public/assets/experience/01.jpg` … `07.jpg`

## Section 8 — Legacy / Stats
- 🟡 **Real numbers** (text, not files) — only YOU have these. Locked: `70%` engineers, `49+` hiring companies. **Need from you:**
  - students trained · cohorts graduated · internship conversion % · robots built in-house
- 🟢 Optional: the 49+ hiring-partner logos (ATRI, Virtuoso, Motorama, Jenex, Homebot, …) for a marquee.
  - `public/assets/logos/partners/*.svg`

## Section 9 — Footer
- 🟢 **My Equation logo** (SVG preferred, light + dark variant if you have them).
  - `public/assets/logos/myequation.svg`
- Social links (Instagram, LinkedIn, Facebook, YouTube, Twitter → /My Equation) — text, already in brief.

---

## Global / brand
- 🟡 **Fonts** — Poppins. I'll load via `next/font` (Google) by default; if you have licensed Poppins `.woff2` files, drop them in `public/assets/fonts/` and I'll self-host.
- 🟢 **Favicon / OG image** for sharing.
  - `public/assets/brand/favicon.svg` · `public/assets/brand/og.jpg`

---

### Top priority to make it feel premium (give me these first)
1. **Hero robot — GLB 3D model** (single biggest upgrade; unlocks the live three.js hero)
2. Team photo (S2) + explainer video (S3)
3. The 4 robot images (S5) + 6–7 experience photos (S7)
4. Section 8 real numbers
