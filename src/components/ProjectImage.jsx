import { useState } from 'react'
import Poster from './Poster.jsx'

/**
 * Real screenshot of the project, shown inside a browser frame.
 * Resolution order:
 *   1. /projects/<id>.png  (drop your own screenshot in public/projects/)
 *   2. live screenshot of the project URL via thum.io (only for projects with a public URL)
 *   3. generated artwork fallback
 */
export default function ProjectImage({ project, big = false }) {
  const live = project.links?.find((l) => /^https?:\/\/(?!github|huggingface)/.test(l.url))?.url
  const sources = [`/projects/${project.id}.png`, live ? `https://image.thum.io/get/width/1400/crop/900/noanimate/${live}` : null].filter(Boolean)
  const [idx, setIdx] = useState(0)
  const src = sources[idx]
  return (
    <div className={`shot ${big ? 'shot--big' : ''}`}>
      <div className="shot-bar">
        <span /><span /><span />
        <em>{live ? live.replace(/^https?:\/\//, '').replace(/\/$/, '') : project.title.toLowerCase().replace(/\s+/g, '-')}</em>
      </div>
      <div className="shot-body">
        {src ? (
          <img src={src} alt={`${project.title} screenshot`} loading="lazy" onError={() => setIdx((i) => i + 1)} />
        ) : (
          <Poster id={project.id} hue={project.hue} badge={false} big />
        )}
      </div>
    </div>
  )
}
