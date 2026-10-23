import { useEffect, useRef, useState } from 'react'
import Icon from '../components/Icons.jsx'
import { useLiveStats, useReveal } from '../site/live.js'
import { caseStudies, certifications, education, experience, profile, projects, skills, socials } from '../data.js'
import '@fontsource-variable/inter'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import './editorial.css'

const by = Object.fromEntries(projects.map((p) => [p.id, p]))
const social = Object.fromEntries(socials.map((s) => [s.id, s]))
const shipping = projects.filter((p) => p.domain)
const earlier = projects.filter((p) => !p.domain)
const NAV = [['work', 'Work'], ['experience', 'Experience'], ['skills', 'Skills'], ['credentials', 'Credentials'], ['contact', 'Contact']]
const EDITION = new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })

const go = (id) => (e) => {
  e?.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Serif "R." monogram — same artwork as /brand/r-mark.svg. */
function Mark({ size = 36 }) {
  return <img src="/brand/r-mark.svg" alt="" width={size} height={size} className="mark" />
}

function Masthead() {
  const [solid, setSolid] = useState(false)
  const bar = useRef(null)
  useEffect(() => {
    let tick = false
    const on = () => {
      if (tick) return
      tick = true
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
        setSolid(window.scrollY > 40)
        tick = false
      })
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={`mast ${solid ? 'mast--solid' : ''}`}>
      <div className="wrap mast-row">
        <a href="#top" onClick={go('top')} className="brand"><Mark size={34} /><span>Rahul Sangral</span></a>
        <nav className="mast-nav">{NAV.map(([id, l]) => <a key={id} href={`#${id}`} onClick={go(id)} className="u-link">{l}</a>)}</nav>
        <div className="mast-end">
          <a className="u-link hide-sm" href={profile.resume} target="_blank" rel="noreferrer">Résumé</a>
          <a className="btn btn--ink btn--sm" href={`mailto:${profile.email}`}>Hire me</a>
        </div>
      </div>
      <span className="progress" ref={bar} aria-hidden="true" />
    </header>
  )
}

function Hero() {
  return (
    <section className="hero wrap" id="top">
      <div className="id-row" data-reveal>
        <Mark size={64} />
        <div className="id-txt">
          <p className="id-name">Rahul Sangral</p>
          <p className="id-role">Full-stack developer · Founder, AETHEX</p>
        </div>
        <span className="avail"><span className="dot" />Open to SDE roles &amp; freelance</span>
      </div>

      <div className="hero-grid">
        <div className="hero-copy">
          <h1 data-reveal>I build <em>AI products</em> for healthcare — and ship them, end to end.</h1>
          <p className="lede" data-reveal>
            Founder of <b>AETHEX</b>, a medical workspace for India's doctors, hospitals and medical colleges, and of <b>Cadus</b>, the clinical AI built into it.
            I design the APIs and data, build the web and desktop apps, and run the releases — React, TypeScript, FastAPI, PostgreSQL and AI.
          </p>
          <div className="actions" data-reveal>
            <a className="btn btn--ink" href={`mailto:${profile.email}`}><Icon name="mail" size={15} /> Hire me</a>
            <a className="btn btn--line" href={profile.resume} target="_blank" rel="noreferrer"><Icon name="download" size={15} /> Download CV</a>
            <a className="u-link see" href="#work" onClick={go('work')}>See case studies <Icon name="arrow" size={14} /></a>
          </div>
        </div>
        <aside className="current" data-reveal>
          <h2 className="small-caps">Currently shipping</h2>
          <ol>
            {shipping.map((p, i) => (
              <li key={p.id}>
                <a href={p.links[0].url} target="_blank" rel="noreferrer">
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <img src={p.logo} alt="" width="30" height="30" className="cur-logo" />
                  <span className="cur-t"><strong>{p.title}</strong><small>{p.domain}</small></span>
                  <span className="cur-s"><span className="dot" />{p.status}</span>
                </a>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  )
}

const GLANCE = [
  { k: 'Experience', v: '3+ years', d: 'building since 2023' },
  { k: 'Shipped', v: '4 products', d: 'live on web and desktop' },
  { k: 'Focus', v: 'Full-stack + AI', d: 'healthcare products' },
  { k: 'Core stack', v: 'React · FastAPI', d: 'TypeScript, PostgreSQL, Python' },
  { k: 'Education', v: 'BCA', d: 'Uttaranchal University' },
  { k: 'Based in', v: 'Jammu, India', d: 'remote or on-site' },
]

function Glance() {
  return (
    <section className="glance wrap" aria-label="At a glance">
      <h2 className="small-caps" data-reveal>At a glance</h2>
      <dl className="glance-grid" data-reveal>
        {GLANCE.map((g) => (
          <div key={g.k}><dt>{g.k}</dt><dd><strong>{g.v}</strong><span>{g.d}</span></dd></div>
        ))}
      </dl>
    </section>
  )
}

function Chapter({ id, n, title, note, children }) {
  return (
    <section className="chapter wrap" id={id}>
      <header className="ch-head" data-reveal>
        <span className="ch-n">№ {n}</span>
        <h2>{title}</h2>
        {note && <p>{note}</p>}
      </header>
      {children}
    </section>
  )
}

function Feature({ id, fig, flip }) {
  const p = by[id]
  const c = caseStudies[id]
  const [i, setI] = useState(0)
  return (
    <article className={`feature ${flip ? 'feature--flip' : ''}`}>
      <figure className="plate" data-reveal>
        <div className="device">
          <div className="device-bar"><span /><span /><span /><em>{p.domain}</em></div>
          <div className="device-img"><img src={c.shots[i].src} alt={c.shots[i].label} loading="lazy" decoding="async" /></div>
        </div>
        <figcaption>
          <span>Fig. {fig}{c.shots.length > 1 ? String.fromCharCode(97 + i) : ''} — {c.shots[i].label}</span>
          {c.shots.length > 1 && (
            <span className="plate-tabs" role="tablist">
              {c.shots.map((s, k) => (
                <button key={s.src} role="tab" aria-selected={k === i} className={k === i ? 'on' : ''} onClick={() => setI(k)}>{s.label.split(' · ')[0].replace('AETHEX ', '')}</button>
              ))}
            </span>
          )}
        </figcaption>
      </figure>
      <div className="story" data-reveal>
        <div className="story-head">
          <img src={p.logo} alt="" width="40" height="40" className="logo" />
          <div>
            <h3>{p.title}</h3>
            <a href={p.links[0].url} target="_blank" rel="noreferrer">{p.domain} <Icon name="external" size={12} /></a>
          </div>
        </div>
        <dl className="meta">
          <div><dt>Role</dt><dd>{c.role}</dd></div>
          <div><dt>Year</dt><dd>{p.year}</dd></div>
          <div><dt>Status</dt><dd><span className="dot" />{p.status}</dd></div>
        </dl>
        {(c.stats || p.stats) && (
          <dl className="kpis">
            {(c.stats || p.stats).map((k) => <div key={k.label}><dt>{k.value}</dt><dd>{k.label}</dd></div>)}
          </dl>
        )}
        <h4 className="small-caps">The problem</h4>
        <p>{c.problem}</p>
        <h4 className="small-caps">What I built</h4>
        <p>{c.built}</p>
        <h4 className="small-caps">Outcome</h4>
        <p>{c.outcome}</p>
        <p className="stack">{p.tech.join(' · ')}</p>
      </div>
    </article>
  )
}

function Work() {
  const web = by.aethex
  return (
    <Chapter id="work" n="01" title={<>Selected <em>work</em></>} note="Case studies of products I designed, built and shipped myself. Every figure is a screenshot of the live product.">
      <Feature id="aethex-suite" fig={1} />
      <Feature id="cadus" fig={2} flip />
      <Feature id="cadus-desktop" fig={3} />
      <article className="feature feature--small">
        <figure className="plate" data-reveal>
          <div className="device">
            <div className="device-bar"><span /><span /><span /><em>aethex.in</em></div>
            <div className="device-img"><img src="/shots/aethex-web.webp" alt="aethex.in" loading="lazy" width="428" height="326" /></div>
          </div>
          <figcaption><span>Fig. 4 — aethex.in</span></figcaption>
        </figure>
        <div className="story" data-reveal>
          <div className="story-head">
            <img src={web.logo} alt="" width="40" height="40" className="logo" />
            <div><h3>{web.title}</h3><a href={web.links[0].url} target="_blank" rel="noreferrer">{web.domain} <Icon name="external" size={12} /></a></div>
          </div>
          <p>{web.description}</p>
          <p className="stack">{web.tech.join(' · ')}</p>
        </div>
      </article>

      <h3 className="sub small-caps" data-reveal>Earlier projects</h3>
      <div className="index" role="list">
        {earlier.map((p) => (
          <a key={p.id} href={p.links[0].url} target="_blank" rel="noreferrer" className="index-row" role="listitem" data-reveal>
            <span className="ix-year">{p.year}</span>
            <span className="ix-title">{p.title}</span>
            <span className="ix-desc">{p.description}</span>
            <span className="ix-stack">{p.tech.slice(0, 3).join(' · ')}</span>
            <Icon name="external" size={15} className="ix-go" />
          </a>
        ))}
      </div>
    </Chapter>
  )
}

function Experience() {
  return (
    <Chapter id="experience" n="02" title="Experience">
      <ol className="xp">
        {experience.map((x) => (
          <li key={x.id} data-reveal>
            <span className="xp-when">{x.period}<small>{x.place}</small></span>
            <div className="xp-body">
              <h3>{x.title}</h3>
              <span className="xp-org">{x.org}</span>
              <p>{x.description}</p>
              <p className="stack">{x.tech.join(' · ')}</p>
            </div>
          </li>
        ))}
      </ol>
    </Chapter>
  )
}

function Skills({ live }) {
  return (
    <Chapter id="skills" n="03" title={<>Skills &amp; <em>practice</em></>}>
      <dl className="skills" data-reveal>
        {skills.map((g) => (
          <div key={g.id}><dt>{g.title}</dt><dd>{g.items.join(', ')}</dd></div>
        ))}
      </dl>
      <h3 className="sub small-caps" data-reveal>Coding profiles · live</h3>
      <div className="profiles" data-reveal>
        {['github', 'leetcode', 'codeforces'].map((k) => {
          const s = social[k]
          const st = live[k]
          return (
            <a key={k} href={s.url} target="_blank" rel="noreferrer" className="prof">
              <span className="prof-name"><img src={s.logo} alt="" width="20" height="20" /> {s.name} <small>@{s.handle}</small></span>
              <span className="prof-nums">
                {st ? st.map((x) => <span key={x.l}><b>{x.v}</b><small>{x.l}</small></span>) : <span><b>—</b><small>{st === null ? 'open the profile' : 'loading'}</small></span>}
              </span>
            </a>
          )
        })}
      </div>
      <p className="also" data-reveal>
        Also on {['gfg', 'hackerrank', 'huggingface', 'codedex'].map((k, i, a) => (
          <span key={k}><a href={social[k].url} target="_blank" rel="noreferrer">{social[k].name}</a>{i < a.length - 2 ? ', ' : i === a.length - 2 ? ' and ' : '.'}</span>
        ))}
      </p>
    </Chapter>
  )
}

function Credentials() {
  return (
    <Chapter id="credentials" n="04" title="Credentials" note="Each certificate links to the issuer's own verification page.">
      <div className="certs" role="list">
        {certifications.map((c) => (
          <a key={c.id} href={c.url} target="_blank" rel="noreferrer" className="cert" role="listitem" data-reveal>
            <span className="cert-logo"><img src={c.logo} alt="" loading="lazy" /></span>
            <span className="cert-title">{c.title}</span>
            <span className="cert-org">{c.org}</span>
            <span className="cert-year">{c.year || '—'}</span>
            <span className="cert-go">Verify <Icon name="external" size={12} /></span>
          </a>
        ))}
      </div>
      <h3 className="sub small-caps" data-reveal>Education</h3>
      <div className="edu">
        {education.map((e) => (
          <div key={e.id} className="edu-i" data-reveal>
            <img src={e.logo} alt="" width="44" height="44" className="logo" loading="lazy" />
            <div><strong>{e.title}</strong><small>{e.org} · {e.place}{e.period && ` · ${e.period}`}</small></div>
          </div>
        ))}
      </div>
    </Chapter>
  )
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <span className="ch-n" data-reveal>№ 05</span>
        <h2 data-reveal>Let's build something <em>that ships.</em></h2>
        <a className="big-mail" href={`mailto:${profile.email}`} data-reveal>{profile.email} <Icon name="arrow" size={28} /></a>
        <div className="contact-row" data-reveal>
          <a href={social.linkedin.url} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={social.github.url} target="_blank" rel="noreferrer">GitHub</a>
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
          <a href={profile.resume} target="_blank" rel="noreferrer">Résumé (PDF)</a>
        </div>
      </div>
      <footer className="wrap colophon">
        <span className="col-brand"><Mark size={28} /> © {new Date().getFullYear()} Rahul Sangral</span>
        <span>Set in Instrument Serif &amp; Inter · Built with React</span>
      </footer>
    </section>
  )
}

export default function App() {
  useReveal()
  const live = useLiveStats()
  return (
    <>
      <Masthead />
      <main>
        <Hero />
        <Glance />
        <Work />
        <Experience />
        <Skills live={live} />
        <Credentials />
        <Contact />
      </main>
    </>
  )
}
