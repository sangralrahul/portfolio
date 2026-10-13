import { motion } from 'framer-motion'
import { useState } from 'react'
import Icon from './Icons.jsx'
import { viewers } from '../data.js'

export function Avatar({ viewer, size = 'lg' }) {
  const [h1, h2] = viewer.hue
  return (
    <span
      className={`avatar avatar--${size}`}
      style={{ background: `linear-gradient(140deg, hsl(${h1} 85% 52%), hsl(${h2} 80% 32%))` }}
    >
      <Icon name={viewer.icon} size={size === 'lg' ? 64 : 18} strokeWidth={size === 'lg' ? 1.6 : 2} />
    </span>
  )
}

export default function ProfileGate({ onPick }) {
  const [picked, setPicked] = useState(null)

  const choose = (v) => {
    if (picked) return
    setPicked(v.id)
    setTimeout(() => onPick(v), 650)
  }

  return (
    <motion.div
      className="gate"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08, transition: { duration: 0.45 } }}
    >
      <div className="gate-logo">RAHUL SANGRAL</div>
      <motion.h1
        className="gate-title"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      >
        Who's watching?
      </motion.h1>
      <div className="gate-list">
        {viewers.map((v, i) => (
          <motion.button
            key={v.id}
            className={`gate-item ${picked === v.id ? 'is-picked' : ''} ${picked && picked !== v.id ? 'is-dim' : ''}`}
            onClick={() => choose(v)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.09, duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <Avatar viewer={v} />
            <span className="gate-name">{v.name}</span>
          </motion.button>
        ))}
      </div>
      <motion.p className="gate-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
        Pick a profile — each one curates the portfolio differently. Turn your sound on for the full intro.
      </motion.p>
    </motion.div>
  )
}
