import type { Config } from 'tailwindcss'

/**
 * Beatriz Torres — brand kit "Editorial quente".
 * Contrast (WCAG, all AA for body text): ink on linen 13.7:1 · ink-soft on linen 7.2:1 ·
 * ink-soft on sand 6.2:1 · clay on linen 5.4:1 · clay on sand 4.6:1 · paper on clay 5.9:1 ·
 * ochre on ink 5.8:1 · mist on ink 8.5:1 · olive on linen 5.6:1.
 */
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        linen: '#F4EDE3', // page ground
        paper: '#FBF8F3', // cards, raised surfaces
        sand: {
          DEFAULT: '#E8DCCB', // alternate section ground
          deep: '#DCCBB4',
        },
        line: '#D6C6B1', // hairlines and borders (decorative)
        ink: {
          DEFAULT: '#2B201A', // espresso — text and dark bands
          soft: '#5C4A3F', // secondary text
        },
        mist: '#CDBBA8', // secondary text on espresso
        clay: {
          DEFAULT: '#A04524', // terracotta — primary action and accents
          deep: '#7E3519', // hover / pressed
          soft: '#E9C9B0', // tints
        },
        olive: '#5E6136',
        ochre: '#C89234',
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
  plugins: [],
}

export default config
