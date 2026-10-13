import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Icon from './Icons.jsx'
import { SplitText, Typewriter, Tilt } from './Live.jsx'
import { profile, socials } from '../data.js'
import { scrollToSection } from './Nav.jsx'

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
      const n = Math.round(Math.min(70, (w * h) / 22000))
      pts = Array.from({ length: n }).map(() => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2, r: Math.random() * 1.4 + 0.3 }))
    }
    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
      }
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y)
        if (d < 140) { ctx.strokeStyle = `rgba(255,255,255,${(1 - d / 140) * 0.09})`; ctx.lineWidth = 0.6; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke() }
      }
      for (const p of pts) { ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill() }
      if (!reduce) raf = requestAnimationFrame(tick)
    }
    resize(); tick()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="hero-canvas" />
}

export default function Hero() {
  const [hasPhoto, setHasPhoto] = useState(false)
  useEffect(() => {
    const img = new Image()
    img.onload = () => setHasPhoto(true)
    img.src = profile.photo
  }, [])
  const { scrollY } = useScroll()
  const textY = useTransform(scrollY, [0, 600], [0, 120])
  const textO = useTransform(scrollY, [0, 450], [1, 0])
  const cardY = useTransform(scrollY, [0, 600], [0, 60])

  const up = (i) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] },
  })

  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="hero-grid" />
        <NetworkCanvas />
        <div className="glow glow--red" />
        <div className="glow glow--blue" />
        <div className="hero-fade" />
      </div>

      <div className="container hero-inner">
        <motion.div className="hero-text" style={{ y: textY, opacity: textO }}>
          <motion.div className="eyebrow" {...up(0)}>
            <span className="pulse" /> Available for SDE-1 / New Grad 2026 · Remote or on-site
          </motion.div>
          <h1 className="hero-title">
            <SplitText text="Rahul" delay={0.3} stagger={0.05} />
            <br />
            <SplitText text="Sangral" delay={0.55} stagger={0.05} className="accent" />
          </h1>
          <motion.p className="hero-role" {...up(2)}>
            <Typewriter phrases={['Full-Stack Engineer', 'AI Developer', 'Founding Engineer @ Aethex', 'Founder @ Zyphix']} />
          </motion.p>
          <motion.p className="hero-lede" {...up(3)}>
            {profile.tagline}
          </motion.p>
          <motion.div className="hero-actions" {...up(4)}>
            <button className="btn btn--primary magnetic" onClick={() => scrollToSection('projects')}>
              View my work <Icon name="arrow" size={18} />
            </button>
            <a className="btn btn--ghost" href={profile.resume} target="_blank" rel="noreferrer">
              <Icon name="download" size={18} /> Resume
            </a>
            <button className="btn btn--link" onClick={() => scrollToSection('contact')}>
              Get in touch
            </button>
          </motion.div>
          <motion.div className="hero-socials" {...up(5)}>
            {socials.slice(0, 5).map((s) => (
              <a key={s.id} href={s.url} target="_blank" rel="noreferrer">
                {s.name}
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="hero-visual" style={{ y: cardY }} initial={{ opacity: 0, x: 40, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: 0.5, duration: 1, ease: [0.2, 0.8, 0.2, 1] }}>
          <Tilt max={7} className="photo-tilt">
            <div className="photo-card">
              {hasPhoto ? (
                <img src={profile.photo} alt="Rahul Sangral" />
              ) : (
                <div className="photo-placeholder">
                  <span>RS</span>
                  <small>Add public/profile.jpg</small>
                </div>
              )}
              <div className="photo-ring" />
            </div>
          </Tilt>
          <motion.div className="float-chip float-chip--a" animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
            <Icon name="rocket" size={16} /> Founding Engineer · Aethex
          </motion.div>
          <motion.div className="float-chip float-chip--b" animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
            <Icon name="pin" size={16} /> {profile.location}
          </motion.div>
          <motion.div className="float-chip float-chip--c" animate={{ y: [0, -8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}>
            <Icon name="spark" size={16} /> AI · RAG · Claude API
          </motion.div>
        </motion.div>
      </div>

      <motion.div className="scroll-cue" style={{ opacity: textO }} aria-hidden="true">
        <span />
      </motion.div>
    </section>
  )
}
