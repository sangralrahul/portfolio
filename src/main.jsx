import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'

/*
 * Which design is live.
 *   'editorial' — warm cream magazine design, serif R. logo (current)
 *   'bento'   — Apple-style bento grid (on hold)
 *   'studio'  — bold hero, R monogram, case studies (on hold)
 *   'pro'     — sidebar layout (on hold)
 *   'classic' — dark minimal design (on hold)
 * Change this one word and push to switch.
 */
const VERSION = 'editorial'

const App =
  VERSION === 'classic' ? lazy(() => import('./site/App.jsx'))
  : VERSION === 'pro' ? lazy(() => import('./pro/App.jsx'))
  : VERSION === 'studio' ? lazy(() => import('./studio/App.jsx'))
  : VERSION === 'bento' ? lazy(() => import('./bento/App.jsx'))
  : lazy(() => import('./editorial/App.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </StrictMode>,
)
