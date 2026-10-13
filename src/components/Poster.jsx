// Generated "key art" for every title — no stock images, every card is unique.
export function hash(str = '') {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

function Pattern({ seed, h1, h2 }) {
  const type = seed % 4
  const c1 = `hsl(${h1} 95% 70%)`
  const c2 = `hsl(${h2} 95% 65%)`
  if (type === 0) {
    // concentric rings
    const cx = 60 + (seed % 30)
    return (
      <svg className="poster-pattern" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice">
        {[10, 22, 34, 46, 58, 70].map((r, i) => (
          <circle key={r} cx={cx + 40} cy={40} r={r} fill="none" stroke={i % 2 ? c1 : c2} strokeOpacity={0.35 - i * 0.04} strokeWidth=".6" />
        ))}
      </svg>
    )
  }
  if (type === 1) {
    // perspective grid
    return (
      <svg className="poster-pattern" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={'v' + i} x1={80} y1={30} x2={-40 + i * 20} y2={90} stroke={c1} strokeOpacity=".22" strokeWidth=".4" />
        ))}
        {[36, 44, 55, 70, 88].map((y) => (
          <line key={'h' + y} x1={0} y1={y} x2={160} y2={y} stroke={c2} strokeOpacity=".22" strokeWidth=".4" />
        ))}
      </svg>
    )
  }
  if (type === 2) {
    // diagonal light beams
    return (
      <svg className="poster-pattern" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 9 }).map((_, i) => (
          <rect key={i} x={20 + i * 16} y={-40} width={2 + (i % 3) * 3} height={200} fill={i % 2 ? c1 : c2} opacity={0.1 + (i % 3) * 0.05} transform={`rotate(28 80 45)`} />
        ))}
      </svg>
    )
  }
  // waves
  return (
    <svg className="poster-pattern" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice">
      {Array.from({ length: 7 }).map((_, i) => (
        <path
          key={i}
          d={`M-10 ${30 + i * 8} C 30 ${10 + i * 8}, 70 ${55 + i * 8}, 110 ${28 + i * 8} S 170 ${20 + i * 8}, 180 ${35 + i * 8}`}
          fill="none"
          stroke={i % 2 ? c1 : c2}
          strokeOpacity={0.32 - i * 0.03}
          strokeWidth=".6"
        />
      ))}
    </svg>
  )
}

export default function Poster({ id, hue = [0, 20], title, kicker, badge = true, tall = false, big = false, children }) {
  const seed = hash(id)
  const [h1, h2] = hue
  const gx = 15 + (seed % 55)
  const style = {
    background: `
      radial-gradient(120% 95% at ${gx}% 0%, hsl(${h1} 85% 52% / .95), transparent 58%),
      radial-gradient(90% 85% at 100% 100%, hsl(${h2} 90% 42% / .9), transparent 62%),
      linear-gradient(135deg, hsl(${h1} 55% 11%), hsl(${h2} 65% 7%))`,
  }
  return (
    <div className={`poster ${tall ? 'poster--tall' : ''} ${big ? 'poster--big' : ''}`} style={style}>
      <Pattern seed={seed} h1={h1} h2={h2} />
      <div className="poster-noise" />
      <div className="poster-shade" />
      {badge && <span className="poster-badge">R</span>}
      {(title || kicker) && (
        <div className="poster-copy">
          {kicker && <span className="poster-kicker">{kicker}</span>}
          {title && <span className="poster-title">{title}</span>}
        </div>
      )}
      {children}
    </div>
  )
}
