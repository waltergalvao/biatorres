// Size and type of every share image (Open Graph / Twitter). Kept apart from src/lib/og.tsx so
// metadata code can state width and height without importing the renderer and its fonts.

export const OG_SIZE = { width: 1200, height: 630 } as const
export const OG_CONTENT_TYPE = 'image/png'

/** Bump when the card design changes, so the `?v=` of generated images changes too. */
export const OG_DESIGN_VERSION = '2'

/**
 * Short, stable hash of what a generated image shows, used as `?v=` in its URL. The images are
 * cached for a year (by Vercel and by WhatsApp, Facebook, LinkedIn), so a new title or cover
 * needs a new URL.
 */
export function ogVersion(...parts: (string | undefined)[]) {
  let h = 0x811c9dc5
  const text = [OG_DESIGN_VERSION, ...parts].join('|')
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h.toString(36)
}
