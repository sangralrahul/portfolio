import { motion } from 'framer-motion'
import { useEffect } from 'react'
import Icon from './Icons.jsx'
import Poster from './Poster.jsx'
import ProjectImage from './ProjectImage.jsx'
import { profile, projects } from '../data.js'

const details = {
  aethex: {
    problem: 'An early-stage company needed a complete SaaS product — auth, roles, billing, analytics — with a single engineer and a tight runway.',
    approach: [
      'Designed a modular FastAPI backend with a clean PostgreSQL schema and Firestore for real-time data.',
      'Implemented Firebase Auth with role-based access control across the React + TypeScript frontend.',
      'Integrated Razorpay subscriptions with webhook verification, plus GA4 product analytics.',
      'Set up CI/CD on Vercel and Railway so every merge to main deploys automatically.',
    ],
    outcome: 'A production platform live at aethex.in, owned end to end by one engineer.',
  },
  zyphix: {
    problem: 'Turn an idea into a deployable product with a maintainable architecture from day one.',
    approach: [
      'Modular REST API design with a normalized SQL schema.',
      'React interface with reusable component patterns and TypeScript throughout.',
      'Automated CI/CD so releases are a push, not a process.',
    ],
    outcome: 'Live at zyphix.in — designed, built and deployed solo.',
  },
  sqlfixenv: {
    problem: 'Developers lose time deciphering cryptic SQL errors. Built for the Meta × Hugging Face PyTorch OpenEnv Hackathon.',
    approach: [
      'Environment that captures failing SQL, classifies the error and explains it in plain language.',
      'LLM-generated corrected queries, served over a FastAPI interface.',
      'Published on Hugging Face for the community.',
    ],
    outcome: 'An AI dev tool that explains and fixes SQL mistakes.',
  },
  insights: {
    problem: 'Analysts spent hours manually summarizing spreadsheets before any real work could start.',
    approach: [
      'FastAPI backend ingests CSV/Excel via Pandas and profiles the data.',
      'LLM layer produces narrative summaries, chart specs and anomaly alerts.',
    ],
    outcome: 'Cut manual analysis time by roughly 60%.',
  },
  kpi: {
    problem: 'Teams filed the same reporting requests repeatedly against live SQL data.',
    approach: [
      'Python pipeline feeding live SQL into Tableau with drill-down filters.',
      'Self-serve dashboard so stakeholders answer their own questions.',
    ],
    outcome: 'Reduced repetitive reporting requests by about 40%.',
  },
}

export default function ProjectModal({ project, onClose, onOpen }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const d = details[project.id] || {}
  const others = projects.filter((p) => p.id !== project.id).slice(0, 3)

  return (
    <motion.div className="modal-overlay" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close"><Icon name="close" size={20} /></button>
        <div className="modal-banner">
          <ProjectImage project={project} big />
          <div className="modal-banner-fade" />
          <div className="modal-banner-copy">
            <span className="kicker">{project.kicker}</span>
            <div className="title-row">
              {project.logo && <span className="logo-tile" style={{ width: 56, height: 56 }}><img src={project.logo} alt="" /></span>}
              <h2>{project.title}</h2>
            </div>
          </div>
        </div>
        <div className="modal-body">
          <div className="modal-actions">
            {project.links.map((l, i) => (
              <a key={l.url} className={`btn ${i === 0 ? 'btn--primary' : 'btn--ghost'}`} href={l.url} target="_blank" rel="noreferrer">
                {l.label} <Icon name="external" size={16} />
              </a>
            ))}
          </div>
          <div className="modal-cols">
            <div>
              <h4>Problem</h4>
              <p>{d.problem}</p>
              <h4>Approach</h4>
              <ul className="bullets">{(d.approach || []).map((a) => <li key={a}>{a}</li>)}</ul>
              <h4>Outcome</h4>
              <p className="outcome">{d.outcome}</p>
            </div>
            <aside>
              <h4>Stack</h4>
              <ul className="chips">{project.tech.map((t) => <li key={t}>{t}</li>)}</ul>
              <h4>Role</h4>
              <p>{project.kicker.split(' · ')[0]}</p>
              <h4>Year</h4>
              <p>{project.year}</p>
              <h4>Contact</h4>
              <p><a href={`mailto:${profile.email}`}>{profile.email}</a></p>
            </aside>
          </div>
          <h4 className="more-title">More projects</h4>
          <div className="more-grid">
            {others.map((p) => (
              <button key={p.id} className="more-card" onClick={() => onOpen(p)}>
                <Poster id={p.id} hue={p.hue} badge={false} />
                <strong>{p.title}</strong>
                <small>{p.kicker}</small>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
