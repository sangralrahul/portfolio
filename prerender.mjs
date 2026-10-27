// Runs after `vite build`: renders the live design to static HTML and puts it
// inside <div id="root"> so the page is visible before any JavaScript loads.
// The browser then hydrates it (main.jsx). Skipped for designs that use React.
import { readFileSync, writeFileSync, rmSync, readdirSync } from 'node:fs'
import { execSync } from 'node:child_process'

const main = readFileSync('src/main.jsx', 'utf8')
if (!/^import App from '\.\/prism\/App\.jsx'/m.test(main)) {
  console.log('prerender: skipped (live design is not prism)')
  process.exit(0)
}
execSync('npx vite build --ssr src/entry-server.jsx --outDir dist-ssr --emptyOutDir', { stdio: 'inherit' })
const { render } = await import('./dist-ssr/entry-server.js')
const html = render()
const file = 'dist/index.html'
const page = readFileSync(file, 'utf8')
if (!page.includes('<div id="root"></div>')) throw new Error('prerender: #root not found')
let out = page.replace('<div id="root"></div>', `<div id="root">${html}</div>`)

// Inline the stylesheet (saves a network round trip before first paint).
out = out.replace(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/, (_, href) =>
  `<style>${readFileSync('dist' + href, 'utf8')}</style>`)

// Preload the two fonts the first screen uses, so text doesn't re-flow when they arrive.
const assets = readdirSync('dist/assets')
const fonts = [/^space-grotesk-latin-700-normal-.*\.woff2$/, /^inter-latin-wght-normal-.*\.woff2$/]
  .map((re) => assets.find((f) => re.test(f))).filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin>`).join('\n    ')
out = out.replace('</title>', `</title>\n    ${fonts}`)
writeFileSync(file, out)
rmSync('dist-ssr', { recursive: true, force: true })
console.log(`prerender: injected ${(html.length / 1024).toFixed(1)} kB of HTML`)
