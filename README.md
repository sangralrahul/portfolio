# Rahul Sangral — Portfolio (streaming edition)

A cinematic, streaming-app–style portfolio built with **React + Vite + Framer Motion**.

- "Who's watching?" profile picker — each profile (Recruiter, Developer, Founder, Explorer) reorders the rows
- Original animated **R** intro with a synthesized Web Audio sting (no audio files)
- Billboard hero with live network canvas, scrolling code and drifting glows
- Rows: Top 10 Projects, Continue Watching (experience), Tech Stack, Certifications, Education, Coding Profiles
- Hover preview cards, detail modals with "Episodes" / "More Like This", My List, live search
- Fully responsive, keyboard accessible, respects `prefers-reduced-motion`

## Edit content
All content lives in [`src/data.js`](src/data.js).

**Add your photo:** drop a portrait at `public/profile.jpg` — it appears in the hero and About modal automatically.

## Run locally
```bash
npm install
npm run dev
```

## Deploy
Push to GitHub and import the repo on Vercel (framework preset: Vite). `vercel.json` is included.
