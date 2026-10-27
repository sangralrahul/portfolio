import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The live design is picked in src/main.jsx. The light 'prism' design runs on
// Preact (same React API, ~10× smaller runtime) for the fastest possible load;
// older designs keep real React because they use framer-motion / three.js.
const MAIN = readFileSync(new URL('./src/main.jsx', import.meta.url), 'utf8')
const PREACT = /^import App from '\.\/prism\/App\.jsx'/m.test(MAIN)

export default defineConfig({
  plugins: [react()],
  define: { __BUILD_DATE__: JSON.stringify(new Date().toISOString()) },
  resolve: PREACT ? {
    alias: [
      { find: 'react-dom/client', replacement: 'preact/compat/client' },
      { find: 'react-dom/test-utils', replacement: 'preact/test-utils' },
      { find: 'react-dom', replacement: 'preact/compat' },
      { find: 'react/jsx-runtime', replacement: 'preact/jsx-runtime' },
      { find: 'react/jsx-dev-runtime', replacement: 'preact/jsx-dev-runtime' },
      { find: /^react$/, replacement: 'preact/compat' },
    ],
  } : {},
  build: { target: 'es2020', cssCodeSplit: true, modulePreload: { polyfill: false } },
})
