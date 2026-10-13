import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Icon from './Icons.jsx'
import Poster from './Poster.jsx'

// Normalises any item into the fields the hover card + modal need.
export function metaFor(item, kind) {
  switch (kind) {
    case 'project':
    case 'top10':
      return {
        title: item.title,
        subtitle: item.kicker,
        description: item.description,
        tags: item.genres,
        tech: item.tech,
        match: item.match,
        year: item.year,
        rating: item.rating,
        links: item.links,
      }
    case 'experience':
      return {
        title: item.title,
        subtitle: `${item.org} · ${item.place}`,
        description: item.description,
        tags: [item.period, item.place],
        tech: item.tech,
        match: 96,
        year: item.period,
        rating: item.progress >= 100 ? 'DONE' : 'ON AIR',
      }
    case 'skill':
      return {
        title: item.title,
        subtitle: `${item.items.length} skills in this collection`,
        description: item.items.join(' · '),
        tags: item.items.slice(0, 3),
        tech: item.items,
        match: 95,
        rating: 'SKILL',
      }
    case 'cert':
      return {
        title: item.title,
        subtitle: item.org,
        description: `${item.title} — issued by ${item.org}${item.year ? ` (${item.year})` : ''}.`,
        tags: [item.org, item.year || 'Certified'].filter(Boolean),
        match: 93,
        year: item.year,
        rating: 'CERT',
      }
    case 'edu':
      return {
        title: item.title,
        subtitle: `${item.org} · ${item.place}`,
        description: item.description,
        tags: [item.period, item.place].filter(Boolean),
        match: 90,
        year: item.period,
        rating: 'EDU',
      }
    case 'profile':
      return {
        title: item.name,
        subtitle: item.handle,
        description: `Find Rahul on ${item.name} — ${item.handle}.`,
        tags: ['Coding', 'Profile'],
        match: 99,
        rating: 'LINK',
        links: [{ label: `Open ${item.name}`, url: item.url }],
      }
    default:
      return { title: item.title }
  }
}

export function CardFace({ item, kind }) {
  if (kind === 'top10') {
    return (
      <div className="top10-card">
        <span className="top10-num">{item._rank}</span>
        <Poster id={item.id} hue={item.hue} title={item.title} kicker={item.rating} tall />
      </div>
    )
  }
  if (kind === 'experience') {
    return (
      <div className="cw-card">
        <Poster id={item.id} hue={item.hue} title={item.org.split(' (')[0]} kicker={item.title}>
          <span className="cw-play"><Icon name="play" size={20} /></span>
        </Poster>
        <div className="cw-bar"><span style={{ width: `${item.progress}%` }} /></div>
        <div className="cw-meta">{item.period}</div>
      </div>
    )
  }
  if (kind === 'skill') {
    return (
      <Poster id={item.id} hue={item.hue} title={item.title} kicker={`${item.items.length} titles`}>
        <div className="skill-chips">
          {item.items.slice(0, 3).map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </Poster>
    )
  }
  if (kind === 'cert') {
    return <Poster id={item.id} hue={item.hue} title={item.org.split(' ·')[0]} kicker={item.title} />
  }
  if (kind === 'edu') {
    return <Poster id={item.id} hue={item.hue} title={item.org} kicker={item.title} />
  }
  if (kind === 'profile') {
    return <Poster id={item.id} hue={item.hue} title={item.name} kicker={item.handle} />
  }
  return <Poster id={item.id} hue={item.hue} title={item.title} kicker={item.kicker} />
}

const isTouch = () => typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

export function Row({ row, onOpen, onHover, onLeave, index }) {
  const trackRef = useRef(null)
  const [page, setPage] = useState(0)
  const [pages, setPages] = useState(1)
  const [moved, setMoved] = useState(false)

  useEffect(() => {
    const el = trackRef.current
    const calc = () => {
      setPages(Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth - 0.05)))
      setPage(Math.round(el.scrollLeft / el.clientWidth))
    }
    calc()
    el.addEventListener('scroll', calc, { passive: true })
    window.addEventListener('resize', calc)
    return () => {
      el.removeEventListener('scroll', calc)
      window.removeEventListener('resize', calc)
    }
  }, [row.items.length])

  const slide = (dir) => {
    const el = trackRef.current
    setMoved(true)
    onLeave?.()
    el.scrollBy({ left: dir * el.clientWidth * 0.92, behavior: 'smooth' })
  }

  return (
    <motion.section
      className={`row row--${row.kind}`}
      id={row.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: Math.min(index, 2) * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="row-head">
        <h2>
          {row.title}
          <span className="row-explore">
            Explore All <Icon name="right" size={14} />
          </span>
        </h2>
        {pages > 1 && (
          <div className="row-pages">
            {Array.from({ length: pages }).map((_, i) => (
              <span key={i} className={i === page ? 'on' : ''} />
            ))}
          </div>
        )}
      </div>
      <div className="row-body">
        {moved && page > 0 && (
          <button className="row-arrow row-arrow--left" onClick={() => slide(-1)} aria-label="Previous">
            <Icon name="left" size={34} />
          </button>
        )}
        <div className="row-track" ref={trackRef}>
          {row.items.map((item, i) => (
            <div
              key={item.id}
              className="card"
              tabIndex={0}
              role="button"
              aria-label={metaFor(item, row.kind).title}
              onMouseEnter={(e) => !isTouch() && onHover?.(item, row.kind, e.currentTarget)}
              onMouseLeave={() => onLeave?.(true)}
              onClick={() => onOpen(item, row.kind)}
              onKeyDown={(e) => e.key === 'Enter' && onOpen(item, row.kind)}
            >
              <CardFace item={{ ...item, _rank: i + 1 }} kind={row.kind} />
            </div>
          ))}
        </div>
        {page < pages - 1 && (
          <button className="row-arrow row-arrow--right" onClick={() => slide(1)} aria-label="Next">
            <Icon name="right" size={34} />
          </button>
        )}
      </div>
    </motion.section>
  )
}

// The floating "jaw-bone" preview that pops out of a card on hover.
export function HoverPreview({ state, onOpen, onClose, onKeep, myList, toggleList }) {
  return (
    <AnimatePresence>
      {state && <PreviewInner key={state.item.id + state.kind} {...{ state, onOpen, onClose, onKeep, myList, toggleList }} />}
    </AnimatePresence>
  )
}

function PreviewInner({ state, onOpen, onClose, onKeep, myList, toggleList }) {
  const { item, kind, rect } = state
  const m = metaFor(item, kind)
  const scale = 1.42
  const baseW = kind === 'top10' ? Math.max(rect.width * 1.05, 300) : rect.width
  const w = Math.min(baseW * scale, 420, window.innerWidth - 24)
  let left = rect.left + rect.width / 2 - w / 2
  left = Math.max(12, Math.min(left, window.innerWidth - w - 12))
  const top = rect.top + window.scrollY - 40
  const origin = rect.left < 80 ? 'left' : rect.right > window.innerWidth - 80 ? 'right' : 'center'
  const inList = myList.includes(item.id)
  const primaryLink = m.links?.[0]

  return (
    <motion.div
      className="preview"
      style={{ left, top, width: w, transformOrigin: `${origin} 30%` }}
      initial={{ opacity: 0, scale: 0.72, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.18 } }}
      transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
      onMouseEnter={onKeep}
      onMouseLeave={onClose}
    >
      <div className="preview-art" onClick={() => onOpen(item, kind)}>
        <CardFace item={{ ...item, _rank: '' }} kind={kind === 'top10' ? 'project' : kind} />
      </div>
      <div className="preview-body">
        <div className="preview-actions">
          {primaryLink ? (
            <a className="circle circle--white" href={primaryLink.url} target="_blank" rel="noreferrer" aria-label={primaryLink.label}>
              <Icon name="play" size={18} />
            </a>
          ) : (
            <button className="circle circle--white" onClick={() => onOpen(item, kind)} aria-label="Open">
              <Icon name="play" size={18} />
            </button>
          )}
          <button className="circle" onClick={() => toggleList(item.id)} aria-label="My List" title={inList ? 'Remove from My List' : 'Add to My List'}>
            <Icon name={inList ? 'check' : 'plus'} size={18} />
          </button>
          <button className="circle" aria-label="Like" title="I like this">
            <Icon name="thumb" size={16} />
          </button>
          <button className="circle circle--push" onClick={() => onOpen(item, kind)} aria-label="More info" title="Episodes & info">
            <Icon name="down" size={18} />
          </button>
        </div>
        <div className="preview-meta">
          <span className="match">{m.match}% Match</span>
          {m.rating && <span className="pill">{m.rating}</span>}
          {m.year && <span>{m.year}</span>}
          <span className="pill pill--hd">HD</span>
        </div>
        <div className="preview-title">{m.title}</div>
        <ul className="preview-tags">
          {(m.tags || []).slice(0, 3).map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
