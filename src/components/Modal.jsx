import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Icon from './Icons.jsx'
import Poster from './Poster.jsx'
import { metaFor } from './Cards.jsx'
import { certifications, experience, profile, projects, skills, socials } from '../data.js'

function MoreLikeThis({ items, kind, onOpen }) {
  return (
    <div className="mlt-grid">
      {items.map((it) => {
        const m = metaFor(it, kind)
        return (
          <button key={it.id} className="mlt-card" onClick={() => onOpen(it, kind)}>
            <Poster id={it.id} hue={it.hue} title={m.title} kicker={kind === 'cert' ? it.org : m.rating} />
            <div className="mlt-body">
              <div className="mlt-top">
                <span className="match">{m.match}% Match</span>
                {m.year && <span className="pill">{m.year}</span>}
              </div>
              <p>{m.description}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}

function Episodes({ current, onOpen }) {
  return (
    <div className="episodes">
      {experience.map((e, i) => (
        <button key={e.id} className={`episode ${current?.id === e.id ? 'is-current' : ''}`} onClick={() => onOpen(e, 'experience')}>
          <span className="episode-num">{i + 1}</span>
          <div className="episode-thumb">
            <Poster id={e.id} hue={e.hue} badge={false} />
            <span className="cw-play"><Icon name="play" size={18} /></span>
            <div className="cw-bar"><span style={{ width: `${e.progress}%` }} /></div>
          </div>
          <div className="episode-text">
            <div className="episode-head">
              <strong>{e.title}</strong>
              <span>{e.period}</span>
            </div>
            <em>{e.org}</em>
            <p>{e.description}</p>
          </div>
        </button>
      ))}
    </div>
  )
}

function AboutBody({ onOpen }) {
  return (
    <>
      <div className="about-stats">
        {profile.stats.map((s) => (
          <div key={s.label}>
            <b>{s.value}</b>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
      <h3 className="modal-h3">Episodes · Career</h3>
      <Episodes onOpen={onOpen} />
      <h3 className="modal-h3">Find me on</h3>
      <div className="about-socials">
        {socials.map((s) => (
          <a key={s.id} href={s.url} target="_blank" rel="noreferrer">
            {s.name} <Icon name="external" size={14} />
          </a>
        ))}
      </div>
    </>
  )
}

export default function Modal({ item, kind, onClose, onOpen, myList, toggleList }) {
  const scrollRef = useRef(null)
  const isAbout = kind === 'about'
  const m = isAbout
    ? {
        title: profile.name,
        subtitle: profile.role,
        description: profile.tagline,
        tags: ['Full-Stack', 'AI', 'SaaS'],
        tech: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Firebase', 'AWS', 'Claude API'],
        match: 98,
        year: '2026',
        rating: 'SDE-1',
        links: [{ label: 'Resume', url: profile.resume }],
      }
    : metaFor(item, kind)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [item, kind])

  const inList = item && myList.includes(item.id)
  const primary = m.links?.[0]

  let extra = null
  if (isAbout) extra = <AboutBody onOpen={onOpen} />
  else if (kind === 'project' || kind === 'top10')
    extra = (
      <>
        <h3 className="modal-h3">More Like This</h3>
        <MoreLikeThis items={projects.filter((p) => p.id !== item.id)} kind="project" onOpen={onOpen} />
      </>
    )
  else if (kind === 'experience')
    extra = (
      <>
        <h3 className="modal-h3">Episodes</h3>
        <Episodes current={item} onOpen={onOpen} />
      </>
    )
  else if (kind === 'skill')
    extra = (
      <>
        <h3 className="modal-h3">In this collection</h3>
        <div className="skill-grid">
          {item.items.map((s, i) => (
            <motion.span key={s} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.04 }}>
              {s}
            </motion.span>
          ))}
        </div>
        <h3 className="modal-h3">More Collections</h3>
        <MoreLikeThis items={skills.filter((s) => s.id !== item.id).slice(0, 6)} kind="skill" onOpen={onOpen} />
      </>
    )
  else if (kind === 'cert')
    extra = (
      <>
        <h3 className="modal-h3">More Certifications</h3>
        <MoreLikeThis items={certifications.filter((c) => c.id !== item.id).slice(0, 6)} kind="cert" onOpen={onOpen} />
      </>
    )

  return (
    <motion.div className="modal-overlay" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        className="modal"
        ref={scrollRef}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 60, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.94 }}
        transition={{ duration: 0.38, ease: [0.2, 0.8, 0.2, 1] }}
        role="dialog"
        aria-modal="true"
        aria-label={m.title}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <Icon name="close" size={22} />
        </button>
        <div className="modal-banner">
          {isAbout ? (
            <div className="modal-about-art">
              <Poster id="about-rahul" hue={[355, 270]} badge={false} big />
              <img src={profile.photo} alt="" onError={(e) => (e.currentTarget.style.display = 'none')} />
            </div>
          ) : (
            <Poster id={item.id} hue={item.hue} badge={false} big />
          )}
          <div className="modal-banner-fade" />
          <div className="modal-banner-copy">
            <div className="hero-series small">
              <span className="hero-series-r">R</span>
              <span>{isAbout ? 'S E R I E S' : (kind === 'experience' ? 'E P I S O D E' : 'O R I G I N A L')}</span>
            </div>
            <motion.h2 key={m.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              {m.title}
            </motion.h2>
            <div className="modal-actions">
              {primary ? (
                <a className="btn btn--play" href={primary.url} target="_blank" rel="noreferrer">
                  <Icon name="play" size={22} /> {primary.label}
                </a>
              ) : (
                <a className="btn btn--play" href={`mailto:${profile.email}?subject=${encodeURIComponent('Re: ' + m.title)}`}>
                  <Icon name="play" size={22} /> Ask about this
                </a>
              )}
              {m.links?.slice(1).map((l) => (
                <a key={l.url} className="btn btn--info" href={l.url} target="_blank" rel="noreferrer">
                  {l.label} <Icon name="external" size={16} />
                </a>
              ))}
              {!isAbout && (
                <button className="circle circle--lg" onClick={() => toggleList(item.id)} aria-label="My List">
                  <Icon name={inList ? 'check' : 'plus'} size={20} />
                </button>
              )}
              <button className="circle circle--lg" aria-label="Like">
                <Icon name="thumb" size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-cols">
            <div>
              <div className="preview-meta big">
                <span className="match">{m.match}% Match</span>
                {m.year && <span>{m.year}</span>}
                {m.rating && <span className="pill">{m.rating}</span>}
                <span className="pill pill--hd">HD</span>
              </div>
              {m.subtitle && <p className="modal-sub">{m.subtitle}</p>}
              <p className="modal-desc">{m.description}</p>
            </div>
            <div className="modal-side">
              {m.tech && (
                <p>
                  <span>Tech: </span>
                  {m.tech.join(', ')}
                </p>
              )}
              {m.tags && (
                <p>
                  <span>Genres: </span>
                  {m.tags.join(', ')}
                </p>
              )}
              <p>
                <span>This title is: </span>Production-ready, Scalable, Shipped
              </p>
            </div>
          </div>
          {extra}
          <div className="modal-about">
            <h3>
              About <b>{m.title}</b>
            </h3>
            <p><span>Creator: </span>{profile.name}</p>
            <p><span>Role: </span>{profile.role}</p>
            <p><span>Based in: </span>{profile.location}</p>
            <p><span>Contact: </span><a href={`mailto:${profile.email}`}>{profile.email}</a></p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
