import { useEffect, useState } from 'react'
import Icon from '../components/Icons.jsx'
import DotField from './DotField.jsx'
import { useLiveStats, useReveal } from './live.js'
import { certifications, education, experience, profile, projects, skills, socials } from '../data.js'

const NAV = [
  ['work', 'Work'],
  ['experience', 'Experience'],
  ['skills', 'Skills'],
  ['profiles', 'Profiles'],
  ['certifications', 'Certifications'],
  ['contact', 'Contact'],
]

const suite = projects.find((p) => p.id === 'aethex-suite')
const family = projects.filter((p) => p.domain && p.id !== 'aethex-suite')
const more = projects.filter((p) => !p.domain)
const shipping = projects.filter((p) => p.domain)
const issuers = [...new Map(certifications.map((c) => [c.logo, c.org.split(' ·')[0]])).entries()]
const social = Object.fromEntries(socials.map((s) => [s.id, s]))

const MODULES = [
  { app: 'AETHEX PC', who: 'Doctors & students', items: ['Cadus', 'Medical library', 'Drug reference', 'My Clinic', 'Hindi prescriptions', 'Teleconsultation', 'NEET-PG practice'] },
  { app: 'AETHEX HC', who: 'Hospitals & clinics', items: ['OPD queue', 'Admissions', 'Wards & beds', 'Operation theatre', 'Lab & imaging', 'Pharmacy', 'GST billing & UPI'] },
  { app: 'AETHEX MC', who: 'Medical colleges', items: ['Students & batches', 'Timetable', 'Attendance', 'CBME logbook', 'OSCE & skills', 'PG theses', 'UPI fees'] },
]

const go = (id) => (e) => {
  e?.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    let ticking = false
    const on = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => { setSolid(window.scrollY > 8); ticking = false })
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={`nav ${solid ? 'nav--solid' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="wrap nav-row">
        <a href="#top" className="brand" onClick={go('top')}>
          <img src={profile.logo} alt="" width="28" height="28" />
          <span>Rahul Sangral</span>
        </a>
        <nav className="nav-links" aria-label="Sections">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={(e) => { setOpen(false); go(id)(e) }}>{label}</a>
          ))}
        </nav>
        <div className="nav-cta">
          <a className="btn btn--sm btn--ghost" href={profile.resume} target="_blank" rel="noreferrer">Resume</a>
          <a className="btn btn--sm btn--light" href={`mailto:${profile.email}`}>Get in touch</a>
          <button className="nav-burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <Icon name={open ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}

function Head({ label, title, lede }) {
  return (
    <div className="head" data-reveal>
      <span className="label">{label}</span>
      <h2>{title}</h2>
      {lede && <p>{lede}</p>}
    </div>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <DotField />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <a className="pill" href="#contact" onClick={go('contact')}>
            <span className="dot" /> Open to SDE roles and freelance work <Icon name="arrow" size={14} />
          </a>
          <p className="hero-name">Rahul Sangral</p>
          <h1>Full-stack engineer shipping AI products to real users.</h1>
          <p className="hero-lede">
            I build and run software end to end — React and TypeScript on the front, FastAPI and PostgreSQL behind it, AI on top.
            Right now that's <strong>AETHEX</strong>: a medical workspace for India's doctors, hospitals and medical colleges, with the <strong>Cadus</strong> clinical AI built in.
          </p>
          <div className="hero-actions">
            <a className="btn btn--light" href="#work" onClick={go('work')}>See my work <Icon name="arrow" size={16} /></a>
            <a className="btn btn--ghost" href={profile.resume} target="_blank" rel="noreferrer"><Icon name="download" size={16} /> Resume</a>
          </div>
          <div className="hero-social">
            {[social.github, social.linkedin, social.leetcode, social.huggingface].map((s) => (
              <a key={s.id} href={s.url} target="_blank" rel="noreferrer" aria-label={s.name} title={s.name}>
                <img src={s.logo} alt="" width="18" height="18" />
                <span>{s.name}</span>
              </a>
            ))}
          </div>
        </div>

        <aside className="ship" aria-label="Products shipping now">
          <div className="ship-top">
            <span className="dot" /> Shipping now
            <span className="ship-count">{shipping.length} products live</span>
          </div>
          <ul>
            {shipping.map((p) => (
              <li key={p.id}>
                <a href={p.links[0].url} target="_blank" rel="noreferrer">
                  <img src={p.logo} alt="" width="36" height="36" />
                  <span className="ship-txt"><strong>{p.title}</strong><small>{p.domain}</small></span>
                  <span className="tag">{p.status}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="ship-foot"><Icon name="pin" size={14} /> {profile.location}</div>
        </aside>
      </div>

      <div className="wrap trust">
        <span>Certified by</span>
        <div className="trust-logos">
          {issuers.map(([logo, name]) => (
            <img key={logo} src={logo} alt={name} title={name} loading="lazy" height="36" />
          ))}
        </div>
      </div>
    </section>
  )
}

function Numbers() {
  const items = [
    { v: '4', l: 'products live in production' },
    { v: '15,515', l: 'offline articles in the AETHEX library' },
    { v: '60%', l: 'less manual analysis with my AI tooling' },
    { v: '11', l: 'verified certifications' },
  ]
  return (
    <section className="numbers">
      <div className="wrap numbers-grid" data-reveal>
        {items.map((i) => (
          <div key={i.l}><strong>{i.v}</strong><span>{i.l}</span></div>
        ))}
      </div>
    </section>
  )
}

function Work() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <Head label="Work" title="Products I've built and shipped." lede="One medical platform used across web and desktop, and the AI and data work that led to it." />

        <article className="suite" data-reveal>
          <div className="suite-copy">
            <div className="suite-title">
              <img src={suite.logo} alt="" width="44" height="44" />
              <div>
                <span className="tag tag--live">{suite.status}</span>
                <h3>{suite.title}</h3>
              </div>
            </div>
            <p>{suite.description}</p>
            <dl className="suite-stats">
              {suite.stats.map((s) => <div key={s.label}><dt>{s.value}</dt><dd>{s.label}</dd></div>)}
            </dl>
            <div className="row-actions">
              <a className="btn btn--light" href={suite.links[0].url} target="_blank" rel="noreferrer">Visit {suite.domain} <Icon name="external" size={15} /></a>
            </div>
          </div>
          <div className="suite-board" aria-label="Modules in each AETHEX app">
            {MODULES.map((m) => (
              <div key={m.app} className="board-col">
                <div className="board-head"><strong>{m.app}</strong><small>{m.who}</small></div>
                <ul>{m.items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
        </article>

        <div className="cards3">
          {family.map((p) => (
            <a key={p.id} className="card" href={p.links[0].url} target="_blank" rel="noreferrer" data-reveal>
              <div className="card-top">
                <img src={p.logo} alt="" width="40" height="40" />
                <span className="tag">{p.status}</span>
              </div>
              <h3>{p.title}</h3>
              <span className="card-kicker">{p.kicker}</span>
              <p>{p.description}</p>
              <ul className="chips">{p.tech.slice(0, 4).map((t) => <li key={t}>{t}</li>)}</ul>
              <span className="card-link">{p.domain} <Icon name="external" size={14} /></span>
            </a>
          ))}
        </div>

        <h3 className="sub" data-reveal>Earlier work</h3>
        <div className="rows">
          {more.map((p) => (
            <a key={p.id} className="row" href={p.links[0].url} target="_blank" rel="noreferrer" data-reveal>
              <div className="row-main">
                <div className="row-title">
                  {p.logo && <img src={p.logo} alt="" width="28" height="28" />}
                  <h4>{p.title}</h4>
                </div>
                <p>{p.description}</p>
              </div>
              <div className="row-side">
                <span className="card-kicker">{p.kicker}</span>
                <ul className="chips">{p.tech.slice(0, 4).map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
              <Icon name="external" size={16} className="row-arrow" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="section" id="experience">
      <div className="wrap">
        <Head label="Experience" title="Where I've done the work." />
        <ol className="xp">
          {experience.map((x) => (
            <li key={x.id} data-reveal>
              <div className="xp-when">
                <span>{x.period}</span>
                <small>{x.place}</small>
              </div>
              <div className="xp-body">
                <div className="xp-title">
                  {x.logo ? <img src={x.logo} alt="" width="32" height="32" /> : <span className="xp-mono">{x.org[0]}</span>}
                  <div><h3>{x.title}</h3><span>{x.org}</span></div>
                </div>
                <p>{x.description}</p>
                <ul className="chips">{x.tech.map((t) => <li key={t}>{t}</li>)}</ul>
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
    <section className="section" id="skills">
      <div className="wrap">
        <Head label="Skills" title="The stack I work in." />
        <div className="skills" data-reveal>
          {skills.map((g) => (
            <div key={g.id} className="skill">
              <h3>{g.title}</h3>
              <ul>{g.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Profiles() {
  const live = useLiveStats()
  const main = ['github', 'leetcode', 'codeforces']
  const rest = ['gfg', 'hackerrank', 'huggingface', 'codedex']
  return (
    <section className="section" id="profiles">
      <div className="wrap">
        <Head label="Coding profiles" title="Practice, in public." lede="Numbers load live from each platform when you open the page." />
        <div className="cards3">
          {main.map((k) => {
            const s = social[k]
            const stats = live[k]
            return (
              <a key={k} className="card prof" href={s.url} target="_blank" rel="noreferrer" data-reveal>
                <div className="card-top">
                  <img src={s.logo} alt="" width="36" height="36" />
                  <span className="tag"><span className="dot" /> live</span>
                </div>
                <h3>{s.name}</h3>
                <span className="card-kicker">@{s.handle}</span>
                <div className="prof-stats">
                  {stats === undefined && <span className="muted">Loading…</span>}
                  {stats === null && <span className="muted">Open the profile to see stats.</span>}
                  {stats && stats.map((x) => <div key={x.l}><strong>{x.v}</strong><small>{x.l}</small></div>)}
                </div>
                <span className="card-link">View profile <Icon name="external" size={14} /></span>
              </a>
            )
          })}
        </div>
        <div className="mini" data-reveal>
          {rest.map((k) => {
            const s = social[k]
            return (
              <a key={k} href={s.url} target="_blank" rel="noreferrer">
                <img src={s.logo} alt="" width="28" height="28" />
                <span><strong>{s.name}</strong><small>@{s.handle.replace(/^@/, '')}</small></span>
                <Icon name="external" size={14} />
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Certifications() {
  return (
    <section className="section" id="certifications">
      <div className="wrap">
        <Head label="Certifications" title="Verified credentials." lede="Every card links to the issuer's verification page." />
        <div className="certs">
          {certifications.map((c) => (
            <a key={c.id} className="cert" href={c.url} target="_blank" rel="noreferrer" data-reveal>
              <img src={c.logo} alt="" width="64" height="44" loading="lazy" />
              <div>
                <h3>{c.title}</h3>
                <span>{c.org}{c.year && ` · ${c.year}`}</span>
              </div>
              <span className="verify">Verify <Icon name="external" size={13} /></span>
            </a>
          ))}
        </div>

        <h3 className="sub" data-reveal>Education</h3>
        <div className="edu">
          {education.map((e) => (
            <div key={e.id} className="edu-item" data-reveal>
              <img src={e.logo} alt="" width="40" height="40" loading="lazy" />
              <div>
                <h4>{e.title}</h4>
                <span>{e.org} · {e.place}{e.period && ` · ${e.period}`}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <div className="cta" data-reveal>
          <span className="label">Contact</span>
          <h2>Have a role or a product in mind?</h2>
          <p>I reply within a day. The fastest way to reach me is email.</p>
          <div className="hero-actions">
            <a className="btn btn--light" href={`mailto:${profile.email}`}><Icon name="mail" size={16} /> {profile.email}</a>
            <a className="btn btn--ghost" href={social.linkedin.url} target="_blank" rel="noreferrer"><img src={social.linkedin.logo} alt="" width="16" height="16" /> LinkedIn</a>
          </div>
          <div className="cta-meta">
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`}><Icon name="phone" size={14} /> {profile.phone}</a>
            <span><Icon name="pin" size={14} /> {profile.location}</span>
            <span><Icon name="globe" size={14} /> {profile.languages.join(', ')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-row">
        <span>© {new Date().getFullYear()} Rahul Sangral</span>
        <div className="footer-links">
          {socials.map((s) => (
            <a key={s.id} href={s.url} target="_blank" rel="noreferrer" aria-label={s.name} title={s.name}>
              <img src={s.logo} alt="" width="18" height="18" loading="lazy" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  useReveal()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Numbers />
        <Work />
        <Experience />
        <Skills />
        <Profiles />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
