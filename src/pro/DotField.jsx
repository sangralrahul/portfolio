import { useEffect, useRef } from 'react'

/*
 * Sidebar background (pro layout): a quiet field of dots with a slow travelling wave and a soft
 * lift around the cursor. It lives inside the hero (not fixed to the page), draws at
 * ~30fps, and stops completely as soon as the hero leaves the screen or the tab is hidden,
 * so the rest of the page scrolls with nothing animating behind it.
 */
export default function DotField() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const GAP = 24
    let w = 0, h = 0, dpr = 1, cols = 0, rows = 0
    let raf = 0, running = false, last = 0, t = 0
    let mx = -9999, my = -9999
    let lastScroll = 0
    const onScroll = () => { lastScroll = performance.now() }

    const size = () => {
      const r = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width; h = r.height
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(w / GAP) + 1; rows = Math.ceil(h / GAP) + 1
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = x * GAP, py = y * GAP
          const wave = Math.sin(x * 0.22 + t * 0.9) * Math.cos(y * 0.18 - t * 0.6)
          const dx = px - mx, dy = py - my
          const near = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 180)
          // fade toward the bottom and the left text column so copy stays crisp
          const fade = Math.min(1, (h - py) / (h * 0.5)) * Math.min(1, py / (h * 0.15) + 0.2)
          const a = (0.07 + 0.11 * (wave + 1) * 0.5 + near * 0.55) * fade
          if (a < 0.02) continue
          const s = 1.1 + near * 1.6
          ctx.fillStyle = near > 0.35 ? `rgba(224,35,28,${a})` : `rgba(255,255,255,${a})`
          ctx.fillRect(px - s / 2, py - s / 2, s, s)
        }
      }
    }

    const loop = (now) => {
      if (!running) return
      raf = requestAnimationFrame(loop)
      if (now - last < 33) return // ~30fps is plenty for a slow wave
      if (now - lastScroll < 180) { last = now; return } // never draw while the page is scrolling
      t += (now - last || 16) / 1000
      last = now
      draw()
    }
    const start = () => { if (running || reduce) return; running = true; last = performance.now(); raf = requestAnimationFrame(loop) }
    const stop = () => { running = false; cancelAnimationFrame(raf) }

    size(); draw()
    const io = new IntersectionObserver(([e]) => (e.isIntersecting && !document.hidden ? start() : stop()), { threshold: 0 })
    io.observe(canvas)
    const onVis = () => (document.hidden ? stop() : start())
    const onMove = (e) => { const r = canvas.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top }
    const onLeave = () => { mx = my = -9999 }
    const ro = new ResizeObserver(() => { size(); draw() })
    ro.observe(canvas)
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener('scroll', onScroll, { passive: true })
    canvas.parentElement.addEventListener('pointermove', onMove, { passive: true })
    canvas.parentElement.addEventListener('pointerleave', onLeave)
    return () => {
      stop(); io.disconnect(); ro.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('scroll', onScroll)
      canvas.parentElement?.removeEventListener('pointermove', onMove)
      canvas.parentElement?.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={ref} className="dotfield" aria-hidden="true" />
}
