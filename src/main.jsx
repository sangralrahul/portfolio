import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'

/*
 * Which design is live.
 *   'nova'    — original dark design, GitHub colours as reference, animations everywhere (current)
 *   'github'  — close copy of the GitHub README look (on hold)
 *   'editorial' — refined cream editorial: compact hero, at-a-glance strip (on hold)
 *   'editorial-v1' — first cream magazine version (on hold)
 *   'bento'   — Apple-style bento grid (on hold)
 *   'studio'  — bold hero, R monogram, case studies (on hold)
 *   'pro'     — sidebar layout (on hold)
 *   'classic' — dark minimal design (on hold)
 * Change this one word and push to switch.
 */
const VERSION = 'nova'

/* If a deploy replaced the code chunks while this tab had the old page, reload once instead of showing a blank page. */
const safeLazy = (load) => lazy(() => load().catch((e) => {
  if (!sessionStorage.getItem('chunk-reload')) { sessionStorage.setItem('chunk-reload', '1'); location.reload() }
  throw e
}))

const App =
  VERSION === 'classic' ? safeLazy(() => import('./site/App.jsx'))
  : VERSION === 'pro' ? safeLazy(() => import('./pro/App.jsx'))
  : VERSION === 'studio' ? safeLazy(() => import('./studio/App.jsx'))
  : VERSION === 'editorial-v1' ? safeLazy(() => import('./editorial-v1/App.jsx'))
  : VERSION === 'nova' ? safeLazy(() => import('./nova/App.jsx'))
  : VERSION === 'github' ? safeLazy(() => import('./github/App.jsx'))
  : VERSION === 'bento' ? safeLazy(() => import('./bento/App.jsx'))
  : safeLazy(() => import('./editorial/App.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </StrictMode>,
)
