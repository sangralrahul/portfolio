import { useEffect, useState } from 'react'
import Icon from '../components/Icons.jsx'
import DotField from './DotField.jsx'
import { useLiveStats, useReveal } from '../site/live.js'
import { certifications, education, experience, profile, projects, skills, socials } from '../data.js'
import '@fontsource-variable/inter'
import '@fontsource/instrument-serif/400-italic.css'
import './pro.css'

const SECTIONS = [
  ['about', 'About'],
  ['products', 'Products'],
  ['experience', 'Experience'],
  ['work', 'Earlier work'],
  ['skills', 'Skills'],
  ['profiles', 'Profiles'],
  ['credentials', 'Credentials'],
]

const by = Object.fromEntries(projects.map((p) => [p.id, p]))
const earlier = projects.filter((p) => !p.domain)
const social = Object.fromEntries(socials.map((s) => [s.id, s]))

const go = (id) => (e) => {
  e?.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Which section is currently being read — drives the sidebar index. */
function useActive() {
  const [active, setActive] = useState('about')
  useEffect(() => {
    const els = SECTIONS.map(([id]) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -60% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return active
}

function Sidebar() {
  const active = useActive()
  return (
    <aside className="side">
      <DotField />
      <div className="side-inner">
        <a href="#about" onClick={go('about')} className="side-brand">
          <img src={profile.logo} alt="" width="40" height="40" />
        </a>
        <h1>Rahul Sangral</h1>
        <p className="side-role">Full-stack developer &amp; founder of <em>AETHEX</em></p>
        <p className="side-line">I build AI products for healthcare and ship them to real users — on the web and on the desktop.</p>

        <a className="status" href="#contact" onClick={go('contact')}>
          <span className="dot" /> Open to SDE roles &amp; freelance
        </a>

        <nav className="index" aria-label="Sections">
          {SECTIONS.map(([id, label], i) => (
            <a key={id} href={`#${id}`} onClick={go(id)} className={active === id ? 'on' : ''}>
              <span className="index-n">{String(i + 1).padStart(2, '0')}</span>
              <span className="index-bar" />
              <span className="index-t">{label}</span>
            </a>
          ))}
        </nav>

        <div className="side-foot">
          <div className="side-actions">
            <a className="btn btn--light" href={`mailto:${profile.email}`}><Icon name="mail" size={15} /> Email me</a>
            <a className="btn btn--ghost" href={profile.resume} target="_blank" rel="noreferrer"><Icon name="download" size={15} /> Resume</a>
          </div>
          <div className="side-social">
            {socials.map((s) => (
              <a key={s.id} href={s.url} target="_blank" rel="noreferrer" aria-label={s.name} title={s.name}>
                <img src={s.logo} alt="" width="18" height="18" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

function Label({ n, children }) {
  return <h2 className="label"><span>{n}</span>{children}</h2>
}

function About() {
  const facts = [
    { v: '4', l: 'products live' },
    { v: '15,515', l: 'offline library articles' },
    { v: '60%', l: 'less manual analysis' },
    { v: '11', l: 'verified certifications' },
  ]
  return (
    <section id="about" className="block">
      <Label n="01">About</Label>
      <p className="lead" data-reveal>
        I'm a full-stack developer who takes products from <em>idea to production</em> on my own — React and TypeScript on the front,
        FastAPI and PostgreSQL behind it, and AI where it earns its place.
      </p>
      <p className="body" data-reveal>
        Today that work is <strong>AETHEX</strong>, a medical workspace for India's doctors, hospitals and medical colleges, and <strong>Cadus</strong>,
        the clinical AI built into it. I'm the sole developer: I design the APIs and schema, build the apps, handle auth and payments, and run the releases.
        Before that I freelanced on web apps and data tooling, and I keep my fundamentals sharp on LeetCode and Codeforces.
      </p>
      <dl className="facts" data-reveal>
        {facts.map((f) => <div key={f.l}><dt>{f.v}</dt><dd>{f.l}</dd></div>)}
      </dl>
    </section>
  )
}

/* ── product visuals: drawn in CSS, built from each product's real modules ── */
function WardBoard() {
  const beds = 'oooofoocooofoooooofocooo'.split('')
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock-bar"><span /><span /><span /><em>AETHEX HC · Wards &amp; beds</em></div>
      <div className="mock-body ward">
        <ul className="ward-nav">
          {['OPD queue', 'Admissions', 'Wards & beds', 'Nursing station', 'Lab & imaging', 'Pharmacy', 'GST billing & UPI'].map((m, i) => (
            <li key={m} className={i === 2 ? 'on' : ''}>{m}</li>
          ))}
        </ul>
        <div className="ward-main">
          <div className="ward-head"><strong>General ward</strong><span className="legend"><i className="b-o" />Occupied <i className="b-f" />Free <i className="b-c" />Cleaning</span></div>
          <div className="beds">
            {beds.map((b, i) => <span key={i} className={`bed b-${b}`}>{String(i + 1).padStart(2, '0')}</span>)}
          </div>
        </div>
      </div>
    </div>
  )
}

function CadusChat() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock-bar"><span /><span /><span /><em>Cadus</em></div>
      <div className="mock-body chat">
        <div className="bubble q">Febrile neutropenia — what matters in the first hour?</div>
        <div className="answer">
          <div className="ans-head"><img src="/logos/cadus.svg" alt="" width="20" height="20" /> Cadus</div>
          <span className="sk" style={{ width: '92%' }} />
          <span className="sk" style={{ width: '78%' }} />
          <span className="sk" style={{ width: '85%' }} />
          <div className="ans-tags"><span>✓ Safety review</span><span>Sources · 4</span></div>
        </div>
      </div>
    </div>
  )
}

function Keys() {
  return (
    <div className="keys" aria-hidden="true">
      <kbd>Ctrl</kbd><b>+</b><kbd>Shift</kbd><b>+</b><kbd className="wide">Space</kbd>
    </div>
  )
}

function ProductHead({ p }) {
  return (
    <div className="p-head">
      <img src={p.logo} alt="" width="44" height="44" className="tile" />
      <div className="p-title">
        <h3>{p.title}</h3>
        <a href={p.links[0].url} target="_blank" rel="noreferrer" className="p-domain">{p.domain} <Icon name="external" size={13} /></a>
      </div>
      <span className="tag tag--live"><span className="dot" />{p.status}</span>
    </div>
  )
}

function Products() {
  const suite = by['aethex-suite']
  const cadus = by.cadus
  const desk = by['cadus-desktop']
  const web = by.aethex
  return (
    <section id="products" className="block">
      <Label n="02">Products</Label>

      <article className="product product--wide" data-reveal>
        <ProductHead p={suite} />
        <p className="p-desc">{suite.description}</p>
        <WardBoard />
        <dl className="p-stats">
          {suite.stats.map((s) => <div key={s.label}><dt>{s.value}</dt><dd>{s.label}</dd></div>)}
        </dl>
        <ul className="chips">{suite.tech.map((t) => <li key={t}>{t}</li>)}</ul>
      </article>

      <div className="pair">
        <article className="product" data-reveal>
          <ProductHead p={cadus} />
          <p className="p-desc">{cadus.description}</p>
          <CadusChat />
          <ul className="chips">{cadus.tech.map((t) => <li key={t}>{t}</li>)}</ul>
        </article>
        <article className="product" data-reveal>
          <ProductHead p={desk} />
          <p className="p-desc">{desk.description}</p>
          <div className="desk-visual">
            <Keys />
            <span className="desk-note">opens a new Cadus chat from any app</span>
          </div>
          <ul className="chips">{desk.tech.map((t) => <li key={t}>{t}</li>)}</ul>
        </article>
      </div>

      <a className="product product--row" href={web.links[0].url} target="_blank" rel="noreferrer" data-reveal>
        <img src={web.logo} alt="" width="44" height="44" className="tile" />
        <div>
          <h3>{web.title} <span className="muted">— {web.kicker}</span></h3>
          <p className="p-desc">{web.description}</p>
        </div>
        <Icon name="external" size={16} />
      </a>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="block">
      <Label n="03">Experience</Label>
      <ol className="list">
        {experience.map((x) => (
          <li key={x.id} className="item" data-reveal>
            <span className="item-when">{x.period}</span>
            <div>
              <h3>{x.title} <span className="at">· {x.org}</span></h3>
              <p>{x.description}</p>
              <ul className="chips">{x.tech.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          </li>
        ))}
      </ol>
      <a className="more" href={profile.resume} target="_blank" rel="noreferrer">View full résumé <Icon name="arrow" size={15} /></a>
    </section>
  )
}

function Earlier() {
  return (
    <section id="work" className="block">
      <Label n="04">Earlier work</Label>
      <ol className="list">
        {earlier.map((p) => (
          <li key={p.id}>
            <a className="item item--link" href={p.links[0].url} target="_blank" rel="noreferrer" data-reveal>
              <span className="item-when">{p.year}</span>
              <div>
                <h3>{p.title} <Icon name="external" size={14} className="item-arrow" /></h3>
                <span className="item-kicker">{p.kicker}</span>
                <p>{p.description}</p>
                <ul className="chips">{p.tech.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="block">
      <Label n="05">Skills</Label>
      <dl className="skills" data-reveal>
        {skills.map((g) => (
          <div key={g.id}>
            <dt>{g.title}</dt>
            <dd>{g.items.join(' · ')}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function Profiles() {
  const live = useLiveStats()
  return (
    <section id="profiles" className="block">
      <Label n="06">Coding profiles</Label>
      <div className="profiles" data-reveal>
        {['github', 'leetcode', 'codeforces'].map((k) => {
          const s = social[k]
          const st = live[k]
          return (
            <a key={k} href={s.url} target="_blank" rel="noreferrer" className="prof">
              <div className="prof-top"><img src={s.logo} alt="" width="28" height="28" className="tile" /><strong>{s.name}</strong><span className="live"><span className="dot" />live</span></div>
              <div className="prof-nums">
                {st === undefined && <span className="muted">Loading…</span>}
                {st === null && <span className="muted">@{s.handle}</span>}
                {st && st.map((x) => <div key={x.l}><b>{x.v}</b><small>{x.l}</small></div>)}
              </div>
            </a>
          )
        })}
      </div>
      <div className="also" data-reveal>
        <span>Also on</span>
        {['gfg', 'hackerrank', 'huggingface', 'codedex'].map((k) => (
          <a key={k} href={social[k].url} target="_blank" rel="noreferrer"><img src={social[k].logo} alt="" width="16" height="16" /> {social[k].name}</a>
        ))}
      </div>
    </section>
  )
}

function Credentials() {
  return (
    <section id="credentials" className="block">
      <Label n="07">Credentials</Label>
      <ul className="certs" data-reveal>
        {certifications.map((c) => (
          <li key={c.id}>
            <a href={c.url} target="_blank" rel="noreferrer">
              <img src={c.logo} alt="" width="56" height="36" loading="lazy" className="tile tile--wide" />
              <span className="cert-t"><strong>{c.title}</strong><small>{c.org}{c.year && ` · ${c.year}`}</small></span>
              <span className="verify">Verify <Icon name="external" size={12} /></span>
            </a>
          </li>
        ))}
      </ul>
      <h3 className="minor" data-reveal>Education</h3>
      <ul className="edu" data-reveal>
        {education.map((e) => (
          <li key={e.id}>
            <img src={e.logo} alt="" width="36" height="36" loading="lazy" className="tile" />
            <span><strong>{e.title}</strong><small>{e.org} · {e.place}{e.period && ` · ${e.period}`}</small></span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="block contact" data-reveal>
      <p className="contact-k">Contact</p>
      <h2>Let's build something <em>that ships.</em></h2>
      <p className="body">Hiring for an engineering role, or need a product built? I reply within a day.</p>
      <div className="contact-actions">
        <a className="btn btn--light" href={`mailto:${profile.email}`}><Icon name="mail" size={15} /> {profile.email}</a>
        <a className="btn btn--ghost" href={social.linkedin.url} target="_blank" rel="noreferrer"><img src={social.linkedin.logo} alt="" width="15" height="15" /> LinkedIn</a>
        <a className="btn btn--ghost" href={`tel:${profile.phone.replace(/\s/g, '')}`}><Icon name="phone" size={15} /> {profile.phone}</a>
      </div>
      <footer className="foot">
        <span>© {new Date().getFullYear()} Rahul Sangral · {profile.location}</span>
        <span>Built with React and Vite</span>
      </footer>
    </section>
  )
}

export default function App() {
  useReveal()
  return (
    <div className="shell">
      <Sidebar />
      <main className="content">
        <About />
        <Products />
        <Experience />
        <Earlier />
        <Skills />
        <Profiles />
        <Credentials />
        <Contact />
      </main>
    </div>
  )
}
