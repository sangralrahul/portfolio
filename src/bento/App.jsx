import { useEffect, useState } from 'react'
import Icon from '../components/Icons.jsx'
import { useLiveStats, useReveal } from '../site/live.js'
import { caseStudies, certifications, education, experience, profile, projects, skills, socials } from '../data.js'
import '@fontsource-variable/inter'
import '@fontsource/instrument-serif/400-italic.css'
import './bento.css'

const by = Object.fromEntries(projects.map((p) => [p.id, p]))
const social = Object.fromEntries(socials.map((s) => [s.id, s]))
const issuers = [...new Map(certifications.map((c) => [c.logo, c.org.split(' ·')[0]])).entries()]
const earlier = projects.filter((p) => !p.domain)
const NAV = [['work', 'Work'], ['experience', 'Experience'], ['stack', 'Stack'], ['credentials', 'Credentials'], ['contact', 'Contact']]

const go = (id) => (e) => {
  e?.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function RMark({ size = 32, className = '' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={`rmark ${className}`} aria-hidden="true" fill="none">
      <rect x="1" y="1" width="62" height="62" rx="15" className="rm-tile" />
      <rect x="1.5" y="1.5" width="61" height="61" rx="14.5" className="rm-edge" />
      <path d="M22 47V17h12.5a9.5 9.5 0 0 1 0 19H22" className="rm-r" />
      <path d="M33 36l11 11" className="rm-leg" />
    </svg>
  )
}

/** Local time in Jammu, updated once a minute. */
function useIST() {
  const fmt = () => new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' })
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 30000)
    return () => clearInterval(id)
  }, [])
  return t
}

function Tile({ className = '', as: As = 'div', children, ...rest }) {
  return <As className={`tile ${className}`} data-reveal {...rest}>{children}</As>
}

function Nav() {
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    let tick = false
    const on = () => { if (tick) return; tick = true; requestAnimationFrame(() => { setSolid(window.scrollY > 10); tick = false }) }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={`nav ${solid ? 'nav--solid' : ''}`}>
      <div className="wrap nav-row">
        <a href="#top" onClick={go('top')} className="brand"><RMark size={30} /><span>Rahul Sangral</span></a>
        <nav className="nav-links">{NAV.map(([id, l]) => <a key={id} href={`#${id}`} onClick={go(id)}>{l}</a>)}</nav>
        <a className="pill-btn" href={`mailto:${profile.email}`}><Icon name="mail" size={15} /> <span>Email me</span></a>
      </div>
    </header>
  )
}

function Overview({ live }) {
  const time = useIST()
  const gh = live.github
  return (
    <section className="wrap grid" id="top" aria-label="Overview">
      {/* intro */}
      <Tile className="t-intro">
        <span className="avail"><span className="dot" /> Available for SDE roles &amp; freelance</span>
        <h1>Full-stack developer building <em>AI products for healthcare.</em></h1>
        <p>I'm Rahul — founder of <b>AETHEX</b> and the <b>Cadus</b> clinical AI. I design, build and ship web and desktop products end to end with React, FastAPI, PostgreSQL and AI.</p>
        <div className="row-btns">
          <a className="btn btn--white" href="#work" onClick={go('work')}>See my work <Icon name="arrow" size={15} /></a>
          <a className="btn btn--line" href={profile.resume} target="_blank" rel="noreferrer"><Icon name="download" size={15} /> Résumé</a>
        </div>
      </Tile>

      {/* monogram */}
      <Tile className="t-mark" aria-hidden="true">
        <div className="mark-glow" />
        <RMark size={112} className="mark-big" />
        <span className="mark-cap">Rahul Sangral</span>
      </Tile>

      {/* location */}
      <Tile className="t-loc">
        <div className="loc-map" aria-hidden="true"><span className="ping" /></div>
        <div className="loc-txt">
          <small>Based in</small>
          <strong>{profile.location}</strong>
          <span>{time} IST · remote-friendly</span>
        </div>
      </Tile>

      {/* AETHEX screenshot */}
      <Tile as="a" className="t-aethex shot-tile" href="#work" onClick={go('work')}>
        <div className="tile-head">
          <img src={by['aethex-suite'].logo} alt="" width="28" height="28" className="logo" />
          <div><strong>AETHEX — PC · HC · MC</strong><small>Hospital, clinic &amp; college workspace</small></div>
          <span className="st"><span className="dot" />v0.1.70</span>
        </div>
        <div className="shot"><img src="/shots/hc-wards.webp" alt="AETHEX HC wards and beds screen" width="761" height="428" loading="lazy" /></div>
      </Tile>

      {/* numbers */}
      <Tile className="t-num t-n1">
        <b>4</b><span>products live in production</span>
      </Tile>
      <Tile className="t-num t-num--alt t-n2">
        <b>15,515</b><span>offline articles in the AETHEX library</span>
      </Tile>

      {/* Cadus */}
      <Tile as="a" className="t-cadus shot-tile shot-tile--light" href={by.cadus.links[0].url} target="_blank" rel="noreferrer">
        <div className="tile-head">
          <img src="/logos/cadus.svg" alt="" width="28" height="28" className="logo" />
          <div><strong>Cadus</strong><small>Clinical AI · cited, safety-reviewed answers</small></div>
          <Icon name="external" size={15} className="ext" />
        </div>
        <div className="shot"><img src="/shots/cadus-chat.webp" alt="Cadus answering a drug-interaction question with sources" width="736" height="352" loading="lazy" /></div>
      </Tile>

      {/* Cadus Desktop */}
      <Tile as="a" className="t-desk" href={by['cadus-desktop'].links[0].url} target="_blank" rel="noreferrer">
        <div className="tile-head">
          <img src="/logos/cadus.svg" alt="" width="28" height="28" className="logo" />
          <div><strong>Cadus Desktop</strong><small>Windows · Linux · v1.0.2</small></div>
          <Icon name="external" size={15} className="ext" />
        </div>
        <div className="keys" aria-hidden="true"><kbd>Ctrl</kbd><kbd>Shift</kbd><kbd className="wide">Space</kbd></div>
        <p className="tile-note">Opens a new Cadus chat from any app.</p>
      </Tile>

      {/* live coding */}
      <Tile as="a" className="t-code" href={social.github.url} target="_blank" rel="noreferrer">
        <div className="tile-head">
          <img src={social.github.logo} alt="" width="28" height="28" className="logo" />
          <div><strong>GitHub</strong><small>@{social.github.handle}</small></div>
          <span className="st"><span className="dot" />live</span>
        </div>
        <div className="code-nums">
          {gh ? gh.map((x) => <div key={x.l}><b>{x.v}</b><small>{x.l}</small></div>) : <div><b>—</b><small>{gh === null ? 'open profile' : 'loading'}</small></div>}
        </div>
        <div className="bars" aria-hidden="true">{Array.from({ length: 28 }, (_, i) => <i key={i} style={{ '--h': `${18 + ((i * 37) % 70)}%` }} />)}</div>
      </Tile>

      {/* certified by */}
      <Tile as="a" className="t-certs" href="#credentials" onClick={go('credentials')}>
        <div className="tile-label">Certified by <Icon name="arrow" size={13} /></div>
        <div className="cert-logos">
          {issuers.map(([logo, name]) => <img key={logo} src={logo} alt={name} title={name} loading="lazy" />)}
        </div>
      </Tile>

      {/* socials */}
      <Tile className="t-social">
        <div className="tile-label">Find me on</div>
        <div className="soc-grid">
          {socials.map((s) => (
            <a key={s.id} href={s.url} target="_blank" rel="noreferrer" title={s.name} aria-label={s.name}><img src={s.logo} alt="" width="22" height="22" /></a>
          ))}
        </div>
      </Tile>

      {/* current role */}
      <Tile className="t-role">
        <div className="tile-label">Now</div>
        <div className="role-main">
          <img src={experience[0].logo} alt="" width="36" height="36" className="logo" />
          <div><strong>{experience[0].title}</strong><small>{experience[0].org} · {experience[0].period}</small></div>
        </div>
        <ul className="chips">{experience[0].tech.slice(0, 5).map((t) => <li key={t}>{t}</li>)}</ul>
      </Tile>
    </section>
  )
}

function Head({ id, title, sub }) {
  return (
    <div className="head" id={id} data-reveal>
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
    </div>
  )
}

function CaseBento({ id, flip }) {
  const p = by[id]
  const c = caseStudies[id]
  const [i, setI] = useState(0)
  return (
    <div className={`grid case ${flip ? 'case--flip' : ''}`}>
      <Tile className="c-shot">
        <div className="tile-head">
          <img src={p.logo} alt="" width="32" height="32" className="logo" />
          <div><strong>{p.title}</strong><a href={p.links[0].url} target="_blank" rel="noreferrer" className="dom">{p.domain} <Icon name="external" size={12} /></a></div>
          <span className="st"><span className="dot" />{p.status}</span>
        </div>
        {c.shots.length > 1 && (
          <div className="tabs" role="tablist">
            {c.shots.map((s, k) => <button key={s.src} role="tab" aria-selected={k === i} className={k === i ? 'on' : ''} onClick={() => setI(k)}>{s.label.split(' · ')[0]}</button>)}
          </div>
        )}
        <div className="shot"><img src={c.shots[i].src} alt={c.shots[i].label} loading="lazy" /></div>
      </Tile>
      <Tile className="c-txt c-prob">
        <span className="tile-label">The problem</span>
        <p>{c.problem}</p>
      </Tile>
      <Tile className="c-txt c-built">
        <span className="tile-label">What I built</span>
        <p>{c.built}</p>
      </Tile>
      <Tile className="c-txt c-out">
        <span className="tile-label">Outcome</span>
        <p>{c.outcome}</p>
        <ul className="chips">{p.tech.map((t) => <li key={t}>{t}</li>)}</ul>
      </Tile>
    </div>
  )
}

function Work() {
  const web = by.aethex
  return (
    <section className="wrap sec">
      <Head id="work" title={<>Work, <em>shipped.</em></>} sub="Case studies of the products I've built myself. Every screenshot is from the live product." />
      <CaseBento id="aethex-suite" />
      <CaseBento id="cadus" flip />
      <CaseBento id="cadus-desktop" />
      <div className="grid">
        <Tile as="a" className="t-web" href={web.links[0].url} target="_blank" rel="noreferrer">
          <div className="web-img"><img src="/shots/aethex-web.webp" alt="aethex.in" width="428" height="326" loading="lazy" /></div>
          <div className="web-copy">
            <span className="tile-label">Web platform</span>
            <h3>{web.title}</h3>
            <p>{web.description}</p>
            <span className="go">Visit aethex.in <Icon name="external" size={13} /></span>
          </div>
        </Tile>
        {earlier.map((p) => (
          <Tile as="a" key={p.id} className="t-early" href={p.links[0].url} target="_blank" rel="noreferrer">
            <div className="tile-head">
              {p.logo ? <img src={p.logo} alt="" width="28" height="28" className="logo" /> : <span className="mono">{p.title[0]}</span>}
              <div><strong>{p.title}</strong><small>{p.kicker}</small></div>
              <Icon name="external" size={14} className="ext" />
            </div>
            <p>{p.description}</p>
            <ul className="chips">{p.tech.slice(0, 4).map((t) => <li key={t}>{t}</li>)}</ul>
          </Tile>
        ))}
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="wrap sec">
      <Head id="experience" title="Experience" />
      <div className="grid">
        {experience.map((x, k) => (
          <Tile key={x.id} className={`t-xp ${k === 0 ? 't-xp--now' : ''}`}>
            <div className="tile-head">
              {x.logo ? <img src={x.logo} alt="" width="32" height="32" className="logo" /> : <span className="mono">{x.org[0]}</span>}
              <div><strong>{x.title}</strong><small>{x.org}</small></div>
              {k === 0 && <span className="st"><span className="dot" />now</span>}
            </div>
            <span className="when">{x.period} · {x.place}</span>
            <p>{x.description}</p>
            <ul className="chips">{x.tech.map((t) => <li key={t}>{t}</li>)}</ul>
          </Tile>
        ))}
      </div>
    </section>
  )
}

function Stack({ live }) {
  return (
    <section className="wrap sec">
      <Head id="stack" title="Stack & practice" />
      <div className="grid">
        {skills.map((g) => (
          <Tile key={g.id} className="t-skill">
            <span className="tile-label">{g.title}</span>
            <ul className="chips">{g.items.map((i) => <li key={i}>{i}</li>)}</ul>
          </Tile>
        ))}
        {['leetcode', 'codeforces'].map((k) => {
          const s = social[k]
          const st = live[k]
          return (
            <Tile as="a" key={k} className="t-prof" href={s.url} target="_blank" rel="noreferrer">
              <div className="tile-head">
                <img src={s.logo} alt="" width="28" height="28" className="logo" />
                <div><strong>{s.name}</strong><small>@{s.handle}</small></div>
                <span className="st"><span className="dot" />live</span>
              </div>
              <div className="code-nums">
                {st ? st.map((x) => <div key={x.l}><b>{x.v}</b><small>{x.l}</small></div>) : <div><b>—</b><small>{st === null ? 'open profile' : 'loading'}</small></div>}
              </div>
            </Tile>
          )
        })}
      </div>
    </section>
  )
}

function Credentials() {
  return (
    <section className="wrap sec">
      <Head id="credentials" title="Credentials" sub="Every certificate links to the issuer's verification page." />
      <div className="grid">
        {certifications.map((c) => (
          <Tile as="a" key={c.id} className="t-cert" href={c.url} target="_blank" rel="noreferrer">
            <img src={c.logo} alt="" loading="lazy" className="cert-logo" />
            <strong>{c.title}</strong>
            <small>{c.org}{c.year && ` · ${c.year}`}</small>
            <span className="go">Verify <Icon name="external" size={12} /></span>
          </Tile>
        ))}
        {education.map((e) => (
          <Tile key={e.id} className="t-edu">
            <img src={e.logo} alt="" width="40" height="40" className="logo" loading="lazy" />
            <div><strong>{e.title}</strong><small>{e.org} · {e.place}{e.period && ` · ${e.period}`}</small></div>
          </Tile>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="wrap sec" id="contact">
      <div className="grid">
        <Tile className="t-contact">
          <RMark size={52} />
          <h2>Have a role or a product in mind? <em>Let's talk.</em></h2>
          <p>I reply within a day.</p>
          <div className="row-btns">
            <a className="btn btn--white" href={`mailto:${profile.email}`}><Icon name="mail" size={15} /> {profile.email}</a>
            <a className="btn btn--line" href={social.linkedin.url} target="_blank" rel="noreferrer"><img src={social.linkedin.logo} alt="" width="15" height="15" /> LinkedIn</a>
          </div>
        </Tile>
        <Tile className="t-phone">
          <span className="tile-label">Phone</span>
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="big-link">{profile.phone}</a>
          <span className="tile-label" style={{ marginTop: 18 }}>Languages</span>
          <p>{profile.languages.join(' · ')}</p>
        </Tile>
      </div>
      <footer className="foot">
        <span>© {new Date().getFullYear()} Rahul Sangral</span>
        <span>{profile.email}</span>
      </footer>
    </section>
  )
}

export default function App() {
  useReveal()
  const live = useLiveStats()
  return (
    <>
      <Nav />
      <main>
        <Overview live={live} />
        <Work />
        <Experience />
        <Stack live={live} />
        <Credentials />
        <Contact />
      </main>
    </>
  )
}
