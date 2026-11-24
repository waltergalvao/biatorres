import { MONOGRAM } from '@/components/Monogram'
import { hex, type ColorName } from '@/design/tokens'

// The BT monogram as an SVG file, built from the same paths and tokens as the site.
// /marca/monograma.svg → terracotta; ?cor=ink (or any color token) → that color.
export function GET(request: Request) {
  const cor = new URL(request.url).searchParams.get('cor') ?? 'clay'
  const color = hex[cor as ColorName] ?? hex.clay
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MONOGRAM.viewBox}" width="334" height="553" fill="none" stroke="${color}" stroke-width="${MONOGRAM.strokeWidth}" stroke-linejoin="miter">${MONOGRAM.paths
    .map((d) => `<path d="${d}"/>`)
    .join('')}</svg>`
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Content-Disposition': `inline; filename="monograma-beatriz-torres${cor === 'clay' ? '' : `-${cor}`}.svg"`,
    },
  })
}
