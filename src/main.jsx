import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './prism/App.jsx'

/*
 * Which design is live.
 *   prism   — light & colourful, animated background in every section (current)
 *   nova    — dark design, animations everywhere (on hold)
 *   github  — close copy of the GitHub README look (on hold)
 *   editorial, editorial-v1, bento, studio, pro (on hold) · classic lives in ./site
 *
 * To switch design, change the folder in the import line above
 * (e.g. './nova/App.jsx') and push. The prism design is pre-rendered to HTML at
 * build time and hydrated here, so it shows before the JavaScript finishes.
 */
const root = document.getElementById('root')
if (root.firstElementChild) hydrateRoot(root, <App />)
else createRoot(root).render(<App />)
