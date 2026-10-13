import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import Icon from './Icons.jsx'
import { SplitText, Typewriter, Tilt } from './Live.jsx'
import Diagram from './Diagram.jsx'
import { CountUp } from './Scroll.jsx'
import { certifications, profile, socials } from '../data.js'
import { scrollToSection } from './Nav.jsx'

const issuers = [...new Map(certifications.map((c) => [c.logo, c.org.split(' ·')[0]])).entries()]

export default function Hero() {
  const [hasPhoto, setHasPhoto] = useState(false)
  useEffect(() => {
    const img = new Image()
    img.onload = () => setHasPhoto(true)
    img.src = profile.photo
  }, [])
  const { scrollY } = useScroll()
  const textY = useTransform(scrollY, [0, 600], [0, 90])
  const textO = useTransform(scrollY, [0, 500], [1, 0])
  const cardY = useTransform(scrollY, [0, 600], [0, 50])
  const up = (i) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] },
  })

  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="hero-orb hero-orb--a" />
        <div className="hero-orb hero-orb--b" />
        <div className="hero-beam" />
      </div>

      <div className="container hero-inner">
        <motion.div className="hero-text" style={{ y: textY, opacity: textO }}>
          <motion.div className="eyebrow" {...up(0)}>
            <span className="pulse" /> Available for SDE-1 / New Grad 2026 · Remote or on-site
          </motion.div>
          <h1 className="hero-title">
            <SplitText text="Rahul" delay={0.3} stagger={0.05} />
            <br />
            <SplitText text="Sangral" delay={0.5} stagger={0.05} className="grad" />
          </h1>
          <motion.p className="hero-role" {...up(2)}>
            <Typewriter phrases={['Full-Stack Engineer', 'AI Developer', 'Founding Engineer @ Aethex', 'Founder @ Zyphix']} speed={60} pause={2200} />
          </motion.p>
          <motion.p className="hero-lede" {...up(3)}>
            I design, build and ship production software end to end — React and TypeScript on the front, FastAPI and PostgreSQL behind it, AI tooling on top. Sole engineer at a live SaaS; founder of my own.
          </motion.p>
          <motion.div className="hero-actions" {...up(4)}>
            <button className="btn btn--primary" onClick={() => scrollToSection('projects')}>
              View my work <Icon name="arrow" size={18} />
            </button>
            <a className="btn btn--ghost" href={profile.resume} target="_blank" rel="noreferrer">
              <Icon name="download" size={18} /> Download resume
            </a>
          </motion.div>
          <motion.div className="hero-socials" {...up(5)}>
            {socials.map((s) => (
              <a key={s.id} href={s.url} target="_blank" rel="noreferrer" title={s.name} aria-label={s.name} className="hero-social">
                <img src={s.logo} alt="" loading="lazy" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="hero-visual" style={{ y: cardY }} initial={{ opacity: 0, x: 40, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: 0.5, duration: 1, ease: [0.2, 0.8, 0.2, 1] }}>
          <Tilt max={5} className="photo-tilt">
            <div className="photo-card glass">
              {hasPhoto ? (
                <img src={profile.photo} alt="Rahul Sangral" className="photo-img" />
              ) : (
                <div className="photo-system">
                  <div className="shot-bar"><span /><span /><span /><em>aethex · live system map</em></div>
                  <Diagram id="aethex" title="Aethex" hero />
                </div>
              )}
              <div className="photo-ring" />
            </div>
          </Tilt>
          <motion.div className="float-chip float-chip--a glass" animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
            <img src="/logos/aethex.webp" alt="" /> <div><small>Currently</small><strong>Founding Engineer · Aethex</strong></div>
          </motion.div>
          <motion.div className="float-chip float-chip--b glass" animate={{ y: [0, 8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
            <b><CountUp to={10} suffix="+" /></b> <div><small>Certifications</small><strong>Oracle · McKinsey · Google</strong></div>
          </motion.div>
          <motion.div className="float-chip float-chip--c glass" animate={{ y: [0, -6, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}>
            <Icon name="pin" size={16} /> <div><small>Based in</small><strong>{profile.location}</strong></div>
          </motion.div>
        </motion.div>
      </div>

      <div className="container logo-bar">
        <span className="logo-bar-label">Certified by</span>
        <div className="logo-bar-track">
          {[...issuers, ...issuers].map(([logo, name], i) => (
            <span key={i} className="logo-bar-item" title={name}>
              <img src={logo} alt={name} loading="lazy" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
