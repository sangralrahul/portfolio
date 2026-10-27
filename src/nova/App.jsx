import { useEffect, useRef, useState } from 'react'
import { useLiveStats } from '../site/live.js'
import { caseStudies, certifications, experience, profile } from '../data.js'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/700.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource-variable/inter'
import './nova.css'

/* ─────────────────────────────────────────────────────────────
   "Nova" — original design. Colour cues taken from the GitHub
   profile (navy, sky, teal, amber); layout and motion are new.
   Motion rules: transform/opacity only, loops pause off screen,
   everything respects prefers-reduced-motion.
   ───────────────────────────────────────────────────────────── */

const MAILTO = `mailto:${profile.email}?subject=${encodeURIComponent('Hello Rahul — opportunity')}`
const NAV = [['about', 'About'], ['aethex', 'AETHEX'], ['work', 'Work'], ['journey', 'Journey'], ['skills', 'Skills'], ['contact', 'Contact']]
const go = (id) => (e) => { e?.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const fine = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

const ROLES = ['clinical AI', 'hospital software', 'desktop apps', 'fast APIs', 'data pipelines']
const ORBIT_IN = ['React', 'FastAPI', 'Python', 'TypeScript']
const ORBIT_OUT = ['PostgreSQL', 'Claude API', 'Docker', 'Next.js', 'AWS', 'RAG']

const STATS = [
  { n: 3, s: '+', l: 'Years building software', p: 0.75 },
  { n: 5, s: '', l: 'Products shipped in AETHEX', p: 0.9 },
  { n: 11, s: '', l: 'Industry certifications', p: 0.85 },
  { n: 60, s: '%', l: 'Less manual analysis (AI Insights)', p: 0.6 },
]

const PRODUCTS = [
  { icon: '/gh/globe-a.svg', name: 'aethex.in', who: 'Web platform', what: 'Store, study hub and Cadus in the browser.', tag: 'Live', url: 'https://aethex.in/' },
  { icon: '/gh/aethex-a.svg', name: 'AETHEX PC', who: 'Doctors & students', what: 'Cadus, an offline medical library and My Clinic.', tag: 'v0.1.70', url: 'https://hms.aethex.in/' },
  { icon: '/gh/aethex-a.svg', name: 'AETHEX HC', who: 'Hospitals & clinics', what: 'OPD to discharge: wards, lab, pharmacy, billing.', tag: '30+ modules', url: 'https://hms.aethex.in/' },
  { icon: '/gh/aethex-a.svg', name: 'AETHEX MC', who: 'Medical colleges', what: 'Timetable, attendance, CBME logbook, exams.', tag: '25+ modules', url: 'https://hms.aethex.in/' },
  { icon: '/gh/desktop-a.svg', name: 'Cadus Desktop', who: 'Windows & Linux', what: 'Shortcut from any app, tray, auto-update.', tag: 'v1.0.2', url: 'https://downloads.aethex.in/' },
]

const CADUS = [
  ['shield', 'Privacy guard', 'Hides patient identifiers before anything leaves the device.'],
  ['check', 'Safety review', 'Every clinical answer is checked for doses and red flags.'],
  ['search', 'Deep Dive', 'Plans the question, searches PubMed step by step, writes a cited report.'],
  ['pill', 'Rx Safety Check', 'Typed, photographed or PDF scripts: doses, interactions, allergies.'],
  ['chat', 'Consult Translator', 'Two-way doctor–patient interpreting in 13 Indian languages.'],
  ['crew', 'Cadus Crew', '20 ready-made assistants or your own, with knowledge files and @mentions.'],
]

const WORK = [
  { name: 'Zyphix', kind: 'Products', tag: 'Live', what: 'Hyperlocal commerce for India: groceries, food and pharmacy from trusted neighbourhood businesses.', stack: ['React', 'TypeScript', 'Python', 'SQL'], url: 'https://zyphix.in/' },
  { name: 'Sentinel-Z', kind: 'Hackathons', tag: 'IBM Z Datathon 2026', what: 'Privacy-preserving fraud detection for banking security logs. Pseudonymised, explainable, runs on IBM Z.', stack: ['Node.js', 'zero deps', 's390x'], url: 'https://github.com/sangralrahul/sentinel-z' },
  { name: 'SQLFixEnv', kind: 'Hackathons', tag: 'Meta × PyTorch', what: 'OpenEnv environment where agents repair broken SQL against a real SQLite database, with graded rewards.', stack: ['Python', 'OpenEnv', 'Docker'], url: 'https://github.com/sangralrahul/SQLFixEnv' },
  { name: 'CodeDebugEnv', kind: 'Hackathons', tag: 'Meta × PyTorch', what: 'OpenEnv environment where agents fix real-world buggy Python code and are scored on the repair.', stack: ['Python', 'OpenEnv', 'Docker'], url: 'https://github.com/sangralrahul/CodeDebugEnv' },
  { name: 'Weather Explorer', kind: 'Backend', tag: 'InRisk Labs case study', what: 'Open-Meteo history archived as raw JSON in Google Cloud Storage, served by FastAPI, shown in Next.js.', stack: ['FastAPI', 'GCS', 'Next.js'], url: 'https://github.com/sangralrahul/inrisk-weather-explorer' },
  { name: 'Attendance API', kind: 'Backend', tag: 'Backend', what: 'Punch-in / punch-out with IST business rules, audited corrections and MongoDB aggregation analytics.', stack: ['FastAPI', 'MongoDB', 'pytest'], url: 'https://github.com/sangralrahul/employee-attendance-api' },
  { name: 'Daylit', kind: 'Products', tag: 'Live', what: 'A one-minute daily English habit: streaks, badges and a weekly league, built for modest phones.', stack: ['JavaScript', 'no build step'], url: 'https://daylit5.vercel.app/' },
  { name: 'CivicPulse Agent', kind: 'Hackathons', tag: 'All Things Agentic', what: 'Classifies civic complaints, routes them to the right department and tracks each one to resolution.', stack: ['TypeScript', 'AI routing'], url: 'https://github.com/sangralrahul/CIVICPULSEAGENT' },
]
const FILTERS = ['All', 'Products', 'Hackathons', 'Backend']

const SKILLS = [
  ['Languages', ['Python', 'TypeScript', 'JavaScript', 'SQL']],
  ['Frontend', ['React', 'Next.js', 'Tailwind CSS', 'Vite']],
  ['Backend', ['FastAPI', 'Node.js', 'REST APIs', 'Firebase Auth']],
  ['AI', ['Claude API', 'Amazon Bedrock', 'Vertex AI', 'RAG', 'Hugging Face']],
  ['Data', ['PostgreSQL', 'MySQL', 'MongoDB', 'Firestore', 'Pandas', 'scikit-learn']],
  ['Cloud & DevOps', ['AWS', 'Google Cloud', 'Azure', 'Vercel', 'Cloudflare', 'Docker', 'GitHub Actions']],
]
const DEPTH = [['Python / FastAPI', 94], ['TypeScript / React', 90], ['LLM apps / RAG', 88], ['PostgreSQL / SQL', 86], ['Data / BI', 84], ['Cloud / CI/CD', 80]]
const MARQUEE_A = ['Python', 'TypeScript', 'React', 'Next.js', 'FastAPI', 'PostgreSQL', 'Node.js', 'Tailwind', 'Claude API', 'Docker']
const MARQUEE_B = ['Amazon Bedrock', 'Vertex AI', 'Hugging Face', 'RAG', 'Pandas', 'AWS', 'Google Cloud', 'Vercel', 'Cloudflare', 'GitHub Actions']

const CERT_LOGO = { Oracle: '/gh/oracle-original.svg', 'McKinsey & Company': '/logos/mckinsey.webp', Anthropic: '/gh/anthropic.svg', Google: '/gh/google-original.svg', Microsoft: '/logos/microsoft.webp', Cisco: '/gh/cisco.svg', 'JPMorgan Chase': '/logos/jpmorgan.webp' }

const PROFILES = [
  { name: 'GitHub', handle: 'sangralrahul', icon: '/gh/github.svg', url: 'https://github.com/sangralrahul', key: 'github' },
  { name: 'LeetCode', handle: 'rahulsangral', icon: '/gh/leetcode.svg', url: 'https://leetcode.com/u/rahulsangral/', key: 'leetcode' },
  { name: 'HackerRank', handle: 'rahulsangral', icon: '/gh/hackerrank.svg', url: 'https://www.hackerrank.com/profile/rahulsangral' },
  { name: 'GeeksforGeeks', handle: 'rahulsangral', icon: '/gh/geeksforgeeks.svg', url: 'https://www.geeksforgeeks.org/user/rahulsangral/' },
  { name: 'Hugging Face', handle: 'sangralrahul', icon: '/gh/huggingface.svg', url: 'https://huggingface.co/sangralrahul' },
  { name: 'LinkedIn', handle: 'in/rahulsangral', icon: '/gh/linkedin-original.svg', url: 'https://www.linkedin.com/in/rahulsangral/' },
]

/* ── motion hooks ───────────────────────────────────────────── */

/** [data-r] → .in once (reveal). [data-live] → .on while visible (loops run only then). */
function useMotion() {
  useEffect(() => {
    const rs = document.querySelectorAll('[data-r]')
    const ls = document.querySelectorAll('[data-live]')
    if (reduced() || !('IntersectionObserver' in window)) { rs.forEach((e) => e.classList.add('in')); ls.forEach((e) => e.classList.add('on')); return }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { rootMargin: '0px 0px -10% 0px' })
    const lo = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle('on', e.isIntersecting)))
    rs.forEach((e) => io.observe(e))
    ls.forEach((e) => lo.observe(e))
    return () => { io.disconnect(); lo.disconnect() }
  }, [])
}

/** One passive scroll listener (rAF-throttled) writes --sp (page progress) and the timeline fill. */
function useScrollVars() {
  useEffect(() => {
    const root = document.documentElement
    let tick = false, bar = null
    const run = () => {
      tick = false
      const max = root.scrollHeight - innerHeight
      if (!bar) bar = document.querySelector('.progress')
      if (bar) bar.style.transform = `scaleX(${max > 0 ? (scrollY / max).toFixed(4) : 0})`
      const tl = document.querySelector('.tl')
      if (tl) {
        const r = tl.getBoundingClientRect()
        const k = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height))
        tl.style.setProperty('--fill', k.toFixed(4))
      }
    }
    const on = () => { if (!tick) { tick = true; requestAnimationFrame(run) } }
    run()
    addEventListener('scroll', on, { passive: true })
    addEventListener('resize', on)
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on) }
  }, [])
}

/** Soft light that follows the pointer (desktop only). */
function CursorGlow() {
  const ref = useRef(null)
  useEffect(() => {
    if (!fine() || reduced()) return
    const el = ref.current
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, raf = 0
    const loop = () => {
      cx += (x - cx) * 0.14; cy += (y - cy) * 0.14
      el.style.transform = `translate3d(${cx - 250}px, ${cy - 250}px, 0)`
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.5 ? requestAnimationFrame(loop) : 0
    }
    const mv = (e) => { x = e.clientX; y = e.clientY; el.style.opacity = 1; if (!raf) raf = requestAnimationFrame(loop) }
    addEventListener('pointermove', mv, { passive: true })
    return () => { removeEventListener('pointermove', mv); cancelAnimationFrame(raf) }
  }, [])
  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}

/** Elements pulled slightly toward the pointer. */
function useMagnet() {
  useEffect(() => {
    if (!fine() || reduced()) return
    const els = [...document.querySelectorAll('.magnet')]
    const offs = els.map((el) => {
      const mv = (e) => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)` }
      const lv = () => { el.style.transform = '' }
      el.addEventListener('pointermove', mv); el.addEventListener('pointerleave', lv)
      return () => { el.removeEventListener('pointermove', mv); el.removeEventListener('pointerleave', lv) }
    })
    return () => offs.forEach((f) => f())
  }, [])
}

/** Spotlight + optional 3D tilt for cards: sets --mx/--my (and rotation) on pointer move. */
function spot(tilt = false) {
  return {
    onPointerMove: (e) => {
      if (!fine()) return
      const el = e.currentTarget, r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height
      el.style.setProperty('--mx', `${px * 100}%`); el.style.setProperty('--my', `${py * 100}%`)
      if (tilt && !reduced()) el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 7}deg) rotateY(${(px - 0.5) * 9}deg) translateY(-4px)`
    },
    onPointerLeave: (e) => { e.currentTarget.style.transform = '' },
  }
}

function useClock() {
  const f = () => new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' })
  const [t, setT] = useState(f)
  useEffect(() => { const id = setInterval(() => setT(f()), 30000); return () => clearInterval(id) }, [])
  return t
}

function Count({ to, suffix = '' }) {
  const ref = useRef(null)
  const [v, setV] = useState(0)
  useEffect(() => {
    if (reduced()) { setV(to); return }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (t) => { const k = Math.min(1, (t - t0) / 1400); setV(Math.round(to * (1 - Math.pow(1 - k, 4)))); if (k < 1) requestAnimationFrame(tick) }
      requestAnimationFrame(tick)
    })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [to])
  return <span ref={ref}>{v}{suffix}</span>
}

/* ── small pieces ───────────────────────────────────────────── */

const Split = ({ text, base = 0, step = 38 }) => (
  <span className="split" aria-label={text}>
    {[...text].map((ch, i, a) => <span key={i} aria-hidden="true" style={{ '--d': `${base + i * step}ms`, '--i': i, '--n': a.length }}>{ch === ' ' ? ' ' : ch}</span>)}
  </span>
)

function Title({ k, title, sub }) {
  return (
    <header className="sec-head">
      <span className="kicker" data-r="up"><i />{k}</span>
      <h2 data-r="up" style={{ '--d': '80ms' }}>{title}</h2>
      {sub && <p data-r="up" style={{ '--d': '160ms' }}>{sub}</p>}
    </header>
  )
}

const ICONS = {
  shield: <path d="M12 3l7 3v6c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3z M9 12l2 2 4-4" />,
  check: <path d="M4 12a8 8 0 1 0 16 0 8 8 0 1 0-16 0 M8.5 12.5l2.3 2.3 4.7-5" />,
  search: <path d="M5 11a6 6 0 1 0 12 0 6 6 0 1 0-12 0 M15.5 15.5L20 20" />,
  pill: <path d="M10.5 3.5a5 5 0 0 1 7 7l-7 7a5 5 0 0 1-7-7z M7 7l7 7" />,
  chat: <path d="M4 5h16v11H9l-5 4z M8 9.5h8 M8 12.5h5" />,
  crew: <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6 M17 11a2.5 2.5 0 1 0 0-5 M18 14c2 .6 3 2.6 3 5" />,
}
const Ico = ({ name }) => <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">{ICONS[name]}</svg>

/* ── sections ───────────────────────────────────────────────── */

function Nav() {
  const [solid, setSolid] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  useEffect(() => {
    let tick = false
    const on = () => { if (tick) return; tick = true; requestAnimationFrame(() => { setSolid(scrollY > 30); tick = false }) }
    on(); addEventListener('scroll', on, { passive: true })
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    NAV.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el) })
    return () => { removeEventListener('scroll', on); io.disconnect() }
  }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])
  const pick = (id) => (e) => { setOpen(false); go(id)(e) }
  return (
    <>
      <div className="progress" aria-hidden="true" />
      <header className={`nav ${solid ? 'solid' : ''}`}>
        <a href="#top" onClick={pick('top')} className="logo" aria-label="Rahul Sangral, home">
          <span className="logo-mark"><b>R</b><i /></span><span className="logo-txt">Rahul Sangral</span>
        </a>
        <nav className="links" aria-label="Sections">
          {NAV.map(([id, l]) => <a key={id} href={`#${id}`} onClick={pick(id)} className={active === id ? 'act' : ''}>{l}</a>)}
        </nav>
        <a className="btn btn-pri btn-sm hire" href={MAILTO}><span>Hire me</span></a>
        <button className={`burger ${open ? 'x' : ''}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><i /><i /></button>
      </header>
      <div className={`sheet ${open ? 'open' : ''}`} aria-hidden={!open}>
        {NAV.map(([id, l], k) => <a key={id} href={`#${id}`} onClick={pick(id)} style={{ '--d': `${80 + k * 60}ms` }}><small>0{k + 1}</small>{l}</a>)}
        <a className="btn btn-pri" href={MAILTO} style={{ '--d': '480ms' }}>Email me</a>
      </div>
    </>
  )
}

function Hero() {
  const time = useClock()
  return (
    <section className="hero" id="top" data-live>
      <div className="aurora" aria-hidden="true"><i className="loop" /><i className="loop" /><i className="loop" /></div>
      <div className="floor" aria-hidden="true"><div className="floor-grid loop" /></div>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="status" data-r="up"><i className="ping loop" />Open to SDE roles &amp; freelance</span>
          <h1 className="name"><Split text="Rahul" base={150} /><br /><Split text="Sangral" base={350} /></h1>
          <p className="roles" data-r="up" style={{ '--d': '700ms' }}>
            Full-stack &amp; AI developer. I build
            <span className="rot" aria-live="off"><span className="rot-track loop">{[...ROLES, ROLES[0]].map((r, i) => <b key={i}>{r}</b>)}</span></span>
          </p>
          <p className="lede" data-r="up" style={{ '--d': '820ms' }}>
            Founding software engineer at Clavix Technologies, building AETHEX — software and the Cadus clinical AI for India&apos;s doctors, hospitals and medical colleges.
          </p>
          <div className="cta" data-r="up" style={{ '--d': '940ms' }}>
            <a className="btn btn-pri magnet" href="#work" onClick={go('work')}><span>See my work</span><b aria-hidden="true">→</b></a>
            <a className="btn btn-ghost magnet" href={profile.resume} target="_blank" rel="noreferrer"><span>Résumé</span><b aria-hidden="true">↓</b></a>
          </div>
          <ul className="meta" data-r="up" style={{ '--d': '1060ms' }}>
            <li><i className="dot" />{profile.location} · {time} IST</li>
            <li><a href={MAILTO}>{profile.email}</a></li>
          </ul>
        </div>

        <div className="orbit" data-r="scale" style={{ '--d': '300ms' }} aria-hidden="true">
          <div className="ring ring-1 loop">{ORBIT_IN.map((t, i) => <span key={t} style={{ '--a': `${(360 / ORBIT_IN.length) * i}deg` }}><em className="loop">{t}</em></span>)}</div>
          <div className="ring ring-2 loop">{ORBIT_OUT.map((t, i) => <span key={t} style={{ '--a': `${(360 / ORBIT_OUT.length) * i}deg` }}><em className="loop">{t}</em></span>)}</div>
          <div className="core">
            <span className="core-ring loop" />
            <img src="/brand/avatar.jpg" alt="" width="200" height="200" fetchpriority="high" />
          </div>
          <div className="float f1 loop"><b>Cadus</b><small>cited · safety-reviewed</small></div>
          <div className="float f2 loop"><b>v1.0.2</b><small>Cadus Desktop shipped</small></div>
          <div className="float f3 loop"><i className="dot" /><small>hms.aethex.in · live</small></div>
        </div>
      </div>
      <a href="#about" onClick={go('about')} className="scroll-cue" aria-label="Scroll to about"><span><i className="loop" /></span></a>
    </section>
  )
}

function Marquee() {
  return (
    <div className="marquee" data-live aria-hidden="true">
      <div className="mq-row"><div className="mq-track loop">{[...MARQUEE_A, ...MARQUEE_A].map((t, i) => <span key={i}>{t}</span>)}</div></div>
      <div className="mq-row rev"><div className="mq-track loop">{[...MARQUEE_B, ...MARQUEE_B].map((t, i) => <span key={i}>{t}</span>)}</div></div>
    </div>
  )
}

const STATEMENT = 'I take products from a blank page to a signed installer — API design, data, web and desktop apps, payments and releases — and I care most about software that holds up in a hospital at 3 a.m.'

function About() {
  const words = STATEMENT.split(' ')
  return (
    <section className="sec" id="about">
      <div className="wrap">
        <Title k="About" title="Engineer first. Shipping always." />
        <p className="statement" data-r="words">
          {words.map((w, i) => <span key={i} style={{ '--d': `${i * 28}ms` }}>{w} </span>)}
        </p>
        <div className="stats">
          {STATS.map((s, i) => (
            <div className="stat card" key={s.l} data-r="up" style={{ '--d': `${i * 90}ms`, '--p': s.p }} {...spot()}>
              <svg viewBox="0 0 64 64" className="ring-svg" aria-hidden="true"><circle cx="32" cy="32" r="28" /><circle cx="32" cy="32" r="28" className="arc" /></svg>
              <b><Count to={s.n} suffix={s.s} /></b>
              <span>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Showcase() {
  const shots = caseStudies['aethex-suite'].shots.concat(caseStudies.cadus.shots, caseStudies['cadus-desktop'].shots)
  const [i, setI] = useState(0)
  const [hold, setHold] = useState(false)
  const box = useRef(null)
  useEffect(() => {
    if (hold || reduced()) return
    const id = setInterval(() => { if (box.current?.classList.contains('on')) setI((k) => (k + 1) % shots.length) }, 5200)
    return () => clearInterval(id)
  }, [hold, shots.length])
  const s = shots[i]
  return (
    <div className="show card" ref={box} data-live data-r="up" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
      <div className="show-bar">
        <span className="lights"><i /><i /><i /></span>
        <div className="show-tabs" role="tablist">
          {shots.map((x, k) => (
            <button key={x.src} role="tab" aria-selected={k === i} className={k === i ? 'act' : ''} onClick={() => setI(k)}>
              {x.label.split(' · ')[0].replace('downloads.aethex.in', 'Downloads')}
              {k === i && !hold && <i key={i} className="tab-prog" />}
            </button>
          ))}
        </div>
      </div>
      <div className="show-img" style={{ aspectRatio: `${s.w} / ${s.h}` }}>
        <img key={s.src} src={s.src} srcSet={`${s.src} 1600w, ${s.src.replace('.webp', '@2x.webp')} 3200w`} sizes="(max-width: 1180px) 100vw, 1120px" width={s.w} height={s.h} alt={s.label} loading="lazy" decoding="async" />
      </div>
      <p className="show-cap">{s.label}</p>
    </div>
  )
}

function Aethex() {
  return (
    <section className="sec" id="aethex">
      <div className="wrap">
        <Title k="Flagship · AETHEX" title="One account. Five products. One clinical AI." sub="I'm the sole developer behind aethex.in — the web platform and four desktop apps for Windows and Linux, all sharing one Google sign-in." />
        <div className="prods">
          {PRODUCTS.map((p, i) => (
            <a key={p.name} href={p.url} target="_blank" rel="noreferrer" className="prod card" data-r="up" style={{ '--d': `${i * 80}ms` }} {...spot(true)}>
              <span className="prod-ico"><img src={p.icon} alt="" width="40" height="40" loading="lazy" /></span>
              <b>{p.name}</b>
              <small>{p.who}</small>
              <p>{p.what}</p>
              <em className="chip">{p.tag}</em>
            </a>
          ))}
        </div>
        <Showcase />
        <div className="cadus">
          <div className="cadus-intro" data-r="left">
            <img src="/gh/cadus-a.svg" alt="" width="56" height="56" loading="lazy" className="float-y loop" />
            <span className="kicker"><i />Inside Cadus</span>
            <h3>The clinical AI built into every app.</h3>
            <p>Every answer cited and safety-reviewed. A 15,515-article offline library. Medius 3.1 and Magnus 3.6 models.</p>
            <a className="btn btn-ghost btn-sm" href="https://cadus.aethex.in/" target="_blank" rel="noreferrer"><span>cadus.aethex.in</span><b aria-hidden="true">↗</b></a>
          </div>
          <div className="feats">
            {CADUS.map(([ic, t, d], i) => (
              <div key={t} className="feat card" data-r="up" style={{ '--d': `${i * 70}ms` }} {...spot()}>
                <Ico name={ic} />
                <b>{t}</b>
                <span>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Work() {
  const [f, setF] = useState('All')
  const list = WORK.filter((w) => f === 'All' || w.kind === f)
  return (
    <section className="sec" id="work">
      <div className="wrap">
        <Title k="Selected work" title="Things I've built beyond AETHEX." />
        <div className="filters" role="tablist" data-r="up">
          {FILTERS.map((x) => <button key={x} role="tab" aria-selected={f === x} className={f === x ? 'act' : ''} onClick={() => setF(x)}>{x}<sup>{x === 'All' ? WORK.length : WORK.filter((w) => w.kind === x).length}</sup></button>)}
        </div>
        <div className="works" key={f}>
          {list.map((w, i) => (
            <a key={w.name} href={w.url} target="_blank" rel="noreferrer" className="work card pop" style={{ '--d': `${i * 60}ms` }} {...spot(true)}>
              <span className="work-top"><em className="num">{String(WORK.indexOf(w) + 1).padStart(2, '0')}</em><em className="chip">{w.tag}</em></span>
              <b>{w.name}</b>
              <p>{w.what}</p>
              <span className="work-foot"><span className="tags">{w.stack.map((t) => <i key={t}>{t}</i>)}</span><span className="arrow" aria-hidden="true">↗</span></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Journey() {
  const rows = experience.map((x) => ({ when: x.period.replace('Present', 'now'), title: x.title, org: `${x.org} · ${x.place}`, what: x.description, tech: x.tech || [] }))
  rows.push({ when: '2023 – 2026', title: 'Bachelor of Computer Applications', org: 'Uttaranchal University · Dehradun', what: '', tech: [] })
  return (
    <section className="sec" id="journey">
      <div className="wrap">
        <Title k="Journey" title="Where I've been building." />
        <ol className="tl">
          <span className="tl-line" aria-hidden="true"><i /></span>
          {rows.map((r, k) => (
            <li key={r.title} data-r={k % 2 ? 'right' : 'left'} className={k % 2 ? 'r' : 'l'}>
              <span className="tl-node" aria-hidden="true" />
              <div className="tl-card card" {...spot()}>
                <span className="when">{r.when}</span>
                <b>{r.title}</b>
                <small>{r.org}</small>
                {r.what && <p>{r.what}</p>}
                {r.tech.length > 0 && <span className="tags">{r.tech.map((t) => <i key={t}>{t}</i>)}</span>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section className="sec" id="skills">
      <div className="wrap">
        <Title k="Skills" title="The toolkit." />
        <div className="skills">
          <div className="sk-groups">
            {SKILLS.map(([g, xs], gi) => (
              <div key={g} className="sk card" data-r="up" style={{ '--d': `${gi * 70}ms` }} {...spot()}>
                <span className="sk-h">{g}</span>
                <span className="sk-chips" data-r="pop">{xs.map((x, i) => <i key={x} style={{ '--d': `${200 + i * 50}ms` }}>{x}</i>)}</span>
              </div>
            ))}
          </div>
          <div className="depth card" data-r="right">
            <span className="sk-h">Depth</span>
            {DEPTH.map(([k, v], i) => (
              <div key={k} className="bar" style={{ '--w': v / 100, '--d': `${i * 90}ms` }}>
                <span>{k}</span><em>{v}%</em><i />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Certs() {
  return (
    <section className="sec" id="certs">
      <div className="wrap">
        <Title k="Certifications" title="Verified by the people who make the tools." sub="Anthropic, Oracle, Google, Microsoft, Cisco, McKinsey and JPMorgan Chase — each links to the credential." />
        <div className="certs">
          {certifications.map((c, i) => {
            const org = c.org.split(' ·')[0]
            return (
              <a key={c.id} href={c.url} target="_blank" rel="noreferrer" className="cert card" data-r="up" style={{ '--d': `${(i % 4) * 70}ms` }} {...spot()}>
                <span className="cert-logo"><img src={CERT_LOGO[org] || c.logo} alt="" loading="lazy" /></span>
                <span className="cert-txt"><b>{c.title}</b><small><img src="/gh/verified.svg" alt="" width="13" height="13" />{c.org}{c.year && ` · ${c.year}`}</small></span>
                <span className="shine" aria-hidden="true" />
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Code({ live }) {
  const gh = live.github
  return (
    <section className="sec" id="code">
      <div className="wrap">
        <Title k="Code" title="Live from my profiles." />
        <div className="profiles">
          {PROFILES.map((p, i) => {
            const st = p.key && live[p.key]
            return (
              <a key={p.name} href={p.url} target="_blank" rel="noreferrer" className="pf card" data-r="up" style={{ '--d': `${i * 60}ms` }} {...spot(true)}>
                <img src={p.icon} alt="" width="36" height="36" loading="lazy" />
                <span><b>{p.name}</b><small>{st ? st.map((x) => `${x.v} ${x.l.toLowerCase()}`).join(' · ') : `@${p.handle}`}</small></span>
                <i className="arrow" aria-hidden="true">↗</i>
              </a>
            )
          })}
        </div>
        <div className="snake card" data-r="up">
          <div className="snake-head">
            <span className="kicker"><i />Contributions</span>
            <span className="snake-stats">{(gh || [{ v: 29, l: 'Public repos' }]).map((x) => <span key={x.l}><b><Count to={Number(x.v) || 0} /></b> {x.l.toLowerCase()}</span>)}</span>
          </div>
          <img src="https://raw.githubusercontent.com/sangralrahul/sangralrahul/output/github-snake-dark.svg" alt="GitHub contribution graph being eaten by a snake" loading="lazy" width="880" height="192" />
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard?.writeText(profile.email).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800) }) }
  return (
    <section className="sec contact" id="contact" data-live>
      <div className="aurora small" aria-hidden="true"><i className="loop" /><i className="loop" /></div>
      <div className="wrap">
        <span className="kicker center" data-r="up"><i />Contact</span>
        <h2 className="big"><Split text="Let's build" step={30} /><br /><span className="grad-anim loop"><Split text="something great." base={330} step={30} /></span></h2>
        <p className="contact-sub" data-r="up" style={{ '--d': '300ms' }}>Open to SDE roles and freelance work. I usually reply within a day.</p>
        <div className="contact-cta" data-r="up" style={{ '--d': '420ms' }}>
          <a className="btn btn-pri btn-lg magnet" href={MAILTO}><span>{profile.email}</span><b aria-hidden="true">→</b></a>
          <button className="btn btn-ghost btn-lg magnet" onClick={copy}><span>{copied ? 'Copied ✓' : 'Copy email'}</span></button>
        </div>
      </div>
      <footer className="foot wrap">
        <span>© {new Date().getFullYear()} Rahul Sangral · {profile.location}</span>
        <span className="foot-links">
          <a href="https://github.com/sangralrahul" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/rahulsangral/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="#top" onClick={go('top')}>Back to top ↑</a>
        </span>
      </footer>
    </section>
  )
}

export default function App() {
  const live = useLiveStats()
  useMotion()
  useScrollVars()
  useMagnet()
  return (
    <>
      <a className="skip" href="#about">Skip to content</a>
      <CursorGlow />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Aethex />
        <Work />
        <Journey />
        <Skills />
        <Certs />
        <Code live={live} />
        <Contact />
      </main>
    </>
  )
}
