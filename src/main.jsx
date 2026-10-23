import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './site/App.jsx'
import '@fontsource-variable/inter'
import './site.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
