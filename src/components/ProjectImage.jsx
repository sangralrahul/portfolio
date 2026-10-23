import { useEffect, useRef, useState } from 'react'
import Diagram from './Diagram.jsx'

/**
 * Project visual inside a browser frame.
 *   1. /projects/<id>.png — drop a real screenshot in public/projects/ and it is used automatically
 *   2. otherwise an architecture diagram, mounted only when near the viewport
 */
export default function ProjectImage({ project, big = false }) {
  const live = project.links?.find((l) => /^https?:\/\/(?!github|huggingface)/.test(l.url))?.url
  const [shot, setShot] = useState(true)
  const [near, setNear] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect() } }, { rootMargin: '300px' })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  const label = shot ? (live ? live.replace(/^https?:\/\//, '').replace(/\/$/, '') : project.title) : `${project.domain || project.title.toLowerCase().replace(/\s+/g, '-')} · architecture`
  return (
    <div className={`shot ${big ? 'shot--big' : ''}`} ref={ref}>
      <div className="shot-bar">
        <span /><span /><span />
        <em>{label}</em>
      </div>
      <div className="shot-body">
        {shot ? (
          <img src={`/projects/${project.id}.png`} alt={`${project.title} screenshot`} loading="lazy" onError={() => setShot(false)} />
        ) : near ? (
          <Diagram id={project.id} title={project.title} />
        ) : null}
      </div>
    </div>
  )
}
