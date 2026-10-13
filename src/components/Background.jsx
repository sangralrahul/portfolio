import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

/* Depth-parallax starfield: particles at 3 depths drift, twinkle, and shift with scroll + mouse. */
function Starfield() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w, h, raf, stars = [], t = 0
    let mx = 0, my = 0, tx = 0, ty = 0
    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.round(Math.min(220, (w * h) / 9000))
      stars = Array.from({ length: n }).map(() => {
        const z = Math.random()
        return { x: Math.random() * w, y: Math.random() * h, z, r: 0.4 + z * 1.6, p: Math.random() * Math.PI * 2, s: 0.4 + Math.random() * 1.2, red: Math.random() < 0.12 }
      })
    }
    const tick = () => {
      t += 0.016
      tx += (mx - tx) * 0.04; ty += (my - ty) * 0.04
      const sy = window.scrollY
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        const depth = 0.2 + s.z * 0.8
        const px = s.x + tx * depth * 30
        let py = (s.y - sy * depth * 0.25) % h
        if (py < 0) py += h
        const tw = 0.55 + 0.45 * Math.sin(t * s.s + s.p)
        ctx.beginPath()
        ctx.arc(px, py + ty * depth * 20, s.r, 0, Math.PI * 2)
        ctx.fillStyle = s.red ? `rgba(255,90,100,${tw * 0.9})` : `rgba(255,255,255,${tw * (0.25 + s.z * 0.55)})`
        ctx.fill()
      }
      // slow drifting link lines between the nearest bright stars
      ctx.lineWidth = 0.5
      for (let i = 0; i < stars.length; i += 4) {
        const a = stars[i]
        for (let j = i + 4; j < stars.length; j += 4) {
          const b = stars[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 110 && a.z > 0.5 && b.z > 0.5) {
            const ay = ((a.y - sy * (0.2 + a.z * 0.8) * 0.25) % h + h) % h
            const by = ((b.y - sy * (0.2 + b.z * 0.8) * 0.25) % h + h) % h
            if (Math.abs(ay - by) > 200) continue
            ctx.strokeStyle = `rgba(255,255,255,${(1 - d / 110) * 0.08})`
            ctx.beginPath(); ctx.moveTo(a.x, ay); ctx.lineTo(b.x, by); ctx.stroke()
          }
        }
      }
      for (const s of stars) { s.x += (s.z - 0.5) * 0.06; if (s.x < -5) s.x = w + 5; if (s.x > w + 5) s.x = -5 }
      if (!reduce) raf = requestAnimationFrame(tick)
    }
    const onMove = (e) => { mx = (e.clientX / w - 0.5); my = (e.clientY / h - 0.5) }
    resize(); tick()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', onMove) }
  }, [])
  return <canvas ref={ref} className="bg-stars" />
}

export default function Background() {
  const { scrollYProgress } = useScroll()
  const hue = useTransform(scrollYProgress, [0, 0.5, 1], [0, 18, -14])
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const blobA = useTransform(scrollYProgress, [0, 1], ['0vh', '60vh'])
  const blobB = useTransform(scrollYProgress, [0, 1], ['0vh', '-40vh'])
  return (
    <div className="bg" aria-hidden="true">
      <motion.div className="bg-grid" style={{ y: gridY }} />
      <motion.div className="bg-mesh" style={{ filter: useTransform(hue, (h) => `hue-rotate(${h}deg)`) }}>
        <motion.span className="blob blob--a" style={{ y: blobA }} />
        <motion.span className="blob blob--b" style={{ y: blobB }} />
        <span className="blob blob--c" />
        <span className="blob blob--d" />
      </motion.div>
      <Starfield />
      <div className="bg-vignette" />
      <div className="bg-noise" />
    </div>
  )
}
