import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

/* ── tiny 3D value-noise (no deps) ──────────────────────────── */
const P = new Uint8Array(512)
;(() => {
  const p = Array.from({ length: 256 }, (_, i) => i)
  for (let i = 255; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [p[i], p[j]] = [p[j], p[i]] }
  for (let i = 0; i < 512; i++) P[i] = p[i & 255]
})()
const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10)
const lerp = (a, b, t) => a + t * (b - a)
const grad = (h, x, y, z) => { const u = h < 8 ? x : y, v = h < 4 ? y : h === 12 || h === 14 ? x : z; return ((h & 1) ? -u : u) + ((h & 2) ? -v : v) }
function noise(x, y, z) {
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255
  x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z)
  const u = fade(x), v = fade(y), w = fade(z)
  const A = P[X] + Y, AA = P[A] + Z, AB = P[A + 1] + Z, B = P[X + 1] + Y, BA = P[B] + Z, BB = P[B + 1] + Z
  return lerp(
    lerp(lerp(grad(P[AA] & 15, x, y, z), grad(P[BA] & 15, x - 1, y, z), u), lerp(grad(P[AB] & 15, x, y - 1, z), grad(P[BB] & 15, x - 1, y - 1, z), u), v),
    lerp(lerp(grad(P[AA + 1] & 15, x, y, z - 1), grad(P[BA + 1] & 15, x - 1, y, z - 1), u), lerp(grad(P[AB + 1] & 15, x, y - 1, z - 1), grad(P[BB + 1] & 15, x - 1, y - 1, z - 1), u), v),
    w,
  )
}

/* ── Flow field: particles trace an evolving vector field, leaving fading trails ── */
function FlowField() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d', { alpha: true })
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let w, h, raf, t = 0, parts = [], mx = -1e4, my = -1e4, visible = true
    const SCALE = 0.0016
    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.round(Math.min(520, (w * h) / 3200))
      parts = Array.from({ length: n }).map(() => spawn())
      ctx.fillStyle = 'rgba(0,0,0,1)'; ctx.fillRect(0, 0, w, h)
    }
    const spawn = () => ({ x: Math.random() * w, y: Math.random() * h, life: 80 + Math.random() * 220, age: 0, s: 0.6 + Math.random() * 1.4, a: 0.25 + Math.random() * 0.55 })
    const tick = () => {
      if (!visible) { raf = requestAnimationFrame(tick); return }
      t += 0.0035
      // fade previous frame → trails
      ctx.fillStyle = 'rgba(0,0,0,0.07)'
      ctx.fillRect(0, 0, w, h)
      ctx.lineCap = 'round'
      for (const p of parts) {
        const n = noise(p.x * SCALE, p.y * SCALE, t)
        const ang = n * Math.PI * 2.4
        // mouse repulsion
        const dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy
        let fx = Math.cos(ang) * p.s, fy = Math.sin(ang) * p.s
        if (d2 < 36000) { const d = Math.sqrt(d2) + 1; const f = (190 - d) / 190 * 2.2; fx += (dx / d) * f; fy += (dy / d) * f }
        const nx = p.x + fx, ny = p.y + fy
        const fadeIn = Math.min(1, p.age / 20), fadeOut = Math.min(1, (p.life - p.age) / 30)
        ctx.strokeStyle = `rgba(255,255,255,${p.a * fadeIn * fadeOut})`
        ctx.lineWidth = p.s * 0.9
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(nx, ny); ctx.stroke()
        p.x = nx; p.y = ny; p.age++
        if (p.age > p.life || p.x < -10 || p.x > w + 10 || p.y < -10 || p.y > h + 10) Object.assign(p, spawn())
      }
      raf = requestAnimationFrame(tick)
    }
    const onMove = (e) => { mx = e.clientX; my = e.clientY }
    const onVis = () => { visible = !document.hidden }
    resize()
    if (reduce) { // static frame
      for (let i = 0; i < 120; i++) { ctx.fillStyle = 'rgba(0,0,0,0.07)'; for (const p of parts) { const ang = noise(p.x * SCALE, p.y * SCALE, 0) * Math.PI * 2.4; const nx = p.x + Math.cos(ang) * p.s, ny = p.y + Math.sin(ang) * p.s; ctx.strokeStyle = `rgba(255,255,255,${p.a * 0.6})`; ctx.lineWidth = p.s; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(nx, ny); ctx.stroke(); p.x = nx; p.y = ny } }
    } else tick()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('visibilitychange', onVis)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', onMove); document.removeEventListener('visibilitychange', onVis) }
  }, [])
  return <canvas ref={ref} className="bg-flow" />
}

/* ── Wave ribbons: layered sine ribbons drifting slowly (SVG, cheap) ── */
function Ribbons() {
  const ref = useRef(null)
  useEffect(() => {
    const svg = ref.current
    const paths = [...svg.querySelectorAll('path')]
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf, t = 0
    const W = 1600, H = 900
    const draw = () => {
      t += 0.004
      paths.forEach((p, i) => {
        const amp = 60 + i * 26, base = 300 + i * 95, k = 0.0045 + i * 0.0007, ph = t * (1 + i * 0.25)
        let d = `M -50 ${base}`
        for (let x = 0; x <= W + 50; x += 40) {
          const y = base + Math.sin(x * k + ph) * amp + Math.sin(x * k * 2.3 - ph * 1.7) * amp * 0.35
          d += ` L ${x} ${y.toFixed(1)}`
        }
        p.setAttribute('d', d)
      })
      if (!reduce) raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <svg ref={ref} className="bg-ribbons" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="rib" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3, 4].map((i) => <path key={i} fill="none" stroke="url(#rib)" strokeWidth={1.2 - i * 0.15} opacity={0.5 - i * 0.08} />)}
    </svg>
  )
}

export default function Background() {
  const { scrollYProgress } = useScroll()
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const ribY = useTransform(scrollYProgress, [0, 1], ['0%', '-35%'])
  const blobA = useTransform(scrollYProgress, [0, 1], ['0vh', '60vh'])
  const blobB = useTransform(scrollYProgress, [0, 1], ['0vh', '-40vh'])
  return (
    <div className="bg" aria-hidden="true">
      <motion.div className="bg-grid" style={{ y: gridY }} />
      <div className="bg-mesh">
        <motion.span className="blob blob--a" style={{ y: blobA }} />
        <motion.span className="blob blob--b" style={{ y: blobB }} />
      </div>
      <FlowField />
      <motion.div className="bg-ribbons-wrap" style={{ y: ribY }}><Ribbons /></motion.div>
      <div className="bg-spot" />
      <div className="bg-vignette" />
      <div className="bg-noise" />
    </div>
  )
}
