import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Icon from './Icons.jsx'
import ProjectImage from './ProjectImage.jsx'
import { CountUp, Reveal } from './Scroll.jsx'
import { Tilt } from './Live.jsx'
import { Words } from './Deco.jsx'
import { certifications, education, experience, profile, projects, skills, socials } from '../data.js'

export function Logo({ src, alt, size = 40, className = '' }) {
  return (
    <span className={`logo-tile ${className}`} style={{ width: size, height: size }}>
      <img src={src} alt={alt} loading="lazy" />
    </span>
  )
}

export function SectionHead({ num, kicker, title, lede, align = 'left' }) {
  return (
    <Reveal className={`section-head section-head--${align}`} y={24}>
      <span className="kicker">{num && <b>Chapter {num}</b>}{kicker}</span>
      <h2><Words text={title} /></h2>
      {lede && <p>{lede}</p>}
    </Reveal>
  )
}

/* ── Stats ──────────────────────────────────────────────────── */
export function Stats() {
  return null
}

/* ── About: bento grid ──────────────────────────────────────── */
export function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHead num="01" kicker="About" title="Engineer who owns the whole stack." lede="One person, the entire path from idea to production." />
        <div className="bento">
          <Reveal className="bento-cell bento-bio glass" delay={0}>
            <span className="cell-kicker">Who I am</span>
            <p className="prose">
              I'm a full-stack engineer and AI developer graduating in 2026. As the sole engineer at an early-stage SaaS company I design APIs, model data, build the React frontend, wire up auth and payments, and ship through CI/CD.
            </p>
            <p className="prose">
              My work leans on strong CS fundamentals and a product mindset. The AI tooling I've built cut manual analysis time by ~60% and reduced repetitive reporting by ~40%.
            </p>
            <div className="about-tags">
              {['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Firebase', 'AWS', 'Claude API', 'RAG'].map((t) => <span key={t}>{t}</span>)}
            </div>
          </Reveal>

          <Reveal className="bento-cell bento-stat glass" delay={0.05}>
            <b className="grad-text"><CountUp to={3} suffix="+" /></b>
            <span>Years building software</span>
          </Reveal>
          <Reveal className="bento-cell bento-stat glass" delay={0.1}>
            <b className="grad-text"><CountUp to={60} suffix="%" /></b>
            <span>Faster analysis with my AI tooling</span>
          </Reveal>

          <Reveal className="bento-cell bento-current glass" delay={0.15}>
            <Logo src="/logos/aethex.webp" alt="Aethex" size={48} />
            <div>
              <span className="cell-kicker">Currently</span>
              <strong>Founding Software Engineer</strong>
              <small>Clavix Technologies · Aethex · Nov 2025 – Present</small>
            </div>
            <span className="badge badge--live">Live</span>
          </Reveal>

          <Reveal className="bento-cell bento-stat glass" delay={0.2}>
            <b className="grad-text"><CountUp to={2} /></b>
            <span>Live products shipped solo</span>
          </Reveal>
          <Reveal className="bento-cell bento-stat glass" delay={0.25}>
            <b className="grad-text"><CountUp to={40} suffix="%" /></b>
            <span>Fewer manual reporting requests</span>
          </Reveal>

          <Reveal className="bento-cell bento-edu glass" delay={0.3}>
            <Logo src="/logos/uttaranchal.webp" alt="Uttaranchal University" size={48} />
            <div>
              <span className="cell-kicker">Education</span>
              <strong>BCA · Uttaranchal University</strong>
              <small>Dehradun · 2023 – 2026</small>
            </div>
          </Reveal>

          <Reveal className="bento-cell bento-facts glass" delay={0.35}>
            <div className="fact-line"><Icon name="pin" size={16} /><span>{profile.location} · open to relocation</span></div>
            <div className="fact-line"><Icon name="globe" size={16} /><span>{profile.languages.join(' · ')}</span></div>
            <div className="fact-line"><Icon name="clock" size={16} /><span>Available immediately · replies within 24h</span></div>
            <div className="fact-line"><Icon name="mail" size={16} /><a href={`mailto:${profile.email}`}>{profile.email}</a></div>
          </Reveal>
        </div>
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
    <section className="section section--glow" id="experience">
      <div className="container">
        <SectionHead num="02" kicker="Experience" title="Where I've built things." lede="From freelance delivery to owning production at a startup." />
        <div className="timeline" ref={ref}>
          <div className="timeline-track"><motion.span style={{ scaleY: line }} /></div>
          {experience.map((e, i) => (
            <Reveal key={e.id} delay={0.05} className="tl-item">
              <span className={`tl-dot ${i === 0 ? 'tl-dot--live' : ''}`} />
              <div className="tl-date">{e.period}</div>
              <Tilt max={2} className="tl-card-tilt">
                <div className={`tl-card glass ${i === 0 ? 'glow-border' : ''}`}>
                  <div className="tl-head">
                    {e.logo ? <Logo src={e.logo} alt={e.org} size={46} /> : <span className="logo-tile logo-tile--ghost" style={{ width: 46, height: 46 }}><Icon name="briefcase" size={20} /></span>}
                    <div className="tl-head-text">
                      <h3>{e.title}</h3>
                      <p className="tl-org">{e.org} · {e.place}</p>
                    </div>
                    {i === 0 && <span className="badge badge--live">Current</span>}
                  </div>
                  <p className="tl-desc">{e.description}</p>
                  <ul className="chips">{e.tech.map((t) => <li key={t}>{t}</li>)}</ul>
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

        <Reveal className="featured glass glow-border" y={40}>
          <div className="featured-art" ref={ref} onClick={() => onOpen(featured)}>
            <motion.div style={{ y: artY }} className="featured-art-inner">
              <ProjectImage project={featured} big />
            </motion.div>
          </div>
          <div className="featured-body">
            <span className="badge badge--live">Live in production</span>
            <div className="title-row">
              {featured.logo && <Logo src={featured.logo} alt={featured.title} size={48} />}
              <h3>{featured.title}</h3>
            </div>
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
              <Tilt max={4} className="project-tilt">
                <article className="project glass" style={{ '--h1': p.hue[0], '--h2': p.hue[1] }} onClick={() => onOpen(p)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onOpen(p)}>
                  <div className="project-art">
                    <ProjectImage project={p} />
                  </div>
                  <div className="project-body">
                    <span className="kicker">{p.kicker}</span>
                    <div className="title-row">
                      {p.logo && <Logo src={p.logo} alt={p.title} size={34} />}
                      <h3>{p.title} <Icon name="arrow" size={18} className="project-arrow" /></h3>
                    </div>
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
    <section className="section section--glow" id="skills">
      <div className="container">
        <SectionHead num="04" kicker="Capabilities" title="Tools I reach for." lede="A pragmatic stack for shipping web products and AI features." />
        <div className="skill-grid">
          {skills.map((g, i) => (
            <Reveal key={g.id} delay={(i % 3) * 0.08} className="skill-group glass" style={{ '--h1': g.hue[0], '--h2': g.hue[1] }}>
              <div className="skill-head">
                <span className="skill-swatch" />
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
        <SectionHead num="06" kicker="Credentials" title="Certifications & education." lede="Every certificate links to its verification page." />
        <div className="cert-grid">
          {certifications.map((c, i) => (
            <Reveal key={c.id} as="a" delay={(i % 3) * 0.06} className="cert glass" href={c.url} target="_blank" rel="noreferrer">
              <Logo src={c.logo} alt={c.org} size={52} />
              <div className="cert-text">
                <strong>{c.title}</strong>
                <small>{c.org}{c.year ? ` · ${c.year}` : ''}</small>
              </div>
              <span className="cert-verify">Verify <Icon name="external" size={13} /></span>
            </Reveal>
          ))}
        </div>
        <div className="edu-grid" id="education">
          {education.map((e, i) => (
            <Reveal key={e.id} delay={i * 0.1} className="edu glass">
              <Logo src={e.logo} alt={e.org} size={56} />
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

/* ── Coding profiles ────────────────────────────────────────── */
export function Profiles() {
  return (
    <section className="profiles">
      <div className="container">
        <Reveal className="profiles-row glass">
          <span className="kicker">Find me on</span>
          <div>
            {socials.map((s) => (
              <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="profile-link">
                <Logo src={s.logo} alt={s.name} size={28} />
                {s.name}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
