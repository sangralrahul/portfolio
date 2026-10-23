import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'

/*
 * Which design is live.
 *   'pro'     — sidebar layout (current)
 *   'classic' — the previous dark minimal design, kept on hold
 * Change this one word and push to switch.
 */
const VERSION = 'pro'

const App = VERSION === 'classic' ? lazy(() => import('./site/App.jsx')) : lazy(() => import('./pro/App.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </StrictMode>,
)
