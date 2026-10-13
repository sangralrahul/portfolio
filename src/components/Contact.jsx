import { useState } from 'react'
import Icon from './Icons.jsx'
import { Reveal } from './Scroll.jsx'
import { FloatShapes, ScrollWord, Words } from './Deco.jsx'
import { profile, socials } from '../data.js'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || 'a visitor'}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <section className="section contact" id="contact">
      <ScrollWord word="CONTACT" dir={1} />
      <FloatShapes variant="d" />
      <div className="container contact-grid">
        <div>
          <Reveal className="section-head" y={24}>
            <span className="kicker kicker--dot">Contact</span>
            <h2><Words text="Let's build something that ships." /></h2>
            <p>Hiring for an SDE-1 / New Grad role, or need a product built end to end? I usually reply within 24 hours.</p>
          </Reveal>
          <div className="contact-list">
            <Reveal as="a" delay={0.05} href={`mailto:${profile.email}`} className="contact-row">
              <span className="fact-icon"><Icon name="mail" size={18} /></span>
              <div><small>Email</small><strong>{profile.email}</strong></div>
              <Icon name="arrow" size={16} className="contact-arrow" />
            </Reveal>
            <Reveal as="a" delay={0.1} href={`tel:${profile.phone.replace(/\s/g, '')}`} className="contact-row">
              <span className="fact-icon"><Icon name="phone" size={18} /></span>
              <div><small>Phone</small><strong>{profile.phone}</strong></div>
              <Icon name="arrow" size={16} className="contact-arrow" />
            </Reveal>
            <Reveal as="a" delay={0.15} href={socials[1].url} target="_blank" rel="noreferrer" className="contact-row">
              <span className="fact-icon"><Icon name="linkedin" size={18} /></span>
              <div><small>LinkedIn</small><strong>linkedin.com/in/rahul-sangral</strong></div>
              <Icon name="arrow" size={16} className="contact-arrow" />
            </Reveal>
            <Reveal as="a" delay={0.2} href={socials[0].url} target="_blank" rel="noreferrer" className="contact-row">
              <span className="fact-icon"><Icon name="github" size={18} /></span>
              <div><small>GitHub</small><strong>github.com/sangralrahul</strong></div>
              <Icon name="arrow" size={16} className="contact-arrow" />
            </Reveal>
          </div>
        </div>
        <Reveal as="form" delay={0.15} className="contact-form glow-border" onSubmit={submit}>
          <label className="field">
            <input required placeholder=" " value={form.name} onChange={set('name')} />
            <span>Your name</span>
          </label>
          <label className="field">
            <input required type="email" placeholder=" " value={form.email} onChange={set('email')} />
            <span>Email address</span>
          </label>
          <label className="field">
            <textarea required rows={5} placeholder=" " value={form.message} onChange={set('message')} />
            <span>What are you building?</span>
          </label>
          <button className="btn btn--primary btn--full" type="submit">
            Send message <Icon name="arrow" size={18} />
          </button>
          <small className="form-note">Opens your email client — nothing is stored.</small>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="monogram">RS</span>
          <div>
            <strong>Rahul Sangral</strong>
            <small>{profile.role}</small>
          </div>
        </div>
        <ul className="footer-links">
          {socials.map((s) => (
            <li key={s.id}><a href={s.url} target="_blank" rel="noreferrer">{s.name}</a></li>
          ))}
        </ul>
        <p className="footer-copy">© {new Date().getFullYear()} Rahul Sangral · {profile.location} · Built with React & Framer Motion</p>
      </div>
    </footer>
  )
}
