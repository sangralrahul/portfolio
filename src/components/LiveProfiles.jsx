import { useEffect, useState } from 'react'
import Icon from './Icons.jsx'
import { Reveal } from './Scroll.jsx'
import { Tilt } from './Live.jsx'
import { SectionHead, Logo } from './Sections.jsx'
import { socials } from '../data.js'

const H = { github: 'sangralrahul', leetcode: 'rahulsangral', codeforces: 'rahulsangral', gfg: 'rahulsangral', hackerrank: 'rahulsangral', huggingface: 'sangralrahul', codedex: 'rahulsangral' }

async function j(url) {
  const r = await fetch(url)
  if (!r.ok) throw new Error(r.status)
  return r.json()
}

function useLive() {
  const [d, setD] = useState({})
  useEffect(() => {
    let alive = true
    const set = (k, v) => alive && setD((x) => ({ ...x, [k]: v }))
    j(`https://api.github.com/users/${H.github}`)
      .then((g) => set('github', [{ v: g.public_repos, l: 'Repos' }, { v: g.followers, l: 'Followers' }, { v: g.public_gists, l: 'Gists' }]))
      .catch(() => set('github', null))
    j(`https://codeforces.com/api/user.info?handles=${H.codeforces}`)
      .then((c) => { const u = c.result[0]; set('codeforces', [{ v: u.rating ?? '—', l: 'Rating' }, { v: u.maxRating ?? '—', l: 'Max' }, { v: u.rank ? u.rank.replace(/^\w/, (m) => m.toUpperCase()) : 'Unrated', l: 'Rank' }]) })
      .catch(() => set('codeforces', null))
    j(`https://leetcode-stats-api.herokuapp.com/${H.leetcode}`)
      .then((l) => { if (l.status !== 'success') throw 0; set('leetcode', [{ v: l.totalSolved, l: 'Solved' }, { v: l.easySolved, l: 'Easy' }, { v: l.mediumSolved, l: 'Medium' }, { v: l.hardSolved, l: 'Hard' }]) })
      .catch(() => j(`https://alfa-leetcode-api.onrender.com/${H.leetcode}/solved`).then((l) => set('leetcode', [{ v: l.solvedProblem, l: 'Solved' }, { v: l.easySolved, l: 'Easy' }, { v: l.mediumSolved, l: 'Medium' }, { v: l.hardSolved, l: 'Hard' }])).catch(() => set('leetcode', null)))
    return () => { alive = false }
  }, [])
  return d
}

function Stat({ v, l }) {
  return (
    <div className="live-stat">
      <b>{v ?? '—'}</b>
      <span>{l}</span>
    </div>
  )
}

export default function LiveProfiles() {
  const live = useLive()
  const by = Object.fromEntries(socials.map((s) => [s.id, s]))
  const cards = [
    { s: by.github, key: 'github', note: 'Live via GitHub API', img: `https://ghchart.rshah.org/8b9bff/${H.github}`, imgAlt: 'GitHub contribution graph' },
    { s: by.leetcode, key: 'leetcode', note: 'Live via LeetCode', img: `https://leetcard.jacoblin.cool/${H.leetcode}?theme=dark&font=Manrope&ext=heatmap`, imgAlt: 'LeetCode stats card' },
    { s: by.codeforces, key: 'codeforces', note: 'Live via Codeforces API' },
  ]
  const rest = [by.gfg, by.hackerrank, by.huggingface, by.codedex]

  return (
    <section className="section section--glow" id="live">
      <div className="container">
        <SectionHead num="05" kicker="Live coding profiles" title="Stats, straight from the platforms." lede="These numbers are fetched live from each platform every time the page loads." />
        <div className="live-grid">
          {cards.map(({ s, key, note, img, imgAlt }) => {
            const stats = live[key]
            return (
              <Reveal key={key} className="live-reveal">
                <Tilt max={4} className="live-tilt">
                  <article className="live-card glass">
                    <header className="live-head">
                      <Logo src={s.logo} alt={s.name} size={44} />
                      <div className="live-head-text">
                        <strong>{s.name}</strong>
                        <small>{s.handle}</small>
                      </div>
                      <span className={`live-pill ${stats === undefined ? 'is-loading' : stats ? 'is-live' : ''}`}>
                        {stats === undefined ? 'Loading' : stats ? 'Live' : 'Profile'}
                      </span>
                    </header>
                    <div className="live-stats">
                      {stats ? stats.map((x) => <Stat key={x.l} {...x} />) : stats === null ? <p className="live-fallback">Stats unavailable right now — open the profile.</p> : [1, 2, 3].map((i) => <div key={i} className="live-stat live-stat--skeleton" />)}
                    </div>
                    {img && (
                      <div className="live-img">
                        <img src={img} alt={imgAlt} loading="lazy" onError={(e) => (e.currentTarget.parentElement.style.display = 'none')} />
                      </div>
                    )}
                    <a className="live-link" href={s.url} target="_blank" rel="noreferrer">
                      Open profile <Icon name="external" size={14} />
                    </a>
                    <small className="live-note">{note}</small>
                  </article>
                </Tilt>
              </Reveal>
            )
          })}
        </div>
        <div className="live-rest">
          {rest.map((s, i) => (
            <Reveal key={s.id} as="a" delay={i * 0.06} href={s.url} target="_blank" rel="noreferrer" className="live-mini glass">
              <Logo src={s.logo} alt={s.name} size={40} />
              <div>
                <strong>{s.name}</strong>
                <small>{s.handle}</small>
              </div>
              <Icon name="external" size={14} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
