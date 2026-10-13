import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Icon from './Icons.jsx'
import { Avatar } from './ProfileGate.jsx'
import { viewers } from '../data.js'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'top10', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
]

const notifications = [
  { title: 'Now available', body: 'Open to SDE-1 / New Grad 2026 roles and freelance work.', when: 'Today' },
  { title: 'New release: Aethex', body: 'Production SaaS — built end to end as the sole engineer.', when: 'This season' },
  { title: 'Certified', body: 'Oracle Agentic AI Certified Foundations Associate.', when: '2026' },
]

export function scrollToSection(id) {
  if (id === 'home') return window.scrollTo({ top: 0, behavior: 'smooth' })
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
}

export default function Navbar({ viewer, onSwitch, onExit, query, setQuery }) {
  const [solid, setSolid] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menu, setMenu] = useState(null) // 'bell' | 'profile' | 'browse'
  const inputRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus()
  }, [searchOpen])

  const go = (id) => {
    setQuery('')
    setMenu(null)
    setTimeout(() => scrollToSection(id), 30)
  }

  return (
    <header className={`nav ${solid ? 'nav--solid' : ''}`}>
      <div className="nav-left">
        <button className="nav-logo" onClick={() => go('home')} aria-label="Home">
          RAHUL SANGRAL
        </button>
        <nav className="nav-links">
          {links.map((l) => (
            <button key={l.id} onClick={() => go(l.id)}>
              {l.label}
            </button>
          ))}
        </nav>
        <div className="nav-browse" onMouseLeave={() => setMenu(null)}>
          <button onClick={() => setMenu(menu === 'browse' ? null : 'browse')}>
            Browse <Icon name="down" size={14} />
          </button>
          <AnimatePresence>
            {menu === 'browse' && (
              <motion.div className="dropdown dropdown--center" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {links.map((l) => (
                  <button key={l.id} onClick={() => go(l.id)}>
                    {l.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="nav-right">
        <div className={`nav-search ${searchOpen ? 'is-open' : ''}`}>
          <button
            aria-label="Search"
            onClick={() => {
              setSearchOpen((s) => !s)
              if (searchOpen) setQuery('')
            }}
          >
            <Icon name="search" size={20} />
          </button>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Titles, skills, tech"
            onBlur={() => !query && setSearchOpen(false)}
            aria-label="Search portfolio"
          />
          {query && (
            <button aria-label="Clear" className="nav-search-clear" onClick={() => setQuery('')}>
              <Icon name="close" size={16} />
            </button>
          )}
        </div>

        <a className="nav-kids" href="#contact" onClick={(e) => { e.preventDefault(); go('contact') }}>
          Hire me
        </a>

        <div className="nav-menu" onMouseLeave={() => setMenu(null)}>
          <button aria-label="Notifications" className="nav-bell" onMouseEnter={() => setMenu('bell')} onClick={() => setMenu(menu === 'bell' ? null : 'bell')}>
            <Icon name="bell" size={21} />
            <span className="nav-dot">3</span>
          </button>
          <AnimatePresence>
            {menu === 'bell' && (
              <motion.div className="dropdown dropdown--bell" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {notifications.map((n) => (
                  <div key={n.title} className="notif">
                    <span className="notif-art">R</span>
                    <div>
                      <strong>{n.title}</strong>
                      <p>{n.body}</p>
                      <small>{n.when}</small>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="nav-menu" onMouseLeave={() => setMenu(null)}>
          <button className="nav-profile" onMouseEnter={() => setMenu('profile')} onClick={() => setMenu(menu === 'profile' ? null : 'profile')} aria-label="Profiles">
            <Avatar viewer={viewer} size="sm" />
            <Icon name="down" size={14} className={menu === 'profile' ? 'rot' : ''} />
          </button>
          <AnimatePresence>
            {menu === 'profile' && (
              <motion.div className="dropdown dropdown--profile" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {viewers
                  .filter((v) => v.id !== viewer.id)
                  .map((v) => (
                    <button key={v.id} onClick={() => { setMenu(null); onSwitch(v) }}>
                      <Avatar viewer={v} size="sm" /> {v.name}
                    </button>
                  ))}
                <hr />
                <button onClick={onExit}>Manage profiles</button>
                <a href="mailto:rishumvis007@gmail.com">Contact Rahul</a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
