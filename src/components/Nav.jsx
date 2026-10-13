import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import Icon from './Icons.jsx'
import { profile } from '../data.js'

const links = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
]

export function scrollToSection(id) {
  if (id === 'home') return window.scrollTo({ top: 0, behavior: 'smooth' })
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' })
}

export default function Nav() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 160 && !open)
    setSolid(y > 24)
    let cur = 'home'
    for (const l of links) {
      const el = document.getElementById(l.id)
      if (el && el.getBoundingClientRect().top - 120 <= 0) cur = l.id
    }
    setActive(cur)
  })

  const go = (id) => {
    setOpen(false)
    setTimeout(() => scrollToSection(id), 20)
  }

  return (
    <>
      <motion.header
        className={`nav ${solid ? 'nav--solid' : ''}`}
        animate={{ y: hidden ? -90 : 0 }}
        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <button className="nav-brand" onClick={() => go('home')} aria-label="Home">
          <span className="monogram">RS</span>
          <span className="nav-name">Rahul Sangral</span>
        </button>
        <nav className="nav-links">
          {links.map((l) => (
            <button key={l.id} className={active === l.id ? 'is-active' : ''} onClick={() => go(l.id)}>
              {l.label}
            </button>
          ))}
        </nav>
        <div className="nav-cta">
          <a className="btn btn--ghost btn--sm" href={profile.resume} target="_blank" rel="noreferrer">
            <Icon name="download" size={16} /> Resume
          </a>
          <button className="btn btn--primary btn--sm" onClick={() => go('contact')}>
            Hire me
          </button>
          <button className="nav-burger" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div className="nav-sheet" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {links.map((l, i) => (
              <motion.button key={l.id} onClick={() => go(l.id)} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                {l.label}
              </motion.button>
            ))}
            <a className="btn btn--primary" href={profile.resume} target="_blank" rel="noreferrer">
              <Icon name="download" size={16} /> Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
