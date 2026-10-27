// Build-time pre-render of the live design (see prerender.mjs).
import { renderToString } from 'preact-render-to-string'
import App from './prism/App.jsx'

export const render = () => renderToString(<App />)
