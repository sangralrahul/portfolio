import { useEffect, useId, useRef } from 'react'

/*
 * Animated architecture diagrams — honest visuals for each project.
 * Each node: { id, label, sub, c (column 0-3), r (row), tone }
 * Each edge: [from, to]
 */
export const diagrams = {
  aethex: {
    nodes: [
      { id: 'user', label: 'Users', sub: 'web · mobile', c: 0, r: 1, tone: 'muted' },
      { id: 'web', label: 'React + TypeScript', sub: 'Vercel', c: 1, r: 0, tone: 'blue' },
      { id: 'auth', label: 'Firebase Auth', sub: 'role-based access', c: 1, r: 2, tone: 'amber' },
      { id: 'api', label: 'FastAPI', sub: 'Railway · CI/CD', c: 2, r: 1, tone: 'green' },
      { id: 'pg', label: 'PostgreSQL', sub: 'core schema', c: 3, r: 0, tone: 'blue' },
      { id: 'fs', label: 'Firestore', sub: 'real-time data', c: 3, r: 1, tone: 'amber' },
      { id: 'pay', label: 'Razorpay', sub: 'subscriptions · webhooks', c: 3, r: 2, tone: 'red' },
    ],
    edges: [['user', 'web'], ['web', 'auth'], ['web', 'api'], ['auth', 'api'], ['api', 'pg'], ['api', 'fs'], ['api', 'pay']],
  },
  zyphix: {
    nodes: [
      { id: 'ui', label: 'React Interface', sub: 'TypeScript', c: 0, r: 1, tone: 'blue' },
      { id: 'api', label: 'REST API', sub: 'Python · modular', c: 1, r: 1, tone: 'green' },
      { id: 'svc', label: 'Domain services', sub: 'validation · business rules', c: 2, r: 0, tone: 'muted' },
      { id: 'sql', label: 'SQL Schema', sub: 'normalised', c: 2, r: 2, tone: 'amber' },
      { id: 'ci', label: 'CI/CD', sub: 'push → deploy', c: 3, r: 1, tone: 'red' },
    ],
    edges: [['ui', 'api'], ['api', 'svc'], ['api', 'sql'], ['svc', 'ci'], ['sql', 'ci']],
  },
  sqlfixenv: {
    nodes: [
      { id: 'in', label: 'Failing SQL', sub: 'query + error', c: 0, r: 1, tone: 'red' },
      { id: 'cls', label: 'Error classifier', sub: 'syntax · schema · logic', c: 1, r: 1, tone: 'amber' },
      { id: 'llm', label: 'LLM', sub: 'Hugging Face', c: 2, r: 0, tone: 'blue' },
      { id: 'api', label: 'FastAPI', sub: 'environment API', c: 2, r: 2, tone: 'green' },
      { id: 'out', label: 'Explanation + fix', sub: 'corrected query', c: 3, r: 1, tone: 'green' },
    ],
    edges: [['in', 'cls'], ['cls', 'llm'], ['cls', 'api'], ['llm', 'out'], ['api', 'out']],
  },
  insights: {
    nodes: [
      { id: 'file', label: 'CSV / Excel', sub: 'upload', c: 0, r: 1, tone: 'muted' },
      { id: 'pd', label: 'Pandas profiler', sub: 'types · stats · nulls', c: 1, r: 1, tone: 'blue' },
      { id: 'llm', label: 'LLM', sub: 'OpenAI', c: 2, r: 0, tone: 'amber' },
      { id: 'an', label: 'Anomaly detector', sub: 'z-score · IQR', c: 2, r: 2, tone: 'red' },
      { id: 'out', label: 'Summary · charts · alerts', sub: 'FastAPI response', c: 3, r: 1, tone: 'green' },
    ],
    edges: [['file', 'pd'], ['pd', 'llm'], ['pd', 'an'], ['llm', 'out'], ['an', 'out']],
  },
  kpi: {
    nodes: [
      { id: 'db', label: 'Live SQL', sub: 'source of truth', c: 0, r: 1, tone: 'blue' },
      { id: 'etl', label: 'Python ETL', sub: 'scheduled · validated', c: 1, r: 1, tone: 'green' },
      { id: 'model', label: 'KPI model', sub: 'metrics · dimensions', c: 2, r: 1, tone: 'amber' },
      { id: 'tab', label: 'Tableau', sub: 'drill-down filters', c: 3, r: 0, tone: 'red' },
      { id: 'team', label: 'Stakeholders', sub: 'self-serve', c: 3, r: 2, tone: 'muted' },
    ],
    edges: [['db', 'etl'], ['etl', 'model'], ['model', 'tab'], ['tab', 'team']],
  },
}

const tones = {
  blue: '#ffffff', green: '#d9d9d9', amber: '#b3b3b3', red: '#8c8c8c', muted: '#6b6b6b',
}

const W = 960, H = 480, NW = 176, NH = 58
const colX = (c) => 60 + c * ((W - 120 - NW) / 3)
const rowY = (r) => 60 + r * ((H - 120 - NH) / 2)

export default function Diagram({ id, title, hero = false }) {
  const d = diagrams[id]
  const uid = useId().replace(/:/g, '')
  const ref = useRef(null)
  useEffect(() => {
    const svg = ref.current
    if (!svg) return
    svg.pauseAnimations()
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { svg.unpauseAnimations(); svg.classList.remove('is-paused') } else { svg.pauseAnimations(); svg.classList.add('is-paused') }
    }, { rootMargin: '100px' })
    io.observe(svg)
    return () => io.disconnect()
  }, [])
  if (!d) return null
  const pos = Object.fromEntries(d.nodes.map((n) => [n.id, { x: colX(n.c), y: rowY(n.r) }]))
  const path = ([a, b]) => {
    const A = pos[a], B = pos[b]
    if (Math.abs(A.x - B.x) < 1) {
      // same column: connect vertically
      const down = B.y > A.y
      const x = A.x + NW / 2
      const y1 = down ? A.y + NH : A.y, y2 = down ? B.y : B.y + NH
      return `M${x} ${y1} L${x} ${y2}`
    }
    const x1 = A.x + NW, y1 = A.y + NH / 2, x2 = B.x, y2 = B.y + NH / 2
    const cx = (x1 + x2) / 2
    return `M${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`
  }
  return (
    <svg ref={ref} className={`diagram ${hero ? 'diagram--hero' : ''}`} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${title} architecture`}>
      <defs>
        <pattern id={`grid-${uid}`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="rgba(255,255,255,.05)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill={`url(#grid-${uid})`} />
      {d.edges.map((e, i) => {
        const p = path(e)
        const col = tones[d.nodes.find((n) => n.id === e[1]).tone]
        return (
          <g key={i}>
            <path d={p} fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="1.5" />
            <path d={p} fill="none" stroke={col} strokeWidth="1.5" strokeDasharray="6 14" opacity=".55" className="edge-flow" style={{ animationDelay: `${-i * 0.7}s` }} />
            <circle r="3.5" fill={col}>
              <animateMotion dur={`${2.6 + (i % 3) * 0.6}s`} repeatCount="indefinite" path={p} begin={`${-i * 0.9}s`} />
            </circle>
          </g>
        )
      })}
      {d.nodes.map((n) => {
        const { x, y } = pos[n.id]
        const col = tones[n.tone]
        return (
          <g key={n.id} className="node" style={{ animationDelay: `${(n.c * 0.4 + n.r * 0.2).toFixed(2)}s` }}>
            <rect x={x} y={y} width={NW} height={NH} rx="10" fill="rgba(20,20,26,.96)" stroke="rgba(255,255,255,.14)" />
            <rect x={x} y={y} width="4" height={NH} rx="2" fill={col} />
            <text x={x + 16} y={y + 24} fill="#fff" fontSize="13.5" fontWeight="600" fontFamily="Geist Variable, Inter, system-ui, sans-serif">{n.label}</text>
            <text x={x + 16} y={y + 42} fill="rgba(255,255,255,.55)" fontSize="11" fontFamily="Geist Mono Variable, ui-monospace, Menlo, monospace">{n.sub}</text>
          </g>
        )
      })}
    </svg>
  )
}
