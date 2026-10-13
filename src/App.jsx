import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import { About, Credentials, Experience, Profiles, Projects, Skills, Stats } from './components/Sections.jsx'
import ProjectModal from './components/ProjectModal.jsx'
import Contact, { Footer } from './components/Contact.jsx'
import { BackToTop, ScrollProgress } from './components/Scroll.jsx'
import { CursorGlow } from './components/Live.jsx'
import Background from './components/Background.jsx'

export default function App() {
  const [project, setProject] = useState(null)
  return (
    <div className="app">
      <Background />
      <ScrollProgress />
      <CursorGlow />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects onOpen={setProject} />
        <Skills />
        <Credentials />
        <Profiles />
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
