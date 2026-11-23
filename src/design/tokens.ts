/**
 * Beatriz Torres — design tokens (brand kit "Editorial quente").
 *
 * This file is the single source of truth for the brand. Change a value here and it changes
 * everywhere:
 * - the website: Tailwind writes each color as a CSS variable on :root (`--color-clay: 160 69 36`)
 *   and every utility (`bg-clay`, `text-ink/70`, `border-line`…) reads that variable;
 * - anything that needs real values instead of CSS (social media images with next/og or Satori,
 *   Figma, Canva brand kits, e-mail templates): import from here and use the hex values.
 *
 * Keep this file free of imports: tailwind.config.ts loads it at build time.
 *
 * Contrast (WCAG, all AA for body text): ink on linen 13.7:1 · ink-soft on linen 7.2:1 ·
 * ink-soft on sand 6.2:1 · clay on linen 5.4:1 · clay on sand 4.6:1 · paper on clay 5.9:1 ·
 * ochre on ink 5.8:1 · mist on ink 8.5:1 · olive on linen 5.6:1 · white on whatsapp 5.3:1.
 * Check these again if you change a color.
 */

export type ColorToken = {
  /** Hex value, the only place it is written. */
  hex: string
  /** What the color is for. */
  role: string
}

/**
 * Colors. The key is the token name: `clayDeep` becomes the CSS variable `--color-clay-deep` and
 * the Tailwind class `bg-clay-deep`.
 */
export const colors = {
  linen: { hex: '#F4EDE3', role: 'Fundo da página' },
  paper: { hex: '#FBF8F3', role: 'Cartões e superfícies elevadas' },
  sand: { hex: '#E8DCCB', role: 'Fundo de seção alternada' },
  sandDeep: { hex: '#DCCBB4', role: 'Areia mais escura, para contraste sobre sand' },
  line: { hex: '#D6C6B1', role: 'Linhas finas e bordas (decorativas)' },
  ink: { hex: '#2B201A', role: 'Texto principal e faixas escuras (espresso)' },
  inkSoft: { hex: '#5C4A3F', role: 'Texto secundário' },
  mist: { hex: '#CDBBA8', role: 'Texto secundário sobre fundo escuro' },
  clay: { hex: '#A04524', role: 'Ação principal e destaques (terracota)' },
  clayDeep: { hex: '#7E3519', role: 'Hover e pressionado da ação principal' },
  claySoft: { hex: '#E9C9B0', role: 'Tons claros de terracota; destaque sobre fundo escuro' },
  olive: { hex: '#5E6136', role: 'Acento secundário' },
  ochre: { hex: '#C89234', role: 'Selos e destaques sobre fundo escuro' },
  whatsapp: { hex: '#1F7A4D', role: 'Ícone e botão do WhatsApp (verde escurecido para contraste AA)' },
} satisfies Record<string, ColorToken>

export type ColorName = keyof typeof colors

/** Fonts: loaded with next/font in src/app/layout.tsx (Google Fonts). */
export const fonts = {
  display: {
    family: 'Fraunces',
    variable: '--font-fraunces',
    use: 'Títulos, preços e números. Peso 300–500, itálico nos destaques, SOFT 50.',
  },
  sans: {
    family: 'Hanken Grotesk',
    variable: '--font-hanken',
    use: 'Texto corrido, botões, rótulos.',
  },
} as const

/** `clayDeep` → `clay-deep` */
export const kebab = (name: string) => name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)

/** `#A04524` → `160 69 36`, the format Tailwind needs to apply opacity (`bg-clay/40`). */
export function rgbChannels(hex: string) {
  const n = parseInt(hex.replace('#', ''), 16)
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`
}

/** CSS variable name for a color: `cssVar('clayDeep')` → `--color-clay-deep`. */
export const cssVar = (name: ColorName) => `--color-${kebab(name)}`

/** All color variables, ready for `:root`. */
export function colorVariables(): Record<string, string> {
  return Object.fromEntries(
    Object.entries(colors).map(([name, c]) => [cssVar(name as ColorName), rgbChannels(c.hex)]),
  )
}

/** Plain hex map, e.g. for next/og: `hex.clay` → `#A04524`. */
export const hex = Object.fromEntries(Object.entries(colors).map(([name, c]) => [name, c.hex])) as Record<
  ColorName,
  string
>
