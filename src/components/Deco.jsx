import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/* Huge outlined word that slides horizontally as you scroll past it. */
export function ScrollWord({ word, dir = 1 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], [`${dir * 12}%`, `${dir * -12}%`])
  const o = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  return (
    <div className="scroll-word" ref={ref} aria-hidden="true">
      <motion.span style={{ x, opacity: o }}>{word}</motion.span>
    </div>
  )
}

/* Rotating concentric rings — a subtle "system" motif behind headers. */
export function Orbits({ className = '' }) {
  return (
    <div className={`orbits ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 400">
        <defs>
          <linearGradient id="orb" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ff3b45" stopOpacity=".7" />
            <stop offset="1" stopColor="#ff7a5c" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="orbit orbit--1"><circle cx="200" cy="200" r="190" fill="none" stroke="url(#orb)" strokeWidth="1" strokeDasharray="4 10" /><circle cx="390" cy="200" r="3.5" fill="#ff3b45" /></g>
        <g className="orbit orbit--2"><circle cx="200" cy="200" r="140" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="1" /><circle cx="60" cy="200" r="2.5" fill="#fff" /></g>
        <g className="orbit orbit--3"><circle cx="200" cy="200" r="90" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="1" strokeDasharray="2 6" /><circle cx="200" cy="110" r="2" fill="#ff7a5c" /></g>
      </svg>
    </div>
  )
}

/* Parallax floating shapes inside a section. */
export function FloatShapes({ variant = 'a' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 80])
  const r = useTransform(scrollYProgress, [0, 1], [0, 90])
  return (
    <div className={`shapes shapes--${variant}`} ref={ref} aria-hidden="true">
      <motion.span className="shape shape--ring" style={{ y: y1, rotate: r }} />
      <motion.span className="shape shape--dot" style={{ y: y2 }} />
      <motion.span className="shape shape--line" style={{ y: y1 }} />
    </div>
  )
}

/* Animated bars that breathe behind a stat. */
export function MiniBars({ seed = 0 }) {
  const bars = Array.from({ length: 12 }).map((_, i) => 30 + ((i * 37 + seed * 11) % 60))
  return (
    <div className="mini-bars" aria-hidden="true">
      {bars.map((h, i) => (
        <span key={i} style={{ height: `${h}%`, animationDelay: `${(i * 0.12 + seed * 0.3).toFixed(2)}s` }} />
      ))}
    </div>
  )
}

/* Words that rise one by one as the heading scrolls into view. */
const wordsParent = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
const wordChild = { hidden: { y: '110%' }, show: { y: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } } }
export function Words({ text, className = '' }) {
  return (
    <motion.span className={`words ${className}`} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-8% 0px' }} variants={wordsParent}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="word-mask">
          <motion.span variants={wordChild}>{w}</motion.span>
        </span>
      ))}
    </motion.span>
  )
}
