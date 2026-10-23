import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Icon from './Icons.jsx'
import Poster from './Poster.jsx'
import { marquee, spotlight } from '../data.js'

const EASE = [0.2, 0.8, 0.2, 1]

/** Fade + rise into view when scrolled to. `delay` in seconds. */
export function Reveal({ children, delay = 0, y = 36, className = '', once = true, as = 'div', ...rest }) {
  const Comp = motion[as] || motion.div
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-12% 0px -8% 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

/** Animated counter — counts from 0 to `to` when it scrolls into view. */
export function CountUp({ to, suffix = '', duration = 1.6, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const mv = useMotionValue(0)
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const ctrl = animate(mv, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setVal(Math.round(v)) })
    return ctrl.stop
  }, [inView, to, duration, mv])
  return (
    <span ref={ref} className={className}>
      {val}
      {suffix}
    </span>
  )
}

/** Thin red progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
}

export function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.9)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <motion.button
      className="back-top"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      initial={false}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 20, pointerEvents: show ? 'auto' : 'none' }}
      transition={{ duration: 0.3 }}
    >
      <Icon name="up" size={20} />
    </motion.button>
  )
}

/** Infinite horizontal tech ticker. */
export function Marquee() {
  const items = [...marquee, ...marquee]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((t, i) => (
          <span key={i}>
            {t}
            <i>•</i>
          </span>
        ))}
      </div>
    </div>
  )
}

/** Full-width featured title with parallax art and counters. */
export function Spotlight({ onOpen }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const artY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const artScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.12])
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.75, 0.2])

  return (
    <section className="spotlight" ref={ref} id="spotlight">
      <motion.div className="spotlight-art" style={{ y: artY, scale: artScale }}>
        <Poster id="spotlight-aethex" hue={[352, 18]} badge={false} big />
      </motion.div>
      <motion.div className="spotlight-glow" style={{ opacity: glow }} />
      <div className="spotlight-shade" />
      <div className="spotlight-inner">
        <Reveal className="spotlight-copy">
          <div className="hero-series small">
            <span className="hero-series-r">R</span>
            <span style={{ letterSpacing: '4px' }}>{spotlight.eyebrow.toUpperCase()}</span>
          </div>
          <h2>{spotlight.title}</h2>
          <p>{spotlight.summary}</p>
          <div className="hero-actions">
            <a className="btn btn--play" href={spotlight.url} target="_blank" rel="noreferrer">
              <Icon name="play" size={22} /> Visit Live
            </a>
            <button className="btn btn--info" onClick={onOpen}>
              <Icon name="info" size={20} /> Case Study
            </button>
          </div>
        </Reveal>
        <div className="spotlight-stats">
          {spotlight.highlights.map((h, i) => (
            <Reveal key={h.label} delay={0.15 + i * 0.1} className="spotlight-stat">
              <b>
                <CountUp to={h.value} suffix={h.suffix} />
              </b>
              <span>{h.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Section header that slides in from the left with an underline sweep. */
export function SectionTitle({ children, kicker }) {
  return (
    <Reveal className="section-title" y={20}>
      {kicker && <span className="section-kicker">{kicker}</span>}
      <h2>{children}</h2>
      <motion.span
        className="section-rule"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
      />
    </Reveal>
  )
}
