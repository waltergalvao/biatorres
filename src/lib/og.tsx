// Social share images (Open Graph / Twitter) and the PNG logo, drawn with next/og.
//
// Satori (behind next/og) can't read CSS variables, so colors come from `hex` in the design
// tokens. The headline font is Fraunces, fetched from Google Fonts when the image is drawn;
// if that fails, the image falls back to the default sans font instead of erroring.
//
// The routes that use this run on the edge runtime (`export const runtime = 'edge'`): in
// Next 14.2 the Node.js build of next/og crashes on Windows ("Invalid URL" in
// @vercel/og/index.node.js), which broke `npm run build` there. Edge works everywhere, and the
// images are cached like any other response.

import { ImageResponse } from 'next/og'
import { MONOGRAM } from '@/components/Monogram'
import { hex } from '@/design/tokens'
import { SITE_DOMAIN } from '@/lib/site'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

type Weight = 400 | 600

/** A TTF of a Google font with only the glyphs of `text` (Satori reads TTF/OTF, not WOFF2). */
async function googleFont(family: string, weight: Weight, text: string, italic = false) {
  const axis = italic ? `ital,wght@1,${weight}` : `wght@${weight}`
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:${axis}&text=${encodeURIComponent(text)}`
  const css = await (await fetch(url)).text()
  const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1]
  if (!src) throw new Error(`No TTF for ${family}`)
  return (await fetch(src)).arrayBuffer()
}

async function fonts(text: string) {
  try {
    const [display, sans] = await Promise.all([googleFont('Fraunces', 400, text), googleFont('Hanken Grotesk', 600, text)])
    return [
      { name: 'Fraunces', data: display, weight: 400 as const, style: 'normal' as const },
      { name: 'Hanken Grotesk', data: sans, weight: 600 as const, style: 'normal' as const },
    ]
  } catch {
    return []
  }
}

/** Beatriz's portrait (the same file as PORTRAIT_PATH), bundled with the edge function. */
async function portrait() {
  const res = await fetch(new URL('../../public/images/beatriz-retrato.jpg', import.meta.url))
  return res.arrayBuffer()
}

/** The BT monogram as an inline SVG, in any token color. */
export function MonogramSvg({ height, color = hex.clay, strokeWidth = MONOGRAM.strokeWidth }: { height: number; color?: string; strokeWidth?: number }) {
  const [, , w, h] = MONOGRAM.viewBox.split(' ').map(Number)
  return (
    <svg
      viewBox={MONOGRAM.viewBox}
      width={Math.round((height * w) / h)}
      height={height}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="miter"
    >
      {MONOGRAM.paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

export type OgContent = {
  /** Small line above the title, e.g. the service name. */
  eyebrow: string
  title: string
  /** Price or a short promise, under the title. */
  detail?: string
}

/** 1200x630 card: text on linen at the left, Beatriz's portrait at the right. */
export async function renderOgImage({ eyebrow, title, detail }: OgContent) {
  const footer = `Beatriz Torres Arquitetura · ${SITE_DOMAIN}`
  // The font files hold only these glyphs; the eyebrow is drawn in capitals, so add those too.
  const detailText = detail ? detail.charAt(0).toUpperCase() + detail.slice(1) : undefined // 'a partir de...' -> 'A partir de...'
  const glyphs = `${eyebrow.toUpperCase()}${title}${detailText ?? ''}${footer}`
  const [fontList, photo] = await Promise.all([fonts(glyphs), portrait()])
  const display = fontList.length ? 'Fraunces' : undefined
  const sans = fontList.length ? 'Hanken Grotesk' : undefined
  const titleSize = title.length > 48 ? 54 : title.length > 32 ? 62 : 70

  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', background: hex.linen }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: 780,
            padding: '64px 56px 56px 72px',
          }}
        >
          <MonogramSvg height={72} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                fontFamily: sans,
                fontWeight: 600,
                fontSize: 22,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: hex.clay,
              }}
            >
              {eyebrow}
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: 20,
                fontFamily: display,
                fontSize: titleSize,
                lineHeight: 1.08,
                letterSpacing: -1,
                color: hex.ink,
              }}
            >
              {title}
            </div>
            {detailText && (
              <div style={{ display: 'flex', marginTop: 24, fontFamily: display, fontSize: 32, color: hex.inkSoft }}>{detailText}</div>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              borderTop: `2px solid ${hex.line}`,
              paddingTop: 22,
              fontFamily: sans,
              fontWeight: 600,
              fontSize: 20,
              color: hex.inkSoft,
            }}
          >
            {footer}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain img only */}
        <img src={photo as unknown as string} alt="" width={420} height={630} style={{ objectFit: 'cover', objectPosition: 'center top' }} />
      </div>
    ),
    { ...OG_SIZE, fonts: fontList },
  )
}

/** Square monogram on linen: the logo for structured data and the Apple touch icon. */
export function renderMark(size: number) {
  return new ImageResponse(
    (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: hex.linen }}>
        <MonogramSvg height={Math.round(size * 0.66)} strokeWidth={size < 256 ? 30 : 20} />
      </div>
    ),
    { width: size, height: size },
  )
}
