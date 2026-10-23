import { useEffect, useState } from 'react'

const get = async (url) => {
  const r = await fetch(url)
  if (!r.ok) throw new Error(String(r.status))
  return r.json()
}

/** Live numbers from GitHub, LeetCode and Codeforces. Each resolves independently; null = unavailable. */
export function useLiveStats() {
  const [d, setD] = useState({})
  useEffect(() => {
    let alive = true
    const set = (k, v) => alive && setD((x) => ({ ...x, [k]: v }))
    get('https://api.github.com/users/sangralrahul')
      .then((g) => set('github', [{ v: g.public_repos, l: 'Public repos' }, { v: g.followers, l: 'Followers' }]))
      .catch(() => set('github', null))
    get('https://codeforces.com/api/user.info?handles=rahulsangral')
      .then((c) => {
        const u = c.result[0]
        set('codeforces', [{ v: u.rating ?? '—', l: 'Rating' }, { v: u.maxRating ?? '—', l: 'Max rating' }])
      })
      .catch(() => set('codeforces', null))
    set('hackerrank', null) // HackerRank has no public browser API (CORS), so the card links to the profile
    get('https://leetcode-stats-api.herokuapp.com/rahulsangral')
      .then((l) => {
        if (l.status !== 'success') throw new Error('lc')
        set('leetcode', [{ v: l.totalSolved, l: 'Solved' }, { v: `${l.easySolved}/${l.mediumSolved}/${l.hardSolved}`, l: 'Easy / Med / Hard' }])
      })
      .catch(() =>
        get('https://alfa-leetcode-api.onrender.com/rahulsangral/solved')
          .then((l) => set('leetcode', [{ v: l.solvedProblem, l: 'Solved' }, { v: `${l.easySolved}/${l.mediumSolved}/${l.hardSolved}`, l: 'Easy / Med / Hard' }]))
          .catch(() => set('leetcode', null)),
      )
    return () => { alive = false }
  }, [])
  return d
}

/** Fades sections in once as they enter the viewport (opacity/transform only). */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((e) => e.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }),
      { rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])
}
