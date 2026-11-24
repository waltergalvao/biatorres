// Downloads the fonts of the share images (src/lib/og.tsx) from Google Fonts into
// src/lib/og-fonts: Latin subsets (ASCII, Latin-1 and common punctuation, enough for
// Portuguese) of the static instances the site uses. They are bundled with the edge functions,
// so an image never waits on, or fails because of, Google Fonts.
//
// Run it again only to change a font or a weight: npm run og:fonts

import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const OUT = path.join('src', 'lib', 'og-fonts')

const FONTS = {
  // Fraunces with SOFT 50, as in globals.css (.font-display), at a display optical size.
  'fraunces-400.ttf': 'Fraunces:opsz,wght,SOFT@72,400,50',
  'fraunces-400-italic.ttf': 'Fraunces:ital,opsz,wght,SOFT@1,72,400,50',
  'hanken-grotesk-600.ttf': 'Hanken+Grotesk:wght@600',
}

let text = ''
for (let c = 0x20; c < 0x7f; c++) text += String.fromCharCode(c)
for (let c = 0xa0; c <= 0xff; c++) text += String.fromCharCode(c)
// Dashes, curly quotes, ellipsis, bullet, euro sign and the OE ligatures.
text += String.fromCharCode(0x2013, 0x2014, 0x2018, 0x2019, 0x201c, 0x201d, 0x2026, 0x2022, 0x20ac, 0x152, 0x153)

await mkdir(OUT, { recursive: true })
for (const [file, family] of Object.entries(FONTS)) {
  // Without a browser User-Agent, Google Fonts answers with TrueType, which Satori needs.
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`)).text()
  const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1]
  if (!src) throw new Error(`No TrueType file for ${family}`)
  const data = Buffer.from(await (await fetch(src)).arrayBuffer())
  await writeFile(path.join(OUT, file), data)
  console.log(`${file}: ${(data.length / 1024).toFixed(0)} KB`)
}
