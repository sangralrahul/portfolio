import { useEffect, useRef, useState } from 'react'
import { useLiveStats } from '../site/live.js'
import { caseStudies, certifications, experience, profile } from '../data.js'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/700.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource-variable/inter'
import './github.css'

/* ─────────────────────────────────────────────────────────────
   "GitHub" design — same visual language as github.com/sangralrahul:
   navy panels, sky/teal glow, mono labels, ECG line, live counters.
   Every animation is CSS (transform / opacity / stroke) and only runs
   while its panel is on screen.
   ───────────────────────────────────────────────────────────── */

const MAILTO = `mailto:${profile.email}?subject=${encodeURIComponent('Hello Rahul — opportunity')}`
const NAV = [['aethex', 'AETHEX'], ['work', 'Work'], ['experience', 'Experience'], ['stack', 'Stack'], ['certs', 'Certifications'], ['connect', 'Connect']]
const go = (id) => (e) => { e?.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }

const TERMINAL = [
  'building AETHEX — a medical workspace for India\'s doctors, hospitals and colleges',
  'creator of Cadus — the clinical AI in every AETHEX app, cited & safety-reviewed',
  'shipping AETHEX PC, HC, MC and Cadus Desktop for Windows x64 / ARM64 and Linux',
  'React · TypeScript · FastAPI · PostgreSQL · Claude API — from API design to release',
]

const PROFILE_ROWS = [
  ['Role', 'Full-stack & AI developer'],
  ['Company', 'Clavix Technologies (Aethex)'],
  ['Education', 'BCA, Uttaranchal University'],
  ['Based in', `${profile.location} (remote-friendly)`],
  ['Status', 'open to SDE roles & freelance'],
]

const DEPTH = [
  ['Python / FastAPI', 94], ['TypeScript / React', 90], ['PostgreSQL / SQL', 86],
  ['LLM apps / RAG / Claude API', 88], ['Cloud, CI/CD, Docker', 80], ['Data analysis / BI', 84],
]

const PRODUCTS = [
  { icon: '/gh/globe-a.svg', name: 'aethex.in', who: 'Web platform', what: 'Store, study hub and Cadus in the browser', tag: 'Live', url: 'https://aethex.in/' },
  { icon: '/gh/aethex-a.svg', name: 'AETHEX PC', who: 'Doctors and students', what: 'Cadus, offline library and My Clinic', tag: 'v0.1.70', url: 'https://hms.aethex.in/' },
  { icon: '/gh/aethex-a.svg', name: 'AETHEX HC', who: 'Hospitals and clinics', what: 'OPD to discharge, wards, lab, pharmacy, billing', tag: '30+ modules', url: 'https://hms.aethex.in/' },
  { icon: '/gh/aethex-a.svg', name: 'AETHEX MC', who: 'Medical colleges', what: 'Timetable, attendance, CBME logbook, exams', tag: '25+ modules', url: 'https://hms.aethex.in/' },
  { icon: '/gh/desktop-a.svg', name: 'Cadus Desktop', who: 'Windows and Linux', what: 'Shortcut from any app, tray, auto-update', tag: 'v1.0.2', url: 'https://downloads.aethex.in/' },
]

const CADUS = [
  ['Privacy guard', 'Hides patient identifiers before anything leaves the device.'],
  ['Safety review', 'Every clinical answer is checked for doses and red flags.'],
  ['Deep Dive', 'Plans the question, searches PubMed step by step, writes a cited report.'],
  ['Rx Safety Check', 'Typed, photographed or PDF scripts: doses, interactions, allergies.'],
  ['Consult Translator', 'Two-way doctor–patient interpreting in 13 Indian languages.'],
  ['Cadus Crew', '20 ready-made assistants or your own, with knowledge files and @mentions.'],
]

const WORK = [
  { name: 'Zyphix', tag: 'Live', what: 'Hyperlocal commerce for India: groceries, food and pharmacy from trusted neighbourhood businesses. Built from scratch.', stack: 'React · TypeScript · Python · SQL · CI/CD', url: 'https://zyphix.in/' },
  { name: 'Sentinel-Z', tag: 'IBM Z Datathon 2026', what: 'Privacy-preserving fraud detection for banking security logs. Pseudonymised, explainable, no cloud calls, runs on IBM Z.', stack: 'Node.js · zero deps · s390x', url: 'https://github.com/sangralrahul/sentinel-z' },
  { name: 'SQLFixEnv', tag: 'Meta × PyTorch Hackathon', what: 'OpenEnv environment where agents repair broken SQL queries against a real SQLite database, with graded rewards.', stack: 'Python · OpenEnv · Docker · Hugging Face', url: 'https://github.com/sangralrahul/SQLFixEnv' },
  { name: 'CodeDebugEnv', tag: 'Meta × PyTorch Hackathon', what: 'OpenEnv environment where agents fix real-world buggy Python code and are scored on the repair.', stack: 'Python · OpenEnv · Docker', url: 'https://github.com/sangralrahul/CodeDebugEnv' },
  { name: 'Weather Explorer', tag: 'InRisk Labs case study', what: 'Climate-data pipeline: Open-Meteo history archived as raw JSON in Google Cloud Storage, served by FastAPI, shown in Next.js.', stack: 'FastAPI · GCS · Next.js', url: 'https://github.com/sangralrahul/inrisk-weather-explorer' },
  { name: 'Employee Attendance API', tag: 'Backend', what: 'Punch-in / punch-out service with IST business rules, audited corrections and analytics as MongoDB aggregation pipelines.', stack: 'FastAPI · MongoDB · pytest', url: 'https://github.com/sangralrahul/employee-attendance-api' },
  { name: 'Daylit', tag: 'Live', what: 'A one-minute daily English habit: streaks, points, badges and a weekly league, built for modest phones and mobile data.', stack: 'JavaScript · no build step', url: 'https://daylit5.vercel.app/' },
  { name: 'CivicPulse Agent', tag: 'All Things Agentic Hackathon', what: 'Civic-issue reporting: classifies complaints, routes them to the right department and tracks each one to resolution.', stack: 'TypeScript · AI routing', url: 'https://github.com/sangralrahul/CIVICPULSEAGENT' },
]

const TICKER = ['Python', 'TypeScript', 'React', 'Next.js', 'FastAPI', 'PostgreSQL', 'Firestore', 'Node.js', 'Tailwind', 'Claude API', 'Amazon Bedrock', 'Vertex AI', 'Hugging Face', 'RAG', 'scikit-learn', 'Pandas', 'AWS', 'Google Cloud', 'Azure', 'Vercel', 'Railway', 'Cloudflare', 'Docker', 'GitHub Actions', 'Razorpay', 'Postman', 'pytest']

const STACK = [
  ['Languages', 'Python · TypeScript · JavaScript · SQL'],
  ['Frontend', 'React · Next.js · Tailwind CSS'],
  ['Backend', 'FastAPI · Node.js · REST APIs · Firebase Auth'],
  ['AI', 'Claude API · Amazon Bedrock · Vertex AI · RAG · Hugging Face'],
  ['Data', 'PostgreSQL · MySQL · MongoDB · Firestore · Pandas · scikit-learn'],
  ['Cloud & DevOps', 'AWS · Google Cloud · Azure · Vercel · Cloudflare · Docker · GitHub Actions'],
]

const CERT_LOGO = { Oracle: '/gh/oracle-original.svg', 'McKinsey & Company': '/logos/mckinsey.webp', Anthropic: '/gh/anthropic.svg', Google: '/gh/google-original.svg', Microsoft: '/logos/microsoft.webp', Cisco: '/gh/cisco.svg', 'JPMorgan Chase': '/logos/jpmorgan.webp' }

const PROFILES = [
  { name: 'GitHub', handle: 'sangralrahul', icon: '/gh/github.svg', url: 'https://github.com/sangralrahul', key: 'github' },
  { name: 'LeetCode', handle: 'rahulsangral', icon: '/gh/leetcode.svg', url: 'https://leetcode.com/u/rahulsangral/', key: 'leetcode' },
  { name: 'HackerRank', handle: 'rahulsangral', icon: '/gh/hackerrank.svg', url: 'https://www.hackerrank.com/profile/rahulsangral' },
  { name: 'GeeksforGeeks', handle: 'rahulsangral', icon: '/gh/geeksforgeeks.svg', url: 'https://www.geeksforgeeks.org/user/rahulsangral/' },
  { name: 'Hugging Face', handle: 'sangralrahul', icon: '/gh/huggingface.svg', url: 'https://huggingface.co/sangralrahul' },
  { name: 'LinkedIn', handle: 'in/rahulsangral', icon: '/gh/linkedin-original.svg', url: 'https://www.linkedin.com/in/rahulsangral/' },
]

/* ── hooks ─────────────────────────────────────────────────── */
/** Adds .on to [data-live] panels while they are on screen: starts their animations, and pauses them off screen. */
function useLivePanels() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-live]')
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      e.target.classList.toggle('on', e.isIntersecting)
      if (e.isIntersecting) e.target.classList.add('seen')
    }), { rootMargin: '0px 0px -6% 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useClock() {
  const f = () => new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' })
  const [t, setT] = useState(f)
  useEffect(() => { const id = setInterval(() => setT(f()), 30000); return () => clearInterval(id) }, [])
  return t
}

/** Types the terminal lines once, when the hero is visible. */
function useTyped(lines) {
  const [out, setOut] = useState(lines.map(() => ''))
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setOut(lines); return }
    let li = 0, ci = 0, id
    const step = () => {
      if (li >= lines.length) return
      ci++
      setOut((o) => o.map((s, i) => (i === li ? lines[li].slice(0, ci) : s)))
      if (ci >= lines[li].length) { li++; ci = 0; id = setTimeout(step, 380) } else id = setTimeout(step, 14 + Math.random() * 18)
    }
    id = setTimeout(step, 900)
    return () => clearTimeout(id)
  }, [lines])
  return out
}

function Count({ to, suffix = '' }) {
  const ref = useRef(null)
  const [v, setV] = useState(0)
  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (t) => { const k = Math.min(1, (t - t0) / 1100); setV(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(tick) }
      requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [to])
  return <span ref={ref}>{v}{suffix}</span>
}

/* ── pieces ────────────────────────────────────────────────── */
function Panel({ className = '', children, as: As = 'section', ...rest }) {
  return <As className={`panel ${className}`} data-live {...rest}><span className="scan" aria-hidden="true" />{children}</As>
}

function Head({ n, title, note }) {
  return (
    <div className="head" data-live>
      <span className="head-n">{n}</span>
      <h2>{title}</h2>
      {note && <span className="head-note">{note}</span>}
      <span className="head-line" aria-hidden="true" />
    </div>
  )
}

function Ecg() {
  const d = 'M0 52 H180 l6-5 6-2 6 2 6 5 h10 l6 5 9-52 9 64 7-17 h14 l7-7 7-4 7 2 6 4 6 6 H500 l6-5 6-2 6 2 6 5 h10 l6 5 9-52 9 64 7-17 h14 l7-7 7-4 7 2 6 4 6 6 H880'
  return (
    <svg className="ecg" viewBox="0 0 880 80" preserveAspectRatio="none" aria-hidden="true">
      <path d={d} className="ecg-base" />
      <path d={d} className="ecg-trace" />
    </svg>
  )
}

function Nav() {
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    let tick = false
    const on = () => { if (tick) return; tick = true; requestAnimationFrame(() => { setSolid(window.scrollY > 20); tick = false }) }
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={`nav ${solid ? 'nav--solid' : ''}`}>
      <div className="wrap nav-row">
        <a href="#top" onClick={go('top')} className="brand"><span className="rs">RS</span><span>rahul<b>@</b>sangral</span></a>
        <nav className="nav-links">{NAV.map(([id, l]) => <a key={id} href={`#${id}`} onClick={go(id)}>{l}</a>)}</nav>
        <a className="btn btn--glow btn--sm" href={MAILTO}>Hire me</a>
      </div>
    </header>
  )
}

function Hero() {
  const time = useClock()
  const typed = useTyped(TERMINAL)
  return (
    <Panel className="hero" id="top">
      <div className="dots" aria-hidden="true">{Array.from({ length: 14 }, (_, i) => <i key={i} />)}</div>
      <div className="hero-top">
        <div className="avatar">
          <span className="ring" aria-hidden="true" />
          <img src="/brand/avatar.jpg" alt="Rahul Sangral" width="200" height="200" />
        </div>
        <div className="hero-id">
          <h1 className="name">Rahul Sangral</h1>
          <p className="role">Full-stack and AI developer · Founding Software Engineer at Clavix Technologies</p>
          <p className="tagline">I build AI products for healthcare — and ship them, end to end.</p>
          <div className="hero-meta">
            <a className="open" href={MAILTO}><span className="pulse" />Open to SDE roles and freelance work</a>
            <span className="mono dim">{profile.location} · {time} IST</span>
          </div>
        </div>
      </div>
      <Ecg />
      <div className="term" aria-label="About me">
        {typed.map((l, i) => (
          <p key={i} className={l ? 'show' : ''}><span className="prompt">rahul@aethex:~$</span> {l}{l && l.length < TERMINAL[i].length && <span className="caret" />}</p>
        ))}
      </div>
      <div className="quick">
        {[
          ['/gh/globe-a.svg', 'Portfolio', 'rahulsangral.me', '#top'],
          ['/gh/linkedin-original.svg', 'LinkedIn', 'in/rahulsangral', 'https://www.linkedin.com/in/rahulsangral/'],
          ['/gh/mail-a.svg', 'Email', profile.email, MAILTO],
          ['/gh/cv-a.svg', 'Résumé', 'PDF', profile.resume],
        ].map(([ic, t, s, u]) => (
          <a key={t} href={u} target={u.startsWith('http') || u.endsWith('.pdf') ? '_blank' : undefined} rel="noreferrer" className="q">
            <img src={ic} alt="" width="28" height="28" />
            <span><b>{t}</b><small>{s}</small></span>
          </a>
        ))}
      </div>
    </Panel>
  )
}

function About() {
  return (
    <div className="grid2">
      <Panel className="about">
        <span className="label">About</span>
        <p className="about-txt">I build AETHEX, a medical workspace for India's doctors, hospitals and medical colleges, and Cadus, the clinical AI built into it. I design the APIs and data, build the web and desktop apps, and run the releases.</p>
      </Panel>
      <Panel className="profile">
        <span className="label">Profile</span>
        <dl>{PROFILE_ROWS.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      </Panel>
    </div>
  )
}

function Glance() {
  return (
    <Panel className="glance">
      <div className="glance-nums">
        <span className="label">At a glance</span>
        <div className="nums">
          <div><b className="grad"><Count to={3} suffix="+" /></b><span>years building software</span><small>freelance since 2023</small></div>
          <div><b className="grad"><Count to={10} suffix="+" /></b><span>certifications</span><small>Anthropic, Google, Microsoft, Oracle</small></div>
          <div><b className="grad"><Count to={60} suffix="%" /></b><span>less manual analysis</span><small>AI Data Insights Engine</small></div>
          <div><b className="grad"><Count to={40} suffix="%" /></b><span>fewer manual reports</span><small>KPI performance dashboard</small></div>
        </div>
      </div>
      <div className="depth">
        <span className="label">Stack depth</span>
        {DEPTH.map(([k, v]) => (
          <div key={k} className="bar"><span>{k}</span><em>{v}%</em><i style={{ '--w': `${v}%` }} /></div>
        ))}
      </div>
    </Panel>
  )
}

function Aethex() {
  const shots = caseStudies['aethex-suite'].shots.concat(caseStudies.cadus.shots)
  const [i, setI] = useState(0)
  const s = shots[i]
  return (
    <section className="block" id="aethex">
      <Head n="01" title="AETHEX" note="sole developer · hms.aethex.in · cadus.aethex.in" />
      <Panel className="family">
        <p className="family-lede">One aethex.in account with Google sign-in, shared across the web and every desktop app.</p>
        <div className="prods">
          {PRODUCTS.map((p) => (
            <a key={p.name} href={p.url} target="_blank" rel="noreferrer" className="prod">
              <img src={p.icon} alt="" width="40" height="40" loading="lazy" />
              <b>{p.name}</b>
              <small>{p.who}</small>
              <span className="prod-what">{p.what}</span>
              <em className="chip">{p.tag}</em>
            </a>
          ))}
        </div>
      </Panel>

      <Panel className="viewer">
        <div className="viewer-bar">
          <span className="lights"><i /><i /><i /></span>
          <div className="tabs" role="tablist">
            {shots.map((x, k) => (
              <button key={x.src} role="tab" aria-selected={k === i} className={k === i ? 'on' : ''} onClick={() => setI(k)}>{x.label.split(' · ')[0]}</button>
            ))}
          </div>
          <span className="mono dim hide-sm">live product screenshots</span>
        </div>
        <div className="viewer-img">
          <img key={s.src} src={s.src} srcSet={`${s.src} 1600w, ${s.src.replace('.webp', '@2x.webp')} 3200w`} sizes="(max-width: 1100px) 100vw, 1100px" width={s.w} height={s.h} alt={s.label} loading="lazy" decoding="async" />
        </div>
        <p className="mono dim viewer-cap">{s.label}</p>
      </Panel>

      <Panel className="cadus">
        <div className="cadus-head">
          <img src="/gh/cadus-a.svg" alt="" width="44" height="44" loading="lazy" />
          <div><span className="label">Inside Cadus</span><h3>The clinical AI built into every app</h3></div>
          <a className="btn btn--line btn--sm" href="https://cadus.aethex.in/" target="_blank" rel="noreferrer">cadus.aethex.in ↗</a>
        </div>
        <div className="feat">
          {CADUS.map(([t, d]) => <div key={t}><b>{t}</b><span>{d}</span></div>)}
        </div>
        <p className="mono dim">every answer cited and safety-reviewed · 15,515-article offline library · Medius 3.1 and Magnus 3.6</p>
      </Panel>
    </section>
  )
}

function Work() {
  return (
    <section className="block" id="work">
      <Head n="02" title="Selected work" note="products · hackathons · case studies" />
      <div className="cards">
        {WORK.map((w) => (
          <Panel as="a" key={w.name} href={w.url} target="_blank" rel="noreferrer" className="card">
            <div className="card-top"><h3>{w.name}</h3><em className="chip">{w.tag}</em></div>
            <p>{w.what}</p>
            <div className="card-foot"><span className="stack">{w.stack}</span><span className="open-l">open ↗</span></div>
          </Panel>
        ))}
      </div>
    </section>
  )
}

function Experience() {
  const rows = experience.map((x) => ({ when: x.period.replace('Present', 'now'), title: x.title, org: `${x.org} · ${x.place}`, what: x.description }))
  rows.push({ when: '2023 – 2026', title: 'Bachelor of Computer Applications', org: 'Uttaranchal University · Dehradun', what: '' })
  return (
    <section className="block" id="experience">
      <Head n="03" title="Experience" />
      <Panel className="timeline">
        <ol>
          {rows.map((r, k) => (
            <li key={r.title} style={{ '--i': k }}>
              <span className="when mono">{r.when}</span>
              <span className="node" aria-hidden="true" />
              <div><b>{r.title}</b><small>{r.org}</small>{r.what && <p>{r.what}</p>}</div>
            </li>
          ))}
        </ol>
      </Panel>
    </section>
  )
}

function Stack() {
  return (
    <section className="block" id="stack">
      <Head n="04" title="Stack" />
      <Panel className="stackp">
        <dl>{STACK.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      </Panel>
      <div className="ticker panel" data-live aria-hidden="true">
        <div className="ticker-track">{[...TICKER, ...TICKER].map((t, i) => <span key={i}>{t}<i>◆</i></span>)}</div>
      </div>
    </section>
  )
}

function Certs() {
  return (
    <section className="block" id="certs">
      <Head n="05" title="Certifications" note="each one links to the issuer" />
      <div className="certs">
        {certifications.map((c) => {
          const org = c.org.split(' ·')[0]
          return (
            <Panel as="a" key={c.id} href={c.url} target="_blank" rel="noreferrer" className="cert">
              <span className="cert-logo"><img src={CERT_LOGO[org] || c.logo} alt="" loading="lazy" /></span>
              <span className="cert-txt"><b>{c.title}</b><small><img src="/gh/verified.svg" alt="" width="14" height="14" /> {c.org}{c.year && ` · ${c.year}`}</small></span>
            </Panel>
          )
        })}
      </div>
    </section>
  )
}

function Activity({ live }) {
  const gh = live.github
  return (
    <section className="block" id="activity">
      <Head n="06" title="Activity" note="live from GitHub" />
      <Panel className="activity">
        <div className="act-stats">
          {gh ? gh.map((x) => <div key={x.l}><b className="grad">{x.v}</b><span>{x.l}</span></div>) : <div><b className="grad">29</b><span>repositories</span></div>}
          <a className="btn btn--line btn--sm" href="https://github.com/sangralrahul" target="_blank" rel="noreferrer">github.com/sangralrahul ↗</a>
        </div>
        <img className="snake" src="https://raw.githubusercontent.com/sangralrahul/sangralrahul/output/github-snake-dark.svg" alt="GitHub contribution graph being eaten by a snake" loading="lazy" width="880" height="192" />
      </Panel>
    </section>
  )
}

function Connect({ live }) {
  return (
    <section className="block" id="connect">
      <Head n="07" title="Connect" />
      <div className="profiles">
        {PROFILES.map((p) => {
          const st = p.key && live[p.key]
          return (
            <Panel as="a" key={p.name} href={p.url} target="_blank" rel="noreferrer" className="pf">
              <img src={p.icon} alt="" width="32" height="32" loading="lazy" />
              <span><b>{p.name}</b><small>{st ? st.map((x) => `${x.v} ${x.l.toLowerCase()}`).join(' · ') : p.handle}</small></span>
              <i aria-hidden="true">↗</i>
            </Panel>
          )
        })}
      </div>
      <Panel className="cta">
        <div className="dots" aria-hidden="true">{Array.from({ length: 10 }, (_, i) => <i key={i} />)}</div>
        <h2 className="grad">Let's build something for healthcare.</h2>
        <p className="mono dim">{profile.email} · rahulsangral.me · usually replies within a day</p>
        <div className="cta-btns">
          <a className="btn btn--glow" href={MAILTO}>Email me</a>
          <a className="btn btn--line" href={profile.resume} target="_blank" rel="noreferrer">Download résumé</a>
        </div>
      </Panel>
      <footer className="foot mono dim">© {new Date().getFullYear()} Rahul Sangral · built with React · <a href="#top" onClick={go('top')}>back to top ↑</a></footer>
    </section>
  )
}

export default function App() {
  useLivePanels()
  const live = useLiveStats()
  return (
    <>
      <Nav />
      <main className="wrap">
        <Hero />
        <About />
        <Glance />
        <Aethex />
        <Work />
        <Experience />
        <Stack />
        <Certs />
        <Activity live={live} />
        <Connect live={live} />
      </main>
    </>
  )
}
