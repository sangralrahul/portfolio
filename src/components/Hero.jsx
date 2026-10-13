import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Icon from './Icons.jsx'
import { profile } from '../data.js'

function NetworkCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let w, h, raf
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let pts = []
    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.round(Math.min(90, (w * h) / 16000))
      pts = Array.from({ length: n }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.4,
      }))
    }
    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 130) {
            ctx.strokeStyle = `rgba(229, 9, 20, ${(1 - d / 130) * 0.28})`
            ctx.lineWidth = 0.7
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      for (const p of pts) {
        ctx.fillStyle = 'rgba(255, 220, 220, .75)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      if (!reduce) raf = requestAnimationFrame(tick)
    }
    resize()
    tick()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])
  return <canvas ref={ref} className="hero-canvas" />
}

const codeLines = [
  'from fastapi import FastAPI, Depends',
  'app = FastAPI(title="aethex")',
  '@app.post("/v1/subscriptions")',
  'async def subscribe(plan: Plan, user=Depends(auth)):',
  '    order = razorpay.order.create(plan.amount)',
  '    return {"status": "active", "order": order.id}',
  'const { data } = useQuery(["insights", fileId])',
  'SELECT region, SUM(revenue) FROM kpi GROUP BY 1;',
  'rag = Retriever(index="docs").with_llm(claude)',
  'git push origin main  # → Vercel ✓ deployed',
]

export default function Hero({ onMore, onReplay, viewer }) {
  const [hasPhoto, setHasPhoto] = useState(false)
  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 600], [0, 140])
  const contentOpacity = useTransform(scrollY, [0, 420], [1, 0])
  const bgY = useTransform(scrollY, [0, 800], [0, 160])
  const bgScale = useTransform(scrollY, [0, 800], [1, 1.12])
  useEffect(() => {
    const img = new Image()
    img.onload = () => setHasPhoto(true)
    img.src = profile.photo
  }, [])

  const stagger = (i) => ({
    initial: { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.25 + i * 0.12, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] },
  })

  return (
    <section className="hero" id="home">
      <motion.div className="hero-bg" style={{ y: bgY, scale: bgScale }}>
        <div className="hero-glow hero-glow--a" />
        <div className="hero-glow hero-glow--b" />
        <div className="hero-glow hero-glow--c" />
        <NetworkCanvas />
        <div className="hero-code" aria-hidden="true">
          {[...codeLines, ...codeLines].map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
        {hasPhoto && (
          <motion.div
            className="hero-photo"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            style={{ backgroundImage: `url(${profile.photo})` }}
          />
        )}
        <div className="hero-vignette" />
        <div className="hero-fade" />
      </motion.div>

      <motion.div className="hero-content" style={{ y: contentY, opacity: contentOpacity }}>
        <motion.div className="hero-series" {...stagger(0)}>
          <span className="hero-series-r">R</span>
          <span>S E R I E S</span>
        </motion.div>
        <motion.h1 className="hero-title" {...stagger(1)}>
          Rahul<br />Sangral
        </motion.h1>
        <motion.div className="hero-top10" {...stagger(2)}>
          <span className="top10-badge">
            <small>TOP</small>
            <b>10</b>
          </span>
          #1 in Full-Stack Engineers Today
        </motion.div>
        <motion.div className="hero-meta" {...stagger(3)}>
          <span className="match">98% Match</span>
          <span>2026</span>
          <span className="pill">SDE-1</span>
          <span>{profile.role}</span>
          <span className="pill">HD</span>
        </motion.div>
        <motion.p className="hero-desc" {...stagger(4)}>
          {viewer?.tagline || profile.tagline}
        </motion.p>
        <motion.div className="hero-actions" {...stagger(5)}>
          <a className="btn btn--play" href={profile.resume} target="_blank" rel="noreferrer">
            <Icon name="play" size={26} /> Resume
          </a>
          <button className="btn btn--info" onClick={onMore}>
            <Icon name="info" size={24} /> More Info
          </button>
        </motion.div>
      </motion.div>

      <div className="hero-side">
        <button className="round-btn" onClick={onReplay} aria-label="Replay intro" title="Replay intro">
          <Icon name="volumeOn" size={18} />
        </button>
        <span className="hero-rating">Available Now</span>
      </div>
      <motion.div className="hero-scroll-cue" style={{ opacity: contentOpacity }} aria-hidden="true">
        <span />
        Scroll
      </motion.div>
    </section>
  )
}
