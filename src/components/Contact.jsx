import { motion } from 'framer-motion'
import { useState } from 'react'
import Icon from './Icons.jsx'
import { profile, socials } from '../data.js'

const faqs = [
  { q: 'What roles is Rahul looking for?', a: 'SDE-1 / New Grad 2026 roles — full-stack, backend or AI engineering — plus freelance projects. Available immediately, remote or on-site.' },
  { q: 'What does Rahul build best?', a: 'Production web products end to end: React + TypeScript frontends, FastAPI/REST backends, PostgreSQL/Firestore data layers, auth, payments, CI/CD, and AI features like RAG pipelines and LLM tooling.' },
  { q: 'Has Rahul shipped real products?', a: 'Yes. He is the founding (and sole) engineer at Aethex, a live SaaS with subscriptions, role-based access and analytics — and the founder-engineer behind Zyphix.' },
  { q: 'How fast does Rahul reply?', a: 'Usually within 24 hours. Email is fastest.' },
]

export default function Contact() {
  const [email, setEmail] = useState('')
  const [open, setOpen] = useState(null)

  const submit = (e) => {
    e.preventDefault()
    const body = `Hi Rahul,%0D%0A%0D%0AI saw your portfolio and would like to talk.%0D%0A%0D%0A— ${encodeURIComponent(email)}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Let's work together")}&body=${body}`
  }

  return (
    <section className="contact" id="contact">
      <div className="contact-hero">
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          Unlimited ideas, shipped products, and more.
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          Ready to build? Enter your email to start the conversation.
        </motion.p>
        <motion.form className="contact-form" onSubmit={submit} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <label className="float-input">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder=" " />
            <span>Email address</span>
          </label>
          <button className="btn btn--red" type="submit">
            Get Started <Icon name="right" size={22} />
          </button>
        </motion.form>

        <div className="contact-cards">
          <a href={`mailto:${profile.email}`} className="contact-card">
            <Icon name="mail" size={22} />
            <span>Email</span>
            <b>{profile.email}</b>
          </a>
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="contact-card">
            <Icon name="phone" size={22} />
            <span>Phone</span>
            <b>{profile.phone}</b>
          </a>
          <div className="contact-card">
            <Icon name="pin" size={22} />
            <span>Location</span>
            <b>{profile.location}</b>
          </div>
          <a href={socials[1].url} target="_blank" rel="noreferrer" className="contact-card">
            <Icon name="linkedin" size={22} />
            <span>LinkedIn</span>
            <b>rahul-sangral</b>
          </a>
        </div>
      </div>

      <div className="faq">
        <h2>Frequently Asked Questions</h2>
        {faqs.map((f, i) => (
          <div key={f.q} className={`faq-item ${open === i ? 'is-open' : ''}`}>
            <button onClick={() => setOpen(open === i ? null : i)}>
              {f.q}
              <Icon name="plus" size={30} strokeWidth={1.5} />
            </button>
            <div className="faq-a">
              <p>{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Footer() {
  const cols = [
    socials.slice(0, 2),
    socials.slice(2, 4),
    socials.slice(4, 6),
    socials.slice(6, 8),
  ]
  return (
    <footer className="footer">
      <div className="footer-social">
        <a href={socials[0].url} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" size={24} /></a>
        <a href={socials[1].url} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" size={24} /></a>
        <a href={`mailto:${profile.email}`} aria-label="Email"><Icon name="mail" size={24} /></a>
      </div>
      <div className="footer-grid">
        {cols.map((c, i) => (
          <ul key={i}>
            {c.map((s) => (
              <li key={s.id}>
                <a href={s.url} target="_blank" rel="noreferrer">{s.name}</a>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <a className="footer-code" href={profile.resume} target="_blank" rel="noreferrer">Download Resume</a>
      <p>© {new Date().getFullYear()} Rahul Sangral · Jammu, India · English · हिन्दी · डोगरी</p>
    </footer>
  )
}
