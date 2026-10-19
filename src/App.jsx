import { AnimatePresence } from 'framer-motion'
import { Suspense, lazy, useCallback, useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import { About, Credentials, Experience, Profiles, Projects, Skills, Stats } from './components/Sections.jsx'
import ProjectModal from './components/ProjectModal.jsx'
import LiveProfiles from './components/LiveProfiles.jsx'
import Contact, { Footer } from './components/Contact.jsx'
import { BackToTop, ScrollProgress } from './components/Scroll.jsx'
import { CursorGlow } from './components/Live.jsx'
import Background from './components/Background.jsx'
const World = lazy(() => import('./components/World.jsx'))

export default function App() {
  const [project, setProject] = useState(null)
  const [webgl, setWebgl] = useState(true)
  const onReady = useCallback((ok) => { if (!ok) setWebgl(false) }, [])
  return (
    <div className="app">
      {webgl ? (
        <Suspense fallback={null}><World onReady={onReady} /></Suspense>
      ) : (
        <Background />
      )}
      <div className="world-overlay" aria-hidden="true" />
      <ScrollProgress />
      <CursorGlow />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects onOpen={setProject} />
        <Skills />
        <LiveProfiles />
        <Credentials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <AnimatePresence>
        {project && <ProjectModal key={project.id} project={project} onClose={() => setProject(null)} onOpen={setProject} />}
      </AnimatePresence>
    </div>
  )
}
