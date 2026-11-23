import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import { colorVariables, cssVar, type ColorName } from './src/design/tokens'

/**
 * Beatriz Torres — brand kit "Editorial quente". The values live in src/design/tokens.ts.
 * Each color here points at its CSS variable, so `bg-clay`, `text-ink/70` etc. follow the tokens
 * and can be re-themed by overriding the variables (e.g. on a `[data-theme]` wrapper).
 */
const color = (name: ColorName) => `rgb(var(${cssVar(name)}) / <alpha-value>)`

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        linen: color('linen'),
        paper: color('paper'),
        sand: { DEFAULT: color('sand'), deep: color('sandDeep') },
        line: color('line'),
        ink: { DEFAULT: color('ink'), soft: color('inkSoft') },
        mist: color('mist'),
        clay: { DEFAULT: color('clay'), deep: color('clayDeep'), soft: color('claySoft') },
        olive: color('olive'),
        ochre: color('ochre'),
        whatsapp: color('whatsapp'),
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-hanken)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.6rem, 5.6vw, 5.4rem)', { lineHeight: '1', letterSpacing: '-0.025em' }],
        display: ['clamp(2.1rem, 3.9vw, 3.6rem)', { lineHeight: '1.04', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.6rem, 2.4vw, 2.25rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        heading: ['clamp(1.25rem, 1.6vw, 1.5rem)', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        numeral: ['clamp(4.5rem, 8vw, 7.5rem)', { lineHeight: '0.85', letterSpacing: '-0.04em' }],
      },
      maxWidth: {
        site: '1240px',
      },
      transitionTimingFunction: {
        elegant: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        reveal: {
          from: { opacity: '0', transform: 'scale(1.04)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        rise: 'rise 0.9s cubic-bezier(0.22, 0.61, 0.36, 1) both',
        reveal: 'reveal 1.4s cubic-bezier(0.22, 0.61, 0.36, 1) both',
      },
    },
  },
  plugins: [
    // Writes `--color-*` on :root from the tokens.
    plugin(({ addBase }) => addBase({ ':root': colorVariables() })),
  ],
}

export default config
