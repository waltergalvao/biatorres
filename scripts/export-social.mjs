// Exports every Instagram post in src/data/social.ts to PNG, at its real size (1080×1350).
// The /social page also has download buttons that do the same in the browser.
//
//   npm run build && npm start      (or npm run dev)
//   npm run social:export           → social-export/<slug>.png
//
// Base URL: first argument or SOCIAL_BASE_URL, default http://localhost:3000.
import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright'

const base = (process.argv[2] ?? process.env.SOCIAL_BASE_URL ?? 'http://localhost:3000').replace(/\/$/, '')
const outDir = 'social-export'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 1500 }, deviceScaleFactor: 1 })

await page.goto(`${base}/social`, { waitUntil: 'networkidle' })
const slugs = await page.$$eval('li a[href^="/social/"]', (links) => links.map((a) => a.getAttribute('href').split('/').pop()))
if (slugs.length === 0) throw new Error(`No posts found at ${base}/social`)

await mkdir(outDir, { recursive: true })
for (const slug of slugs) {
  await page.goto(`${base}/social/${slug}`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForFunction(() => [...document.images].every((img) => img.complete && img.naturalWidth > 0), null, { timeout: 30000 })
  await page.locator(`#post-${slug}`).screenshot({ path: `${outDir}/${slug}.png` })
  console.log(`✓ ${outDir}/${slug}.png`)
}
await browser.close()
