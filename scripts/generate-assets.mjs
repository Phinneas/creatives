// Generates favicon PNGs, apple-touch-icon, and og:image from the brand mark.
// Run: node scripts/generate-assets.mjs
import { chromium } from '@playwright/test'
import { writeFileSync, mkdirSync } from 'node:fs'

const OUT = 'public'
mkdirSync(OUT, { recursive: true })

// Brand palette
const cream = '#F8F6F0'
const forest = '#0E3A33'
const sage = '#B7DBD3'
const mint = '#CFE7E2'
const gold = '#FFB900'

// Favicon mark: cream rounded square + three waves (matches nav mark)
const faviconSvg = (w, h) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${cream}"/>
  <g fill="none" stroke-linecap="round">
    <path d="M14 40 C22 32, 28 32, 36 38 C44 44, 50 44, 58 38" stroke="${forest}" stroke-width="4"/>
    <path d="M15 30 C23 22, 29 22, 36 27 C43 32, 49 32, 57 26" stroke="${forest}" stroke-width="4" opacity="0.55"/>
    <path d="M17 20 C24 13, 30 13, 36 18 C42 23, 48 23, 56 17" stroke="#009689" stroke-width="4" opacity="0.85"/>
  </g>
</svg>`

// og:image: forest background, light waves + wordmark
const ogHtml = `<!doctype html>
<html><head>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..700&family=DM+Sans:opsz,wght@9..40,400..600&display=swap" rel="stylesheet" />
<style>
  html,body{margin:0;padding:0;background:${forest};}
  .card{width:1200px;height:630px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:42px;
    background:radial-gradient(90% 90% at 50% 0%, rgba(183,219,211,.10), transparent 60%);}
  .wordmark{font-family:'Fraunces',Georgia,serif;font-variation-settings:"SOFT" 0,"WONK" 0;font-weight:500;font-size:66px;letter-spacing:-0.02em;color:${cream};}
  .tag{font-family:'DM Sans',system-ui,sans-serif;font-size:24px;color:rgba(255,255,255,.72);letter-spacing:.02em;}
</style></head>
<body>
  <div class="card">
    <svg width="150" height="150" viewBox="0 0 26 26" fill="none">
      <path d="M3 17 C7 13, 9 13, 13 16 C17 19, 19 19, 23 15" stroke="${cream}" stroke-width="1.6" fill="none"/>
      <path d="M4 12 C8 8.5, 10 8.5, 13 11 C16 13.5, 18 13.5, 22 10" stroke="${sage}" stroke-width="1.6" fill="none" opacity="0.85"/>
      <path d="M5 7 C8.5 4.5, 10.5 4.5, 13 6.5 C15.5 8.5, 17.5 8.5, 21 6" stroke="${gold}" stroke-width="1.6" fill="none" opacity="0.9"/>
    </svg>
    <div class="wordmark">Salish Sea Creatives</div>
    <div class="tag">Premium templates for purposeful brands</div>
  </div>
</body></html>`

const browser = await chromium.launch()

async function rasterizeSvg(svg, w, h, out) {
  const page = await browser.newPage({ viewport: { width: w, height: h } })
  await page.setContent(`<!doctype html><html><head><style>html,body{margin:0;padding:0}</style></head><body>${svg}</body></html>`)
  await page.screenshot({ path: out })
  await page.close()
  console.log('wrote', out)
}

async function rasterizeOg(out) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
  await page.setContent(ogHtml)
  await page.evaluate(() => document.fonts.ready).catch(() => {})
  await page.waitForTimeout(300)
  await page.screenshot({ path: out })
  await page.close()
  console.log('wrote', out)
}

await rasterizeSvg(faviconSvg(16, 16), 16, 16, `${OUT}/favicon-16x16.png`)
await rasterizeSvg(faviconSvg(32, 32), 32, 32, `${OUT}/favicon-32x32.png`)
await rasterizeSvg(faviconSvg(180, 180), 180, 180, `${OUT}/apple-touch-icon.png`)
await rasterizeOg(`${OUT}/og-image.png`)

await browser.close()
console.log('done')
