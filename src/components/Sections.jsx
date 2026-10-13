import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Icon from './Icons.jsx'
import ProjectImage from './ProjectImage.jsx'
import { CountUp, Reveal } from './Scroll.jsx'
import { Tilt } from './Live.jsx'
import { Words } from './Deco.jsx'
import { certifications, education, experience, profile, projects, skills, socials } from '../data.js'

export function SectionHead({ num, kicker, title, lede, align = 'left' }) {
  return (
    <Reveal className={`section-head section-head--${align}`} y={24}>
      <span className="kicker">{num && <b>{num}</b>}{kicker}</span>
      <h2><Words text={title} /></h2>
      {lede && <p>{lede}</p>}
      <motion.span className="rule" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }} />
    </Reveal>
  )
}

/* ── Stats band ─────────────────────────────────────────────── */
export function Stats() {
  const items = [
    { value: 3, suffix: '+', label: 'Years building software' },
    { value: 2, suffix: '', label: 'Live products shipped' },
    { value: 10, suffix: '+', label: 'Industry certifications' },
    { value: 60, suffix: '%', label: 'Faster analysis delivered' },
  ]
  return (
    <section className="stats">
      <div className="container stats-grid">
        {items.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="stat">
            <b><CountUp to={s.value} suffix={s.suffix} /></b>
            <span>{s.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ── About ──────────────────────────────────────────────────── */
export function About() {
  const facts = [
    { icon: 'briefcase', k: 'Current', v: 'Founding Software Engineer, Clavix Technologies (Aethex)' },
    { icon: 'cap', k: 'Education', v: 'BCA, Uttaranchal University · 2023–2026' },
    { icon: 'pin', k: 'Based in', v: `${profile.location} · open to relocation` },
    { icon: 'globe', k: 'Languages', v: profile.languages.join(', ') },
    { icon: 'clock', k: 'Availability', v: 'Immediate · remote or on-site' },
  ]
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <div>
          <SectionHead num="01" kicker="About" title="Engineer who owns the whole stack." />
          <Reveal delay={0.1}>
            <p className="prose">
              I'm a full-stack engineer and AI developer graduating in 2026. As the sole engineer at an early-stage SaaS company I design APIs, model data, build the React frontend, wire up auth and payments, and ship through CI/CD — the entire path from idea to production.
            </p>
            <p className="prose">
              My work leans on strong CS fundamentals and a product mindset: the AI tooling I've built cut manual analysis time by ~60% and reduced repetitive reporting by ~40%. I care about clean systems, measurable outcomes and shipping.
            </p>
          </Reveal>
          <div className="highlights">
            {[
              { t: 'End-to-end ownership', d: 'API design, data modelling, frontend, auth, payments and CI/CD — shipped alone, in production.' },
              { t: 'AI that moves numbers', d: 'LLM tooling that cut manual analysis ~60% and reporting requests ~40%.' },
              { t: 'Fundamentals first', d: 'DSA, DBMS, OS, networks and system design behind every product decision.' },
            ].map((h, i) => (
              <Reveal key={h.t} delay={0.15 + i * 0.08} className="highlight">
                <strong>{h.t}</strong>
                <p>{h.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={0.15} className="facts">
          {facts.map((f, i) => (
            <motion.div key={f.k} className="fact" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }}>
              <span className="fact-icon"><Icon name={f.icon} size={18} /></span>
              <div>
                <small>{f.k}</small>
                <strong>{f.v}</strong>
              </div>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ── Experience timeline ────────────────────────────────────── */
export function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const line = useSpring(scrollYProgress, { stiffness: 80, damping: 24 })
  return (
    <section className="section" id="experience">
      <div className="container">
        <SectionHead num="02" kicker="Experience" title="Where I've built things." lede="From freelance delivery to owning production at a startup." />
        <div className="timeline" ref={ref}>
          <div className="timeline-track"><motion.span style={{ scaleY: line }} /></div>
          {experience.map((e, i) => (
            <Reveal key={e.id} delay={0.05} className="tl-item">
              <span className={`tl-dot ${i === 0 ? "tl-dot--live" : ""}`} />
              <div className="tl-date">{e.period}</div>
              <Tilt max={2} className="tl-card-tilt">
                <div className="tl-card">
                  <div className="tl-head">
                    <div>
                      <h3>{e.title}</h3>
                      <p className="tl-org">{e.org} · {e.place}</p>
                    </div>
                    {i === 0 && <span className="badge badge--live">Current</span>}
                  </div>
                  <p className="tl-desc">{e.description}</p>
                  <ul className="chips">
                    {e.tech.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Projects ───────────────────────────────────────────────── */
export function Projects({ onOpen }) {
  const [featured, ...rest] = projects
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const artY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])
  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHead num="03" kicker="Selected work" title="Projects that shipped." lede="Production systems, AI tooling and data products — built end to end." />

        <Reveal className="featured" y={40}>
          <div className="featured-art" ref={ref} onClick={() => onOpen(featured)}>
            <motion.div style={{ y: artY }} className="featured-art-inner">
              <ProjectImage project={featured} big />
            </motion.div>
          </div>
          <div className="featured-body">
            <span className="badge badge--live">Live in production</span>
            <h3>{featured.title}</h3>
            <p>{featured.description}</p>
            <ul className="chips">{featured.tech.map((t) => <li key={t}>{t}</li>)}</ul>
            <div className="featured-actions">
              {featured.links.map((l) => (
                <a key={l.url} className="btn btn--primary" href={l.url} target="_blank" rel="noreferrer">
                  {l.label} <Icon name="external" size={16} />
                </a>
              ))}
              <button className="btn btn--ghost" onClick={() => onOpen(featured)}>
                Case study <Icon name="arrow" size={16} />
              </button>
            </div>
          </div>
        </Reveal>

        <div className="project-grid">
          {rest.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.1} className="project-reveal">
              <Tilt max={3} className="project-tilt">
                <article className="project" onClick={() => onOpen(p)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onOpen(p)}>
                  <div className="project-art">
                    <ProjectImage project={p} />
                  </div>
                  <div className="project-body">
                    <span className="kicker">{p.kicker}</span>
                    <h3>{p.title} <Icon name="arrow" size={18} className="project-arrow" /></h3>
                    <p>{p.description}</p>
                    <ul className="chips chips--sm">{p.tech.slice(0, 4).map((t) => <li key={t}>{t}</li>)}</ul>
                  </div>
                </article>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Skills ─────────────────────────────────────────────────── */
export function Skills() {
  return (
    <section className="section section--alt" id="skills">
      <div className="container">
        <SectionHead num="04" kicker="Capabilities" title="Tools I reach for." lede="A pragmatic stack for shipping web products and AI features." />
        <div className="skill-grid">
          {skills.map((g, i) => (
            <Reveal key={g.id} delay={(i % 3) * 0.08} className="skill-group">
              <div className="skill-head">
                <span className="skill-swatch" style={{ background: `linear-gradient(135deg, hsl(${g.hue[0]} 80% 55%), hsl(${g.hue[1]} 80% 40%))` }} />
                <h3>{g.title}</h3>
                <small>{g.items.length}</small>
              </div>
              <ul className="chips">
                {g.items.map((s, j) => (
                  <motion.li key={s} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 + j * 0.03 }}>
                    {s}
                  </motion.li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Certifications + Education ─────────────────────────────── */
export function Credentials() {
  return (
    <section className="section" id="certifications">
      <div className="container">
        <SectionHead num="05" kicker="Credentials" title="Certifications & education." />
        <div className="cert-grid">
          {certifications.map((c, i) => (
            <Reveal key={c.id} delay={(i % 4) * 0.06} className="cert">
              <span className="cert-icon" style={{ color: `hsl(${c.hue[0]} 85% 62%)` }}><Icon name="award" size={20} /></span>
              <div>
                <strong>{c.title}</strong>
                <small>{c.org}{c.year ? ` · ${c.year}` : ''}</small>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="edu-grid" id="education">
          {education.map((e, i) => (
            <Reveal key={e.id} delay={i * 0.1} className="edu">
              <span className="fact-icon"><Icon name="cap" size={20} /></span>
              <div>
                <strong>{e.title}</strong>
                <p>{e.org} · {e.place}</p>
                <small>{e.period || 'Completed'}</small>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Coding profiles strip ──────────────────────────────────── */
export function Profiles() {
  return (
    <section className="profiles">
      <div className="container">
        <Reveal className="profiles-row">
          <span className="kicker">Find me on</span>
          <div>
            {socials.map((s) => (
              <a key={s.id} href={s.url} target="_blank" rel="noreferrer">
                {s.name} <Icon name="external" size={12} />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
