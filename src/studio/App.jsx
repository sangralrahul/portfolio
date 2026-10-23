import { useEffect, useState } from 'react'
import Icon from '../components/Icons.jsx'
import DotField from '../pro/DotField.jsx'
import { useLiveStats, useReveal } from '../site/live.js'
import { caseStudies, certifications, education, experience, profile, projects, skills, socials } from '../data.js'
import '@fontsource-variable/inter'
import '@fontsource/instrument-serif/400-italic.css'
import './studio.css'

const NAV = [['work', 'Work'], ['experience', 'Experience'], ['skills', 'Skills'], ['profiles', 'Profiles'], ['credentials', 'Credentials']]
const by = Object.fromEntries(projects.map((p) => [p.id, p]))
const social = Object.fromEntries(socials.map((s) => [s.id, s]))
const shipping = projects.filter((p) => p.domain)
const earlier = projects.filter((p) => !p.domain)
const CASES = ['aethex-suite', 'cadus', 'cadus-desktop']

const go = (id) => (e) => {
  e?.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** The R monogram, drawn inline so it stays crisp at any size. */
export function RMark({ size = 36, className = '' }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={`rmark ${className}`} aria-hidden="true" fill="none">
      <rect x="1" y="1" width="62" height="62" rx="15" className="rmark-tile" />
      <rect x="1.5" y="1.5" width="61" height="61" rx="14.5" className="rmark-edge" />
      <path d="M22 47V17h12.5a9.5 9.5 0 0 1 0 19H22" className="rmark-r" />
      <path d="M33 36l11 11" className="rmark-leg" />
    </svg>
  )
}

function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    let ticking = false
    const on = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => { setSolid(window.scrollY > 10); ticking = false })
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={`nav ${solid || open ? 'nav--solid' : ''}`}>
      <div className="wrap nav-row">
        <a href="#top" onClick={go('top')} className="brand" aria-label="Rahul Sangral — home">
          <RMark size={32} />
          <span>Rahul Sangral</span>
        </a>
        <nav className={`links ${open ? 'links--open' : ''}`} aria-label="Sections">
          {NAV.map(([id, l]) => <a key={id} href={`#${id}`} onClick={(e) => { setOpen(false); go(id)(e) }}>{l}</a>)}
        </nav>
        <div className="nav-end">
          <a className="btn btn--line btn--sm hide-sm" href={profile.resume} target="_blank" rel="noreferrer">Résumé</a>
          <a className="btn btn--white btn--sm" href="#contact" onClick={go('contact')}>Get in touch</a>
          <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}><Icon name={open ? 'close' : 'menu'} size={20} /></button>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <DotField />
      <RMark size={560} className="hero-mark" />
      <div className="wrap hero-in">
        <a className="avail" href="#contact" onClick={go('contact')}><span className="dot" /> Available for SDE roles &amp; freelance <Icon name="arrow" size={14} /></a>
        <h1>
          I build AI products<br />for healthcare — <em>and&nbsp;ship&nbsp;them.</em>
        </h1>
        <div className="hero-foot">
          <p>
            I'm <strong>Rahul Sangral</strong>, a full-stack developer and the founder of <strong>AETHEX</strong> — a medical workspace for
            India's doctors, hospitals and medical colleges, with the <strong>Cadus</strong> clinical AI built in. React, FastAPI, PostgreSQL and AI, end to end.
          </p>
          <div className="hero-cta">
            <a className="btn btn--white" href="#work" onClick={go('work')}>View case studies <Icon name="arrow" size={16} /></a>
            <a className="btn btn--line" href={profile.resume} target="_blank" rel="noreferrer"><Icon name="download" size={16} /> Résumé</a>
          </div>
        </div>
        <ul className="live-strip" aria-label="Products live now">
          {shipping.map((p) => (
            <li key={p.id}>
              <a href={p.links[0].url} target="_blank" rel="noreferrer">
                <img src={p.logo} alt="" width="28" height="28" className="tile" />
                <span><strong>{p.title}</strong><small>{p.domain}</small></span>
                <em className="st"><span className="dot" />{p.status}</em>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Section({ id, n, title, children, lede }) {
  return (
    <section className="sec" id={id}>
      <div className="wrap">
        <header className="sec-head" data-reveal>
          <span className="sec-n">{n}</span>
          <h2>{title}</h2>
          {lede && <p>{lede}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}

function Frame({ shots }) {
  const [i, setI] = useState(0)
  const s = shots[i]
  return (
    <figure className="frame">
      <div className="frame-bar">
        <span /><span /><span />
        {shots.length > 1 ? (
          <div className="frame-tabs" role="tablist">
            {shots.map((x, k) => (
              <button key={x.src} role="tab" aria-selected={k === i} className={k === i ? 'on' : ''} onClick={() => setI(k)}>{x.label.split(' · ')[0]}</button>
            ))}
          </div>
        ) : <em>{s.label}</em>}
      </div>
      <div className="frame-img">
        <img src={s.src} alt={s.label} loading="lazy" decoding="async" width="761" height="428" />
      </div>
      {shots.length > 1 && <figcaption>{s.label}</figcaption>}
    </figure>
  )
}

function Case({ p, n }) {
  const c = caseStudies[p.id]
  return (
    <article className="case" data-reveal>
      <div className="case-top">
        <span className="case-n">{n}</span>
        <img src={p.logo} alt="" width="48" height="48" className="tile" />
        <div className="case-title">
          <h3>{p.title}</h3>
          <a href={p.links[0].url} target="_blank" rel="noreferrer">{p.domain} <Icon name="external" size={13} /></a>
        </div>
        <dl className="case-meta">
          <div><dt>Role</dt><dd>{c.role}</dd></div>
          <div><dt>Year</dt><dd>{p.year}</dd></div>
          <div><dt>Status</dt><dd className="ok"><span className="dot" />{p.status}</dd></div>
        </dl>
      </div>
      <Frame shots={c.shots} />
      <div className="case-cols">
        <div><h4>The problem</h4><p>{c.problem}</p></div>
        <div><h4>What I built</h4><p>{c.built}</p></div>
        <div><h4>Outcome</h4><p>{c.outcome}</p></div>
      </div>
      <div className="case-foot">
        <ul className="chips">{p.tech.map((t) => <li key={t}>{t}</li>)}</ul>
        <a className="btn btn--line btn--sm" href={p.links[0].url} target="_blank" rel="noreferrer">Visit {p.domain} <Icon name="external" size={14} /></a>
      </div>
    </article>
  )
}

function Work() {
  const web = by.aethex
  return (
    <Section id="work" n="01" title={<>Selected work — <em>case studies</em></>} lede="Products I designed, built and shipped myself. Screenshots are from the live products.">
      {CASES.map((id, i) => <Case key={id} p={by[id]} n={String(i + 1).padStart(2, '0')} />)}

      <a className="web" href={web.links[0].url} target="_blank" rel="noreferrer" data-reveal>
        <div className="web-img"><img src={caseStudies.aethex.shots[0].src} alt="aethex.in" loading="lazy" width="428" height="326" /></div>
        <div className="web-copy">
          <span className="eyebrow">04 · Web platform</span>
          <h3>{web.title}</h3>
          <p>{web.description}</p>
          <ul className="chips">{web.tech.map((t) => <li key={t}>{t}</li>)}</ul>
          <span className="link">Visit aethex.in <Icon name="external" size={14} /></span>
        </div>
      </a>

      <h3 className="minor" data-reveal>Earlier projects</h3>
      <div className="earlier">
        {earlier.map((p) => (
          <a key={p.id} href={p.links[0].url} target="_blank" rel="noreferrer" className="early" data-reveal>
            <div className="early-top">
              {p.logo ? <img src={p.logo} alt="" width="30" height="30" className="tile" /> : <span className="mono">{p.title[0]}</span>}
              <Icon name="external" size={14} />
            </div>
            <h4>{p.title}</h4>
            <span className="eyebrow">{p.kicker}</span>
            <p>{p.description}</p>
            <ul className="chips">{p.tech.slice(0, 4).map((t) => <li key={t}>{t}</li>)}</ul>
          </a>
        ))}
      </div>
    </Section>
  )
}

function Experience() {
  return (
    <Section id="experience" n="02" title="Experience">
      <ol className="xp">
        {experience.map((x) => (
          <li key={x.id} data-reveal>
            <div className="xp-when"><span>{x.period}</span><small>{x.place}</small></div>
            <div className="xp-what">
              <div className="xp-title">
                {x.logo ? <img src={x.logo} alt="" width="36" height="36" className="tile" /> : <span className="mono">{x.org[0]}</span>}
                <div><h3>{x.title}</h3><span>{x.org}</span></div>
              </div>
              <p>{x.description}</p>
              <ul className="chips">{x.tech.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}

function Skills() {
  return (
    <Section id="skills" n="03" title="Skills & stack">
      <div className="skills" data-reveal>
        {skills.map((g) => (
          <div key={g.id}><h4>{g.title}</h4><p>{g.items.join(', ')}</p></div>
        ))}
      </div>
    </Section>
  )
}

function Profiles() {
  const live = useLiveStats()
  return (
    <Section id="profiles" n="04" title="Coding profiles" lede="Live numbers, fetched from each platform when the page opens.">
      <div className="profs">
        {['github', 'leetcode', 'codeforces'].map((k) => {
          const s = social[k]
          const st = live[k]
          return (
            <a key={k} href={s.url} target="_blank" rel="noreferrer" className="prof" data-reveal>
              <div className="prof-top">
                <img src={s.logo} alt="" width="32" height="32" className="tile" />
                <div><strong>{s.name}</strong><small>@{s.handle}</small></div>
                <span className="st"><span className="dot" />live</span>
              </div>
              <div className="prof-nums">
                {st === undefined && <span className="muted">Loading…</span>}
                {st === null && <span className="muted">View profile →</span>}
                {st && st.map((x) => <div key={x.l}><b>{x.v}</b><small>{x.l}</small></div>)}
              </div>
            </a>
          )
        })}
      </div>
      <div className="also" data-reveal>
        {['gfg', 'hackerrank', 'huggingface', 'codedex'].map((k) => (
          <a key={k} href={social[k].url} target="_blank" rel="noreferrer"><img src={social[k].logo} alt="" width="18" height="18" /> {social[k].name}</a>
        ))}
      </div>
    </Section>
  )
}

function Credentials() {
  return (
    <Section id="credentials" n="05" title="Certifications & education" lede="Each certificate links to the issuer's verification page.">
      <div className="certs">
        {certifications.map((c) => (
          <a key={c.id} href={c.url} target="_blank" rel="noreferrer" className="cert" data-reveal>
            <img src={c.logo} alt="" width="60" height="38" loading="lazy" className="tile tile--wide" />
            <div><strong>{c.title}</strong><small>{c.org}{c.year && ` · ${c.year}`}</small></div>
            <span className="verify">Verify <Icon name="external" size={12} /></span>
          </a>
        ))}
      </div>
      <div className="edu">
        {education.map((e) => (
          <div key={e.id} className="edu-i" data-reveal>
            <img src={e.logo} alt="" width="40" height="40" loading="lazy" className="tile" />
            <div><strong>{e.title}</strong><small>{e.org} · {e.place}{e.period && ` · ${e.period}`}</small></div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="contact-box" data-reveal>
          <RMark size={56} />
          <h2>Let's build something <em>that ships.</em></h2>
          <p>Hiring for an engineering role or need a product built? I reply within a day.</p>
          <div className="hero-cta">
            <a className="btn btn--white" href={`mailto:${profile.email}`}><Icon name="mail" size={16} /> {profile.email}</a>
            <a className="btn btn--line" href={social.linkedin.url} target="_blank" rel="noreferrer"><img src={social.linkedin.logo} alt="" width="16" height="16" /> LinkedIn</a>
          </div>
        </div>
      </div>
      <footer className="wrap foot">
        <div className="foot-brand"><RMark size={24} /> <span>© {new Date().getFullYear()} Rahul Sangral · {profile.location}</span></div>
        <div className="foot-social">
          {socials.map((s) => (
            <a key={s.id} href={s.url} target="_blank" rel="noreferrer" aria-label={s.name} title={s.name}><img src={s.logo} alt="" width="18" height="18" loading="lazy" /></a>
          ))}
        </div>
      </footer>
    </section>
  )
}

export default function App() {
  useReveal()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Experience />
        <Skills />
        <Profiles />
        <Credentials />
        <Contact />
      </main>
    </>
  )
}
