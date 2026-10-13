import { AnimatePresence } from 'framer-motion'
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ProfileGate from './components/ProfileGate.jsx'
import Intro from './components/Intro.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Modal from './components/Modal.jsx'
import Contact, { Footer } from './components/Contact.jsx'
import { CardFace, HoverPreview, Row, metaFor } from './components/Cards.jsx'
import { BackToTop, Marquee, ScrollProgress, Spotlight } from './components/Scroll.jsx'
import { CursorGlow, LiveStatus } from './components/Live.jsx'
import { certifications, education, experience, projects, skills, socials, viewers } from './data.js'

const ROWS = {
  top10: { id: 'top10', title: 'Top 10 Projects Today', kind: 'top10', items: projects },
  experience: { id: 'experience', title: 'Continue Watching · Experience', kind: 'experience', items: experience },
  skills: { id: 'skills', title: 'Tech Stack Collections', kind: 'skill', items: skills },
  certifications: { id: 'certifications', title: 'Award-Winning Certifications', kind: 'cert', items: certifications },
  education: { id: 'education', title: 'Origin Story · Education', kind: 'edu', items: education },
  profiles: { id: 'profiles', title: 'Coding Profiles', kind: 'profile', items: socials },
}

const readLS = (k) => {
  try { return JSON.parse(localStorage.getItem(k)) } catch { return null }
}
const writeLS = (k, v) => {
  try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* ignore */ }
}

export default function App() {
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [stage, setStage] = useState('gate') // gate | intro | browse
  const [viewer, setViewer] = useState(viewers[0])
  const [modal, setModal] = useState(null)
  const [hover, setHover] = useState(null)
  const [query, setQuery] = useState('')
  const [myList, setMyList] = useState(() => readLS('myList') || [])
  const hoverTimer = useRef(null)
  const leaveTimer = useRef(null)

  useEffect(() => writeLS('myList', myList), [myList])

  const toggleList = (id) => setMyList((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]))

  const pick = (v) => {
    setViewer(v)
    setStage(reduceMotion ? 'browse' : 'intro')
  }
  const finishIntro = useCallback(() => {
    setStage('browse')
    window.scrollTo(0, 0)
  }, [])

  const openModal = (item, kind) => {
    clearTimeout(hoverTimer.current)
    setHover(null)
    if (kind === 'profile') return window.open(item.url, '_blank', 'noopener')
    setModal({ item, kind })
  }

  const onHover = (item, kind, el) => {
    clearTimeout(hoverTimer.current)
    clearTimeout(leaveTimer.current)
    hoverTimer.current = setTimeout(() => {
      setHover({ item, kind, rect: el.getBoundingClientRect() })
    }, 450)
  }
  const onLeave = (delayed) => {
    clearTimeout(hoverTimer.current)
    clearTimeout(leaveTimer.current)
    if (delayed) leaveTimer.current = setTimeout(() => setHover(null), 120)
    else setHover(null)
  }
  const keepHover = () => clearTimeout(leaveTimer.current)

  useEffect(() => {
    const close = () => setHover(null)
    window.addEventListener('scroll', close, { passive: true })
    return () => window.removeEventListener('scroll', close)
  }, [])

  const rows = useMemo(() => {
    const ordered = viewer.rows.map((r) => ROWS[r])
    const list = myList
      .map((id) => {
        for (const r of Object.values(ROWS)) {
          const it = r.items.find((x) => x.id === id)
          if (it) return { ...it, _kind: r.kind === 'top10' ? 'project' : r.kind }
        }
        return null
      })
      .filter(Boolean)
    if (list.length) ordered.splice(1, 0, { id: 'mylist', title: 'My List', kind: 'mixed', items: list })
    ordered.splice(2, 0, { id: 'projects-all', title: `Because you picked ${viewer.name} · Projects`, kind: 'project', items: [...projects].reverse() })
    return ordered
  }, [viewer, myList])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return null
    const out = []
    for (const r of Object.values(ROWS)) {
      const kind = r.kind === 'top10' ? 'project' : r.kind
      for (const it of r.items) {
        const m = metaFor(it, kind)
        const hay = [m.title, m.subtitle, m.description, ...(m.tech || []), ...(m.tags || [])].join(' ').toLowerCase()
        if (hay.includes(q)) out.push({ item: it, kind })
      }
    }
    return out
  }, [query])

  return (
    <>
      <AnimatePresence mode="wait">
        {stage === 'gate' && <ProfileGate key="gate" onPick={pick} />}
        {stage === 'intro' && <Intro key="intro" onDone={finishIntro} />}
      </AnimatePresence>

      {stage === 'browse' && (
        <div className="app">
          <ScrollProgress />
          <CursorGlow />
          <LiveStatus />
          <Navbar
            viewer={viewer}
            onSwitch={(v) => { setViewer(v); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            onExit={() => setStage('gate')}
            query={query}
            setQuery={setQuery}
          />

          {results ? (
            <main className="search">
              <p className="search-label">
                {results.length ? <>Explore titles related to: <b>{query}</b></> : <>Your search for “{query}” did not have any matches.</>}
              </p>
              <div className="search-grid">
                {results.map(({ item, kind }) => (
                  <div key={kind + item.id} className="card" role="button" tabIndex={0} onClick={() => openModal(item, kind)}>
                    <CardFace item={item} kind={kind} />
                  </div>
                ))}
              </div>
            </main>
          ) : (
            <>
              <Hero viewer={viewer} onMore={() => setModal({ item: null, kind: 'about' })} onReplay={() => setStage('intro')} />
              <main className="rows">
                {rows.map((row, i) => {
                  const el =
                    row.kind === 'mixed' ? (
                      <MixedRow key={row.id} row={row} index={i} onOpen={openModal} />
                    ) : (
                      <Row key={row.id + viewer.id} row={row} index={i} onOpen={openModal} onHover={onHover} onLeave={onLeave} />
                    )
                  if (i === 1)
                    return (
                      <Fragment key={row.id + '-wrap'}>
                        {el}
                        <Marquee />
                        <Spotlight onOpen={() => openModal(projects[0], 'project')} />
                      </Fragment>
                    )
                  return el
                })}
              </main>
              <Contact />
            </>
          )}
          <Footer />
          <BackToTop />

          <HoverPreview state={hover} onOpen={openModal} onClose={() => onLeave(true)} onKeep={keepHover} myList={myList} toggleList={toggleList} />
          <AnimatePresence>
            {modal && (
              <Modal
                key="modal"
                item={modal.item}
                kind={modal.kind}
                onClose={() => setModal(null)}
                onOpen={openModal}
                myList={myList}
                toggleList={toggleList}
              />
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  )
}

function MixedRow({ row, onOpen }) {
  return (
    <section className="row" id={row.id}>
      <div className="row-head"><h2>{row.title}</h2></div>
      <div className="row-body">
        <div className="row-track">
          {row.items.map((it) => (
            <div key={it.id} className="card" role="button" tabIndex={0} onClick={() => onOpen(it, it._kind)}>
              <CardFace item={it} kind={it._kind} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
