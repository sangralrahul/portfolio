import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Icon from './Icons.jsx'
import { SplitText } from './Live.jsx'
import { certifications, profile, projects, socials } from '../data.js'
import { scrollToSection } from './Nav.jsx'

const issuers = [...new Map(certifications.map((c) => [c.logo, c.org.split(' ·')[0]])).entries()]

const shipping = projects.filter((p) => p.domain)

export default function Hero() {
  const [hasPhoto, setHasPhoto] = useState(false)
  useEffect(() => {
    const img = new Image()
    img.onload = () => setHasPhoto(true)
    img.src = profile.photo
  }, [])
  const up = (i) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] },
  })

  return (
    <section className="hero" id="home">
      <div className="container hero-inner">
        <motion.div className="hero-text">
          <motion.div className="eyebrow" {...up(0)}>
            <span className="pulse" /> Available for SDE-1 / New Grad 2026 · Remote or on-site
          </motion.div>
          <h1 className="hero-title">
            <SplitText text="Rahul" delay={0.3} stagger={0.05} />
            <br />
            <motion.span className="grad surname" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}>
              Sangral
            </motion.span>
          </h1>
          <motion.p className="hero-role" {...up(2)}>
            Full-Stack Engineer <i>·</i> AI Developer <i>·</i> Founder, AETHEX
          </motion.p>
          <motion.p className="hero-lede" {...up(3)}>
            I build and ship production software end to end. Right now that is AETHEX — a medical workspace for India's doctors, hospitals and medical colleges, with Cadus, a clinical AI, built into every app.
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

        <motion.aside className="hero-visual" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}>
          {hasPhoto && <img src={profile.photo} alt="Rahul Sangral" className="hero-photo" />}
          <div className="ship-card">
            <div className="ship-head">
              <span className="live-dot" /> Shipping now
              <em>{shipping.length} products · live</em>
            </div>
            <ul className="ship-list">
              {shipping.map((p) => (
                <li key={p.id}>
                  <a href={p.links[0].url} target="_blank" rel="noreferrer">
                    <img src={p.logo} alt="" className="ship-logo" />
                    <span className="ship-name"><strong>{p.title}</strong><small>{p.domain}</small></span>
                    <span className="ship-status">{p.status}</span>
                    <Icon name="external" size={14} />
                  </a>
                </li>
              ))}
            </ul>
            <div className="ship-foot"><Icon name="pin" size={14} /> {profile.location} · open to SDE roles and freelance</div>
          </div>
        </motion.aside>
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
