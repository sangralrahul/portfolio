import { motion } from 'framer-motion'
import { useEffect, useMemo } from 'react'

// Original synthesized "cinematic" sting with the Web Audio API (no audio files).
function playSting() {
  try {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return
    const ctx = new AC()
    const now = ctx.currentTime + 0.05
    const master = ctx.createGain()
    master.gain.value = 0.55
    master.connect(ctx.destination)

    const hit = (t, freq, dur, vol) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'sine'
      o.frequency.setValueAtTime(freq * 2.2, t)
      o.frequency.exponentialRampToValueAtTime(freq, t + 0.08)
      g.gain.setValueAtTime(0.0001, t)
      g.gain.exponentialRampToValueAtTime(vol, t + 0.012)
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
      o.connect(g).connect(master)
      o.start(t)
      o.stop(t + dur + 0.05)
      // noise transient
      const len = Math.floor(ctx.sampleRate * 0.12)
      const buf = ctx.createBuffer(1, len, ctx.sampleRate)
      const d = buf.getChannelData(0)
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3)
      const n = ctx.createBufferSource()
      n.buffer = buf
      const f = ctx.createBiquadFilter()
      f.type = 'lowpass'
      f.frequency.value = 900
      const ng = ctx.createGain()
      ng.gain.value = vol * 0.5
      n.connect(f).connect(ng).connect(master)
      n.start(t)
    }

    hit(now + 0.15, 52, 0.9, 0.9)
    hit(now + 1.0, 46, 1.4, 1)

    // swelling chord under the zoom
    const pad = ctx.createGain()
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.setValueAtTime(300, now + 1.9)
    lp.frequency.exponentialRampToValueAtTime(4200, now + 3.1)
    pad.gain.setValueAtTime(0.0001, now + 1.9)
    pad.gain.exponentialRampToValueAtTime(0.22, now + 2.9)
    pad.gain.exponentialRampToValueAtTime(0.0001, now + 4.6)
    lp.connect(pad).connect(master)
    ;[110, 164.81, 220, 277.18, 329.63].forEach((fr, i) => {
      const o = ctx.createOscillator()
      o.type = i % 2 ? 'sawtooth' : 'triangle'
      o.frequency.value = fr
      o.detune.value = (i - 2) * 6
      o.connect(lp)
      o.start(now + 1.9)
      o.stop(now + 4.8)
    })
    setTimeout(() => ctx.close(), 5500)
  } catch {
    /* audio is optional */
  }
}

const STRAND_COLORS = ['#e50914', '#ff3d47', '#b20710', '#ff8a8f', '#7a0b12', '#ffd1d3', '#ff2a36', '#5b1cff', '#2f80ff', '#ffffff']

export default function Intro({ onDone, sound = true }) {
  const strands = useMemo(
    () =>
      Array.from({ length: 110 }).map((_, i) => ({
        left: Math.random() * 100,
        width: 0.15 + Math.random() * 1.4,
        color: STRAND_COLORS[i % STRAND_COLORS.length],
        delay: Math.random() * 0.5,
        dur: 0.7 + Math.random() * 0.7,
        blur: Math.random() < 0.35 ? 2 + Math.random() * 4 : 0,
      })),
    [],
  )

  useEffect(() => {
    if (sound) playSting()
    const t = setTimeout(onDone, 3700)
    return () => clearTimeout(t)
  }, [onDone, sound])

  const ease = [0.65, 0, 0.35, 1]
  const draw = (delay, duration) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { pathLength: { delay, duration, ease }, opacity: { delay, duration: 0.01 } },
  })

  return (
    <motion.div className="intro" exit={{ opacity: 0, transition: { duration: 0.4 } }} onClick={onDone}>
      <motion.div
        className="intro-stage"
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: [1, 1.06, 1.06, 26], opacity: [1, 1, 1, 0] }}
        transition={{ duration: 3.25, times: [0, 0.45, 0.62, 1], ease: ['easeOut', 'linear', [0.7, 0, 0.9, 0.4]] }}
        style={{ transformOrigin: '33% 52%' }}
      >
        <svg viewBox="0 0 300 400" className="intro-logo">
          <defs>
            <linearGradient id="stemG" gradientUnits="userSpaceOnUse" x1="0" y1="40" x2="0" y2="362">
              <stop offset="0" stopColor="#b1060f" />
              <stop offset=".5" stopColor="#e50914" />
              <stop offset="1" stopColor="#8c0610" />
            </linearGradient>
            <linearGradient id="bowlG" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#e50914" />
              <stop offset="1" stopColor="#ff2a36" />
            </linearGradient>
            <linearGradient id="legG" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#7d050d" />
              <stop offset=".35" stopColor="#e50914" />
              <stop offset="1" stopColor="#ff3d47" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="10" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="drop">
              <feDropShadow dx="-6" dy="0" stdDeviation="6" floodColor="#000" floodOpacity=".55" />
            </filter>
          </defs>
          <g filter="url(#glow)">
            <motion.path d="M91 362 V40" stroke="url(#stemG)" strokeWidth="62" fill="none" {...draw(0.15, 0.55)} />
            <motion.path
              d="M91 71 H168 C228 71 250 112 250 150 C250 190 226 229 168 229 H91"
              stroke="url(#bowlG)"
              strokeWidth="62"
              fill="none"
              {...draw(0.55, 0.65)}
            />
            <motion.path d="M160 214 L258 362" stroke="url(#legG)" strokeWidth="66" fill="none" filter="url(#drop)" {...draw(1.0, 0.45)} />
          </g>
        </svg>
      </motion.div>

      <div className="intro-strands">
        {strands.map((s, i) => (
          <motion.span
            key={i}
            style={{ left: `${s.left}%`, width: `${s.width}%`, background: s.color, filter: s.blur ? `blur(${s.blur}px)` : undefined }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: [0, 1, 1], opacity: [0, 0.95, 0] }}
            transition={{ delay: 2.15 + s.delay, duration: s.dur, times: [0, 0.35, 1], ease: 'easeOut' }}
          />
        ))}
      </div>
      <motion.div
        className="intro-flash"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.9, 0] }}
        transition={{ duration: 3.6, times: [0, 0.78, 0.86, 1] }}
      />
      <button className="intro-skip" onClick={onDone}>Skip intro</button>
    </motion.div>
  )
}
