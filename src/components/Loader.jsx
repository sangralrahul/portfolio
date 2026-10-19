import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/* Chapter-style intro loader: counts up while fonts + the 3D world come online. */
export default function Loader({ ready }) {
  const [pct, setPct] = useState(0)
  const [done, setDone] = useState(false)
  useEffect(() => {
    let raf, start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / 1100)
      const cap = ready ? 100 : 86
      setPct((p) => Math.max(p, Math.round(Math.min(cap, (1 - Math.pow(1 - t, 3)) * 100))))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [ready])
  useEffect(() => {
    if (pct >= 100) { const t = setTimeout(() => setDone(true), 250); return () => clearTimeout(t) }
  }, [pct])
  // never block the page for more than ~2.5s
  useEffect(() => { const t = setTimeout(() => setDone(true), 2500); return () => clearTimeout(t) }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="loader" exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } }}>
          <div className="loader-inner">
            <span className="loader-kicker">Rahul Sangral · Portfolio</span>
            <span className="loader-title">Building the workspace</span>
            <div className="loader-bar"><span style={{ transform: `scaleX(${pct / 100})` }} /></div>
            <span className="loader-pct">{String(pct).padStart(3, '0')}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
