# Rahul Sangral — Portfolio

A clean, dark, animation-rich portfolio built with **React + Vite + Framer Motion**.

- Hero with letter-by-letter name reveal, typewriter role, parallax and a photo card
- Animated stat counters, tech ticker, about + quick facts
- Scroll-drawn experience timeline
- Featured project + project grid with case-study modals
- Skills, certifications, education, coding profiles, contact form (mailto)
- 3D tilt cards, cursor glow, scroll progress — all respecting `prefers-reduced-motion`

## Edit content
Everything lives in [`src/data.js`](src/data.js). Case-study text is in `src/components/ProjectModal.jsx`.

**Add your photo:** put a portrait at `public/profile.jpg` (4:5 works best) — it appears in the hero automatically.
**Resume:** `public/resume.pdf` (replace to update).
**Logos **Resume:** put `resume.pdf` in `public/` and set `resume: '/resume.pdf'` in `src/data.js`. certificates:** `public/logos/`, `public/certs/`; links live in `src/data.js`.

## Run locally
```bash
npm install
npm run dev
```

## Deploy
Push to GitHub, import the repo on Vercel (framework: Vite). `vercel.json` is included.
