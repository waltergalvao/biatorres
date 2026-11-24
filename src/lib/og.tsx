// Social share images (Open Graph / Twitter) and the PNG logo, drawn with next/og.
//
// One card for every page, in the language of the Instagram posts (/social): linen ground, the
// BT brand bar, the page's own photo in a big rounded frame and the title in Fraunces with its
// italic terracotta words. No prices, on any page (owner decision).
//
// Layout. WhatsApp and some apps crop a link preview to a centered square, so everything that
// matters (brand, label, title) sits on a card in the middle 600 px, inside the centered
// 630x630 square; the photo fills the rest of the frame around it. Pages about Beatriz use two
// photos, one on each side of the card.
//
// Satori (behind next/og) can't read CSS variables, so colors come from `hex` in the design
// tokens. The fonts are Latin subsets bundled with the function (src/lib/og-fonts, made by
// `npm run og:fonts`), so an image never depends on Google Fonts answering. A photo that fails
// to load throws: a 500 is retried later, while a card drawn without its photo would be cached
// for a year by WhatsApp and Facebook.
//
// The routes that use this run on the edge runtime (`export const runtime = 'edge'`): in
// Next 14.2 the Node.js build of next/og crashes on Windows ("Invalid URL" in
// @vercel/og/index.node.js), which broke `npm run build` there. Edge works everywhere, and the
// images are cached like any other response.

import { ImageResponse } from 'next/og'
import { MONOGRAM } from '@/components/Monogram'
import { hex, rgbChannels } from '@/design/tokens'
import { unsplash } from '@/lib/site'
import { balancedWidth, fontAdvance, measure, type Advance, type Word } from './og-measure'
import { OG_SIZE } from './og-size'

export { OG_CONTENT_TYPE, OG_SIZE } from './og-size'

const FONT_FILES = [
  { name: 'Fraunces', weight: 400, style: 'normal', url: new URL('./og-fonts/fraunces-400.ttf', import.meta.url) },
  { name: 'Fraunces', weight: 400, style: 'italic', url: new URL('./og-fonts/fraunces-400-italic.ttf', import.meta.url) },
  { name: 'Hanken Grotesk', weight: 600, style: 'normal', url: new URL('./og-fonts/hanken-grotesk-600.ttf', import.meta.url) },
] as const

let fontCache: Promise<{ name: string; data: ArrayBuffer; weight: 400 | 600; style: 'normal' | 'italic' }[]> | undefined

function fonts() {
  fontCache ??= Promise.all(
    FONT_FILES.map(async ({ url, ...font }) => {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`OG font ${url}: HTTP ${res.status}`)
      return { ...font, data: await res.arrayBuffer() }
    }),
  )
  // A failed load must not stick: let the next request try again.
  fontCache.catch(() => (fontCache = undefined))
  return fontCache
}

/** Loads a photo, or throws (see the note at the top about caching). */
export async function fetchPhoto(url: string | URL, init?: RequestInit): Promise<ArrayBuffer> {
  const res = await fetch(url, init)
  if (!res.ok) throw new Error(`OG photo ${url}: HTTP ${res.status}`)
  return res.arrayBuffer()
}

/** An Unsplash photo at a size that is sharp on the card and quick to fetch. */
export const unsplashPhoto = (id: string) => fetchPhoto(`${unsplash(id)}?w=1200&q=80&fm=jpg&fit=max`)

/** Beatriz's portrait (public/images/beatriz-retrato.jpg), bundled with the edge function. */
export const portraitPhoto = () => fetchPhoto(new URL('../../public/images/beatriz-retrato.jpg', import.meta.url))

/** Beatriz at a site visit (public/images/beatriz-obra.jpg), bundled with the edge function. */
export const sitePhoto = () => fetchPhoto(new URL('../../public/images/beatriz-obra.jpg', import.meta.url))

/**
 * The BT monogram as an inline SVG, in any token color. `weight` sets a fixed line thickness in
 * px whatever the size (like the Monogram component); `strokeWidth` is in viewBox units.
 */
export function MonogramSvg({
  height,
  color = hex.clay,
  strokeWidth = MONOGRAM.strokeWidth,
  weight,
}: {
  height: number
  color?: string
  strokeWidth?: number
  weight?: number
}) {
  const [, , w, h] = MONOGRAM.viewBox.split(' ').map(Number)
  return (
    <svg
      viewBox={MONOGRAM.viewBox}
      width={Math.round((height * w) / h)}
      height={height}
      fill="none"
      stroke={color}
      strokeWidth={weight ? (weight * h) / height : strokeWidth}
      strokeLinejoin="miter"
    >
      {MONOGRAM.paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

export type OgPhoto = {
  data: ArrayBuffer
  /** CSS object-position, to keep the subject in view. Default: center. */
  position?: string
}

export type OgCard = {
  /** Short line above the title: the service, the audience, the blog category. Never a price. */
  label: string
  title: string
  /** Words after the title, in italic terracotta (the hero's `accent`). */
  accent?: string
  /** One photo fills the frame behind the card; two flank it, left and right. */
  photo: OgPhoto | [OgPhoto, OgPhoto]
}

const { width: W, height: H } = OG_SIZE
/** Linen margin around the photo frame. */
const INSET = 24
/** The card: 600 px wide and centered, so a centered square crop (285 to 915) keeps all of it. */
const CARD = { left: 300, width: 600 }
const CARD_PAD_X = 48
const TITLE_WIDTH = CARD.width - 2 * CARD_PAD_X

const rgba = (color: string, alpha: number) => `rgba(${rgbChannels(color).split(' ').join(',')},${alpha})`

/** Keeps "60 m²" and similar together on one line. */
const keepTogether = (text: string) => text.replace(/(\d) (m²|m2|x)/g, '$1\u00a0$2')

/** Splits on spaces but not on the no-break space (`\s` would match it). */
const words = (text: string) =>
  keepTogether(text)
    .split(/[^\S\u00a0]+/)
    .filter(Boolean)

/** Capitals for the label, done here rather than with text-transform so units keep their case. */
const upper = (text: string) =>
  keepTogether(text)
    .toLocaleUpperCase('pt-BR')
    .replace(/(\d)\u00a0M(²|2)/g, '$1\u00a0m$2')

/** Font sizes to try, biggest first, with the most lines each may take. */
const TITLE_SIZES = [
  { size: 66, lines: 2 },
  { size: 58, lines: 3 },
  { size: 52, lines: 3 },
  { size: 48, lines: 4 },
  { size: 42, lines: 5 },
]

type TitleWord = Word & { accent: boolean }
type TitleLayout = { words: TitleWord[]; size: number; width: number; gap: number; letterSpacing: number }

/**
 * Picks the biggest size at which the title fits its lines, then narrows the box to even
 * lines (Satori has no `text-wrap: balance`), so no word sits alone on the last line.
 */
function layoutTitle({ title, accent }: Pick<OgCard, 'title' | 'accent'>, regular: Advance, italic: Advance): TitleLayout {
  const parts = [...words(title).map((text) => ({ text, accent: false })), ...words(accent ?? '').map((text) => ({ text, accent: true }))]
  const fit = (size: number) => {
    const letterSpacing = -size * 0.02
    const gap = Math.round(size * 0.24)
    const measured = parts.map((p) => ({ ...p, width: measure(p.text, p.accent ? italic : regular, size, letterSpacing) }))
    return { words: measured, size, gap, letterSpacing, ...balancedWidth(measured, TITLE_WIDTH, gap) }
  }
  const last = TITLE_SIZES[TITLE_SIZES.length - 1]
  const chosen = TITLE_SIZES.map((s) => ({ ...fit(s.size), max: s.lines })).find((l) => l.lines <= l.max) ?? fit(last.size)
  // A few px of room for kerning and rounding, so Satori breaks where the measure did.
  return { ...chosen, width: Math.min(TITLE_WIDTH, chosen.width + 6) }
}

function Title({ layout: { words, size, width, gap, letterSpacing } }: { layout: TitleLayout }) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        columnGap: gap,
        width,
        marginTop: 20,
        fontFamily: 'Fraunces',
        fontSize: size,
        lineHeight: 1.06,
        letterSpacing,
        color: hex.ink,
      }}
    >
      {words.map(({ text, accent }, i) => (
        <span key={i} style={accent ? { fontStyle: 'italic', color: hex.clay } : {}}>
          {text}
        </span>
      ))}
    </div>
  )
}

function BrandBar() {
  const height = 52
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <MonogramSvg height={height} weight={2.4} />
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 14 }}>
        <span style={{ fontFamily: 'Fraunces', fontSize: 27, lineHeight: 1, letterSpacing: -0.3, color: hex.ink }}>Beatriz Torres</span>
        <span
          style={{
            marginTop: 7,
            fontFamily: 'Hanken Grotesk',
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: 2.6,
            textTransform: 'uppercase',
            color: hex.inkSoft,
          }}
        >
          Arquitetura & interiores
        </span>
      </div>
    </div>
  )
}

function Photo({ photo, left, width }: { photo: OgPhoto; left: number; width: number }) {
  const height = H - 2 * INSET
  return (
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        left,
        top: INSET,
        width,
        height,
        borderRadius: 32,
        overflow: 'hidden',
        background: hex.sand,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain img only */}
      <img
        src={photo.data as unknown as string}
        alt=""
        width={width}
        height={height}
        style={{ objectFit: 'cover', objectPosition: photo.position ?? 'center' }}
      />
    </div>
  )
}

/** The 1200x630 share card. */
export async function renderOgCard({ label, title, accent, photo }: OgCard) {
  const fontList = await fonts()
  // fontList follows FONT_FILES: Fraunces regular, then italic.
  const titleLayout = layoutTitle({ title, accent }, fontAdvance(fontList[0].data), fontAdvance(fontList[1].data))
  const flanked = Array.isArray(photo)
  const gap = 12
  const cardTop = flanked ? INSET : 56

  return new ImageResponse(
    (
      <div style={{ display: 'flex', position: 'relative', width: W, height: H, background: hex.linen }}>
        {flanked ? (
          <>
            <Photo photo={photo[0]} left={INSET} width={CARD.left - gap - INSET} />
            <Photo photo={photo[1]} left={CARD.left + CARD.width + gap} width={W - INSET - (CARD.left + CARD.width + gap)} />
          </>
        ) : (
          <Photo photo={photo} left={INSET} width={W - 2 * INSET} />
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            left: CARD.left,
            top: cardTop,
            width: CARD.width,
            height: H - 2 * cardTop,
            padding: `44px ${CARD_PAD_X}px 40px`,
            borderRadius: 28,
            background: hex.linen,
            boxShadow: flanked ? 'none' : `0 30px 60px -24px ${rgba(hex.ink, 0.55)}`,
          }}
        >
          <BrandBar />
          <div style={{ display: 'flex', width: 56, height: 2, marginTop: 30, background: hex.line }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
            <div
              style={{
                display: 'flex',
                fontFamily: 'Hanken Grotesk',
                fontWeight: 600,
                fontSize: 16,
                letterSpacing: 2.8,
                textAlign: 'center',
                color: hex.clay,
              }}
            >
              {upper(label)}
            </div>
            <Title layout={titleLayout} />
          </div>
        </div>
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
