// Text measurement for the share images (src/lib/og.tsx), read from the bundled TrueType files.
//
// Satori wraps text but has no `text-wrap: balance` and doesn't report line counts, so the card
// measures its title itself: to pick the biggest font size that fits and to narrow the title
// box until its lines are even (no single word alone on the last line). Only advance widths
// are read (no kerning), which is close enough to choose line breaks.

/** Advance width of a character, in em. */
export type Advance = (char: string) => number

/** Reads the advance widths of a TrueType font (cmap format 4, so any BMP character). */
export function fontAdvance(font: ArrayBuffer): Advance {
  const v = new DataView(font)
  const tables: Record<string, number> = {}
  for (let i = 0; i < v.getUint16(4); i++) {
    const rec = 12 + i * 16
    const tag = String.fromCharCode(v.getUint8(rec), v.getUint8(rec + 1), v.getUint8(rec + 2), v.getUint8(rec + 3))
    tables[tag] = v.getUint32(rec + 8)
  }
  const unitsPerEm = v.getUint16(tables.head + 18)
  const hMetrics = v.getUint16(tables.hhea + 34)

  // The Unicode BMP subtable of cmap (platform 0, or 3 with encoding 1).
  let sub = -1
  for (let i = 0; i < v.getUint16(tables.cmap + 2); i++) {
    const rec = tables.cmap + 4 + i * 8
    const offset = tables.cmap + v.getUint32(rec + 4)
    const platform = v.getUint16(rec)
    if (v.getUint16(offset) === 4 && (platform === 0 || (platform === 3 && v.getUint16(rec + 2) === 1))) {
      sub = offset
      break
    }
  }

  const glyph = (code: number) => {
    if (sub < 0 || code > 0xffff) return 0
    const segX2 = v.getUint16(sub + 6)
    const ends = sub + 14
    const starts = ends + segX2 + 2
    const deltas = starts + segX2
    const ranges = deltas + segX2
    for (let i = 0; i < segX2; i += 2) {
      if (code > v.getUint16(ends + i)) continue
      const start = v.getUint16(starts + i)
      if (code < start) return 0
      const delta = v.getInt16(deltas + i)
      const range = v.getUint16(ranges + i)
      if (range === 0) return (code + delta) & 0xffff
      const g = v.getUint16(ranges + i + range + 2 * (code - start))
      return g === 0 ? 0 : (g + delta) & 0xffff
    }
    return 0
  }

  const cache = new Map<string, number>()
  return (char) => {
    let em = cache.get(char)
    if (em === undefined) {
      const g = glyph(char.charCodeAt(0))
      em = v.getUint16(tables.hmtx + 4 * Math.min(g, hMetrics - 1)) / unitsPerEm
      cache.set(char, em)
    }
    return em
  }
}

export type Word = { text: string; width: number }

/** Width in px of a word at a font size, with Satori's letter spacing after each character. */
export function measure(text: string, advance: Advance, size: number, letterSpacing: number) {
  let width = 0
  for (const char of Array.from(text)) width += advance(char) * size + letterSpacing
  return width
}

/** Lines that words take in a box of `width`, wrapped like Satori (greedy, `gap` between words). */
export function lineCount(words: Word[], width: number, gap: number) {
  let lines = 1
  let line = 0
  for (const w of words) {
    if (line === 0) line = w.width
    else if (line + gap + w.width <= width) line += gap + w.width
    else {
      lines++
      line = w.width
    }
  }
  return lines
}

/** The narrowest box (at most `max`) that keeps the line count of `max`: even lines. */
export function balancedWidth(words: Word[], max: number, gap: number) {
  const lines = lineCount(words, max, gap)
  let lo = Math.max(...words.map((w) => w.width))
  let hi = max
  while (hi - lo > 1) {
    const mid = (lo + hi) / 2
    if (lineCount(words, mid, gap) === lines) hi = mid
    else lo = mid
  }
  return { lines, width: Math.ceil(hi) }
}
