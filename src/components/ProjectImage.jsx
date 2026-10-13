import { useState } from 'react'
import Diagram from './Diagram.jsx'

/**
 * Project visual inside a browser frame.
 *   1. /projects/<id>.png — drop a real screenshot in public/projects/ and it is used automatically
 *   2. otherwise an animated architecture diagram of the system
 */
export default function ProjectImage({ project, big = false }) {
  const live = project.links?.find((l) => /^https?:\/\/(?!github|huggingface)/.test(l.url))?.url
  const [shot, setShot] = useState(true)
  const label = shot ? (live ? live.replace(/^https?:\/\//, '').replace(/\/$/, '') : project.title) : `${project.title.toLowerCase().replace(/\s+/g, '-')} · architecture`
  return (
    <div className={`shot ${big ? 'shot--big' : ''}`}>
      <div className="shot-bar">
        <span /><span /><span />
        <em>{label}</em>
      </div>
      <div className="shot-body">
        {shot ? (
          <img src={`/projects/${project.id}.png`} alt={`${project.title} screenshot`} loading="lazy" onError={() => setShot(false)} />
        ) : (
          <Diagram id={project.id} title={project.title} />
        )}
      </div>
    </div>
  )
}
