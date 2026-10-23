import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'

/*
 * Which design is live.
 *   'studio'  — bold hero, R monogram, case studies with real screenshots (current)
 *   'pro'     — sidebar layout (on hold)
 *   'classic' — dark minimal design (on hold)
 * Change this one word and push to switch.
 */
const VERSION = 'studio'

const App =
  VERSION === 'classic' ? lazy(() => import('./site/App.jsx'))
  : VERSION === 'pro' ? lazy(() => import('./pro/App.jsx'))
  : lazy(() => import('./studio/App.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </StrictMode>,
)
