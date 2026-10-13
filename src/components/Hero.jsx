import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import Icon from './Icons.jsx'
import { SplitText, Typewriter, Tilt } from './Live.jsx'
import { profile, socials } from '../data.js'
import { scrollToSection } from './Nav.jsx'

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
            <Typewriter phrases={['Full-Stack Engineer', 'AI Developer', 'Founding Engineer']} speed={70} pause={2600} />
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
          <Tilt max={3} className="photo-tilt">
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
        </motion.div>
      </div>

      <motion.div className="scroll-cue" style={{ opacity: textO }} aria-hidden="true">
        <span />
      </motion.div>
    </section>
  )
}
