import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const reduce = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const touch = () => typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

/** Typewriter that cycles through phrases. */
export function Typewriter({ phrases, speed = 55, pause = 1700, className = '' }) {
  const [i, setI] = useState(0)
  const [text, setText] = useState('')
  const [del, setDel] = useState(false)
  useEffect(() => {
    if (reduce()) {
      setText(phrases[0])
      return
    }
    const full = phrases[i % phrases.length]
    let t
    if (!del && text.length < full.length) t = setTimeout(() => setText(full.slice(0, text.length + 1)), speed + Math.random() * 40)
    else if (!del && text.length === full.length) t = setTimeout(() => setDel(true), pause)
    else if (del && text.length > 0) t = setTimeout(() => setText(full.slice(0, text.length - 1)), speed / 2)
    else {
      setDel(false)
      setI((n) => n + 1)
    }
    return () => clearTimeout(t)
  }, [text, del, i, phrases, speed, pause])
  return (
    <span className={`typewriter ${className}`}>
      {text}
      <span className="caret" />
    </span>
  )
}

/** Splits text into letters that animate in one by one. */
export function SplitText({ text, delay = 0, stagger = 0.045, className = '' }) {
  const letters = [...text]
  return (
    <span className={`split ${className}`} aria-label={text}>
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          initial={{ opacity: 0, y: '0.6em', rotateX: -60, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
          transition={{ delay: delay + i * stagger, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  )
}

/** Soft radial glow that follows the cursor (desktop only). */
export function CursorGlow() {
  const x = useMotionValue(-1000)
  const y = useMotionValue(-1000)
  const sx = useSpring(x, { stiffness: 120, damping: 24, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 120, damping: 24, mass: 0.4 })
  useEffect(() => {
    if (touch() || reduce()) return
    const on = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', on, { passive: true })
    return () => window.removeEventListener('pointermove', on)
  }, [x, y])
  if (touch()) return null
  return <motion.div className="cursor-glow" style={{ x: sx, y: sy }} aria-hidden="true" />
}

/** Wraps children in a 3D tilt + light-sweep that follows the mouse. */
export function Tilt({ children, max = 10, className = '', style = {}, ...rest }) {
  const ref = useRef(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const srx = useSpring(rx, { stiffness: 220, damping: 20 })
  const sry = useSpring(ry, { stiffness: 220, damping: 20 })
  const shine = useTransform([gx, gy], ([a, b]) => `radial-gradient(circle at ${a}% ${b}%, rgba(255,255,255,.22), transparent 55%)`)

  const move = (e) => {
    if (touch()) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * max * 2)
    rx.set((0.5 - py) * max * 2)
    gx.set(px * 100)
    gy.set(py * 100)
  }
  const leave = () => {
    rx.set(0)
    ry.set(0)
    gx.set(50)
    gy.set(50)
  }
  return (
    <motion.div
      ref={ref}
      className={`tilt ${className}`}
      style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d', ...style }}
      onPointerMove={move}
      onPointerLeave={leave}
      {...rest}
    >
      {children}
      <motion.span className="tilt-shine" style={{ background: shine }} aria-hidden="true" />
    </motion.div>
  )
}

const feed = [
  'Deploying aethex@main → Vercel',
  'Running pytest · 128 passed',
  'Razorpay webhook verified',
  'Indexing docs for RAG pipeline',
  'PostgreSQL migration applied',
  'Shipping React feature branch',
  'Claude API call · 212 ms',
  'CI green · build #412',
]

/** Live "now building" status pill with a pulsing indicator. */
export function LiveStatus() {
  const [i, setI] = useState(0)
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const a = setInterval(() => setI((n) => (n + 1) % feed.length), 3200)
    const b = setInterval(() => setNow(new Date()), 1000)
    return () => {
      clearInterval(a)
      clearInterval(b)
    }
  }, [])
  const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' })
  return (
    <motion.div className="live-status" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.6 }}>
      <span className="live-dot" />
      <span className="live-label">LIVE</span>
      <span className="live-feed">
        <motion.span key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
          {feed[i]}
        </motion.span>
      </span>
      <span className="live-time">{time} IST</span>
    </motion.div>
  )
}

/** Floating dust particles for the profile gate / sections. */
export function Particles({ count = 36 }) {
  const items = useRef(
    Array.from({ length: count }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: 1 + Math.random() * 2.5,
      d: 10 + Math.random() * 18,
      delay: -Math.random() * 20,
      o: 0.2 + Math.random() * 0.5,
    })),
  ).current
  return (
    <div className="particles" aria-hidden="true">
      {items.map((p, i) => (
        <span key={i} style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, opacity: p.o, animationDuration: `${p.d}s`, animationDelay: `${p.delay}s` }} />
      ))}
    </div>
  )
}
