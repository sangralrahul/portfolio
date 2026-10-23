import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'

/*
 * Which design is live.
 *   'bento'   — Apple-style bento grid (current)
 *   'studio'  — bold hero, R monogram, case studies (on hold)
 *   'pro'     — sidebar layout (on hold)
 *   'classic' — dark minimal design (on hold)
 * Change this one word and push to switch.
 */
const VERSION = 'bento'

const App =
  VERSION === 'classic' ? lazy(() => import('./site/App.jsx'))
  : VERSION === 'pro' ? lazy(() => import('./pro/App.jsx'))
  : VERSION === 'studio' ? lazy(() => import('./studio/App.jsx'))
  : lazy(() => import('./bento/App.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </StrictMode>,
)
